# Drill 19: Request Logging Middleware with Response Timer (Q65)

## Problem Statement
Production monitoring requires tracking HTTP method, request path, final status code, and latency in milliseconds.

## Task
Implement `createRequestLogger(logFn)` in `starter.js`.
- Measures time between incoming request and `res.on('finish')`.
- Invokes `logFn({ method, url, status, durationMs })` upon response completion.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#65-write-a-request-logging-middleware-that-records-the-method-url-status-code-and-response-time)
