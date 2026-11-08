[⬅️ Previous: 05 · Express Fundamentals](05-express-fundamentals-and-routing.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · REST API Design ➡️](07-rest-api-design-and-architecture.md)

---

## Middleware

### 33. 🔴 P0 [C] What is middleware in Express, what does `next()` do, and how does a request flow through the middleware stack?

> **TL;DR:** Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` function in the application's request-response cycle. Calling `next()` yields execution control to the next middleware in the stack. Omitting `next()` and not sending a response causes the request to hang indefinitely.

**🛠️ Code / Visual Diagram / Table**

```
[ Incoming Request ] ──> [ Middleware 1 (Logger) ] ──> next()
                                  │
                                  ▼
                         [ Middleware 2 (Auth) ] ──> next()
                                  │
                                  ▼
                         [ Controller Route ] ──> res.json() (Response Sent)
```

---

### 34. 🔴 P0 [Q] What are the types of middleware, and why does the order of `app.use()` calls matter?

> **TL;DR:** 5 Types: Application-level (`app.use`), Router-level (`router.use`), Built-in (`express.json`), Third-party (`cors`), and Error-handling (`app.use((err, req, res, next) => ...)`). Order matters strictly because Express executes middleware sequentially in the exact order they are mounted using `app.use()`.

**⚠️ Interview Pitfall / Pro-Tip**
If you register `app.use(express.json())` *after* defining your routes, `req.body` will be `undefined` inside those routes! Always register body parsers and security headers at the top of your middleware stack.

---

### 35. 🔴 P0 [Q] How does error-handling middleware work (the four-argument signature), and how do you forward errors with `next(err)`?

> **TL;DR:** Error-handling middleware **MUST have exactly 4 parameters: `(err, req, res, next)`**. Express identifies error-handling middleware specifically by checking `fn.length === 4`. To trigger it from anywhere in your app, pass an error object into `next(err)`.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Express Error Handling Middleware (MUST keep all 4 args even if next is unused!):
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});
```

---

### 36. 🟠 P1 [Q] How do you serve static files with `express.static()`, and how do you handle unmatched 404 routes?

> **TL;DR:** `express.static(root, [options])` serves files (images, CSS, JS) directly from a specified directory using HTTP streaming. Handle unmatched 404 routes by mounting a catch-all middleware (`app.all('*', ...)`) as the very last route *before* the global error-handling middleware, either returning a 404 response directly or passing a `NotFoundError` into `next(err)`.

**Core Concept & Architecture**
- **Static Assets:** `express.static` uses the `send` library under the hood. It checks if the requested path corresponds to an actual file on disk, streams it with appropriate MIME types (`Content-Type`), and handles conditional requests (`ETag`, `Last-Modified`, `304 Not Modified`).
- **404 Handling:** In Express, a 404 is not an error that causes a crash—it simply means the request reached the bottom of the middleware stack without any route handler sending a response. The canonical production approach is to forward a 404 error through `next(err)` so your centralized error handler formats the JSON response consistently.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// 1. Serving static files with caching options
app.use('/static', express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',          // Set Cache-Control max-age header
  etag: true,            // Enable ETag generation for 304 validation
  dotfiles: 'ignore',    // Ignore hidden files (e.g. .env, .git)
  index: false           // Disable automatic index.html directory listing
}));

// 2. Defined API routes
app.get('/api/users', (req, res) => res.json({ users: [] }));

// 3. Catch-All 404 Handler (MUST be after all valid routes, before error middleware)
app.all('*', (req, res, next) => {
  const err = new Error(`Cannot find ${req.method} ${req.originalUrl} on this server`);
  err.statusCode = 404;
  next(err); // Forward directly to the 4-argument error handler
});

// 4. Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Relative Path Trap:** Never write `app.use(express.static('public'))`. Relative paths resolve against `process.cwd()` (the directory from which you executed `node`), not the directory where the file lives. If you run your server from the root directory or via PM2/monorepos, relative paths break. Always wrap with `path.join(__dirname, 'public')`.

---

### 37. 🟠 P1 [C] What do common third-party middleware do (`cors`, `helmet`, `morgan`, `express-rate-limit`)?

> **TL;DR:** 
> - **`helmet`:** Sets 15+ secure HTTP response headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options) to protect against XSS, clickjacking, and MIME sniffing.
> - **`cors`:** Implements the W3C Cross-Origin Resource Sharing spec to allow secure cross-domain browser requests.
> - **`morgan`:** HTTP request logger for debugging and latency tracking in terminal/standard streams.
> - **`express-rate-limit`:** Throttles incoming client requests by IP address to mitigate brute-force and DoS attacks.

**Core Concept & Standard Production Sequence**
Middleware order is critical. Security headers and logging should execute on *every* request (including requests rejected later), rate limiters should protect before expensive body parsing, and route handlers run last.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. HELMET - Security headers FIRST (protects against well-known web vulnerabilities)
app.use(helmet());

// 2. CORS - Cross-origin permission handling
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// 3. MORGAN - Request Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 4. EXPRESS-RATE-LIMIT - Throttle requests by IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute sliding window
  max: 100,                  // Limit each IP to 100 requests per window
  standardHeaders: true,     // Return standard RateLimit-* headers
  legacyHeaders: false,      // Disable legacy X-RateLimit-* headers
  message: { status: 429, error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);     // Apply specifically to API routes

// 5. Body Parsers (placed after rate limiting to avoid parsing abusive payloads)
app.use(express.json({ limit: '10kb' }));
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Reverse Proxy IP Gotcha:** When deploying behind a reverse proxy (AWS ALB, Nginx, Cloudflare), all incoming requests appear to originate from the proxy's internal IP. If you don't configure `app.set('trust proxy', 1)`, `express-rate-limit` will treat all concurrent users worldwide as a *single* user and lock out your entire application!

---

[⬅️ Previous: 05 · Express Fundamentals](05-express-fundamentals-and-routing.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · REST API Design ➡️](07-rest-api-design-and-architecture.md)
