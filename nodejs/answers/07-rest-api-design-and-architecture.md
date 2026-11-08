[⬅️ Previous: 06 · Middleware Architecture](06-middleware-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Auth & Security ➡️](08-authentication-security-and-best-practices.md)

---

## REST API Design

### 38. 🔴 P0 [C] What is a REST API, how do HTTP methods map to CRUD operations, and what is the difference between PUT and PATCH?

> **TL;DR:** REST (Representational State Transfer) is an architectural style for designing networked APIs using standard HTTP verbs and stateless resource URIs. **`PUT` completely replaces** an entire resource entity with the new payload. **`PATCH` partially updates** only the specified fields of an existing entity.

**Core Concept & Constraints**
1. **Statelessness:** Every request from client to server must contain all information required to understand and process the request. No client context is stored on the server between requests.
2. **Resource-Oriented URIs:** URIs should represent resources (nouns in plural, e.g., `/api/v1/orders`), never RPC actions/verbs (avoid `/api/v1/createOrder`).
3. **HTTP Verb Mapping:**
   - `POST` &rarr; **Create** (`201 Created` with `Location` header)
   - `GET` &rarr; **Read** (`200 OK` or `404 Not Found`)
   - `PUT` &rarr; **Replace / Full Update** (`200 OK` or `204 No Content`)
   - `PATCH` &rarr; **Partial Update** (`200 OK`)
   - `DELETE` &rarr; **Delete** (`204 No Content`)

**PUT vs PATCH Comparison**

| Attribute | `PUT` | `PATCH` |
| :--- | :--- | :--- |
| **Operation Type** | Complete replacement of the resource | Partial delta update of specified fields |
| **Missing Fields** | Erased or reset to database defaults | Preserved intact |
| **Idempotence** | **Idempotent** (calling $N$ times has same state) | Usually idempotent, but can be non-idempotent |
| **Typical Payload** | `{ "name": "Alice", "role": "admin", "bio": "..." }` | `{ "bio": "Updated bio only" }` |

**🛠️ Code / Visual Diagram / Table**

```javascript
// PUT: Complete entity replacement
app.put('/api/v1/users/:id', async (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'PUT requires all required fields for complete replacement' });
  }
  // Replaces the whole record; any existing unsupplied fields are wiped
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { overwrite: true, new: true }
  );
  res.json(updatedUser);
});

// PATCH: Partial field modification
app.patch('/api/v1/users/:id', async (req, res) => {
  // Updates only keys explicitly passed in req.body ($set)
  const patchedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.json(patchedUser);
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Verb in URL Anti-pattern:** Never expose RPC-style endpoints like `POST /api/delete-user` or `GET /api/user/get-all`. Use HTTP method semantics: `DELETE /api/users/:id` and `GET /api/users`.

---

### 39. 🔴 P0 [C] Which HTTP status codes should an API return for common cases, and what is the difference between 401 and 403?

> **TL;DR:** **200 OK** (success), **201 Created** (resource created), **204 No Content** (deletion success), **400 Bad Request** (validation error), **401 Unauthorized** (unauthenticated / missing or invalid token), **403 Forbidden** (authenticated but lacks role permissions), **404 Not Found**, **409 Conflict**, **422 Unprocessable Entity**, **429 Too Many Requests**, **500 Internal Error**.

**The Key Distinction: 401 vs 403**
- **`401 Unauthorized` &rarr; "Who are you?" (Authentication Failure):** The client failed to provide valid credentials (token is missing, expired, or malformed). The response should include a `WWW-Authenticate` header indicating how to authenticate.
- **`403 Forbidden` &rarr; "I know who you are, but you cannot enter." (Authorization Failure):** The client's identity is known and authenticated, but the user lacks sufficient RBAC privileges (e.g. a regular `user` attempting `DELETE /api/admin/system-logs`). Retrying with the same token will never succeed.

**Status Code Reference Matrix**

| Code | Name | Category | Meaning & Scenario |
| :---: | :--- | :--- | :--- |
| **`200`** | OK | Success | Standard success for `GET`, `PUT`, or `PATCH`. |
| **`201`** | Created | Success | Successful `POST` creating a new resource entity. |
| **`204`** | No Content | Success | Successful `DELETE`; server processed request with no response body. |
| **`301`** | Moved Permanently | Redirection | URI changed permanently; client redirects and caches. |
| **`304`** | Not Modified | Redirection | Cached resource remains fresh (`ETag`/`If-None-Match`). |
| **`400`** | Bad Request | Client Error | Malformed JSON syntax or missing query params. |
| **`401`** | Unauthorized | Client Error | Authentication required or token invalid/expired. |
| **`403`** | Forbidden | Client Error | Authenticated, but lacks required permissions/roles. |
| **`404`** | Not Found | Client Error | Resource URI does not exist on the server. |
| **`409`** | Conflict | Client Error | State conflict (e.g. email already registered in DB). |
| **`422`** | Unprocessable Entity | Client Error | Syntactically correct JSON, but failed semantic business rules. |
| **`429`** | Too Many Requests | Client Error | Rate limit exceeded. |
| **`500`** | Internal Server Error | Server Error | Uncaught exception or database crash. |
| **`502`** | Bad Gateway | Server Error | Reverse proxy (Nginx) received invalid response from Node.js upstream. |
| **`503`** | Service Unavailable | Server Error | Server overloaded or down for maintenance. |

**🛠️ Code / Visual Diagram / Table**

```javascript
// Demonstrating 401 vs 403 in Express middleware
function authGuard(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    // 401: Client is unauthenticated
    return res.status(401).json({ error: 'Authentication required. Token missing.' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // 401: Token is invalid or expired
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

function roleGuard(requiredRole) {
  return (req, res, next) => {
    // 403: User IS authenticated, but lacks permissions
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges.' });
    }
    next();
  };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The "200 OK with Error" Anti-Pattern:** Never return HTTP `200` with `{ "success": false, "error": "Invalid password" }`. Doing so breaks HTTP caching proxies, monitoring alarms (DataDog, Prometheus), and standard REST client libraries.

---

### 40. 🟠 P1 [C] What are safe and idempotent HTTP methods, and how do idempotency keys prevent duplicate processing?

> **TL;DR:** **Safe methods** (`GET`, `HEAD`, `OPTIONS`) are read-only and never alter server resource state. **Idempotent methods** (`GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`) produce the exact same server resource state regardless of whether they are executed 1 time or 100 times. `POST` is neither safe nor idempotent. **Idempotency keys** (unique client UUID headers cached in Redis) allow non-idempotent `POST` endpoints (like billing) to safely ignore duplicate retries.

**Safe vs Idempotent Methods Matrix**

| Method | Safe? | Idempotent? | Explanation |
| :---: | :---: | :---: | :--- |
| `GET` | ✅ Yes | ✅ Yes | Pure read operation; state never mutates. |
| `HEAD` | ✅ Yes | ✅ Yes | Identical to `GET`, but omits response body. |
| `OPTIONS`| ✅ Yes | ✅ Yes | Inquires about supported communication options. |
| `PUT` | ❌ No | ✅ Yes | Overwriting `status = "ACTIVE"` 5 times leaves `status = "ACTIVE"`. |
| `DELETE` | ❌ No | ✅ Yes | Deleting entity #42 once removes it; subsequent calls still leave it gone (404/204). |
| `POST` | ❌ No | ❌ No | Submitting `POST /orders` 3 times creates 3 distinct orders in the database. |
| `PATCH` | ❌ No | ⚠️ Sometimes | `{ $set: { name: "Bob" } }` is idempotent; `{ $inc: { views: 1 } }` is non-idempotent. |

**How Idempotency Keys Work in Payment/Order APIs**
1. Client generates a unique UUID (e.g. `Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`) and sends it in the header.
2. Server queries Redis:
   - **Key exists with response:** Return cached response immediately without re-executing credit card charges or DB writes.
   - **Key exists with status "IN_PROGRESS":** Return `409 Conflict` (request is currently executing).
   - **Key does not exist:** Lock the key, process the transaction, store the final response in Redis with a 24h TTL, and return.

**🛠️ Code / Visual Diagram / Table**

```javascript
const redis = require('./redisClient');

async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) return next(); // Not an idempotent call, proceed normally

  const cacheKey = `idempotency:${key}`;
  const cachedResponse = await redis.get(cacheKey);

  if (cachedResponse) {
    const { status, body } = JSON.parse(cachedResponse);
    return res.status(status).json(body); // Return previous result without re-processing!
  }

  // Intercept res.json to capture response before sending to client
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      redis.setex(cacheKey, 86400, JSON.stringify({ status: res.statusCode, body }));
    }
    return originalJson(body);
  };

  next();
}

app.post('/api/payments/charge', idempotencyMiddleware, paymentController.charge);
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Idempotency vs Return Value:** Idempotency guarantees identical *server resource state*, not identical *response codes*. The first `DELETE /users/10` may return `204 No Content`, and the second may return `404 Not Found`. Because the server state remains unchanged (user 10 is deleted), `DELETE` is still strictly idempotent.

---

### 41. 🟠 P1 [D] How do you implement pagination, filtering, and sorting, and what is the difference between offset and cursor pagination?

> **TL;DR:** **Offset Pagination** (`?page=2&limit=20` &rarr; `OFFSET 20 LIMIT 20`) is simple to implement and allows direct jumping to arbitrary pages, but suffers severe $O(N)$ performance degradation on large datasets and produces duplicate or skipped items if records are added/deleted. **Cursor Pagination** (`?after=cursor_token&limit=20` &rarr; `WHERE id > cursor LIMIT 20`) uses a indexed pointer to the last record, guaranteeing $O(1)$ query speed and consistent real-time infinite feeds.

**Offset vs Cursor Pagination Comparison**

| Feature | Offset Pagination (`OFFSET / LIMIT`) | Cursor Pagination (`Keyset`) |
| :--- | :--- | :--- |
| **SQL Mechanism** | `SELECT * FROM posts OFFSET 10000 LIMIT 20` | `SELECT * FROM posts WHERE id > 45000 LIMIT 20` |
| **Performance** | $O(N)$ &mdash; DB scans and discards 10,000 rows | $O(1)$ &mdash; Direct B-Tree index seek |
| **Data Drift Risk** | High (insertions cause duplicate/skipped items) | Zero (cursor is anchored to unique immutable ID) |
| **Jump to Page #N** | ✅ Yes (`page=50`) | ❌ No (only Next / Previous relative navigation) |
| **Best Used For** | Admin dashboards, internal reporting tables | Mobile feeds, Twitter/Reddit feeds, high-scale APIs |

**🛠️ Code / Visual Diagram / Table**

```javascript
// CURSOR-BASED PAGINATION IMPLEMENTATION (Express + SQL/Knex/Prisma pattern)
app.get('/api/posts', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 50);
  const cursor = req.query.cursor; // base64-encoded string: "timestamp_id"

  let query = db('posts').orderBy('id', 'desc').limit(limit + 1);

  if (cursor) {
    const decodedId = Buffer.from(cursor, 'base64').toString('ascii');
    query = query.where('id', '<', decodedId); // Fetch items older than cursor
  }

  const items = await query;
  const hasMore = items.length > limit;
  const results = hasMore ? items.slice(0, limit) : items;

  const nextCursor = hasMore
    ? Buffer.from(String(results[results.length - 1].id)).toString('base64')
    : null;

  res.json({
    data: results,
    pagination: {
      hasMore,
      nextCursor
    }
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The "Offset 1,000,000" Performance Cliff:** In PostgreSQL/MySQL, `OFFSET 1000000 LIMIT 10` reads 1,000,010 records from disk into memory, sorts them, discards the first 1,000,000, and returns only 10. This causes massive I/O load and latency spikes. Always recommend cursor pagination for high-volume public endpoints.

---

### 42. 🟠 P1 [D] How do you structure an Express project (layered architecture)?

> **TL;DR:** Use a **3-Tier Layered Architecture (Controller-Service-Repository pattern)** to decouple HTTP routing, business logic, and database operations. Routes map URLs to controllers; **Controllers** handle HTTP request/response parsing and status codes; **Services** execute framework-agnostic business logic; **Repositories/Models** manage direct database queries.

**Architectural Flow**

```
[ HTTP Request ]
       │
       ▼
[ Routes Layer ]       ──> (Matches /api/v1/users, attaches auth/validation middleware)
       │
       ▼
[ Controller Layer ]   ──> (Extracts req.body, validates params, sends res.status(200).json)
       │
       ▼
[ Service Layer ]      ──> (Pure business logic: hashing, calculations, third-party APIs)
       │
       ▼
[ Repository / Model ] ──> (Direct DB queries via Prisma, Mongoose, Knex, or pg)
```

**Directory Structure**

```
src/
├── config/             # Environment variables, database connection pools
├── routes/             # Express routers (e.g. user.routes.js)
├── controllers/        # Request handling & HTTP status mappings (user.controller.js)
├── services/           # Domain business rules & integrations (user.service.js)
├── models/             # Database schemas & repositories (user.model.js)
├── middlewares/        # Auth, rate limiting, error handling, validators
├── utils/              # Custom AppError class, logger, helpers
└── app.js              # Express app initialization (without app.listen)
```

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Controller (HTTP awareness only, NO direct database queries):
// controllers/user.controller.js
const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// 2. Service (Framework-agnostic, testable without mocking req/res):
// services/user.service.js
const userRepository = require('../models/user.repository');
const bcrypt = require('bcryptjs');

exports.createUser = async ({ email, password }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  return await userRepository.create({ email, password: hashedPassword });
};
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Fat Controller Anti-pattern:** Placing database queries (`User.find()`), Stripe API charges, and email dispatch directly in route controller functions makes unit testing impossible without mocking the entire HTTP request/response cycle. Keep controllers lean ($< 25$ lines per action).

---

### 43. 🟠 P1 [C] How do you version an API, and why should errors follow a consistent response format?

> **TL;DR:** Version APIs primarily via **URI Path prefix** (`/api/v1/orders`), which is explicit, easy to route through Nginx/API gateways, and browsable. Alternatively, use custom headers (`Accept-Version: v1`). Standardize all error responses into a uniform JSON schema (`{ success: false, error: { code, message, details, timestamp } }`) so frontend clients can build centralized error handling and UI notifications without unexpected crashes.

**API Versioning Strategies Compared**

| Strategy | Syntax | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **URI Path (Recommended)** | `/api/v1/products` | Highly visible, easy to route/cache at CDN, simple for clients | Clutters URI with versioning metadata |
| **Custom Header** | `X-API-Version: 2` | Clean URIs, easy default fallbacks | Difficult to test directly in browser address bar |
| **Content Negotiation** | `Accept: application/vnd.app.v2+json` | Follows strict REST HATEOAS standards | Complex to configure and debug via curl/Postman |

**Production Standardized JSON Error Contract**

```json
{
  "success": false,
  "status": "fail",
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "Validation failed on user registration",
    "details": [
      { "field": "email", "issue": "Invalid email format" },
      { "field": "password", "issue": "Password must be at least 8 characters" }
    ],
    "timestamp": "2026-11-08T22:45:00.000Z",
    "path": "/api/v1/users"
  }
}
```

**🛠️ Code / Visual Diagram / Table**

```javascript
// Centralized Error Middleware producing standard JSON envelopes:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  res.status(statusCode).json({
    success: false,
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
    error: {
      code: err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR'),
      message: isOperational ? err.message : 'An unexpected error occurred. Please try again.',
      details: err.details || null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Leaking Stack Traces in Production:** Never expose `err.stack` or raw SQL/Mongo error objects (`err.originalError`) in production error responses. Attackers use internal table names, column structures, and file system paths exposed in stack traces to craft targeted SQL injection and remote code execution attacks. Always check `process.env.NODE_ENV === 'production'`.

---

[⬅️ Previous: 06 · Middleware Architecture](06-middleware-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Auth & Security ➡️](08-authentication-security-and-best-practices.md)
