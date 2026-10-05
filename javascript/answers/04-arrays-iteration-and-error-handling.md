[⬅️ Previous: 03 · Objects, Prototypes & Classes](03-objects-prototypes-and-classes.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Async & Event Loop ➡️](05-async-event-loop-and-promises.md)

---

## 4. Array Methods, Iteration & Error Handling

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

---

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

---

[⬅️ Previous: 03 · Objects, Prototypes & Classes](03-objects-prototypes-and-classes.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Async & Event Loop ➡️](05-async-event-loop-and-promises.md)
