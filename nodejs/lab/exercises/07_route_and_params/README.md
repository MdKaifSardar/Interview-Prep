# Drill 07: Express Routing, Params & Query Strings (Q29, Q30)

## Problem Statement
Route params (`req.params`) capture URL segments; query strings (`req.query`) handle filtering, pagination, and sorting.

## Task
Implement `createProductRouter(productsList)` in `starter.js`.
- `GET /`: Returns all products. Supports `?category=<name>` and `?maxPrice=<number>` filters.
- `GET /:id`: Returns single product. Returns 404 with `{ error: 'Product not found' }` if not found. Returns 400 with `{ error: 'Invalid ID' }` if id is not numeric.

## Hint
Master Answer Reference: [05-express-routing-and-middleware.md](../../answers/05-express-routing-and-middleware.md#29-how-does-routing-work-in-express-http-methods-route-parameters-query-strings-route-order-and-how-do-you-organize-routes-into-modules-with-expressrouter)
