# Drill 20: Custom Imperative API with useImperativeHandle (Q74)

## Problem Statement
Occasionally, a parent component needs to trigger imperative actions on a child (e.g., focus, clear, shake) without lifting all internal state. `forwardRef` + `useImperativeHandle` exposes a customized public interface.

## Task
Implement `<CustomInput ref={ref} />` in `starter.jsx`.
- Wrapped with `React.forwardRef`.
- Exposes custom imperative methods to the parent ref:
  - `.focus()`: focuses internal input.
  - `.reset()`: clears internal input value.
  - `.getValue()`: returns current input string.

## Hint
Master Answer Reference: [10-advanced-topics-and-edge-cases.md](../../answers/10-advanced-topics-and-edge-cases.md#74-what-are-forwardref-and-useimperativehandle-how-do-you-expose-child-component-methods-to-a-parent)
