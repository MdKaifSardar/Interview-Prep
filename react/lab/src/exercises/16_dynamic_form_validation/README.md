# Drill 16: Zero-Dependency Dynamic Form with Validation (Q50, Q65)

## Problem Statement
Building custom forms without third-party libraries requires tracking field values, validation rules, touched states, and form error objects.

## Task
Implement `<ValidatedRegistrationForm onSubmit={handleSubmit} />` in `starter.jsx`.
- Fields:
  - `email`: Required, valid email regex (`data-testid="input-email"`). Error in `<span data-testid="error-email">`.
  - `password`: Required, min 6 characters (`data-testid="input-password"`). Error in `<span data-testid="error-password">`.
- On submit: Validates all fields. If errors exist, prevents submit and displays errors. If valid, calls `onSubmit({ email, password })`.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#65-build-a-dynamic-form-with-validation-field-arrays-and-submit-state-without-third-party-libraries)
