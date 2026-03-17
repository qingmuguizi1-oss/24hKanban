---
name: "tencent-cloudbase-auth-password"
description: "Implements secure email/password and code login flow using Tencent CloudBase SDK. Invoke when user needs authentication, login page, or password reset functionality."
---

# Tencent CloudBase Password & Code Authentication

This skill provides a complete authentication solution using Tencent CloudBase, supporting both email verification code login and password login (with password reset flow).

## Prerequisites

1.  **Install SDK**:
    ```bash
    pnpm add @cloudbase/js-sdk zustand
    ```

2.  **Enable Auth Method**:
    - Go to Tencent CloudBase Console -> Environment -> Login Authorization -> Identity Source.
    - Enable **Email/Password Login** (邮箱密码登录).
    - Ensure your email template is configured correctly.

## Implementation Steps

### 1. Initialize CloudBase (`src/lib/cloudbase.ts`)

```typescript
import cloudbase from '@cloudbase/js-sdk';

// Replace with your Env ID
export const ENV_ID = 'your-env-id';

export const app = cloudbase.init({
  env: ENV_ID,
  region: 'ap-shanghai', // Check your region
  timeout: 15000 
});

export const auth = app.auth({
  persistence: 'local' // Persist login state
});

export const db = app.database();
```

### 2. Create Auth Store (`src/store/useAuthStore.ts`)

This store handles all authentication logic including code sending, login, and password management.

```typescript
import { create } from 'zustand';
import { auth, ENV_ID } from '../lib/cloudbase';

// Error handling helpers
const getErrorMessage = (err: any, fallback: string) =>
  err?.message || err?.msg || fallback;

const isPasswordLoginDisabledError = (err: any): boolean => {
  const text = JSON.stringify(err).toLowerCase();
  return text.includes('username/password login') || text.includes('identity source');
};

interface User {
  uid: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  verificationContext: any | null; // Context for code verification

  initAuth: () => Promise<void>;
  sendCode: (email: string) => Promise<boolean>;
  loginWithCode: (email: string, code: string) => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  requestPasswordSetup: (email: string) => Promise<boolean>;
  confirmPasswordSetup: (email: string, code: string, newPassword: string) => Promise<{ autoLoggedIn: boolean }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  verificationContext: null,

  initAuth: async () => {
    if (!ENV_ID) return;
    
    // Listen for auth state changes
    auth.onLoginStateChanged((loginState) => {
      set({ 
        user: loginState?.user ? { uid: loginState.user.uid, email: loginState.user.email } : null,
        isLoading: false 
      });
    });

    // Check initial state
    const loginState = await auth.getLoginState();
    if (loginState?.user) {
        set({ user: { uid: loginState.user.uid, email: loginState.user.email } });
    }
    set({ isLoading: false });
  },

  sendCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await auth.getVerification({ email });
      if (!response) return false;
      set({ verificationContext: response });
      return true;
    } catch (err) {
      set({ error: getErrorMessage(err, 'Failed to send code') });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithCode: async (email, code) => {
    set({ isLoading: true, error: null });
    const context = get().verificationContext;
    if (!context) {
      set({ error: 'Verification context lost, please resend code', isLoading: false });
      return;
    }

    try {
      await auth.signInWithEmail({
        email,
        verificationCode: code,
        verificationInfo: context
      });
      set({ verificationContext: null });
    } catch (err) {
      set({ error: getErrorMessage(err, 'Login failed') });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithPassword: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await auth.signInWithPassword({ email, password });
      if (res.error) throw res.error;
    } catch (err) {
      if (isPasswordLoginDisabledError(err)) {
        set({ error: 'Password login is disabled in console.' });
      } else {
        set({ error: getErrorMessage(err, 'Login failed') });
      }
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  requestPasswordSetup: async (email) => {
    // Reuse sendCode logic for password setup verification
    return get().sendCode(email);
  },

  confirmPasswordSetup: async (email, code, newPassword) => {
    set({ isLoading: true, error: null });
    const context = get().verificationContext;
    if (!context) throw new Error('Context lost');

    try {
      // 1. Verify code to get token
      const verifyRes = await auth.verify({
        verification_id: context.verification_id,
        verification_code: code
      });
      
      // 2. Reset password using token
      await auth.resetPassword({
        email,
        new_password: newPassword,
        verification_token: verifyRes.verification_token
      });

      // 3. Auto login
      try {
        await auth.signInWithPassword({ email, password: newPassword });
        set({ verificationContext: null });
        return { autoLoggedIn: true };
      } catch (loginErr) {
        // If password login is disabled, return false but success
        return { autoLoggedIn: false };
      }
    } catch (err) {
      set({ error: getErrorMessage(err, 'Setup failed') });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null });
  }
}));
```

### 3. Implement Login Page (`src/pages/LoginPage.tsx`)

This component handles the UI for switching between Code/Password/Setup modes.

```tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
// Use icons from lucide-react or your preferred library
// import { Loader2, Lock, Mail } from 'lucide-react'; 

type LoginMode = 'code' | 'password' | 'setup';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { 
    sendCode, loginWithCode, loginWithPassword, 
    requestPasswordSetup, confirmPasswordSetup, 
    isLoading, error 
  } = useAuthStore();

  const [mode, setMode] = useState<LoginMode>('code');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(''); // Verification code
  const [password, setPassword] = useState(''); // Login password
  const [newPassword, setNewPassword] = useState(''); // Setup new password
  
  const [msg, setMsg] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer logic
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    if (!email) return setMsg('Please enter email');
    const success = await sendCode(email);
    if (success) {
      setCountdown(60);
      setMsg('Code sent!');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    
    try {
      if (mode === 'code') {
        await loginWithCode(email, code);
      } else if (mode === 'password') {
        await loginWithPassword(email, password);
      }
      navigate('/'); // Redirect after success
    } catch (err) {
      // Error handled in store
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await confirmPasswordSetup(email, code, newPassword);
      if (res.autoLoggedIn) {
        navigate('/');
      } else {
        setMsg('Password set! Please login with code first (password login might be disabled).');
        setMode('code');
      }
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="login-container">
      <h1>{mode === 'code' ? 'Code Login' : mode === 'password' ? 'Password Login' : 'Set Password'}</h1>
      
      {/* Mode Switcher */}
      <div className="tabs">
        <button onClick={() => setMode('code')}>Code</button>
        <button onClick={() => setMode('password')}>Password</button>
        <button onClick={() => setMode('setup')}>Set Password</button>
      </div>

      {/* Forms */}
      {mode !== 'setup' ? (
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          
          {mode === 'code' && (
            <>
              <div className="code-row">
                <input value={code} onChange={e => setCode(e.target.value)} placeholder="Verification Code" />
                <button type="button" onClick={handleSendCode} disabled={countdown > 0 || isLoading}>
                  {countdown > 0 ? `${countdown}s` : 'Send Code'}
                </button>
              </div>
            </>
          )}

          {mode === 'password' && (
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          )}

          {error && <div className="error">{error}</div>}
          {msg && <div className="msg">{msg}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSetup}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <div className="code-row">
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="Verification Code" />
            <button type="button" onClick={() => requestPasswordSetup(email).then(ok => ok && setCountdown(60))} disabled={countdown > 0}>
              {countdown > 0 ? `${countdown}s` : 'Send Code'}
            </button>
          </div>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
          
          <button type="submit" disabled={isLoading}>Set Password</button>
        </form>
      )}
    </div>
  );
};
```
