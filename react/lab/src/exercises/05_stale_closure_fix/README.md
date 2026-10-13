# Drill 05: Fixing the Stale Closure Bug (Q20)

## Problem Statement
When a closure (such as `setInterval`) captures a state variable from an earlier render without listing it in dependencies or using a functional updater, it retains the initial value forever.

## Task
Inspect and fix `<StaleTimer />` in `starter.jsx`.
- An interval ticks every 100ms.
- Currently, `setSeconds(seconds + 1)` gets stuck permanently displaying `1` because `seconds` is captured as `0`.
- Fix the bug so the counter increments continuously: 0 -> 1 -> 2 -> 3...

## Hint
Master Answer Reference: [03-core-hooks-deep-dive.md](../../answers/03-core-hooks-deep-dive.md#20-what-is-the-stale-closure-problem-in-useeffect-or-callbacks-and-how-do-you-fix-it)
