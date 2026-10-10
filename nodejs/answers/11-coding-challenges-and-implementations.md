[⬅️ Previous: 10 · Output & Debugging](10-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

---

## Coding Challenges

### 64. 🔴 P0 [Q] Build a CRUD REST API in Express with routing, input validation, error handling, and correct status codes.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

let items = [{ id: 1, name: 'Item 1' }];

// READ ALL
app.get('/api/items', (req, res) => res.json(items));

// CREATE
app.post('/api/items', (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});
```

---

### 65. 🔴 P0 [Q] Write a request-logging middleware that records the method, URL, status code, and response time.

```javascript
function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

app.use(requestLogger);
```

---

### 66. 🔴 P0 [Q] Write JWT authentication middleware that protects routes and returns 401 for missing or invalid tokens.

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid or expired' });
    req.user = user;
    next();
  });
}
```

---

### 67. 🔴 P0 [Q] Write a centralized error-handling middleware with a custom `AppError` class.

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error Middleware:
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error'
  });
});
```

---

### 68. 🟠 P1 [Q] Implement an in-memory rate-limiting middleware (fixed window).

```javascript
function rateLimiter(limit = 100, windowMs = 15 * 60 * 1000) {
  const hits = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const userHits = hits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > userHits.resetTime) {
      userHits.count = 1;
      userHits.resetTime = now + windowMs;
    } else {
      userHits.count++;
    }

    hits.set(ip, userHits);

    if (userHits.count > limit) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    next();
  };
}
```

---

### 69. 🟠 P1 [Q] Write an `asyncHandler` wrapper for Express 4.

```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage:
app.get('/data', asyncHandler(async (req, res) => {
  const data = await db.fetch();
  res.json(data);
}));
```

---

### 70. 🟠 P1 [Q] Stream a large file to the client without loading it into memory.

```javascript
const fs = require('fs');

app.get('/download-large-log', (req, res) => {
  const filePath = './large-build.log';
  const readStream = fs.createReadStream(filePath);

  res.setHeader('Content-Type', 'text/plain');
  readStream.pipe(res); // Streams chunks directly to HTTP response!
});
```

---

### 71. 🟠 P1 [Q] Implement `promisify()` from scratch.

```javascript
function customPromisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}
```

---

### 72. 🟠 P1 [Q] Implement an in-memory cache with a TTL for an expensive endpoint.

```javascript
function createTTLCache(ttlMs = 60000) {
  const cache = new Map();

  return {
    get: (key) => {
      const item = cache.get(key);
      if (!item) return null;
      if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
      }
      return item.value;
    },
    set: (key, value) => {
      cache.set(key, { value, expiry: Date.now() + ttlMs });
    }
  };
}
```

---

[⬅️ Previous: 10 · Output & Debugging](10-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)
