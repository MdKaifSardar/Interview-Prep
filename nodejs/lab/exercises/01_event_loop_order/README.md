# Drill 01: Event Loop & Microtask Priority (Q8, Q58)

## Problem Statement
In Node.js, asynchronous operations are scheduled into different queues and phases:
- Synchronous execution runs immediately.
- `process.nextTick()` runs immediately after the current operation, before any other microtasks.
- Promise microtasks run after `process.nextTick()` queues are drained.
- Macrotasks (`setTimeout`, `setImmediate`) run in subsequent event loop phases.

## Task
Implement `collectExecutionOrder()` in `starter.js`.
Schedule the provided tags using their respective Node APIs and return a Promise that resolves with an array of tags in the exact order they execute:
- `'sync'`
- `'nextTick'`
- `'promise'`
- `'timeout_0'`
- `'setImmediate'`

## Hint
Master Answer Reference: [02-event-loop-architecture.md](../../answers/02-event-loop-architecture.md#8-what-is-the-difference-between-processnexttick-promise-microtasks-setimmediate-and-settimeoutfn-0-and-in-what-order-do-they-run)
