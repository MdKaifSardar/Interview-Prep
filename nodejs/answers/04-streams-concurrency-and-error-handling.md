[⬅️ Previous: 03 · Modules & Core APIs](03-modules-packages-and-core-apis.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Express Fundamentals ➡️](05-express-fundamentals-and-routing.md)

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

[⬅️ Previous: 03 · Modules & Core APIs](03-modules-packages-and-core-apis.md) &nbsp;|&nbsp; [📋 Index](../nodejs-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Express Fundamentals ➡️](05-express-fundamentals-and-routing.md)
