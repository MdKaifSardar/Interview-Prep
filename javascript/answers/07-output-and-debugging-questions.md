[⬅️ Previous: 06 · DOM, Storage & Modules](06-dom-storage-web-apis-and-modules.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Polyfills & Utilities ➡️](08-coding-challenges-and-polyfills.md)

---

## 7. Output & Debugging Questions

### 52. 🔴 P0 [Q] Predict the output of a var hoisting example and explain why.

> **TL;DR:** `var` declarations are hoisted to the top of their enclosing function/global scope and initialized with `undefined`, whereas function declarations are hoisted along with their full implementation. Statements inside unexecuted conditional blocks still hoist `var` variable declarations.

**💡 Core Concept & Explanation**
During the **Creation Phase** of an Execution Context, the JavaScript engine scans code and allocates memory:
- **`var` Declarations:** Hoisted to top of function/global scope and initialized to `undefined`.
- **Function Declarations:** Hoisted with their full definition body attached.
- **Unexecuted Conditional Blocks (`if (false)`):** Lexical parsing hoists `var` declarations regardless of whether the enclosing runtime conditional branch actually executes. The variable exists in scope with value `undefined`.

**🛠️ Code / Visual Diagram / Table**

```javascript
console.log(a); // undefined (var declaration hoisted, value assignment remains below)
console.log(foo()); // "Hello from foo" (Function declaration hoisted with body)

var a = 10;

function foo() {
  return "Hello from foo";
}

if (false) {
  var b = 20;
}

console.log(b); // undefined (var b hoisted from inside if-block, but assignment skipped)

var bar = function() {
  return "Hello from bar";
};
console.log(bar()); // "Hello from bar"
```

**Execution Step-by-Step Trace:**

| Phase | Variable / Target | Value in Memory | Reason |
| :--- | :--- | :--- | :--- |
| **Creation** | `a` | `undefined` | `var a` declaration hoisted |
| **Creation** | `foo` | `function foo() {...}` | Function declaration fully hoisted |
| **Creation** | `b` | `undefined` | `var b` inside `if(false)` hoisted to function scope |
| **Creation** | `bar` | `undefined` | Variable expression `var bar` hoisted as `undefined` |
| **Execution L1** | `console.log(a)` | `undefined` | Reads hoisted `undefined` value |
| **Execution L2** | `console.log(foo())` | `"Hello from foo"` | Invokes fully hoisted function |
| **Execution L12** | `console.log(b)` | `undefined` | Assignment `b=20` skipped, reads `undefined` |

**⚠️ Interview Pitfall / Pro-Tip**
- **Function Expression Hoisting Gotcha:** Attempting to call `bar()` before line 14 throws `TypeError: bar is not a function` (NOT `ReferenceError`), because `bar` exists in memory as `undefined`, and invoking `undefined()` throws a `TypeError`.


---

### 53. 🔴 P0 [Q] Predict the output of a closure inside a loop and explain why.

> **TL;DR:** Using `var` in a loop creates a single shared function-scoped variable binding. When `setTimeout` callbacks run asynchronously after loop completion, all closures reference the final mutated value (`3, 3, 3`). Using `let` creates a new block-scoped binding per iteration (`0, 1, 2`).

**💡 Core Concept & Explanation**
In JavaScript, closures maintain a reference to their outer Lexical Environment, not a snapshot copy of variable values at creation time.
- **`var` in a `for` loop:** `var i` is function-scoped. The loop runs synchronously from `i = 0` to `i = 3`. All 3 `setTimeout` callbacks form closures over the **exact same reference** `i`. By the time the call stack clears and microtasks/macrotasks run 100ms later, `i` is `3`.
- **`let` in a `for` loop:** `let j` creates a distinct, new block-scoped variable binding for **every single iteration**. Each callback closes over its own immutable iteration binding (`0`, `1`, `2`).

**🛠️ Code / Visual Diagram / Table**

```javascript
// ❌ Problematic (var) -> Output: 3, 3, 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 100);
}

// ✅ Fix 1: ES6 Block Scope (let) -> Output: 0, 1, 2
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let j:', j), 100);
}

// ✅ Fix 2: ES5 IIFE Closure Capture -> Output: 0, 1, 2
for (var k = 0; k < 3; k++) {
  (function(capturedK) {
    setTimeout(() => console.log('IIFE k:', capturedK), 100);
  })(k);
}
```

```
[ Call Stack ]                [ Macrotask Queue ]
for loop finishes (i = 3) --> [ cb1 (captures ref i=3) ]
                              [ cb2 (captures ref i=3) ]
                              [ cb3 (captures ref i=3) ]
                              Outputs: 3, 3, 3
```

**⚠️ Interview Pitfall / Pro-Tip**
- Interviewers will ask: *"What happens if delay is `0` (`setTimeout(..., 0)`)?"*
- **Answer:** Output is STILL `3, 3, 3`! `setTimeout(..., 0)` does NOT run synchronously; it pushes callbacks to the Macrotask Queue, which waits until the Call Stack is completely clear (after the loop finishes and `i` becomes `3`).


---

### 54. 🔴 P0 [Q] Predict the output of this with regular vs arrow functions.

> **TL;DR:** Regular functions evaluate `this` dynamically at invocation time based on *how* they are called. Arrow functions do NOT have their own `this`; they capture `this` lexically from their enclosing parent scope at definition time.

**💡 Core Concept & Explanation**
1. **Regular Functions:** Evaluates `this` at call-time using 4 binding rules:
   - *Default Binding:* `fn()` $
ightarrow$ `global` (or `undefined` in strict mode).
   - *Implicit Binding:* `obj.fn()` $
ightarrow$ `obj`.
   - *Explicit Binding:* `fn.call(ctx)` $
ightarrow$ `ctx`.
   - *New Binding:* `new Fn()` $
ightarrow$ newly constructed instance object.
2. **Arrow Functions:** Skip `this` binding completely in the Execution Context. `this` is resolved along the Scope Chain lexically. `call()`, `apply()`, and `bind()` cannot alter an arrow function's `this`.

**🛠️ Code / Visual Diagram / Table**

```javascript
const user = {
  name: 'Alice',
  regularMethod: function() {
    console.log('Regular:', this.name);
  },
  arrowMethod: () => {
    console.log('Arrow:', this.name);
  },
  nestedMethod: function() {
    const innerArrow = () => console.log('Nested Arrow:', this.name);
    innerArrow();
  }
};

user.regularMethod(); // "Regular: Alice" (Implicit binding to user)
user.arrowMethod();   // "Arrow: undefined" (Lexical scope is global/module, where name is undefined)
user.nestedMethod();  // "Nested Arrow: Alice" (Lexical scope is nestedMethod, where this = user)

const detached = user.regularMethod;
detached();           // "Regular: undefined" (Default binding lost! In strict mode: TypeError)
```

| Function Type | `this` Binding Mechanism | Can `bind()` change `this`? | Can be `new` Constructor? |
| :--- | :--- | :--- | :--- |
| **Regular Function** | Dynamic (based on call-site) | Yes | Yes |
| **Arrow Function** | Lexical (enclosing scope) | No (silently ignored) | No (`TypeError`) |

**⚠️ Interview Pitfall / Pro-Tip**
- **Object Literal Trap:** Defining object methods using arrow functions (`const obj = { val: 10, inc: () => this.val++ }`) is a bug! Object literals `{}` do NOT create a new lexical scope block for arrow functions; `this` points to `window`/`globalThis`.


---

### 55. 🔴 P0 [Q] Predict the output of Promise + setTimeout() code and explain the event loop.

> **TL;DR:** Synchronous script execution completes first $
ightarrow$ Microtasks (`Promise.then`, `queueMicrotask`, `process.nextTick`) are drained to completion $
ightarrow$ Macrotasks (`setTimeout`, `setInterval`, I/O) run one by one per event loop cycle.

**💡 Core Concept & Explanation**
The V8 Runtime Event Loop prioritizes execution queues in a strict hierarchy:
1. **Call Stack (Synchronous Code):** Executes code sequentially until stack is empty.
2. **Microtask Queue:** Drained completely after every stack execution before browser rendering or macrotasks run. Promises (`.then()`, `.catch()`, `.finally()`) and `queueMicrotask` inhabit this queue.
3. **Macrotask Queue:** Tasks like `setTimeout`, `setInterval`, and DOM event handlers are dequeued one at a time per loop iteration.

**🛠️ Code / Visual Diagram / Table**

```javascript
console.log('1: Sync Start');

setTimeout(() => {
  console.log('2: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask 1');
}).then(() => {
  console.log('4: Microtask 2');
});

console.log('5: Sync End');

// Complete Output Sequence:
// 1: Sync Start
// 5: Sync End
// 3: Microtask 1
// 4: Microtask 2
// 2: Macrotask (setTimeout)
```

```
[ Step 1: Call Stack ]       --> Prints 1: Sync Start, 5: Sync End
[ Step 2: Microtask Queue ]  --> Drains ALL: Prints 3: Microtask 1, 4: Microtask 2
[ Step 3: Macrotask Queue ]  --> Executes 1 task: Prints 2: Macrotask (setTimeout)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Microtask Chaining / Starvation:** If a Microtask recursively schedules another Microtask (`function loop() { Promise.resolve().then(loop); }`), the Call Stack / Microtask loop will starve the Macrotask Queue and UI render thread forever, freezing the browser!


---

### 56. 🔴 P0 [Q] Predict the output of async/await + Promise code and explain microtask behavior.

> **TL;DR:** An `async` function executes synchronously up to the first `await` expression. The expression following `await` is evaluated synchronously, while the code after `await` is wrapped into a Microtask and paused until the awaited Promise resolves.

**💡 Core Concept & Explanation**
Under the hood, `async/await` is syntactic sugar over Promises and Generators:
1. When an `async` function is invoked, it runs synchronously until it hits an `await`.
2. The code on the right-hand side of `await` evaluates **immediately (synchronously)**.
3. The `async` function pauses and returns an implicit Promise to the caller.
4. All statements following `await` are scheduled as a **Microtask** continuation when the awaited value resolves.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function async1() {
  console.log('2: async1 start');
  await async2();
  console.log('6: async1 end'); // Microtask continuation
}

async function async2() {
  console.log('3: async2');
}

console.log('1: script start');

setTimeout(() => {
  console.log('8: setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('4: promise executor');
  resolve();
}).then(() => {
  console.log('7: promise then');
});

console.log('5: script end');

// Output:
// 1: script start
// 2: async1 start
// 3: async2
// 4: promise executor
// 5: script end
// 6: async1 end
// 7: promise then
// 8: setTimeout
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Promise Executor Synchronicity:** The function passed into `new Promise((resolve, reject) => { ... })` is called **synchronously** immediately upon creation. Only `.then()` callbacks are asynchronous microtasks.


---

### 57. 🔴 P0 [Q] Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.

> **TL;DR:** `Array.prototype.forEach` does NOT await Promises returned by its callback; it triggers async operations concurrently without waiting. Use `for...of` for sequential execution, `Promise.all()` for parallel execution, `try/catch` for error handling, and `AbortController` for race conditions.

**💡 Core Concept & Explanation**
1. **`forEach` Async Bug:** `forEach` accepts a synchronous callback. When you mark the callback `async`, `forEach` invokes it, gets back a Promise, discards the Promise, and immediately proceeds to the next iteration.
2. **Unhandled Rejection Bug:** Marking a function `async` without wrapping `await` calls in `try/catch` or attaching `.catch()` results in unhandled Promise rejections.
3. **Race Condition Bug:** Rapid firing of async requests (e.g. search input) triggers multiple HTTP requests. If request #1 responds *after* request #2 due to network jitter, the UI displays stale data from request #1.

**🛠️ Code / Visual Diagram / Table**

```javascript
// ❌ BUG 1: await inside forEach (Returns before work is completed)
async function processBad(items) {
  items.forEach(async (item) => {
    await saveToDb(item); // Not awaited by processBad!
  });
  console.log('Finished!'); // Prints BEFORE items are saved
}

// ✅ FIX 1a: Sequential Execution (for...of)
async function processSequential(items) {
  for (const item of items) {
    await saveToDb(item);
  }
  console.log('Finished sequentially!');
}

// ✅ FIX 1b: Parallel Concurrent Execution (Promise.all)
async function processParallel(items) {
  await Promise.all(items.map(item => saveToDb(item)));
  console.log('Finished all in parallel!');
}

// ✅ FIX 2: Race Condition Fix using AbortController
let currentController = null;

async function fetchSearchResults(query) {
  if (currentController) {
    currentController.abort(); // Cancel previous inflight request
  }
  currentController = new AbortController();

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: currentController.signal
    });
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Fetch error:', err);
    }
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- `items.map(async item => ...)` creates an array of Promises (`[Promise, Promise]`). Passing this array directly to `if (items.map(...))` evaluates as **truthy** immediately! You MUST pass it to `await Promise.all(...)`.


---

### 58. 🔴 P0 [Q] Find and fix the bug in code that loses this in a callback or reads a stale closure value.

> **TL;DR:** Detaching an object method and passing it as a callback loses its implicit `this` context binding (`this` defaults to `undefined` or `window`). Closed-over variables inside long-lived callbacks (timers, event handlers) capture initial variable snapshots (stale closures).

**💡 Core Concept & Explanation**
1. **Lost `this` Bug:** When passing `obj.method` as a callback parameter (e.g. `setTimeout(obj.method, 100)` or `elem.addEventListener('click', obj.method)`), only a reference to the raw function is passed. At call time, it is invoked as a standalone function `method()`, losing implicit binding to `obj`.
2. **Stale Closure Bug:** A closure captures variables from its enclosing environment by reference at definition time. If a callback executes repeatedly or at a later point while outer state updates without re-creating the closure, the callback reads obsolete captured values.

**🛠️ Code / Visual Diagram / Table**

```javascript
// ❌ BUG 1: Lost 'this' in callback
class AutoCounter {
  constructor() {
    this.count = 0;
  }
  start() {
    setTimeout(function() {
      this.count++; // TypeError: Cannot read property 'count' of undefined / window
      console.log(this.count);
    }, 100);
  }
}

// ✅ FIX 1: Arrow Function (Lexical this) or bind()
class FixedCounter {
  constructor() {
    this.count = 0;
  }
  start() {
    setTimeout(() => {
      this.count++; // Works! Inherits 'this' from FixedCounter instance
      console.log('Count:', this.count);
    }, 100);
  }
}

// ❌ BUG 2: Stale Closure in Event Handler / Timer
function createStaleTimer() {
  let count = 0;
  
  setInterval(() => {
    // If count was updated outside, this closure reads the captured count variable
    console.log('Current count:', count); 
  }, 1000);

  return { increment: () => count++ };
}

// ✅ FIX 2: Ref Object Pattern (Mutable Container Object)
function createFreshTimer() {
  const state = { count: 0 };
  
  setInterval(() => {
    console.log('Fresh count:', state.count); // Reads updated property on shared object
  }, 1000);

  return { increment: () => state.count++ };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **React Hook Stale Closure Gotcha:** In React `useEffect(() => { const id = setInterval(() => console.log(count), 1000); return () => clearInterval(id); }, [])`, passing an empty dependency array `[]` causes the interval callback to capture `count = 0` permanently! Fix with `useEffect` dependencies or functional state updates `setCount(prev => prev + 1)`.


---

[⬅️ Previous: 06 · DOM, Storage & Modules](06-dom-storage-web-apis-and-modules.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Polyfills & Utilities ➡️](08-coding-challenges-and-polyfills.md)
