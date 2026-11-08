[⬅️ Previous: 07 · REST API Design](07-rest-api-design-and-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Performance & Testing ➡️](09-performance-production-and-testing.md)

---

## Authentication & Security

### 44. 🔴 P0 [Q] Why must request input be validated on the server, and how do you validate it in middleware (Zod)?

> **TL;DR:** Client-side validation can be easily bypassed using tools like Postman, Curl, or browser dev tools. Server-side validation is a strict security boundary that guarantees invalid data, malformed payloads, or malicious scripts never reach database queries. Use schema validation libraries like **Zod** inside a reusable validation middleware wrapper.

**Core Concept & Architecture**
- **Why Validate on the Server:** Client-side validation exists purely for user experience (instant feedback). Server-side validation guarantees application integrity, enforces business constraints (string lengths, email formats, enum values), and strips unexpected or hostile fields before they reach controllers and ORMs.
- **Zod Middleware Pattern:** Zod schemas define the required shape of `req.body`, `req.query`, and `req.params`. A higher-order middleware function calls `schema.parseAsync()`. If validation fails, it catches the `ZodError` and returns `400 Bad Request` or `422 Unprocessable Entity` with structured field errors.

**🛠️ Code / Visual Diagram / Table**

```javascript
const { z } = require('zod');

// 1. Define strictly typed Zod validation schema
const registerUserSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Invalid email address format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['user', 'editor']).default('user')
  })
});

// 2. Reusable validation middleware factory
const validate = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    // Assign stripped, validated data back to req to purge unwhitelisted fields
    req.body = validated.body;
    req.query = validated.query;
    req.params = validated.params;
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 'fail',
        errors: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    next(err);
  }
};

// 3. Attach to route
app.post('/api/v1/auth/register', validate(registerUserSchema), authController.register);
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Mass Assignment Vulnerability:** If you directly pass `User.create(req.body)` without stripping unvalidated fields, an attacker can submit `{ "email": "a@a.com", "role": "admin" }` and elevate their privileges. Using `schema.parse()` guarantees only declared fields pass through.

---

### 45. 🔴 P0 [Q] How do you store passwords securely (bcrypt or argon2, salting), and why are plain text or MD5/SHA-256 unsafe?

> **TL;DR:** Plain text passwords are fatal if database dumps leak. Fast cryptographic hashes like MD5 and SHA-256 are dangerous because modern GPUs can compute billions of hashes per second, cracking passwords instantly via precomputed **Rainbow Tables**. Secure password storage requires **slow, key-stretching, salted hashing algorithms** like **bcrypt** or **argon2** with an adaptive cost factor (work factor).

**Why Fast Hashes (MD5/SHA-256) Fail vs Slow Hashes (bcrypt/argon2)**
- **Speed is the Enemy of Passwords:** SHA-256 was designed for rapid data integrity validation (millions of ops/sec). An attacker with an RTX 4090 GPU can test $> 10$ billion SHA-256 combinations per second.
- **Salting:** A salt is a cryptographically random string (e.g. 16+ bytes) appended to each password *before* hashing. It ensures identical passwords produce completely different hash outputs, rendering precomputed Rainbow Tables useless.
- **Cost Factor (Work Factor):** `bcrypt` uses an exponential work factor parameter (e.g., $2^{12} = 4,096$ iterations). As hardware speeds up, developers can increase the work factor without altering the existing database schema.

**🛠️ Code / Visual Diagram / Table**

```javascript
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12; // Recommended balance between security and server latency (~200ms)

// 1. Hashing password on user creation / update
async function hashPassword(plainPassword) {
  // Generates salt and hashes in one step (cost factor 12)
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

// 2. Verifying password on login (constant-time comparison prevents timing attacks)
async function verifyPassword(candidatePassword, storedHash) {
  return await bcrypt.compare(candidatePassword, storedHash);
}

// Example usage in authentication controller:
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  // Guard against user enumeration & timing attacks: compare dummy hash if user not found
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ success: true, message: 'Logged in successfully' });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The Event Loop Blocker (`hashSync`):** Never use `bcrypt.hashSync()` or `bcrypt.compareSync()` inside an Express server. Password hashing is deliberately CPU-intensive. Running synchronous hashing for 200ms blocks the single Node.js JavaScript thread, freezing all concurrent requests for all other users. Always use the asynchronous, libuv-backed `bcrypt.hash()`.

---

### 46. 🔴 P0 [Q] How does JWT authentication work in Express (signing, verifying, auth middleware), and how do access and refresh tokens work together?

> **TL;DR:** JWTs (JSON Web Tokens) are digitally signed strings consisting of three base64URL-encoded parts: `header.payload.signature`. Modern architectures use a dual-token strategy: a short-lived **Access Token** (15 mins, sent in `Authorization: Bearer <token>` header) and a long-lived **Refresh Token** (7 days, stored in an `httpOnly`, `SameSite=Strict` cookie) to reissue access tokens without forcing repeated user logins.

**Access Token vs Refresh Token Workflow**

```
[ Client ]                             [ Server ]
    │                                      │
    ├── 1. POST /login (credentials) ────>│ (Validates email & password)
    │<── 2. Access Token (15m JSON) ───────┤ (Generates Access Token + Refresh Token)
    │       + Refresh Token (httpOnly)     │ (Stores Refresh Token hash in DB / Redis)
    │                                      │
    ├── 3. GET /api/orders (Bearer token) >│ (Auth middleware verifies signature)
    │<── 4. 200 OK (Orders data) ──────────┤
    │    ... 15 minutes pass ...           │
    ├── 5. GET /api/orders (Expired token)>│
    │<── 6. 401 Unauthorized (TokenExpired)│
    │                                      │
    ├── 7. POST /api/auth/refresh ────────>│ (Validates refresh cookie & DB whitelist)
    │<── 8. New Access Token ──────────────┤ (Rotates refresh token in DB)
```

**🛠️ Code / Visual Diagram / Table**

```javascript
const jwt = require('jsonwebtoken');

// 1. Generation Helper
function generateTokens(user) {
  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { sub: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
}

// 2. Auth Middleware Guard
function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **JWTs Are NOT Encrypted:** The payload in a JWT is only base64URL encoded, readable by anyone who inspects it. Never store sensitive secrets, passwords, or credit card numbers in a JWT payload. Use JWTs strictly for claims like user ID, roles, and expiration.

---

### 47. 🔴 P0 [C] What is the difference between session-based and token-based authentication?

> **TL;DR:** **Session-based auth** is **stateful**: session state is kept in server memory or Redis, and the client receives a random session ID in an `httpOnly` cookie. **Token-based auth (JWT)** is **stateless**: user claims and digital signatures are contained inside the token held by the client, allowing any server node to verify authentication without database lookups.

**Session vs Token Comparison Matrix**

| Feature | Session-Based Authentication | Token-Based Authentication (JWT) |
| :--- | :--- | :--- |
| **State Storage** | Stateful (stored on server / Redis) | Stateless (stored on client) |
| **Server Memory** | Consumes RAM/Redis memory per active user | Zero server memory overhead |
| **Horizontal Scaling** | Requires sticky sessions or centralized Redis session cluster | Seamlessly scales across microservices & serverless nodes |
| **Immediate Revocation**| **Trivial** (delete session key from Redis) | **Hard** (token remains valid until expiration unless blacklisted) |
| **Cross-Domain / Mobile**| Complex (browsers restrict cross-site cookies) | Easy (works across mobile apps, SPAs, APIs via headers) |
| **Primary Vulnerability** | Cross-Site Request Forgery (CSRF) | Cross-Site Scripting (XSS) if stored in `localStorage` |

**Token Revocation Strategy in Production**
Because pure JWTs are stateless, you cannot simply "delete" an access token. Production architectures handle revocation using:
1. **Short Expiration (15m):** Minimizes the blast radius of a compromised token.
2. **Redis Blacklist for Logout:** On user logout, store the token's `jti` (unique JWT ID) in Redis with a TTL equal to the token's remaining lifespan. The auth middleware checks this blacklist.
3. **Refresh Token Rotation:** On every refresh call, invalidate the old refresh token and issue a new one. If an invalidated refresh token is reused, revoke the entire token family (detecting token theft).

**⚠️ Interview Pitfall / Pro-Tip**
- **`localStorage` vs `httpOnly` Cookies:** Storing JWTs in browser `localStorage` leaves them susceptible to theft via Cross-Site Scripting (XSS). Storing tokens in `httpOnly`, `Secure`, `SameSite=Strict` cookies prevents JavaScript from reading the token, mitigating XSS token extraction.

---

### 48. 🟠 P1 [Q] How do you implement role-based authorization as middleware?

> **TL;DR:** Implement RBAC (Role-Based Access Control) using a higher-order middleware factory `restrictTo(...allowedRoles)` that executes *after* the authentication middleware. It checks whether `req.user.role` is included in the allowed roles list; if not, it immediately returns `403 Forbidden`.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. RBAC Middleware Factory
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user was populated by previous authGuard middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        error: 'Forbidden: You do not have permission to perform this action'
      });
    }
    next();
  };
};

// 2. Route Protection Examples
// Only authenticated users can view posts
app.get('/api/posts', authGuard, postController.getAll);

// Only editors and admins can create posts
app.post('/api/posts', authGuard, restrictTo('editor', 'admin'), postController.create);

// Only admins can delete users
app.delete('/api/users/:id', authGuard, restrictTo('admin'), userController.delete);
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Middleware Execution Order:** Always place `authGuard` *before* `restrictTo`. If you place `restrictTo` first, `req.user` will be `undefined`, throwing an unhandled TypeError or rejecting every request.

---

### 49. 🔴 P0 [C] How do you configure CORS in an Express API, and why can't origin '*' be used with credentials?

> **TL;DR:** Configure CORS using the `cors` package with a whitelist validation function and `credentials: true`. Browsers **explicitly forbid wildcard `origin: '*'` when `credentials: true`** because allowing arbitrary foreign domains to send requests that automatically attach authentication cookies or credentials would destroy web security, enabling universal cross-site session hijacking.

**Simple Requests vs Preflight Requests**
- **Simple Requests:** `GET`, `HEAD`, `POST` with standard headers (`Content-Type: text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`). The browser sends the request immediately with an `Origin` header.
- **Preflighted Requests:** Triggered when the request uses non-standard methods (`PUT`, `DELETE`, `PATCH`) or custom headers (`Authorization`, `Content-Type: application/json`). The browser sends an `OPTIONS` HTTP request first to ask the server for permission before sending the actual request.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'https://myproductionapp.com',
  'https://staging.myproductionapp.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Origin not allowed'));
    }
  },
  credentials: true, // Allow cookies & authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // Cache preflight response for 24 hours to reduce OPTIONS requests
};

app.use(cors(corsOptions));
```

**⚠️ Interview Pitfall / Pro-Tip**
- **CORS is a Browser-Only Security Mechanism:** CORS is enforced by web browsers, not servers. It does not stop a malicious hacker from making direct API calls via curl, Python, or Postman. Server endpoints must still authenticate every request regardless of CORS settings.

---

### 50. 🟠 P1 [C] What are common security risks in Node/Express apps and how to mitigate them?

> **TL;DR:** The primary security vulnerabilities in Node/Express are: **NoSQL/SQL Injection** (attacker controls query structure), **XSS** (injected client scripts), **CSRF** (unauthorized actions via ambient cookies), **ReDoS** (CPU exhaustion via complex regular expressions), and **BOLA / IDOR** (direct object references without ownership verification).

**Top 5 Vulnerabilities & Mitigations Breakdown**

| Vulnerability | Attack Mechanism | Express Mitigation |
| :--- | :--- | :--- |
| **NoSQL Injection** | Attacker passes `{ "$gt": "" }` in password field to bypass login | Use `express-mongo-sanitize` to strip `$` and `.` characters |
| **SQL Injection** | Attacker inputs `' OR 1=1 --` into raw SQL string concatenation | Use parameterized queries via ORMs (Prisma, Sequelize, Knex) |
| **Cross-Site Scripting (XSS)** | Malicious `<script>` tags stored in DB and rendered in browser DOM | Set `helmet()`, sanitize input with `xss-clean`, use textContent |
| **CSRF** | Malicious site triggers state-changing POST using browser cookies | Use `SameSite=Strict` or `SameSite=Lax` cookie flags |
| **ReDoS (RegEx DoS)** | Evil regex input causes exponential backtracking in V8 thread | Avoid nested quantifiers `(a+)+$`; use `safe-regex` linter |

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Example of NoSQL Injection Vulnerability:
// POST /api/login with body: { "email": "admin@app.com", "password": { "$gt": "" } }
// BUGGY: User.findOne({ email: req.body.email, password: req.body.password })
// Mongo evaluates password > "" as TRUE, logging in without password!

// 2. Defense: Sanitize all inputs against MongoDB operators:
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // Strips any keys starting with '$' or containing '.'

// 3. Prevent Parameter Pollution (HPP):
// Attacker sends: /api/items?sort=price&sort=name (turns req.query.sort into array!)
const hpp = require('hpp');
app.use(hpp({ whitelist: ['price', 'rating'] }));

// 4. Broken Object Level Authorization (BOLA/IDOR) Defense:
// Never trust req.params.id without verifying resource ownership!
app.delete('/api/documents/:id', authGuard, async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!doc) {
    return res.status(404).json({ error: 'Document not found or access denied' });
  }
  await doc.deleteOne();
  res.status(204).send();
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`npm audit` in CI/CD:** Dependencies are the largest attack surface in Node.js. Incorporate `npm audit --audit-level=high` in your GitHub Actions pipeline to prevent shipping vulnerable open-source dependencies into production.

---

[⬅️ Previous: 07 · REST API Design](07-rest-api-design-and-architecture.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Performance & Testing ➡️](09-performance-production-and-testing.md)
