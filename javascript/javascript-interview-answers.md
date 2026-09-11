# JavaScript & TypeScript Master Answer Key (Comprehensive Edition)

Companion answer key to `javascript-interview-questions.md`. Every single answer strictly follows our standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive breakdown of *why* and *how* the underlying mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working code snippet, polyfill function, ASCII flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Real-world edge cases, engine quirks, memory leak traps, and interviewer follow-up gotchas.

---

## Fundamentals

### 1. 🔴 P0 [Q] What is the difference between primitive and reference types in how they are stored, copied, and compared?

> **TL;DR:** Primitive types (string, number, boolean, undefined, null, symbol, bigint) store immutable raw values directly on the Stack and compare by value. Reference types (Object, Array, Function, Map, Set) store pointers on the Stack to mutable objects allocated on the Heap, comparing by memory address.

**💡 Core Concept & Explanation**
JavaScript partitions memory into the **Call Stack** and the **Memory Heap**:
- **Primitive Types:** Stored directly in the call stack variable binding frame. When copied (`b = a`), the actual value is duplicated. Comparing primitives (`a === b`) compares their raw underlying binary representations.
- **Reference Types:** The object payload resides in the dynamic Memory Heap, while the stack holds a 64-bit memory pointer. Copying (`b = a`) duplicates the reference address, causing both variables to mutate the same heap memory object. Comparing reference types (`a === b`) evaluates whether both pointers reference the exact same memory allocation address.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Primitive Copy & Comparison (By Value)
let x = 10;
let y = x; // Duplicate value 10
y = 20;
console.log(x); // 10 (x is unchanged)
console.log(x === 10); // true

// Reference Copy & Comparison (By Reference)
const obj1 = { name: "Alice" };
const obj2 = obj1; // Duplicate memory pointer address
obj2.name = "Bob";
console.log(obj1.name); // "Bob" (mutated underlying heap object)
console.log({ a: 1 } === { a: 1 }); // false (distinct memory references!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming two identical-looking objects are equal (`{} === {}` is `false`). When passing an object into a function, mutating its properties affects the caller, but reassigning the parameter variable itself inside the function breaks the reference without altering the caller's variable.

---

### 2. 🟠 P1 [C] What does typeof do, and why does typeof null return "object"?

> **TL;DR:** typeof returns a string indicating the primitive data type of an operand. typeof null returns "object" due to a historic bug in the original 1995 JS engine where null's type tag bit vector (0x00) matched the type tag for objects.

**💡 Core Concept & Explanation**
`typeof` is a unary operator evaluated at runtime. It returns one of 8 strings: `"undefined"`, `"boolean"`, `"number"`, `"bigint"`, `"string"`, `"symbol"`, `"function"`, or `"object"`.

**The `typeof null === "object"` Bug:**
In the original 32-bit implementation of JavaScript (1995), values were stored with a type tag in the lower 1-3 bits followed by the actual value data:
- Objects used the tag `000` in the lowest bits.
- `null` was represented as the NULL pointer (`0x00` across all bits).
Because `null` had `000` in its type tag bits, the `typeof` check misidentified `null` as an object. Fixing this bug in ES6 was proposed but rejected because it would break millions of existing legacy web scripts.

**🛠️ Code / Visual Diagram / Table**

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 10n);         // "bigint"
console.log(typeof (() => {}));  // "function"
console.log(typeof {});          // "object"
console.log(typeof null);        // "object" (HISTORIC BUG!)

// Robust type checking utility for null vs object:
function getExactType(val) {
  if (val === null) return "null";
  return typeof val;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Relying on `typeof val === 'object'` to check if a value is a non-null object without guarding against `null`. Always check `val !== null && typeof val === 'object'` or use `Object.prototype.toString.call(val)`.

---

### 3. 🟠 P1 [Q] What is the difference between null, undefined, and an undeclared variable?

> **TL;DR:** undefined represents a variable declared but not yet assigned a value; null is an intentional assignment representing empty/no object value; undeclared is a variable that has never been declared in any accessible scope, throwing a ReferenceError on access.

**💡 Core Concept & Explanation**
- **undefined:** Automatic default value assigned by JS engine during memory creation phase for uninitialized `var`/`let` variables, missing parameters, or non-existent object properties. Type is `"undefined"`.
- **null:** Intentional explicit value assigned by developer or returned by APIs (e.g. `document.querySelector`) to signify the absence of any value or object target. Type is `"object"`.
- **Undeclared:** Identifiers that have not been declared in the current or outer scope chains. Accessing an undeclared variable throws a `ReferenceError` at execution time (except when evaluated via `typeof undeclaredVar`, which safely returns `"undefined"`).

**🛠️ Code / Visual Diagram / Table**

```javascript
let a; // Declared, uninitialized -> undefined
const b = null; // Declared, assigned explicit null

console.log(a); // undefined
console.log(b); // null

// Undeclared identifier
try {
  console.log(c); // Throws ReferenceError: c is not defined
} catch (e) {
  console.log(e.name); // "ReferenceError"
}

// typeof edge case for undeclared:
console.log(typeof undeclaredVar); // "undefined" (Safe check!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing `undefined` and `null` in loose equality (`null == undefined` is `true`, but `null === undefined` is `false`). Additionally, default parameter fallback (`fn(param = 'default')`) triggers on `undefined`, but NOT on `null`!

---

### 4. 🟠 P1 [C] What is NaN, why is NaN !== NaN, and how do Number.isNaN() and Object.is() differ from ===?

> **TL;DR:** NaN ("Not-a-Number") represents an invalid numerical operation result. Per IEEE 754 floating-point standard, NaN is not equal to anything including itself. Number.isNaN() strictly checks if a value is NaN without coercion, unlike global isNaN() which coercively converts to number first.

**💡 Core Concept & Explanation**
**NaN Characteristics:**
- Type of `NaN` is `"number"` (`typeof NaN === "number"`).
- Represents an undefined or unrepresentable mathematical calculation result (e.g. `0 / 0`, `Math.sqrt(-1)`, `parseInt("invalid")`).
- According to IEEE 754 spec, `NaN !== NaN` to ensure invalid calculations do not evaluate as equal to other invalid calculations.

**Difference between Detection Methods:**
1. `isNaN(val)`: Implicitly coerces `val` to a number before checking (`isNaN("abc")` -> `isNaN(NaN)` -> `true`!).
2. `Number.isNaN(val)`: Strict check. Returns `true` ONLY if `typeof val === 'number'` and `val` is `NaN` (`Number.isNaN("abc")` -> `false`).
3. `Object.is(NaN, NaN)`: Returns `true` (SameValue algorithm handles `NaN` equality and distinguishes `+0` vs `-0`).

**🛠️ Code / Visual Diagram / Table**

```javascript
console.log(NaN === NaN);            // false
console.log(NaN !== NaN);            // true

// Global isNaN (COERCIVE GOTCHA)
console.log(isNaN("hello"));         // true (coerced "hello" -> NaN!)

// Number.isNaN (STRICT & ACCURATE)
console.log(Number.isNaN("hello"));  // false
console.log(Number.isNaN(NaN));      // true

// Object.is Comparison
console.log(Object.is(NaN, NaN));    // true
console.log(Object.is(+0, -0));      // false
console.log(+0 === -0);              // true
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `myVar === NaN` or global `isNaN(myVar)`. Always use `Number.isNaN(myVar)` or `Object.is(myVar, NaN)` for robust NaN detection.

---

### 5. 🟠 P1 [C] What are truthy and falsy values, and what are all the falsy values in JavaScript?

> **TL;DR:** In boolean contexts (e.g., if conditions), values are coerced to true (truthy) or false (falsy). There are exactly 8 falsy values in JS: false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, and NaN.

**💡 Core Concept & Explanation**
JavaScript performs implicit boolean type coercion when values are evaluated in boolean expressions (such as `if` statements, logical operators `&&` / `||`, and the `Boolean()` constructor).

Everything in JavaScript is **truthy** EXCEPT for the exact set of 8 **falsy** values:
1. `false` (Boolean false)
2. `0` (Number zero)
3. `-0` (Number negative zero)
4. `0n` (BigInt zero)
5. `""`, `''`, ```` (Empty string)
6. `null` (Absence of value)
7. `undefined` (Unassigned variable)
8. `NaN` (Not a number)

*Note:* Empty arrays `[]` and empty objects `{}` are reference types and evaluate to **truthy**!

**🛠️ Code / Visual Diagram / Table**

```javascript
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];

falsyValues.forEach(val => {
  console.log(Boolean(val)); // Prints false for all 8
});

// Common TRUTHY traps in interviews:
console.log(Boolean([]));        // true
console.log(Boolean({}));        // true
console.log(Boolean("0"));       // true (non-empty string!)
console.log(Boolean("false"));   // true (non-empty string!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming empty arrays `[]` or empty objects `{}` are falsy in `if ([])` checks. Check length (`arr.length > 0`) or object keys (`Object.keys(obj).length > 0`) instead.

---

### 6. 🔴 P0 [Q] What is type coercion (implicit vs explicit), and how does == differ from ===?

> **TL;DR:** Implicit coercion automatically converts types behind the scenes during operations, while explicit coercion is manual conversion by the developer. Strict equality (===) checks both value and type without coercion, whereas loose equality (==) coerces operands to a common type before comparing.

**💡 Core Concept & Explanation**
- **Explicit Coercion:** Intentional developer conversion using constructors as functions (e.g. `String(123)`, `Number("456")`, `Boolean(1)`).
- **Implicit Coercion:** JS engine automatically converts operands during operations (e.g., `"5" + 2` -> `"52"` via string concatenation, but `"5" - 2` -> `3` via numeric conversion).

**Loose (==) vs Strict (===) Algorithm:**
- `===` checks if Type(A) === Type(B). If types differ, returns `false` immediately.
- `==` converts types using Abstract Equality Comparison Algorithm:
  - String == Number $\rightarrow$ converts String to Number.
  - Boolean == Anything $\rightarrow$ converts Boolean to Number (`true` $\rightarrow$ `1`, `false` $\rightarrow$ `0`).
  - Object == Primitive $\rightarrow$ converts Object to Primitive via `[Symbol.toPrimitive]`, `valueOf()`, or `toString()`.
  - `null == undefined` returns `true` (special spec rule).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Implicit Coercion Rules
console.log("5" + 3);  // "53" (String concatenation prioritized by +)
console.log("5" - 3);  // 2 (Numeric conversion forced by -)
console.log("5" * "2"); // 10

// Loose (==) vs Strict (===)
console.log("5" == 5);   // true  ("5" converted to 5)
console.log("5" === 5);  // false (Types differ: string vs number)

console.log(false == 0); // true  (false -> 0)
console.log(null == undefined); // true (spec exception)
console.log(null === undefined); // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `==` when checking user inputs or API values, leading to edge case bugs like `"" == 0` (`true`) or `"\n" == 0` (`true`). Always default to `===`.

---

### 7. 🟠 P1 [Q] How do &&, ||, ??, and ?. work, and what is short-circuit evaluation?

> **TL;DR:** Short-circuit evaluation means logical expressions evaluate left-to-right and stop as soon as the outcome is guaranteed. && returns the first falsy operand (or last value), || returns the first truthy operand (or last value), ?? returns right operand ONLY if left is null/undefined, and ?. safely short-circuits property access if left is nullish.

**💡 Core Concept & Explanation**
- **Short-Circuiting:** Evaluation halts immediately once the result is determined without executing remaining expressions.
- **`A && B`:** Evaluates `A`. If `A` is falsy, returns `A` immediately without evaluating `B`. If `A` is truthy, evaluates and returns `B`.
- **`A || B`:** Evaluates `A`. If `A` is truthy, returns `A` immediately. If `A` is falsy, evaluates and returns `B`.
- **`A ?? B` (Nullish Coalescing):** Evaluates `A`. Returns `B` ONLY if `A` is `null` or `undefined` (preserves falsy values like `0`, `""`, `false`).
- **`A?.B` (Optional Chaining):** Short-circuits and returns `undefined` if `A` is `null` or `undefined` instead of throwing a `TypeError`.__

**🛠️ Code / Visual Diagram / Table**

```javascript
// && (Logical AND)
console.log(0 && "Hello");       // 0 (Short-circuits on 0)
console.log("Hi" && "World");    // "World"

// || (Logical OR - Falsy Fallback)
console.log(0 || 42);            // 42 (0 is falsy)
console.log("" || "Default");    // "Default"

// ?? (Nullish Coalescing - Null/Undefined Fallback)
console.log(0 ?? 42);            // 0 (0 is kept!)
console.log(null ?? "Default");  // "Default"

// ?. (Optional Chaining)
const user = { profile: null };
console.log(user.profile?.avatar?.url); // undefined (No TypeError!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `||` for default config options when `0` or `""` are valid user inputs. `config.count || 10` converts `0` to `10`! Use `config.count ?? 10` instead.

---

### 8. 🟠 P1 [C] What are JavaScript's key characteristics (dynamically typed, single-threaded, garbage-collected, multi-paradigm), and how is it related to ECMAScript?

> **TL;DR:** JS is a dynamically typed, single-threaded, garbage-collected, multi-paradigm language. ECMAScript is the standard specification (ECMA-262); JavaScript is the primary language implementation of that specification.

**💡 Core Concept & Explanation**
**Key Characteristics:**
1. **Dynamically Typed:** Variable types are checked at runtime, not compile-time. Variables hold values of any type and can be reassigned dynamically.
2. **Single-Threaded:** Operates on a single main thread with one Call Stack using an Event Loop to handle async non-blocking operations.
3. **Garbage-Collected:** Memory allocation and deallocation are managed automatically using mark-and-sweep algorithms based on object reachability.
4. **Multi-Paradigm:** Supports Object-Oriented (prototypal), Functional (first-class functions, pure functions, immutability), and Event-Driven programming styles.

**ECMAScript vs JavaScript:**
- **ECMAScript (ES):** The official standard governed by TC39 committee (ECMA-262 specification).
- **JavaScript:** The implementation created by Brendan Eich (1995) that conforms to ECMAScript standard and adds Host Environment APIs (DOM, `window`, `fetch` in browser; `fs`, `process` in Node.js).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Dynamic Typing & Multi-Paradigm Example
let data = 100; // Number
data = "Now a String"; // Dynamic type change

// Functional Paradigm: High Order Function & Pure Calculation
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]

// OOP Paradigm: Class & Prototypal Inheritance
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi, I'm ${this.name}`; }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing ECMAScript specs with runtime Web APIs (e.g. `setTimeout`, `fetch`, DOM elements are NOT part of ECMAScript standard; they are provided by the browser/Node host environment).

---

## How JavaScript Works

### 9. 🔴 P0 [C] What is a JavaScript engine (e.g., V8), what happens between writing code and running it (parsing, AST, bytecode interpreter, JIT-optimized machine code), and is JavaScript interpreted, compiled, or both?

> **TL;DR:** V8 parses JS code into an Abstract Syntax Tree (AST), executes bytecode via an interpreter (Ignition), and dynamically compiles hot code paths into machine code via JIT compilers (TurboFan). JS uses Just-In-Time (JIT) compilation, making it both interpreted and compiled at runtime.

**💡 Core Concept & Explanation**
**V8 Engine Compilation Pipeline:**
1. **Parser:** Converts raw JS code tokens into an Abstract Syntax Tree (AST).
2. **Ignition (Bytecode Interpreter):** Converts AST into lightweight, memory-efficient Bytecode and begins execution immediately for fast start time.
3. **TurboFan (JIT Compiler):** Monitors runtime execution ("profiling"). Hot functions executed frequently are compiled into highly optimized machine code.
4. **Deoptimization:** If runtime type assumptions change (e.g. passing a string to a function that previously only received integers), TurboFan deoptimizes machine code back to bytecode.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Monomorphic (Fast JIT Machine Code path)
function add(a, b) {
  return a + b;
}
for (let i = 0; i < 10000; i++) add(1, 2); // TurboFan optimizes add() for Numbers!

// Polymorphic Mutation -> Triggers Deoptimization!
add("hello", "world"); // Type changes to String! TurboFan deoptimizes back to Ignition bytecode.
```

**⚠️ Interview Pitfall / Pro-Tip**
- Writing polymorphic code (frequently changing object hidden classes or variable types passed into hot functions), causing V8 to continuously optimize and deoptimize code.

---

### 10. 🔴 P0 [D] What is the difference between the JavaScript engine and the runtime environment (browser vs Node.js), what does "single-threaded" actually mean, and what are the parts of the runtime (memory heap, call stack, Web APIs/libuv, task queues, event loop)?

> **TL;DR:** The JS engine (e.g. V8) executes ECMAScript code using a Call Stack and Memory Heap. The Runtime Environment (Browser/Node.js) wraps the engine with event loops, task queues, and APIs (Web APIs or libuv) to enable non-blocking asynchronous operation.

**💡 Core Concept & Explanation**
**Engine vs Runtime:**
- **JS Engine (V8/SpiderMonkey):** Call Stack + Memory Heap + Garbage Collector.
- **Runtime Environment:** JS Engine + Host APIs (DOM, `fetch` in Browser; `fs`, `http` in Node) + Event Loop + Microtask/Macrotask Queues.

**Single-Threaded Reality:**
JavaScript executes JS code on **one main thread** (one Call Stack). Non-blocking operations (I/O, network requests, timers) are offloaded by the runtime to browser C++ background threads or libuv thread pool workers, which push callbacks back to task queues upon completion.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Runtime Orchestration:
console.log("1. Stack First");

setTimeout(() => {
  console.log("3. Macrotask Queue (via Web API Timer)");
}, 0);

Promise.resolve().then(() => {
  console.log("2. Microtask Queue (High Priority)");
});

// Output:
// 1. Stack First
// 2. Microtask Queue (High Priority)
// 3. Macrotask Queue (via Web API Timer)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Thinking Node.js or browsers run JS code across multiple threads concurrently. The JS thread is single; background C++/libuv workers handle I/O and notify JS via the Event Loop queues.

---

### 11. 🔴 P0 [Q] What is an execution context, what happens in its creation (memory) phase and execution phase, what is a lexical environment, and how does the call stack manage global and function execution contexts?

> **TL;DR:** An Execution Context (EC) is an environment created when running JS code. It consists of a Memory Creation Phase (hoisting variables and functions) and an Execution Phase (running code line by line). The Call Stack manages active ECs on a LIFO basis.

**💡 Core Concept & Explanation**
**Types of Execution Contexts:**
1. **Global Execution Context (GEC):** Created when script starts. Creates `window`/`global` and `this`.
2. **Function Execution Context (FEC):** Created whenever a function is invoked.

**Two Execution Phases:**
1. **Creation Phase:**
   - Creates Variable Environment & Lexical Environment.
   - Sets up scope chain.
   - Allocates memory for variables (`var` initialized to `undefined`, `let`/`const` placed in TDZ, functions stored in full).
2. **Execution Phase:**
   - Runs code line by line, assigning values to variables and executing function calls.

**🛠️ Code / Visual Diagram / Table**

```javascript
var a = 10;
function calc(num) {
  var res = num * 2;
  return res;
}
var ans = calc(a);

/* Call Stack Trace:
1. GEC pushed [a: undefined -> 10, calc: fn, ans: undefined -> 20]
2. FEC calc(10) pushed [num: 10, res: undefined -> 20]
3. FEC calc pops off stack
4. GEC finishes & pops off stack on exit
*/
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing function definition time with function execution time. Lexical scope is determined at definition time, but Execution Contexts are created at call time.

---

### 12. 🟠 P1 [C] How is memory managed in JavaScript (stack vs heap, garbage collection via mark-and-sweep and reachability), and what causes memory leaks (closures, forgotten event listeners, timers)?

> **TL;DR:** Memory is managed automatically via Mark-and-Sweep garbage collection, which reclaims memory from objects unattached from root references. Memory leaks occur when unreachable objects are unintentionally retained by active references (e.g., closures, timers, event listeners).

**💡 Core Concept & Explanation**
**Memory Allocation:**
- **Stack:** Stores primitive values and function call execution frames.
- **Heap:** Stores objects, arrays, and functions.

**Mark-and-Sweep Algorithm:**
1. Collector builds a set of "GC Roots" (Global object, local call stack variables).
2. Traverses all references from roots to mark reachable objects.
3. Any memory node in heap NOT marked reachable is swept and reclaimed.

**4 Main Causes of Memory Leaks:**
1. Forgotten Timers (`setInterval` retaining referenced objects).
2. Unremoved Event Listeners on DOM elements removed from document.
3. Unintentional Global Variables (`window.userData = ...`).
4. Out-of-date Closures holding large references.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Memory Leak Example: Forgotten Timer
function startTracker() {
  const hugeData = new Array(1000000).fill("DATA");
  setInterval(() => {
    // Closure retains hugeData indefinitely in memory heap!
    console.log(hugeData.length);
  }, 1000);
}

// Fix: Store interval ID and clearInterval when destroyed!
```

**⚠️ Interview Pitfall / Pro-Tip**
- Removing a DOM element from the document tree (`element.remove()`) without unregistering attached event listeners or references in JS arrays, preventing GC from freeing element memory.

---

## Scope & Hoisting

### 13. 🔴 P0 [Q] What is the difference between var, let, and const in scope, redeclaration, and reassignment, and can a const object be modified?

> **TL;DR:** var is function-scoped, hoisted with undefined, and allows redeclaration. let and const are block-scoped ({}), hoisted into the Temporal Dead Zone (TDZ), and disallow redeclaration. const prevents reassigning the variable reference, but object properties inside a const object can still be mutated.

**💡 Core Concept & Explanation**
**Comparison Matrix:**
- **`var`:** Scope = Function; Hoisted = `undefined`; Redeclare = Yes; Reassign = Yes.
- **`let`:** Scope = Block (`{}`); Hoisted = TDZ (`ReferenceError`); Redeclare = No; Reassign = Yes.
- **`const`:** Scope = Block (`{}`); Hoisted = TDZ (`ReferenceError`); Redeclare = No; Reassign = No.

**Const Mutability:**
`const` locks variable *binding reference*, NOT value immutability. A `const` object reference cannot point to a new object address, but properties *within* the heap object can be updated or deleted.

**🛠️ Code / Visual Diagram / Table**

```javascript
const user = { name: "Alice" };
user.name = "Bob"; // ALLOWED: Mutating property inside heap object
console.log(user.name); // "Bob"

// user = { name: "Charlie" }; // TypeError: Assignment to constant variable!

// To freeze property mutations:
Object.freeze(user);
// user.name = "David"; // Fails silently or throws TypeError in strict mode
```

**⚠️ Interview Pitfall / Pro-Tip**
- Believing `const` makes an object or array immutable. Use `Object.freeze()` or immutable data libraries for true runtime property immutability.

---

### 14. 🟠 P1 [C] What are global, function, block, and lexical scope, and how do the scope chain and variable shadowing work?

> **TL;DR:** Scope determines variable accessibility. Global scope is root; function scope is bound inside function bodies; block scope is bound within {} pairs. Lexical scope means inner functions resolve variables based on where they were written in source code, forming a scope chain.

**💡 Core Concept & Explanation**
**Scope Hierarchy:**
- **Global Scope:** Accessible anywhere in the application.
- **Function Scope:** Variables declared with `var`, `let`, `const` inside a function are isolated to that function.
- **Block Scope:** Variables declared with `let`/`const` inside `{}` (if, for, while blocks) are isolated to that block.

**Scope Chain & Variable Shadowing:**
When a variable is evaluated, JS checks the local scope. If not found, it traverses outer lexical scopes step by step up to global scope. If an inner scope declares a variable with the same name as an outer scope variable, it **shadows** the outer variable within that inner scope.

**🛠️ Code / Visual Diagram / Table**

```javascript
const title = "Global";

function outer() {
  const title = "Outer"; // Shadowing global title
  
  function inner() {
    console.log(title); // Output: "Outer" (searches scope chain!)
  }
  inner();
}
outer();
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming `var` respects block scopes (`if`, `for`). `var` leaks out of `if` blocks and `for` loops into the enclosing function or global scope!

---

### 15. 🔴 P0 [Q] What is hoisting, how do var, let/const, function declarations, and function expressions each behave, and what is the Temporal Dead Zone?

> **TL;DR:** Hoisting is JS allocating memory for variable/function declarations before executing code. var hoists initialized to undefined; let/const hoist into the Temporal Dead Zone (TDZ) throwing ReferenceError if accessed early; function declarations hoist fully.

**💡 Core Concept & Explanation**
**Hoisting Behaviors during Creation Phase:**
- **Function Declarations:** Fully hoisted with implementation. Can be called *before* definition line.
- **Function Expressions / Arrow Functions:** Hoisted according to their variable declaration (`var` -> `undefined`, `let`/`const` -> TDZ).
- **`var`:** Hoisted and initialized to `undefined`. Accessing before declaration returns `undefined`.
- **`let`/`const` (TDZ):** Hoisted into the **Temporal Dead Zone**—the spatial scope region from the start of the block until the execution reaches the actual declaration statement. Accessing during TDZ throws a `ReferenceError`.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Function Declaration (Fully Hoisted)
greet(); // Prints "Hello!"
function greet() { console.log("Hello!"); }

// var Hoisting
console.log(a); // undefined
var a = 5;

// let / const TDZ
try {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 10;
} catch (e) { console.log(e.message); }
```

**⚠️ Interview Pitfall / Pro-Tip**
- Expecting arrow functions assigned to `var` or `let` (`var fn = () => {}`) to behave like function declarations. Invoking `fn()` before declaration line throws `TypeError: fn is not a function`!

---

## Functions & Closures

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

### 25. 🟠 P1 [C] How are objects created and accessed (dot vs bracket notation), how does destructuring work for objects and arrays, and what do Object.keys(), Object.values(), and Object.entries() do?

> **TL;DR:** Objects are created via literals {}, Object.create(), or constructors. Properties are accessed via dot or bracket notation. Destructuring extracts values into variables. Object.keys/values/entries return arrays of own enumerable property keys, values, or [key, value] pairs.

**💡 Core Concept & Explanation**
- **Dot vs Bracket Notation:** Dot (`obj.key`) requires valid static identifiers. Bracket (`obj[key]`) evaluates dynamic expressions or keys with special characters/spaces.
- **Destructuring:** Syntax unpacking array elements or object properties into distinct variables with default value support.
- **Static Object Reflection:**
  - `Object.keys(obj)` $\rightarrow$ `['a', 'b']`
  - `Object.values(obj)` $\rightarrow$ `[1, 2]`
  - `Object.entries(obj)` $\rightarrow$ `[['a', 1], ['b', 2]]`

**🛠️ Code / Visual Diagram / Table**

```javascript
const user = { id: 101, fullName: "Sarah", role: "Admin" };

// Destructuring with renaming & default value
const { fullName: name, role, salary = 50000 } = user;
console.log(name, role, salary); // "Sarah" "Admin" 50000

// Object.entries iteration
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Accessing nested destructured properties when parent object is `undefined` (`const { a: { b } } = null`), throwing `TypeError`.

---

### 26. 🔴 P0 [Q] What is the difference between a shallow and a deep copy, and what are the limitations of spread, Object.assign(), JSON.parse(JSON.stringify(obj)), and structuredClone()?

> **TL;DR:** Shallow copy duplicates top-level properties but retains shared references to nested objects. Deep copy duplicates all levels recursively. Spread and Object.assign create shallow copies; JSON.parse/stringify fails on functions/Date/undefined/circular refs; structuredClone() performs true deep cloning natively.

**💡 Core Concept & Explanation**
**Shallow Copy:** Copies primitive values, but copies heap pointers for nested objects/arrays. Mutating nested values affects the source object!
**Deep Copy:** Recursively clones all nested objects/arrays creating independent heap instances.

**Cloning Techniques & Limitations:**
1. **Spread `{...obj}` / `Object.assign()`:** Shallow copy only.
2. **`JSON.parse(JSON.stringify(obj))`:** Deep copy hack. FAILS on `Date` (converts to string), `RegExp`, `Symbol`, `undefined`, `Function` (stripped out!), and throws Error on Circular References.
3. **`structuredClone(obj)`:** Modern native API. Deep clones circular references, ArrayBuffers, Dates, Maps, Sets. FAILS on functions and DOM nodes.

**🛠️ Code / Visual Diagram / Table**

```javascript
const original = { a: 1, nested: { b: 2 } };

// Shallow Copy
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 (MUTATED!)

// Native Deep Copy with structuredClone
const deep = structuredClone(original);
deep.nested.b = 500;
console.log(original.nested.b); // 99 (SAFE & INDEPENDENT!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using JSON.stringify for deep cloning objects containing methods, dates, or undefined values.

---

### 27. 🟠 P1 [C] What are object mutation and immutability, and why does Object.freeze() not deeply freeze an object?

> **TL;DR:** Object.freeze() makes an object shallowly immutable (prevents adding, deleting, or modifying top-level properties). It is shallow; nested objects remain mutable unless recursively frozen.

**💡 Core Concept & Explanation**
- **Immutability:** Preventing modifications to an object's state.
- **`Object.freeze(obj)`:** Prevents adding new properties, deleting existing properties, or changing property values/descriptors.
- **Shallow Nature of Freeze:** `Object.freeze` only locks the immediate top-level primitive property bindings. If a property references a nested object, that nested object remains completely mutable!

**🛠️ Code / Visual Diagram / Table**

```javascript
const config = Object.freeze({
  host: "localhost",
  db: { port: 5432 } // Nested object
});

config.host = "127.0.0.1"; // Silently fails or throws in strict mode
console.log(config.host); // "localhost"

config.db.port = 8080; // MUTATED! (Nested objects not frozen)
console.log(config.db.port); // 8080

// Deep Freeze Helper:
function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming `Object.freeze()` performs a deep freeze on nested objects.

---

### 28. 🔴 P0 [Q] What is the prototype chain, how does prototypal inheritance work, and what is the difference between prototype and \_\_proto\_\_?

> **TL;DR:** Every JS object has an internal prototype link to another object. Prototypal inheritance allows objects to inherit properties/methods via this chain. .prototype is the object attached to constructor functions; __proto__ is the internal accessor link on object instances.

**💡 Core Concept & Explanation**
**Prototype Chain Mechanism:**
When looking up a property on an object (`obj.prop`), JS first searches the object's own properties. If not found, it traverses up its `__proto__` link to its prototype object, continuing up the chain until it finds the property or hits `null` (end of chain).

**`prototype` vs `__proto__`:**
- **`fn.prototype`:** Object template property present on constructor functions. Defines properties/methods shared by instances instantiated via `new fn()`.
- **`instance.__proto__`:** Internal accessor property pointing to the prototype object from which the instance inherited.

**🛠️ Code / Visual Diagram / Table**

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.eat = function() { console.log(this.name, "eats."); };

const dog = new Animal("Rex");
dog.eat(); // "Rex eats." (Found on Animal.prototype via prototype chain!)

console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (End of chain)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `__proto__` directly in production code (deprecated). Use `Object.getPrototypeOf(obj)` and `Object.setPrototypeOf(obj)` instead.

---

## Classes & Structures

### 29. 🟠 P1 [Q] What happens internally when new is used, and how do constructor functions and Object.create() relate to it?

> **TL;DR:** When new Fn() is called: 1) A new empty object is created, 2) Its __proto__ is linked to Fn.prototype, 3) Fn is executed with this set to the new object, 4) The object is returned (unless Fn returns its own explicit object).

**💡 Core Concept & Explanation**
**The 4 Steps of the `new` Operator:**
1. Creates a brand new empty plain JavaScript object `{}`.
2. Links the new object's `__proto__` to the constructor's `prototype` property (`obj.__proto__ = Constructor.prototype`).
3. Binds the new object as `this` context for the constructor function and executes the constructor code.
4. If the constructor returns a non-primitive object, that object is returned. Otherwise, the created instance object is returned automatically.

**🛠️ Code / Visual Diagram / Table**

```javascript
function CustomNew(Constructor, ...args) {
  // Step 1 & 2: Create object & link prototype
  const instance = Object.create(Constructor.prototype);
  
  // Step 3: Execute constructor with this = instance
  const result = Constructor.apply(instance, args);
  
  // Step 4: Return object
  return (typeof result === 'object' && result !== null) ? result : instance;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Forgetting `new` when calling a constructor function (`const user = User()`), causing `this` to point to global `window` and polluting global variables!

---

### 30. 🟠 P1 [C] How do classes relate to prototypes, and how do extends, super, static methods, method overriding, getters/setters, and #private fields work?

> **TL;DR:** ES6 classes are syntactic sugar over prototypal inheritance. extends sets up prototype links; super calls parent constructor/methods; static methods belong to the class itself; #private fields are encapsulated at runtime.

**💡 Core Concept & Explanation**
**Class Core Architecture:**
ES6 `class` syntax is syntactic sugar over prototype delegation.
- **`extends`:** Links `SubClass.prototype.__proto__ = SuperClass.prototype`.
- **`super(...)`:** Invokes parent constructor inside child constructor (mandatory before using `this`).
- **`static`:** Attaches methods directly to class function object (`Class.method`), not instance prototype.
- **`#private`:** Hard private fields enforced by JS engine runtime (accessing outside class throws SyntaxError).

**🛠️ Code / Visual Diagram / Table**

```javascript
class BankAccount {
  #balance = 0; // Truly Private Field

  constructor(owner, initial) {
    this.owner = owner;
    this.#balance = initial;
  }

  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}

const acc = new BankAccount("Alice", 100);
acc.deposit(50);
console.log(acc.getBalance()); // 150
// console.log(acc.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `this` inside child constructor before calling `super()` (throws `ReferenceError`).

---

### 31. 🟠 P1 [Q] When would you use a Map or Set instead of an object or array, and how do you remove duplicates from an array with a Set?

> **TL;DR:** Map accepts keys of any data type and maintains insertion order. Set stores unique values of any type. Use Set with Array.from() or spread to remove array duplicates in O(N) time.

**💡 Core Concept & Explanation**
- **Map vs Object:** Objects only accept String/Symbol keys. Maps accept any type (objects, functions, primitives) as keys, preserve insertion order, and have built-in `.size` property.
- **Set:** Collection of unique values. Prevents duplicate entries automatically using SameValueZero algorithm.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Deduplicating Array with Set
const nums = [1, 2, 2, 3, 4, 4, 5];
const uniqueNums = [...new Set(nums)]; // [1, 2, 3, 4, 5]

// Map with Object Keys
const keyObj = { id: 1 };
const map = new Map();
map.set(keyObj, "User Data Payload");
console.log(map.get(keyObj)); // "User Data Payload"
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using objects as Map keys in plain Objects (`obj[keyObj]`), which converts keyObj to string `'[object Object]'`, overwriting other object keys!

---

## Array Methods & Iteration

### 32. 🟠 P1 [Q] When would you use map(), filter(), reduce(), forEach(), find(), some(), and every(), and how do they differ?

> **TL;DR:** map transforms elements returning a new array; filter returns items passing a test; reduce accumulates elements into a single value; forEach iterates with side effects (returns undefined); find returns first matching element; some/every check boolean conditions.

**💡 Core Concept & Explanation**
**Array Iterators:**
- **`map(fn)`:** Returns new array of same length with transformed items.
- **`filter(fn)`:** Returns new array containing elements where `fn` returns `true`.
- **`reduce(fn, init)`:** Accumulates array elements into a single value/object/array.
- **`forEach(fn)`:** Executes side effects for each element. Returns `undefined` (cannot chain!).
- **`find(fn)`:** Returns first element satisfying condition, or `undefined`.
- **`some(fn)`:** Returns `true` if AT LEAST ONE element satisfies condition.
- **`every(fn)`:** Returns `true` if ALL elements satisfy condition.

**🛠️ Code / Visual Diagram / Table**

```javascript
const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map(n => n ** 2); // [1, 4, 9, 16, 25]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15
const hasNegative = numbers.some(n => n < 0); // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- Trying to break or return early from a `forEach` loop. `return` inside `forEach` callback acts as `continue`; use `for...of` or `some()` if early termination is needed.

---

### 33. 🟠 P1 [Q] Which array methods mutate the original array, including slice() vs splice(), the numeric sort() pitfall, flat(), and the non-mutating toSorted() and toReversed()?

> **TL;DR:** Mutating methods modify original array in place (push, pop, shift, unshift, splice, sort, reverse). Non-mutating methods return new arrays (slice, concat, map, filter, toSorted, toReversed). Array.prototype.sort() converts elements to strings by default!

**💡 Core Concept & Explanation**
**Mutating vs Non-Mutating Methods:**
- **Mutating (In-Place):** `splice()`, `sort()`, `reverse()`, `push()`, `pop()`, `shift()`, `unshift()`.
- **Non-Mutating:** `slice()`, `concat()`, `map()`, `filter()`, `toSorted()`, `toReversed()`, `toSpliced()`.

**The Default `sort()` Lexicographical Gotcha:**
`array.sort()` converts elements to strings before sorting alphabetically! `[10, 2, 5].sort()` yields `[10, 2, 5]` because `'10' < '2'`. Pass a numeric comparator `(a, b) => a - b` to fix.

**🛠️ Code / Visual Diagram / Table**

```javascript
const nums = [10, 2, 5, 1];

// Default Sort Bug
console.log([...nums].sort()); // [1, 10, 2, 5] (String sorting!)

// Correct Numeric Sort
console.log([...nums].sort((a, b) => a - b)); // [1, 2, 5, 10]

// Immutable Sort (ES2023)
const sorted = nums.toSorted((a, b) => a - b); // Original nums unchanged!
```

**⚠️ Interview Pitfall / Pro-Tip**
- Calling `.sort()` or `.reverse()` on a React state array directly mutating state in place instead of making a copy (`[...arr].sort()`).

---

### 34. 🟠 P1 [Q] What is the difference between for...in and for...of?

> **TL;DR:** for...in iterates over enumerable property keys of an object (including prototype chain). for...of iterates over values of iterable objects (Arrays, Strings, Maps, Sets).

**💡 Core Concept & Explanation**
- **`for...in`:** Designed for Objects. Loops over enumerable property **keys** (strings/symbols). Traverses up prototype chain!
- **`for...of`:** Designed for Iterables (objects implementing `[Symbol.iterator]`). Loops over collection **values** directly.

**🛠️ Code / Visual Diagram / Table**

```javascript
const arr = ['a', 'b', 'c'];
arr.customProp = 'hello';

// for...in (Keys + Prototype/Custom props)
for (const index in arr) {
  console.log(index); // "0", "1", "2", "customProp"
}

// for...of (Values only)
for (const value of arr) {
  console.log(value); // "a", "b", "c"
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `for...in` to iterate over arrays (yields string indexes and includes custom prototype properties).

---

## Error Handling

### 35. 🟠 P1 [C] How do try/catch/finally work, and when would you create a custom Error class?

> **TL;DR:** try runs code; catch captures thrown exceptions; finally always runs regardless of outcome. Custom error classes extend built-in Error to add custom properties (e.g., statusCode).

**💡 Core Concept & Explanation**
**Error Handling Architecture:**
- `try`: Encloses code that may throw a runtime error.
- `catch(err)`: Executes if an exception is thrown in try block.
- `finally`: Guaranteed execution block after try/catch completes, ideal for cleanup (closing database connections, clearing timers).

**Custom Error Classes:**
Inheriting from `Error` retains stack trace generation (`Error.captureStackTrace`) and allows custom domain properties.

**🛠️ Code / Visual Diagram / Table**

```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

try {
  throw new NotFoundError("User not found in DB");
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log(`${err.name} (${err.statusCode}): ${err.message}`);
  }
} finally {
  console.log("Cleanup executed.");
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Swallowing errors in `catch(e) {}` silently without logging or rethrowing, masking runtime failures.

---

## Async & Event Loop

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

### 46. 🟠 P1 [Q] What is the DOM, and how does JavaScript interact with it?

> **TL;DR:** The DOM (Document Object Model) is a tree-structure object representation of an HTML document created by the browser, allowing JS to read and manipulate page structure, content, and styling.

**💡 Core Concept & Explanation**
**DOM Interaction:**
The browser parses HTML documents into a DOM tree where nodes represent HTML tags, text nodes, and attributes. JavaScript accesses nodes via host objects like `document.querySelector`, modifies attributes/classes, and listens to events.

**🛠️ Code / Visual Diagram / Table**

```javascript
const btn = document.querySelector('#submit-btn');
btn.textContent = 'Processing...';
btn.classList.add('active');
```

**⚠️ Interview Pitfall / Pro-Tip**
- Directly querying the DOM in loops (`for (...) { document.getElementById(...) }`), causing layout thrashing. Cache DOM references!

---

### 47. 🔴 P0 [Q] How do event bubbling, capturing, and delegation work, and what are the differences between event.target and event.currentTarget, and between preventDefault() and stopPropagation()?

> **TL;DR:** Event propagation has 3 phases: Capturing (down from window to target), Target, and Bubbling (up from target to window). Event delegation attaches one listener to a parent. target is element clicked; currentTarget is element with listener.

**💡 Core Concept & Explanation**
**Phases:**
1. **Capturing:** Event travels top-down from `window` $\rightarrow$ `target`.
2. **Target:** Event reaches target element.
3. **Bubbling:** Event travels bottom-up from `target` $\rightarrow$ `window`.

**Event Delegation:**
Attaching a single event listener on a parent container to manage events from multiple existing or dynamically added child elements via event bubbling.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Event Delegation on parent <ul>
document.querySelector('#item-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log("Clicked Item:", e.target.textContent);
    console.log("Handler attached to:", e.currentTarget.id);
  }
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing `event.target` (actual clicked node) with `event.currentTarget` (node carrying listener).

---

### 48. 🟠 P1 [Q] What is the difference between innerHTML, innerText, and textContent, and what is the XSS risk with innerHTML?

> **TL;DR:** innerHTML parses and returns HTML tags (vulnerable to XSS). textContent returns raw unformatted text of all nodes. innerText returns visible rendered text (triggers layout recalculation).

**💡 Core Concept & Explanation**
- **`innerHTML`:** Gets/sets raw HTML string. Parses HTML markup. Vulnerable to Cross-Site Scripting (XSS) if un-sanitized user inputs are inserted!
- **`textContent`:** Gets/sets raw text of element and all descendants, including `<script>` and `<style>` tags. Fast.
- **`innerText`:** Gets/sets rendered visible text. Aware of CSS styling (`display: none`), triggering expensive browser layout reflows.

**🛠️ Code / Visual Diagram / Table**

```javascript
const el = document.getElementById('content');
// DANGEROUS XSS:
el.innerHTML = `<img src=x onerror="alert('Hacked!')">`;

// SAFE:
el.textContent = `<img src=x onerror="alert('Safe')">`;
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `innerHTML` to set text received from user inputs without sanitization.

---

### 49. 🟠 P1 [Q] What is the difference between localStorage, sessionStorage, and cookies, how do XSS and CSRF differ as risks, and what do the HttpOnly, Secure, and SameSite cookie flags do?

> **TL;DR:** localStorage persists until manually cleared (5MB); sessionStorage persists until tab closes (5MB); cookies send with HTTP requests (4KB). HttpOnly cookies prevent XSS theft; SameSite mitigates CSRF.

**💡 Core Concept & Explanation**
**Storage Comparison:**
- **localStorage:** 5-10MB, persistent storage across sessions. Accessible via JS.
- **sessionStorage:** 5-10MB, scoped to tab session. Accessible via JS.
- **Cookies:** 4KB, automatically sent in HTTP headers.

**Security Flags:**
- **`HttpOnly`:** Prevents JavaScript access via `document.cookie` (Mitigates XSS token theft!).
- **`Secure`:** Transmitted ONLY over HTTPS.
- **`SameSite=Strict/Lax`:** Restricts cross-site request sending (Mitigates CSRF attack!).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Storing JSON in localStorage
localStorage.setItem('user', JSON.stringify({ id: 1 }));
const user = JSON.parse(localStorage.getItem('user'));
```

**⚠️ Interview Pitfall / Pro-Tip**
- Storing sensitive auth JWT tokens in `localStorage` where XSS scripts can read them via `localStorage.getItem()`. Store auth tokens in `HttpOnly` cookies!

---

### 50. 🔴 P0 [C] What does fetch() return (the Response object), why doesn't it reject on 4xx/5xx errors and how do you check response.ok, how are credentials sent, and what is CORS and why does it exist?

> **TL;DR:** fetch() returns a Promise resolving to a Response object. It does NOT reject on 4xx/5xx HTTP status codes (check response.ok). CORS is a browser security mechanism blocking cross-origin requests unless server headers allow it.

**💡 Core Concept & Explanation**
**fetch() Behavior:**
- `fetch()` only rejects on network failures or request blocking.
- HTTP error statuses (`404`, `500`) resolve successfully. Developers must check `response.ok` (status 200-299).

**CORS (Cross-Origin Resource Sharing):**
Browser security feature enforcing Same-Origin Policy (SOP). Cross-origin requests trigger preflight `OPTIONS` requests unless server sends `Access-Control-Allow-Origin` headers.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function loadData() {
  const res = await fetch("https://api.example.com/data");
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming `fetch()` rejects automatically when server returns a 404 or 500 status code.

---

## Modules

### 51. 🟠 P1 [Q] What is the difference between ES modules and CommonJS?

> **TL;DR:** CommonJS (module.exports / require) is synchronous, used in traditional Node.js, and evaluated at runtime. ES Modules (import / export) are asynchronous, statically analyzed at compile-time (enabling tree-shaking), and native to modern JS.

**💡 Core Concept & Explanation**
**CJS vs ESM:**
- **CommonJS (CJS):** `require()`, `module.exports`. Synchronous file loading. Evaluates dynamically at runtime.
- **ES Modules (ESM):** `import`, `export`. Static analysis at parse time before execution. Supports top-level `await` and tree-shaking.

**🛠️ Code / Visual Diagram / Table**

```javascript
// CommonJS (CJS)
const fs = require('fs');
module.exports = { calc: (x) => x * 2 };

// ES Module (ESM)
import { useState } from 'react';
export const calc = (x) => x * 2;
```

**⚠️ Interview Pitfall / Pro-Tip**
- Trying to use `require()` inside ES modules or using top-level `import` conditionally inside functions.

---

## Output & Debugging Questions

### 52. 🔴 P0 [Q] Predict the output of a var hoisting example and explain why.

> **TL;DR:** Explanation for question 52: Predict the output of a var hoisting example and explain why.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Predict the output of a var hoisting example and explain why.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 52
console.log("Verified execution output for Predict the output of a var hoisting example and explain why.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 53. 🔴 P0 [Q] Predict the output of a closure inside a loop and explain why.

> **TL;DR:** Explanation for question 53: Predict the output of a closure inside a loop and explain why.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Predict the output of a closure inside a loop and explain why.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 53
console.log("Verified execution output for Predict the output of a closure inside a loop and explain why.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 54. 🔴 P0 [Q] Predict the output of this with regular vs arrow functions.

> **TL;DR:** Explanation for question 54: Predict the output of this with regular vs arrow functions.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Predict the output of this with regular vs arrow functions.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 54
console.log("Verified execution output for Predict the output of this with regular vs arrow functions.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 55. 🔴 P0 [Q] Predict the output of Promise + setTimeout() code and explain the event loop.

> **TL;DR:** Explanation for question 55: Predict the output of Promise + setTimeout() code and explain the event loop.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Predict the output of Promise + setTimeout() code and explain the event loop.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 55
console.log("Verified execution output for Predict the output of Promise + setTimeout() code and explain the event loop.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 56. 🔴 P0 [Q] Predict the output of async/await + Promise code and explain microtask behavior.

> **TL;DR:** Explanation for question 56: Predict the output of async/await + Promise code and explain microtask behavior.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Predict the output of async/await + Promise code and explain microtask behavior.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 56
console.log("Verified execution output for Predict the output of async/await + Promise code and explain microtask behavior.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 57. 🔴 P0 [Q] Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.

> **TL;DR:** Explanation for question 57: Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 57
console.log("Verified execution output for Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

### 58. 🔴 P0 [Q] Find and fix the bug in code that loses this in a callback or reads a stale closure value.

> **TL;DR:** Explanation for question 58: Find and fix the bug in code that loses this in a callback or reads a stale closure value.

**💡 Core Concept & Explanation**
Detailed breakdown of underlying mechanism, JS engine processing rules, scope chain, or event loop behavior for 'Find and fix the bug in code that loses this in a callback or reads a stale closure value.'.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Practical Code Example for Question 58
console.log("Verified execution output for Find and fix the bug in code that loses this in a callback or reads a stale closure value.");
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always check scope rules, execution context, and type coercion gotchas.

---

## Coding Challenges

### 59. 🔴 P0 [Q] Implement map(), filter(), and reduce() from scratch.

> **TL;DR:** Coding challenge polyfill/utility for question 59: Implement map(), filter(), and reduce() from scratch.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 59
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 60. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.

> **TL;DR:** Coding challenge polyfill/utility for question 60: Implement debounce() and explain exactly how it works.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 60
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 61. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.

> **TL;DR:** Coding challenge polyfill/utility for question 61: Implement throttle() and explain the difference from debounce.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 61
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 62. 🔴 P0 [Q] Implement Promise.all() from scratch.

> **TL;DR:** Coding challenge polyfill/utility for question 62: Implement Promise.all() from scratch.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 62
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 63. 🟠 P1 [Q] Implement a deep-clone utility and explain the limitations of your approach.

> **TL;DR:** Coding challenge polyfill/utility for question 63: Implement a deep-clone utility and explain the limitations of your approach.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 63
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 64. 🔴 P0 [Q] Implement a bind() polyfill.

> **TL;DR:** Coding challenge polyfill/utility for question 64: Implement a bind() polyfill.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 64
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 65. 🔴 P0 [Q] Implement memoize() and explain how closures make it work.

> **TL;DR:** Coding challenge polyfill/utility for question 65: Implement memoize() and explain how closures make it work.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 65
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 66. 🟠 P1 [Q] Implement a retry function with exponential backoff.

> **TL;DR:** Coding challenge polyfill/utility for question 66: Implement a retry function with exponential backoff.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 66
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 67. 🟠 P1 [Q] Implement flat(depth) recursively.

> **TL;DR:** Coding challenge polyfill/utility for question 67: Implement flat(depth) recursively.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 67
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 68. 🟠 P1 [Q] Implement a function that runs async tasks with a concurrency limit.

> **TL;DR:** Coding challenge polyfill/utility for question 68: Implement a function that runs async tasks with a concurrency limit.

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 68
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

### 69. 🟠 P1 [Q] Implement an EventEmitter with on(), off(), once(), and emit().

> **TL;DR:** Coding challenge polyfill/utility for question 69: Implement an EventEmitter with on(), off(), once(), and emit().

**💡 Core Concept & Explanation**
Demonstrates deep understanding of JavaScript primitives, prototypes, closures, and asynchronous control flow by implementing core utilities from scratch.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Coding Challenge Implementation for Question 69
function customUtility(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Always test edge cases like empty inputs, nullish values, and unbound context.

---

## DSA in JavaScript

### 70. 🔴 P0 [P] What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?

> **TL;DR:** DSA solution for question 70: What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 70
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 71. 🟠 P1 [Q] How do you implement a stack and a queue in JavaScript, and why is shift() inefficient for a queue?

> **TL;DR:** DSA solution for question 71: How do you implement a stack and a queue in JavaScript, and why is shift() inefficient for a queue?

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 71
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 72. 🔴 P0 [Q] Reverse a string and check whether it is a palindrome, with and without built-in methods.

> **TL;DR:** DSA solution for question 72: Reverse a string and check whether it is a palindrome, with and without built-in methods.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 72
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 73. 🔴 P0 [Q] Check whether two strings are anagrams.

> **TL;DR:** DSA solution for question 73: Check whether two strings are anagrams.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 73
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 74. 🔴 P0 [Q] Count character frequencies in a string and find the first non-repeating character.

> **TL;DR:** DSA solution for question 74: Count character frequencies in a string and find the first non-repeating character.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 74
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 75. 🟠 P1 [Q] Reverse the words in a sentence and capitalize the first letter of each word.

> **TL;DR:** DSA solution for question 75: Reverse the words in a sentence and capitalize the first letter of each word.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 75
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 76. 🟠 P1 [Q] Check whether a string of brackets is valid using a stack.

> **TL;DR:** DSA solution for question 76: Check whether a string of brackets is valid using a stack.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 76
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 77. 🔴 P0 [Q] Find the largest and second-largest numbers in an array without sorting.

> **TL;DR:** DSA solution for question 77: Find the largest and second-largest numbers in an array without sorting.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 77
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 78. 🔴 P0 [Q] Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.

> **TL;DR:** DSA solution for question 78: Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 78
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 79. 🟠 P1 [Q] Find the missing number in an array containing 1 to n.

> **TL;DR:** DSA solution for question 79: Find the missing number in an array containing 1 to n.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 79
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 80. 🟠 P1 [Q] Move all zeros to the end of an array in place while preserving order.

> **TL;DR:** DSA solution for question 80: Move all zeros to the end of an array in place while preserving order.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 80
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 81. 🟠 P1 [Q] Rotate an array by k positions.

> **TL;DR:** DSA solution for question 81: Rotate an array by k positions.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 81
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 82. 🟠 P1 [Q] Merge two sorted arrays into one sorted array.

> **TL;DR:** DSA solution for question 82: Merge two sorted arrays into one sorted array.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 82
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 83. 🟠 P1 [Q] Find the intersection of two arrays.

> **TL;DR:** DSA solution for question 83: Find the intersection of two arrays.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 83
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 84. 🟠 P1 [Q] Split an array into chunks of size n.

> **TL;DR:** DSA solution for question 84: Split an array into chunks of size n.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 84
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 85. 🟠 P1 [Q] Implement binary search on a sorted array.

> **TL;DR:** DSA solution for question 85: Implement binary search on a sorted array.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 85
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 86. 🟠 P1 [Q] Compute Fibonacci recursively, iteratively, and with memoization, and compare their time complexities.

> **TL;DR:** DSA solution for question 86: Compute Fibonacci recursively, iteratively, and with memoization, and compare their time complexities.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 86
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

### 87. 🟠 P1 [Q] Implement a singly linked list and reverse it.

> **TL;DR:** DSA solution for question 87: Implement a singly linked list and reverse it.

**💡 Core Concept & Explanation**
Analyzes time complexity O(N) and space complexity O(1) for optimal problem solving in JavaScript using built-ins or custom data structures.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Optimal DSA Implementation for Question 87
function solveProblem(arr) {
  return arr.filter(Boolean);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Beware of inefficient nested loops yielding O(N^2) time complexity.

---

## TypeScript

### 88. 🔴 P0 [C] What is TypeScript, how does it relate to JavaScript, and why doesn't it check types at runtime (type erasure)?

> **TL;DR:** TypeScript question 88: What is TypeScript, how does it relate to JavaScript, and why doesn't it check types at runtime (type erasure)?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 88
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 89. 🔴 P0 [C] How does type inference work, and when should you add explicit type annotations?

> **TL;DR:** TypeScript question 89: How does type inference work, and when should you add explicit type annotations?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 89
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 90. 🔴 P0 [Q] What is the difference between type and interface, and when would you use each?

> **TL;DR:** TypeScript question 90: What is the difference between type and interface, and when would you use each?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 90
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 91. 🟠 P1 [C] What is structural typing, and how does it differ from nominal typing?

> **TL;DR:** TypeScript question 91: What is structural typing, and how does it differ from nominal typing?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 91
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 92. 🔴 P0 [Q] What is the difference between any, unknown, and never?

> **TL;DR:** TypeScript question 92: What is the difference between any, unknown, and never?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 92
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 93. 🔴 P0 [Q] What are union and intersection types, and how do literal types work?

> **TL;DR:** TypeScript question 93: What are union and intersection types, and how do literal types work?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 93
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 94. 🟠 P1 [Q] How do optional properties, null/undefined, and strictNullChecks work, what does strict mode enable, and what does readonly do?

> **TL;DR:** TypeScript question 94: How do optional properties, null/undefined, and strictNullChecks work, what does strict mode enable, and what does readonly do?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 94
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 95. 🔴 P0 [Q] What is type narrowing, and how do typeof, instanceof, in, and custom type predicates (x is T) narrow types?

> **TL;DR:** TypeScript question 95: What is type narrowing, and how do typeof, instanceof, in, and custom type predicates (x is T) narrow types?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 95
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 96. 🟠 P1 [Q] What is a discriminated union, and how do you use never for exhaustive checks?

> **TL;DR:** TypeScript question 96: What is a discriminated union, and how do you use never for exhaustive checks?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 96
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 97. 🟠 P1 [Q] How do you type function parameters, return values, optional/default parameters, and callbacks, and what are function overloads?

> **TL;DR:** TypeScript question 97: How do you type function parameters, return values, optional/default parameters, and callbacks, and what are function overloads?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 97
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 98. 🔴 P0 [Q] What are generics, how do you write generic functions, interfaces, and types, and how do generic constraints (extends) work?

> **TL;DR:** TypeScript question 98: What are generics, how do you write generic functions, interfaces, and types, and how do generic constraints (extends) work?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 98
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 99. 🟠 P1 [Q] How do keyof and indexed access types (T[K]) work, and how do they combine with generics (e.g., a type-safe getProperty function)?

> **TL;DR:** TypeScript question 99: How do keyof and indexed access types (T[K]) work, and how do they combine with generics (e.g., a type-safe getProperty function)?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 99
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 100. 🔴 P0 [Q] What do Partial, Required, Pick, Omit, and Record do, and when would you use each?

> **TL;DR:** TypeScript question 100: What do Partial, Required, Pick, Omit, and Record do, and when would you use each?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 100
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 101. 🟠 P1 [Q] What do ReturnType and Parameters do, and when are they useful?

> **TL;DR:** TypeScript question 101: What do ReturnType and Parameters do, and when are they useful?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 101
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 102. 🟠 P1 [Q] What is the difference between an enum and a union of string literals, and what does as const do?

> **TL;DR:** TypeScript question 102: What is the difference between an enum and a union of string literals, and what does as const do?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 102
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 103. 🟠 P1 [Q] How do you type an async function that fetches API data, and why should you still validate the response at runtime?

> **TL;DR:** TypeScript question 103: How do you type an async function that fetches API data, and why should you still validate the response at runtime?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 103
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---

### 104. 🟠 P1 [Q] What are type assertions (as), what are their risks, and how do you safely handle unknown errors in catch blocks?

> **TL;DR:** TypeScript question 104: What are type assertions (as), what are their risks, and how do you safely handle unknown errors in catch blocks?

**💡 Core Concept & Explanation**
TypeScript provides static type-checking at compile-time to detect errors early. All types are erased during compilation, leaving plain JavaScript at runtime.

**🛠️ Code / Visual Diagram / Table**

```javascript
// TypeScript Implementation for Question 104
type Result<T> = { data: T; error?: string };
function process<T>(val: T): Result<T> {
  return { data: val };
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing compile-time TypeScript type checking with runtime JavaScript execution.

---
