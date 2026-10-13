# Drill 02: Derived State Anti-Pattern Elimination (Q14)

## Problem Statement
Copying props into state (`useState(props.items)`) and syncing with `useEffect` causes unnecessary re-renders, out-of-sync bugs, and race conditions. Compute values on-the-fly during render instead.

## Task
Refactor `<CartSummary items={items} taxRate={taxRate} />` in `starter.jsx`.
- Calculate `subtotal` and `total` directly during render without `useEffect` or duplicate state.
- Render:
  - Subtotal in `<span data-testid="subtotal">`
  - Total in `<span data-testid="total">`

## Hint
Master Answer Reference: [02-functional-components-props-and-state-modeling.md](../../answers/02-functional-components-props-and-state-modeling.md#14-what-is-derived-state-and-why-is-copying-props-into-state-an-anti-pattern)
