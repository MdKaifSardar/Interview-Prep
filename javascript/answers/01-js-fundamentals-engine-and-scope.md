⏮️ (start) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Functions, Closures & this ➡️](02-functions-closures-and-this.md)

---

## 1. JS Fundamentals, Engine & Scope

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

---

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

---

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

---

⏮️ (start) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Functions, Closures & this ➡️](02-functions-closures-and-this.md)
