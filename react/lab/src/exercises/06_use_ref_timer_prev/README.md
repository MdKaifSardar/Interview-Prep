# Drill 06: useRef Mutable Values & usePrevious Hook (Q21, Q22)

## Problem Statement
`useRef` holds mutable values that persist across renders without causing re-renders when mutated.

## Task
1. Implement `usePrevious(value)` custom hook in `starter.jsx` that returns the value from the previous render.
2. Implement `<Stopwatch />` using `useRef` to store the active interval ID.
   - Start button: begins timer.
   - Stop button: clears active interval using `clearInterval(timerRef.current)`.
   - Display elapsed ticks in `<span data-testid="time">`.

## Hint
Master Answer Reference: [03-core-hooks-deep-dive.md](../../answers/03-core-hooks-deep-dive.md#21-what-is-useref-how-does-useref-differ-from-usestate-and-why-does-modifying-refcurrent-not-trigger-a-re-render)
