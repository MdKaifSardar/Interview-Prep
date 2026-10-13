# Drill 11: Dynamic Lists & Key Index Bug (Q32, Q33)

## Problem Statement
Using array indices as keys (`key={index}`) breaks React's reconciliation diffing when items are inserted, deleted, or reordered. Uncontrolled child input states remain tied to indices instead of items.

## Task
Inspect and fix `<DynamicTodoList />` in `starter.jsx`.
- Renders a list of todo items, each with a text input and a remove button (`data-testid="remove-{id}"`).
- Currently, using `key={index}` causes removing the first item to corrupt the inputs below it.
- Fix by using unique persistent item IDs (`key={item.id}`).

## Hint
Master Answer Reference: [05-re-rendering-keys-and-performance-optimization.md](../../answers/05-re-rendering-keys-and-performance-optimization.md#33-why-is-using-array-index-as-a-key-keyindex-an-anti-pattern-for-dynamic-lists-show-a-scenario-where-it-causes-ui-bugs)
