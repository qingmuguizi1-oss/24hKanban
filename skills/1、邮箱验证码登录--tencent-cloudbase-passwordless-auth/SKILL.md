---
name: tencent-cloudbase-passwordless-auth
description: Implement Tencent CloudBase (TCB) passwordless email verification login with robust auth state handling in TypeScript/React projects. Use when building or debugging Email Verification Code login flows, Zustand auth stores, verification-context handling, countdown-based login UI, and common CloudBase email auth failures.
---

# Tencent CloudBase Passwordless Auth

Implement Email Verification Code (passwordless) authentication with Tencent CloudBase SDK.

Follow this workflow in order.

## 1. Verify CloudBase Console Setup

Confirm these options in CloudBase Console before changing code:
- Enable `Email Login` in login authorization.
- Enable `Anonymous Login` in login authorization (recommended to simplify initial session behavior).
- Configure the verification code email template if required by the environment.

If email identity is not enabled, expect backend errors such as identity-source failures.

## 2. Implement Auth Store Pattern (`useAuthStore.ts`)

Use these non-negotiable rules:
- Persist the value returned by `auth.getVerification({ email })` as verification context.
- Pass `verificationInfo` explicitly into `auth.signInWithEmail`.
- Do not spread the context object into `signInWithEmail`.
- Guard `onLoginStateChanged` with strict checks for both `loginState` and `loginState.user`.

Use this baseline:

```typescript
import { create } from 'zustand';
import { auth } from '../lib/cloudbase';

interface AuthState {
  user: User | null;
  verificationContext: any | null;
  isLoading: boolean;
  sendCode: (email: string) => Promise<boolean>;
  loginWithCode: (email: string, code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  verificationContext: null,
  isLoading: true,

  initAuth: async () => {
    auth.onLoginStateChanged((loginState) => {
      if (loginState && loginState.user) {
        set({
          user: {
            uid: loginState.user.uid,
            email: loginState.user.email,
            isAnonymous: loginState.user.isAnonymous
          },
          isLoading: false
        });
      } else {
        set({ user: null, isLoading: false });
      }
    });

    const loginState = await auth.getLoginState();
    if (!loginState || !loginState.user) {
      set({ isLoading: false });
    }
  },

  sendCode: async (email: string) => {
    const response = await auth.getVerification({ email });
    if (response) {
      set({ verificationContext: response });
      return true;
    }
    return false;
  },

  loginWithCode: async (email: string, code: string) => {
    const context = get().verificationContext;
    if (!context) throw new Error('Verification context missing');

    await auth.signInWithEmail({
      email,
      verificationCode: code,
      verificationInfo: context
    });

    set({ verificationContext: null });
  }
}));
```

## 3. Implement Login UI Pattern (`LoginPage.tsx`)

Build the flow as:
- Enter email.
- Send code.
- Show code input.
- Submit login.

Prevent code-spam with a 60-second countdown and always clean timers:

```typescript
useEffect(() => {
  if (countdown > 0) {
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [countdown]);
```

Disable resend while countdown is active.

## 4. Apply Safety Checks

During implementation and review, enforce these checks:
- Reject implementations that use `...verificationContext` in `signInWithEmail`.
- Reject implementations that read `loginState.user.uid` without `loginState && loginState.user` guard.
- Clear `verificationContext` after successful login.
- Keep timer cleanup in the UI to avoid memory leaks.

## 5. Troubleshoot Fast

Map errors to fixes:
- `Identity Source Not Enabled`: enable email identity source in CloudBase Console.
- `Cannot read properties of undefined (reading 'uid')`: add strict null guards in auth state change handling.
- `Invalid verification code`: verify context is current and passed via explicit `verificationInfo`.