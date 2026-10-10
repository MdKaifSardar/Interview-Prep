[⬅️ Previous: 06 · Middleware Architecture](06-middleware-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Auth & Security ➡️](08-authentication-security-and-best-practices.md)

---

## REST API Design

### 38. 🔴 P0 [C] What is a REST API, how do HTTP methods map to CRUD operations, and what is the difference between PUT and PATCH?

> **TL;DR:** REST (Representational State Transfer) is an architectural style for designing networked APIs using standard HTTP verbs and stateless resource URIs. **`PUT` completely replaces** an entire resource entity with the new payload. **`PATCH` partially updates** only the specified fields of an existing entity.

---

### 39. 🔴 P0 [C] Which HTTP status codes should an API return for common cases, and what is the difference between 401 and 403?

> **TL;DR:** **200 OK** (success), **201 Created** (resource created), **204 No Content** (deletion success), **400 Bad Request** (validation error), **401 Unauthorized** (unauthenticated / missing valid token), **403 Forbidden** (authenticated but lacks role permissions), **404 Not Found**, **409 Conflict**, **429 Too Many Requests**, **500 Internal Error**.

---

### 40. 🟠 P1 [C] What are safe and idempotent HTTP methods, and how do idempotency keys prevent duplicate processing?

> **TL;DR:** **Safe methods** (`GET`, `HEAD`) do not modify server data. **Idempotent methods** (`GET`, `PUT`, `DELETE`) produce identical server state regardless of how many times the exact request is executed. `POST` is non-idempotent. Idempotency keys (`Idempotency-Key` header stored in Redis) ensure retried payment POST requests do not charge a user twice.

---

### 41. 🟠 P1 [D] How do you implement pagination, filtering, and sorting, and what is the difference between offset and cursor pagination?

> **TL;DR:** **Offset Pagination** (`?page=2&limit=20`, `OFFSET 20 LIMIT 20`) is simple but suffers performance degradation on large datasets and skips/duplicates items if data changes. **Cursor Pagination** (`?after=cursor_id&limit=20`) uses a pointer to the last retrieved record, offering $O(1)$ database index performance and stable real-time feed paging.

---

### 42. 🟠 P1 [D] How do you structure an Express project (layered architecture)?

> **TL;DR:** Use a **Layered Architecture (Controller-Service-Repository pattern)**:
> 1. **Routes (`/routes`):** Defines URL endpoints and attaches middleware.
> 2. **Controllers (`/controllers`):** Handles HTTP request/response parsing, status codes, and input validation.
> 3. **Services (`/services`):** Implements business logic (framework-agnostic).
> 4. **Models/Repositories (`/models`):** Manages raw database queries.

---

### 43. 🟠 P1 [C] How do you version an API, and why should errors follow a consistent response format?

> **TL;DR:** Version APIs via URI path prefix (`/api/v1/users`) or custom headers. Standardize all error responses to return a uniform JSON schema (`{ success: false, error: { code, message, details } }`) so frontend clients can handle errors predictably.

---

[⬅️ Previous: 06 · Middleware Architecture](06-middleware-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Auth & Security ➡️](08-authentication-security-and-best-practices.md)
