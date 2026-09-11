# Node.js + Express.js Technical Interview Master List (72 Questions)

**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup/interview ROI) · 🟠 P1 Important

**Type** — [C] Conceptual · [Q] Code/Mechanism · [D] Architecture/Design · [P] Performance/Optimization

---

## Node.js Fundamentals

1. 🔴 P0 [C] What is Node.js, how does it differ from browser JavaScript (no DOM or window, globalThis, process, file system and network access), and which workloads is it good or poor at (I/O-heavy vs CPU-heavy)?
2. 🔴 P0 [D] What are the core parts of Node.js (V8, libuv, the thread pool, C++ bindings), and how does it handle many concurrent requests with a single JavaScript thread?
3. 🔴 P0 [C] What is non-blocking I/O, what is the difference between blocking and non-blocking code, and why is blocking the event loop dangerous for a server?
4. 🟠 P1 [C] What does the process object provide (process.argv, process.env, process.exit(), process.cwd()), and how do you manage configuration and secrets with environment variables and .env files (--env-file, dotenv)?
5. 🟠 P1 [C] What is the difference between LTS and Current Node.js releases, and which should production use?
6. 🟠 P1 [C] Can Node.js run TypeScript files directly (type stripping), what are its limitations, and why do you still need tsc for type checking?

## Node.js Event Loop

7. 🔴 P0 [Q] What are the phases of the Node.js event loop (timers, pending callbacks, poll, check, close callbacks), and what runs in each?
8. 🔴 P0 [Q] What is the difference between process.nextTick(), Promise microtasks, setImmediate(), and setTimeout(fn, 0), and in what order do they run?
9. 🟠 P1 [C] What is the libuv thread pool, which operations use it (fs, crypto, zlib, dns.lookup) versus OS-level async I/O (network sockets), and what does UV_THREADPOOL_SIZE control?
10. 🟠 P1 [Q] How can recursive process.nextTick() calls or CPU-heavy code starve the event loop, and how do you detect and avoid it?

## Modules & Packages

11. 🔴 P0 [Q] How do CommonJS modules work in Node (require(), module.exports vs exports, module caching, and the module wrapper that provides **dirname and **filename)?
12. 🟠 P1 [Q] How does Node decide whether a file is ESM or CommonJS ("type" in package.json, .mjs and .cjs), how do you get \_\_dirname in ESM, and can require() load an ES module?
13. 🔴 P0 [C] What are package.json and package-lock.json, what is the difference between dependencies and devDependencies, and what do semver ranges (^ and ~) mean?
14. 🟠 P1 [C] What is the difference between npm install and npm ci, what are npm scripts and npx, and what do nodemon and node --watch do?

## Core Modules

15. 🔴 P0 [Q] What is the difference between synchronous, callback, and promise-based fs APIs (readFileSync vs readFile vs fs/promises), and when is synchronous code acceptable?
16. 🟠 P1 [Q] What do path.join() and path.resolve() do, and why use the path module instead of string concatenation?
17. 🔴 P0 [Q] How does the EventEmitter class work (on, once, emit, off), and which core modules are built on it?
18. 🟠 P1 [Q] How do you create a server with the core http module, and how do its request and response objects work?
19. 🟠 P1 [C] What is a Buffer, why does Node need it, and how does it relate to character encodings?

## Streams

20. 🔴 P0 [C] What are streams, why are they more memory-efficient than reading a whole file, and what are the four stream types (readable, writable, duplex, transform)?
21. 🟠 P1 [Q] What is piping, what is backpressure, and why is stream.pipeline() preferred over .pipe() for error handling?

## Concurrency & Scaling

22. 🔴 P0 [Q] What is the difference between child_process (spawn, exec, fork), worker_threads, and the cluster module, and when would you use each?
23. 🟠 P1 [D] How do you scale a Node.js app across CPU cores and machines (cluster, PM2, multiple containers behind a load balancer), and why must the app be stateless to do so?
24. 🟠 P1 [Q] What is graceful shutdown, and how do you handle SIGTERM and SIGINT to stop accepting requests and close connections cleanly?

## Error Handling & Process Stability

25. 🔴 P0 [Q] What is the error-first callback convention, and how do you convert callback APIs to Promises with util.promisify()?
26. 🔴 P0 [Q] What are the uncaughtException and unhandledRejection events, how does Node behave by default when they occur, and why should the process restart rather than keep running?
27. 🟠 P1 [C] What is the difference between operational errors and programmer errors, and how should each be handled?

## Express Fundamentals

28. 🔴 P0 [C] What is Express.js, what does it add over the core http module, and what is the difference between app and express.Router()?
29. 🔴 P0 [Q] How does routing work in Express (HTTP methods, route parameters, query strings, route order), and how do you organize routes into modules with express.Router()?
30. 🔴 P0 [Q] What are req.params, req.query, and req.body, and why is req.body undefined without a body-parsing middleware like express.json()?
31. 🟠 P1 [Q] What is the difference between res.send(), res.json(), res.status(), res.end(), res.redirect(), and res.sendFile(), and what causes the "Cannot set headers after they are sent" error?
32. 🟠 P1 [C] What changed in Express 5 (automatic forwarding of async errors, stricter route syntax with named wildcards, Node.js 18+ requirement, removed deprecated methods)?

## Middleware

33. 🔴 P0 [C] What is middleware in Express, what does next() do, and how does a request flow through the middleware stack to a response?
34. 🔴 P0 [Q] What are the types of middleware (application-level, router-level, built-in, third-party, error-handling), and why does the order of app.use() calls matter?
35. 🔴 P0 [Q] How does error-handling middleware work (the four-argument signature), how do you forward errors with next(err), and how does async error handling differ between Express 4 and Express 5?
36. 🟠 P1 [Q] How do you serve static files with express.static(), and how do you handle unmatched routes with a 404 catch-all?
37. 🟠 P1 [C] What do common third-party middleware do (cors, helmet, morgan, cookie-parser, express-rate-limit, compression)?

## REST API Design

38. 🔴 P0 [C] What is a REST API, how do HTTP methods map to CRUD operations, and what is the difference between PUT and PATCH?
39. 🔴 P0 [C] Which HTTP status codes should an API return for common cases (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500), and what is the difference between 401 and 403?
40. 🟠 P1 [C] What are safe and idempotent HTTP methods, and how do idempotency keys prevent duplicate processing when clients retry (e.g., payments)?
41. 🟠 P1 [D] How do you implement pagination, filtering, and sorting, and what is the difference between offset and cursor pagination?
42. 🟠 P1 [D] How do you structure an Express project (routes, controllers, services, middleware), and why separate business logic from route handlers?
43. 🟠 P1 [C] How do you version an API, and why should errors follow a consistent response format?

## Authentication & Security

44. 🔴 P0 [Q] Why must request input be validated on the server, and how do you validate it in middleware (Zod, Joi, or express-validator)?
45. 🔴 P0 [Q] How do you store passwords securely (bcrypt or argon2, salting), and why are plain text or fast hashes like MD5 and SHA-256 unsafe?
46. 🔴 P0 [Q] How does JWT authentication work in Express (signing, verifying, auth middleware, expiry), and how do access and refresh tokens work together?
47. 🔴 P0 [C] What is the difference between session-based and token-based authentication, and where should tokens be stored on the client?
48. 🟠 P1 [Q] How do you implement role-based authorization as middleware?
49. 🔴 P0 [C] How do you configure CORS in an Express API (allowed origins, credentials, preflight requests), and why can't origin '\*' be used with credentials?
50. 🟠 P1 [C] What are the common security risks in Node/Express apps (SQL and NoSQL injection, XSS, CSRF, brute force, secrets in code, vulnerable dependencies), and how do helmet, rate limiting, parameterized queries, and npm audit mitigate them?

## Performance & Production

51. 🟠 P1 [P] How do you diagnose performance problems and memory leaks in a Node app (profiling, finding blocking code, heap snapshots)?
52. 🟠 P1 [P] What is caching, and how would you add an in-memory or Redis cache, or HTTP caching headers, to an Express endpoint?
53. 🟠 P1 [D] How should logging work in production (structured logs, log levels, request IDs), and why is console.log not enough?
54. 🟠 P1 [C] How do you connect Express to a database without leaking connections (connection pooling, one shared client, closing it on shutdown)?
55. 🟠 P1 [C] How do you handle file uploads in Express (multer, multipart/form-data), and what limits and checks should you apply?
56. 🟠 P1 [C] What are WebSockets and Server-Sent Events, and when would you use them instead of polling?

## Testing

57. 🟠 P1 [Q] How do you test an Express API (supertest with node:test or Jest), and why should the app be exported separately from app.listen()?

## Output & Debugging Questions

58. 🔴 P0 [Q] Predict the output of code that mixes process.nextTick(), Promises, setImmediate(), and setTimeout(), and explain the order.
59. 🟠 P1 [Q] Predict whether setTimeout(fn, 0) or setImmediate() runs first in the main module versus inside an I/O callback, and explain why.
60. 🔴 P0 [Q] Find and fix the bug in an Express route that sends a response twice ("Cannot set headers after they are sent").
61. 🔴 P0 [Q] Find and fix the bug where an error in an async route hangs the request or crashes the process in Express 4, and explain what Express 5 changes.
62. 🟠 P1 [Q] Find and fix the bug where a middleware never calls next() or is registered in the wrong order.
63. 🟠 P1 [Q] Find and fix a route that blocks the event loop with synchronous or CPU-heavy work.

## Coding Challenges

64. 🔴 P0 [Q] Build a CRUD REST API in Express with routing, input validation, error handling, and correct status codes.
65. 🔴 P0 [Q] Write a request-logging middleware that records the method, URL, status code, and response time.
66. 🔴 P0 [Q] Write JWT authentication middleware that protects routes and returns 401 for missing or invalid tokens.
67. 🔴 P0 [Q] Write a centralized error-handling middleware with a custom AppError class.
68. 🟠 P1 [Q] Implement an in-memory rate-limiting middleware (fixed window or token bucket).
69. 🟠 P1 [Q] Write an asyncHandler wrapper for Express 4 and explain why Express 5 doesn't need it.
70. 🟠 P1 [Q] Stream a large file to the client, or process a large CSV line by line, without loading it into memory.
71. 🟠 P1 [Q] Implement promisify() from scratch.
72. 🟠 P1 [Q] Implement an in-memory cache with a TTL for an expensive endpoint.

---

## Revision Modes

- **Core Interview Fast-Sweep:** all 🔴 P0 questions (Node architecture, Event Loop, Modules, Streams, Express routing and middleware, REST, Auth)
- **Full Coverage:** 🔴 P0 + 🟠 P1
- **Machine Coding / Output Round:** Focus on the Output & Debugging Questions and Coding Challenges sections
- **Express API Round:** Focus on the Express Fundamentals, Middleware, REST API Design, and Authentication & Security sections
