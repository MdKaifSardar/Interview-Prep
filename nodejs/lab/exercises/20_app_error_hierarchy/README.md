# Drill 20: Centralized AppError Class Hierarchy (Q67)

## Problem Statement
Standard `Error` objects lack HTTP semantics. An `AppError` class encodes status codes, operational flags, and error origins.

## Task
Implement `class AppError extends Error` in `starter.js`.
- `constructor(message, statusCode, isOperational = true)`
- Sets `this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'`.
- Captures stack trace via `Error.captureStackTrace(this, this.constructor)`.
- Static factories: `AppError.badRequest(msg)`, `AppError.notFound(msg)`, `AppError.unauthorized(msg)`.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#67-write-a-centralized-error-handling-middleware-with-a-custom-apperror-class)
