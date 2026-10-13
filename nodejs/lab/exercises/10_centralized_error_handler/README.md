# Drill 10: Centralized Error-Handling Middleware (Q35, Q67)

## Problem Statement
Express distinguishes error middleware by having exactly **four** parameters: `(err, req, res, next)`.

## Task
Implement `centralErrorHandler(err, req, res, next)` in `starter.js`.
- If `err.isOperational` is true: Responds with status `err.statusCode` and body `{ status: 'fail', message: err.message }`.
- If unknown/programmer error: Responds with status `500` and body `{ status: 'error', message: 'Internal server error' }`.

## Hint
Master Answer Reference: [05-express-routing-and-middleware.md](../../answers/05-express-routing-and-middleware.md#35-how-does-error-handling-middleware-work-the-four-argument-signature-how-do-you-forward-errors-with-nexterr-and-how-does-async-error-handling-differ-between-express-4-and-express-5)
