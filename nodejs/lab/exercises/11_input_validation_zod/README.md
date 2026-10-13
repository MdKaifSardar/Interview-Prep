# Drill 11: Schema-Based Input Validation with Zod (Q44)

## Problem Statement
Never trust client input. Express handlers must validate request payloads before business logic execution.

## Task
Implement `validateBody(schema)` in `starter.js`.
- Validates `req.body` using the provided Zod schema.
- If valid: assigns parsed and stripped data to `req.validatedBody` and calls `next()`.
- If invalid: halts and responds with status `422` and JSON:
  `{ error: 'Validation failed', details: [...] }` containing field issues.

## Hint
Master Answer Reference: [06-rest-apis-and-security.md](../../answers/06-rest-apis-and-security.md#44-why-must-request-input-be-validated-on-the-server-and-how-do-you-validate-it-in-middleware-zod-joi-or-express-validator)
