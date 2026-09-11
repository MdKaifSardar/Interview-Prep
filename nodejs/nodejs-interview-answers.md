# Node.js & Express.js Master Answer Key (Comprehensive Edition)

Companion answer key to `nodejs-interview-questions.md`. Every single answer strictly follows our standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive breakdown of *why* and *how* the underlying mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working code snippet, Express pattern, ASCII event loop flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Real-world edge cases, security risks, memory leak traps, and interviewer follow-up gotchas.

---

## Node.js Fundamentals

### 1. 🔴 P0 [C] What is Node.js, how does it differ from browser JavaScript, and which workloads is it good or poor at?

> **TL;DR:** Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 JavaScript engine and libuv. It executes JavaScript server-side without browser APIs (like DOM/window) but adds OS capabilities (filesystem, networking, process management). Node.js excels at I/O-heavy concurrent workloads but performs poorly at heavy CPU-bound tasks.

**💡 Core Concept & Explanation**
Browser JS runs inside a sandboxed environment focused on user interactions and DOM manipulation (`window`, `document`, `navigator`). Node.js runs as a standalone process on the operating system (`globalThis`, `process`, `fs`, `net`). Node.js uses an event-driven, non-blocking I/O model:
- **I/O-Heavy Workloads (Excellent):** REST APIs, chat applications, streaming services, proxy servers, real-time microservices.
- **CPU-Heavy Workloads (Poor by Default):** Image processing, video encoding, cryptography, complex matrix math. Because JS runs on a single thread, CPU-heavy loops block the Call Stack and freeze the entire server for all other incoming requests.

**🛠️ Code / Visual Diagram / Table**

| Feature | Browser JavaScript | Node.js Runtime |
| :--- | :--- | :--- |
| **Global Object** | `window` / `self` | `globalThis` / `global` / `process` |
| **DOM & UI APIs** | `document`, `HTMLElement`, `alert` | ❌ None (No DOM) |
| **System Access** | ❌ Sandboxed (No filesystem access) | `fs`, `path`, `os`, `child_process`, `net` |
| **Modules** | ES Modules (`import`/`export`) | CommonJS (`require`) & ES Modules |

**⚠️ Interview Pitfall / Pro-Tip**
Never say "Node.js is single-threaded" without qualification! While the JavaScript **execution thread (Call Stack)** is single-threaded, Node.js uses background threads in **libuv's thread pool** for file I/O and cryptographic operations.

---

### 2. 🔴 P0 [D] What are the core parts of Node.js (V8, libuv, thread pool, C++ bindings), and how does it handle concurrent requests?

> **TL;DR:** Node.js combines **Google V8** (JS parsing and execution), **libuv** (event loop, asynchronous I/O, thread pool), **C++ Bindings** (exposing low-level OS APIs to JS), and core JS libraries. It handles thousands of concurrent requests by delegating asynchronous I/O operations to OS kernel primitives or libuv's background thread pool, notifying the JS single thread via callbacks when work completes.

**💡 Core Concept & Explanation**
When a client sends an HTTP request, Node.js registers an event callback on the Event Loop and immediately frees the main JS thread to accept the next connection. Non-blocking operations (like TCP sockets) use OS kernel mechanisms (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows). Blocking operations (like disk file reading or `bcrypt` hashing) are offloaded to libuv's 4 background threads.

**🛠️ Code / Visual Diagram / Table**

```
[ JavaScript Code ] ──> [ C++ Bindings / Node Standard Library ]
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      ▼                                                       ▼
[ V8 Engine ]                                           [ libuv Engine ]
(JS AST, Bytecode, JIT Machine Code)                    (Event Loop, Thread Pool,
                                                         OS Epoll / IOCP Async I/O)
```

**⚠️ Interview Pitfall / Pro-Tip**
Interviewers often ask: *"Does every HTTP request create a new thread in Node.js?"* Answer: **No!** Unlike Apache/Java multi-threaded servers (which assign 1 thread per request), Node.js processes thousands of incoming connections on 1 single Event Loop thread.

---

### 3. 🔴 P0 [C] What is non-blocking I/O, what is the difference between blocking and non-blocking code, and why is blocking the event loop dangerous?

> **TL;DR:** Non-blocking I/O executes system requests asynchronously without stopping the main thread; the program registers a callback and continues executing subsequent lines of code immediately. Blocking code pauses main thread execution until the disk or network operation completes. Blocking the single event loop freezes the entire server, causing latency spikes and 504 timeouts for all concurrent users.

**💡 Core Concept & Explanation**
In a single-threaded server, the main Event Loop thread must stay free to process incoming requests, fire timer callbacks, and execute pending promise microtasks. If a synchronous operation (like `fs.readFileSync` or a long `for` loop) executes for 3 seconds, zero HTTP requests can be accepted during those 3 seconds!

**🛠️ Code / Visual Diagram / Table**

```javascript
const fs = require('fs');

// BLOCKING (Sync): Pauses main thread for 500ms
const data = fs.readFileSync('/large-file.txt');
console.log('1. Read complete');
console.log('2. Next line');

// NON-BLOCKING (Async): Registers callback, thread continues instantly
fs.readFile('/large-file.txt', (err, data) => {
  console.log('2. Async Read complete');
});
console.log('1. Next line runs immediately!');
```

**⚠️ Interview Pitfall / Pro-Tip**
`JSON.parse()` or `JSON.stringify()` on massive 100MB JSON objects is a sneaky synchronous event-loop blocker! Always parse huge payloads using streams or worker threads.

---

### 4. 🟠 P1 [C] What does the process object provide, and how do you manage configuration and secrets with environment variables?

> **TL;DR:** The `process` object is a global instance providing info about the current Node.js runtime process (`process.env`, `process.argv`, `process.exit()`, `process.cwd()`). Secrets and environment configs should be stored in environment variables accessed via `process.env` and loaded using `--env-file=.env` (Node 20.6+) or the `dotenv` package.

**💡 Core Concept & Explanation**
Storing database URIs, JWT secret keys, or API keys directly in source code creates severe security vulnerabilities. Environment variables decouple application configuration from code across development, staging, and production environments.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Native Node.js 20.6+ (.env loading built-in without npm packages):
// Run command: node --env-file=.env server.js

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DATABASE_URL;

if (!DB_URI) {
  console.error('FATAL: DATABASE_URL is missing!');
  process.exit(1); // Exit process with failure code
}
```

**⚠️ Interview Pitfall / Pro-Tip**
Never commit `.env` files to Git! Always add `.env` to your `.gitignore` file and provide a sanitized `.env.example` template for team members.

---

### 5. 🟠 P1 [C] What is the difference between LTS and Current Node.js releases, and which should production use?

> **TL;DR:** **LTS (Long Term Support)** releases are stable, heavily tested versions supported for 30 months with security patches and bug fixes. **Current** releases contain bleeding-edge features under active development. Production servers must **always use LTS** for stability and predictability.

**💡 Core Concept & Explanation**
Node.js uses semantic versioning:
- **Even Major Versions (v18, v20, v22):** Shift to Active LTS status in October and receive long-term maintenance.
- **Odd Major Versions (v19, v21, v23):** Current releases intended for testing experimental APIs; deprecated after 6–8 months.

**🛠️ Code / Visual Diagram / Table**

```
Current Release (v23) ──> Test experimental APIs in dev
Active LTS (v22 / v20) ──> Production deployment standard (30 months support)
```

**⚠️ Interview Pitfall / Pro-Tip**
When setting up Docker containers or CI/CD pipelines, pin your base image to an exact LTS version tag (e.g. `node:20-alpine`), not `node:latest`.

---

### 6. 🟠 P1 [C] Can Node.js run TypeScript files directly (type stripping), what are its limitations, and why do you still need tsc?

> **TL;DR:** Node.js 22.6+ supports experimental **type stripping** (`node --experimental-transform-types index.ts`), allowing execution of TypeScript files by removing type annotations at runtime without compilation. However, it does not perform type checking; you still need `tsc --noEmit` in CI/CD to catch type errors.

**💡 Core Concept & Explanation**
Type stripping works like a fast regex transform: it strips types, interfaces, and type assertions from memory so V8 can execute raw JS. It does **not** support TypeScript features that generate runtime JS output (like legacy `enum`, `namespace`, or Parameter Properties).

**🛠️ Code / Visual Diagram / Table**

```bash
# Node.js 22.6+ Direct Execution:
node --experimental-transform-types server.ts

# Separate Type-Checking in CI/CD:
npx tsc --noEmit
```

**⚠️ Interview Pitfall / Pro-Tip**
Type stripping is **not** a replacement for the TypeScript compiler (`tsc`) during build verification because Node ignores type violations (e.g. assigning a `string` to a `number` variable executes without error!).

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

## Modules & Packages

### 11. 🔴 P0 [Q] How do CommonJS modules work in Node (`require()`, `module.exports` vs `exports`, caching, module wrapper)?

> **TL;DR:** CommonJS (CJS) is Node's legacy synchronous module system. When a module is loaded via `require()`, Node wraps the code in an IIFE module wrapper function `(function (exports, require, module, __filename, __dirname) { ... })`, executes it, and caches `module.exports` in `require.cache`. `exports` is simply a shorthand reference pointing to `module.exports`.

**💡 Core Concept & Explanation**
CommonJS loads modules synchronously on disk at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// How Node internally wraps every CommonJS file before execution:
(function (exports, require, module, __filename, __dirname) {
  // Your code lives here!
  const secret = 42;
  module.exports = { secret };
});

// GOTCHA: Reassigning 'exports' breaks the reference link!
exports = { name: 'Asha' }; // ❌ FAILS! Does NOT export!
module.exports = { name: 'Asha' }; // ✅ CORRECT!
```

**⚠️ Interview Pitfall / Pro-Tip**
If you reassign `exports = {}`, you sever its reference to `module.exports`, and Node will return an empty object! Always export using `module.exports = ...` or mutate `exports.property = ...`.

---

### 12. 🟠 P1 [Q] How does Node decide whether a file is ESM or CommonJS, how do you get `__dirname` in ESM, and can `require()` load ESM?

> **TL;DR:** Node treats a file as ES Modules (ESM) if: 1. File extension is `.mjs`, 2. `package.json` contains `"type": "module"`. Otherwise `.cjs` or default files are treated as CommonJS. In ESM, `__dirname` and `__filename` are not available globally; derive them using `import.meta.url`. Node 22+ supports `require()` for synchronous ES modules.

**💡 Core Concept & Explanation**
ESM uses static asynchronous import resolution (`import`/`export`), whereas CommonJS uses dynamic synchronous execution (`require()`).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Constructing __dirname & __filename in ES Modules:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

**⚠️ Interview Pitfall / Pro-Tip**
You cannot use top-level `await` inside CommonJS modules, but top-level `await` is fully supported in ES Modules.

---

### 13. 🔴 P0 [C] What are `package.json` and `package-lock.json`, `dependencies` vs `devDependencies`, and semver ranges (`^` and `~`)?

> **TL;DR:** `package.json` defines project metadata and direct dependencies. `package-lock.json` locks exact dependency tree versions for deterministic installs across machines. `dependencies` are required in production; `devDependencies` are build/test tools only. `^1.2.3` allows minor updates (`1.x.x`), while `~1.2.3` allows patch updates only (`1.2.x`).

**💡 Core Concept & Explanation**
SemVer format: `MAJOR.MINOR.PATCH` (e.g. `2.4.1`):
- `MAJOR`: Breaking breaking changes.
- `MINOR`: New features (backward compatible).
- `PATCH`: Bug fixes (backward compatible).
- **`^2.4.1` (Caret):** Installs latest `2.x.x` (ignores breaking `3.0.0`).
- **`~2.4.1` (Tilde):** Installs latest `2.4.x` (ignores `2.5.0`).

**🛠️ Code / Visual Diagram / Table**

| SemVer Prefix | Example Range | Permitted Installs | Forbidden Installs |
| :--- | :--- | :--- | :--- |
| **`^` (Caret)** | `^1.2.3` | `1.3.0`, `1.9.9` | `2.0.0` (Major lock) |
| **`~` (Tilde)** | `~1.2.3` | `1.2.4`, `1.2.9` | `1.3.0` (Minor lock) |
| **Exact** | `1.2.3` | `1.2.3` only | Any other version |

**⚠️ Interview Pitfall / Pro-Tip**
Always commit `package-lock.json` to version control! Deleting `package-lock.json` can break production deployments due to nested transitive dependency shifts.

---

### 14. 🟠 P1 [C] What is the difference between `npm install` and `npm ci`, what are `npx` and nodemon, and what does `node --watch` do?

> **TL;DR:** `npm install` installs dependencies and can update `package-lock.json`. `npm ci` (Clean Install) strictly installs exact versions from `package-lock.json`, deleting `node_modules` first (ideal for CI/CD). `npx` executes npm package binaries without global installation. Node 18.11+ includes `--watch` built-in to auto-restart servers on file changes without `nodemon`.

**💡 Core Concept & Explanation**
Use `npm ci` in automated build pipelines to guarantee 100% reproducible environments.

**🛠️ Code / Visual Diagram / Table**

```bash
# Production CI/CD Pipeline Build:
npm ci --only=production

# Native Node Development Auto-Restart (No nodemon package needed!):
node --watch server.js
```

---

## Core Modules

### 15. 🔴 P0 [Q] What is the difference between synchronous, callback, and promise-based `fs` APIs, and when is synchronous code acceptable?

> **TL;DR:** `fs.readFileSync` blocks the main JS thread until disk read completes. `fs.readFile` uses a non-blocking callback. `fs/promises` (`fs.promises.readFile`) returns a native Promise compatible with `async/await`. Synchronous `fs` calls are acceptable **ONLY during application startup** (reading configuration files before starting `app.listen()`).

**💡 Core Concept & Explanation**
Using synchronous `fs` methods inside HTTP route handlers blocks the Event Loop for all concurrent users!

**🛠️ Code / Visual Diagram / Table**

```javascript
import fs from 'fs/promises';

// ACCEPTABLE (Sync during server initialization):
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// MANDATORY (Async/Await inside Express route handler):
app.get('/data', async (req, res, next) => {
  try {
    const data = await fs.readFile('./data.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});
```

**⚠️ Interview Pitfall / Pro-Tip**
Never use `fs.existsSync()` inside async HTTP handlers. Use `fs/promises.access()` or handle `ENOENT` errors inside a `try/catch` block.

---

### 16. 🟠 P1 [Q] What do `path.join()` and `path.resolve()` do, and why use the `path` module instead of string concatenation?

> **TL;DR:** `path.join()` joins all given path segments together using the OS-specific separator (`/` on POSIX, `\` on Windows). `path.resolve()` resolves a sequence of paths into an **absolute path**, processing from right to left until an absolute path is constructed. Using `path` prevents cross-platform file system path bugs.

**💡 Core Concept & Explanation**
String concatenation (`dir + '/' + file`) breaks on Windows systems due to backslash separators (`\`).

**🛠️ Code / Visual Diagram / Table**

```javascript
const path = require('path');

// path.join: Concatenates normalized path segments
path.join('/users', 'downloads', 'file.txt'); 
// POSIX: '/users/downloads/file.txt'

// path.resolve: Resolves to an absolute path from current working directory
path.resolve('downloads', 'file.txt'); 
// Output: 'C:\Project\downloads\file.txt' (or '/home/user/project/downloads/file.txt')
```

---

### 17. 🔴 P0 [Q] How does the `EventEmitter` class work (`on`, `once`, `emit`, `off`), and which core modules are built on it?

> **TL;DR:** `EventEmitter` implements the **Publish-Subscribe / Observer pattern** in Node.js. Components publish named events using `.emit('eventName', data)`, and subscribers register listener functions using `.on()`, `.once()`, or `.off()`. Core modules like `http.Server`, `fs.ReadStream`, and `socket.net` inherit from `EventEmitter`.

**💡 Core Concept & Explanation**
EventEmitters decouple event producers from event consumers.

**🛠️ Code / Visual Diagram / Table**

```javascript
const EventEmitter = require('events');
class OrderService extends EventEmitter {}

const orderService = new OrderService();

// Register listener:
orderService.on('orderCreated', (order) => {
  console.log(`Sending email for order #${order.id}`);
});

// Emit event:
orderService.emit('orderCreated', { id: 101, total: 250 });
```

**⚠️ Interview Pitfall / Pro-Tip**
If you register event listeners on an `EventEmitter` without removing them (`.off()` or `.removeListener()`) when components clean up, you create memory leaks! Node displays a `MaxListenersExceededWarning` if more than 10 listeners attach to a single event.

---

### 18. 🟠 P1 [Q] How do you create a server with the core `http` module, and how do its request and response objects work?

> **TL;DR:** `http.createServer((req, res) => { ... })` initializes a server. `req` (`http.IncomingMessage`) is a Readable Stream containing request headers, URL, and body payload. `res` (`http.ServerResponse`) is a Writable Stream used to set status codes, headers, and write the response body.

**💡 Core Concept & Explanation**
Core HTTP server pattern without Express:

**🛠️ Code / Visual Diagram / Table**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

### 19. 🟠 P1 [C] What is a `Buffer`, why does Node need it, and how does it relate to character encodings?

> **TL;DR:** A `Buffer` is a raw, fixed-length allocation of binary memory outside V8's JS heap memory. Node.js needs Buffers to handle raw binary data streams (files, TCP network packets, image blobs). Character encodings (like `utf-8` or `base64`) define how binary bytes map to readable text strings.

**💡 Core Concept & Explanation**
Before ES6 `TypedArray`, JS had no mechanism for manipulating raw binary memory streams. Buffers bridge this gap.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Create buffer from string:
const buf = Buffer.from('Hello', 'utf-8');
console.log(buf); // <Buffer 48 65 6c 6c 6f> (Hexadecimal byte values)

// Convert back to string:
console.log(buf.toString('utf-8')); // "Hello"
```

---

## Streams

### 20. 🔴 P0 [C] What are streams, why are they memory-efficient, and what are the four stream types?

> **TL;DR:** Streams are collections of data processed sequentially in small chunk-by-chunk buffers rather than reading the entire payload into RAM at once. This reduces memory consumption from gigabytes to megabytes. 4 Types: 1. **Readable** (`fs.createReadStream`), 2. **Writable** (`fs.createWriteStream`), 3. **Duplex** (TCP Sockets), 4. **Transform** (`zlib.createGzip`).

**💡 Core Concept & Explanation**
If a 2GB video file is requested, `fs.readFile` loads all 2GB into RAM before responding, crashing small servers. A Readable Stream reads 64KB chunks into a buffer and writes them directly to the HTTP response stream, using minimal RAM regardless of file size!

**🛠️ Code / Visual Diagram / Table**

```
[ Disk File (2GB) ] ──(64KB Chunks)──> [ Readable Stream ] ──> [ Writable Res ]
```

**⚠️ Interview Pitfall / Pro-Tip**
Always use streams when handling large file uploads, data exports, or video streaming endpoints to prevent RAM memory exhaustion spikes.

---

### 21. 🟠 P1 [Q] What is piping, what is backpressure, and why is `stream.pipeline()` preferred over `.pipe()`?

> **TL;DR:** **Piping** connects a Readable Stream output directly to a Writable Stream input. **Backpressure** occurs when a Readable Stream pushes data faster than the Writable Stream can process/write it; the writable stream signals the readable stream to pause reading until its internal buffer drains. `stream.pipeline()` is preferred over `.pipe()` because it automatically handles backpressure and cleans up all stream resources on error.

**💡 Core Concept & Explanation**
Legacy `.pipe()` does **not** close or destroy upstream readable streams if a downstream stream throws an unhandled error, creating file descriptor leaks!

**🛠️ Code / Visual Diagram / Table**

```javascript
const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

async function compressFile() {
  try {
    await pipeline(
      fs.createReadStream('input.txt'),
      zlib.createGzip(),
      fs.createWriteStream('input.txt.gz')
    );
    console.log('Compression successful!');
  } catch (err) {
    console.error('Pipeline failed:', err); // Automatically destroys streams on error!
  }
}
```

---

## Concurrency & Scaling

### 22. 🔴 P0 [Q] What is the difference between `child_process`, `worker_threads`, and `cluster`, and when to use each?

> **TL;DR:** 
> - **`child_process` (`spawn`/`exec`/`fork`):** Spawns a completely new OS process running external commands (e.g. Python scripts or bash).
> - **`worker_threads`:** Runs CPU-heavy JavaScript code on background threads sharing the same OS process memory.
> - **`cluster`:** Spawns multiple duplicate instances of your Node.js app across multiple CPU cores sharing a single TCP server port.

**💡 Core Concept & Explanation**
Comparison matrix:

**🛠️ Code / Visual Diagram / Table**

| API | Memory Sharing | Primary Use Case |
| :--- | :--- | :--- |
| **`child_process`** | ❌ Isolated OS Process | Executing non-JS CLI tools (ffmpeg, Python) |
| **`worker_threads`** | ✅ Shared `ArrayBuffer` | CPU-intensive JS tasks (image resize, crypto) |
| **`cluster`** | ❌ Isolated Node Instances | Scaling HTTP throughput across all CPU cores |

---

### 23. 🟠 P1 [D] How do you scale a Node.js app across CPU cores and machines, and why must the app be stateless?

> **TL;DR:** Scale vertically on 1 machine using **PM2** or the `cluster` module to run 1 Node process per CPU core. Scale horizontally across machines using multiple container instances (Docker/Kubernetes) behind a Load Balancer (ALB/Nginx). The app **MUST be stateless** (storing sessions in Redis/DB rather than local memory) so any server instance can handle any user request.

**💡 Core Concept & Explanation**
If Instance A stores user session state in an in-memory variable `const sessions = {}`, and the Load Balancer routes the user's next request to Instance B, the user will be logged out! Moving state to Redis enables infinite horizontal scaling.

---

### 24. 🟠 P1 [Q] What is graceful shutdown, and how do you handle `SIGTERM` and `SIGINT` to stop accepting requests cleanly?

> **TL;DR:** Graceful shutdown ensures a server stops receiving new connections when receiving a termination signal (`SIGTERM` from Docker/K8s or `SIGINT` from Ctrl+C), waits for active HTTP requests to complete, closes database connection pools, and exits cleanly (`process.exit(0)`).

**💡 Core Concept & Explanation**
Abruptly killing a server process drops active user HTTP requests mid-transaction and leaves un-closed database connections open.

**🛠️ Code / Visual Diagram / Table**

```javascript
const server = app.listen(3000);

function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  server.close(async () => {
    console.log('HTTP server closed. Closing DB pool...');
    await db.pool.end(); // Close database connections
    console.log('Graceful shutdown complete.');
    process.exit(0);
  });

  // Force shutdown after 10s if active requests hang:
  setTimeout(() => {
    console.error('Forced shutdown due to timeout!');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

---

## Error Handling & Process Stability

### 25. 🔴 P0 [Q] What is the error-first callback convention, and how do you convert callback APIs to Promises with `util.promisify()`?

> **TL;DR:** The error-first callback convention requires the first argument of a callback function to be reserved for an error object (`(err, result) => { ... }`). If no error occurred, `err` is `null`. `util.promisify()` automatically converts standard error-first callback functions into native Promise-returning functions.

**💡 Core Concept & Explanation**
Code example:

**🛠️ Code / Visual Diagram / Table**

```javascript
const util = require('util');
const fs = require('fs');

// Convert callback API to Promise API:
const readFilePromise = util.promisify(fs.readFile);

async function loadData() {
  try {
    const data = await readFilePromise('./file.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Read error:', err);
  }
}
```

---

### 26. 🔴 P0 [Q] What are `uncaughtException` and `unhandledRejection` events, and why should the process restart rather than keep running?

> **TL;DR:** `uncaughtException` fires when a synchronous error is thrown without a `try/catch`. `unhandledRejection` fires when a Promise rejects without a `.catch()`. When an uncaught exception occurs, the application state becomes unpredictable; you should log the error and **restart the process** using a process manager (PM2/Docker).

**💡 Core Concept & Explanation**
Continuing to run a Node process after an uncaught exception can leave socket connections hanging in memory, DB transactions half-committed, and internal variables corrupted.

**🛠️ Code / Visual Diagram / Table**

```javascript
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception!', err);
  // Log telemetry error, then exit process:
  process.exit(1); // PM2 or Kubernetes will instantly restart a clean container
});
```

---

### 27. 🟠 P1 [C] What is the difference between operational errors and programmer errors?

> **TL;DR:** **Operational Errors** are expected runtime failures (network timeout, invalid user input, 404 not found, database connection loss) that must be caught and handled gracefully. **Programmer Errors** are actual bugs in source code (syntax errors, `TypeError: cannot read property of undefined`, passing wrong arguments) that require bug fixes.

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

## REST API Design

### 38. 🔴 P0 [C] What is a REST API, how do HTTP methods map to CRUD operations, and what is the difference between PUT and PATCH?

> **TL;DR:** REST (Representational State Transfer) is an architectural style for designing networked APIs using standard HTTP verbs and stateless resource URIs. **`PUT` completely replaces** an entire resource entity with the new payload. **`PATCH` partially updates** only the specified fields of an existing entity.

---

### 39. 🔴 P0 [C] Which HTTP status codes should an API return for common cases, and what is the difference between 401 and 403?

> **TL;DR:** **200 OK** (success), **201 Created** (resource created), **204 No Content** (deletion success), **400 Bad Request** (validation error), **401 Unauthorized** (unauthenticated / missing valid token), **403 Forbidden** (authenticated but lacks role permissions), **404 Not Found**, **409 Conflict**, **429 Too Many Requests**, **500 Internal Error**.

---

### 40. 🟠 P1 [C] What are safe and idempotent HTTP methods, and how do idempotency keys prevent duplicate processing?

> **TL;DR:** **Safe methods** (`GET`, `HEAD`) do not modify server data. **Idempotent methods** (`GET`, `PUT`, `DELETE`) produce identical server state regardless of how many times the exact request is executed. `POST` is non-idempotent. Idempotency keys (`Idempotency-Key` header stored in Redis) ensure retried payment POST requests do not charge a user twice.

---

### 41. 🟠 P1 [D] How do you implement pagination, filtering, and sorting, and what is the difference between offset and cursor pagination?

> **TL;DR:** **Offset Pagination** (`?page=2&limit=20`, `OFFSET 20 LIMIT 20`) is simple but suffers performance degradation on large datasets and skips/duplicates items if data changes. **Cursor Pagination** (`?after=cursor_id&limit=20`) uses a pointer to the last retrieved record, offering $O(1)$ database index performance and stable real-time feed paging.

---

### 42. 🟠 P1 [D] How do you structure an Express project (layered architecture)?

> **TL;DR:** Use a **Layered Architecture (Controller-Service-Repository pattern)**:
> 1. **Routes (`/routes`):** Defines URL endpoints and attaches middleware.
> 2. **Controllers (`/controllers`):** Handles HTTP request/response parsing, status codes, and input validation.
> 3. **Services (`/services`):** Implements business logic (framework-agnostic).
> 4. **Models/Repositories (`/models`):** Manages raw database queries.

---

### 43. 🟠 P1 [C] How do you version an API, and why should errors follow a consistent response format?

> **TL;DR:** Version APIs via URI path prefix (`/api/v1/users`) or custom headers. Standardize all error responses to return a uniform JSON schema (`{ success: false, error: { code, message, details } }`) so frontend clients can handle errors predictably.

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

_End of Master Answer Key — Synchronized with `nodejs-interview-questions.md` across all 72 questions._
