# Drill 09: Custom Hook: useDebounce(value, delay) (Q28, Q62)

## Problem Statement
Debouncing delays updating a value until user activity has ceased for a specified delay period (e.g. typing in search inputs).

## Task
Implement `useDebounce(value, delay = 300)` in `starter.jsx`.
- Returns the debounced value.
- Resets the timer whenever `value` changes before `delay` elapses.
- Cleans up active timer on unmount or before the next effect run.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#62-build-a-custom-usedebouncevalue-delay-hook-in-react)
