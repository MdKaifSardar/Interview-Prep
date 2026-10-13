# Drill 22: Express 4 asyncHandler Utility (Q69)

## Problem Statement
In Express 4, unhandled promise rejections inside async route handlers cause requests to hang or crash the process. The `asyncHandler` pattern catches rejections and forwards them to `next(err)`.

## Task
Implement `asyncHandler(fn)` in `starter.js`.
- Wraps an async route handler `(req, res, next)`.
- Returns an Express handler executing the promise and invoking `.catch(next)` on rejection.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#69-write-an-asynchandler-wrapper-for-express-4-and-explain-why-express-5-doesnt-need-it)
