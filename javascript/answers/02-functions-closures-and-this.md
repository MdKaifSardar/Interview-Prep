[⬅️ Previous: 01 · Fundamentals & Scope](01-js-fundamentals-engine-and-scope.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Objects, Prototypes & Classes ➡️](03-objects-prototypes-and-classes.md)

---

## 2. Functions, Closures & this Binding

### 16. 🟠 P1 [C] What are first-class functions, higher-order functions, and callback functions?

> **TL;DR:** First-class functions mean functions are treated like regular values (stored in variables, passed as args, returned from functions). Higher-order functions accept or return other functions. Callback functions are passed as arguments to be executed later.

**💡 Core Concept & Explanation**
- **First-Class Citizens:** In JS, functions are first-class values (objects). They can be assigned to variables, stored in array/object data structures, passed as parameters to other functions, and returned from functions.
- **Higher-Order Function (HOF):** Any function that takes one or more functions as arguments OR returns a function as its result (e.g. `Array.prototype.map`, `filter`, `reduce`, `addEventListener`).
- **Callback Function:** A function passed into another function as an argument, intended to be executed ("called back") synchronously or asynchronously at a later time.

**🛠️ Code / Visual Diagram / Table**

```javascript
const calculate = (operationFn, a, b) => operationFn(a, b); // HOF
const add = (x, y) => x + y; // Callback

console.log(calculate(add, 5, 3)); // 8
```

**⚠️ Interview Pitfall / Pro-Tip**
- Invoking the callback function directly when passing it into a HOF (`setTimeout(myFn(), 1000)` instead of `setTimeout(myFn, 1000)`), executing `myFn` immediately instead of waiting for the timer.


---

### 17. 🔴 P0 [Q] What is the difference between function declarations, function expressions, and arrow functions, including whether arrow functions have their own this and arguments and whether they can be constructors?

> **TL;DR:** Function declarations are hoisted fully; expressions are bound to variables. Arrow functions have concise syntax, lexical this (inherited from outer scope), no arguments object, no prototype property, and cannot be used as constructors with new.

**💡 Core Concept & Explanation**
**Arrow Functions vs Regular Functions:**
1. **`this` Binding:** Regular functions bind `this` dynamically at call time based on invocation context. Arrow functions do NOT have their own `this`; they capture `this` lexically from their enclosing scope.
2. **Constructors:** Regular functions can be invoked with `new` to instantiate objects. Arrow functions throw `TypeError: ... is not a constructor` because they lack a `.prototype` property.
3. **`arguments` Object:** Regular functions have an `arguments` object. Arrow functions do not (use rest parameters `...args` instead).
4. **Duplicate Parameters:** Regular functions allow duplicate named parameters in non-strict mode; arrow functions disallow them.

**🛠️ Code / Visual Diagram / Table**

```javascript
const obj = {
  name: "TechCorp",
  regularFn: function() { console.log("Regular:", this.name); },
  arrowFn: () => { console.log("Arrow:", this.name); }
};

obj.regularFn(); // "Regular: TechCorp" (Implicit binding)
obj.arrowFn();   // "Arrow: undefined" (Lexical Window/Global this!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using arrow functions as object methods or class prototype methods when you intend to reference object instance properties via `this`.


---

### 18. 🟠 P1 [Q] What are rest parameters, spread syntax, default parameters, and the arguments object?

> **TL;DR:** Rest parameters (...args) collect remaining function arguments into an array. Spread syntax (...arr) expands iterables into elements. Default parameters specify fallbacks for undefined. arguments is an array-like object in regular functions.

**💡 Core Concept & Explanation**
- **Rest Parameters (`...rest`):** Must be the last parameter in function signature. Packs remaining arguments into a real JS Array.
- **Spread Syntax (`...iterable`):** Unpacks elements of an array/object into discrete items inside calls, array literals, or object literals.
- **Default Parameters:** Fallback values assigned to parameters when arguments passed are `undefined`.
- **`arguments` Object:** Array-like object available inside regular functions containing all passed parameters. Lacks array methods (`map`, `filter`) and is obsolete compared to Rest parameters.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Rest Parameter & Default Parameter
function sum(multiplier = 1, ...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0) * multiplier;
}
console.log(sum(2, 10, 20, 30)); // 120

// Spread Operator
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `arguments` in arrow functions (throws `ReferenceError` unless inherited from outer regular function) or placing rest parameters anywhere except at the end of function parameters.


---

### 19. 🔴 P0 [Q] What is a closure, how does it work, and what are its practical uses (including IIFEs)?

> **TL;DR:** A closure is a function bundled together with references to its surrounding lexical environment, allowing inner functions to access outer variables even after the outer function has finished executing.

**💡 Core Concept & Explanation**
**How Closures Work:**
When a function is declared in JS, it retains a reference to its parent Lexical Environment via an internal `[[Environment]]` property. Even after the outer function execution context is popped off the Call Stack, any variables referenced by the inner function remain preserved on the Memory Heap instead of being garbage-collected.

**Practical Uses:**
1. Data Privacy / Encapsulation (creating private variables in factory functions).
2. Currying and Partial Application.
3. Event Listeners & Async Callbacks holding state.
4. IIFEs (Immediately Invoked Function Expressions) for isolated module scopes.

**🛠️ Code / Visual Diagram / Table**

```javascript
function createCounter() {
  let count = 0; // Private variable encapsulated by closure!
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (Private!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Creating closures in loops with `var` (`for (var i = 0; i < 3; i++)`) causing all iterations to share the same mutated global `i` variable. Use `let` or IIFE to fix!


---

### 20. 🟠 P1 [C] What is a pure function, and what is a side effect?

> **TL;DR:** A pure function given the same inputs will always return the exact same output without causing side effects (modifying global state, mutating args, or performing external I/O).

**💡 Core Concept & Explanation**
**Requirements of Pure Functions:**
1. **Deterministic:** Output depends *solely* on input parameters. If input is `(2, 3)`, output is ALWAYS `5`.
2. **Zero Side Effects:** Does NOT alter external state (global variables, outer objects), perform console logging, write to DOM, mutate parameters, or trigger network/disk I/O.

**Why Pure Functions Matter:**
- Highly predictable, trivial to unit test, cacheable via memoization, and safe for parallel execution.

**🛠️ Code / Visual Diagram / Table**

```javascript
// IMPURE Function (Mutates outer state & non-deterministic)
let total = 0;
function addToTotal(num) {
  total += num; // Side Effect: Mutating global variable!
  return total;
}

// PURE Function (No side effects, deterministic)
function addPure(a, b) {
  return a + b;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Mutating array or object arguments directly inside a function (`arr.push(item)`) instead of returning a new array copy (`[...arr, item]`).


---

### 21. 🟠 P1 [C] What are currying and function composition?

> **TL;DR:** Currying transforms a multi-argument function into a sequence of unary functions. Function composition combines multiple functions where the output of one function becomes the input of the next.

**💡 Core Concept & Explanation**
- **Currying:** `f(a, b, c)` $\rightarrow$ `f(a)(b)(c)`. Allows partial application of arguments, enabling creation of reusable specialized utility functions.
- **Function Composition:** Mathematical `(f ∘ g)(x) = f(g(x))`. Pipe or Compose functions pass data through a pipeline of single-responsibility pure transformations.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Currying
const curryAdd = a => b => c => a + b + c;
console.log(curryAdd(1)(2)(3)); // 6

// Composition: compose(f, g)(x) => f(g(x))
const add10 = x => x + 10;
const double = x => x * 2;

const compose = (f, g) => x => f(g(x));
const addThenDouble = compose(double, add10);
console.log(addThenDouble(5)); // (5 + 10) * 2 = 30
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing composition order: `compose(f, g)` executes Right-to-Left (`g` then `f`), whereas `pipe(f, g)` executes Left-to-Right (`f` then `g`).

---

## this & Binding

---

### 22. 🔴 P0 [C] How is the value of this determined: default binding (and the effect of strict mode), implicit binding, explicit binding, new, and arrow functions?

> **TL;DR:** this is determined by how a function is called: default binding (global/undefined in strict mode), implicit binding (object calling method), explicit binding (call/apply/bind), new binding (new object created), or lexical binding (arrow functions).

**💡 Core Concept & Explanation**
**5 Rules of `this` Determination (In order of precedence):**
1. **`new` Binding:** When function called with `new`, `this` is the newly constructed object instance.
2. **Explicit Binding:** When invoked via `.call()`, `.apply()`, or `.bind()`, `this` is explicitly specified target object.
3. **Implicit Binding:** When method called via object property (`obj.fn()`), `this` is `obj`.
4. **Default Binding:** Standalone function invocation (`fn()`). `this` defaults to `window`/`global` (or `undefined` in `'use strict'`).
5. **Lexical Binding:** Arrow functions ignore all above 4 rules and inherit `this` from enclosing scope at declaration time.

**🛠️ Code / Visual Diagram / Table**

```javascript
function showThis() {
  'use strict';
  console.log(this);
}
showThis(); // undefined (Strict mode default binding)

const user = {
  name: "Sam",
  greet() { console.log(this.name); }
};
user.greet(); // "Sam" (Implicit binding)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Expecting `this` inside a function to refer to the function itself or its lexical scope.


---

### 23. 🔴 P0 [Q] What happens to this when a method is passed as a callback, and how do you fix it?

> **TL;DR:** When a method is passed as a callback, it loses its original implicit object binding (defaulting to window/undefined). Fix it by explicitly binding with .bind(), wrapping in an arrow function, or passing an inline callback.

**💡 Core Concept & Explanation**
**The Lost `this` Problem:**
Passing an object method as a callback passes the underlying function reference directly (`const fn = obj.method`). When the receiver executes `fn()`, it invokes it as a standalone function call (Default Binding), causing `this` to point to `window` or `undefined` instead of `obj`.

**🛠️ Code / Visual Diagram / Table**

```javascript
const user = {
  name: "Alice",
  greet() { console.log("Hello,", this.name); }
};

// PROBLEM: Method passed as callback loses binding
setTimeout(user.greet, 100); // "Hello, undefined"

// FIX 1: .bind()
setTimeout(user.greet.bind(user), 100); // "Hello, Alice"

// FIX 2: Wrapper Arrow Function
setTimeout(() => user.greet(), 100); // "Hello, Alice"
```

**⚠️ Interview Pitfall / Pro-Tip**
- Passing unbound object methods directly to `setTimeout`, `addEventListener`, or React event handlers.


---

### 24. 🔴 P0 [Q] What is the difference between call(), apply(), and bind()?

> **TL;DR:** call() invokes the function immediately with this and individual arguments. apply() invokes immediately with this and an array of arguments. bind() returns a new permanently bound function without invoking it immediately.

**💡 Core Concept & Explanation**
- **`.call(thisArg, arg1, arg2, ...)`:** Invokes function immediately. Arguments passed comma-separated.
- **`.apply(thisArg, [arg1, arg2, ...])`:** Invokes function immediately. Arguments passed as an Array/Array-like object.
- **`.bind(thisArg, arg1, arg2, ...)`:** Does NOT execute immediately. Returns a copy of the function with `this` and pre-filled parameters bound permanently.

**🛠️ Code / Visual Diagram / Table**

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting} ${this.name}${punctuation}`);
}
const person = { name: "Bob" };

// call: Individual comma arguments
introduce.call(person, "Hello", "!"); // "Hello Bob!"

// apply: Array arguments
introduce.apply(person, ["Welcome", "."]); // "Welcome Bob."

// bind: Returns new function
const boundFn = introduce.bind(person, "Hi");
boundFn("?"); // "Hi Bob?"
```

**⚠️ Interview Pitfall / Pro-Tip**
- Attempting to re-bind a function already bound via `.bind()`. Calling `.bind()` on an already bound function has no effect on `this`!

---

## Objects & Prototypes

---

[⬅️ Previous: 01 · Fundamentals & Scope](01-js-fundamentals-engine-and-scope.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Objects, Prototypes & Classes ➡️](03-objects-prototypes-and-classes.md)
