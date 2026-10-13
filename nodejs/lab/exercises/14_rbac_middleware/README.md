# Drill 14: Role-Based Authorization Middleware (Q48)

## Problem Statement
Authentication proves who the user is; authorization checks if they have permission to access a specific resource.

## Task
Implement `requireRoles(...allowedRoles)` in `starter.js`.
- Reads `req.user.role`.
- If `req.user` is undefined, responds with 401 `{ error: 'Unauthorized' }`.
- If user's role is not included in `allowedRoles`, responds with 403 `{ error: 'Forbidden: Insufficient privileges' }`.
- If role matches, calls `next()`.

## Hint
Master Answer Reference: [06-rest-apis-and-security.md](../../answers/06-rest-apis-and-security.md#48-how-do-you-implement-role-based-authorization-as-middleware)
