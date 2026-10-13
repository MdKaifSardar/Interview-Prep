# Drill 16: Integration Testing with Supertest (Q57)

## Problem Statement
Separating Express `app` definition from `app.listen()` allows rapid headless HTTP integration testing using Supertest.

## Task
In `starter.js`, write integration test functions for an existing Express items app:
- `testGetAllItems(app)`: Assert status 200 and array returned.
- `testCreateItem(app, itemData)`: Assert status 201 and created item has an `id`.
- `testItemNotFound(app, id)`: Assert status 404 for invalid ID.

## Hint
Master Answer Reference: [07-performance-and-production.md](../../answers/07-performance-and-production.md#57-how-do-you-test-an-express-api-supertest-with-nodetest-or-jest-and-why-should-the-app-be-exported-separately-from-applisten)
