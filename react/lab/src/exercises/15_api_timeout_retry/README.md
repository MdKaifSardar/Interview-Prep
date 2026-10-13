# Drill 15: Fetch with Timeout & Exponential Retry (Q49)

## Problem Statement
Network requests can hang indefinitely under flaky connections. A resilient frontend fetch wrapper applies timeouts and retries on failure.

## Task
Implement `fetchWithRetry(url, options = {}, retries = 2, timeoutMs = 1000)` in `starter.jsx`.
- Aborts request if response takes longer than `timeoutMs`.
- Automatically retries failed requests up to `retries` times before throwing.
- Returns parsed JSON on success.

## Hint
Master Answer Reference: [07-full-stack-integration-and-authentication.md](../../answers/07-full-stack-integration-and-authentication.md#49-how-do-you-handle-api-request-timeouts-and-global-network-error-handling-in-react)
