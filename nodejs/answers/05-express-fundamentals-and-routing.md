[⬅️ Previous: 04 · Streams, Concurrency & Errors](04-streams-concurrency-and-error-handling.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Middleware Architecture ➡️](06-middleware-architecture.md)

---

## Express Fundamentals

### 28. 🔴 P0 [C] What is Express.js, what does it add over the core `http` module, and what is `express.Router()`?

> **TL;DR:** Express.js is a minimalist web framework for Node.js. It adds a powerful routing system, middleware stack execution pipeline, request/response helper utility methods (`res.json()`, `req.params`), and template engine support over the core `http` module. `express.Router()` creates isolated, modular route mini-apps.

**💡 Core Concept & Explanation**
Instead of writing giant `if (req.url === '/users' && req.method === 'GET')` blocks inside a single `http.createServer` callback, Express organizes routes into modular controller files.

---

### 29. 🔴 P0 [Q] How does routing work in Express, and how do you organize routes into modules with `express.Router()`?

> **TL;DR:** Routes match incoming HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and URL path patterns (`/users/:id`). `express.Router()` extracts route definitions into standalone module files that are mounted into the main app via `app.use('/api/v1/users', userRouter)`.

**🛠️ Code / Visual Diagram / Table**

```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;

// app.js
const userRouter = require('./routes/userRoutes');
app.use('/api/v1/users', userRouter); // Mounts to /api/v1/users/:id
```

---

### 30. 🔴 P0 [Q] What are `req.params`, `req.query`, and `req.body`, and why is `req.body` undefined without body-parsing middleware?

> **TL;DR:** 
> - **`req.params`:** Route path parameters defined in the URL schema (`/users/:id` $\rightarrow$ `{ id: '123' }`).
> - **`req.query`:** URL query string parameters after `?` (`/search?q=phone` $\rightarrow$ `{ q: 'phone' }`).
> - **`req.body`:** Key-value payload sent in the HTTP request body. It is `undefined` by default because raw HTTP request bodies are Readable Streams; you must use `express.json()` middleware to parse JSON payloads into JS objects.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const app = express();

// MANDATORY middleware to populate req.body from JSON payload stream:
app.use(express.json());

app.post('/users/:groupId', (req, res) => {
  console.log(req.params.groupId); // Route Param
  console.log(req.query.role);     // Query Param (?role=admin)
  console.log(req.body.email);     // Body Payload
});
```

---

### 31. 🟠 P1 [Q] What is the difference between response methods (`res.json`, `res.send`), and what causes "Cannot set headers after they are sent"?

> **TL;DR:** `res.json()` sends a JSON response with correct `Content-Type: application/json` headers. `res.send()` sends strings, buffers, or objects auto-detecting headers. The error **"Cannot set headers after they are sent"** occurs when your code attempts to send multiple HTTP responses (`res.json()` or `res.redirect()`) for a single request (e.g. forgetting a `return` keyword).

**🛠️ Code / Visual Diagram / Table**

```javascript
// BUG (Missing 'return' sends response TWICE!):
app.get('/user', (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' }); // Sends headers!
  }
  res.json({ data: 'Secret Data' }); // ❌ CRASHES: Cannot set headers after sent!
});

// FIX (Add 'return'):
if (!req.user) {
  return res.status(401).json({ error: 'Unauthorized' }); // ✅ Exits function!
}
```

---

### 32. 🟠 P1 [C] What changed in Express 5 (automatic forwarding of async errors, stricter route syntax)?

> **TL;DR:** Express 5 **automatically catches rejected Promises inside async route handlers** and forwards them to the global error middleware (`next(err)`), eliminating the need for `express-async-handler` wrappers. It also enforces stricter route path matching and requires Node.js 18+.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Express 4 (Required try/catch or wrapper):
app.get('/user', async (req, res, next) => {
  try {
    const data = await db.find();
    res.json(data);
  } catch (err) { next(err); } // Required manual forwarding!
});

// Express 5 (Automatic rejected promise handling!):
app.get('/user', async (req, res) => {
  const data = await db.find(); // If db.find() rejects, Express 5 automatically passes error to error middleware!
  res.json(data);
});
```

---

[⬅️ Previous: 04 · Streams, Concurrency & Errors](04-streams-concurrency-and-error-handling.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Middleware Architecture ➡️](06-middleware-architecture.md)
