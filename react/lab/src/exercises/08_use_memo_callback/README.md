# Drill 08: useMemo & useCallback Referential Equality (Q25, Q26)

## Problem Statement
Functions and objects created during render get new referential identities on every re-render, breaking shallow comparison in `React.memo`.

## Task
Implement `<ParentCounter />` in `starter.jsx`.
- Wraps an expensive calculation `calculatePrimes(count)` in `useMemo`.
- Wraps an `onAction` function passed to a `React.memo` child in `useCallback`.
- Changing unrelated parent state (e.g. `unrelatedText`) must **NOT** trigger re-computation of primes or re-render of the memoized child.

## Hint
Master Answer Reference: [04-advanced-hooks-and-memoization.md](../../answers/04-advanced-hooks-and-memoization.md#26-what-is-usecallback-how-does-usecallback-differ-from-usememo)
