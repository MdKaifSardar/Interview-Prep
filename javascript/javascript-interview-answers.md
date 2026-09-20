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
### 59. 🔴 P0 [Q] Implement map(), filter(), and reduce() from scratch.

> **TL;DR:** Polyfilling array higher-order functions requires attaching custom methods to `Array.prototype`, managing optional `thisArg` context execution, handling sparse array holes using `in` check or `hasOwnProperty`, and managing initial accumulator values in `reduce`.

**💡 Core Concept & Explanation**
Native array methods process array elements iteratively while respecting JavaScript's array semantics:
1. **`myMap`:** Creates a new array populated with results of calling a callback function on every element. Must preserve sparse array holes.
2. **`myFilter`:** Creates a new array with all elements that pass the test implemented by the callback function.
3. **`myReduce`:** Executes a user-supplied "reducer" callback on each element, passing the return value from the calculation on the preceding element. If no initial value is provided, element 0 becomes the initial accumulator and iteration starts at index 1.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Array.prototype.myMap
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Skip sparse array holes
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// 2. Array.prototype.myFilter
Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// 3. Array.prototype.myReduce
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  let accum = initialValue;
  let startIndex = 0;

  // Handle missing initial value
  if (arguments.length < 2) {
    while (startIndex < this.length && !(startIndex in this)) {
      startIndex++; // Skip leading holes
    }
    if (startIndex >= this.length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accum = this[startIndex++];
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accum = callback(accum, this[i], i, this);
    }
  }
  return accum;
};
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Sparse Array Holes Gotcha:** `[1, , 3].map(x => x * 2)` returns `[2, <empty>, 6]`. Using simple `for (let i = 0; i < this.length; i++)` without `i in this` or `hasOwnProperty` will process `<empty>` as `undefined`, producing `[2, NaN, 6]`, which violates spec behavior!

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

### 63. 🟠 P1 [Q] Implement a deep-clone utility and explain the limitations of your approach.

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

### 64. 🔴 P0 [Q] Implement a bind() polyfill.

> **TL;DR:** `Function.prototype.bind` returns a new target function with permanently bound `this` context and curried initial arguments. When invoked with `new`, the bound `this` context is overridden in favor of the newly constructed instance object.

**💡 Core Concept & Explanation**
1. **Argument Currying:** Combines initial arguments passed during `.bind(ctx, arg1, arg2)` with invocation arguments passed during `boundFn(arg3, arg4)`.
2. **`this` Binding:** Invokes original function using `targetFn.apply(context, combinedArgs)`.
3. **Constructor Handling (`new` keyword):** If the bound function is used as a constructor (`new BoundFn()`), the operator creates a new object instance. In this case, `this` inside `boundFn` refers to the newly created instance, NOT the `context` passed to `bind`.

**🛠️ Code / Visual Diagram / Table**

```javascript
Function.prototype.myBind = function(context, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - item is not callable');
  }

  const targetFn = this;

  function boundFn(...callArgs) {
    // Check if called as a constructor via 'new boundFn()'
    const isNewCall = this instanceof boundFn;
    const finalContext = isNewCall ? this : context;
    return targetFn.apply(finalContext, [...bindArgs, ...callArgs]);
  }

  // Preserve prototypal inheritance for constructor calls
  if (targetFn.prototype) {
    boundFn.prototype = Object.create(targetFn.prototype);
  }

  return boundFn;
};

// Test Constructor Usage:
function User(name, role) {
  this.name = name;
  this.role = role;
}

const BoundUser = User.myBind({ dummy: 1 }, 'Alice');
const u1 = new BoundUser('Admin');
console.log(u1.name, u1.role); // "Alice Admin" (new call overrides bound dummy context!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Prototype Corruption:** Setting `boundFn.prototype = targetFn.prototype` directly mutates the original function's prototype when modifying `boundFn.prototype`. Use `Object.create(targetFn.prototype)` to create a clean prototype object.

---

### 65. 🔴 P0 [Q] Implement memoize() and explain how closures make it work.

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

### 66. 🟠 P1 [Q] Implement a retry function with exponential backoff.

> **TL;DR:** A retry utility re-executes an asynchronous operation upon failure up to a specified maximum attempt limit, increasing the delay exponentially between attempts ($delay 	imes factor^{attempt}$) with randomized jitter to prevent server thundering herds.

**💡 Core Concept & Explanation**
- **Exponential Backoff Formula:** $WaitTime = BaseDelay 	imes (Factor^{attempt}) + Jitter$.
- **Thundering Herd Problem:** If 10,000 clients fail simultaneously and retry at identical fixed intervals, they will crash the API server in waves. Adding random jitter ($Math.random() 	imes 100$) desynchronizes clients.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function retryWithBackoff(fn, retries = 3, delay = 1000, backoffFactor = 2) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(); // If succeeds, return immediately!
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt + 1} failed: ${err.message}`);

      if (attempt === retries) {
        break; // Max attempts reached
      }

      // Calculate exponential wait + random jitter (0-100ms)
      const waitTime = delay * Math.pow(backoffFactor, attempt) + Math.random() * 100;
      console.log(`Waiting ${Math.round(waitTime)}ms before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error(`Failed after ${retries + 1} attempts. Last error: ${lastError.message}`);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Non-Retryable Errors:** In real-world production APIs, HTTP 401 (Unauthorized) or HTTP 404 (Not Found) errors should fail fast immediately without retrying. Always provide an optional `shouldRetry(err)` predicate callback.

---

### 67. 🟠 P1 [Q] Implement flat(depth) recursively.

> **TL;DR:** `Array.prototype.flat(depth)` recursively flattens nested sub-array elements up to the specified `depth` limit into a new flat array, skipping sparse unassigned array holes.

**💡 Core Concept & Explanation**
- **Recursion Base Case:** If `depth <= 0`, return a shallow copy of the array.
- **Recursive Step:** Iterate over array items. If an item is an array (`Array.isArray(item)`) and `depth > 0`, recursively call `flat(item, depth - 1)` and push individual elements into the result accumulator.
- **Sparse Array Preservation:** Skips empty array indices.

**🛠️ Code / Visual Diagram / Table**

```javascript
function myFlat(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }

  if (depth <= 0) {
    return arr.slice();
  }

  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      // Recursively flatten sub-array with decremented depth
      acc.push(...myFlat(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// Test cases:
const nested = [1, [2, [3, [4]]], , 5];
console.log(myFlat(nested, 1)); // [1, 2, [3, [4]], 5] (Hole skipped!)
console.log(myFlat(nested, Infinity)); // [1, 2, 3, 4, 5]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Iterative Alternative (Stack):** Interviewers may ask for a non-recursive solution to avoid call stack overflow on deeply nested arrays:
  ```javascript
  function flatIterative(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
      const next = stack.pop();
      if (Array.isArray(next)) stack.push(...next);
      else res.push(next);
    }
    return res.reverse();
  }
  ```

---

### 68. 🟠 P1 [Q] Implement a function that runs async tasks with a concurrency limit.

> **TL;DR:** An async concurrency pool limits the maximum number of concurrently executing asynchronous operations (e.g., maximum 3 parallel HTTP requests at any time). As an active task completes, the pool dequeues and fires the next pending task.

**💡 Core Concept & Explanation**
- **Problem Statement:** Executing `Promise.all(10000Requests)` attempts 10,000 concurrent network sockets, causing browser socket exhaustion or API rate limiting.
- **Worker Pool Pattern:** Maintains an active set of running task promises `executing = new Set()`. When `executing.size >= limit`, `await Promise.race(executing)` pauses the task launcher loop until at least one inflight task completes.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function asyncPool(concurrencyLimit, tasks) {
  const results = [];
  const executing = new Set();

  for (const [index, taskFn] of tasks.entries()) {
    // Wrap task execution to track completion
    const promise = Promise.resolve().then(() => taskFn()).then(res => {
      results[index] = res;
      executing.delete(promise); // Remove completed task from active pool
      return res;
    });

    results[index] = promise;
    executing.add(promise);

    // Pause launcher loop if concurrency limit is reached
    if (executing.size >= concurrencyLimit) {
      await Promise.race(executing);
    }
  }

  await Promise.all(results);
  return Promise.all(results);
}

// Usage Test: 5 tasks running with max concurrency limit of 2
const mockTask = (id, delay) => () => new Promise(res => {
  console.log(`Task ${id} started`);
  setTimeout(() => {
    console.log(`Task ${id} finished`);
    res(id);
  }, delay);
});

const tasks = [
  mockTask(1, 1000), mockTask(2, 500),
  mockTask(3, 300),  mockTask(4, 800), mockTask(5, 200)
];

asyncPool(2, tasks).then(res => console.log('All completed:', res));
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Eager Execution Bug:** Passing pre-created promises `[fetch(), fetch()]` to `asyncPool` starts network requests immediately before `asyncPool` even runs! Tasks MUST be passed as zero-argument factory functions `[() => fetch(), () => fetch()]`.

---

### 69. 🟠 P1 [Q] Implement an EventEmitter with on(), off(), once(), and emit().

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
### 70. 🔴 P0 [P] What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?

> **TL;DR:** Array `push`/`pop` operate in $O(1)$ amortized time. `shift`/`unshift` operate in $O(N)$ time due to memory element re-indexing. `includes`/`indexOf` are $O(N)$ linear scans. `Map`/`Set` operations are $O(1)$ amortized lookups. `Array.prototype.sort()` is $O(N \log N)$ (V8 Timsort).

**💡 Core Concept & Explanation**
Understanding JavaScript engine internals (V8) prevents accidental performance traps in problem solving:
- **`shift()` / `unshift()` Cost:** Operating at index 0 requires the V8 engine to re-index and shift every single remaining element in memory by 1 position ($O(N)$ operation). Calling `shift()` inside a loop creates an unintentional $O(N^2)$ algorithm!
- **`Map` / `Set` vs `Object` / `Array`:** `Set.prototype.has()` and `Map.prototype.get()` use hash tables for $O(1)$ lookup time, whereas `Array.prototype.includes()` performs an $O(N)$ linear scan.
- **`Array.prototype.sort()`:** Implements **Timsort** (hybrid insertion sort + merge sort), running in $O(N \log N)$ time. Default sorting coerces elements to strings alphabetically (`[10, 2].sort()` yields `[10, 2]`), requiring an explicit numeric comparator function `(a, b) => a - b`.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Benchmark Example: Array shift() vs Index Increment Pointer
const N = 100000;
const arr = new Array(N).fill(1);

// ❌ Inefficient: shift() takes O(N^2) total time for N elements
console.time('shift');
const arrCopy = [...arr];
while (arrCopy.length > 0) {
  arrCopy.shift(); // O(N) operation inside O(N) loop!
}
console.timeEnd('shift'); // ~2000ms!

// ✅ Efficient: Pointer increment takes O(N) total time
console.time('pointer');
let head = 0;
while (head < arr.length) {
  head++; // O(1) operation inside O(N) loop!
}
console.timeEnd('pointer'); // ~1ms!
```

| Operation | Time Complexity | Auxiliary Space | Engine Internal / Notes |
| :--- | :--- | :--- | :--- |
| `Array.push(x)` / `pop()` | $O(1)$ Amortized | $O(1)$ | Appends/removes at array tail. |
| `Array.unshift(x)` / `shift()` | **$O(N)$** | $O(1)$ | Re-indexes all $N$ elements in memory. |
| `Array.includes(x)` / `indexOf(x)` | $O(N)$ | $O(1)$ | Linear scan from index 0 to $N-1$. |
| `Set.has(x)` / `Map.get(key)` | **$O(1)$ Amortized** | $O(N)$ | Hash table bucket lookup. |
| `Array.sort((a,b) => a-b)` | $O(N \log N)$ | $O(N)$ | V8 Timsort algorithm. |
| String Concatenation (`a + b`) | $O(N + M)$ | $O(N + M)$ | Creates new immutable string in heap memory. |

**⚠️ Interview Pitfall / Pro-Tip**
- **Default Sort Trap:** `[10, 2, 5, 1, 20].sort()` outputs `[1, 10, 2, 20, 5]`! In JavaScript, `.sort()` converts numbers to UTF-16 strings by default. Always pass `(a, b) => a - b` for ascending numerical sorting.

---

### 71. 🟠 P1 [Q] How do you implement a stack and a queue in JavaScript, and why is shift() inefficient for a queue?

> **TL;DR:** Stacks follow LIFO (Last-In, First-Out) using $O(1)$ `push()` and `pop()`. Queues follow FIFO (First-In, First-Out). Modeling a Queue with `shift()` causes $O(N)$ element re-indexing on every dequeue. Efficient Queues use Object hash maps with pointers or two-stack algorithms for $O(1)$ operations.

**💡 Core Concept & Explanation**
- **Stack:** Operates at the end of the array. `push()` and `pop()` execute in $O(1)$ constant time.
- **Queue:** Operates at opposite ends (enqueue at tail, dequeue at head). Using `Array.prototype.shift()` requires re-allocating memory indices for all remaining $N-1$ elements.
- **$O(1)$ Queue Solution:** Maintain `head` and `tail` index pointers on a JavaScript Object map.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Stack Implementation (LIFO) -> O(1) operations
class Stack {
  constructor() { this.items = []; }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// 2. High-Performance Queue Implementation (FIFO) -> O(1) operations (No shift!)
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head]; // Clean up memory
    this.head++;
    return item;
  }
  peek() {
    return this.items[this.head];
  }
  isEmpty() {
    return this.tail - this.head === 0;
  }
  size() {
    return this.tail - this.head;
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Memory Leaks in Pointer Queues:** In pointer-based object queues, forgetting `delete this.items[this.head]` retains references to dequeued items, preventing garbage collection and causing memory leaks!

---

### 72. 🔴 P0 [Q] Reverse a string and check whether it is a palindrome, with and without built-in methods.

> **TL;DR:** Built-in string reversal (`str.split('').reverse().join('')`) requires $O(N)$ time and $O(N)$ auxiliary space. The Two-Pointer technique compares characters from both ends inward, checking palindromes in $O(N)$ time with $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
- **Sanitization:** Palindrome checks must ignore case and non-alphanumeric characters using Regex `/[^a-z0-9]/gi`.
- **Two-Pointer Efficiency:** Move `left` pointer rightward and `right` pointer leftward simultaneously. Stop if characters mismatch. Avoids allocating intermediate array instances in heap memory.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Method 1: Two-Pointer Approach -> O(N) Time, O(1) Auxiliary Space
function isPalindromeTwoPointer(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Method 2: Built-in Array Reversal -> O(N) Time, O(N) Space
function isPalindromeBuiltIn(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = clean.split('').reverse().join('');
  return clean === reversed;
}

console.log(isPalindromeTwoPointer("A man, a plan, a canal: Panama")); // true
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Unicode Surrogate Pair Trap:** `str.split('')` breaks multi-byte Unicode characters (e.g. emojis 😃). Use Array spread `[...str].reverse().join('')` or `String.prototype.codePointAt()` for full Unicode safety.

---

### 73. 🔴 P0 [Q] Check whether two strings are anagrams.

> **TL;DR:** Two strings are anagrams if they contain identical character frequencies. Sorting takes $O(N \log N)$ time. Frequency counter hash maps verify anagrams in $O(N)$ time and $O(1)$ auxiliary space (max 26/128 characters).

**💡 Core Concept & Explanation**
1. **Length Check:** If `str1.length !== str2.length`, return `false` immediately.
2. **Frequency Map:** Count character frequencies in string 1, then decrement counts using string 2. If any count drops below 0 or remains non-zero, they are not anagrams.

**🛠️ Code / Visual Diagram / Table**

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freqMap = {};

  for (let char of s) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  for (let char of t) {
    if (!freqMap[char]) {
      return false; // Character missing or frequency exceeded
    }
    freqMap[char]--;
  }

  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("rat", "car"));       // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Sorting Shortcut:** `s.split('').sort().join('') === t.split('').sort().join('')` is simple $O(N \log N)$ code, but interviewers explicitly ask for $O(N)$ linear hash map solutions.

---

### 74. 🔴 P0 [Q] Count character frequencies in a string and find the first non-repeating character.

> **TL;DR:** Use a `Map` to count character frequencies in a single pass. JavaScript `Map` preserves key insertion order, allowing the first character with a frequency count of `1` to be identified in a second linear scan in $O(N)$ time and $O(U)$ space.

**💡 Core Concept & Explanation**
- **Insertion-Order Guarantee:** Unlike plain objects prior to ES6, JavaScript `Map` guarantees iteration over keys in exact insertion order.
- **Two-Pass Algorithm:**
  1. Pass 1: Build frequency map `{ char -> count }`.
  2. Pass 2: Iterate string or map keys to find the first entry with `count === 1`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function firstUniqChar(s) {
  const charCounts = new Map();

  // Pass 1: Build Frequency Map
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }

  // Pass 2: Find First Character with Count 1
  for (let i = 0; i < s.length; i++) {
    if (charCounts.get(s[i]) === 1) {
      return i; // Return index (or s[i] for character)
    }
  }

  return -1; // No unique character found
}

console.log(firstUniqChar("leetcode"));     // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Nested `indexOf` Trap:** Using `s.indexOf(char) === s.lastIndexOf(char)` inside a loop runs in $O(N^2)$ time! The two-pass `Map` solution achieves linear $O(N)$ performance.

---

### 75. 🟠 P1 [Q] Reverse the words in a sentence and capitalize the first letter of each word.

> **TL;DR:** Split the sentence into words using Regex `/\s+/` (handling multiple spaces), transform each word by capitalizing the first letter and reversing or mapping characters, and join back into a single space-separated string in $O(N)$ time.

**💡 Core Concept & Explanation**
1. **Sanitization:** `str.trim().split(/\s+/)` strips leading/trailing spaces and handles multiple contiguous spaces.
2. **Transformation:** Capitalize `word[0].toUpperCase()` and append `word.slice(1)`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function reverseWordsAndCapitalize(sentence) {
  if (!sentence || typeof sentence !== 'string') return '';

  return sentence
    .trim()
    .split(/\s+/)
    .reverse() // Reverse order of words in sentence
    .map(word => {
      if (word.length === 0) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

console.log(reverseWordsAndCapitalize("  hello   world  javascript  "));
// Output: "Javascript World Hello"
```

**⚠️ Interview Pitfall / Pro-Tip**
- **String Immutability:** Strings in JavaScript are immutable. Concatenating strings in loops allocates new strings. Array `map()` and `join(' ')` is the optimal idiom.

---

### 76. 🟠 P1 [Q] Check whether a string of brackets is valid using a stack.

> **TL;DR:** Push opening brackets `(`, `{`, `[` onto an array stack. When encountering a closing bracket `)`, `}`, `]`, pop from the stack and verify matching bracket pairs using a map lookup. Return `true` if the stack is completely empty at the end.

**💡 Core Concept & Explanation**
- **LIFO Stack Matching:** The most recently opened bracket must be closed first.
- **Algorithm:**
  1. Map closing brackets to opening counterparts: `{ ')': '(', '}': '{', ']': '[' }`.
  2. Iterate string: if opening bracket, `stack.push(char)`.
  3. If closing bracket, `stack.pop()` and compare. If mismatch or stack was empty, return `false`.
  4. Final check: `stack.length === 0`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function isValidParentheses(s) {
  if (s.length % 2 !== 0) return false; // Odd length cannot be valid!

  const stack = [];
  const matchingMap = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (matchingMap[char]) {
      // Closing bracket encountered
      const top = stack.pop();
      if (top !== matchingMap[char]) {
        return false;
      }
    } else {
      // Opening bracket encountered
      stack.push(char);
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("(]"));     // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Length Parity Optimization:** An odd-length bracket string can NEVER be balanced. Checking `if (s.length % 2 !== 0) return false;` at line 1 provides an instant $O(1)$ fast-path return.

---

### 77. 🔴 P0 [Q] Find the largest and second-largest numbers in an array without sorting.

> **TL;DR:** Maintain two pointers `max1` and `max2` initialized to `-Infinity`. Iterate through the array once in $O(N)$ time and $O(1)$ auxiliary space, updating pointers dynamically without sorting (which takes $O(N \log N)$ time).

**💡 Core Concept & Explanation**
- **Single Pass Logic:**
  - If `num > max1`: `max2 = max1; max1 = num;`
  - Else if `num > max2 && num !== max1`: `max2 = num;`

**🛠️ Code / Visual Diagram / Table**

```javascript
function findTwoLargest(nums) {
  if (!Array.isArray(nums) || nums.length < 2) {
    return { max1: null, max2: null };
  }

  let max1 = -Infinity;
  let max2 = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num !== max1) {
      max2 = num;
    }
  }

  return {
    max1: max1 === -Infinity ? null : max1,
    max2: max2 === -Infinity ? null : max2
  };
}

console.log(findTwoLargest([12, 35, 1, 10, 34, 1])); // { max1: 35, max2: 34 }
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Duplicate Elements Gotcha:** If the array contains duplicates `[10, 10, 9]`, ask the interviewer if "second largest" means distinct value (`9`) or second index position (`10`). The `num !== max1` guard handles distinct values.

---

### 78. 🔴 P0 [Q] Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.

> **TL;DR:** Brute-force nested loops check all pairs in $O(N^2)$ time. A Hash Map stores seen numbers and their array indices `map.set(num, index)`, checking if `complement = target - num` exists in a single linear pass in $O(N)$ time and $O(N)$ space.

**💡 Core Concept & Explanation**
- **Mathematical Identity:** For each number $x$, we need $y$ such that $x + y = target \implies y = target - x$.
- **Hash Map Lookup:** Checking if $y$ exists in a Hash Map takes $O(1)$ time, reducing time complexity from $O(N^2)$ to $O(N)$.

**🛠️ Code / Visual Diagram / Table**

```javascript
function twoSum(nums, target) {
  const map = new Map(); // Stores { number -> index }

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (map.has(complement)) {
      return [map.get(complement), i]; // Pair found!
    }

    map.set(num, i); // Store current number and index
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Same Element Reuse:** Ensure you check `map.has(complement)` BEFORE adding the current element `map.set(num, i)` into the map, preventing an element from matching with itself when `target = 2 * num`.

---

### 79. 🟠 P1 [Q] Find the missing number in an array containing 1 to n.

> **TL;DR:** Calculate expected sum using Gauss's formula $S = rac{N(N+1)}{2}$ and subtract the actual array sum in $O(N)$ time and $O(1)$ space. Alternatively, use XOR bitwise properties ($x \oplus x = 0$) to eliminate overflow risks.

**💡 Core Concept & Explanation**
1. **Gauss Sum Approach:** Sum of integers from $1$ to $N$ is $rac{N(N+1)}{2}$. Expected Sum $-$ Actual Sum $=$ Missing Number.
2. **Bitwise XOR Approach:** XORing a number by itself yields $0$ ($A \oplus A = 0$). XORing all indices $1..N$ with all array values cancels out all present numbers, leaving only the missing number!

**🛠️ Code / Visual Diagram / Table**

```javascript
// Method 1: Math Sum Formula -> O(N) Time, O(1) Space
function findMissingNumberMath(nums, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, val) => acc + val, 0);
  return expectedSum - actualSum;
}

// Method 2: Bitwise XOR -> O(N) Time, O(1) Space (Overflow-Safe)
function findMissingNumberXOR(nums, n) {
  let xorSum = 0;

  // XOR all numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    xorSum ^= i;
  }

  // XOR all elements in array
  for (let num of nums) {
    xorSum ^= num;
  }

  return xorSum;
}

console.log(findMissingNumberXOR([1, 2, 4, 5, 6], 6)); // 3
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Integer Overflow:** In languages with fixed-size 32-bit integers, $N(N+1)/2$ can overflow for large $N$. In JavaScript, `Number.MAX_SAFE_INTEGER` is $2^{53} - 1$, but XOR is the gold standard for zero-overflow safety.

---

### 80. 🟠 P1 [Q] Move all zeros to the end of an array in place while preserving order.

> **TL;DR:** Use a Two-Pointer technique (`writePointer` and `readPointer`). Iterate through the array; whenever a non-zero element is found, swap it to `writePointer` and increment `writePointer`. Runs in $O(N)$ time and $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
- **Two-Pointer Swap:**
  - `writePointer`: Tracks the target index for the next non-zero element.
  - `readPointer`: Scans the array sequentially.
  - Swapping elements preserves relative order of non-zero elements while pushing zeros rightward.

**🛠️ Code / Visual Diagram / Table**

```javascript
function moveZeroes(nums) {
  let writePointer = 0;

  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      // Swap non-zero element to writePointer position
      const temp = nums[writePointer];
      nums[writePointer] = nums[readPointer];
      nums[readPointer] = temp;

      writePointer++;
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **In-Place Constraint:** Creating a new array `[...nonZeros, ...zeros]` takes $O(N)$ extra space, violating the in-place $O(1)$ space requirement. Always mutate `nums` directly.

---

### 81. 🟠 P1 [Q] Rotate an array by k positions.

> **TL;DR:** Normalize $k = k \% N$. Reverse the entire array, reverse the first $k$ elements, and reverse the remaining $N - k$ elements. Achieves $O(N)$ time complexity and $O(1)$ auxiliary space in-place.

**💡 Core Concept & Explanation**
- **3-Step Reversal Algorithm:**
  1. Normalize $k$: $k = k \% N$ (handles $k > N$).
  2. Reverse entire array: `[1, 2, 3, 4, 5, 6, 7]` $
ightarrow$ `[7, 6, 5, 4, 3, 2, 1]`
  3. Reverse first $k$ elements ($k=3$): `[5, 6, 7, 4, 3, 2, 1]`
  4. Reverse remaining elements: `[5, 6, 7, 1, 2, 3, 4]`

**🛠️ Code / Visual Diagram / Table**

```javascript
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n; // Normalize k

  function reverse(arr, start, end) {
    while (start < end) {
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }

  // 1. Reverse whole array
  reverse(nums, 0, n - 1);
  // 2. Reverse first k elements
  reverse(nums, 0, k - 1);
  // 3. Reverse remaining elements
  reverse(nums, k, n - 1);

  return nums;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`splice` / `unshift` Trap:** `nums.unshift(...nums.splice(-k))` looks short, but `unshift` re-indexes the array in $O(N 	imes k)$ time, making it far slower than the $O(N)$ 3-step reversal algorithm.

---

### 82. 🟠 P1 [Q] Merge two sorted arrays into one sorted array.

> **TL;DR:** Compare elements using two pointers starting at index 0 of both arrays. Append the smaller element to the merged output array until one array is exhausted, then append all remaining items in $O(N + M)$ time.

**💡 Core Concept & Explanation**
- **Two-Pointer Merge:**
  - Pointer `i` for `arr1`, Pointer `j` for `arr2`.
  - Compare `arr1[i]` vs `arr2[j]`. Push smaller item and increment pointer.
  - Flush remaining items once one pointer reaches array bounds.

**🛠️ Code / Visual Diagram / Table**

```javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // Flush remaining elements
  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

console.log(mergeSortedArrays([1, 3, 5, 7], [2, 4, 6, 8])); // [1, 2, 3, 4, 5, 6, 7, 8]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Naive Concatenation & Sort:** `[...arr1, ...arr2].sort((a,b) => a-b)` takes $O((N+M) \log(N+M))$ time, completely discarding the pre-sorted property of the input arrays!

---

### 83. 🟠 P1 [Q] Find the intersection of two arrays.

> **TL;DR:** Convert the first array into a `Set` for $O(1)$ lookups. Filter the second array for elements present in the `Set`, returning distinct common elements in $O(N + M)$ time.

**💡 Core Concept & Explanation**
- **Set Lookup:** `set.has(item)` is an $O(1)$ amortized hash table lookup.
- **Duplicates Handling:** To ensure unique intersection values, wrap the final filtered array in `Array.from(new Set(...))`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const resultSet = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      resultSet.add(num);
    }
  }

  return Array.from(resultSet);
}

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Intersection with Multiplicity:** If duplicate frequencies matter (e.g. `[2, 2]` intersecting `[2, 2]` should return `[2, 2]`), use a frequency map counter instead of a `Set`.

---

### 84. 🟠 P1 [Q] Split an array into chunks of size n.

> **TL;DR:** Iterate through an array using a `for` loop with step size `n`, slicing sub-arrays `arr.slice(i, i + n)` and appending them into a master chunk array in $O(N)$ time.

**💡 Core Concept & Explanation**
- `Array.prototype.slice(start, end)` extracts a portion of an array into a new array object without mutating the original array. If `end > arr.length`, `slice` safely stops at the array end.

**🛠️ Code / Visual Diagram / Table**

```javascript
function chunkArray(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];

  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7]]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`splice` Mutative Bug:** Using `arr.splice(0, size)` mutates and destroys the original input array! Always use non-mutative `slice()`.

---

### 85. 🟠 P1 [Q] Implement binary search on a sorted array.

> **TL;DR:** Maintain `low` and `high` pointers. Calculate `mid = low + Math.floor((high - low) / 2)`. Adjust pointers based on target comparison. Reduces search space by half each iteration in $O(\log N)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **Pre-requisite:** Array MUST be sorted.
- **Integer Overflow Protection:** Instead of `(low + high) / 2`, use `low + Math.floor((high - low) / 2)` to prevent overflow in 32-bit systems.

**🛠️ Code / Visual Diagram / Table**

```javascript
function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (nums[mid] === target) {
      return mid; // Target found, return index
    } else if (nums[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // 4
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Off-By-One Errors:** Ensure loop condition is `low <= high` (NOT `low < high`), otherwise single-element arrays or boundaries are skipped!

---

### 86. 🟠 P1 [Q] Compute Fibonacci recursively, iteratively, and with memoization, and compare their time complexities.

> **TL;DR:** Naive recursion takes exponential $O(2^N)$ time due to overlapping subproblem recalculations. Memoization reduces time to $O(N)$ with $O(N)$ call stack space. Iterative DP computes in $O(N)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **Formula:** $F(n) = F(n-1) + F(n-2)$, with $F(0)=0, F(1)=1$.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Naive Recursion -> O(2^N) Time, O(N) Call Stack
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 2. Memoized (Top-Down DP) -> O(N) Time, O(N) Space
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 3. Iterative (Bottom-Up DP) -> O(N) Time, O(1) Space
function fibIterative(n) {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;
  let current = 0;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}
```

| Approach | Time Complexity | Auxiliary Space | Call Stack Risk |
| :--- | :--- | :--- | :--- |
| **Naive Recursion** | $O(2^N)$ | $O(N)$ | High (`RangeError: Maximum call stack size exceeded`) |
| **Memoized DP** | $O(N)$ | $O(N)$ | Moderate for large $N$ |
| **Iterative DP** | **$O(N)$** | **$O(1)$** | **None (Optimal)** |

**⚠️ Interview Pitfall / Pro-Tip**
- Calling `fibRecursive(50)` will freeze the JS execution thread for minutes due to $2^{50} pprox 1.12 	imes 10^{15}$ function calls!

---

### 87. 🟠 P1 [Q] Implement a singly linked list and reverse it.

> **TL;DR:** Maintain `prev = null`, `current = head`, `next = null`. Iterate through nodes, reversing pointer references `current.next = prev` in $O(N)$ time and $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
- **Pointer Manipulation:** At each step, preserve `next = current.next`, flip `current.next = prev`, advance `prev = current`, and move `current = next`.

**🛠️ Code / Visual Diagram / Table**

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // 1. Save next node
    current.next = prev;           // 2. Reverse pointer direction
    prev = current;                // 3. Advance prev pointer
    current = nextTemp;            // 4. Advance current pointer
  }

  return prev; // New head of reversed list
}

// Helper: Convert Array to LinkedList
const head = new ListNode(1, new ListNode(2, new ListNode(3)));
const reversed = reverseLinkedList(head); // 3 -> 2 -> 1
```

```
Initial:  (1) -> (2) -> (3) -> null
Step 1:   null <- (1)    (2) -> (3) -> null
Step 2:   null <- (1) <- (2)    (3) -> null
Step 3:   null <- (1) <- (2) <- (3)  (new head = 3)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Losing Next Reference:** Forgetting to store `const nextTemp = current.next` BEFORE assigning `current.next = prev` breaks pointer links, causing orphaned nodes and infinite loops!

---
### 88. 🔴 P0 [C] What is TypeScript, how does it relate to JavaScript, and why doesn't it check types at runtime (type erasure)?

> **TL;DR:** TypeScript is a statically typed superset of JavaScript that compiles down to plain JavaScript. All type annotations are erased during compilation (Type Erasure), meaning zero type-checking overhead occurs at JavaScript runtime.

**💡 Core Concept & Explanation**
- **Compile-Time vs Runtime:** The TypeScript Compiler (`tsc`) checks types strictly during build time. Once compiled, all interface, type, and generic syntax is completely stripped out, emitting standard JavaScript (ES6+).
- **Type Erasure Mechanism:** Because types are erased, TypeScript types do NOT exist at runtime. Calling `typeof user` at runtime returns `"object"`, regardless of whether `user` was defined as `interface User { name: string }`.
- **Runtime Validation:** For network API calls or user inputs, runtime validation libraries (such as `Zod`, `Valibot`, or custom Type Predicates) are required.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. TypeScript Source Code (Build Time)
interface User {
  id: number;
  name: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}`;
}

// 2. Compiled JavaScript Output (Runtime Emitted Output)
function greet(user) {
  return "Hello, " + user.name;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Runtime Type Inspection Trap:** Writing `if (val instanceof UserInterface)` throws a runtime `ReferenceError: UserInterface is not defined` because interfaces are erased. Only JavaScript classes (`class UserClass`) exist at runtime as constructor functions and can be checked with `instanceof`.

---

### 89. 🔴 P0 [C] How does type inference work, and when should you add explicit type annotations?

> **TL;DR:** TypeScript automatically infers types based on variable initializers, default values, and function return values (Contextual Typing). Explicit type annotations should be added for uninitialized variables, function parameters, exported public API boundaries, or when overriding default inference.

**💡 Core Concept & Explanation**
- **Type Inference:** When initializing `let count = 10`, TS infers `count: number` automatically.
- **`noImplicitAny` Compiler Flag:** When parameters are un-annotated (`function log(msg)`), TS defaults `msg` to `any`. Enabling `noImplicitAny: true` in `tsconfig.json` forces explicit annotations.
- **When to Annotate Explicitly:**
  1. Function parameters (`(x: number, y: string)`).
  2. Variables declared without immediate initialization (`let user: User;`).
  3. Exported functions / library public API contracts (improves build speed and documentation clarity).

**🛠️ Code / Visual Diagram / Table**

```typescript
// ✅ Good: Automatic Type Inference
let age = 25; // Inferred as number
const name = "Alice"; // Inferred as literal type "Alice"
const numbers = [1, 2, 3]; // Inferred as number[]

// ✅ Good: Explicit Annotations required
let user: { id: number; role: string }; // Uninitialized variable

function calculateTotal(price: number, taxRate: number): number {
  return price + price * taxRate; // Parameter types MUST be explicit
}

// ❌ Avoid: Redundant Annotations (Noise)
let count: number = 10; // Redundant! 'let count = 10' is cleaner.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Wider vs Narrower Inference (`let` vs `const`):** `let x = "hello"` is inferred widely as `string` (since `x` can be reassigned). `const x = "hello"` is inferred narrowly as literal type `"hello"`.

---

### 90. 🔴 P0 [Q] What is the difference between type and interface, and when would you use each?

> **TL;DR:** `interface` is designed for object shapes and supports Declaration Merging (open for extension). `type` aliases can represent objects, primitives, unions (`A | B`), tuples, and mapped types. Use `interface` for object-oriented designs and public library APIs; use `type` for complex union types and utility logic.

**💡 Core Concept & Explanation**
- **Declaration Merging:** Multiple `interface` declarations with the exact same name in the same scope merge their properties into a single interface. `type` aliases cannot be re-declared.
- **Union Types:** `type Point = { x: number } | { y: number }` is valid, whereas an `interface` cannot directly alias a union.

**🛠️ Code / Visual Diagram / Table**

| Feature | `interface` | `type` Alias |
| :--- | :--- | :--- |
| **Primary Purpose** | Object shapes & Class contracts | Any type definition (Unions, Primitives, Tuples) |
| **Declaration Merging** | **Supported** (Open for extension) | Not Supported (`Duplicate identifier`) |
| **Unions & Intersections** | Cannot directly define unions | **Supported** (`type X = A \| B`) |
| **Extends Syntax** | `interface B extends A` | Intersection `type B = A & { ... }` |

```typescript
// 1. Declaration Merging (Interface only)
interface Window {
  customProp: string;
}
interface Window {
  anotherProp: number;
}
// Merged Window interface has BOTH customProp AND anotherProp!

// 2. Unions & Tuples (Type only)
type Status = "pending" | "success" | "error";
type Point2D = [number, number];
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Library API Rule:** When building a library or NPM package, use `interface` for public configuration options so consumers can extend them via declaration merging if needed.

---

### 91. 🟠 P1 [C] What is structural typing, and how does it differ from nominal typing?

> **TL;DR:** TypeScript uses a Structural Type System ("duck typing"): two types are compatible if their internal shapes/properties match, regardless of how or where they were named. Languages like Java/C# use Nominal Typing, where type compatibility requires explicit class inheritance or interface implementation.

**💡 Core Concept & Explanation**
- **Structural Equivalence:** If object `A` has at least all required properties of type `T` with matching types, `A` is assignable to `T`.
- **Nominal Emulation (Branded Types):** To enforce nominal typing (e.g., preventing a `UserId` string from being accidentally passed to a `OrderId` parameter), TS developers use Branded/Tagged types (`type UserId = string & { readonly __brand: unique symbol }`).

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Point {
  x: number;
  y: number;
}

class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function printPoint(p: Point) {
  console.log(`x: ${p.x}, y: ${p.y}`);
}

const vec = new Vector2D(10, 20);
printPoint(vec); // ✅ Valid! Vector2D matches the shape of Point structurally!

// Branded Types Example (Nominal Emulation)
type USD = number & { readonly __brand: "USD" };
type EUR = number & { readonly __brand: "EUR" };

let usd = 100 as USD;
let eur = 100 as EUR;
// usd = eur; // ❌ Compile Error: Type '"EUR"' is not assignable to type '"USD"'
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Excess Property Checks:** Passing an object literal directly `printPoint({ x: 1, y: 2, z: 3 })` triggers Excess Property Checking and throws a compile error. Assigning to a intermediate variable `const obj = { x: 1, y: 2, z: 3 }; printPoint(obj);` succeeds due to structural subtyping!

---

### 92. 🔴 P0 [Q] What is the difference between any, unknown, and never?

> **TL;DR:** `any` disables all type-checking (unsafe escape hatch). `unknown` is the type-safe top type that represents any value but requires Type Narrowing before performing operations. `never` is the bottom type representing values that can never occur (unreachable code, functions that throw errors or loop infinitely).

**💡 Core Concept & Explanation**
- **`any`:** Turns off type checker. `any.foo.bar()` compiles without errors, causing runtime crashes.
- **`unknown`:** Accepts any value, but TS blocks property access, method calls, or assignments until narrowed via `typeof`, `instanceof`, or type assertions.
- **`never`:** Subtype of every type, but no type is assignable to `never` (except `never` itself). Used for exhaustiveness checks in switch statements.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. any (Unsafe)
let valAny: any = "hello";
valAny.nonExistentMethod(); // ✅ Compiles fine -> Runtime Crash!

// 2. unknown (Safe Top Type)
let valUnknown: unknown = "hello";
// valUnknown.toUpperCase(); // ❌ Compile Error: Object is of type 'unknown'.

if (typeof valUnknown === "string") {
  console.log(valUnknown.toUpperCase()); // ✅ Valid after narrowing!
}

// 3. never (Bottom Type)
function throwError(msg: string): never {
  throw new Error(msg); // Never returns!
}
```

| Type | Assignable to `unknown`? | Assignable from `unknown`? | Allows Arbitrary Property Access? |
| :--- | :--- | :--- | :--- |
| **`any`** | Yes | Yes | Yes (Unsafe) |
| **`unknown`** | Yes | No (Requires Narrowing) | No (Type Safe) |
| **`never`** | Yes | No | No |

**⚠️ Interview Pitfall / Pro-Tip**
- Avoid `any` in production code. Prefer `unknown` for third-party API data or dynamic payloads, forcing callers to safely narrow types before access.

---

### 93. 🔴 P0 [Q] What are union and intersection types, and how do literal types work?

> **TL;DR:** Union types (`A | B`) allow a value to be one of several specified types. Intersection types (`A & B`) combine multiple type definitions into a single composite type requiring all properties. Literal types constrain values to exact specific strings, numbers, or booleans.

**💡 Core Concept & Explanation**
- **Set Theory Math:**
  - **Union ($A \cup B$):** Property access is limited to common properties shared by both types unless narrowed.
  - **Intersection ($A \cap B$):** Combines all properties of both types into a single unified type.
- **Literal Types:** `type Direction = "North" | "South" | "East" | "West";`. Restricts variable assignments exclusively to those exact string values.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Union Types (|)
type Id = string | number;
function printId(id: Id) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // Narrowed to string
  } else {
    console.log(id.toFixed(2)); // Narrowed to number
  }
}

// 2. Intersection Types (&)
interface Person {
  name: string;
}
interface Loggable {
  log(): void;
}

type Employee = Person & Loggable;

const emp: Employee = {
  name: "Alice",
  log() { console.log(this.name); }
};

// 3. String Literal Types
type Theme = "light" | "dark" | "system";
let currentTheme: Theme = "dark"; // ✅ Valid
// currentTheme = "blue"; // ❌ Compile Error!
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Conflicting Intersection Trap:** Intersecting primitive types `type Impossible = string & number` evaluates to `never`, because a value can never be both a string and a number simultaneously.

---

### 94. 🟠 P1 [Q] How do optional properties, null/undefined, and strictNullChecks work, what does strict mode enable, and what does readonly do?

> **TL;DR:** Optional properties (`prop?: T`) permit properties to be `T | undefined`. `strictNullChecks` prevents implicit assignment of `null`/`undefined` to other types. `strict: true` enables full type-checking rigor. `readonly` prevents property reassignment at compile-time.

**💡 Core Concept & Explanation**
- **`strictNullChecks: true`:** Without this flag, `null` and `undefined` are assignable to any type (`let s: string = null;` compiles!). Enabling `strictNullChecks` forces explicit handling of `null` and `undefined`.
- **`readonly` Modifier:** Marks properties or arrays immutable for compiler operations.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Optional Properties & strictNullChecks
interface UserProfile {
  id: number;
  nickname?: string; // Type is: string | undefined
}

function getUpperNickname(user: UserProfile): string {
  // return user.nickname.toUpperCase(); // ❌ Error under strictNullChecks!
  return user.nickname ? user.nickname.toUpperCase() : "ANONYMOUS";
}

// 2. Readonly Properties
interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

const p: Point3D = { x: 10, y: 20, z: 30 };
// p.x = 50; // ❌ Compile Error: Cannot assign to 'x' because it is a read-only property.

// Readonly Array
const readonlyNums: ReadonlyArray<number> = [1, 2, 3];
// readonlyNums.push(4); // ❌ Compile Error: Property 'push' does not exist on type 'ReadonlyArray'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`readonly` Shallow Immutability:** `readonly` prevents reassigning the property reference itself (`p.x = 50`), but does NOT deeply freeze nested object properties at runtime. Use `Object.freeze()` for runtime immutability.

---

### 95. 🔴 P0 [Q] What is type narrowing, and how do typeof, instanceof, in, and custom type predicates (x is T) narrow types?

> **TL;DR:** Type Narrowing refines a broad type (like `string | number` or `unknown`) into a specific concrete type using JavaScript control flow guards (`typeof`, `instanceof`, `in`) or user-defined Type Predicates (`fn(x): x is TargetType`).

**💡 Core Concept & Explanation**
1. **Control Flow Analysis:** TypeScript analyzes conditional code paths (`if`, `switch`, `return`) to narrow variable types automatically within each branch.
2. **Type Guards:**
   - `typeof x === "string"`: Narrows primitive types.
   - `x instanceof ClassName`: Narrows class instances along prototype chain.
   - `'prop' in obj`: Narrows object union types based on key existence.
   - **Custom Type Predicate:** A function returning `param is Type` boolean signature.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Dog { walk(): void; }
interface Fish { swim(): void; }

// Custom Type Predicate (x is Fish)
function isFish(pet: Dog | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Dog | Fish) {
  if (isFish(pet)) {
    pet.swim(); // ✅ TS knows pet is Fish here!
  } else {
    pet.walk(); // ✅ TS knows pet is Dog here!
  }
}

// typeof & instanceof narrowing
function processInput(val: string | Date) {
  if (val instanceof Date) {
    console.log(val.toISOString()); // Narrowed to Date
  } else {
    console.log(val.toUpperCase());  // Narrowed to string
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`typeof null` Trap:** `typeof null` evaluates to `"object"` in JavaScript! Writing `if (typeof val === "object")` does NOT narrow out `null`. You MUST write `if (val !== null && typeof val === "object")`.

---

### 96. 🟠 P1 [Q] What is a discriminated union, and how do you use never for exhaustive checks?

> **TL;DR:** A Discriminated Union combines object types sharing a common literal property (the "discriminant", e.g. `kind: 'circle' | 'square'`). Matching on the discriminant in a `switch` statement with a `default` case returning a `never` assignment enforces compile-time exhaustiveness checking.

**💡 Core Concept & Explanation**
- **Discriminant Property:** A single shared literal property (e.g. `type`, `kind`, `status`) present on all members of a union.
- **Exhaustiveness Checking with `never`:** If a new variant is added to the union but missing from a `switch` statement, assigning the unhandled variant to a variable of type `never` triggers a compile-time error.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  size: number;
}
interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function assertUnreachable(x: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(x)}`);
}

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size * shape.size;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      return assertUnreachable(shape); // ✅ Ensures all shapes are handled at compile time!
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- If a developer adds a new `Rectangle` shape to the `Shape` union without updating `calculateArea`, the `default: assertUnreachable(shape)` line immediately fails compilation: `Type 'Rectangle' is not assignable to type 'never'`.

---

### 97. 🟠 P1 [Q] How do you type function parameters, return values, optional/default parameters, and callbacks, and what are function overloads?

> **TL;DR:** Function signatures specify parameter types, return types, optional/default args (`(x: number, y = 10) => number`), and callbacks. Function Overloads declare multiple public type signatures backed by a single flexible implementation signature.

**💡 Core Concept & Explanation**
- **Function Overloads:** Useful when a function's return type varies depending on the input parameter types (e.g., passing a `string` returns a `string`, passing a `number` returns a `number`).
- **Implementation Signature:** Must be broad enough to encompass all overload signatures, but is NOT directly visible to consumers.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Function Overload Signatures (Public API)
function format(val: string): string;
function format(val: number): string;
function format(val: boolean): string;

// 2. Single Implementation Signature (Internal)
function format(val: string | number | boolean): string {
  if (typeof val === "string") return val.trim();
  if (typeof val === "number") return `$${val.toFixed(2)}`;
  return val ? "TRUE" : "FALSE";
}

const res1 = format(" hello "); // res1 typed as string
const res2 = format(49.99);     // res2 typed as string

// Callback Function Signature
type EventListenerCallback = (event: string, timestamp: number) => void;
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Overload Implementation Visibility:** The implementation signature `function format(val: any)` is hidden from callers. Callers can ONLY invoke signatures explicitly listed in the top overload declarations.

---

### 98. 🔴 P0 [Q] What are generics, how do you write generic functions, interfaces, and types, and how do generic constraints (extends) work?

> **TL;DR:** Generics enable creating reusable, type-safe code components using Type Variables (`<T>`). Generic Constraints (`<T extends Constraint>`) restrict the set of valid types allowed for a generic parameter.

**💡 Core Concept & Explanation**
- **Type Variables (`<T>`):** Act as placeholders for types passed in by callers or inferred by the compiler.
- **Constraints (`extends`):** Ensures a generic type parameter possesses specific properties (`<T extends { length: number }>`).

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Generic Function
function identity<T>(arg: T): T {
  return arg;
}

// 2. Generic Interface
interface ApiResponse<TData> {
  status: number;
  success: boolean;
  data: TData;
}

interface User { name: string; }
type UserResponse = ApiResponse<User>;

// 3. Generic Constraints (extends)
function logLength<T extends { length: number }>(arg: T): number {
  console.log(arg.length);
  return arg.length;
}

logLength("hello");       // ✅ String has .length property
logLength([1, 2, 3]);     // ✅ Array has .length property
// logLength(123);        // ❌ Compile Error: Argument of type 'number' is not assignable to parameter of type '{ length: number }'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Over-Using Generics:** Do NOT add generic parameters if the type parameter appears only once in the signature without relating to return types or other arguments. Use simple types instead.

---

### 99. 🟠 P1 [Q] How do keyof and indexed access types (T[K]) work, and how do they combine with generics (e.g., a type-safe getProperty function)?

> **TL;DR:** `keyof T` produces a string/symbol union of an object type's keys. Indexed Access `T[K]` extracts the type of property `K` from type `T`. Combining them with generics `<T, K extends keyof T>(obj: T, key: K): T[K]` produces 100% type-safe object property accessors.

**💡 Core Concept & Explanation**
- `keyof User`: If `User` is `{ id: number; name: string }`, `keyof User` is `"id" | "name"`.
- `User["name"]`: Resolves to type `string`.
- `getProperty(user, "name")`: Prevents accessing invalid keys and infers exact return type.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

// Type-Safe Property Accessor Function
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const myCar: Car = { make: "Toyota", model: "Corolla", year: 2022 };

const carMake = getProperty(myCar, "make"); // Inferred as string
const carYear = getProperty(myCar, "year"); // Inferred as number

// getProperty(myCar, "color"); 
// ❌ Compile Error: Argument of type '"color"' is not assignable to parameter of type '"make" | "model" | "year"'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- Combining `keyof T` with dynamic lookup string indexes requires type assertions or mapped constraints when iterating object keys in loops (`(Object.keys(obj) as (keyof T)[]).forEach(...)`).

---

### 100. 🔴 P0 [Q] What do Partial, Required, Pick, Omit, and Record do, and when would you use each?

> **TL;DR:** Built-in Mapped Utility Types transform existing object types: `Partial<T>` makes all fields optional; `Required<T>` makes all fields required; `Pick<T, K>` selects subset keys; `Omit<T, K>` removes specified keys; `Record<K, T>` constructs an object type with key type `K` and value type `T`.

**💡 Core Concept & Explanation**
Under the hood, utility types use Mapped Type syntax:
- `Partial<T>` $
ightarrow$ `{ [P in keyof T]?: T[P] }`
- `Required<T>` $
ightarrow$ `{ [P in keyof T]-?: T[P] }`
- `Pick<T, K extends keyof T>` $
ightarrow$ `{ [P in K]: T[P] }`
- `Omit<T, K>` $
ightarrow$ `Pick<T, Exclude<keyof T, K>>`
- `Record<K extends keyof any, T>` $
ightarrow$ `{ [P in K]: T }`

**🛠️ Code / Visual Diagram / Table**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// 1. Partial<T> -> Useful for UPDATE payloads
type UserUpdatePayload = Partial<User>; // { id?: number; name?: string; email?: string; age?: number; }

// 2. Required<T> -> Forces all optional fields
type StrictUser = Required<User>; // { id: number; name: string; email: string; age: number; }

// 3. Pick<T, K> -> Extracts specific fields
type UserPreview = Pick<User, "id" | "name">; // { id: number; name: string; }

// 4. Omit<T, K> -> Strips specific fields (e.g. create payload without id)
type CreateUserDTO = Omit<User, "id">; // { name: string; email: string; age?: number; }

// 5. Record<K, T> -> Key-Value Dictionary
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
```

**⚠️ Interview Pitfall / Pro-Tip**
- `Omit` does not enforce that the key being omitted actually exists on `T` (`Omit<User, "invalidKey">` compiles silently). Prefer `Pick` when strict key checking is needed.

---

### 101. 🟠 P1 [Q] What do ReturnType and Parameters do, and when are they useful?

> **TL;DR:** `ReturnType<T>` extracts the return type of a function type `T`. `Parameters<T>` extracts a tuple type of a function type's parameter types. Both use Conditional Types and the `infer` keyword internally.

**💡 Core Concept & Explanation**
- **Third-Party Types:** Essential when working with external libraries that export functions but forget to export internal response payload types.
- **Internal Mechanisms:**
  - `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;`
  - `type Parameters<T> = T extends (...args: infer P) => any ? P : never;`

**🛠️ Code / Visual Diagram / Table**

```typescript
// Third-party API function without exported payload types
function fetchSDKConfig(endpoint: string, retries: number) {
  return {
    endpoint,
    retries,
    timeout: 5000,
    headers: { Authorization: "Bearer token" }
  };
}

// Extract Return Type dynamically!
type SDKConfig = ReturnType<typeof fetchSDKConfig>;
// Result: { endpoint: string; retries: number; timeout: number; headers: { Authorization: string }; }

// Extract Parameters Tuple dynamically!
type FetchParams = Parameters<typeof fetchSDKConfig>;
// Result: [endpoint: string, retries: number]
```

**⚠️ Interview Pitfall / Pro-Tip**
- Passing a direct function instance `ReturnType<fetchSDKConfig>` throws a compile error. You MUST pass the function's type signature using the `typeof` operator: `ReturnType<typeof fetchSDKConfig>`.

---

### 102. 🟠 P1 [Q] What is the difference between an enum and a union of string literals, and what does as const do?

> **TL;DR:** Enums emit runtime JavaScript objects with IIFEs. String literal unions (`'admin' | 'user'`) are zero-cost compile-time types. `as const` creates deeply `readonly` literal type assertions on objects and arrays without runtime code generation.

**💡 Core Concept & Explanation**
- **Enum Drawbacks:** Enums break TypeScript's rule of emitting zero runtime JS code. Numeric enums allow unsafe reverse mapping and invalid assignment numbers (`enum Status { Active }; let s: Status = 999;` compiles!).
- **`as const` Assertions:** Converts mutable types into deeply `readonly` literal types.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. String Union (Preferred - Zero Runtime Overhead)
type UserRole = "admin" | "editor" | "viewer";

// 2. as const Object Pattern (Best Practice)
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer"
} as const;

type Role = typeof ROLES[keyof typeof ROLES]; // "admin" | "editor" | "viewer"

// 3. Enum (Emits IIFE Object Code into JS output)
enum EnumRole {
  Admin = "ADMIN",
  Editor = "EDITOR"
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Prefer `const` object maps with `as const` or string unions over Enums in modern TypeScript codebases to keep emitted JS bundles minimal and prevent enum scoping gotchas.

---

### 103. 🟠 P1 [Q] How do you type an async function that fetches API data, and why should you still validate the response at runtime?

> **TL;DR:** Typing `fetch` responses using generics (`fetch<User>()` or `as User`) only asserts types at compile-time. Because network payloads can change, fail, or return unexpected data, runtime schema validation using libraries like `Zod` or custom Type Predicates is mandatory for production safety.

**💡 Core Concept & Explanation**
- **The API Trust Fallacy:** TypeScript cannot verify network data coming across the HTTP boundary. Type assertions (`const data = await res.json() as UserData`) lie to the compiler, hiding potential runtime `TypeError: Cannot read property of undefined` crashes.

**🛠️ Code / Visual Diagram / Table**

```typescript
import { z } from "zod"; // Schema validation library

// 1. Define Zod Runtime Validation Schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

// Infer TypeScript type automatically from Schema!
type User = z.infer<typeof UserSchema>;

async function fetchUserSafe(userId: number): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  const rawData = await response.json();

  // 2. Validate at RUNTIME! Throws detailed error if schema mismatches payload.
  const validatedUser = UserSchema.parse(rawData);
  return validatedUser;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Writing `const res: User = await fetch(url).then(r => r.json())` does NOT perform runtime checking. If the server returns `{ error: "500 Internal Error" }`, TS still treats `res` as a valid `User` object, crashing downstream code!

---

### 104. 🟠 P1 [Q] What are type assertions (as), what are their risks, and how do you safely handle unknown errors in catch blocks?

> **TL;DR:** Type assertions (`val as TargetType`) override TypeScript's inferred type without performing runtime data conversion. In `catch (err: unknown)` blocks, `err` defaults to `unknown` in modern TS (`useUnknownInCatchVariables`), requiring `instanceof Error` checks for safe error handling.

**💡 Core Concept & Explanation**
- **Type Assertion Risks:** `const num = "123" as unknown as number;` tricks the compiler, but `num.toFixed(2)` crashes at runtime (`TypeError: num.toFixed is not a function`).
- **Safe `catch` Error Handling:** In TypeScript 4+, catch block variables default to `unknown` instead of `any`.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Type Assertion (Use sparingly when caller knows shape better than TS)
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;

// 2. Safe Error Handling in Catch Blocks
async function executeTask() {
  try {
    await performRiskyOperation();
  } catch (err: unknown) { // In strict TS, err is unknown
    // err.message; // ❌ Compile Error: Object is of type 'unknown'.

    if (err instanceof Error) {
      console.error("Task failed cleanly:", err.message, err.stack);
    } else if (typeof err === "string") {
      console.error("String error thrown:", err);
    } else {
      console.error("Unknown error payload:", err);
    }
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Non-Null Assertion Operator (`!`):** Writing `user!.name` tells TS "trust me, user is not null". If `user` is actually `null` at runtime, it causes a `TypeError`. Prefer optional chaining `user?.name` instead.

---
