# Drill 09: Middleware Pipeline & Order Tracking (Q33, Q34)

## Problem Statement
Express middleware execute sequentially in the order registered via `app.use()`.

## Task
Implement `createTrackedPipeline()` in `starter.js`.
Build two middlewares that collaborate:
1. `requestIdMiddleware`: Generates a unique request ID (or takes incoming `X-Request-Id`), attaches it to `req.id`, and sets the response header `X-Request-Id`.
2. `requestTimerMiddleware`: Sets `req.startTime = Date.now()` and attaches response header `X-Response-Time-Ms` when `res.on('finish')` fires.

## Hint
Master Answer Reference: [05-express-routing-and-middleware.md](../../answers/05-express-routing-and-middleware.md#34-what-are-the-types-of-middleware-application-level-router-level-built-in-third-party-error-handling-and-why-does-the-order-of-appuse-calls-matter)
