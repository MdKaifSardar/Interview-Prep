# Drill 21: In-Memory Rate Limiting Middleware (Q68)

## Problem Statement
To protect endpoints from brute-force attacks and abuse, servers throttle requests by IP address within a fixed or rolling time window.

## Task
Implement `createRateLimiter({ maxRequests, windowMs })` in `starter.js`.
- Tracks request counts per IP (default `req.ip || '127.0.0.1'`).
- If requests within `windowMs` exceed `maxRequests`, responds with status `429` and body:
  `{ error: 'Too many requests, please try again later.' }`
- Resets count once `windowMs` elapses.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#68-implement-an-in-memory-rate-limiting-middleware-fixed-window-or-token-bucket)
