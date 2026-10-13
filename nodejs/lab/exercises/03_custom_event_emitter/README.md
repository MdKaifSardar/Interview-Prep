# Drill 03: Custom EventEmitter from Scratch (Q17)

## Problem Statement
The `EventEmitter` pattern is the backbone of Node's async architecture (Streams, HTTP server, sockets).

## Task
Implement `class MyEventEmitter` in `starter.js` supporting:
- `.on(event, listener)`
- `.emit(event, ...args)`
- `.once(event, listener)`
- `.off(event, listener)`
- `.listenerCount(event)`

## Hint
Master Answer Reference: [03-modules-and-core-apis.md](../../answers/03-modules-and-core-apis.md#17-how-does-the-eventemitter-class-work-on-once-emit-off-and-which-core-modules-are-built-on-it)
