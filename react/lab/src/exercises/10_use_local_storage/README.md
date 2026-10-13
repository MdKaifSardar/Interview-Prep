# Drill 10: Custom Hook: useLocalStorage(key, initialValue) (Q28, Q63)

## Problem Statement
Persisting React state to `window.localStorage` enables offline resilience and preference saving across refreshes.

## Task
Implement `useLocalStorage(key, initialValue)` in `starter.jsx`.
- Reads existing JSON from `localStorage.getItem(key)` on initial mount (falls back to `initialValue` if null or parse error).
- Supports both value updates and functional updaters `setValue(prev => ...)`.
- Serializes and stores updated value in `localStorage.setItem(key, JSON.stringify(val))`.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#63-build-a-custom-uselocalstoragekey-initialvalue-hook)
