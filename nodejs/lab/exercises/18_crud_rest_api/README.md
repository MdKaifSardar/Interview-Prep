# Drill 18: In-Memory CRUD REST API in Express (Q64)

## Problem Statement
A professional REST API must strictly adhere to HTTP verbs and standard response codes (200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found).

## Task
Implement `createCrudRouter()` in `starter.js` for a tasks resource:
- `GET /`: Returns all tasks (200).
- `GET /:id`: Returns single task (200) or 404.
- `POST /`: Requires `title`. Returns 201 with created task.
- `PUT /:id`: Updates title/completed. Returns 200 or 404.
- `DELETE /:id`: Deletes task. Returns 204 (No Content) or 404.

## Hint
Master Answer Reference: [09-machine-coding-and-challenges.md](../../answers/09-machine-coding-and-challenges.md#64-build-a-crud-rest-api-in-express-with-routing-input-validation-error-handling-and-correct-status-codes)
