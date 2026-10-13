# Drill 04: Stream Pipeline & Error Handling (Q21)

## Problem Statement
Using `readable.pipe(writable)` does NOT forward errors automatically, leading to dangling streams and memory leaks. `stream.pipeline()` ensures all streams are destroyed cleanly upon completion or error.

## Task
Implement `uppercaseFileStream(readable, writable)` in `starter.js`.
Transform text chunks from `readable` to uppercase and write to `writable` using `stream.pipeline` or `stream/promises`.

## Hint
Master Answer Reference: [03-modules-and-core-apis.md](../../answers/03-modules-and-core-apis.md#21-what-is-piping-what-is-backpressure-and-why-is-streampipeline-preferred-over-pipe-for-error-handling)
