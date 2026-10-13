# Drill 01: Functional State Updates & Queueing (Q10, Q11)

## Problem Statement
When state updates depend on previous state or multiple updates occur in rapid succession, using the raw value `setCount(count + 1)` reads from a stale snapshot. The functional updater syntax `setCount(prev => prev + 1)` queues updates correctly against the pending state queue.

## Task
Implement `<BatchCounter />` in `starter.jsx`.
- Renders current count in `<div data-testid="count">{count}</div>`.
- Has an `Add Three` button (`data-testid="add-three"`) that triggers **three consecutive increments** inside a single click handler.
- If implemented correctly with functional updaters, one click increments count from 0 to 3.

## Hint
Master Answer Reference: [02-functional-components-props-and-state-modeling.md](../../answers/02-functional-components-props-and-state-modeling.md#11-what-is-the-functional-state-updater-syntax-setcountprev--prev--1-and-when-must-you-use-it)
