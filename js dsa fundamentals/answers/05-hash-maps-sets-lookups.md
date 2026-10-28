[⬅️ Previous: 04 · Sorting & Comparators](04-sorting-comparators.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Stacks, Queues & Deques ➡️](06-stacks-queues-deques.md)

---

## 5. Hash Maps & Hash Sets (`Map` & `Set`)

### 22. 🔴 P0 [C] What are the differences between a plain object `{}` and a `Map` when used as a hash table in DSA (key types, prototype pollution, iteration, size)?

> **TL;DR:** Always prefer `Map` in DSA. Plain objects only accept strings and symbols as keys (converting numbers and objects to strings), inherit prototype properties (causing false key hits like `'constructor'`), and require $O(n)$ `Object.keys(obj).length` to count elements. `Map` supports any key type, preserves insertion order, and provides an $O(1)$ `.size` property.

**💡 Core Concept & Explanation**

| Feature | Plain Object `{}` | ES6 `Map` |
| :--- | :--- | :--- |
| **Key Types** | Strings or Symbols only (`obj[1]` becomes `obj["1"]`) | **Any type** (Numbers, Objects, Functions) |
| **Prototype Pollution** | Inherits `toString`, `valueOf`, `constructor` | **Pure hash table**; no default keys |
| **Size Determination** | $O(n)$ via `Object.keys(obj).length` | **$O(1)$** via `map.size` |
| **Iteration Order** | Complex arbitrary order | **Strict insertion order** |
| **Performance in High Churn** | Slower when frequently adding/deleting keys | **Optimized** for frequent additions/removals |

**🛠️ Syntax / Code Template**
```javascript
// Object Prototype Pollution Trap:
const obj = {};
console.log('constructor' in obj); // true! (Inherited from Object.prototype)
console.log(obj['constructor']);  // [Function: Object] (False positive!)

// Clean Map Behavior:
const map = new Map();
console.log(map.has('constructor')); // false (Completely safe!)

// Preserving number key types:
map.set(1, 'numeric one');
map.set('1', 'string one');
console.log(map.get(1));   // "numeric one"
console.log(map.get('1')); // "string one" (Distinct keys!)
console.log(map.size);     // 2 (O(1) property lookup)
```

**⚠️ LeetCode / Interview Pitfall**
- Using `{}` for frequency counting on negative numbers or mixed keys can cause unexpected bugs. If a problem asks for an LRU Cache or Sliding Window count, `Map` is strictly superior because `map.keys().next().value` gives the oldest inserted key in $O(1)$ time!

---

### 23. 🔴 P0 [Q] Why does `new Set().add([1, 2]).has([1, 2])` return `false`, and how do you serialize array or coordinate keys for `Set` and `Map` in grid/graph problems?

> **TL;DR:** JavaScript `Set` and `Map` compare object and array keys by **memory reference**, not structural value. `[1, 2] !== [1, 2]` because they reside at different memory addresses. To key coordinates in a `Set` or `Map`, serialize them into strings (`${r},${c}`) or flat integer indices (`r * cols + c`).

**💡 Core Concept & Explanation**
JavaScript does not support custom `hashCode()` or `equals()` overrides for objects.
- When you call `set.add([r, c])`, you store a pointer to array instance $A$.
- When you test `set.has([r, c])`, you create a new array instance $B$. Since $A \neq B$, the lookup returns `false`.

**🛠️ Syntax / Code Template**
```javascript
const visited = new Set();

// ❌ BROKEN:
visited.add([0, 1]);
console.log(visited.has([0, 1])); // false!

// ✅ Solution 1: String Serialization (Universal & clean)
const key = `${r},${c}`;
visited.add(key);
console.log(visited.has(key)); // true

// Parsing back:
const [r, c] = key.split(',').map(Number);

// ✅ Solution 2: Flat Integer Index (Fastest, zero string allocations)
// Pre-requisite: Number of columns C is known and bounded
function getIndex(r, c, cols) {
  return r * cols + c;
}

const intKey = getIndex(r, c, cols);
visited.add(intKey);
console.log(visited.has(intKey)); // true

// Recover coordinates:
const originalR = Math.trunc(intKey / cols);
const originalC = intKey % cols;
```

**⚠️ LeetCode / Interview Pitfall**
- In high-speed BFS/DFS (e.g. Word Ladder, Rotting Oranges), creating thousands of string keys (`${r},${c}`) causes heavy Garbage Collection overhead. Using the flat integer key `r * cols + c` or a flat boolean typed array `const visited = new Uint8Array(rows * cols)` speeds up execution by up to 5x.

---

### 24. 🔴 P0 [Q] What is the idiomatic pattern for frequency counting and element cleanup with a `Map` in JavaScript (`map.set(k, (map.get(k) || 0) + 1)`, decrementing, and deleting)?

> **TL;DR:** Increment frequency with `map.set(val, (map.get(val) || 0) + 1)`. When decrementing in a sliding window, **always delete the key** when its count drops to 0 (`if (count === 1) map.delete(val)`), otherwise `map.has(val)` remains `true` and `map.size` is corrupted.

**💡 Core Concept & Explanation**
In sliding window problems with distinct character constraints (e.g. Longest Substring Without Repeating Characters, Substring with Concatenation of All Words):
- If you decrement a count to `0` without removing it:
  `map.get(x) === 0`, but `map.has(x) === true` and `map.size` still includes `x`!
- Checking `map.size === k` will report incorrect counts unless zero-frequency keys are removed with `map.delete(x)`.

**🛠️ Syntax / Code Template**
```javascript
const freq = new Map();

// 1. Increment Count:
function addElement(val) {
  freq.set(val, (freq.get(val) || 0) + 1);
}

// 2. Decrement Count with Clean Delete (Crucial for Sliding Window):
function removeElement(val) {
  const count = freq.get(val);
  if (count === 1) {
    freq.delete(val); // Drops key so map.has(val) becomes false!
  } else if (count > 1) {
    freq.set(val, count - 1);
  }
}

// 3. Iterating Map entries:
for (const [key, count] of freq) {
  console.log(`${key} occurs ${count} times`);
}
```

**⚠️ LeetCode / Interview Pitfall**
- Writing `if (!freq.get(char))` to check if a character exists in the map. If `freq.get(char) === 0`, `!0` evaluates to `true` (falsy bug)! Always use `freq.has(char)`.

---

### 25. 🟠 P1 [Q] How do you perform mathematical Set operations in JavaScript (union, intersection, difference, and deduplicating an array with `[...new Set(arr)]`)?

> **TL;DR:** Deduplicate with `[...new Set(arr)]`. Modern JS (Node 22 / ES2025) provides native set methods (`union`, `intersection`, `difference`). In interview environments, implement them with `.filter()` and `set.has()`.

**💡 Core Concept & Explanation**
- `new Set(iterable)` constructs a set containing unique values in $O(n)$ time.
- Spreading back `[...set]` converts unique items back to an array in $O(n)$ time.
- Set lookup `set.has(x)` runs in $O(1)$ average time, making intersection between array $A$ and set $B$ run in $O(|A|)$ time.

**🛠️ Syntax / Code Template**
```javascript
// 1. Array Deduplication:
const unique = [...new Set([1, 2, 2, 3, 1])]; // [1, 2, 3]

// 2. Set Operations (Universal Interview Compatibility):
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// Intersection: A ∩ B
const intersection = new Set([...setA].filter(x => setB.has(x))); // Set { 2, 3 }

// Union: A ∪ B
const union = new Set([...setA, ...setB]); // Set { 1, 2, 3, 4 }

// Difference: A \ B (elements in A but not B)
const difference = new Set([...setA].filter(x => !setB.has(x))); // Set { 1 }

// 3. Modern ES2025 Native Set Methods (if supported by environment):
// setA.intersection(setB);
// setA.union(setB);
// setA.difference(setB);
```

**⚠️ LeetCode / Interview Pitfall**
- In LeetCode 349 (Intersection of Two Arrays), never write `arr1.filter(x => arr2.includes(x))`. `arr2.includes()` is an $O(n)$ scan, resulting in $O(n \times m)$ time! Converting `arr2` to a `Set` first reduces complexity to optimal $O(n + m)$.

---

### 26. 🟠 P1 [P] How does key equality work in `Map` and `Set` (SameValueZero algorithm, handling of `NaN` and `+0`/`-0`), and what is the average vs worst-case lookup complexity?

> **TL;DR:** `Map` and `Set` use the **SameValueZero** equality algorithm. Unlike strict equality (`===`), SameValueZero considers `NaN === NaN` (allowing `NaN` to be stored as a unique key once) and treats `+0 === -0`. Average lookup is $O(1)$; worst-case with hash collisions is $O(n)$.

**💡 Core Concept & Explanation**
- In standard JavaScript: `NaN === NaN` is `false`. If `Map` used strict equality, adding `map.set(NaN, 1)` followed by `map.get(NaN)` would return `undefined`.
- The **SameValueZero** specification ensures:
  1. `NaN` equals `NaN`.
  2. `+0` equals `-0`.
  3. All other values follow strict `===` equality.

**🛠️ Syntax / Code Template**
```javascript
const set = new Set();

set.add(NaN);
set.add(NaN);
console.log(set.size); // 1 (NaN is treated as identical!)

set.add(+0);
set.add(-0);
console.log(set.size); // 2 (Contains NaN and 0; +0 and -0 collapsed to 0)

const map = new Map();
map.set(NaN, 'Found NaN');
console.log(map.get(NaN)); // "Found NaN"
```

**⚠️ LeetCode / Interview Pitfall**
- When testing array lookups for `NaN`, `arr.indexOf(NaN)` returns `-1` (because `indexOf` uses strict `===`). However, `arr.includes(NaN)` uses SameValueZero and correctly returns `true`.

---

[⬅️ Previous: 04 · Sorting & Comparators](04-sorting-comparators.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Stacks, Queues & Deques ➡️](06-stacks-queues-deques.md)
