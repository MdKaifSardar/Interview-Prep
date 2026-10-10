[⬅️ Previous: 09 · Performance & Testing](09-performance-production-and-testing.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 11 · Coding Challenges ➡️](11-coding-challenges-and-implementations.md)

---

## Output & Debugging Questions

### 58. 🔴 P0 [Q] Predict the output of code mixing `process.nextTick()`, Promises, `setImmediate()`, and `setTimeout()`.

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
setImmediate(() => console.log('3'));
Promise.resolve().then(() => console.log('4'));
process.nextTick(() => console.log('5'));
console.log('6');

// OUTPUT ORDER:
// 1
// 6
// 5 (nextTick runs before any microtask)
// 4 (Promise microtask)
// 2 (setTimeout in Timers phase)
// 3 (setImmediate in Check phase)
```

---

### 59. 🟠 P1 [Q] Predict whether `setTimeout(fn, 0)` or `setImmediate()` runs first inside an I/O callback.

```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('setTimeout'), 0);
  setImmediate(() => console.log('setImmediate'));
});

// OUTPUT ORDER:
// setImmediate (ALWAYS FIRST inside I/O callback!)
// setTimeout
// REASON: The event loop is currently in the Poll phase. The next phase is Check (setImmediate).
```

---

### 60. 🔴 P0 [Q] Find and fix the bug in an Express route sending a response twice.

```javascript
// BUGGY ROUTE:
app.get('/user/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400).send('ID required'); // ❌ Missing return!
  }
  res.send('User found'); // Throws: Cannot set headers after they are sent
});

// FIXED ROUTE:
app.get('/user/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('ID required'); // ✅ 'return' exits handler!
  }
  res.send('User found');
});
```

---

### 61. 🔴 P0 [Q] Find and fix the bug where an error in an async route hangs the request in Express 4.

```javascript
// BUGGY (Express 4 un-handled rejected promise hangs request!):
app.get('/data', async (req, res) => {
  const data = await db.query(); // Throws error -> Request hangs forever!
  res.json(data);
});

// FIXED (Express 4 requiring try/catch and next(err)):
app.get('/data', async (req, res, next) => {
  try {
    const data = await db.query();
    res.json(data);
  } catch (err) {
    next(err); // ✅ Forwards error to global error middleware!
  }
});
```

---

### 62. 🟠 P1 [Q] Find and fix middleware missing `next()` or registered in wrong order.

```javascript
// BUG: Auth middleware doesn't call next() -> Request hangs!
app.use((req, res, next) => {
  if (req.headers.token) {
    req.user = { id: 1 };
    next(); // ✅ MUST call next() to proceed!
  } else {
    res.status(401).json({ error: 'No token' });
  }
});
```

---

### 63. 🟠 P1 [Q] Find and fix a route that blocks the event loop with CPU-heavy work.

```javascript
// BUGGY (Blocks event loop for all users!):
app.get('/hash', (req, res) => {
  const hash = crypto.pbkdf2Sync('pass', 'salt', 500000, 64, 'sha512'); // ❌ Sync CPU block!
  res.send(hash);
});

// FIXED (Uses async crypto backed by libuv thread pool):
app.get('/hash', (req, res, next) => {
  crypto.pbkdf2('pass', 'salt', 500000, 64, 'sha512', (err, derivedKey) => {
    if (err) return next(err);
    res.send(derivedKey.toString('hex')); // ✅ Non-blocking!
  });
});
```

---

[⬅️ Previous: 09 · Performance & Testing](09-performance-production-and-testing.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 11 · Coding Challenges ➡️](11-coding-challenges-and-implementations.md)
