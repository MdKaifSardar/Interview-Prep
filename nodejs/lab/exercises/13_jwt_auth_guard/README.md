# Drill 13: JWT Authentication Middleware Guard (Q46, Q66)

## Problem Statement
Protected routes require valid JWT bearer tokens in the `Authorization` header.

## Task
Implement `authenticateJwt(secret)` in `starter.js`.
- Inspect `req.headers.authorization`.
- If missing or does not start with `Bearer `, return 401 with `{ error: 'Authorization header missing or invalid' }`.
- Verify the token with `jsonwebtoken`. If valid, assign decoded payload to `req.user` and call `next()`.
- If token is invalid or expired, return 403 with `{ error: 'Invalid or expired token' }`.

## Hint
Master Answer Reference: [06-rest-apis-and-security.md](../../answers/06-rest-apis-and-security.md#46-how-does-jwt-authentication-work-in-express-signing-verifying-auth-middleware-expiry-and-how-do-access-and-refresh-tokens-work-together)
