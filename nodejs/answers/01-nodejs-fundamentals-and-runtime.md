⏮️ (start) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Event Loop & Scheduling ➡️](02-event-loop-and-asynchronous-internals.md)

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

⏮️ (start) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Event Loop & Scheduling ➡️](02-event-loop-and-asynchronous-internals.md)
