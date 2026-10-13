# Drill 12: Performance Optimization via Composition (Q34)

## Problem Statement
Parent state changes re-render all nested child components by default. Passing an expensive subtree via the `children` prop isolates it from parent re-renders without needing `React.memo`.

## Task
Implement `<CollapsibleBox>` in `starter.jsx`.
- Accepts `children` prop and renders it inside an expanded/collapsed container.
- Has a toggle button (`data-testid="toggle-collapse"`).
- Toggling the local open/close state of `CollapsibleBox` must **NOT** re-render the passed `children` subtree.

## Hint
Master Answer Reference: [05-re-rendering-keys-and-performance-optimization.md](../../answers/05-re-rendering-keys-and-performance-optimization.md#34-how-can-component-composition-passing-children-prevent-parent-re-renders-from-cascading-down-without-using-reactmemo)
