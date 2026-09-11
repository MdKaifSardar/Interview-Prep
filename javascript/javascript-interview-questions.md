# JavaScript Technical Interview Master List (180 Questions)
**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Frontend / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup/interview ROI) · 🟠 P1 Important · 🟡 P2 Depth / Advanced

**Type** — [C] Conceptual · [Q] Code/Mechanism · [D] Architecture/Design · [P] Performance/Optimization

---

## Fundamentals

### 1. 🟠 P1 [C] What is JavaScript and what are its key characteristics?
### 2. 🟠 P1 [C] What is ECMAScript and how is it related to JavaScript?
### 3. 🟠 P1 [C] Is JavaScript interpreted, compiled, or both?
### 4. 🔴 P0 [C] What are the primitive data types in JavaScript?
### 5. 🔴 P0 [C] What are reference/non-primitive data types?
### 6. 🔴 P0 [Q] What is the difference between primitive and reference values?
### 7. 🟠 P1 [C] Is JavaScript statically or dynamically typed?
### 8. 🟠 P1 [C] What does typeof do?
### 9. 🔴 P0 [C] Why does typeof null return "object"?
### 10. 🟠 P1 [C] What is undefined?
### 11. 🟠 P1 [C] What is null?
### 12. 🟠 P1 [Q] What is the difference between null, undefined, and an undeclared variable?
### 13. 🟠 P1 [C] What is NaN and why is NaN !== NaN?
### 14. 🟠 P1 [C] What are truthy and falsy values?
### 15. 🟠 P1 [C] What are all the falsy values in JavaScript?
### 16. 🟠 P1 [C] What is type coercion?
### 17. 🟠 P1 [C] What is implicit vs explicit type conversion?
### 18. 🟠 P1 [Q] What is the difference between == and ===?
### 19. 🟠 P1 [C] Why is === generally preferred?
### 20. 🟠 P1 [Q] How does type coercion work with ==?
### 21. 🟠 P1 [Q] What is the difference between Object.is() and ===?
### 22. 🟠 P1 [C] What is short-circuit evaluation?
### 23. 🟠 P1 [C] How do && and || work?
### 24. 🟠 P1 [Q] What is the difference between || and ???
### 25. 🟠 P1 [C] What is optional chaining (?.)?

## Scope & Hoisting

### 26. 🟠 P1 [Q] What is the difference between var, let, and const?
### 27. 🟠 P1 [C] What is global scope?
### 28. 🟠 P1 [C] What is function scope?
### 29. 🟠 P1 [C] What is block scope?
### 30. 🟠 P1 [C] What is lexical scope?
### 31. 🟠 P1 [C] What is the scope chain?
### 32. 🔴 P0 [C] What is hoisting?
### 33. 🟠 P1 [C] What exactly gets hoisted in JavaScript?
### 34. 🔴 P0 [Q] How does var behave during hoisting?
### 35. 🔴 P0 [Q] How do let and const behave during hoisting?
### 36. 🔴 P0 [C] What is the Temporal Dead Zone (TDZ)?
### 37. 🟠 P1 [C] Why does accessing let before declaration throw an error?
### 38. 🟠 P1 [C] Are function declarations hoisted?
### 39. 🟠 P1 [C] Are function expressions hoisted?
### 40. 🟠 P1 [C] What is variable shadowing?
### 41. 🟠 P1 [Q] What is the difference between redeclaration and reassignment?
### 42. 🟠 P1 [C] Can a const object be modified?
### 43. 🟠 P1 [C] What is an execution context?
### 44. 🟠 P1 [Q] What happens when a function is called?
### 45. 🟠 P1 [C] What is the call stack?

## Functions & Closures

### 46. 🟠 P1 [C] What are first-class functions?
### 47. 🟠 P1 [C] What is a callback function?
### 48. 🟠 P1 [C] What is a higher-order function?
### 49. 🟠 P1 [Q] What is the difference between a function declaration and expression?
### 50. 🔴 P0 [C] What is an arrow function?
### 51. 🔴 P0 [C] What are the differences between arrow functions and regular functions?
### 52. 🔴 P0 [C] Do arrow functions have their own this?
### 53. 🔴 P0 [C] Do arrow functions have their own arguments?
### 54. 🔴 P0 [C] Can arrow functions be used as constructors?
### 55. 🟠 P1 [C] What is the arguments object?
### 56. 🟠 P1 [C] What are default parameters?
### 57. 🟠 P1 [C] What are rest parameters?
### 58. 🟠 P1 [Q] What is the difference between rest and spread syntax?
### 59. 🟠 P1 [C] What is an IIFE?
### 60. 🟠 P1 [C] What is a pure function?
### 61. 🟠 P1 [C] What is a side effect?
### 62. 🟠 P1 [C] What is recursion?
### 63. 🔴 P0 [C] What is function composition?
### 64. 🔴 P0 [C] What is currying?
### 65. 🔴 P0 [C] What is a closure?
### 66. 🔴 P0 [Q] How does a closure work?
### 67. 🔴 P0 [C] What are practical uses of closures?

## this & Binding

### 68. 🟠 P1 [C] What is this in JavaScript?
### 69. 🔴 P0 [C] How is the value of this determined?
### 70. 🟠 P1 [C] What is this inside a regular function?
### 71. 🟠 P1 [C] What is this inside an object method?
### 72. 🔴 P0 [C] What is this inside an arrow function?
### 73. 🟠 P1 [C] What is this inside a constructor?
### 74. 🔴 P0 [Q] What happens to this when a method is passed as a callback?
### 75. 🟠 P1 [C] What is implicit binding?
### 76. 🟠 P1 [C] What is explicit binding?
### 77. 🟠 P1 [C] What is call()?
### 78. 🟠 P1 [C] What is apply()?
### 79. 🟠 P1 [C] What is bind()?
### 80. 🔴 P0 [Q] What is the difference between call(), apply(), and bind()?

## Objects & Prototypes

### 81. 🟠 P1 [C] How are objects created in JavaScript?
### 82. 🟠 P1 [Q] What is the difference between dot and bracket notation?
### 83. 🟠 P1 [C] What is object destructuring?
### 84. 🟠 P1 [C] What is object spread?
### 85. 🟠 P1 [C] What is a shallow copy?
### 86. 🟠 P1 [C] What is a deep copy?
### 87. 🟠 P1 [C] Why doesn't {...obj} create a deep copy?
### 88. 🟠 P1 [C] What does Object.assign() do?
### 89. 🟠 P1 [C] Is Object.assign() shallow or deep?
### 90. 🔴 P0 [C] What are the limitations of JSON.parse(JSON.stringify(obj))?
### 91. 🔴 P0 [C] What is structuredClone()?
### 92. 🟠 P1 [C] What is object mutation?
### 93. 🟠 P1 [C] What does immutability mean?
### 94. 🟠 P1 [C] What does Object.freeze() do?
### 95. 🟠 P1 [C] Does Object.freeze() deeply freeze an object?
### 96. 🟠 P1 [C] What do Object.keys(), Object.values(), and Object.entries() do?
### 97. 🟠 P1 [C] What is a prototype?
### 98. 🔴 P0 [C] What is the prototype chain?
### 99. 🟠 P1 [Q] How does prototypal inheritance work?
### 100. 🟠 P1 [Q] What is the difference between prototype and __proto__?

## Classes & Structures

### 101. 🟠 P1 [C] What is a constructor function?
### 102. 🟠 P1 [C] What does the new keyword do?
### 103. 🟠 P1 [Q] What happens internally when new is used?
### 104. 🟠 P1 [C] What is Object.create()?
### 105. 🟠 P1 [C] What is the relationship between JavaScript classes and prototypes?
### 106. 🟠 P1 [C] What does extends do?
### 107. 🟠 P1 [C] What does super do?
### 108. 🟠 P1 [C] What is method overriding?
### 109. 🟠 P1 [Q] What is the difference between static and instance methods?
### 110. 🟠 P1 [Q] What is the difference between an array and an object?
### 111. 🟠 P1 [C] What is a Map and when would you use it?
### 112. 🟠 P1 [C] What is a Set and when would you use it?

## Array Methods

### 113. 🟠 P1 [C] What does map() do?
### 114. 🟠 P1 [Q] What is the difference between map() and forEach()?
### 115. 🟠 P1 [C] What does filter() do?
### 116. 🟠 P1 [C] What does reduce() do?
### 117. 🟠 P1 [C] When would you use reduce()?
### 118. 🟠 P1 [Q] What is the difference between find() and filter()?
### 119. 🟠 P1 [Q] What is the difference between some() and every()?
### 120. 🟠 P1 [Q] What is the difference between slice() and splice()?
### 121. 🟠 P1 [Q] How does sort() work and why does numeric sorting cause problems?
### 122. 🟠 P1 [C] Which common array methods mutate the original array?
### 123. 🟠 P1 [C] What does flat() do?
### 124. 🟠 P1 [Q] How does array destructuring work?
### 125. 🟠 P1 [C] How would you remove duplicates from an array?

## Async & Event Loop

### 126. 🟠 P1 [C] What is synchronous vs asynchronous JavaScript?
### 127. 🟠 P1 [C] Is JavaScript single-threaded?
### 128. 🟠 P1 [C] What does "single-threaded" actually mean?
### 129. 🟠 P1 [D] What is the JavaScript runtime?
### 130. 🟠 P1 [C] What is the call stack?
### 131. 🟠 P1 [D] What are Web APIs?
### 132. 🟠 P1 [C] What is the task/macrotask queue?
### 133. 🔴 P0 [C] What is the microtask queue?
### 134. 🔴 P0 [C] What is the event loop?
### 135. 🔴 P0 [Q] How does the event loop work?
### 136. 🔴 P0 [Q] What is the difference between microtasks and macrotasks?
### 137. 🔴 P0 [C] Why do Promise callbacks execute before setTimeout() callbacks?
### 138. 🟠 P1 [C] Does setTimeout(fn, 0) execute immediately?
### 139. 🟠 P1 [Q] What happens when the call stack is busy?
### 140. 🟠 P1 [C] What is callback hell?
### 141. 🟠 P1 [C] What are the limitations of callback-based asynchronous programming?
### 142. 🔴 P0 [P] What is concurrency?
### 143. 🔴 P0 [Q] What is the difference between concurrency and parallelism?

## Promises & Async/Await

### 144. 🔴 P0 [C] What is a Promise?
### 145. 🔴 P0 [C] Why were Promises introduced?
### 146. 🔴 P0 [C] What are the three states of a Promise?
### 147. 🟠 P1 [C] What does .then() do?
### 148. 🟠 P1 [C] What does .catch() do?
### 149. 🟠 P1 [C] What does .finally() do?
### 150. 🔴 P0 [C] What is Promise chaining?
### 151. 🔴 P0 [Q] What happens when a .then() callback returns a value?
### 152. 🔴 P0 [Q] What happens when a .then() callback returns another Promise?
### 153. 🔴 P0 [Q] What happens when a Promise callback throws an error?
### 154. 🔴 P0 [C] What is Promise.resolve()?
### 155. 🔴 P0 [C] What is Promise.reject()?
### 156. 🔴 P0 [C] What is Promise.all()?
### 157. 🔴 P0 [Q] What is the difference between Promise.all(), allSettled(), race(), and any()?
### 158. 🟠 P1 [C] What does async do and what does an async function return?
### 159. 🔴 P0 [C] What does await do and how is it related to Promises?

## DOM & Web APIs

### 160. 🟠 P1 [D] What is the DOM?
### 161. 🟠 P1 [Q] How does JavaScript interact with the DOM?
### 162. 🟠 P1 [C] What is event bubbling?
### 163. 🟠 P1 [C] What is event capturing?
### 164. 🔴 P0 [C] What is event delegation and why is it useful?
### 165. 🟠 P1 [Q] What is the difference between event.target and event.currentTarget?
### 166. 🟠 P1 [Q] What is the difference between preventDefault() and stopPropagation()?
### 167. 🟠 P1 [Q] What is the difference between innerHTML, innerText, and textContent?
### 168. 🟠 P1 [Q] What is the difference between localStorage, sessionStorage, and cookies?
### 169. 🟠 P1 [C] What is fetch() and what does it return?
### 170. 🔴 P0 [C] What is CORS and why does it exist?

## Output Trick Questions

### 171. 🔴 P0 [Q] Predict the output of a var hoisting example and explain why.
### 172. 🔴 P0 [Q] Predict the output of a closure inside a loop and explain why.
### 173. 🔴 P0 [Q] Predict the output of this with regular vs arrow functions.
### 174. 🔴 P0 [Q] Predict the output of Promise + setTimeout() code and explain the event loop.
### 175. 🔴 P0 [Q] Predict the output of async/await + Promise code and explain microtask behavior.

## Coding Challenges

### 176. 🔴 P0 [Q] Implement map(), filter(), and reduce() from scratch.
### 177. 🔴 P0 [Q] Implement debounce() and explain exactly how it works.
### 178. 🔴 P0 [Q] Implement throttle() and explain the difference from debounce.
### 179. 🔴 P0 [Q] Implement Promise.all() from scratch.
### 180. 🔴 P0 [Q] Implement a deep-clone utility and explain the limitations of your approach.

---

## Revision Modes

- **Core Interview Fast-Sweep:** all 🔴 P0 questions (Essential concepts, Event Loop, Closures, `this`, Promises, Polyfills)
- **Full JavaScript Mastery:** 🔴 P0 + 🟠 P1
- **Senior / Deep Engine Round:** 🔴 P0 + 🟠 P1 + 🟡 P2
- **Machine Coding / Output Round:** Focus on Section 11 (Output Trick Questions) & Section 12 (Coding Challenges & Polyfills)