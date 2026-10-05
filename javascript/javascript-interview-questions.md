# JavaScript & TypeScript Technical Interview Master List (101 Questions)

**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Frontend / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup/interview ROI) · 🟠 P1 Important

**Type** — [C] Conceptual · [Q] Code/Mechanism · [D] Architecture/Design · [P] Performance/Optimization

---

## Fundamentals

1. 🔴 P0 [Q] What is the difference between primitive and reference types in how they are stored, copied, and compared?
2. 🟠 P1 [C] What does typeof do, and why does typeof null return "object"?
3. 🟠 P1 [Q] What is the difference between null, undefined, and an undeclared variable?
4. 🟠 P1 [C] What is NaN, why is NaN !== NaN, and how do Number.isNaN() and Object.is() differ from ===?
5. 🟠 P1 [C] What are truthy and falsy values, and what are all the falsy values in JavaScript?
6. 🔴 P0 [Q] What is type coercion (implicit vs explicit), and how does == differ from ===?
7. 🟠 P1 [Q] How do &&, ||, ??, and ?. work, and what is short-circuit evaluation?
8. 🟠 P1 [C] What are JavaScript's key characteristics (dynamically typed, single-threaded, garbage-collected, multi-paradigm), and how is it related to ECMAScript?

## How JavaScript Works

9. 🔴 P0 [C] What is a JavaScript engine (e.g., V8), what happens between writing code and running it (parsing, AST, bytecode interpreter, JIT-optimized machine code), and is JavaScript interpreted, compiled, or both?
10. 🔴 P0 [D] What is the difference between the JavaScript engine and the runtime environment (browser vs Node.js), what does "single-threaded" actually mean, and what are the parts of the runtime (memory heap, call stack, Web APIs/libuv, task queues, event loop)?
11. 🔴 P0 [Q] What is an execution context, what happens in its creation (memory) phase and execution phase, what is a lexical environment, and how does the call stack manage global and function execution contexts?
12. 🟠 P1 [C] How is memory managed in JavaScript (stack vs heap, garbage collection via mark-and-sweep and reachability), and what causes memory leaks (closures, forgotten event listeners, timers)?

## Scope & Hoisting

13. 🔴 P0 [Q] What is the difference between var, let, and const in scope, redeclaration, and reassignment, and can a const object be modified?
14. 🟠 P1 [C] What are global, function, block, and lexical scope, and how do the scope chain and variable shadowing work?
15. 🔴 P0 [Q] What is hoisting, how do var, let/const, function declarations, and function expressions each behave, and what is the Temporal Dead Zone?

## Functions & Closures

16. 🟠 P1 [C] What are first-class functions, higher-order functions, and callback functions?
17. 🔴 P0 [Q] What is the difference between function declarations, function expressions, and arrow functions, including whether arrow functions have their own this and arguments and whether they can be constructors?
18. 🟠 P1 [Q] What are rest parameters, spread syntax, default parameters, and the arguments object?
19. 🔴 P0 [Q] What is a closure, how does it work, and what are its practical uses (including IIFEs)?
20. 🟠 P1 [C] What is a pure function, and what is a side effect?
21. 🟠 P1 [C] What are currying and function composition?

## this & Binding

22. 🔴 P0 [C] How is the value of this determined: default binding (and the effect of strict mode), implicit binding, explicit binding, new, and arrow functions?
23. 🔴 P0 [Q] What happens to this when a method is passed as a callback, and how do you fix it?
24. 🔴 P0 [Q] What is the difference between call(), apply(), and bind()?

## Objects & Prototypes

25. 🟠 P1 [C] How are objects created and accessed (dot vs bracket notation), how does destructuring work for objects and arrays, and what do Object.keys(), Object.values(), and Object.entries() do?
26. 🔴 P0 [Q] What is the difference between a shallow and a deep copy, and what are the limitations of spread, Object.assign(), JSON.parse(JSON.stringify(obj)), and structuredClone()?
27. 🟠 P1 [C] What are object mutation and immutability, and why does Object.freeze() not deeply freeze an object?
28. 🔴 P0 [Q] What is the prototype chain, how does prototypal inheritance work, and what is the difference between prototype and \_\_proto\_\_?

## Classes & Structures

29. 🟠 P1 [Q] What happens internally when new is used, and how do constructor functions and Object.create() relate to it?
30. 🟠 P1 [C] How do classes relate to prototypes, and how do extends, super, static methods, method overriding, getters/setters, and #private fields work?
31. 🟠 P1 [Q] When would you use a Map or Set instead of an object or array, and how do you remove duplicates from an array with a Set?

## Array Methods & Iteration

32. 🟠 P1 [Q] When would you use map(), filter(), reduce(), forEach(), find(), some(), and every(), and how do they differ?
33. 🟠 P1 [Q] Which array methods mutate the original array, including slice() vs splice(), the numeric sort() pitfall, flat(), and the non-mutating toSorted() and toReversed()?
34. 🟠 P1 [Q] What is the difference between for...in and for...of?

## Error Handling

35. 🟠 P1 [C] How do try/catch/finally work, and when would you create a custom Error class?

## Async & Event Loop

36. 🔴 P0 [Q] How does the event loop work, what is the difference between microtasks and macrotasks, why do Promise callbacks run before setTimeout(fn, 0), and what happens when the call stack is busy?
37. 🔴 P0 [C] What is the difference between concurrency and parallelism?
38. 🟠 P1 [C] What is callback hell, what are the limitations of callbacks, and why were Promises introduced?

## Promises & Async/Await

39. 🔴 P0 [C] What is a Promise, what are its three states, and what do .then(), .catch(), and .finally() do?
40. 🔴 P0 [Q] How does Promise chaining work when a .then() callback returns a value, returns another Promise, or throws an error?
41. 🔴 P0 [Q] What do Promise.resolve() and Promise.reject() do, and what is the difference between Promise.all(), allSettled(), race(), and any()?
42. 🔴 P0 [C] What does an async function return, and how is await related to Promises?
43. 🔴 P0 [Q] How do you handle errors with async/await, and what is an unhandled Promise rejection?
44. 🔴 P0 [Q] Why doesn't await work as expected inside forEach(), and what is the difference between sequential and parallel awaits?
45. 🟠 P1 [Q] How do async race conditions cause stale results, and how do AbortController and AbortSignal cancel in-flight requests to prevent them?

## DOM & Web APIs

46. 🟠 P1 [Q] What is the DOM, and how does JavaScript interact with it?
47. 🔴 P0 [Q] How do event bubbling, capturing, and delegation work, and what are the differences between event.target and event.currentTarget, and between preventDefault() and stopPropagation()?
48. 🟠 P1 [Q] What is the difference between innerHTML, innerText, and textContent, and what is the XSS risk with innerHTML?
49. 🟠 P1 [Q] What is the difference between localStorage, sessionStorage, and cookies, how do XSS and CSRF differ as risks, and what do the HttpOnly, Secure, and SameSite cookie flags do?
50. 🔴 P0 [C] What does fetch() return (the Response object), why doesn't it reject on 4xx/5xx errors and how do you check response.ok, how are credentials sent, and what is CORS and why does it exist?

## Modules

51. 🟠 P1 [Q] What is the difference between ES modules and CommonJS?

## Output & Debugging Questions

52. 🔴 P0 [Q] Predict the output of a var hoisting example and explain why.
53. 🔴 P0 [Q] Predict the output of a closure inside a loop and explain why.
54. 🔴 P0 [Q] Predict the output of this with regular vs arrow functions.
55. 🔴 P0 [Q] Predict the output of Promise + setTimeout() code and explain the event loop.
56. 🔴 P0 [Q] Predict the output of async/await + Promise code and explain microtask behavior.
57. 🔴 P0 [Q] Find and fix the bug in async code that uses await inside forEach(), leaves a Promise rejection unhandled, or shows stale results because of a race condition.
58. 🔴 P0 [Q] Find and fix the bug in code that loses this in a callback or reads a stale closure value.

## Coding Challenges (High-Yield Polyfills & Utilities)

59. 🔴 P0 [Q] Implement Array.prototype.reduce() from scratch (handling empty arrays and missing initialValue).
60. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.
61. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.
62. 🔴 P0 [Q] Implement Promise.all() from scratch (order preservation, fast-reject).
63. 🔴 P0 [Q] Implement memoize() and explain how closures make it work.
64. 🟠 P1 [Q] Implement an EventEmitter with on(), off(), once(), and emit().
65. 🟠 P1 [Q] Implement a deep-clone utility (and explain structuredClone vs JSON.parse/stringify limitations).

## DSA in JavaScript

### Built-in Complexities & Structures
66. 🔴 P0 [P] What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?
67. 🟠 P1 [Q] How do you implement a stack and a queue in JavaScript, and why is shift() inefficient for a queue?

### Strings & Palindromes
68. 🔴 P0 [Q] Reverse a string and check whether it is a palindrome, with and without built-in methods.
69. 🔴 P0 [Q] Check whether two strings are anagrams.
70. 🔴 P0 [Q] Count character frequencies in a string and find the first non-repeating character.
71. 🟠 P1 [Q] Reverse the words in a sentence and capitalize the first letter of each word.

### Sliding Window & Stack
72. 🟠 P1 [Q] Check whether a string of brackets is valid using a stack.
73. 🔴 P0 [Q] Find the longest substring without repeating characters (sliding window pattern).

### Arrays, Two Pointers & Hash Maps
74. 🔴 P0 [Q] Find the largest and second-largest numbers in an array without sorting.
75. 🔴 P0 [Q] Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.
76. 🟠 P1 [Q] Find the most frequent element in an array using a hash map.
77. 🟠 P1 [Q] Find the missing number in an array containing 1 to n.
78. 🟠 P1 [Q] Move all zeros to the end of an array in place while preserving order.
79. 🟠 P1 [Q] Rotate an array by k positions.

### Array Transformations & Recursion
80. 🟠 P1 [Q] Merge two sorted arrays into one sorted array.
81. 🟠 P1 [Q] Find the intersection of two arrays.
82. 🟠 P1 [Q] Split an array into chunks of size n.
83. 🟠 P1 [Q] Flatten a deeply nested array or object into dot-notation keys (e.g. { a: { b: 1 } } → { "a.b": 1 }).
84. 🟠 P1 [Q] Compute Fibonacci recursively, iteratively, and with memoization, and compare their time complexities.

## TypeScript

85. 🔴 P0 [C] What is TypeScript, how does it relate to JavaScript, and why doesn't it check types at runtime (type erasure)?
86. 🔴 P0 [C] How does type inference work, and when should you add explicit type annotations?
87. 🔴 P0 [Q] What is the difference between type and interface, and when would you use each?
88. 🟠 P1 [C] What is structural typing, and how does it differ from nominal typing?
89. 🔴 P0 [Q] What is the difference between any, unknown, and never?
90. 🔴 P0 [Q] What are union and intersection types, and how do literal types work?
91. 🟠 P1 [Q] How do optional properties, null/undefined, and strictNullChecks work, what does strict mode enable, and what does readonly do?
92. 🔴 P0 [Q] What is type narrowing, and how do typeof, instanceof, in, and custom type predicates (x is T) narrow types?
93. 🟠 P1 [Q] What is a discriminated union, and how do you use never for exhaustive checks?
94. 🟠 P1 [Q] How do you type function parameters, return values, optional/default parameters, and callbacks, and what are function overloads?
95. 🔴 P0 [Q] What are generics, how do you write generic functions, interfaces, and types, and how do generic constraints (extends) work?
96. 🟠 P1 [Q] How do keyof and indexed access types (T[K]) work, and how do they combine with generics (e.g., a type-safe getProperty function)?
97. 🔴 P0 [Q] What do Partial, Required, Pick, Omit, and Record do, and when would you use each?
98. 🟠 P1 [Q] What do ReturnType and Parameters do, and when are they useful?
99. 🟠 P1 [Q] What is the difference between an enum and a union of string literals, and what does as const do?
100. 🟠 P1 [Q] How do you type an async function that fetches API data, and why should you still validate the response at runtime?
101. 🟠 P1 [Q] What are type assertions (as), what are their risks, and how do you safely handle unknown errors in catch blocks?

---

## Revision Modes

- **Core Interview Fast-Sweep:** all 🔴 P0 questions (Essential concepts, How JavaScript Works, Event Loop, Closures, `this`, Promises, Polyfills, core DSA, core TypeScript)
- **Full Coverage:** 🔴 P0 + 🟠 P1
- **Machine Coding / Output Round:** Focus on the Output & Debugging Questions and Coding Challenges sections
- **JS DSA Round:** Focus on the DSA in JavaScript section
- **TypeScript Round:** Focus on the TypeScript section
