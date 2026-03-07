---
name: tencent-cloudbase-data-synchronization
description: Implement and debug multi-device data synchronization with Tencent CloudBase (TCB). Use when building React, Vue, or Vanilla JS apps with @cloudbase/js-sdk that need auth-scoped user data, cloud-as-source-of-truth sync, optimistic local updates, soft-delete handling via deletedAt, and consistent behavior across mobile and desktop.
---

# Tencent Cloudbase Data Synchronization

## Overview

Implement reliable cross-device sync by treating Tencent CloudBase as the source of truth and local state as an optimistic cache.
Apply strict auth gating, deterministic merge rules, and soft-delete semantics to prevent zombie data.

## Quick Workflow

1. Initialize exactly one CloudBase app/auth/db instance.
2. Authenticate (anonymous login by default) before any DB query or write.
3. Apply CRUD locally for responsiveness, then sync the same mutation to cloud immediately.
4. Pull cloud records for the current user and merge deterministically.
5. Respect `deletedAt` during merge and rendering to prevent zombie data.
6. Normalize timestamps and platform-specific behaviors.

## 1. Initialize SDK (Singleton Pattern)

Avoid multiple `cloudbase.init` calls in one app runtime.
Create a single shared module such as `cloudbase.ts` or `lib/cloudbase.ts`.

```typescript
import cloudbase from '@cloudbase/js-sdk';

export const app = cloudbase.init({
  env: 'your-env-id-here',
  region: 'ap-shanghai'
});

export const auth = app.auth();
export const db = app.database();
```

## 2. Authenticate Before Any Data Access

Use anonymous login for public apps to isolate each user's data with a unique identity.
Block data operations until login completes.

```typescript
export async function initAuth() {
  const loginState = await auth.getLoginState();
  if (!loginState) {
    await auth.anonymousAuthProvider().signIn();
  }
  return auth.currentUser;
}
```

## 3. Use Cloud as Source of Truth with Optimistic Local Updates

Use this mutation flow:

1. Update local state immediately for responsive UI.
2. Persist the same mutation to cloud right away.
3. On sync pull, replace/merge local records from cloud using deterministic rules.
4. Never append blindly from cloud to local arrays.

Store date/time in cloud as ISO string or timestamp.
Convert to local timezone only during rendering.

## 4. Prevent Zombie Data (Soft Delete)

When deleting:

1. Set `deletedAt` locally.
2. Push the same `deletedAt` update to cloud immediately.
3. During sync pull, keep deletion state in local persistence but filter deleted items from UI lists.

```typescript
const syncFromCloud = async () => {
  await initAuth();
  const res = await db
    .collection('mood_records')
    .where({
      _openid: '{openid}'
    })
    .get();

  const normalized = res.data.map(item => ({
    ...item,
    timestamp: new Date(item.timestamp).toISOString()
  }));

  const visibleRecords = normalized.filter(item => !item.deletedAt);

  // Replace local view state deterministically.
  set({ records: visibleRecords });
};
```

## 5. Cross-Platform Compatibility

- Trigger media playback from user actions (`click`/`tap`) on mobile browsers.
- Use responsive layout rules (`sm`, `md`, etc.) for mobile/desktop differences.
- Validate behavior on iOS Safari and Android Chromium before release.

## 6. Common Pitfalls Checklist

- Missing auth initialization before DB access causes permission errors.
- Storing local-formatted datetime values in cloud causes timezone drift.
- Deleting only locally (without cloud mutation) causes zombie data on next sync.
- Creating multiple SDK instances causes inconsistent auth/session behavior.
