# JavaScript Master Answer Key (Comprehensive Edition)

Companion answer key to `javascript-interview-questions.md`. Every single answer strictly follows our standardized 4-part framework designed for rapid revision AND deep conceptual mastery:

1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive breakdown of _why_ and _how_ the underlying mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working code snippet, polyfill function, ASCII flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Real-world edge cases, engine quirks, memory leak traps, and interviewer follow-up gotchas.

---

## Fundamentals

### 1. 🟠 P1 [C] What is JavaScript and what are its key characteristics?

> **TL;DR:** JavaScript is a high-level, single-threaded, dynamic, garbage-collected programming language that supports object-oriented, functional, and event-driven programming paradigms.

#### 💡 Core Concept & Explanation

JavaScript was created by Brendan Eich in 1995. Key characteristics include:

- **Single-Threaded:** Executes code sequentially on a single Call Stack using an Event Loop for asynchronous tasks.
- **Dynamically Typed:** Variables are not bound to specific data types; types are checked at runtime.
- **First-Class Functions:** Functions can be stored in variables, passed as arguments, and returned from other functions.
- **Prototypal Inheritance:** Objects inherit methods and properties via prototype chains rather than classical classes.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// First-Class Function & Dynamic Typing Example
let data = 42; // Number
data = "Hello JavaScript"; // Dynamically reassigned to String

const logMessage = function (msg) {
  console.log("Message:", msg);
};

function executeCallback(fn, payload) {
  fn(payload); // Passing function as a first-class citizen
}

executeCallback(logMessage, data);
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing JavaScript's dynamic typing with untyped execution.

---

### 2. 🟠 P1 [C] What is ECMAScript and how is it related to JavaScript?

> **TL;DR:** ECMAScript (ECMA-262) is the official standard specification that defines the rules, syntax, and features of the language. JavaScript is the implementation of that specification.

#### 💡 Core Concept & Explanation

ECMAScript provides the standard blueprint. TC39 (Technical Committee 39) manages updates:

- **ES6 (ES2015):** Major modern update introducing `let/const`, Arrow Functions, Promises, Classes, Modules, and Destructuring.
- **Yearly Releases:** ES2016 onwards introduces features incrementally (e.g. `async/await` in ES2017, `structuredClone` in ES2022).

#### 🛠️ Code / Visual Diagram / Table

```javascript
// ECMAScript Feature Evolution
// ES5
var legacyAdd = function (a, b) {
  return a + b;
};

// ES6+ (ECMAScript 2015+)
const modernAdd = (a = 0, b = 0) => a + b;
console.log(modernAdd(5, 10)); // 15
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Believing Node.js or DOM Web APIs (window, document) are part of ECMAScript — they are environment host APIs.

---

### 3. 🟠 P1 [C] Is JavaScript interpreted, compiled, or both?

> **TL;DR:** JavaScript uses Just-In-Time (JIT) compilation. Modern engines (like V8) parse code into bytecode using an interpreter, then compile hot code paths into optimized machine code at runtime.

#### 💡 Core Concept & Explanation

V8 Engine Execution Pipeline:

- **Parser:** Converts code into an Abstract Syntax Tree (AST).
- **Ignition Interpreter:** Generates and executes bytecode for fast application startup.
- **TurboFan Compiler:** Monitors frequently executed functions ('hot code') and compiles them directly into native machine code.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// JIT Optimization Example
function calculateSum(a, b) {
  return a + b; // TurboFan optimizes this path when called repeatedly with Numbers
}

for (let i = 0; i < 10000; i++) {
  calculateSum(i, i + 1); // Hot code path compiled to machine code
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Calling JS purely 'interpreted' in modern interviews — mention JIT compilation!

---

### 4. 🔴 P0 [C] What are the primitive data types in JavaScript?

> **TL;DR:** JavaScript has 7 primitive types: Number, String, Boolean, null, undefined, Symbol, and BigInt. Primitives are immutable and stored by value.

#### 💡 Core Concept & Explanation

Primitives are immutable single values stored directly on the execution stack:

- `Number`: Double-precision 64-bit IEEE 754 float.
- `String`: Sequence of UTF-16 characters.
- `Boolean`: `true` or `false`.
- `undefined`: Variable declared but not assigned.
- `null`: Intentional absence of any object value.
- `Symbol`: Unique, immutable identifier (ES6).
- `BigInt`: Arbitrary-precision integers for numbers larger than 2^53 - 1 (ES2020).

#### 🛠️ Code / Visual Diagram / Table

```javascript
const num = 42;
const str = "Hello";
const bool = true;
const unassigned = undefined;
const empty = null;
const sym = Symbol("id");
const bigIntNum = 9007199254740991n;

console.log(typeof sym); // "symbol"
console.log(typeof bigIntNum); // "bigint"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting Symbol or BigInt when listing primitives.

---

### 5. 🔴 P0 [C] What are reference/non-primitive data types?

> **TL;DR:** Reference types consist of Objects (including Arrays, Functions, Dates, Maps, Sets). They are mutable objects stored in Heap memory and accessed via memory reference pointers.

#### 💡 Core Concept & Explanation

Reference values reside in dynamic Heap memory. Variable identifiers store a stack memory reference pointer address referencing that heap memory location.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let userA = { name: "Alice" };
let userB = userA; // Copies memory address reference pointer

userB.name = "Bob"; // Mutates shared object in Heap
console.log(userA.name); // "Bob"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming Arrays and Functions are separate fundamental data types — both inherit from Object.

---

### 6. 🔴 P0 [Q] What is the difference between primitive and reference values?

> **TL;DR:** Primitives are immutable and stored by value on the Call Stack. Reference values are mutable objects stored in Heap memory and accessed via variable memory pointers.

#### 💡 Core Concept & Explanation

Comparison Summary:

- **Mutability:** Primitives cannot be mutated (only reassigned). Reference objects can have properties added or modified.
- **Comparison:** Primitives compare by value (`10 === 10`). Reference types compare by memory pointer address (`{} === {}` is `false`).

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Primitive value equality
console.log("hello" === "hello"); // true

// Reference comparison (checks memory address)
console.log({ a: 1 } === { a: 1 }); // false (different heap addresses!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Comparing two distinct objects with identical properties using ===.

---

### 7. 🟠 P1 [C] Is JavaScript statically or dynamically typed?

> **TL;DR:** JavaScript is dynamically typed. Data types are associated with values at runtime rather than declared with variables at compile time.

#### 💡 Core Concept & Explanation

Variables can hold values of any data type and can be reassigned to different types throughout execution without compile error.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let val = 100; // Currently Number
val = "Now a String"; // Valid in JS!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing dynamic typing with weak typing (coercion behavior).

---

### 8. 🟠 P1 [C] What does typeof do?

> **TL;DR:** The typeof operator evaluates an expression and returns a string indicating the evaluation type of the operand.

#### 💡 Core Concept & Explanation

Return strings: `"number"`, `"string"`, `"boolean"`, `"undefined"`, `"symbol"`, `"bigint"`, `"function"`, and `"object"`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(typeof 42); // "number"
console.log(typeof "JS"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof function () {}); // "function"
console.log(typeof {}); // "object"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting typeof null to return 'null' (it returns 'object').

---

### 9. 🔴 P0 [C] Why does typeof null return "object"?

> **TL;DR:** typeof null returning 'object' is a historical bug from the first version of JavaScript, kept for backward compatibility to avoid breaking existing legacy web code.

#### 💡 Core Concept & Explanation

In JS version 1, values were stored with type tags in memory. The object type tag was `000`. Since `null` was represented as a NULL pointer (all zeroes), `typeof null` checked tag bits `000` and mistakenly returned `"object"`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(typeof null); // "object"

// Correct way to check for null:
const value = null;
console.log(value === null); // true
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using typeof to check for null values.

---

### 10. 🟠 P1 [C] What is undefined?

> **TL;DR:** undefined is a primitive type representing an uninitialized variable, missing function argument, or missing object property.

#### 💡 Core Concept & Explanation

JavaScript automatically assigns `undefined` to declared variables before assignment, omitted parameters, or non-existent object keys.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let x;
console.log(x); // undefined

function test(arg) {
  console.log(arg); // undefined if invoked as test()
}
test();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Manually assigning undefined instead of letting the engine handle it — prefer using null for deliberate empty state.

---

### 11. 🟠 P1 [C] What is null?

> **TL;DR:** null is a primitive value representing an intentional, explicit assignment of 'no value' or empty object pointer.

#### 💡 Core Concept & Explanation

Developers assign `null` explicitly to indicate that a variable intentionally points to empty state or has been reset.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let currentUser = null; // Explicitly set to empty initially
currentUser = { name: "Alice" }; // Updated later
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting null to be automatically assigned by the JS engine.

---

### 12. 🟠 P1 [Q] What is the difference between null, undefined, and an undeclared variable?

> **TL;DR:** undefined means declared but unassigned. null means intentionally set to empty. An undeclared variable was never created in scope and throws a ReferenceError if accessed.

#### 💡 Core Concept & Explanation

Comparison Summary:

- `undefined`: Variable exists in scope, holds `undefined`.
- `null`: Variable exists in scope, holds `null` object pointer.
- `Undeclared`: Identifier does not exist in any lexical scope chain; accessing it throws `ReferenceError`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let a; // Declared, undefined
let b = null; // Declared, null

console.log(a); // undefined
console.log(b); // null
// console.log(c); // Throws ReferenceError: c is not defined
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing undefined with ReferenceError (undeclared).

---

### 13. 🟠 P1 [C] What is NaN and why is NaN !== NaN?

> **TL;DR:** NaN stands for 'Not-a-Number', representing an invalid mathematical operation. According to IEEE 754 standard, NaN is unequal to everything including itself.

#### 💡 Core Concept & Explanation

`NaN` is of type `"number"`. Because IEEE 754 math specifies that invalid results cannot equal any valid value or invalid result, `NaN === NaN` is `false`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false

// Proper checking:
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("hello")); // false (does not coerce)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using global isNaN() which coerces non-numeric strings to NaN.

---

### 14. 🟠 P1 [C] What are truthy and falsy values?

> **TL;DR:** Falsy values evaluate to false when coerced to boolean in conditional statements. All other values in JavaScript are truthy.

#### 💡 Core Concept & Explanation

Boolean coercion (e.g. `Boolean(val)` or `if (val)`) converts all values to `true` or `false`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
if ("Hello") console.log("Truthy!"); // Executes
if (0) console.log("Falsy!"); // Skips
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming empty objects ({}) or empty arrays ([]) are falsy — both are truthy!

---

### 15. 🟠 P1 [C] What are all the falsy values in JavaScript?

> **TL;DR:** There are exactly 8 falsy values in JavaScript: false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, and NaN.

#### 💡 Core Concept & Explanation

Complete list of falsy values:

- `false`
- `0` (Number zero)
- `-0` (Negative zero)
- `0n` (BigInt zero)
- `""` (Empty string)
- `null`
- `undefined`
- `NaN`

#### 🛠️ Code / Visual Diagram / Table

```javascript
const falsyList = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyList.forEach((val) => console.log(Boolean(val))); // All print false
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking '0' (string 0) or 'false' (string false) are falsy — non-empty strings are truthy!

---

### 16. 🟠 P1 [C] What is type coercion?

> **TL;DR:** Type coercion is the automatic or explicit conversion of values from one data type to another (e.g. string to number).

#### 💡 Core Concept & Explanation

JavaScript performs implicit type coercion when operands of binary operators have different types.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log("5" + 2); // "52" (String concatenation coercion)
console.log("5" - 2); // 3    (Numeric subtraction coercion)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Unexpected string concatenation when using + operator.

---

### 17. 🟠 P1 [C] What is implicit vs explicit type conversion?

> **TL;DR:** Implicit conversion happens automatically by the JS engine during operations. Explicit conversion (type casting) is written intentionally by the developer.

#### 💡 Core Concept & Explanation

Explicit conversion uses built-in constructors like `Number()`, `String()`, or `Boolean()`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Implicit
let a = "10" * 2; // 20

// Explicit
let b = Number("10") * 2; // 20
let c = String(100); // "100"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Relying on implicit coercion in complex logical expressions.

---

### 18. 🟠 P1 [Q] What is the difference between == and ===?

> **TL;DR:** Loose equality (==) converts operands to a common type before comparison. Strict equality (===) checks value and type without coercion.

#### 💡 Core Concept & Explanation

`==` uses the Abstract Equality Comparison Algorithm to convert types before comparing.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using == when comparing values of unexpected types.

---

### 19. 🟠 P1 [C] Why is === generally preferred?

> **TL;DR:** Strict equality (===) prevents silent type coercion bugs, improves code readability, and allows engine optimization.

#### 💡 Core Concept & Explanation

Using `===` makes comparisons explicit and predictable, preventing weird edge cases like `0 == ""` being `true`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const val = "";
if (val === 0) {
  // Safe: Will not execute
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting that === still checks reference addresses for objects.

---

### 20. 🟠 P1 [Q] How does type coercion work with ==?

> **TL;DR:** When using ==, numbers and strings convert to numbers, booleans convert to numbers (true->1, false->0), and objects convert to primitives via ToPrimitive.

#### 💡 Core Concept & Explanation

Rules: `null == undefined` is true. Number vs String converts String to Number. Boolean vs anything converts Boolean to Number.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(true == 1); // true (true -> 1)
console.log("0" == 0); // true ("0" -> 0)
console.log(null == undefined); // true
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming null == 0 (null is only loosely equal to undefined).

---

### 21. 🟠 P1 [Q] What is the difference between Object.is() and ===?

> **TL;DR:** Object.is() treats NaN as equal to NaN (true) and distinguishes +0 from -0 (false), whereas === does the opposite.

#### 💡 Core Concept & Explanation

`Object.is()` implements the SameValue algorithm.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using Object.is for general object reference comparison — it still checks heap addresses.

---

### 22. 🟠 P1 [C] What is short-circuit evaluation?

> **TL;DR:** Short-circuit evaluation stops evaluating logical expressions as soon as the outcome is determined by the first operand.

#### 💡 Core Concept & Explanation

`&&` stops on the first falsy operand. `||` stops on the first truthy operand.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { name: "Alice" };
user && console.log(user.name); // Executes only if user is truthy
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Executing side-effect functions inside short-circuit checks.

---

### 23. 🟠 P1 [C] How do && and || work?

> **TL;DR:** && returns the first falsy operand or the last operand if all are truthy. || returns the first truthy operand or the last operand if all are falsy.

#### 💡 Core Concept & Explanation

These operators return the actual operand value, not a boolean!

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log("Cat" && "Dog"); // "Dog" (both truthy, returns last)
console.log("" && "Dog"); // "" (first falsy)
console.log("Cat" || "Dog"); // "Cat" (first truthy)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming && and || only return true or false.

---

### 24. 🟠 P1 [Q] What is the difference between || and ???

> **TL;DR:** || falls back on ALL falsy values (0, "", false). Nullish coalescing (??) falls back ONLY on null or undefined.

#### 💡 Core Concept & Explanation

Use `??` when `0` or `""` are valid input values that should not trigger fallback defaults.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const count = 0;

console.log(count || 10); // 10 (0 is falsy!)
console.log(count ?? 10); // 0  (0 is not null/undefined)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using || for default values when zero or empty strings are valid inputs.

---

### 25. 🟠 P1 [C] What is optional chaining (?.)?

> **TL;DR:** Optional chaining (?.) safely reads nested object properties without throwing a TypeError if an intermediate property is null or undefined.

#### 💡 Core Concept & Explanation

Returns `undefined` short-circuiting execution if the target reference is nullish.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { profile: null };

console.log(user.profile?.address?.city); // undefined (No TypeError thrown!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Overusing ?. on variables that should guaranteed exist.

---

## Scope & Hoisting

### 26. 🟠 P1 [Q] What is the difference between var, let, and const?

> **TL;DR:** var is function-scoped, re-declarable, and hoisted with undefined. let and const are block-scoped, cannot be re-declared in the same scope, and are hoisted into the TDZ. const prevents variable pointer reassignment.

#### 💡 Core Concept & Explanation

Comparison:

- `var`: Function scope, hoisted as `undefined`.
- `let`: Block scope, TDZ hoisted, re-assignable.
- `const`: Block scope, TDZ hoisted, must be initialized on declaration and cannot be reassigned.

#### 🛠️ Code / Visual Diagram / Table

```javascript
var a = 1;
let b = 2;
const c = 3;
// c = 4; // TypeError: Assignment to constant variable
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming const makes objects immutable — property values can still be modified.

---

### 27. 🟠 P1 [C] What is global scope?

> **TL;DR:** Global scope is the top-most execution context. Variables declared in global scope are accessible anywhere in the script.

#### 💡 Core Concept & Explanation

In browser environments, global `var` variables attach to `window`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
var globalItem = "I am global";
function test() {
  console.log(globalItem); // Accessible
}
test();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Polluting global scope causing variable naming collisions.

---

### 28. 🟠 P1 [C] What is function scope?

> **TL;DR:** Function scope means variables declared inside a function (with var, let, or const) are accessible only within that function body.

#### 💡 Core Concept & Explanation

Function parameters and local variables are created when function execution context initializes and garbage collected after function exit.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function demo() {
  var secret = 123;
}
// console.log(secret); // ReferenceError
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting var declared in a function to leak outside.

---

### 29. 🟠 P1 [C] What is block scope?

> **TL;DR:** Block scope restricts variable visibility to the nearest enclosing { } code block when declared using let or const.

#### 💡 Core Concept & Explanation

Applies to `if` blocks, `for` loops, and standalone `{ }` blocks.

#### 🛠️ Code / Visual Diagram / Table

```javascript
if (true) {
  let blockVal = "Trapped";
}
// console.log(blockVal); // ReferenceError
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking var adheres to block scope.

---

### 30. 🟠 P1 [C] What is lexical scope?

> **TL;DR:** Lexical scope (static scope) means variable scope is determined by where variables and blocks are physically written in code at compile time.

#### 💡 Core Concept & Explanation

Inner functions have access to variables declared in their outer parent scopes based on physical authoring structure.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const outer = "Outer Scope";
function parent() {
  function child() {
    console.log(outer); // Resolves lexically
  }
  child();
}
parent();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing lexical scope (where code is written) with dynamic scope (where function is called).

---

### 31. 🟠 P1 [C] What is the scope chain?

> **TL;DR:** The scope chain is the hierarchical chain of parent lexical environments searched by the engine when resolving a variable reference.

#### 💡 Core Concept & Explanation

If an identifier is not found in current local scope, JS travels up outer parent scopes until reaching global scope.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let g = "global";
function level1() {
  function level2() {
    console.log(g); // Travels up Scope Chain to global
  }
  level2();
}
level1();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Throwing ReferenceError when identifier is missing at top of scope chain.

---

### 32. 🔴 P0 [C] What is hoisting?

> **TL;DR:** Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during creation phase.

#### 💡 Core Concept & Explanation

Memory is allocated before line-by-line execution starts.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(x); // undefined (hoisted!)
var x = 5;
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking code is physically moved — only memory references are set up during creation phase.

---

### 33. 🟠 P1 [C] What exactly gets hoisted in JavaScript?

> **TL;DR:** Function declarations, var, let, const, and class declarations are all hoisted. However, only Function Declarations are fully initialized.

#### 💡 Core Concept & Explanation

`var` is initialized as `undefined`; `let`, `const`, and `class` remain uninitialized in TDZ.

#### 🛠️ Code / Visual Diagram / Table

```javascript
sayHi(); // Works! Fully hoisted
function sayHi() {
  console.log("Hi");
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking function expressions are fully hoisted.

---

### 34. 🔴 P0 [Q] How does var behave during hoisting?

> **TL;DR:** var variables are hoisted to top of function/global scope and initialized immediately with undefined.

#### 💡 Core Concept & Explanation

Accessing `var` before declaration returns `undefined` instead of throwing an error.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(num); // undefined
var num = 10;
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Relying on pre-declaration undefined behavior causing silent bugs.

---

### 35. 🔴 P0 [Q] How do let and const behave during hoisting?

> **TL;DR:** let and const are hoisted to top of block scope but remain uninitialized in the Temporal Dead Zone until execution reaches their declaration line.

#### 💡 Core Concept & Explanation

Accessing before declaration line throws a `ReferenceError`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
try {
  console.log(val); // ReferenceError
} catch (e) {
  console.log(e.message);
}
let val = 20;
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Claiming let/const are not hoisted at all.

---

### 36. 🔴 P0 [C] What is the Temporal Dead Zone (TDZ)?

> **TL;DR:** The TDZ is the period between scope entry and variable declaration where let and const variables exist in memory but cannot be accessed.

#### 💡 Core Concept & Explanation

TDZ prevents accessing uninitialized variables early, catching bugs during development.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// TDZ starts
const action = () => console.log(item); // TDZ active until line below executes
let item = "Data"; // TDZ ends
action(); // Works
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking TDZ is syntactic rather than temporal (time-based during execution).

---

### 37. 🟠 P1 [C] Why does accessing let before declaration throw an error?

> **TL;DR:** Accessing let before declaration throws a ReferenceError because the variable is uninitialized in the Temporal Dead Zone.

#### 💡 Core Concept & Explanation

Enforced by ECMAScript specification to enforce safe code structuring.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let x = 1;
{
  // console.log(x); // ReferenceError! (shadowed let x is in TDZ here)
  let x = 2;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting that block scope shadowing creates a new TDZ for inner block let.

---

### 38. 🟠 P1 [C] Are function declarations hoisted?

> **TL;DR:** Yes. Function declarations are fully hoisted with both name and body implementation stored in memory during creation phase.

#### 💡 Core Concept & Explanation

Allows calling functions prior to their line of code definition.

#### 🛠️ Code / Visual Diagram / Table

```javascript
greet(); // "Hello!"
function greet() {
  console.log("Hello!");
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing function declarations with function expressions.

---

### 39. 🟠 P1 [C] Are function expressions hoisted?

> **TL;DR:** No. Variable holds hoisted variable state (undefined if var), but function definition is assigned only when execution reaches that line.

#### 💡 Core Concept & Explanation

Calling function expression early throws `TypeError` (if var) or `ReferenceError` (if let/const).

#### 🛠️ Code / Visual Diagram / Table

```javascript
try {
  expr(); // TypeError: expr is not a function
} catch (e) {
  console.log(e.message);
}
var expr = function () {};
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting function expressions to hoist implementation.

---

### 40. 🟠 P1 [C] What is variable shadowing?

> **TL;DR:** Variable shadowing occurs when a variable declared inside an inner scope shares the exact name as a variable in an outer scope, masking outer variable access.

#### 💡 Core Concept & Explanation

The inner scope variable takes precedence during scope chain resolution.

#### 🛠️ Code / Visual Diagram / Table

```javascript
let name = "Outer";
function shadow() {
  let name = "Inner"; // Shadows outer variable
  console.log(name); // "Inner"
}
shadow();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Illegal shadowing: trying to declare var with same name as let in same block scope.

---

### 41. 🟠 P1 [Q] What is the difference between redeclaration and reassignment?

> **TL;DR:** Redeclaration means declaring a variable name again using var/let/const in same scope. Reassignment means updating stored value using = operator.

#### 💡 Core Concept & Explanation

`var` allows redeclaration; `let` and `const` throw SyntaxError on redeclaration. `const` disallows reassignment.

#### 🛠️ Code / Visual Diagram / Table

```javascript
var x = 1;
var x = 2; // Redeclaration OK with var

let y = 1;
y = 2; // Reassignment OK with let
// let y = 3; // SyntaxError: Identifier 'y' has already been declared
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing const immutability with prohibition of variable reassignment.

---

### 42. 🟠 P1 [C] Can a const object be modified?

> **TL;DR:** Yes. const prevents reassigning the variable memory reference pointer, but object properties inside Heap memory can be modified.

#### 💡 Core Concept & Explanation

Use `Object.freeze()` to make object properties immutable.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = { age: 20 };
obj.age = 25; // Allowed!
console.log(obj.age); // 25
// obj = {}; // TypeError!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming const creates deep object immutability.

---

### 43. 🟠 P1 [C] What is an execution context?

> **TL;DR:** An Execution Context is an environment created by the engine to evaluate and execute JavaScript code, managing local variables, scope chain, and this binding.

#### 💡 Core Concept & Explanation

Types: Global Execution Context (GEC) and Function Execution Context (FEC).

#### 🛠️ Code / Visual Diagram / Table

```javascript
// GEC created first, FEC created when run() is called
function run() {
  let local = 10;
}
run();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing execution context with `this` binding context.

---

### 44. 🟠 P1 [Q] What happens when a function is called?

> **TL;DR:** A new Function Execution Context is created, pushed onto Call Stack, variables & parameters are initialized, code executes, returns value, and context is popped off stack.

#### 💡 Core Concept & Explanation

Pushed onto Call Stack; popped upon completion.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function calc(a) {
  return a * 2;
}
let res = calc(5); // Creates context, evaluates 10, pops off stack
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting context is popped off call stack after execution.

---

### 45. 🟠 P1 [C] What is the call stack?

> **TL;DR:** The Call Stack is a LIFO (Last In, First Out) stack data structure used by JS engine to manage active function execution contexts.

#### 💡 Core Concept & Explanation

Exceeding stack memory limit (e.g., infinite recursion) throws `RangeError: Maximum call stack size exceeded`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function first() {
  second();
}
function second() {
  console.log("Done");
}
first(); // GEC -> first() -> second()
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Unbounded recursive functions causing stack overflow.

---

## Functions & Closures

### 46. 🟠 P1 [C] What are first-class functions?

> **TL;DR:** First-class functions mean functions are treated as first-class citizens: they can be assigned to variables, passed as arguments, and returned from other functions.

#### 💡 Core Concept & Explanation

Enables functional programming techniques like higher-order functions and callbacks.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const fn = () => "Hello";
function runner(f) {
  return f();
}
console.log(runner(fn)); // "Hello"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking functions are primitive types — functions are executable objects.

---

### 47. 🟠 P1 [C] What is a callback function?

> **TL;DR:** A callback function is a function passed as an argument into another function, to be executed later inside that outer function.

#### 💡 Core Concept & Explanation

Used heavily for event handling, asynchronous tasks, and array iteration methods.

#### 🛠️ Code / Visual Diagram / Table

```javascript
[1, 2].forEach(function (num) {
  console.log(num); // Callback function
});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Invoking callback during pass (`fn(callback())`) instead of passing reference (`fn(callback)`).

---

### 48. 🟠 P1 [C] What is a higher-order function?

> **TL;DR:** A higher-order function (HOF) is a function that accepts one or more functions as arguments, or returns a function as its output.

#### 💡 Core Concept & Explanation

Examples: `Array.prototype.map`, `filter`, `reduce`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function multiplier(factor) {
  return function (number) {
    // Returns function
    return number * factor;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing higher-order functions with callback functions.

---

### 49. 🟠 P1 [Q] What is the difference between a function declaration and expression?

> **TL;DR:** Function declarations start with function keyword, are fully hoisted, and can be called before definition. Function expressions assign function to variable and hoist variable only.

#### 💡 Core Concept & Explanation

Declarations are hoisted fully; expressions adhere to variable hoisting rules.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Declaration
function dec() {}

// Expression
const expr = function () {};
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Calling function expressions before definition line.

---

### 50. 🔴 P0 [C] What is an arrow function?

> **TL;DR:** An arrow function (=>) is a compact ES6 function syntax that lexically binds this, lacks arguments/prototype properties, and cannot be used as a constructor.

#### 💡 Core Concept & Explanation

Shorter syntax with implicit return for single expressions.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using arrow functions for object methods expecting dynamic this.

---

### 51. 🔴 P0 [C] What are the differences between arrow functions and regular functions?

> **TL;DR:** Arrow functions lexically inherit this, lack arguments object, lack prototype property, and cannot be invoked with new.

#### 💡 Core Concept & Explanation

Summary: No own `this`, no `arguments`, no `new`, no `super`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arrow = () => {};
// new arrow(); // TypeError: arrow is not a constructor
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Attempting to use arrow functions as constructor functions.

---

### 52. 🔴 P0 [C] Do arrow functions have their own this?

> **TL;DR:** No. Arrow functions do not bind their own this; they capture this lexically from their enclosing parent scope at creation time.

#### 💡 Core Concept & Explanation

Cannot be changed via `call()`, `apply()`, or `bind()`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {
  name: "Obj",
  arrow: () => console.log(this.name), // Captures outer scope this (window)
};
obj.arrow(); // undefined
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting arrow functions in object literal properties to bind to object.

---

### 53. 🔴 P0 [C] Do arrow functions have their own arguments?

> **TL;DR:** No. Arrow functions do not have their own arguments object; they inherit arguments from outer function scope or throw error in global scope.

#### 💡 Core Concept & Explanation

Use ES6 Rest parameters (`...args`) instead.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arrow = (...args) => console.log(args[0]);
arrow(10); // 10
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Accessing arguments variable inside arrow functions.

---

### 54. 🔴 P0 [C] Can arrow functions be used as constructors?

> **TL;DR:** No. Arrow functions lack an internal [[Construct]] method and prototype property, so calling them with new throws a TypeError.

#### 💡 Core Concept & Explanation

Throws `TypeError: Arrow is not a constructor`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const Car = (make) => {
  this.make = make;
};
// const c = new Car("Tesla"); // TypeError
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using arrow syntax for constructor functions or class methods requiring prototypes.

---

### 55. 🟠 P1 [C] What is the arguments object?

> **TL;DR:** The arguments object is an array-like object available inside regular functions containing all arguments passed to that function.

#### 💡 Core Concept & Explanation

Array-like: Has `length` and index access, but lacks Array prototype methods (`map`, `filter`). Convert using `Array.from(arguments)`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using array methods directly on arguments object without converting it to Array first.

---

### 56. 🟠 P1 [C] What are default parameters?

> **TL;DR:** Default parameters allow function formal parameters to be initialized with default values if no value or undefined is passed.

#### 💡 Core Concept & Explanation

Triggers fallback only when argument is `undefined` (not `null` or `0`).

#### 🛠️ Code / Visual Diagram / Table

```javascript
function greet(name = "Guest") {
  return "Hello " + name;
}
console.log(greet()); // "Hello Guest"
console.log(greet(null)); // "Hello null" (null does NOT trigger default!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming null triggers default parameter values.

---

### 57. 🟠 P1 [C] What are rest parameters?

> **TL;DR:** Rest parameters syntax (...args) allows a function to accept an indefinite number of arguments as a true JavaScript Array.

#### 💡 Core Concept & Explanation

Must be the last parameter in function declaration.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function total(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(total(10, 20, 30)); // 60
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Placing rest parameter before other parameters (`function(a, ...b, c)`).

---

### 58. 🟠 P1 [Q] What is the difference between rest and spread syntax?

> **TL;DR:** Rest syntax (...args) collects multiple elements into an array. Spread syntax (...arr) expands an array or object into individual elements.

#### 💡 Core Concept & Explanation

Rest gathers elements; Spread unpacks elements.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Rest
function collect(...items) {}

// Spread
const arr = [1, 2];
const copy = [...arr, 3]; // [1, 2, 3]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing syntax context.

---

### 59. 🟠 P1 [C] What is an IIFE?

> **TL;DR:** An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined, preventing variable global scope pollution.

#### 💡 Core Concept & Explanation

Syntax: `(function() { ... })();`

#### 🛠️ Code / Visual Diagram / Table

```javascript
(function () {
  var privateVar = "Secret";
  console.log("IIFE Executed");
})();
// console.log(privateVar); // ReferenceError
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting wrapping parentheses causing syntax error.

---

### 60. 🟠 P1 [C] What is a pure function?

> **TL;DR:** A pure function always returns the exact same output for the same input arguments and produces zero side effects.

#### 💡 Core Concept & Explanation

Deterministic and predictable; core pillar of Functional Programming.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Pure
const add = (a, b) => a + b;

// Impure
let total = 0;
const addToTotal = (a) => (total += a); // Side effect!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Mutating global state or external parameters inside function.

---

### 61. 🟠 P1 [C] What is a side effect?

> **TL;DR:** A side effect is any state change or interaction with the outside world performed by a function (e.g. DOM mutation, I/O logging, changing global variables).

#### 💡 Core Concept & Explanation

Examples: `console.log()`, HTTP requests, modifying DOM, mutating objects passed by reference.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function updateDOM(val) {
  document.title = val; // Side Effect!
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Unintended object reference parameter mutations.

---

### 62. 🟠 P1 [C] What is recursion?

> **TL;DR:** Recursion is a programming technique where a function calls itself until reaching a base termination condition.

#### 💡 Core Concept & Explanation

Must have base case to prevent Call Stack overflow.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Missing base case resulting in stack overflow error.

---

### 63. 🔴 P0 [C] What is function composition?

> **TL;DR:** Function composition is the process of combining two or more functions to produce a new function (e.g. f(g(x))).

#### 💡 Core Concept & Explanation

Passes output of one function as input to next.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const doubleThenAdd = (x) => addOne(double(x));
console.log(doubleThenAdd(3)); // 7
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Hardcoding function pipelines instead of writing composable helpers.

---

### 64. 🔴 P0 [C] What is currying?

> **TL;DR:** Currying transforms a multi-argument function f(a, b, c) into a nested chain of single-argument functions f(a)(b)(c).

#### 💡 Core Concept & Explanation

Uses closures to remember passed arguments across calls.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const curryAdd = (a) => (b) => (c) => a + b + c;
console.log(curryAdd(1)(2)(3)); // 6
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting closure argument accumulation.

---

### 65. 🔴 P0 [C] What is a closure?

> **TL;DR:** A closure is a function bundled together with references to its outer lexical environment, giving access to outer variables even after outer function returns.

#### 💡 Core Concept & Explanation

Function retains access to birthplace scope via internal [[Environment]] link.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking closures copy static variable values — closures store live memory references!

---

### 66. 🔴 P0 [Q] How does a closure work?

> **TL;DR:** When outer function exits, variables referenced by inner functions are preserved in Heap memory rather than garbage collected.

#### 💡 Core Concept & Explanation

Scope reference chain is kept alive by inner function pointer.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function makeAdder(x) {
  return function (y) {
    return x + y; // x is preserved in closure
  };
}
const add10 = makeAdder(10);
console.log(add10(5)); // 15
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Memory leaks from retaining unused closure scope data.

---

### 67. 🔴 P0 [C] What are practical uses of closures?

> **TL;DR:** Practical uses include Data Encapsulation (private variables), Module Pattern, Function Currying, Memoization, and Event Handlers.

#### 💡 Core Concept & Explanation

Used extensively in JavaScript libraries and state management.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Private state module
const createStore = () => {
  let state = 0;
  return {
    get: () => state,
    set: (v) => (state = v),
  };
};
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Creating unnecessary closures inside performance-critical loops.

---

## this & Binding

### 68. 🟠 P1 [C] What is this in JavaScript?

> **TL;DR:** this is a keyword that refers to the object context in which the current code or function is executing.

#### 💡 Core Concept & Explanation

Dynamic binding evaluated at function invocation time.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log(this); // window in browser global scope
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking this refers to function definition location for regular functions.

---

### 69. 🔴 P0 [C] How is the value of this determined?

> **TL;DR:** Determined by 4 precedence rules: 1) New binding, 2) Explicit binding (call/apply/bind), 3) Implicit binding (obj.fn()), 4) Default binding.

#### 💡 Core Concept & Explanation

Precedence order: New &gt; Explicit &gt; Implicit &gt; Default.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Implicit
const obj = {
  name: "A",
  fn() {
    console.log(this.name);
  },
};
obj.fn(); // "A"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Applying default binding rules to arrow functions.

---

### 70. 🟠 P1 [C] What is this inside a regular function?

> **TL;DR:** Inside a standalone regular function, this refers to window/global in non-strict mode, or undefined in strict mode.

#### 💡 Core Concept & Explanation

Strict mode (`"use strict"`) prevents default global window binding.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function show() {
  "use strict";
  console.log(this); // undefined
}
show();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting strict mode behavior.

---

### 71. 🟠 P1 [C] What is this inside an object method?

> **TL;DR:** Inside an object method invoked as obj.method(), this refers to the object preceding the dot.

#### 💡 Core Concept & Explanation

Implicit binding rule.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = {
  name: "Sarah",
  sayName() {
    console.log(this.name);
  },
};
user.sayName(); // "Sarah"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Detaching method into standalone variable losing implicit binding.

---

### 72. 🔴 P0 [C] What is this inside an arrow function?

> **TL;DR:** this inside an arrow function is resolved lexically from its enclosing parent scope at function creation time.

#### 💡 Core Concept & Explanation

Ignores explicit call/apply/bind context overrides.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {
  name: "Lexical",
  getArrow() {
    return () => console.log(this.name);
  },
};
obj.getArrow()(); // "Lexical"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using call/apply on arrow functions expecting this to change.

---

### 73. 🟠 P1 [C] What is this inside a constructor?

> **TL;DR:** Inside a constructor function invoked with new, this refers to the newly created instance object.

#### 💡 Core Concept & Explanation

The `new` operator creates object, links prototype, sets `this`, and returns instance.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function User(name) {
  this.name = name;
}
const u = new User("Alex");
console.log(u.name); // "Alex"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting new keyword when calling constructor.

---

### 74. 🔴 P0 [Q] What happens to this when a method is passed as a callback?

> **TL;DR:** Passing an object method as a callback detaches implicit binding, causing this to fall back to default binding (undefined or window).

#### 💡 Core Concept & Explanation

Fix using `.bind(obj)` or wrapping in an arrow function.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {
  val: 42,
  getVal() {
    console.log(this.val);
  },
};
setTimeout(obj.getVal, 100); // undefined!
setTimeout(obj.getVal.bind(obj), 100); // 42
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing object methods to setTimeout or event listeners without binding.

---

### 75. 🟠 P1 [C] What is implicit binding?

> **TL;DR:** Implicit binding occurs when a function is invoked as a method of an object (obj.fn()), binding this to that object.

#### 💡 Core Concept & Explanation

Call site object determines `this` context.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const car = {
  brand: "BMW",
  drive() {
    console.log(this.brand);
  },
};
car.drive(); // "BMW"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Chained call sites: `a.b.c.fn()` binds `this` to `c`.

---

### 76. 🟠 P1 [C] What is explicit binding?

> **TL;DR:** Explicit binding uses call(), apply(), or bind() to explicitly specify the this context for function execution.

#### 💡 Core Concept & Explanation

Directly forces context target.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function show() {
  console.log(this.title);
}
show.call({ title: "Explicit" }); // "Explicit"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing null in strict mode sets this to null, not window.

---

### 77. 🟠 P1 [C] What is call()?

> **TL;DR:** call() invokes a function immediately with a specified this context and arguments passed individually separated by commas.

#### 💡 Core Concept & Explanation

Syntax: `fn.call(thisArg, arg1, arg2, ...)`

#### 🛠️ Code / Visual Diagram / Table

```javascript
function greet(greeting) {
  console.log(greeting + " " + this.name);
}
greet.call({ name: "Alice" }, "Hello"); // "Hello Alice"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing arguments array instead of individual comma-separated arguments.

---

### 78. 🟠 P1 [C] What is apply()?

> **TL;DR:** apply() invokes a function immediately with a specified this context and arguments passed as a single Array or array-like object.

#### 💡 Core Concept & Explanation

Syntax: `fn.apply(thisArg, [arg1, arg2])`

#### 🛠️ Code / Visual Diagram / Table

```javascript
function sum(a, b) {
  return a + b + this.base;
}
console.log(sum.apply({ base: 10 }, [2, 3])); // 15
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing individual arguments instead of an array.

---

### 79. 🟠 P1 [C] What is bind()?

> **TL;DR:** bind() returns a brand new function bound to the specified this context and preset initial arguments without executing immediately.

#### 💡 Core Concept & Explanation

Creates permanent bound function context.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { name: "Bob" };
function show() {
  console.log(this.name);
}
const bound = show.bind(user);
bound(); // "Bob"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting bind() to execute immediately.

---

### 80. 🔴 P0 [Q] What is the difference between call(), apply(), and bind()?

> **TL;DR:** call and apply execute immediately (call takes comma arguments, apply takes array). bind returns a new function for later execution.

#### 💡 Core Concept & Explanation

Summary table:
call(this, a, b) -&gt; Immediate
apply(this, [a, b]) -&gt; Immediate
bind(this, a, b) -&gt; Returns bound function

#### 🛠️ Code / Visual Diagram / Table

```javascript
function fn(a) {
  console.log(this.x + a);
}
const ctx = { x: 10 };
fn.call(ctx, 1); // 11
fn.apply(ctx, [1]); // 11
fn.bind(ctx, 1)(); // 11
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Re-binding a function bound with bind().

---

## Objects & Prototypes

### 81. 🟠 P1 [C] How are objects created in JavaScript?

> **TL;DR:** Objects can be created using Object Literals ({}), Object.create(), Constructor Functions with new, or ES6 Class syntax.

#### 💡 Core Concept & Explanation

Object literal is most common: `const obj = {};`

#### 🛠️ Code / Visual Diagram / Table

```javascript
const literal = { a: 1 };
const created = Object.create(literal);
console.log(created.a); // 1 (inherited)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking Object.create(null) inherits Object prototype methods.

---

### 82. 🟠 P1 [Q] What is the difference between dot and bracket notation?

> **TL;DR:** Dot notation (obj.key) requires valid identifier keys. Bracket notation (obj[key]) allows dynamic variables, keys with spaces, or special characters.

#### 💡 Core Concept & Explanation

Use brackets for dynamic property evaluation.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const key = "role";
const user = { role: "Admin" };
console.log(user.role); // Dot
console.log(user[key]); // Bracket dynamic
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting quotes in bracket notation for literal strings (`obj[key]` vs `obj['key']`).

---

### 83. 🟠 P1 [C] What is object destructuring?

> **TL;DR:** Object destructuring extracts properties from objects and binds them to variables using a compact syntax matching object structure.

#### 💡 Core Concept & Explanation

Supports default values and property alias renaming.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { id: 1, username: "alice" };
const { id, username: name, role = "User" } = user;
console.log(name, role); // "alice", "User"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Destructuring null or undefined throwing TypeError.

---

### 84. 🟠 P1 [C] What is object spread?

> **TL;DR:** Object spread ({...obj}) shallow copies enumerable own properties from source objects into a new target object.

#### 💡 Core Concept & Explanation

Used for merging objects and shallow cloning.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const a = { x: 1 };
const b = { y: 2 };
const merged = { ...a, ...b }; // { x: 1, y: 2 }
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming spread creates a deep clone of nested objects.

---

### 85. 🟠 P1 [C] What is a shallow copy?

> **TL;DR:** A shallow copy duplicates top-level primitive values, but copies heap memory references for nested objects.

#### 💡 Core Concept & Explanation

Modifying nested objects in shallow copies mutates the original object!

#### 🛠️ Code / Visual Diagram / Table

```javascript
const orig = { nested: { a: 1 } };
const copy = { ...orig };
copy.nested.a = 99;
console.log(orig.nested.a); // 99 (Mutated!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Mutating nested state in shallow copies.

---

### 86. 🟠 P1 [C] What is a deep copy?

> **TL;DR:** A deep copy recursively duplicates all levels of an object structure, ensuring complete memory independence.

#### 💡 Core Concept & Explanation

Methods: `structuredClone()`, custom recursive clone, or Lodash `cloneDeep`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const orig = { nested: { a: 1 } };
const deep = structuredClone(orig);
deep.nested.a = 99;
console.log(orig.nested.a); // 1 (Unmutated!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using JSON stringify for objects containing functions or circular references.

---

### 87. 🟠 P1 [C] Why doesn't {...obj} create a deep copy?

> **TL;DR:** Spread ({...obj}) performs top-level copying only. Nested child objects keep their original Heap memory reference address pointers.

#### 💡 Core Concept & Explanation

Spread iterates only own enumerable top-level keys.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const a = { child: {} };
const b = { ...a };
console.log(a.child === b.child); // true (Same Heap address!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming spread creates independent nested copies.

---

### 88. 🟠 P1 [C] What does Object.assign() do?

> **TL;DR:** Object.assign(target, ...sources) copies all own enumerable properties from source objects into a target object and returns target.

#### 💡 Core Concept & Explanation

Mutates target object passed as first parameter.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const target = { a: 1 };
Object.assign(target, { b: 2 });
console.log(target); // { a: 1, b: 2 }
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting to pass empty target `{}` when trying to clone without mutating source.

---

### 89. 🟠 P1 [C] Is Object.assign() shallow or deep?

> **TL;DR:** Object.assign() is strictly shallow. It copies primitive property values, but duplicates reference pointers for nested child objects.

#### 💡 Core Concept & Explanation

Behaves identically to object spread operator for copying properties.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const o1 = { c: { d: 1 } };
const o2 = Object.assign({}, o1);
console.log(o1.c === o2.c); // true
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting Object.assign to recursively clone nested objects.

---

### 90. 🔴 P0 [C] What are the limitations of JSON.parse(JSON.stringify(obj))?

> **TL;DR:** JSON cloning loses functions, undefined, Symbols, converts Date objects to strings, replaces NaN/Infinity with null, and crashes on circular references.

#### 💡 Core Concept & Explanation

JSON serialization only supports basic primitives, plain objects, and arrays.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {
  fn: () => {},
  val: undefined,
  date: new Date(),
};
const clone = JSON.parse(JSON.stringify(obj));
console.log(clone); // { date: "2026-..." } (fn and val stripped!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Cloning objects with Date objects or functions using JSON stringify.

---

### 91. 🔴 P0 [C] What is structuredClone()?

> **TL;DR:** structuredClone() is a built-in JS web/Node API method that creates deep copies of objects handling Dates, Maps, Sets, Arrays, and circular references natively.

#### 💡 Core Concept & Explanation

Does NOT clone functions or DOM nodes (throws DOMException).

#### 🛠️ Code / Visual Diagram / Table

```javascript
const data = { date: new Date(), map: new Map([["a", 1]]) };
const copy = structuredClone(data);
console.log(copy.date instanceof Date); // true
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Trying to pass functions or methods into structuredClone().

---

### 92. 🟠 P1 [C] What is object mutation?

> **TL;DR:** Object mutation is changing, adding, or deleting properties of an existing object directly in memory.

#### 💡 Core Concept & Explanation

Direct state mutation can lead to hard-to-track side effects in application state.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { name: "A" };
user.name = "B"; // Mutation!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Mutating React/Redux state objects directly instead of returning new state.

---

### 93. 🟠 P1 [C] What does immutability mean?

> **TL;DR:** Immutability means data values cannot be modified after creation. State changes produce brand new object instances rather than editing existing memory.

#### 💡 Core Concept & Explanation

Immutability improves predictability, tracking changes, and performance optimization in React.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const state = { count: 1 };
const newState = { ...state, count: state.count + 1 }; // Immutable update
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking const makes object properties immutable.

---

### 94. 🟠 P1 [C] What does Object.freeze() do?

> **TL;DR:** Object.freeze() makes an object immutable by preventing adding new properties, deleting properties, or modifying existing property values.

#### 💡 Core Concept & Explanation

Marks existing property descriptors writable: false, configurable: false. _Shallow only!_

#### 🛠️ Code / Visual Diagram / Table

```javascript
const frozen = Object.freeze({ a: 1 });
frozen.a = 2; // Silent fail (or TypeError in strict mode)
console.log(frozen.a); // 1
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming Object.freeze() freezes nested child objects.

---

### 95. 🟠 P1 [C] Does Object.freeze() deeply freeze an object?

> **TL;DR:** No. Object.freeze() is shallow. Nested child objects remain completely mutable unless recursively frozen.

#### 💡 Core Concept & Explanation

Write a recursive deepFreeze helper to freeze nested child objects.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = Object.freeze({ nested: { count: 5 } });
obj.nested.count = 10; // Allowed!
console.log(obj.nested.count); // 10
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting Object.freeze to protect nested data structures.

---

### 96. 🟠 P1 [C] What do Object.keys(), Object.values(), and Object.entries() do?

> **TL;DR:** Object.keys() returns an array of property names, Object.values() returns property values, and Object.entries() returns [key, value] pairs.

#### 💡 Core Concept & Explanation

Only returns enumerable own properties (ignores prototype chain).

#### 🛠️ Code / Visual Diagram / Table

```javascript
const user = { name: "Alice", age: 25 };
console.log(Object.keys(user)); // ["name", "age"]
console.log(Object.values(user)); // ["Alice", 25]
console.log(Object.entries(user)); // [["name", "Alice"], ["age", 25]]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting prototype inherited properties in returned array.

---

### 97. 🟠 P1 [C] What is a prototype?

> **TL;DR:** A prototype is a delegation mechanism in JavaScript where objects inherit properties and methods from other prototype objects.

#### 💡 Core Concept & Explanation

Every JS object has an internal prototype reference.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arr = [1, 2];
// Inherits Array.prototype methods like push, pop, slice
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking prototype inheritance copies methods into each instance.

---

### 98. 🔴 P0 [C] What is the prototype chain?

> **TL;DR:** The prototype chain is the linked list of prototype objects checked by the engine when traversing properties up to Object.prototype and null.

#### 💡 Core Concept & Explanation

Traverses `__proto__` links until key is found or null is reached.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Causing infinite loops by creating circular prototype references.

---

### 99. 🟠 P1 [Q] How does prototypal inheritance work?

> **TL;DR:** When reading a property, JS checks instance properties first. If missing, it delegates lookup up the prototype chain automatically.

#### 💡 Core Concept & Explanation

Writing a property attaches it directly to instance, masking prototype.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function Animal(type) {
  this.type = type;
}
Animal.prototype.eat = function () {
  return "Eating";
};
const cat = new Animal("Cat");
console.log(cat.eat()); // Delegated to Animal.prototype
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Mutating shared prototype objects affecting all instances.

---

### 100. 🟠 P1 [Q] What is the difference between prototype and **proto**?

> **TL;DR:** prototype is a property on constructor functions used to build instances. **proto** is an accessor property on instance objects pointing to their prototype.

#### 💡 Core Concept & Explanation

`new Fn()` sets `instance.__proto__ = Fn.prototype`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function Dog() {}
const d = new Dog();
console.log(d.__proto__ === Dog.prototype); // true
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using **proto** directly in production code instead of Object.getPrototypeOf().

---

## Classes & Structures

### 101. 🟠 P1 [C] What is a constructor function?

> **TL;DR:** A constructor function is a regular function invoked with the new keyword to initialize and return a new instance object.

#### 💡 Core Concept & Explanation

Uses `this` to set instance properties.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function User(name) {
  this.name = name;
}
const u = new User("Alice");
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Invoking constructor function without new keyword in non-strict mode.

---

### 102. 🟠 P1 [C] What does the new keyword do?

> **TL;DR:** new creates an empty object, links its prototype, binds this to the object, executes constructor, and returns the object.

#### 💡 Core Concept & Explanation

4 steps performed by new.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// new Fn() step sequence
// 1. obj = {}
// 2. obj.__proto__ = Fn.prototype
// 3. Fn.call(obj)
// 4. Return obj
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Returning primitive vs object from constructor function.

---

### 103. 🟠 P1 [Q] What happens internally when new is used?

> **TL;DR:** If constructor returns an explicit object, that object is returned. If constructor returns a primitive or nothing, the newly created instance is returned.

#### 💡 Core Concept & Explanation

Explicit object returns override default instance return.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function Test() {
  return { custom: true };
}
console.log(new Test()); // { custom: true }
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Returning explicit objects breaking prototype instance inheritance.

---

### 104. 🟠 P1 [C] What is Object.create()?

> **TL;DR:** Object.create(proto) creates a new object using an existing object as the prototype of the newly created object.

#### 💡 Core Concept & Explanation

Direct prototype linking without constructor execution.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const proto = {
  speak() {
    return "Hi";
  },
};
const child = Object.create(proto);
console.log(child.speak()); // "Hi"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing null as prototype removing Object prototype methods.

---

### 105. 🟠 P1 [C] What is the relationship between JavaScript classes and prototypes?

> **TL;DR:** ES6 classes are syntactic sugar over JavaScript's existing prototypal inheritance model. Class methods attach to prototype under the hood.

#### 💡 Core Concept & Explanation

Class syntax improves readability but compiles to prototype delegation.

#### 🛠️ Code / Visual Diagram / Table

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {} // Attaches to User.prototype
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Believing ES6 classes introduced OOP classical inheritance into JS.

---

### 106. 🟠 P1 [C] What does extends do?

> **TL;DR:** The extends keyword creates a class child relationship that inherits prototype methods and static methods from a parent class.

#### 💡 Core Concept & Explanation

Sets up prototype chain between child and parent prototypes.

#### 🛠️ Code / Visual Diagram / Table

```javascript
class Animal {}
class Dog extends Animal {}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting super() in child constructor.

---

### 107. 🟠 P1 [C] What does super do?

> **TL;DR:** super() calls the parent class constructor and must be invoked before using this inside a derived class constructor.

#### 💡 Core Concept & Explanation

Also used to access parent methods: `super.method()`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name); // Call parent constructor!
    this.age = age;
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Accessing this before super() inside child constructor throwing ReferenceError.

---

### 108. 🟠 P1 [C] What is method overriding?

> **TL;DR:** Method overriding occurs when a child class defines a method with the exact same name as a parent class method, shadowing parent implementation.

#### 💡 Core Concept & Explanation

Child implementation takes priority during scope lookup.

#### 🛠️ Code / Visual Diagram / Table

```javascript
class Parent {
  speak() {
    return "Parent";
  }
}
class Child extends Parent {
  speak() {
    return "Child";
  }
}
console.log(new Child().speak()); // "Child"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting super.speak() when trying to extend parent method.

---

### 109. 🟠 P1 [Q] What is the difference between static and instance methods?

> **TL;DR:** Static methods attach to class constructor directly (Class.method()). Instance methods attach to prototype (instance.method()).

#### 💡 Core Concept & Explanation

Static methods cannot access instance `this` properties.

#### 🛠️ Code / Visual Diagram / Table

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathHelper.add(2, 3)); // 5
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Calling static methods on instance objects.

---

### 110. 🟠 P1 [Q] What is the difference between an array and an object?

> **TL;DR:** Arrays are ordered, index-based numeric lists with array methods. Objects are unordered key-value collections.

#### 💡 Core Concept & Explanation

Arrays inherit from `Array.prototype`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arr = [10, 20]; // Indexed: arr[0]
const obj = { key: "val" }; // Keyed: obj.key
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using typeof to distinguish arrays (returns 'object') — use Array.isArray().

---

### 111. 🟠 P1 [C] What is a Map and when would you use it?

> **TL;DR:** Map is an ordered key-value collection that allows keys of ANY data type (objects, functions, primitives) and preserves insertion order.

#### 💡 Core Concept & Explanation

Provides built-in `size` property and fast key lookups.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const map = new Map();
const keyObj = {};
map.set(keyObj, "Value");
console.log(map.get(keyObj)); // "Value"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using plain objects when keys are non-string types.

---

### 112. 🟠 P1 [C] What is a Set and when would you use it?

> **TL;DR:** Set is a collection of unique values of any type where duplicate values are automatically ignored.

#### 💡 Core Concept & Explanation

Ideal for array deduplication and O(1) membership checks with `has()`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3] (Unique values)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting Set to compare object entries by value rather than reference address.

---

## Array Methods

### 113. 🟠 P1 [C] What does map() do?

> **TL;DR:** map() creates a brand new array populated with results of invoking a callback function on every element in the calling array.

#### 💡 Core Concept & Explanation

Non-mutating; returns new array of identical length.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const doubled = [1, 2, 3].map((x) => x * 2);
console.log(doubled); // [2, 4, 6]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting return statement inside map callback.

---

### 114. 🟠 P1 [Q] What is the difference between map() and forEach()?

> **TL;DR:** map() returns a new transformed array and supports method chaining. forEach() executes side effects per element and returns undefined.

#### 💡 Core Concept & Explanation

Use `forEach` for side effects; use `map` for transformations.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const resMap = [1, 2].map((x) => x * 2); // [2, 4]
const resEach = [1, 2].forEach((x) => x * 2); // undefined
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using map() without using or returning the returned array.

---

### 115. 🟠 P1 [C] What does filter() do?

> **TL;DR:** filter() creates a new array containing all elements that pass the truthy evaluation test of a callback predicate function.

#### 💡 Core Concept & Explanation

Non-mutating; returns new filtered array.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const evens = [1, 2, 3, 4].filter((x) => x % 2 === 0);
console.log(evens); // [2, 4]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting filter to return element when callback returns non-boolean truthy/falsy values.

---

### 116. 🟠 P1 [C] What does reduce() do?

> **TL;DR:** reduce() executes a user-supplied reducer callback on each element, passing in return value from preceding calculation, yielding a single accumulated result.

#### 💡 Core Concept & Explanation

Syntax: `arr.reduce((acc, curr, index, arr) => acc, initialValue)`

#### 🛠️ Code / Visual Diagram / Table

```javascript
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);
console.log(sum); // 6
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Omitting initialValue when array can be empty causing TypeError.

---

### 117. 🟠 P1 [C] When would you use reduce()?

> **TL;DR:** Use reduce() when accumulating numbers, grouping array items into an object, flattening arrays, or pipeline transforms.

#### 💡 Core Concept & Explanation

Versatile tool for array data transformation.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Grouping items by property
const people = [{ role: "Admin" }, { role: "User" }];
const grouped = people.reduce((acc, p) => {
  acc[p.role] = acc[p.role] || [];
  acc[p.role].push(p);
  return acc;
}, {});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Overcomplicating code with reduce when map or filter is clearer.

---

### 118. 🟠 P1 [Q] What is the difference between find() and filter()?

> **TL;DR:** find() returns the FIRST element satisfying callback condition or undefined. filter() returns an ARRAY of ALL matching elements.

#### 💡 Core Concept & Explanation

`find()` short-circuits search on first match.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const nums = [10, 20, 30];
console.log(nums.find((x) => x > 15)); // 20 (single value)
console.log(nums.filter((x) => x > 15)); // [20, 30] (array)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting find() to return an array.

---

### 119. 🟠 P1 [Q] What is the difference between some() and every()?

> **TL;DR:** some() checks if AT LEAST ONE element passes condition (returns boolean). every() checks if ALL elements pass condition.

#### 💡 Core Concept & Explanation

Both short-circuit evaluation as soon as outcome is determined.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const nums = [1, 2, 3];
console.log(nums.some((x) => x > 2)); // true
console.log(nums.every((x) => x > 2)); // false
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Calling every() on empty array returns true.

---

### 120. 🟠 P1 [Q] What is the difference between slice() and splice()?

> **TL;DR:** slice() returns a new shallow copy portion of array WITHOUT mutating original. splice() MUTATES original array by adding/removing elements.

#### 💡 Core Concept & Explanation

`slice(start, end)` vs `splice(start, deleteCount, item1, ...)`

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3)); // [2, 3] (arr unchanged)

arr.splice(1, 2); // Mutates arr!
console.log(arr); // [1, 4]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing non-mutating slice with mutating splice.

---

### 121. 🟠 P1 [Q] How does sort() work and why does numeric sorting cause problems?

> **TL;DR:** sort() converts elements to strings by default and sorts lexicographically, causing [10, 2] to sort as [10, 2]. Pass a comparator function (a, b) => a - b for numeric sorting.

#### 💡 Core Concept & Explanation

Sorts array elements IN-PLACE (mutates original array!).

#### 🛠️ Code / Visual Diagram / Table

```javascript
const nums = [10, 2, 5];
nums.sort();
console.log(nums); // [10, 2, 5] (String sort!)

nums.sort((a, b) => a - b);
console.log(nums); // [2, 5, 10] (Numeric sort)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Calling sort() without comparator function on numeric arrays.

---

### 122. 🟠 P1 [C] Which common array methods mutate the original array?

> **TL;DR:** Mutating array methods: push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill(), copyWithin().

#### 💡 Core Concept & Explanation

Non-mutating methods: `map`, `filter`, `slice`, `concat`, `flat`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const arr = [3, 1];
arr.sort(); // Mutates arr directly!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Mutating original arrays in React state handlers.

---

### 123. 🟠 P1 [C] What does flat() do?

> **TL;DR:** flat(depth) creates a new array with sub-array elements concatenated recursively up to specified depth (default 1).

#### 💡 Core Concept & Explanation

Pass `Infinity` depth to flatten arbitrarily nested arrays.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const nested = [1, [2, [3]]];
console.log(nested.flat(2)); // [1, 2, 3]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting flat() to mutate array in-place — returns new array.

---

### 124. 🟠 P1 [Q] How does array destructuring work?

> **TL;DR:** Array destructuring unpacks values from arrays into distinct variables based on element position index.

#### 💡 Core Concept & Explanation

Supports default values, skipping elements, and rest parameter collecting.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const [first, , third = 30] = [10, 20];
console.log(first, third); // 10, 30
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Matching array destructuring by key names instead of index positions.

---

### 125. 🟠 P1 [C] How would you remove duplicates from an array?

> **TL;DR:** Most efficient way: convert array to a Set using Array.from(new Set(arr)) or spread operator [...new Set(arr)].

#### 💡 Core Concept & Explanation

Alternatively use `filter()` with `indexOf()`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const nums = [1, 2, 2, 3, 1];
const unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using Set to deduplicate objects with identical properties — reference pointers differ.

---

## Async & Event Loop

### 126. 🟠 P1 [C] What is synchronous vs asynchronous JavaScript?

> **TL;DR:** Synchronous code executes line-by-line blocking subsequent execution. Asynchronous code offloads long tasks to Web APIs and processes callbacks later without blocking thread.

#### 💡 Core Concept & Explanation

Sync blocks main thread; Async non-blocking.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log("Start");
setTimeout(() => console.log("Async"), 100);
console.log("End");
// Output: Start -> End -> Async
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking async operations execute on parallel main threads.

---

### 127. 🟠 P1 [C] Is JavaScript single-threaded?

> **TL;DR:** Yes. JavaScript engine executes code on a single main thread with a single Call Stack.

#### 💡 Core Concept & Explanation

Browser runtime handles concurrency via Web Worker threads and Event Loop.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Single Call Stack executing one task at a time
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing multi-threaded browser background host environment with single-threaded JS main execution thread.

---

### 128. 🟠 P1 [C] What does "single-threaded" actually mean?

> **TL;DR:** Single-threaded means JS can only execute one line of instructions/code frame at any given instant on its Call Stack.

#### 💡 Core Concept & Explanation

Long-running synchronous loops lock the thread, freezing UI.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Long sync loop blocks UI thread
// while(true) {}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Running intensive CPU calculations on main thread.

---

### 129. 🟠 P1 [D] What is the JavaScript runtime?

> **TL;DR:** The JS runtime is the host container environment (e.g. Browser or Node.js) encompassing JS engine, Web APIs, Task Queues, and Event Loop.

#### 💡 Core Concept & Explanation

V8 engine + Web APIs (DOM, fetch, timers) + Event Loop = Browser Runtime.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// window.fetch belongs to Browser Runtime Web APIs
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking fetch or setTimeout belong to ECMAScript language core.

---

### 130. 🟠 P1 [C] What is the call stack?

> **TL;DR:** The Call Stack is a LIFO stack data structure in JS engine that tracks active function execution context frames.

#### 💡 Core Concept & Explanation

Pushes frame on call; pops frame on return.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function a() {
  b();
}
function b() {}
a(); // Stack: GEC -> a() -> b()
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Stack Overflow errors from unbounded recursion.

---

### 131. 🟠 P1 [D] What are Web APIs?

> **TL;DR:** Web APIs are asynchronous background features provided by the browser environment (timers, DOM events, fetch HTTP, geolocation).

#### 💡 Core Concept & Explanation

Web APIs execute tasks asynchronously off the main thread.

#### 🛠️ Code / Visual Diagram / Table

```javascript
setTimeout(() => {}, 1000); // Handled by Web API timer
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming Web APIs run on JS main thread.

---

### 132. 🟠 P1 [C] What is the task/macrotask queue?

> **TL;DR:** The Macrotask Queue (Task Queue) holds callbacks from setTimeout, setInterval, setImmediate, I/O operations, and user UI interactions.

#### 💡 Core Concept & Explanation

Processed one task per Event Loop cycle.

#### 🛠️ Code / Visual Diagram / Table

```javascript
setTimeout(fn, 0); // Enqueues callback into Macrotask queue
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting Macrotasks to execute before Promise microtasks.

---

### 133. 🔴 P0 [C] What is the microtask queue?

> **TL;DR:** The Microtask Queue holds high-priority callbacks from Promise handlers (.then/.catch), queueMicrotask(), and MutationObserver.

#### 💡 Core Concept & Explanation

Completely emptied after Call Stack clears, prior to next Macrotask!

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve().then(() => console.log("Microtask"));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Starving macrotask queue by recursively scheduling infinite microtasks.

---

### 134. 🔴 P0 [C] What is the event loop?

> **TL;DR:** The Event Loop is a continuous monitoring mechanism in JS runtime that orchestrates execution between Call Stack and Task Queues.

#### 💡 Core Concept & Explanation

If Stack is empty, Event Loop pushes Microtasks first, then next Macrotask.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Monitored continuously in background loop
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking Event Loop runs when Call Stack is busy executing synchronous code.

---

### 135. 🔴 P0 [Q] How does the event loop work?

> **TL;DR:** 1) Execute sync stack code. 2) Stack clears. 3) Process ALL Microtasks in queue. 4) Render UI updates if needed. 5) Process ONE Macrotask. 6) Repeat.

#### 💡 Core Concept & Explanation

Order: Sync Stack -&gt; All Microtasks -&gt; Render -&gt; 1 Macrotask.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log("1");
setTimeout(() => console.log("4"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("2");
// Output: 1 -> 2 -> 3 -> 4
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting setTimeout callback to run before Promise microtasks.

---

### 136. 🔴 P0 [Q] What is the difference between microtasks and macrotasks?

> **TL;DR:** Microtasks (Promises) have higher priority and completely empty their queue in one tick. Macrotasks (timers) execute one single task per loop tick.

#### 💡 Core Concept & Explanation

Microtasks preempt Macrotasks.

#### 🛠️ Code / Visual Diagram / Table

```javascript
setTimeout(() => console.log("Macro"), 0);
Promise.resolve().then(() => console.log("Micro"));
// Micro prints before Macro
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing execution timing priorities.

---

### 137. 🔴 P0 [C] Why do Promise callbacks execute before setTimeout() callbacks?

> **TL;DR:** Promise callbacks land in the Microtask Queue which has higher priority and is completely emptied before the Event Loop picks Macrotasks.

#### 💡 Core Concept & Explanation

Microtasks are processed immediately after call stack frame clears.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve().then(() => console.log("P"));
setTimeout(() => console.log("T"), 0);
// "P" then "T"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking setTimeout(fn, 0) bypasses queues.

---

### 138. 🟠 P1 [C] Does setTimeout(fn, 0) execute immediately?

> **TL;DR:** No. setTimeout(fn, 0) schedules callback for the NEXT Macrotask queue tick after Call Stack clears AND all pending Microtasks complete.

#### 💡 Core Concept & Explanation

Minimum timer delay in browser spec is ~4ms.

#### 🛠️ Code / Visual Diagram / Table

```javascript
setTimeout(() => console.log("Timer"), 0);
console.log("Sync"); // "Sync" runs first!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming zero delay means synchronous execution.

---

### 139. 🟠 P1 [Q] What happens when the call stack is busy?

> **TL;DR:** When Call Stack is busy executing synchronous code, the Event Loop is blocked, freezing UI rendering and delaying timer callbacks.

#### 💡 Core Concept & Explanation

Offload heavy CPU work to Web Workers.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Sync block delays timers
// const end = Date.now() + 5000; while(Date.now() < end) {}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Running intensive calculations on main UI thread.

---

### 140. 🟠 P1 [C] What is callback hell?

> **TL;DR:** Callback hell is deep nesting of asynchronous callbacks ('Pyramid of Doom'), making code difficult to read, maintain, and handle errors.

#### 💡 Core Concept & Explanation

Solved using Promises and `async/await`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      // Pyramid of doom
    });
  });
});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Nesting callbacks instead of returning Promises.

---

### 141. 🟠 P1 [C] What are the limitations of callback-based asynchronous programming?

> **TL;DR:** Inversion of control (trusting third-party code to call callback), unhandled exceptions, inability to return values or throw try/catch errors.

#### 💡 Core Concept & Explanation

Promises solve inversion of control by returning a control handle object.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Third party library calling callback 0 or 2 times instead of 1
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Lack of standardized error propagation in callbacks.

---

### 142. 🔴 P0 [P] What is concurrency?

> **TL;DR:** Concurrency is managing multiple tasks at the same time by interleaving execution (e.g. Event Loop juggling async HTTP request timers).

#### 💡 Core Concept & Explanation

JS achieves concurrency on a single thread via non-blocking I/O Event Loop.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Multiple pending fetch requests handled concurrently
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Confusing concurrency with multi-threaded parallelism.

---

### 143. 🔴 P0 [Q] What is the difference between concurrency and parallelism?

> **TL;DR:** Concurrency is dealing with multiple tasks by switching execution context (single CPU core). Parallelism is executing multiple tasks simultaneously (multiple CPU cores).

#### 💡 Core Concept & Explanation

Concurrency = Structure. Parallelism = Simultaneous Execution (Web Workers).

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Concurrency: Event Loop. Parallelism: Web Workers on multi-core CPU.
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Claiming JS performs multi-core parallelism on main call stack.

---

## Promises & Async/Await

### 144. 🔴 P0 [C] What is a Promise?

> **TL;DR:** A Promise is an object representing eventual completion (or failure) of an asynchronous operation and its resulting value.

#### 💡 Core Concept & Explanation

Acts as a placeholder for a future value.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 100);
});
promise.then((data) => console.log(data));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting to return promise in chained .then() calls.

---

### 145. 🔴 P0 [C] Why were Promises introduced?

> **TL;DR:** Promises were introduced in ES6 to solve callback hell, restore control flow, provide unified error handling, and simplify async composition.

#### 💡 Core Concept & Explanation

Replaces deeply nested callbacks with flat `.then()` chains.

#### 🛠️ Code / Visual Diagram / Table

```javascript
fetchData().then(step1).then(step2).catch(handleError);
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Nesting promises inside .then() instead of returning them.

---

### 146. 🔴 P0 [C] What are the three states of a Promise?

> **TL;DR:** 1) Pending: Initial state, non-fulfilled/rejected. 2) Fulfilled: Operation completed successfully. 3) Rejected: Operation failed.

#### 💡 Core Concept & Explanation

Promise state transitions from Pending to Settled (Fulfilled or Rejected) ONCE and is immutable.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Pending -> Fulfilled OR Rejected
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Attempting to resolve a Promise twice — state is immutable after settling.

---

### 147. 🟠 P1 [C] What does .then() do?

> **TL;DR:** .then(onFulfilled, onRejected) registers callbacks to execute when Promise fulfills or rejects, returning a new Promise for chaining.

#### 💡 Core Concept & Explanation

Always returns a new Promise resolving to callback return value.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve(5)
  .then((x) => x * 2)
  .then((res) => console.log(res)); // 10
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Not returning values inside .then() callbacks.

---

### 148. 🟠 P1 [C] What does .catch() do?

> **TL;DR:** .catch(onRejected) registers an error handler callback for promise rejections or unhandled runtime exceptions in chain.

#### 💡 Core Concept & Explanation

Syntactic sugar for `.then(null, onRejected)`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.reject(new Error("Failed")).catch((err) => console.log(err.message));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting .catch() at end of promise chains leading to UnhandledPromiseRejection.

---

### 149. 🟠 P1 [C] What does .finally() do?

> **TL;DR:** .finally(callback) executes a cleanup function when Promise settles (either fulfilled or rejected) without receiving result parameters.

#### 💡 Core Concept & Explanation

Passes through original fulfilled value or rejection error to next handler.

#### 🛠️ Code / Visual Diagram / Table

```javascript
showLoading();
fetchData()
  .then(render)
  .catch(showError)
  .finally(() => hideLoading()); // Always runs
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting .finally() to receive resolution value parameter.

---

### 150. 🔴 P0 [C] What is Promise chaining?

> **TL;DR:** Promise chaining is connecting multiple .then() handlers sequentially where each handler receives the returned result of the previous promise.

#### 💡 Core Concept & Explanation

Flattens async sequence into readable top-to-bottom pipeline.

#### 🛠️ Code / Visual Diagram / Table

```javascript
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => console.log(posts));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting return keyword inside .then() break sequence.

---

### 151. 🔴 P0 [Q] What happens when a .then() callback returns a value?

> **TL;DR:** Returning a plain primitive/object value wraps that value into a automatically resolved Promise (Promise.resolve(val)) passed to next .then().

#### 💡 Core Concept & Explanation

Allows chaining synchronous calculations inside promise pipelines.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve(2)
  .then((val) => val * 5) // Returns 10
  .then((res) => console.log(res)); // 10
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming returning non-promise breaks promise chain.

---

### 152. 🔴 P0 [Q] What happens when a .then() callback returns another Promise?

> **TL;DR:** When a .then() handler returns a Promise, subsequent .then() calls wait for that returned inner Promise to settle before executing.

#### 💡 Core Concept & Explanation

Unwraps inner promise automatically (flattens nested async calls).

#### 🛠️ Code / Visual Diagram / Table

```javascript
fetchUser()
  .then((user) => fetchOrders(user.id)) // Returns new Promise
  .then((orders) => console.log(orders)); // Waits for fetchOrders!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Not returning inner promise causing outer chain to resolve immediately.

---

### 153. 🔴 P0 [Q] What happens when a Promise callback throws an error?

> **TL;DR:** Throwing an error inside executor function or .then() handler automatically converts rejection state, passing error to nearest .catch().

#### 💡 Core Concept & Explanation

Implicit try/catch block inside Promise implementation.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve()
  .then(() => {
    throw new Error("Oops");
  })
  .catch((err) => console.log(err.message)); // "Oops"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Throwing error in async callback (like setTimeout) inside promise executor — escapes catch!

---

### 154. 🔴 P0 [C] What is Promise.resolve()?

> **TL;DR:** Promise.resolve(value) returns a Promise object resolved with the given value.

#### 💡 Core Concept & Explanation

Converts values or thenables into actual Promises.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.resolve(42).then((v) => console.log(v)); // 42
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing existing Promise into Promise.resolve returns same Promise reference.

---

### 155. 🔴 P0 [C] What is Promise.reject()?

> **TL;DR:** Promise.reject(reason) returns a Promise object rejected with the specified error reason.

#### 💡 Core Concept & Explanation

Useful for constructing failing promise test mocks.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.reject(new Error("Failed")).catch((e) => console.log(e.message));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Passing string instead of Error object into Promise.reject.

---

### 156. 🔴 P0 [C] What is Promise.all()?

> **TL;DR:** Promise.all([p1, p2]) runs promises concurrently and resolves an array of results when ALL fulfill. Fails fast immediately if ANY promise rejects.

#### 💡 Core Concept & Explanation

Preserves original array index order regardless of resolution timing.

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then((res) =>
  console.log(res),
); // [1, 2]
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using Promise.all for independent requests where one failure shouldn't cancel all.

---

### 157. 🔴 P0 [Q] What is the difference between Promise.all(), allSettled(), race(), and any()?

> **TL;DR:** all: All fulfill or fail-fast. allSettled: Waits for all to finish (never rejects). race: First to settle wins. any: First to fulfill wins.

#### 💡 Core Concept & Explanation

Concurrency Static Comparison:
all: All fulfill (fails fast)
allSettled: Returns status array for all
race: First settled (fulfill OR reject)
any: First fulfilled success

#### 🛠️ Code / Visual Diagram / Table

```javascript
Promise.allSettled([Promise.resolve(1), Promise.reject("err")]).then((res) =>
  console.log(res[1].status),
); // "rejected"
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using race when you only want the first successful fulfillment (use any).

---

### 158. 🟠 P1 [C] What does async do and what does an async function return?

> **TL;DR:** The async keyword declares an asynchronous function. It automatically wraps function execution and returns a Promise resolving to return value.

#### 💡 Core Concept & Explanation

Always returns a Promise even if returning primitive value.

#### 🛠️ Code / Visual Diagram / Table

```javascript
async function getNum() {
  return 42;
}
getNum().then((v) => console.log(v)); // 42
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting async function to return raw primitive directly without Promise.

---

### 159. 🔴 P0 [C] What does await do and how is it related to Promises?

> **TL;DR:** await pauses async function execution until Promise settles, returning resolution value or throwing rejection error. Code after await runs as Microtask.

#### 💡 Core Concept & Explanation

Can only be used inside `async` functions or ES modules (Top-level await).

#### 🛠️ Code / Visual Diagram / Table

```javascript
async function run() {
  const val = await Promise.resolve(100);
  console.log(val); // 100
}
run();
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using await sequentially inside loops when operations could run in parallel with Promise.all.

---

## DOM & Web APIs

### 160. 🟠 P1 [D] What is the DOM?

> **TL;DR:** The DOM (Document Object Model) is an in-memory tree data structure representation of an HTML document, enabling JS to manipulate page structure, style, and content.

#### 💡 Core Concept & Explanation

Node hierarchy: Document -&gt; Element -&gt; Text.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const heading = document.createElement("h1");
heading.textContent = "DOM Title";
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking DOM is part of core ECMAScript standard — it is a Web API.

---

### 161. 🟠 P1 [Q] How does JavaScript interact with the DOM?

> **TL;DR:** JavaScript queries DOM nodes via document.querySelector/getElementById, modifies properties/classes, attaches event listeners, and mutates element tree structure.

#### 💡 Core Concept & Explanation

Triggers browser reflow (layout) and repaint on visual mutations.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const btn = document.querySelector("#submit-btn");
btn.addEventListener("click", () => console.log("Clicked!"));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Performing frequent DOM reads/writes in loops causing Layout Thrashing.

---

### 162. 🟠 P1 [C] What is event bubbling?

> **TL;DR:** Event bubbling is the default propagation phase where an event triggered on a child element bubbles UP through ancestor DOM elements up to document window.

#### 💡 Core Concept & Explanation

Phase 3 of DOM Event propagation.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Event on button bubbles up to parent div
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Unintended parent click handlers triggering when child element clicked.

---

### 163. 🟠 P1 [C] What is event capturing?

> **TL;DR:** Event capturing (trickling) is phase 1 of event propagation where event descends from window DOWN through DOM ancestors to target element.

#### 💡 Core Concept & Explanation

Enable by setting `{ capture: true }` in addEventListener.

#### 🛠️ Code / Visual Diagram / Table

```javascript
el.addEventListener("click", handler, { capture: true });
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming capturing phase happens after bubbling.

---

### 164. 🔴 P0 [C] What is event delegation and why is it useful?

> **TL;DR:** Event delegation is attaching a single event listener to a parent element to handle events for current and future child elements via event bubbling.

#### 💡 Core Concept & Explanation

Saves memory by reducing listener count and handles dynamically added children.

#### 🛠️ Code / Visual Diagram / Table

```javascript
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Item clicked:", e.target.textContent);
  }
});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting to check event.target matches expected selector.

---

### 165. 🟠 P1 [Q] What is the difference between event.target and event.currentTarget?

> **TL;DR:** event.target refers to the actual element that triggered/clicked the event. event.currentTarget refers to element holding event listener.

#### 💡 Core Concept & Explanation

Inside event handler: `this === event.currentTarget`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
parent.addEventListener("click", (e) => {
  console.log(e.target); // Actual clicked child button
  console.log(e.currentTarget); // Parent element holding listener
});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using target when currentTarget was intended in delegation.

---

### 166. 🟠 P1 [Q] What is the difference between preventDefault() and stopPropagation()?

> **TL;DR:** preventDefault() cancels default browser action (e.g. form submission reload). stopPropagation() stops event from bubbling up DOM tree.

#### 💡 Core Concept & Explanation

preventDefault does NOT stop event bubbling.

#### 🛠️ Code / Visual Diagram / Table

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page refresh
});
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking preventDefault stops event bubbling.

---

### 167. 🟠 P1 [Q] What is the difference between innerHTML, innerText, and textContent?

> **TL;DR:** innerHTML parses HTML markup string (XSS risk). textContent returns raw text including hidden elements. innerText returns visible rendered text aware of CSS styling.

#### 💡 Core Concept & Explanation

textContent is fastest and safest for plain text insertion.

#### 🛠️ Code / Visual Diagram / Table

```javascript
el.textContent = "Safe Text"; // No XSS vulnerability
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using innerHTML with user input causing Cross-Site Scripting (XSS) attacks.

---

### 168. 🟠 P1 [Q] What is the difference between localStorage, sessionStorage, and cookies?

> **TL;DR:** localStorage persists permanently (5MB). sessionStorage persists until tab closes (5MB). Cookies are sent with HTTP headers (4KB, HttpOnly/SameSite flags).

#### 💡 Core Concept & Explanation

Cookies support HttpOnly flag preventing client XSS script access.

#### 🛠️ Code / Visual Diagram / Table

```javascript
localStorage.setItem("theme", "dark");
sessionStorage.setItem("session", "active");
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Storing sensitive Auth JWT tokens in localStorage vulnerable to XSS.

---

### 169. 🟠 P1 [C] What is fetch() and what does it return?

> **TL;DR:** fetch() is a Web API method for making network HTTP requests. It returns a Promise resolving to a Response object.

#### 💡 Core Concept & Explanation

fetch Promise does NOT reject on HTTP 404 or 500 error status codes — check `res.ok`!

#### 🛠️ Code / Visual Diagram / Table

```javascript
fetch("/api/data")
  .then((res) => {
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming fetch Promise rejects automatically on HTTP 404/500 errors.

---

### 170. 🔴 P0 [C] What is CORS and why does it exist?

> **TL;DR:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism restricting cross-origin HTTP requests using HTTP headers to prevent unauthorized API access.

#### 💡 Core Concept & Explanation

Browser blocks cross-origin fetch reads unless server sends `Access-Control-Allow-Origin` header.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Server response header:
// Access-Control-Allow-Origin: *
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Trying to fix CORS errors on frontend JS code instead of backend response headers.

---

## Output Trick Questions

### 171. 🔴 P0 [Q] Predict the output of a var hoisting example and explain why.

> **TL;DR:** Predict the exact evaluation order of var hoisting inside function scopes.

#### 💡 Core Concept & Explanation

var declarations are hoisted with initial value `undefined`.

#### 🛠️ Code / Visual Diagram / Table

```javascript
var num = 10;
function check() {
  console.log(num); // undefined! (local var num is hoisted here)
  var num = 20;
  console.log(num); // 20
}
check();
// Output: undefined -> 20
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting local var num shadows global num from creation phase.

---

### 172. 🔴 P0 [Q] Predict the output of a closure inside a loop and explain why.

> **TL;DR:** Predict output of var in for loop with setTimeout vs let in for loop.

#### 💡 Core Concept & Explanation

var shares single function scope variable; let creates block scope per iteration.

#### 🛠️ Code / Visual Diagram / Table

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 50);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 50);
}
// Output: var: 3 (x3) -> let: 0, let: 1, let: 2
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Expecting var loop callbacks to print 0, 1, 2.

---

### 173. 🔴 P0 [Q] Predict the output of this with regular vs arrow functions.

> **TL;DR:** Predict output when regular methods vs arrow methods are called directly vs passed as callbacks.

#### 💡 Core Concept & Explanation

Arrow function captures lexical context of creation birthplace.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const obj = {
  name: "Obj",
  regular() {
    console.log(this.name);
  },
  arrow: () => console.log(this.name),
};

obj.regular(); // "Obj"
obj.arrow(); // undefined (lexical this is window)

const detached = obj.regular;
detached(); // undefined (default binding)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Assuming object literal creates lexical scope for arrow functions.

---

### 174. 🔴 P0 [Q] Predict the output of Promise + setTimeout() code and explain the event loop.

> **TL;DR:** Predict exact execution order of sync logs, Promise microtasks, and setTimeout macrotasks.

#### 💡 Core Concept & Explanation

Order: Sync Stack -&gt; Microtasks -&gt; Macrotasks.

#### 🛠️ Code / Visual Diagram / Table

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1 -> 4 -> 3 -> 2
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking setTimeout(0) runs before Promise microtasks.

---

### 175. 🔴 P0 [Q] Predict the output of async/await + Promise code and explain microtask behavior.

> **TL;DR:** Predict order of async execution pausing at await expression.

#### 💡 Core Concept & Explanation

Code after await is pushed as Microtask.

#### 🛠️ Code / Visual Diagram / Table

```javascript
async function foo() {
  console.log("A");
  await null;
  console.log("B");
}
console.log("C");
foo();
console.log("D");
// Output: C -> A -> D -> B
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Thinking code after await runs synchronously.

---

## Coding Challenges

### 176. 🔴 P0 [Q] Implement map(), filter(), and reduce() from scratch.

> **TL;DR:** Write polyfills for map, filter, and reduce array methods on Array.prototype.

#### 💡 Core Concept & Explanation

Handles callback invocation, sparse indices, and accumulator initial values.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// 1. myMap
Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) res[i] = cb(this[i], i, this);
  }
  return res;
};

// 2. myFilter
Array.prototype.myFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && cb(this[i], i, this)) res.push(this[i]);
  }
  return res;
};

// 3. myReduce
Array.prototype.myReduce = function (cb, init) {
  let acc = init !== undefined ? init : this[0];
  let start = init !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    if (i in this) acc = cb(acc, this[i], i, this);
  }
  return acc;
};
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Forgetting sparse array check (i in this).

---

### 177. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.

> **TL;DR:** Implement a debounce utility function that delays execution until N milliseconds elapse since last call.

#### 💡 Core Concept & Explanation

Clears existing timer on every new invocation and sets new delayed execution timer.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function debounce(fn, delay) {
  let timerId = null;
  return function (...args) {
    const ctx = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(ctx, args), delay);
  };
}

const log = debounce((msg) => console.log(msg), 300);
log("Search A");
log("Search B"); // Only Search B executes!
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Losing this context or argument array.

---

### 178. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.

> **TL;DR:** Implement throttle guaranteeing function execution at most once every N milliseconds.

#### 💡 Core Concept & Explanation

Compares current timestamp with last execution timestamp.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using Date.now() without storing lastCall across closure calls.

---

### 179. 🔴 P0 [Q] Implement Promise.all() from scratch.

> **TL;DR:** Implement Promise.all returning a Promise resolving an array of results while preserving original array index order.

#### 💡 Core Concept & Explanation

Tracks completion counter and preserves array index position.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError("Must be array"));
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((val) => {
          results[idx] = val; // Preserve array index order!
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject); // Fail fast
    });
  });
}
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Using push() instead of results[idx] = val breaking output index order.

---

### 180. 🔴 P0 [Q] Implement a deep-clone utility and explain the limitations of your approach.

> **TL;DR:** Implement a recursive deepClone function handling Objects, Arrays, Dates, and primitives.

#### 💡 Core Concept & Explanation

Recursively creates independent copies of nested data structures in Heap memory.

#### 🛠️ Code / Visual Diagram / Table

```javascript
function deepClone(target) {
  if (target === null || typeof target !== "object") return target;
  if (target instanceof Date) return new Date(target.getTime());
  if (Array.isArray(target)) return target.map((item) => deepClone(item));

  const clone = {};
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      clone[key] = deepClone(target[key]);
    }
  }
  return clone;
}

const orig = { a: [1, 2], b: { c: 3 } };
const copy = deepClone(orig);
copy.b.c = 99;
console.log(orig.b.c); // 3 (Unmutated!)
```

#### ⚠️ Interview Pitfall / Pro-Tip

- Missing primitive base case causing stack overflow error.

---
