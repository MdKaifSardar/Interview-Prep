# Drill 03: Controlled Input & Uncontrolled Ref Form (Q15)

## Problem Statement
Controlled components sync every keystroke through React state; uncontrolled components let the DOM manage input values and retrieve values via `useRef` upon submit.

## Task
Implement `<UserProfileForm onSubmit={handleSubmit} />` in `starter.jsx`.
- `username` input: Controlled with React state (`data-testid="username-input"`). Display live character count in `<span data-testid="char-count">`.
- `bio` textarea: Uncontrolled using `useRef` (`data-testid="bio-input"`).
- On form submit: Invoke `onSubmit({ username, bio })` with current values and prevent default reload.

## Hint
Master Answer Reference: [02-functional-components-props-and-state-modeling.md](../../answers/02-functional-components-props-and-state-modeling.md#15-controlled-vs-uncontrolled-components-what-is-the-difference-and-when-would-you-use-an-uncontrolled-component)
