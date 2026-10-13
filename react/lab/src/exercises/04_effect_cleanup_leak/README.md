# Drill 04: Effect Subscriptions & Memory Leak Cleanup (Q18, Q19)

## Problem Statement
When a component subscribes to DOM events or intervals inside `useEffect`, omitting the cleanup return function causes memory leaks and zombie event handlers after unmount.

## Task
Implement `<WindowWidthTracker />` in `starter.jsx`.
- Listens to the `window` resize event inside `useEffect`.
- Displays current `window.innerWidth` in `<span data-testid="width">`.
- **Must return a cleanup function** that removes the `resize` event listener from `window`.

## Hint
Master Answer Reference: [03-core-hooks-deep-dive.md](../../answers/03-core-hooks-deep-dive.md#19-what-is-the-cleanup-function-in-useeffect-when-does-it-run-and-why-is-it-essential-for-preventing-memory-leaks)
