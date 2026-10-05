[⬅️ Previous: 04 · Arrays & Error Handling](04-arrays-iteration-and-error-handling.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · DOM, Storage & Modules ➡️](06-dom-storage-web-apis-and-modules.md)

---

## 5. Async, Event Loop & Promises

### 36. 🔴 P0 [Q] How does the event loop work, what is the difference between microtasks and macrotasks, why do Promise callbacks run before setTimeout(fn, 0), and what happens when the call stack is busy?

> **TL;DR:** The Event Loop monitors Call Stack and Queues. When Call Stack is empty, it processes ALL Microtasks (Promises, queueMicrotask) before processing ONE Macrotask (setTimeout, setInterval, I/O). A busy call stack blocks the event loop and freezes the UI.

**💡 Core Concept & Explanation**
**Event Loop Priority Order:**
1. Execute synchronous code on **Call Stack**.
2. When Call Stack empties, flush the entire **Microtask Queue** completely (Promise `.then` callbacks, `queueMicrotask`, `process.nextTick` in Node).
3. Render UI updates (in browser).
4. Pick and execute ONE task from **Macrotask Queue** (`setTimeout`, `setInterval`, I/O, `requestAnimationFrame`).
5. Repeat loop.

**Why Promises run before setTimeout(0):**
Promise callbacks enter the Microtask queue, which has absolute priority over the Macrotask queue.

**🛠️ Code / Visual Diagram / Table**

```javascript
console.log("1. Sync Main");

setTimeout(() => console.log("4. Macrotask (Timeout)"), 0);

Promise.resolve().then(() => console.log("2. Microtask 1"));
Promise.resolve().then(() => console.log("3. Microtask 2"));

console.log("Sync End");

// Output Order:
// 1. Sync Main
// Sync End
// 2. Microtask 1
// 3. Microtask 2
// 4. Macrotask (Timeout)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Running intensive recursive microtasks (`Promise.resolve().then(loop)`), starving the Macrotask queue and freezing UI rendering permanently.


---

### 37. 🔴 P0 [C] What is the difference between concurrency and parallelism?

> **TL;DR:** Concurrency is dealing with multiple tasks at once by interleaving execution on a single core (Event Loop). Parallelism is executing multiple tasks simultaneously at the exact same physical instant on multiple CPU cores.

**💡 Core Concept & Explanation**
- **Concurrency (Single CPU Core):** Tasks overlap in execution window via context switching or asynchronous non-blocking event loops (JavaScript's model).
- **Parallelism (Multi-Core CPU):** Independent instructions run physically simultaneously across different hardware CPU cores (e.g. Web Workers / Worker Threads).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Web Worker Parallelism Example (Main Thread):
const worker = new Worker('worker.js');
worker.postMessage({ data: [100000000] }); // Runs on separate physical CPU thread!

worker.onmessage = (e) => {
  console.log("Parallel computation result:", e.data);
};
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming asynchronous JS code (`async/await`, Promises) runs in parallel on multiple CPU cores. It runs concurrently on a single thread unless Web Workers / Worker Threads are used.


---

### 38. 🟠 P1 [C] What is callback hell, what are the limitations of callbacks, and why were Promises introduced?

> **TL;DR:** Callback hell refers to deeply nested, unmaintainable asynchronous callbacks ("pyramid of doom"). Promises were introduced to flatten async flows into chainable, composable pipelines with centralized error handling.

**💡 Core Concept & Explanation**
**Limitations of Callbacks:**
1. Deep nesting ("Pyramid of Doom") leading to unreadable code.
2. Inversion of Control: Trusting 3rd party functions to call your callback correctly (not too many times, not zero times).
3. Difficult error propagation across nested operations.

**Promises Solution:**
Standardizes async control flow into a state machine (`Pending`, `Fulfilled`, `Rejected`), decoupling async producers from consumers.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Callback Hell (Pyramid of Doom)
getData((a) => {
  getMoreData(a, (b) => {
    getFinalData(b, (c) => {
      console.log(c);
    });
  });
});

// Promises (Flat Chained Pipeline)
getData()
  .then(a => getMoreData(a))
  .then(b => getFinalData(b))
  .then(c => console.log(c))
  .catch(err => console.error(err));
```

**⚠️ Interview Pitfall / Pro-Tip**
- Failing to return a Promise inside a `.then()` chain, causing subsequent `.then()` steps to execute prematurely with `undefined`.

---

## Promises & Async/Await

---

### 39. 🔴 P0 [C] What is a Promise, what are its three states, and what do .then(), .catch(), and .finally() do?

> **TL;DR:** A Promise represents the eventual completion or failure of an async operation. It has 3 states: Pending, Fulfilled, or Rejected. .then() handles fulfillment, .catch() handles rejection, and .finally() executes regardless.

**💡 Core Concept & Explanation**
**Promise State Machine:**
- **Pending:** Initial state, neither fulfilled nor rejected.
- **Fulfilled:** Operation completed successfully (value set). Immutably locked.
- **Rejected:** Operation failed (reason set). Immutably locked.

Once settled (fulfilled or rejected), state transitions can never change again.

**🛠️ Code / Visual Diagram / Table**

```javascript
const fetchUser = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) resolve({ id: 1, name: "Alice" });
    else reject("Database connection error");
  }, 100);
});

fetchUser
  .then(user => console.log(user.name))
  .catch(err => console.error(err))
  .finally(() => console.log("Operation completed."));
```

**⚠️ Interview Pitfall / Pro-Tip**
- Attempting to reset or re-trigger a settled Promise instance. Promises represent a single one-shot async result.


---

### 40. 🔴 P0 [Q] How does Promise chaining work when a .then() callback returns a value, returns another Promise, or throws an error?

> **TL;DR:** In Promise chaining, returning a primitive/object wraps it in a resolved Promise; returning another Promise waits for it to resolve; throwing an error or returning a rejected Promise skips to the nearest .catch().

**💡 Core Concept & Explanation**
**`.then()` Resolution Rules:**
1. **Returns a Value `x`:** Returns a new Promise resolved with `x`.
2. **Returns a Promise `P`:** The chain adopts the state and value of `P`.
3. **Throws Error `e`:** Returns a new Promise rejected with `e` (caught by next `.catch()`).

**🛠️ Code / Visual Diagram / Table**

```javascript
Promise.resolve(5)
  .then(val => val * 2) // Returns 10
  .then(val => new Promise(res => res(val + 5))) // Returns Promise(15)
  .then(val => {
    throw new Error("Something went wrong!");
  })
  .catch(err => console.log("Caught:", err.message)); // Handles thrown error!
```

**⚠️ Interview Pitfall / Pro-Tip**
- Forgetting to `return` Promises inside `.then()` handlers, breaking the asynchronous chain sequence.


---

### 41. 🔴 P0 [Q] What do Promise.resolve() and Promise.reject() do, and what is the difference between Promise.all(), allSettled(), race(), and any()?

> **TL;DR:** Promise.all waits for all to succeed (fails fast on first error); allSettled waits for all to finish regardless of outcome; race resolves/rejects as soon as the FIRST promise settles; any resolves as soon as the FIRST promise succeeds (fails if all fail).

**💡 Core Concept & Explanation**
**Promise Combinators Comparison:**
- **`Promise.all([p1, p2])`:** Returns array of all results. Fails instantly if ANY promise rejects.
- **`Promise.allSettled([p1, p2])`:** Returns array of objects `{ status: 'fulfilled'|'rejected', value|reason }`. NEVER rejects.
- **`Promise.race([p1, p2])`:** Settles with result/error of whichever promise finishes FIRST.
- **`Promise.any([p1, p2])`:** Resolves with value of FIRST fulfilled promise. Rejects with `AggregateError` only if ALL promises reject.

**🛠️ Code / Visual Diagram / Table**

```javascript
const p1 = Promise.resolve("Fast Success");
const p2 = new Promise((_, r) => setTimeout(() => r("Error"), 100));

// Promise.allSettled
Promise.allSettled([p1, p2]).then(results => {
  console.log(results);
  // [{status: 'fulfilled', value: 'Fast Success'}, {status: 'rejected', reason: 'Error'}]
});

// Promise.any
Promise.any([p2, p1]).then(val => console.log("First Success:", val)); // "Fast Success"
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `Promise.all` for batch requests where partial failure is acceptable; one single failed request aborts all results. Use `Promise.allSettled` instead.


---

### 42. 🔴 P0 [C] What does an async function return, and how is await related to Promises?

> **TL;DR:** An async function always returns a Promise. The await operator pauses execution inside the async function until the awaited Promise settles, unwrapping its resolved value.

**💡 Core Concept & Explanation**
**Syntactic Sugar for Promises:**
- Marking a function `async` wraps its return value in `Promise.resolve()`.
- `await` can only be used inside `async` functions (or top-level ES modules).
- Under the hood, `await` yields execution back to the Event Loop, resuming execution as a Microtask when the Promise resolves.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function fetchNumericData() {
  return 42; // Wrapped automatically in Promise.resolve(42)
}

async function main() {
  const val = await fetchNumericData(); // Unwraps promise value
  console.log(val); // 42
}
main();
```

**⚠️ Interview Pitfall / Pro-Tip**
- Forgetting `await` when invoking an async function, receiving the raw pending Promise object instead of the unwrapped return value.


---

### 43. 🔴 P0 [Q] How do you handle errors with async/await, and what is an unhandled Promise rejection?

> **TL;DR:** Handle errors in async/await using try/catch blocks or appending .catch() to the async call. Unhandled promise rejections occur when a rejected promise has no handler, triggering process.on('unhandledRejection') or browser warnings.

**💡 Core Concept & Explanation**
**Error Handling in Async/Await:**
In async functions, rejected promises throw exceptions that can be caught using standard `try/catch` blocks. If unhandled, the rejection bubbles up and triggers an `unhandledrejection` event on `window` / `process`.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function fetchUserData() {
  try {
    const res = await fetch("https://invalid-url.xyz");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Caught error gracefully:", err.message);
  }
}
fetchUserData();
```

**⚠️ Interview Pitfall / Pro-Tip**
- Omitting try/catch blocks around `await` calls, causing unhandled promise rejections that crash Node.js processes.


---

### 44. 🔴 P0 [Q] Why doesn't await work as expected inside forEach(), and what is the difference between sequential and parallel awaits?

> **TL;DR:** forEach runs callbacks synchronously without awaiting them, firing requests concurrently without waiting. Use for...of for sequential awaits, and Promise.all() with map() for parallel awaits.

**💡 Core Concept & Explanation**
**Why `await` fails in `forEach`:**
`Array.prototype.forEach` expects a standard synchronous callback. It invokes callback functions back-to-back without inspecting or awaiting returned Promises.

**🛠️ Code / Visual Diagram / Table**

```javascript
const ids = [1, 2, 3];
const fetchItem = id => new Promise(res => setTimeout(() => res(`Item ${id}`), 100));

// 1. SEQUENTIAL (One by one in order)
async function runSequential() {
  for (const id of ids) {
    const item = await fetchItem(id);
    console.log(item);
  }
}

// 2. PARALLEL (All concurrently)
async function runParallel() {
  const items = await Promise.all(ids.map(id => fetchItem(id)));
  console.log(items);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Expecting `forEach(async () => { await ... })` to pause loop execution.


---

### 45. 🟠 P1 [Q] How do async race conditions cause stale results, and how do AbortController and AbortSignal cancel in-flight requests to prevent them?

> **TL;DR:** Async race conditions happen when responses return out of order. AbortController creates an AbortSignal to cancel pending HTTP requests when new requests are triggered.

**💡 Core Concept & Explanation**
**Race Condition Scenario:**
User types in a search box ("A" then "AB"). Request for "A" takes 2 seconds; request for "AB" takes 0.5 seconds. "AB" finishes first, then "A" finishes later and overwrites search results with stale data!

**Fix with AbortController:**
Cancel the active in-flight request via `controller.abort()` whenever a new request is dispatched.

**🛠️ Code / Visual Diagram / Table**

```javascript
let currentController = null;

async function searchApi(query) {
  // Abort previous in-flight request if present
  if (currentController) currentController.abort();
  
  currentController = new AbortController();
  
  try {
    const res = await fetch(`/api/search?q=${query}`, {
      signal: currentController.signal
    });
    const data = await res.json();
    console.log("Search result:", data);
  } catch (err) {
    if (err.name === 'AbortError') console.log("Cancelled stale request!");
    else console.error(err);
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Not handling `AbortError` in catch blocks when using AbortController.

---

## DOM & Web APIs

---

[⬅️ Previous: 04 · Arrays & Error Handling](04-arrays-iteration-and-error-handling.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · DOM, Storage & Modules ➡️](06-dom-storage-web-apis-and-modules.md)
