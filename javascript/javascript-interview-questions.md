# JavaScript Technical Interview Master List (78 Questions)

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

### Hash Maps & Frequency Counting
67. 🔴 P0 [Q] [LeetCode 1: Two Sum](https://leetcode.com/problems/two-sum/) — Find two indices whose values sum to target using a hash map lookup vs brute-force nested loops.
68. 🔴 P0 [Q] [LeetCode 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/) — Check whether two strings are anagrams using a 26-element frequency array vs string sorting.
69. 🔴 P0 [Q] [LeetCode 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/) — Group an array of strings into anagram clusters using sorted string keys vs frequency string hashing in a Map.
70. 🔴 P0 [Q] [LeetCode 387: First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/) — Find the index of the first non-repeating character using two-pass counting vs quadratic scanning.
71. 🟠 P1 [Q] [LeetCode 349: Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) — Find the intersection of two arrays returning unique elements using a Set vs linear includes scan.

### Strings & Two Pointers
72. 🔴 P0 [Q] [LeetCode 125: Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) — Check whether a string is a palindrome with two pointers and in-place ASCII character skips vs built-in reverse string allocations.
73. 🟠 P1 [Q] [LeetCode 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) — Reverse words in a string, trim whitespace, and reduce multiple spaces to a single space.
74. 🟠 P1 [Q] [LeetCode 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/) — Move all zeros to the end of an array in place while preserving order using read/write pointers vs extra array buffers.
75. 🟠 P1 [Q] [LeetCode 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) — Merge two sorted arrays into nums1 in-place from back to front using 3 pointers vs array copy and sort.

### Sliding Window
76. 🔴 P0 [Q] [LeetCode 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — Find the longest substring without repeating characters using dynamic sliding window with Map index jumping vs brute-force substring scanning.

### Stack & Queue
77. 🟠 P1 [Q] [LeetCode 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — Check whether a string of brackets is valid using a LIFO array stack vs quadratic string replacement.
78. 🟠 P1 [Q] [LeetCode 232: Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) — Implement a FIFO queue using two LIFO array stacks with amortized O(1) operations.

---

## Next Step: TypeScript Mastery

For dedicated TypeScript preparation (type system, generics, utility types, discriminated unions, and production API safety), practice the separate master roadmap:
👉 [TypeScript Full-Stack & GenAI Technical Master List (50 Questions)](../typescript/typescript-interview-questions.md)

---

## Revision Modes

- **Core Interview Fast-Sweep:** all 🔴 P0 questions (Essential concepts, How JavaScript Works, Event Loop, Closures, `this`, Promises, Polyfills, core DSA)
- **Full Coverage:** 🔴 P0 + 🟠 P1
- **Machine Coding / Output Round:** Focus on the Output & Debugging Questions and Coding Challenges sections
- **JS DSA Round:** Focus on the DSA in JavaScript section
- **TypeScript Round:** Switch to the dedicated [TypeScript Master List](../typescript/typescript-interview-questions.md)

