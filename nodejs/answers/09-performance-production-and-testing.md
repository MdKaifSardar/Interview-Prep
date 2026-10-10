[⬅️ Previous: 08 · Auth & Security](08-authentication-security-and-best-practices.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Output & Debugging ➡️](10-output-and-debugging-questions.md)

---

## Performance & Production

### 51. 🟠 P1 [P] How do you diagnose performance problems and memory leaks in a Node app?

> **TL;DR:** Use Node's built-in profiler (`node --inspect`), take Heap Snapshots via Chrome DevTools to compare retained memory objects, monitor event loop lag using `perf_hooks`, and trace CPU flamegraphs.

---

### 52. 🟠 P1 [P] What is caching, and how would you add an in-memory or Redis cache to an Express endpoint?

> **TL;DR:** Caching stores expensive API query results in high-speed memory. Check Redis first using a key (`redis.get(key)`). If cached, return data instantly (Cache Hit). If missing (Cache Miss), query database, store result in Redis with a TTL (`redis.setex(key, 3600, data)`), and return response.

---

### 53. 🟠 P1 [D] How should logging work in production?

> **TL;DR:** Avoid `console.log()` (synchronous & unformatted). Use structured asynchronous JSON loggers like **Pino** or **Winston**. Attach a unique `Correlation-ID` / `Request-ID` header to trace requests across microservices.

---

### 54. 🟠 P1 [C] How do you connect Express to a database without leaking connections?

> **TL;DR:** Use a single shared **Connection Pool** instance. Never create new database connections inside individual HTTP route handlers. Gracefully close the connection pool when receiving shutdown signals (`SIGTERM`).

---

### 55. 🟠 P1 [C] How do you handle file uploads in Express (`multer`)?

> **TL;DR:** Use `multer` middleware to parse `multipart/form-data` requests. Validate file MIME types (e.g. `image/jpeg`), restrict max file sizes (`limits: { fileSize: 5 * 1024 * 1024 }`), and upload files to Cloud Storage (AWS S3) rather than storing them on local server disk.

---

### 56. 🟠 P1 [C] What are WebSockets and Server-Sent Events (SSE)?

> **TL;DR:** **WebSockets** provide full-duplex, bi-directional persistent TCP communication (ideal for chat apps, multiplayer games). **Server-Sent Events (SSE)** provide mono-directional server-to-client streaming over standard HTTP (ideal for live stock tickers or AI response streaming).

---

## Testing

### 57. 🟠 P1 [Q] How do you test an Express API (supertest), and why separate `app` from `app.listen()`?

> **TL;DR:** Export `app` from `app.js` without calling `.listen()`. Import `app` into `server.js` to call `app.listen()`, and import `app` into test files using `supertest`. This allows Supertest to run API tests on ephemeral random ports without port conflict errors.

```javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/health', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
  });
});
```

---

[⬅️ Previous: 08 · Auth & Security](08-authentication-security-and-best-practices.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Output & Debugging ➡️](10-output-and-debugging-questions.md)
