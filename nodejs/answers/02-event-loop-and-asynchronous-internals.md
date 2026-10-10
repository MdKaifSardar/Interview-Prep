[⬅️ Previous: 01 · Node.js Fundamentals](01-nodejs-fundamentals-and-runtime.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Modules & Core APIs ➡️](03-modules-packages-and-core-apis.md)

---

## Node.js Event Loop

### 7. 🔴 P0 [Q] What are the phases of the Node.js event loop, and what runs in each phase?

> **TL;DR:** The Node.js event loop consists of 5 main phases processed in a continuous loop by libuv: 1. **Timers** (`setTimeout`, `setInterval`), 2. **Pending Callbacks** (deferred I/O errors), 3. **Poll** (retrieving new I/O events & reading files/sockets), 4. **Check** (`setImmediate`), 5. **Close Callbacks** (`socket.on('close')`). Between every phase transition, Node processes the **Microtask Queue** (`process.nextTick` & Promises).

**💡 Core Concept & Explanation**
Each phase maintains a FIFO queue of callbacks. When libuv enters a phase, it executes callbacks in that phase's queue until the queue is exhausted or the max callback limit is reached.

**🛠️ Code / Visual Diagram / Table**

```
┌────────────────────────────────────────┐
│ 1. TIMERS (setTimeout, setInterval)    │
└───────────────────┬────────────────────┘
                    │  <── [MICROTASK QUEUE: nextTick() -> Promises]
┌───────────────────┴────────────────────┐
│ 2. PENDING CALLBACKS (I/O errors)      │
└───────────────────┬────────────────────┘
                    │  <── [MICROTASK QUEUE]
┌───────────────────┴────────────────────┐
│ 3. POLL (File/Network I/O Callbacks)   │
└───────────────────┬────────────────────┘
                    │  <── [MICROTASK QUEUE]
┌───────────────────┴────────────────────┐
│ 4. CHECK (setImmediate callbacks)      │
└───────────────────┬────────────────────┘
                    │  <── [MICROTASK QUEUE]
┌───────────────────┴────────────────────┐
│ 5. CLOSE CALLBACKS (socket.on('close'))│
└────────────────────────────────────────┘
```

**⚠️ Interview Pitfall / Pro-Tip**
Microtasks do **not** belong to any libuv event loop phase! They are executed by Node.js immediately after the current operation finishes, *before* moving to the next event loop phase.

---

### 8. 🔴 P0 [Q] What is the difference between `process.nextTick()`, Promise microtasks, `setImmediate()`, and `setTimeout(fn, 0)`, and in what order do they run?

> **TL;DR:** Execution priority order: 1. **`process.nextTick()`** (runs immediately before any microtask), 2. **Promise microtasks** (`.then()`, `await`), 3. **`setTimeout(fn, 0)`** (runs in Timers phase), 4. **`setImmediate()`** (runs in Check phase). Inside an I/O callback, `setImmediate()` *always* executes before `setTimeout(fn, 0)`.

**💡 Core Concept & Explanation**
`process.nextTick()` has its own dedicated `nextTickQueue` managed directly by Node.js, which takes absolute priority over V8 Promise microtasks.

**🛠️ Code / Visual Diagram / Table**

```javascript
setTimeout(() => console.log('1. setTimeout'), 0);
setImmediate(() => console.log('2. setImmediate'));
Promise.resolve().then(() => console.log('3. Promise'));
process.nextTick(() => console.log('4. nextTick'));

// OUTPUT ORDER:
// 4. nextTick
// 3. Promise
// 1. setTimeout (or setImmediate depending on main thread start delay)
// 2. setImmediate
```

**⚠️ Interview Pitfall / Pro-Tip**
Inside the main entry file, `setTimeout(fn, 0)` vs `setImmediate()` execution order is non-deterministic (depends on CPU load). But inside an I/O callback (e.g. `fs.readFile`), **`setImmediate()` ALWAYS runs first** because the event loop is currently in the Poll phase and moves next to the Check phase!

---

### 9. 🟠 P1 [C] What is the libuv thread pool, which operations use it, and what does `UV_THREADPOOL_SIZE` control?

> **TL;DR:** The libuv thread pool is a background pool of worker threads (default size 4) used for operations that cannot be handled natively by OS asynchronous kernel primitives. It processes: 1. File System APIs (`fs.*`), 2. Cryptography (`crypto.pbkdf2`, `crypto.randomBytes`), 3. Compression (`zlib.*`), 4. DNS lookups (`dns.lookup`). You control thread pool size via `process.env.UV_THREADPOOL_SIZE`.

**💡 Core Concept & Explanation**
Network sockets (HTTP/HTTPS, TCP, WebSockets) use OS kernel asynchronous mechanisms (`epoll`/`kqueue`/`IOCP`) and do **NOT** consume libuv thread pool workers! File disk operations lack universal OS async kernel support, so libuv offloads them to its internal C++ thread pool.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Increase libuv thread pool size to 8 (MUST be set before any async call runs!):
process.env.UV_THREADPOOL_SIZE = 8;
```

**⚠️ Interview Pitfall / Pro-Tip**
Setting `UV_THREADPOOL_SIZE` inside a Node script *after* invoking a thread pool operation does nothing! Set it via environment variable before script execution: `UV_THREADPOOL_SIZE=8 node server.js`.

---

### 10. 🟠 P1 [Q] How can recursive `process.nextTick()` calls or CPU-heavy code starve the event loop, and how do you detect and avoid it?

> **TL;DR:** Recursive `process.nextTick()` calls completely block the Event Loop from advancing to any phase because Node drains the `nextTickQueue` continuously before moving forward. This starves I/O, timers, and incoming network requests. Avoid it by replacing recursive `nextTick` with `setImmediate()`.

**💡 Core Concept & Explanation**
Because `process.nextTick()` queues tasks before the next event loop phase transition, repeatedly adding items to `nextTickQueue` keeps Node locked in a microtask processing loop forever.

**🛠️ Code / Visual Diagram / Table**

```javascript
// DANGEROUS (Starves Event Loop completely!):
function starve() {
  process.nextTick(starve); // I/O and timers NEVER run!
}

// SAFE ALTERNATIVE (Yields control back to Check phase per iteration):
function safeLoop() {
  setImmediate(safeLoop); // Allows Poll and Timers phases to process!
}
```

**⚠️ Interview Pitfall / Pro-Tip**
Detect event loop lag using the `perf_hooks` module (`monitorEventLoopDelay()`) or APM tools (Datadog/New Relic) to trigger alerts when loop delay exceeds 100ms.

---

[⬅️ Previous: 01 · Node.js Fundamentals](01-nodejs-fundamentals-and-runtime.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Modules & Core APIs ➡️](03-modules-packages-and-core-apis.md)
