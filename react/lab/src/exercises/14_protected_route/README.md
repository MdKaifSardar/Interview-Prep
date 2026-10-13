# Drill 14: Client-Side Protected Route Guard (Q47)

## Problem Statement
Restricting access to authenticated users requires a client-side route guard that inspects user session status and redirects unauthenticated visitors.

## Task
Implement `<ProtectedRoute user={user} redirectPath="/login">` in `starter.jsx`.
- If `user` is present and authenticated: renders `children` in `<div data-testid="protected-content">`.
- If `user` is null/falsy: renders fallback redirect element `<div data-testid="redirect-to">{redirectPath}</div>`.

## Hint
Master Answer Reference: [07-full-stack-integration-and-authentication.md](../../answers/07-full-stack-integration-and-authentication.md#47-how-do-you-build-a-protectedroute-component-in-react-to-restrict-access-to-authenticated-users)
