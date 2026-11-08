[⬅️ Previous: 08 · Auth & Security](08-authentication-security-and-best-practices.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Output & Debugging ➡️](10-output-and-debugging-questions.md)

---

## Performance & Production

### 51. 🟠 P1 [P] How do you diagnose performance problems and memory leaks in a Node app?

> **TL;DR:** Start Node with the inspector flag (`node --inspect app.js`), open Chrome DevTools (`chrome://inspect`), and take **Heap Snapshots** under load to compare **Retained Size** vs **Shallow Size**. For CPU bottlenecks, generate CPU Profiles or flamegraphs using tools like `clinic.js flame` to spot synchronous functions blocking the event loop.

**Understanding V8 Heap & Common Leak Sources**
In V8, memory is categorized into:
- **Shallow Size:** Memory held directly by the object itself (primitive fields, pointers).
- **Retained Size:** Total memory freed when that object and its entire dependent reference tree are garbage collected.
- **Top 4 Memory Leak Culprits in Node:**
  1. **Global Variables & Unbounded Caches:** Growing arrays/objects in memory without TTL or maximum entry limits.
  2. **Dangling Event Listeners:** Attaching `emitter.on('event', ...)` inside request handlers without calling `emitter.off()`.
  3. **Unclosed Closures:** Closures holding references to large outer scopes (e.g., keeping request buffers alive).
  4. **Uncleaned Timers:** Long-running `setInterval()` calls whose references are never cleared.

**Step-by-Step Leak Diagnosis Workflow**

```
1. Start App with Inspector:
   $ node --inspect=0.0.0.0:9229 src/server.js

2. Open Chrome:
   Navigate to chrome://inspect -> Click "Open dedicated DevTools for Node"

3. Take 3 Heap Snapshots across Load Testing:
   - Snapshot 1: Baseline (idle server)
   - Snapshot 2: Under simulated traffic (e.g. autocannon -c 100 -d 30s http://localhost:3000)
   - Snapshot 3: Cool down (10 seconds after traffic stops)

4. Comparison View:
   Select Snapshot 3 -> Switch perspective to "Comparison" against Snapshot 1.
   Filter by "# Delta" and "Size Delta" -> Sort by "Retained Size" to find objects that failed to garbage collect.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The `--max-old-space-size` Mask:** Never "solve" a memory leak by arbitrarily increasing V8 heap size (e.g. `node --max-old-space-size=8192`). This merely delays the inevitable crash (OOM Kill) while causing longer, CPU-freezing Garbage Collection pauses. Fix the retaining root reference.

---

### 52. 🟠 P1 [P] What is caching, and how would you add an in-memory or Redis cache to an Express endpoint?

> **TL;DR:** Caching stores expensive database query or external API results in high-speed RAM. Implement the **Cache-Aside (Lazy Loading)** pattern: on request, query Redis first. On **Cache Hit**, return data instantly. On **Cache Miss**, query the database, store the result in Redis with a TTL (`EX`), and return the response.

**The Cache-Aside Workflow**

```
[ Client Request ] ──> [ Express Route ]
                             │
                             ▼
                    [ Check Redis Cache ]
                       /               \
            (Cache Hit)                 (Cache Miss)
               /                               \
     [ Return JSON from Redis ]       [ Query Database / API ]
                                               │
                                               ▼
                                      [ Save in Redis with TTL ]
                                               │
                                               ▼
                                      [ Return Fresh JSON ]
```

**🛠️ Code / Visual Diagram / Table**

```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Reusable Cache-Aside Middleware Factory
function cacheMiddleware(ttlSeconds = 300) {
  return async (req, res, next) => {
    // Only cache read-only GET requests
    if (req.method !== 'GET') return next();

    const cacheKey = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        // Cache Hit: Return data immediately with custom header
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cachedData));
      }

      // Cache Miss: Intercept res.send/res.json to populate Redis
      res.setHeader('X-Cache', 'MISS');
      const originalSend = res.json.bind(res);

      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // Store in Redis with TTL (in seconds)
          redis.setex(cacheKey, ttlSeconds, JSON.stringify(body)).catch(err => {
            console.error('Redis write error:', err);
          });
        }
        return originalSend(body);
      };

      next();
    } catch (err) {
      console.error('Redis cache failure, falling through to DB:', err);
      next(); // Fail open: If Redis fails, app continues to serve data from DB
    }
  };
}

// Usage in Route:
app.get('/api/products/featured', cacheMiddleware(600), productController.getFeatured);
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Cache Stampede (Thundering Herd):** If a hot cache key expires while thousands of concurrent requests arrive, all requests simultaneously query the database, crashing it. Mitigate this by adding jitter (randomized +/- 10% TTL) or implementing distributed locking with Redlock.

---

### 53. 🟠 P1 [D] How should logging work in production?

> **TL;DR:** Never use `console.log()` in production—it is synchronous, blocks the event loop on busy terminal streams, and outputs unstructured text. Use high-performance, asynchronous structured JSON loggers like **Pino** or **Winston**. Attach a unique `Correlation-ID` (`X-Request-ID`) to every request to trace distributed transactions across microservices, and always redact sensitive credentials (passwords, auth headers).

**Why `console.log()` Degrades Production Performance**
1. **Synchronous Writes:** In Node.js, `console.log` writes to `process.stdout`. If stdout is piped to a file or stream that experiences backpressure, write calls block the main JavaScript thread.
2. **Unstructured:** Plain text logs cannot be filtered, indexed, or queried efficiently by modern log aggregators (Elasticsearch, Datadog, CloudWatch). Structured JSON logs (`{"level":"info","time":1700000000,"reqId":"abc","msg":"User logged in"}`) can be indexed instantly.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const crypto = require('crypto');

const app = express();

// Configure Pino Logger with Redaction
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password']
});

// Middleware attaching correlation ID and request logging
app.use(pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
}));

app.get('/api/users/:id', (req, res) => {
  // Access contextual logger carrying request ID
  req.log.info({ userId: req.params.id }, 'Fetching user profile');
  res.json({ id: req.params.id, name: 'Alice' });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Logging PII / Sensitive Data:** Failing to redact `req.body.password`, credit card numbers, or authorization tokens in log files violates GDPR, HIPAA, and PCI-DSS compliance. Always use built-in logger redaction rules before shipping logs to external cloud storage.

---

### 54. 🟠 P1 [C] How do you connect Express to a database without leaking connections?

> **TL;DR:** Use a single, globally shared **Connection Pool** instance. Never instantiate database connections inside route handlers. A connection pool maintains a configured set of warm, reusable database connections. Always check clients back into the pool inside `finally` blocks, and register graceful shutdown listeners (`SIGTERM`/`SIGINT`) to drain the pool before the Node process exits.

**Connection Pool Lifecycle**

```
[ Express Server Starts ] ──> Create Pool (min: 5, max: 20 connections)
                                       │
[ Request Arrives ]       ──> Acquire connection from pool (wait if all busy)
                                       │
[ Execute SQL / Query ]   ──> Execute query
                                       │
[ Request Finishes ]      ──> Release connection back to pool (DO NOT CLOSE!)
```

**🛠️ Code / Visual Diagram / Table**

```javascript
const { Pool } = require('pg');

// 1. Instantiate a single connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                   // Maximum active connections in pool
  idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000 // Return error if client cannot be acquired in 2s
});

pool.on('error', (err) => {
  console.error('Unexpected database client error in idle pool:', err);
});

// 2. Safe query execution helper (automatically handles acquire & release)
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// 3. Graceful Pool Drainage on SIGTERM
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing database pool...');
  await pool.end(); // Drains all active queries before releasing TCP sockets
  console.log('Database pool drained. Exiting process.');
  process.exit(0);
});

module.exports = { query, pool };
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The Connection Leak Anti-Pattern:** When manually acquiring a client via `const client = await pool.connect()`, developers often forget to call `client.release()` inside a `try ... finally` block. If a query throws an error, the connection remains checked out forever. After 20 errors, the pool is completely exhausted, and all subsequent database queries hang forever.

---

### 55. 🟠 P1 [C] How do you handle file uploads in Express (`multer`)?

> **TL;DR:** Express cannot parse `multipart/form-data` natively. Use **`multer`** middleware. For production scalability, configure strict file size limits (`limits.fileSize`), validate MIME types via `fileFilter` (and inspect magic numbers), and stream files directly to **Cloud Object Storage (AWS S3)** rather than storing them on ephemeral server local disk.

**Storage Engines Compared: Memory vs Disk vs Cloud Streaming**
- **`multer.diskStorage()`:** Saves files to server filesystem. Safe for temporary processing, but problematic on serverless platforms (AWS Lambda) or auto-scaled containers (Kubernetes/Heroku) where disks are ephemeral.
- **`multer.memoryStorage()`:** Stores file in RAM as a `Buffer`. Convenient for immediate upload to S3, but **dangerous** if large files are uploaded, as RAM quickly exhausts.
- **Cloud Streaming (Recommended):** Use `multer-s3` or stream direct to S3 using AWS SDK v3 `Upload` with `stream.PassThrough` to stream directly without buffering in RAM or disk.

**🛠️ Code / Visual Diagram / Table**

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 1. Configure Multer Disk Storage with Unique Filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// 2. Strict File Filter & Size Limit Guard
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit max
  },
  fileFilter: (req, file, cb) => {
    // Only allow specific image MIME types
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type! Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});

// 3. Route Handler with Multer Error Handling
app.post('/api/upload/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  res.status(201).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Trusting Client-Supplied MIME Types:** Never rely exclusively on `file.mimetype` or file extensions (`.jpg`). Attackers can rename a malicious executable or PHP shell to `script.php.jpg`. In high-security environments, use a library like `file-type` to inspect the file's binary "magic numbers" (the first few bytes of the file) to verify true content type.

---

### 56. 🟠 P1 [C] What are WebSockets and Server-Sent Events (SSE)?

> **TL;DR:** **WebSockets** provide a persistent, full-duplex, bi-directional TCP connection over a single socket, ideal for high-frequency interactive applications (chat, multiplayer gaming, collaborative canvases). **Server-Sent Events (SSE)** provide a mono-directional, server-to-client streaming connection over standard HTTP (`text/event-stream`), ideal for real-time dashboards, live financial tickers, and AI token streaming.

**WebSockets vs Server-Sent Events (SSE) Comparison**

| Feature | WebSockets (`ws://`, `wss://`) | Server-Sent Events (SSE) |
| :--- | :--- | :--- |
| **Communication Direction** | **Bi-directional** (Client $\rightleftharpoons$ Server) | **Mono-directional** (Server $\longrightarrow$ Client only) |
| **Protocol / Transport** | Upgrades from HTTP to custom WebSocket TCP protocol | Pure standard HTTP (`text/event-stream`) |
| **Auto-Reconnection** | Manual (must write client reconnect logic) | **Built-in** automatic browser reconnect & event IDs |
| **Firewall / Proxy Traversal** | Can be blocked by strict corporate proxy firewalls | Passes through firewalls naturally as standard HTTP |
| **Binary Data Support** | ✅ Native (ArrayBuffer, Blob) | ❌ Text-only (UTF-8 encoded JSON strings) |
| **Connection Limits** | No browser limit per domain | HTTP/1.1 max 6 connections per domain (solved via HTTP/2) |
| **Best Use Cases** | Chat apps, trading terminals, multiplayer games | LLM response streaming (ChatGPT), live score feeds |

**🛠️ Code / Visual Diagram / Table**

```javascript
// SERVER-SENT EVENTS (SSE) IMPLEMENTATION IN EXPRESS
app.get('/api/stream/metrics', (req, res) => {
  // 1. Mandatory SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 2. Stream data every 2 seconds
  const intervalId = setInterval(() => {
    const payload = {
      cpuUsage: Math.random() * 100,
      timestamp: new Date().toISOString()
    };
    // Format: "data: <string>\n\n"
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 2000);

  // 3. Clean up timer when client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The HTTP/1.1 6-Connection Limit:** Under HTTP/1.1, browsers enforce a strict limit of 6 simultaneous TCP connections per domain. If a user opens 6 browser tabs running SSE streams, all other web requests to that domain freeze! In production, always serve SSE over **HTTP/2**, which multiplexes hundreds of streams over a single TCP connection.

---

## Testing

### 57. 🟠 P1 [Q] How do you test an Express API (supertest), and why separate `app` from `app.listen()`?

> **TL;DR:** Decouple your Express instance (`app.js`) from server port binding (`server.js`). In production, `server.js` imports `app` and calls `app.listen(PORT)`. In tests, **`supertest`** imports `app` directly and spins up an ephemeral in-memory HTTP server on random ports. This eliminates port-in-use errors (`EADDRINUSE`) when running integration tests concurrently across multiple workers.

**Decoupled Architecture**

```
app.js (Exports Express app instance WITHOUT listening)
   ├──> server.js   (app.listen(3000) for local / production server)
   └──> app.test.js (supertest(app) for headless integration tests)
```

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. app.js (Application Definition)
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'Email required' });
  res.status(201).json({ id: 1, email: req.body.email });
});

module.exports = app; // ONLY export app!

// 2. server.js (Server Bootstrapper)
// const app = require('./app');
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// 3. app.test.js (Integration Test using Supertest & Jest / Node Test Runner)
const request = require('supertest');
const app = require('./app');

describe('API Integration Test Suite', () => {
  it('GET /api/health should return 200 and healthy status', async () => {
    const res = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('healthy');
  });

  it('POST /api/users with invalid payload should return 400', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({})
      .expect(400);

    expect(res.body.error).toBe('Email required');
  });
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The Open Handle Trap (`EADDRINUSE`):** If you call `app.listen(3000)` inside `app.js`, running Jest with 4 parallel test workers will attempt to bind 4 instances to port 3000 simultaneously, crashing with `EADDRINUSE: address already in use`. Furthermore, active open TCP server handles prevent Jest and the Node test runner from exiting cleanly. Always separate `app.js` and `server.js`.

---

[⬅️ Previous: 08 · Auth & Security](08-authentication-security-and-best-practices.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Output & Debugging ➡️](10-output-and-debugging-questions.md)
