# Drill 17: Debugging: Hanging Middleware Bug (Q62)

## Problem Statement
When an Express middleware contains branching logic or async callbacks but neglects to call `next()` or forward errors, the incoming request hangs indefinitely until the client times out.

## Task
Inspect and fix `verifyApiKeyMiddleware` in `starter.js` so that all execution paths either respond or call `next()`.

## Hint
Master Answer Reference: [08-output-prediction-and-debugging.md](../../answers/08-output-prediction-and-debugging.md#62-find-and-fix-the-bug-where-a-middleware-never-calls-next-or-is-registered-in-the-wrong-order)
