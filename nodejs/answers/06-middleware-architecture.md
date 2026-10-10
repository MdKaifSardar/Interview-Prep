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

> **TL;DR:** `express.static('public')` serves images, CSS, and JS files from a folder. Catch unmatched 404 routes by placing a catch-all route `app.use('*', (req, res, next) => ...)` at the very end of your route declarations, before the error middleware.

---

### 37. 🟠 P1 [C] What do common third-party middleware do (`cors`, `helmet`, `morgan`, `express-rate-limit`)?

> **TL;DR:** 
> - **`helmet`:** Sets secure HTTP response headers (HSTS, CSP, X-Frame-Options) to protect against common web vulnerabilities.
> - **`cors`:** Enables Cross-Origin Resource Sharing headers.
> - **`morgan`:** HTTP request logger for terminal output.
> - **`express-rate-limit`:** Limits repeated requests from IP addresses to prevent DDoS and brute-force attacks.

---

[⬅️ Previous: 05 · Express Fundamentals](05-express-fundamentals-and-routing.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · REST API Design ➡️](07-rest-api-design-and-architecture.md)
