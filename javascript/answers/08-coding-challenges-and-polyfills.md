[⬅️ Previous: 07 · Output & Debugging](07-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · DSA in JavaScript ➡️](09-dsa-in-javascript.md)

---

## 8. Coding Challenges (High-Yield Polyfills & Utilities)

### 59. 🔴 P0 [Q] Implement Array.prototype.reduce() from scratch (handling empty arrays and missing initialValue).

> **TL;DR:** Polyfilling `Array.prototype.reduce` requires executing a reducer callback across each element while accumulating the return value. If no `initialValue` is provided, the first non-empty element becomes the accumulator and iteration begins at the subsequent index. An empty array without an `initialValue` throws a `TypeError`.

**💡 Core Concept & Explanation**
- **Specification Requirements:**
  1. `callback` must be a callable function (`typeof callback === 'function'`).
  2. If `initialValue` is supplied, `accum = initialValue` and iteration begins at index `0`.
  3. If `initialValue` is omitted (`arguments.length < 2`), search for the first assigned index (`i in this`). If none exists, throw `TypeError('Reduce of empty array with no initial value')`.
  4. Sparse array holes must be skipped (`i in this`).

**🛠️ Code / Visual Diagram / Table**

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let accum = initialValue;
  let startIndex = 0;

  // Handle missing initial value (arguments.length < 2)
  if (arguments.length < 2) {
    while (startIndex < this.length && !(startIndex in this)) {
      startIndex++; // Skip leading holes in sparse arrays
    }
    if (startIndex >= this.length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accum = this[startIndex++];
  }

  // Iterate over remaining elements
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accum = callback(accum, this[i], i, this);
    }
  }

  return accum;
};

// Test cases:
console.log([1, 2, 3, 4].myReduce((acc, x) => acc + x, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, x) => acc * x));    // 24 (no initialValue)
// [].myReduce((acc, x) => acc + x); // Throws TypeError: Reduce of empty array...
```

**⚠️ Interview Pitfall / Pro-Tip**
- **The Empty Array + Missing Initial Value Trap:** Calling `[].reduce((a, b) => a + b)` throws a runtime `TypeError`. Not checking `arguments.length < 2` and attempting `accum = this[0]` results in `undefined` accumulator bugs instead of throwing the spec-mandated error!

---

### 60. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.

> **TL;DR:** `debounce` delays function execution until a specified quiet delay period has passed since the last invocation. It uses closure-scoped timers to reset the countdown on every call, suppressing rapid event bursts (e.g. search input, resize).

**💡 Core Concept & Explanation**
When handling high-frequency events (keypresses, window resizing, scroll), executing heavy logic on every event degrades performance. `debounce` wraps the original function in a closure containing a `timerId`.
- On every invocation, any existing timer is cleared via `clearTimeout(timerId)`.
- A new timer is scheduled via `setTimeout`.
- Execution only triggers after calls cease for the full `delay` duration.
- Advanced implementations support an `immediate` (leading edge) flag and a `cancel()` method.

**🛠️ Code / Visual Diagram / Table**

```javascript
function debounce(fn, delay, immediate = false) {
  let timerId = null;

  function debounced(...args) {
    const context = this;
    const callNow = immediate && !timerId;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  }

  debounced.cancel = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}

// Usage Example:
const handleSearch = debounce((query) => {
  console.log('Searching API for:', query);
}, 300);

// Keypresses at 0ms, 100ms, 200ms -> Only 1 API call fires at 500ms!
```

```
User Typing:   --[A]--[B]--[C]----------------------------->
Timer Reset:     x     x    |---------- 300ms ----------|
Function Call:                                          [FIRE C]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Preserving `this` and Arguments:** Forgetting `const context = this; fn.apply(context, args)` causes event handler callbacks to lose their DOM element `this` binding and event arguments.


---

### 61. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.

> **TL;DR:** `throttle` guarantees a function is executed at most once within a specified time window, regardless of trigger frequency. While `debounce` waits for quiet periods, `throttle` delivers steady, periodic execution during continuous events (e.g. scroll handlers, window resize).

**💡 Core Concept & Explanation**
1. **Debounce vs Throttle:**
   - **Debounce:** "Wait until user stops typing for 300ms, then run."
   - **Throttle:** "Run at most once every 300ms while user is continuously scrolling."
2. **Implementation Strategies:**
   - **Timestamp Approach (Leading Edge):** Compares `Date.now() - lastExecTime >= limit`. Fires immediately on first trigger.
   - **Timer Approach (Trailing Edge):** Uses `setTimeout` block to defer execution.
   - **Hybrid Production Throttle:** Supports both `leading: true` and `trailing: true` options.

**🛠️ Code / Visual Diagram / Table**

```javascript
function throttle(fn, limit, options = { leading: true, trailing: true }) {
  let timerId = null;
  let lastExecTime = 0;
  let lastArgs = null;
  let lastContext = null;

  function throttled(...args) {
    const now = Date.now();

    if (!lastExecTime && options.leading === false) {
      lastExecTime = now;
    }

    const remaining = limit - (now - lastExecTime);

    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > limit) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastExecTime = now;
      fn.apply(lastContext, lastArgs);
      lastArgs = lastContext = null;
    } else if (!timerId && options.trailing !== false) {
      timerId = setTimeout(() => {
        lastExecTime = options.leading === false ? 0 : Date.now();
        timerId = null;
        fn.apply(lastContext, lastArgs);
        lastArgs = lastContext = null;
      }, remaining);
    }
  }

  throttled.cancel = function() {
    if (timerId) clearTimeout(timerId);
    lastExecTime = 0;
    timerId = lastArgs = lastContext = null;
  };

  return throttled;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Trailing Edge Loss:** A basic timestamp-only throttle ignores the final event trigger if it occurs within the cooldown window. Always use a hybrid timer/timestamp approach when trailing execution is required.


---

### 62. 🔴 P0 [Q] Implement Promise.all() from scratch.

> **TL;DR:** `Promise.all(iterable)` returns a single Promise that resolves to an array of results when all input promises settle, or rejects immediately upon the first rejected promise (fast-fail behavior). Non-promise items are automatically wrapped with `Promise.resolve()`.

**💡 Core Concept & Explanation**
1. **Inputs & Edge Cases:** Must handle non-array iterables, empty arrays (`Promise.all([])` resolves immediately to `[]`), and non-Promise values in the array.
2. **Order Preservation:** Asynchronous promises resolve at different speeds. The output array MUST preserve the original input array element positions, NOT the order of resolution completion.
3. **Completion Tracking:** Maintains a counter `completedCount`. When `completedCount === total`, the main outer promise resolves.

**🛠️ Code / Visual Diagram / Table**

```javascript
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    // 1. Validate iterable
    if (iterable == null || typeof iterable[Symbol.iterator] !== 'function') {
      return reject(new TypeError('Argument is not iterable'));
    }

    const promises = Array.from(iterable);
    const results = new Array(promises.length);
    let completedCount = 0;

    // 2. Handle empty input array immediately
    if (promises.length === 0) {
      return resolve([]);
    }

    // 3. Iterate and track each item
    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value; // Preserve original index position!
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        },
        (error) => {
          reject(error); // Fast-reject on first error
        }
      );
    });
  });
}

// Test Run:
const p1 = Promise.resolve(42);
const p2 = new Promise(res => setTimeout(() => res('fast'), 50));
const p3 = new Promise(res => setTimeout(() => res('slow'), 200));

promiseAll([p1, p2, p3]).then(console.log); // [42, 'fast', 'slow']
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Array Push Trap:** Using `results.push(value)` inside `.then()` is a critical bug! Slow promises will resolve later and be pushed out of order. You MUST assign directly to `results[index] = value`.


---

### 63. 🔴 P0 [Q] Implement memoize() and explain how closures make it work.

> **TL;DR:** `memoize` caches the return values of expensive pure functions based on their input parameters using a closure-scoped `Map` or object. Repeated calls with identical arguments skip computation and return cached values instantly in $O(1)$ time.

**💡 Core Concept & Explanation**
- **Closure Cache:** `memoize` returns an inner function that maintains persistent access to a private `cache = new Map()` defined in the outer scope.
- **Key Serialization:** Serializes multi-argument calls into a unique lookup key.
- **Resolver Option:** A custom `resolver` function enables callers to generate custom cache keys for complex object arguments.

**🛠️ Code / Visual Diagram / Table**

```javascript
function memoize(fn, resolver) {
  const cache = new Map();

  function memoized(...args) {
    const key = resolver
      ? resolver.apply(this, args)
      : (args.length === 1 ? args[0] : JSON.stringify(args));

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  }

  memoized.cache = cache; // Expose cache for inspection/clearing
  return memoized;
}

// Usage: Expensive Fibonacci
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // Computes in ~1ms instead of 30 seconds!
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Object Key Collisions:** Relying on default `args.join(',')` converts object arguments to `"[object Object]"`. Two different objects `{ a: 1 }` and `{ b: 2 }` collide under the exact same string key! Always use a custom `resolver` or `WeakMap` for object parameter memoization.


---

### 64. 🟠 P1 [Q] Implement an EventEmitter with on(), off(), once(), and emit().

> **TL;DR:** An `EventEmitter` implements the Publish-Subscribe pattern, maintaining an event dictionary (`Map<string, Function[]>`) to register event handlers (`on`), emit event payloads (`emit`), deregister handlers (`off`), and execute one-time handlers (`once`).

**💡 Core Concept & Explanation**
- **PubSub Architecture:** Decouples event producers from consumers.
- **Handling `once()`:** Wraps the original callback in a wrapper function that automatically calls `off(event, wrapper)` before executing the underlying callback.
- **Iteration Protection:** During `emit()`, iterate over a shallow clone `[...listeners]` to prevent index skipping if a listener unsubscribes itself during execution.

**🛠️ Code / Visual Diagram / Table**

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function');
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this; // Chainable API
  }

  off(event, listener) {
    if (!this.events.has(event)) return this;
    const listeners = this.events.get(event).filter(
      l => l !== listener && l._original !== listener
    );
    this.events.set(event, listeners);
    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    wrapper._original = listener; // Preserve reference for off() removal
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    const listeners = [...this.events.get(event)]; // Copy array to prevent mutation issues
    listeners.forEach(listener => listener.apply(this, args));
    return true;
  }
}

// Test Run:
const emitter = new EventEmitter();
const logMsg = (msg) => console.log('Event:', msg);

emitter.on('data', logMsg);
emitter.once('data', (msg) => console.log('ONCE:', msg));

emitter.emit('data', 'First');  // Logs Event: First, ONCE: First
emitter.emit('data', 'Second'); // Logs Event: Second (ONCE callback removed!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Memory Leaks:** Failing to remove event listeners (`off`) in long-lived single-page applications causes retained closures and severe memory leaks. Node.js logs a warning if more than 10 listeners are attached to a single event.


---

### 65. 🟠 P1 [Q] Implement a deep-clone utility (and explain structuredClone vs JSON.parse/stringify limitations).

> **TL;DR:** Deep cloning recursively duplicates nested objects and arrays while handling circular references using a `WeakMap`. Special built-in types (`Date`, `RegExp`, `Map`, `Set`) require explicit constructor instantiations, while primitives are returned directly.

**💡 Core Concept & Explanation**
- **Shallow Copy vs Deep Copy:** `Object.assign()` and spread `{...obj}` duplicate only top-level memory pointers. Nested objects remain mutated across copies.
- **Built-in Limitations:**
  - `JSON.parse(JSON.stringify(obj))`: Strips functions, `undefined`, `Symbol`; converts `NaN`/`Infinity` to `null`; converts `Date` to string; throws `TypeError` on circular references.
  - `structuredClone()`: Native modern Web API; cannot clone functions, DOM nodes, or prototypes.
- **Custom Deep Clone:** Uses a `WeakMap` as a memory registry to detect circular references and break infinite recursive call stacks.

**🛠️ Code / Visual Diagram / Table**

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 1. Handle Primitives & null/undefined
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. Handle Circular References
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 3. Handle Special Built-in Objects
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (obj instanceof Map) {
    const mapCopy = new Map();
    hash.set(obj, mapCopy);
    obj.forEach((val, key) => mapCopy.set(deepClone(key, hash), deepClone(val, hash)));
    return mapCopy;
  }
  if (obj instanceof Set) {
    const setCopy = new Set();
    hash.set(obj, setCopy);
    obj.forEach(val => setCopy.add(deepClone(val, hash)));
    return setCopy;
  }

  // 4. Handle Arrays & Plain Objects
  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clone);

  // Copy all own enumerable symbols and string keys
  Reflect.ownKeys(obj).forEach(key => {
    clone[key] = deepClone(obj[key], hash);
  });

  return clone;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Prototype Chain & Property Descriptors:** Using simple `{}` discards custom object prototypes and non-enumerable getter/setter properties. `Object.create(Object.getPrototypeOf(obj))` preserves custom class inheritance.


---

[⬅️ Previous: 07 · Output & Debugging](07-output-and-debugging-questions.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · DSA in JavaScript ➡️](09-dsa-in-javascript.md)
