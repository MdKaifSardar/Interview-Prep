[⬅️ Previous: 03 · Arrays, Matrices & Grids](03-arrays-matrices-grids.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Hash Maps & Sets ➡️](05-hash-maps-sets-lookups.md)

---

## 4. Sorting & Custom Comparators

### 17. 🔴 P0 [Q] Why does `[10, 2, 5].sort()` sort as `[10, 2, 5]`, and how does the numeric comparator callback `(a, b) => a - b` work internally?

> **TL;DR:** `Array.prototype.sort()` converts elements to strings and compares their UTF-16 code units lexicographically by default. Because `'1'` comes before `'2'` in ASCII, `'10'` comes before `'2'`. Providing `(a, b) => a - b` tells the engine to sort numerically based on the sign of the returned number.

**💡 Core Concept & Explanation**
The sort comparator `compareFn(a, b)` expects a numeric return value:
- Return `< 0`: `a` comes before `b` (no swap).
- Return `=== 0`: `a` and `b` maintain their relative order.
- Return `> 0`: `b` comes before `a` (swap).

When sorting numbers ascending:
$$\text{return } a - b$$
- If $a = 2, b = 10 \implies 2 - 10 = -8 < 0 \implies 2 \text{ stays before } 10$.
- If $a = 10, b = 2 \implies 10 - 2 = 8 > 0 \implies 10 \text{ moves after } 2$.

**🛠️ Syntax / Code Template**
```javascript
const nums = [10, 2, 5, 1, 20];

// ❌ DEFAULT (Lexicographical / String Sort):
nums.sort();
console.log(nums); // [ 1, 10, 2, 20, 5 ]

// ✅ Numeric Ascending:
nums.sort((a, b) => a - b);
console.log(nums); // [ 1, 2, 5, 10, 20 ]

// ✅ Numeric Descending:
nums.sort((a, b) => b - a);
console.log(nums); // [ 20, 10, 5, 2, 1 ]
```

**⚠️ LeetCode / Interview Pitfall**
- **32-Bit Integer Subtraction Overflow:** In languages with fixed-width integers, `a - b` can overflow if $a$ is positive and $b$ is negative. In JavaScript, numbers are 64-bit floats, so `a - b` does not overflow standard integers unless values exceed $Number.MAX_SAFE_INTEGER$. However, if values might be `NaN` or `Infinity`, use explicit ternary comparisons: `(a > b ? 1 : a < b ? -1 : 0)`.

---

### 18. 🔴 P0 [Q] How do you implement multi-key and tie-breaker sorting in JavaScript (e.g., sort intervals `[start, end]` by start ascending, and by end descending on ties)?

> **TL;DR:** Chain comparator conditions using the logical OR operator `||`. The expression `(a[0] - b[0]) || (b[1] - a[1])` evaluates the secondary tie-breaker only when the primary comparison returns `0` (falsy in JavaScript).

**💡 Core Concept & Explanation**
In JavaScript, short-circuit evaluation guarantees that if the primary comparison evaluates to non-zero (truthy), the engine immediately returns that value. If the primary comparison evaluates to `0` (falsy, indicating a tie), the engine proceeds to evaluate the secondary comparator.

$$\text{Comparator} = \text{PrimaryDifference} \parallel \text{SecondaryDifference}$$

**🛠️ Syntax / Code Template**
```javascript
// Example: Non-overlapping Intervals / Meeting Rooms / Russian Dolls
const intervals = [[1, 3], [2, 6], [8, 10], [1, 5], [2, 4]];

// Sort by:
// 1. Primary: start time ASCENDING (a[0] - b[0])
// 2. Secondary (Tie-breaker): end time DESCENDING (b[1] - a[1])
intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

console.log(intervals);
// [ [ 1, 5 ],
//   [ 1, 3 ],
//   [ 2, 6 ],
//   [ 2, 4 ],
//   [ 8, 10 ] ]

// Multi-attribute Object Sorting (e.g., score DESC, then name ASC):
users.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
```

**⚠️ LeetCode / Interview Pitfall**
- This specific multi-key pattern (start ASC, end DESC) is required to solve **Russian Doll Envelopes (LeetCode 354)**: sorting width ascending and height descending reduces the 2D problem to standard 1D Longest Increasing Subsequence (LIS).

---

### 19. 🟠 P1 [C] What sorting algorithm is used by JavaScript engines (V8's Timsort), is `Array.prototype.sort()` guaranteed to be stable, and what are its time and space complexities?

> **TL;DR:** Modern V8 uses **Timsort** (a hybrid of Merge Sort and Insertion Sort). As of ECMAScript 2019, `Array.prototype.sort()` is **guaranteed to be stable**. Its time complexity is $O(n \log n)$ average/worst-case and $O(n)$ best-case. Space complexity is $O(n)$.

**💡 Core Concept & Explanation**
- **Stability:** A sorting algorithm is stable if elements with identical keys appear in the same relative order in the output as they did in the input. Before ES2019, V8 used Quicksort for arrays longer than 10 elements, which was unstable. Modern specifications mandate stability.
- **Timsort Mechanics:** Finds already-sorted segments ("runs"), extends small runs using binary insertion sort, and merges runs using a balanced merge hierarchy.
- **Complexity Breakdown:**
  - Best-case time: $O(n)$ for already sorted or reverse-sorted data.
  - Average & Worst-case time: $O(n \log n)$.
  - Auxiliary Space: $O(n)$ (requires temporary run buffers).

**🛠️ Syntax / Code Template**
```javascript
// Stability Demonstration:
const items = [
  { group: 'A', id: 1 },
  { group: 'B', id: 2 },
  { group: 'A', id: 3 },
  { group: 'B', id: 4 }
];

items.sort((a, b) => a.group.localeCompare(b.group));

// Relative order within Group A (id:1 then id:3) is strictly preserved!
console.log(items);
// [ { group: 'A', id: 1 },
//   { group: 'A', id: 3 },
//   { group: 'B', id: 2 },
//   { group: 'B', id: 4 } ]
```

**⚠️ LeetCode / Interview Pitfall**
- Do NOT assume `sort()` in JavaScript is in-place with $O(1)$ auxiliary space. Timsort allocates $O(n)$ temporary memory buffers during execution. If an interviewer asks: *"Can we sort in $O(1)$ auxiliary space?"*, explain that built-in `sort()` takes $O(n)$ space and write an in-place Quicksort or Heapsort.

---

### 20. 🟠 P1 [Q] How do you sort an array of strings in alphabetical or natural order using `localeCompare()`, and how do you sort based on custom character priority?

> **TL;DR:** Use `(a, b) => a.localeCompare(b)` for alphabetical string sorting. For custom alphabet problems (e.g. Alien Dictionary), create a priority lookup map and sort using the custom ranks.

**💡 Core Concept & Explanation**
- `a.localeCompare(b)` returns a negative number if `a < b`, `0` if equal, and a positive number if `a > b`, matching the exact contract required by `Array.prototype.sort()`.
- Natural numeric sorting (e.g., `"file2"` before `"file10"`): pass `{ numeric: true }`.

**🛠️ Syntax / Code Template**
```javascript
const words = ["banana", "apple", "cherry"];
words.sort((a, b) => a.localeCompare(b));
console.log(words); // [ "apple", "banana", "cherry" ]

// Natural Numeric String Sort:
const files = ["file10.txt", "file2.txt", "file1.txt"];
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
console.log(files); // [ "file1.txt", "file2.txt", "file10.txt" ]

// Custom Alien Alphabet Sort:
const order = "worldabcefghijkmnpqstuvxyz";
const rank = new Map();
for (let i = 0; i < order.length; i++) rank.set(order[i], i);

function compareAlien(w1, w2) {
  const minLen = Math.min(w1.length, w2.length);
  for (let i = 0; i < minLen; i++) {
    const diff = rank.get(w1[i]) - rank.get(w2[i]);
    if (diff !== 0) return diff;
  }
  return w1.length - w2.length;
}
```

**⚠️ LeetCode / Interview Pitfall**
- `localeCompare()` is significantly slower than standard integer subtraction because it accounts for internationalized locale rules. For ASCII-only competitive programming problems, direct character comparison `(a < b ? -1 : a > b ? 1 : 0)` executes 5–10x faster.

---

### 21. 🟠 P1 [Q] What are the ES2023 non-mutating array methods `toSorted()`, `toReversed()`, and `toSpliced()`, and how do they differ from `sort()`, `reverse()`, and `splice()`?

> **TL;DR:** `sort()`, `reverse()`, and `splice()` mutate the original array in-place. The ES2023 methods `toSorted()`, `toReversed()`, and `toSpliced()` perform the exact same operations but return a **newly copied array**, leaving the original untouched.

**💡 Core Concept & Explanation**
In React and functional algorithmic code, mutating input arrays is an anti-pattern that introduces side effects. Previously, developers wrote `[...arr].sort(...)`. ES2023 provides native non-mutating equivalents.

| Mutating Method (In-Place) | Non-Mutating Equivalent (Returns Clone) |
| :--- | :--- |
| `arr.sort(compareFn)` | `arr.toSorted(compareFn)` |
| `arr.reverse()` | `arr.toReversed()` |
| `arr.splice(start, count, ...items)` | `arr.toSpliced(start, count, ...items)` |

**🛠️ Syntax / Code Template**
```javascript
const original = [3, 1, 4, 1, 5];

// ES2023 non-mutating sort:
const sorted = original.toSorted((a, b) => a - b);

console.log(sorted);   // [ 1, 1, 3, 4, 5 ]
console.log(original); // [ 3, 1, 4, 1, 5 ] (Completely unmodified!)

// In older interview environments (Node < 20 / older LeetCode engines):
const safeSorted = [...original].sort((a, b) => a - b);
```

**⚠️ LeetCode / Interview Pitfall**
- Some online coding platforms (like older CoderPad or HackerRank runtimes) run Node.js 16 or 18 where `toSorted()` does not exist. If you write `arr.toSorted()`, your submission will crash with `TypeError: arr.toSorted is not a function`. Use `[...arr].sort(...)` in competitive coding for universal runtime compatibility.

---

[⬅️ Previous: 03 · Arrays, Matrices & Grids](03-arrays-matrices-grids.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Hash Maps & Sets ➡️](05-hash-maps-sets-lookups.md)
