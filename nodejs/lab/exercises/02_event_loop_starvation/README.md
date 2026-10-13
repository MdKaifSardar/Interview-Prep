# Drill 02: Event Loop Starvation & CPU Offloading (Q10, Q63)

## Problem Statement
A large synchronous loop blocks the single JavaScript thread, preventing I/O callbacks, timers, and other requests from processing.

## Task
Implement `chunkedSum(numbers, chunkSize)` in `starter.js`.
Sum a large array of numbers by breaking work into chunks and yielding control back to the event loop using `setImmediate()` between chunks so other tasks can run.

## Requirements
- Returns a Promise resolving to the total sum.
- Must yield between chunks so interleaved tasks can execute.

## Hint
Master Answer Reference: [02-event-loop-architecture.md](../../answers/02-event-loop-architecture.md#10-how-can-recursive-processnexttick-calls-or-cpu-heavy-code-starve-the-event-loop-and-how-do-you-detect-and-avoid-it)
