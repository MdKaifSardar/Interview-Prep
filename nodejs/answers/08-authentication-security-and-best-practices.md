[⬅️ Previous: 07 · REST API Design](07-rest-api-design-and-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Performance & Testing ➡️](09-performance-production-and-testing.md)

---

## Authentication & Security

### 44. 🔴 P0 [Q] Why must request input be validated on the server, and how do you validate it in middleware (Zod)?

> **TL;DR:** Client-side validation can be easily bypassed using tools like Postman or Curl. Server-side validation ensures invalid data, malformed payloads, or malicious scripts never reach database queries. Use schema validation libraries like **Zod** inside a validation middleware wrapper.

**🛠️ Code / Visual Diagram / Table**

```javascript
const { z } = require('zod');

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    res.status(400).json({ status: 'fail', errors: err.errors });
  }
};

app.post('/users', validate(createUserSchema), controller.createUser);
```

---

### 45. 🔴 P0 [Q] How do you store passwords securely (bcrypt or argon2, salting), and why are plain text or MD5/SHA-256 unsafe?

> **TL;DR:** Never store plain text passwords or fast cryptographic hashes (MD5/SHA-256 can be cracked in seconds via rainbow tables/GPUs). Use slow, key-stretching password hashing algorithms like **bcrypt** or **argon2** with dynamic salting. Salting adds unique random bytes to every password before hashing, preventing pre-computed rainbow table lookup attacks.

---

### 46. 🔴 P0 [Q] How does JWT authentication work in Express (signing, verifying, auth middleware), and how do access and refresh tokens work together?

> **TL;DR:** JWTs (JSON Web Tokens) contain digitally signed JSON payloads (`header.payload.signature`). Login issues a short-lived **Access Token** (15m) and long-lived **Refresh Token** (7d). An `auth` middleware verifies the access token on protected routes using `jwt.verify(token, secret)`.

**🛠️ Code / Visual Diagram / Table**

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
```

---

### 47. 🔴 P0 [C] What is the difference between session-based and token-based authentication?

> **TL;DR:** **Session-based auth** stores session data in server memory/Redis and sends a `connect.sid` cookie; it requires stateful server lookups. **Token-based auth (JWT)** is stateless; the client stores the signed token and sends it in HTTP headers, allowing any server instance to verify the signature without DB lookups.

---

### 48. 🟠 P1 [Q] How do you implement role-based authorization as middleware?

> **TL;DR:** Create a higher-order middleware function accepting allowed roles `restrictTo('admin', 'manager')` that checks `req.user.role` after `auth` middleware verifies authentication.

```javascript
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

app.delete('/users/:id', authMiddleware, restrictTo('admin'), controller.deleteUser);
```

---

### 49. 🔴 P0 [C] How do you configure CORS in an Express API, and why can't origin '*' be used with credentials?

> **TL;DR:** Configure CORS using `cors({ origin: 'https://myapp.com', credentials: true })`. Browsers explicitly forbid wildcard `origin: '*'` when `credentials: true` (cookies/authorization headers) is enabled to prevent security leaks across malicious origins.

---

### 50. 🟠 P1 [C] What are common security risks in Node/Express apps and how to mitigate them?

> **TL;DR:** 
> - **SQL/NoSQL Injection:** Use ORM/ODM parameterized queries (Mongoose/Prisma).
> - **XSS:** Sanitize input and set `Helmet` headers.
> - **CSRF:** Use `SameSite=Strict` cookies.
> - **Brute Force:** Apply `express-rate-limit`.
> - **Vulnerable Packages:** Run `npm audit` regularly in CI/CD.

---

[⬅️ Previous: 07 · REST API Design](07-rest-api-design-and-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Performance & Testing ➡️](09-performance-production-and-testing.md)
