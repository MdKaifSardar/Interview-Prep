# Drill 06: Custom promisify() from Scratch (Q25, Q71)

## Problem Statement
Node's standard callback convention passes `(err, result)` as the last argument.

## Task
Implement `myPromisify(fn)` in `starter.js`.
Takes a function accepting an error-first callback and returns a new function that returns a Promise.

## Hint
Master Answer Reference: [04-concurrency-and-error-handling.md](../../answers/04-concurrency-and-error-handling.md#25-what-is-the-error-first-callback-convention-and-how-do-you-convert-callback-apis-to-promises-with-utilpromisify)
