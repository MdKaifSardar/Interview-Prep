[⬅️ Previous: 02 · Event Loop & Scheduling](02-event-loop-and-asynchronous-internals.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Streams, Concurrency & Errors ➡️](04-streams-concurrency-and-error-handling.md)

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

[⬅️ Previous: 02 · Event Loop & Scheduling](02-event-loop-and-asynchronous-internals.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Streams, Concurrency & Errors ➡️](04-streams-concurrency-and-error-handling.md)
