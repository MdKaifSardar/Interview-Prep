[⬅️ Previous: 07 · Output & Debugging](07-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · DSA in JavaScript ➡️](09-dsa-in-javascript.md)

---

## 8. Coding Challenges (High-Yield Polyfills & Utilities)

### 59. 🔴 P0 [Q] Implement Array.prototype.reduce() from scratch (handling empty arrays and missing initialValue).

> **TL;DR:** `Array.prototype.reduce` executes a reducer callback across every element, accumulating a single return value. If `initialValue` is omitted, the first element becomes the accumulator and iteration starts at index 1. Calling it on an empty array without an initial value throws a `TypeError`.

**💡 Core Concept & Explanation**
1. **Validation & Initial Value:**
   - Verify `callback` is a callable function.
   - Check if `initialValue` was passed using `arguments.length >= 2`. Checking `initialValue !== undefined` is a bug because a caller can legitimately pass `undefined` as their accumulator!
2. **Empty Array Guard:**
   - If the array is empty and no `initialValue` was provided, immediately throw `TypeError('Reduce of empty array with no initial value')`.
3. **Iteration & Accumulation:**
   - If `initialValue` is given, `acc = initialValue` and start index is `0`.
   - If omitted, `acc = this[0]` and start index is `1`.
   - Loop sequentially through the array, passing `(accumulator, currentValue, index, array)` into `callback`.

**🛠️ Code / Visual Diagram / Table**

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const hasInitial = arguments.length >= 2;

  // Empty array without initial value throws TypeError
  if (this.length === 0 && !hasInitial) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let acc = hasInitial ? initialValue : this[0];
  let startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

// Test Cases:
console.log([1, 2, 3, 4].myReduce((acc, x) => acc + x, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, x) => acc * x));    // 24 (no initialValue)
console.log([5].myReduce((acc, x) => acc + x));             // 5
// [].myReduce((acc, x) => acc + x);                         // Throws TypeError!
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The `undefined` Initial Value Trap:** Never write `if (!initialValue)` or `if (initialValue === undefined)`. If someone calls `[1, 2].reduce(fn, undefined)`, `arguments.length` is `2`, and `undefined` is their valid starting accumulator.
- **Senior Follow-Up Flex (Sparse Arrays):** In full ECMAScript spec, sparse holes (e.g. `[1, , 3]`) are skipped via `if (i in this)`. Mentioning this to the interviewer demonstrates senior engine knowledge without cluttering your core solution.

---

### 60. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.

> **TL;DR:** `debounce` delays function execution until a specified quiet period has elapsed since the last invocation. Every incoming trigger clears the active timer and schedules a new one, suppressing rapid event bursts (e.g. search inputs, window resize).

**💡 Core Concept & Explanation**
- **Closure Scope:** `debounce` returns an inner function that encloses a persistent `timerId` variable.
- **Reset Mechanism:** On each call, `clearTimeout(timerId)` cancels the pending invocation before starting a new `setTimeout`.
- **Context & Arguments:** The wrapped function must preserve `this` and any arguments passed to the event handler using `fn.apply(this, args)`.

```
Incoming Calls:  --[Key A]--[Key B]--[Key C]----------------------->
Timer Cleared:       ❌        ❌      (Wait 300ms uninterrupted...)
Execution:                                               🔥 [FIRE fn]
```

**🛠️ Code / Visual Diagram / Table**

```javascript
function debounce(fn, delay) {
  let timerId = null;

  return function(...args) {
    // 1. Cancel previous pending timer
    clearTimeout(timerId);

    // 2. Restart delay countdown
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage Example: Search Typeahead
const handleSearch = debounce(function(query) {
  console.log('Searching API for:', query, '| Context:', this);
}, 300);

// Keypresses at 0ms, 100ms, 200ms -> Only 1 API call executes at 500ms
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Preserving `this` Context:** If you write `setTimeout(function() { fn(...args); }, delay)`, `this` will default to `window` or `undefined` (in strict mode). An arrow function inherits `this` lexically from the outer wrapper, preserving the correct DOM element context.
- **Interviewer Extension (Cancel & Immediate):** If asked to support `.cancel()`, simply attach `debounced.cancel = () => clearTimeout(timerId);` to the returned function.

---

### 61. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.

> **TL;DR:** `throttle` ensures a function executes at most once per specified time interval, providing steady, periodic execution during continuous events (e.g. scrolling, mouse movement). While `debounce` waits for silence, `throttle` guarantees a regulated execution rate.

**💡 Core Concept & Explanation**
1. **Debounce vs Throttle:**
   - **Debounce:** "Wait until the user has stopped triggering for $N$ ms, then run once." (Search inputs, resize end).
   - **Throttle:** "Run at most once every $N$ ms while triggers continue." (Infinite scroll, scroll progress bars).
2. **The Flag/Timer Pattern:**
   - Maintain a boolean `inThrottle` inside a closure.
   - If `inThrottle` is `false`: execute `fn` immediately (leading edge), set `inThrottle = true`, and schedule a `setTimeout` to flip `inThrottle` back to `false` after the interval.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Approach 1: Flag / Timer Pattern (Most common in interviews)
function throttle(fn, limit) {
  let inThrottle = false;

  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Approach 2: Timestamp Pattern (Guaranteed leading-edge clock check)
function throttleByTime(fn, limit) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Usage Example: Scroll listener
window.addEventListener('scroll', throttle(() => {
  console.log('Recalculating scroll position at most once every 200ms');
}, 200));
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The Trailing-Call Tradeoff:** The simple flag and timestamp patterns execute on the *leading edge* (first trigger) and drop calls that occur during the cooldown window. If the interviewer asks: *"What if the user scrolls and stops, and we need the final position executed?"*, explain that a hybrid version stores `lastArgs` and uses `setTimeout` to trigger the trailing call when cooldown finishes.

---

### 62. 🔴 P0 [Q] Implement Promise.all() from scratch.

> **TL;DR:** `Promise.all(promises)` takes an array/iterable of promises and returns a single Promise that resolves to an array of results in the **exact original order** when all input promises fulfill, or rejects immediately with the reason of the first rejected promise (fail-fast).

**💡 Core Concept & Explanation**
1. **Validation & Edge Cases:** If the input array is empty, resolve immediately with `[]`.
2. **Order Preservation:** Promises settle asynchronously at different speeds. You must assign each result to its specific input index `results[index] = value`, **not** `results.push(value)`.
3. **Completion Counter:** Maintain a `completedCount`. Increment it on every resolved promise. When `completedCount === promises.length`, resolve the outer promise.
4. **Wrap Non-Promises:** Wrap each item with `Promise.resolve(item)` to correctly handle plain values.

**🛠️ Code / Visual Diagram / Table**

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 1. Validate input
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    // 2. Empty array resolves immediately
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = [];
    let completedCount = 0;

    // 3. Process each item in parallel
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value; // Preserve original input index!
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Fast-reject on the very first error
    });
  });
}

// Test cases:
const p1 = Promise.resolve(42);
const p2 = new Promise((res) => setTimeout(() => res('slow'), 100));
const p3 = 'plain string';

promiseAll([p1, p2, p3]).then(console.log); // [42, 'slow', 'plain string']
promiseAll([p1, Promise.reject('Error!'), p2]).catch(console.error); // 'Error!'
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The `results.length` vs `completedCount` Trap:** Never write `if (results.length === promises.length)`. If the 3rd promise resolves first and you assign `results[2] = val`, JavaScript arrays automatically report `.length = 3` even though indices 0 and 1 are empty! Always track completed items using an explicit integer counter (`completedCount`).

---

### 63. 🔴 P0 [Q] Implement memoize() and explain how closures make it work.

> **TL;DR:** `memoize` caches the return values of expensive pure functions based on their serialized arguments using a closure-scoped `Map`. Subsequent calls with identical arguments skip computation and return the cached result in $O(1)$ time.

**💡 Core Concept & Explanation**
- **Closure Cache:** The outer `memoize` function instantiates a private `cache = new Map()`. The returned wrapper function closes over and retains access to this cache across calls.
- **Key Serialization:** Input arguments are serialized into a lookup key (typically via `JSON.stringify(args)`).

**🛠️ Code / Visual Diagram / Table**

```javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage Example: Expensive computation
const factorial = memoize(function(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

console.log(factorial(100)); // Computed & cached
console.log(factorial(100)); // Instant O(1) cache hit!
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`JSON.stringify` Limitations:**
  - In JavaScript, `JSON.stringify` does not handle circular references and treats `undefined` or functions inconsistently.
  - Object key order difference: `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` produce different strings despite representing identical objects.
  - *Interview Solution:* Mention that for complex object arguments in production, callers can pass a custom `keyResolver` function `(args) => ...` or use a nested `WeakMap`.

---

### 64. 🟠 P1 [Q] Implement an EventEmitter with on(), off(), once(), and emit().

> **TL;DR:** An `EventEmitter` implements the Publish-Subscribe pattern. It maintains an internal map of event names to listener arrays (`Map<string, Function[]>`) to register (`on`), trigger (`emit`), remove (`off`), and execute one-time handlers (`once`).

**💡 Core Concept & Explanation**
- **Event Store:** `Map<string, Function[]>` where keys are event names and values are arrays of subscriber callbacks.
- **`once()` Wrapper:** Wraps the original listener in a temporary function that deregisters itself via `this.off()` before executing the callback.
- **Safe Iteration in `emit()`:** Always iterate over a shallow clone `[...listeners]` so that if a listener calls `off()` during execution, it doesn't cause array-mutation indexing bugs.

**🛠️ Code / Visual Diagram / Table**

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // Register listener
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this; // Allows method chaining
  }

  // Remove listener
  off(event, listener) {
    if (!this.events.has(event)) return this;

    const filtered = this.events.get(event).filter(
      (fn) => fn !== listener && fn._original !== listener
    );
    this.events.set(event, filtered);
    return this;
  }

  // One-time listener
  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    wrapper._original = listener; // Allows removing via off() before once fires
    return this.on(event, wrapper);
  }

  // Trigger event listeners
  emit(event, ...args) {
    if (!this.events.has(event)) return false;

    // Clone array to avoid bugs if a listener unbinds itself during iteration
    const listeners = [...this.events.get(event)];
    listeners.forEach((fn) => fn.apply(this, args));
    return true;
  }
}

// Test Run:
const emitter = new EventEmitter();
const onUserLogin = (user) => console.log('Welcome,', user);

emitter.on('login', onUserLogin);
emitter.once('login', () => console.log('This only prints on FIRST login!'));

emitter.emit('login', 'Kaif');
// Welcome, Kaif
// This only prints on FIRST login!

emitter.emit('login', 'Alex');
// Welcome, Alex (once listener is gone!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Array Mutation During Emission:** If a subscriber calls `emitter.off()` inside its callback while `emit()` is executing, mutating the array in-place skips the subsequent callback in the loop! Slicing or spreading `[...listeners]` prevents this.

---

### 65. 🟠 P1 [Q] Implement a deep-clone utility (and explain structuredClone vs JSON.parse/stringify limitations).

> **TL;DR:** Deep cloning creates a completely independent copy of nested objects and arrays. An interview-optimal deep clone checks for primitives, detects circular references using a `WeakMap`, and recursively clones object and array properties.

**💡 Core Concept & Explanation**
1. **Primitives & Null:** If the value is primitive or `null`, return it directly.
2. **Circular References:** Use a `WeakMap` tracker `(originalObj -> clonedObj)`. If an object has already been encountered in the traversal, return its existing clone to prevent infinite recursion.
3. **Array vs Plain Object:** Initialize the new container based on `Array.isArray(value)` and recursively duplicate own enumerable keys.

**🛠️ Code / Visual Diagram / Table**

```javascript
function deepClone(value, map = new WeakMap()) {
  // 1. Return primitives and null directly
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 2. Prevent infinite loops from circular references
  if (map.has(value)) {
    return map.get(value);
  }

  // 3. Initialize array or object container
  const clone = Array.isArray(value) ? [] : {};
  map.set(value, clone);

  // 4. Recursively copy properties
  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], map);
  }

  return clone;
}

// Test Circular Reference:
const original = { a: 1, nested: { b: 2 } };
original.self = original; // Circular loop!

const copied = deepClone(original);
console.log(copied.nested.b); // 2
console.log(copied.self === copied); // true (circularity correctly preserved!)
```

| Method | Handles Functions? | Handles Circular Refs? | Handles `Date` / `RegExp`? | Performance |
| :--- | :--- | :--- | :--- | :--- |
| `JSON.parse(JSON.stringify())` | ❌ Stripped | ❌ Throws `TypeError` | ❌ Converted to string / `{}` | Slow |
| `structuredClone()` (Native) | ❌ Throws `DataCloneError` | ✅ Yes | ✅ Yes | Fast |
| Custom `deepClone` | ✅ Retained | ✅ Yes (via `WeakMap`) | ✅ Configurable | Direct |

**⚠️ Interview Pitfall / Pro-Tip**
- **The `JSON.parse` Traps:** In an interview, always mention why `JSON.parse(JSON.stringify(obj))` is flawed: it drops functions and `undefined`, turns `NaN`/`Infinity` to `null`, converts `Date` to strings, and throws on circular references.
- **Special Types (Date / RegExp):** If the interviewer asks about `Date` or `RegExp`, explain that you can handle them in one line: `if (value instanceof Date) return new Date(value);` and `if (value instanceof RegExp) return new RegExp(value.source, value.flags);`.

---

[⬅️ Previous: 07 · Output & Debugging](07-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · DSA in JavaScript ➡️](09-dsa-in-javascript.md)
