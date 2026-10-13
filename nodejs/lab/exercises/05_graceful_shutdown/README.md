# Drill 05: Graceful Shutdown Orchestrator (Q24)

## Problem Statement
When a Node app receives `SIGTERM` or `SIGINT`, terminating immediately causes dropped client connections and corrupted database transactions.

## Task
Implement `createShutdownHandler(server, cleanupTasks, { timeoutMs })` in `starter.js`.
- Stop accepting new incoming requests (`server.close()`).
- Execute all async cleanup tasks in order.
- Guarantee completion within `timeoutMs` or force-fail.

## Hint
Master Answer Reference: [04-concurrency-and-error-handling.md](../../answers/04-concurrency-and-error-handling.md#24-what-is-graceful-shutdown-and-how-do-you-handle-sigterm-and-sigint-to-stop-accepting-requests-and-close-connections-cleanly)
