# JavaScript Fundamentals & Algorithmic Syntax — Pre-Interview Revision Handbook

> A pure JavaScript algorithmic fundamentals, syntax, and container cheat sheet designed for rapid review in one single read before technical coding rounds, LeetCode assessments, and CoderPad live coding interviews. Contains zero question-and-answer bloat—strictly reference syntax, method behaviors, copy-paste templates, and fatal JavaScript language gotchas.

---

## Quick Navigation Index

1. [Numbers, Integer Math & Precision](#1-numbers-integer-math--precision)
2. [Character & ASCII Processing](#2-character--ascii-processing)
3. [String Complete Reference & Regex](#3-string-complete-reference--regex)
4. [Arrays & 2D Matrix Complete Reference](#4-arrays--2d-matrix-complete-reference)
5. [Sorting & Custom Comparators](#5-sorting--custom-comparators)
6. [Hash Maps & Hash Sets (`Map` & `Set`)](#6-hash-maps--hash-sets-map--set)
7. [Stacks, Queues & Deques](#7-stacks-queues--deques)
8. [Minimal Binary Heap (Priority Queue)](#8-minimal-binary-heap-priority-queue)
9. [Binary Search & Two-Pointer Templates](#9-binary-search--two-pointer-templates)
10. [Linked List, Tree & Graph Boilerplates](#10-linked-list-tree--graph-boilerplates)
11. [Bit Manipulation Complete Reference](#11-bit-manipulation-complete-reference)
12. [Built-In Time & Space Complexity Master Matrix](#12-built-in-time--space-complexity-master-matrix)

---

## 1. Numbers, Integer Math & Precision

### Constants & Numeric Boundaries
```javascript
Number.MAX_SAFE_INTEGER; // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991 (-(2^53 - 1))
Infinity;                // Greater than any finite number
-Infinity;               // Smaller than any finite number
Number.EPSILON;          // 2.220446049250313e-16 (smallest delta: 1.0 + EPSILON !== 1.0)
```

> ⚠️ **Don't Forget (Precision Breakdown):** In JavaScript, all numbers are IEEE 754 64-bit floats. Beyond $2^{53} - 1$, integers lose precision: `9007199254740992 + 1 === 9007199254740992` evaluates to `true`!

### Integer Division & Truncation (Positive vs Negative)
In C++, `int / int` truncates fractions towards zero. In JavaScript, `/` always yields a float:

| Operation | Input `7 / 2` (3.5) | Input `-7 / 2` (-3.5) | Behavior / Semantics |
| :--- | :--- | :--- | :--- |
| `Math.floor(x)` | `3` | **`-4`** ⚠️ | Rounds **down** towards $-\infty$ (fails on negative integer division) |
| `Math.trunc(x)` | `3` | **`-3`** ✅ | Truncates fractional part towards zero (matches C++ integer division) |
| `(x) \| 0` | `3` | **`-3`** ✅ | Bitwise OR: truncates to 32-bit signed integer |
| `~~(x)` | `3` | **`-3`** ✅ | Double bitwise NOT: truncates to 32-bit signed integer |

```javascript
// ✅ Safe Integer Division matching C++ integer math:
function intDiv(a, b) {
  return Math.trunc(a / b);
}
```

### Safe Min / Max Initialization
```javascript
let minVal = Infinity;
let maxVal = -Infinity;

// ⚠️ Never spread large arrays into Math.max:
// Math.max(...nums) // RangeError: Maximum call stack size exceeded if length > ~65,536!

// ✅ Safe scalar reduction for large arrays:
const max = nums.reduce((acc, x) => Math.max(acc, x), -Infinity);
const min = nums.reduce((acc, x) => Math.min(acc, x), Infinity);
```

### Safe Float Equality Comparison
```javascript
function areFloatsEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}
console.log(0.1 + 0.2 === 0.3); // false
console.log(areFloatsEqual(0.1 + 0.2, 0.3)); // true
```

### `BigInt` Syntax & Rules
```javascript
const bigA = 9007199254740995n; // Append 'n'
const bigB = BigInt("9007199254740995");

// BigInt division automatically truncates to integer:
const bigDiv = 7n / 2n; // 3n

// ⚠️ Type Restriction: Cannot mix BigInt and regular Number implicitly!
// const bad = bigA + 10; // TypeError!
const safe = bigA + BigInt(10); // 9007199254741005n

// Math helpers for BigInt (Math.max/min do NOT accept BigInt):
const bigMax = (a, b) => (a > b ? a : b);
const bigMin = (a, b) => (a < b ? a : b);
```

---

## 2. Character & ASCII Processing

JavaScript characters are 1-length strings. Use numeric ASCII codes for indexing and character math.

### ASCII Conversion Signatures
```javascript
// Char -> ASCII Code:
str.charCodeAt(index);   // Returns 16-bit UTF-16 code unit (0-65535)
str.codePointAt(index);  // Returns full Unicode code point (handles 32-bit emojis/surrogates)

// ASCII Code -> Char:
String.fromCharCode(code);      // 0-65535
String.fromCodePoint(codePoint);// 0-1114111

// Benchmark Values:
'a'.charCodeAt(0); // 97
'z'.charCodeAt(0); // 122
'A'.charCodeAt(0); // 65
'Z'.charCodeAt(0); // 90
'0'.charCodeAt(0); // 48
'9'.charCodeAt(0); // 57
```

> ⚠️ **Don't Forget:** `'a' + 1` does NOT produce `'b'`. In JavaScript, `'a' + 1` produces `"a1"`. To advance a character: `String.fromCharCode('a'.charCodeAt(0) + 1)`.

### 26-Element Frequency Array (`'a'`–`'z'`)
Contiguous memory array indexing outperforms hash maps by avoiding hashing, pointer indirection, and GC overhead.

```javascript
// Initialize 26 slots with zeros:
const freq = new Array(26).fill(0);

// Populate:
for (let i = 0; i < s.length; i++) {
  freq[s.charCodeAt(i) - 97]++; // 97 = 'a'.charCodeAt(0)
}

// Read frequency of character 'c':
const count = freq['c'.charCodeAt(0) - 97];
```

### Character Category Testing Functions
```javascript
function isDigit(ch) {
  const code = ch.charCodeAt(0);
  return code >= 48 && code <= 57; // '0'-'9'
}

function isAlpha(ch) {
  const code = ch.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 65 && code <= 90);
}

function isAlphaNumeric(ch) {
  const code = ch.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||
    (code >= 97 && code <= 122) ||
    (code >= 65 && code <= 90)
  );
}
```

---

## 3. String Complete Reference & Regex

Strings in JavaScript are **primitive and strictly immutable**. `str[0] = 'X'` fails silently in non-strict mode (or throws `TypeError` in strict mode).

### Substring Extraction (`slice` vs `substring`)
Always prefer `slice()`:

```javascript
const str = "abcdefgh";

// slice(startIndex, endIndexExclusive) - Supports negative indexing from the end!
str.slice(2, 5);  // "cde" (indices 2, 3, 4)
str.slice(-3);    // "fgh" (last 3 chars)
str.slice(0, -1); // "abcdefg" (all characters except last)

// substring(startIndex, endIndexExclusive) - Inverts arguments if start > end; NO negative indices
str.substring(4, 1); // Swaps to (1, 4) -> "bcd"
str.substring(-3);   // Treats -3 as 0 -> "abcdefgh"
```

### In-Place String Mutation Pattern (Array Join)
```javascript
// 1. Convert to character array:
const chars = str.split('');

// 2. Mutate in-place:
chars[0] = 'H';
[chars[1], chars[3]] = [chars[3], chars[1]]; // Swap

// 3. Join back to string:
const result = chars.join('');

// One-liner String Reversal:
const reversed = str.split('').reverse().join('');
```

### Common Search & Inspection Methods
```javascript
str.indexOf("sub");       // First index or -1
str.lastIndexOf("sub");   // Last index or -1
str.includes("sub");      // true / false
str.startsWith("pre");    // true / false
str.endsWith("suf");      // true / false
str.repeat(3);            // Repeats string 3 times
str.trim();               // Strips leading/trailing whitespace
```

### Essential Regex for DSA
```javascript
// 1. Strip all non-alphanumeric characters and lowercase (Valid Palindrome):
const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();

// 2. Tokenize words by collapsing arbitrary consecutive whitespace:
const words = s.trim().split(/\s+/);
// ⚠️ s.split(' ') on "hello   world" leaves empty strings ["hello", "", "", "world"]!
```

---

## 4. Arrays & 2D Matrix Complete Reference

### Allocation Patterns
```javascript
// 1D Allocation:
const arr1D = new Array(n).fill(0); // [0, 0, ..., 0]
```

### ⚠️ THE 2D MATRIX ALLOCATION TRAP
```javascript
// ❌ FATAL BUG: ALL rows reference the EXACT same inner array in heap memory!
const badMatrix = new Array(rows).fill(new Array(cols).fill(0));
badMatrix[0][0] = 99; // Every single row's column 0 becomes 99!

// ✅ METHOD 1: Array.from (Most idiomatic)
const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

// ✅ METHOD 2: Nested For-Loop (Fastest micro-benchmark execution)
const fastMatrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  fastMatrix[i] = new Array(cols).fill(0);
}
```

### In-Place Element Swapping
```javascript
// ES6 Destructuring Swap:
[arr[i], arr[j]] = [arr[j], arr[i]];

// ⚠️ Don't Forget: Preceding line MUST end with semicolon!
// Otherwise: a = 1 [arr[i], arr[j]] = ... throws TypeError: 1 is not a function!

// Classic Temp Variable (Fastest in hot inner loops like Quicksort/Heapify):
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
```

### Mutating vs Non-Mutating Array Methods

| Mutating (Modifies Original Array In-Place) | Non-Mutating (Returns New Array / Value) |
| :--- | :--- |
| `push(...items)` / `pop()` | `slice(start, end)` |
| `shift()` / `unshift(...items)` ⚠️ ($O(n)$) | `concat(...arrays)` |
| `splice(start, deleteCount, ...items)` | `map(fn)` / `filter(fn)` |
| `reverse()` | `toSorted(compareFn)` (ES2023) |
| `sort(compareFn)` | `toReversed()` (ES2023) |

### Copying Arrays (Shallow vs Deep Matrix)
```javascript
// Shallow copy 1D array:
const copy1D = [...arr]; // or arr.slice()

// Deep copy 2D matrix (independent row instances):
const matrixCopy = matrix.map(row => [...row]);
```

---

## 5. Sorting & Custom Comparators

### The Default Lexicographical Bug
By default, `Array.prototype.sort()` converts elements to strings and compares their UTF-16 code units:
```javascript
// ❌ WRONG:
[10, 2, 5, 1, 20].sort(); // [1, 10, 2, 20, 5] ('10' < '2' in ASCII!)

// ✅ CORRECT: Always pass a numeric comparator callback:
arr.sort((a, b) => a - b); // Ascending: [1, 2, 5, 10, 20]
arr.sort((a, b) => b - a); // Descending: [20, 10, 5, 2, 1]
```

### Comparator Contract
- Return `< 0`: `a` comes before `b` (no swap).
- Return `=== 0`: `a` and `b` maintain order.
- Return `> 0`: `b` comes before `a` (swap).

### Multi-Key & Tie-Breaker Sorting (Short-Circuit `||`)
```javascript
// Interval Sorting: Sort by start time ASC; on ties, sort by end time DESC:
intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

// Object Multi-Attribute Sorting: Sort by score DESC, then name ASC:
users.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
```

### String Sorting (`localeCompare`)
```javascript
words.sort((a, b) => a.localeCompare(b)); // Alphabetical

// Natural numeric string sort ("file2" before "file10"):
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
```

### Engine Guarantees
- V8 uses **Timsort** (hybrid Merge/Insertion sort).
- Guaranteed **stable** since ECMAScript 2019.
- Time: $O(n \log n)$ average/worst-case, $O(n)$ best-case. Space: $O(n)$ auxiliary buffers.

---

## 6. Hash Maps & Hash Sets (`Map` & `Set`)

Always prefer `Map` and `Set` over plain `{}` in DSA for numeric keys, explicit `.size`, and zero prototype pollution.

### `Map` API & Idioms
```javascript
const map = new Map();

map.set(key, val);
map.get(key);        // Returns value or undefined
map.has(key);        // Returns boolean true / false
map.delete(key);     // Removes key, returns true if present
map.size;            // O(1) property lookup
map.clear();         // Empties map

// Frequency Count Idiom:
map.set(val, (map.get(val) || 0) + 1);

// Decrement & Clean Delete (Critical for sliding window size checks):
if (map.get(val) === 1) {
  map.delete(val); // Deletes key so map.has(val) becomes false and map.size decreases!
} else {
  map.set(val, map.get(val) - 1);
}

// Iteration:
for (const [key, count] of map) { /* ... */ }
```

### `Set` API & Idioms
```javascript
const set = new Set();
set.add(val);
set.has(val);    // O(1) average lookup
set.delete(val);
set.size;

// Deduplicate array:
const unique = [...new Set(nums)];

// Set Intersection (A ∩ B):
const intersection = new Set([...setA].filter(x => setB.has(x)));
```

### ⚠️ Coordinate Key Serialization in `Set` / `Map`
`Set` and `Map` compare object and array keys by **memory reference**, not value (`[0, 1] !== [0, 1]`):
```javascript
const visited = new Set();
visited.add([0, 1]);
visited.has([0, 1]); // ❌ FALSE! Different heap reference!

// ✅ Solution 1: String Key Serialization
visited.add(`${r},${c}`);
visited.has(`${r},${c}`); // true

// ✅ Solution 2: Flat Integer Key (Fastest, zero string/GC overhead; requires column count C)
const key = r * cols + c;
visited.add(key);
visited.has(key); // true

// Recover coordinates:
const origR = Math.trunc(key / cols);
const origC = key % cols;
```

---

## 7. Stacks, Queues & Deques

### Stack: Built-In $O(1)$ Array Methods
```javascript
const stack = [];
stack.push(val);               // O(1) push to tail
const top = stack[stack.length - 1]; // or stack.at(-1)
const popped = stack.pop();    // O(1) pop from tail
const isEmpty = stack.length === 0;
```

### Queue: The $O(n)$ `shift()` Trap & High-Performance Solution
`arr.shift()` copies all remaining elements left by 1 index, taking $O(n)$ time. In LeetCode BFS with $N = 10^5$, this causes **Time Limit Exceeded (TLE)**.

```javascript
// ✅ High-Performance O(1) Amortized Queue for BFS:
class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  push(val) {
    this.items.push(val);
  }
  pop() {
    if (this.isEmpty()) return null;
    const val = this.items[this.head];
    this.items[this.head] = null; // Enable Garbage Collection
    this.head++;
    // Periodic compaction to prevent memory drift:
    if (this.head > 1000 && this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return val;
  }
  peek() {
    return this.isEmpty() ? null : this.items[this.head];
  }
  isEmpty() {
    return this.head >= this.items.length;
  }
  get size() {
    return this.items.length - this.head;
  }
}
```

### Monotonic Stack Template (Next Greater Element)
```javascript
function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = []; // Stores INDICES, not values

  for (let i = 0; i < n; i++) {
    // While current element is greater than element at stack top:
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      result[prevIdx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
```

### Monotonic Deque Template (Sliding Window Maximum)
```javascript
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Stores indices in decreasing value order

  for (let i = 0; i < nums.length; i++) {
    // 1. Evict elements outside current window [i - k + 1, i]:
    if (deque.length > 0 && deque[0] <= i - k) deque.shift();

    // 2. Pop smaller elements from back:
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 3. Record max once window of size k is formed:
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
```

---

## 8. Minimal Binary Heap (Priority Queue)

JavaScript has no built-in Heap. In LeetCode, `@datastructures-js/priority-queue` is pre-imported:
```javascript
// LeetCode Environment Only:
const minHeap = new MinPriorityQueue();
minHeap.enqueue(val);
const min = minHeap.dequeue().element;
```

### 25-Line Minimal Binary Heap (For CoderPad / Whiteboard Rounds)
Memorize this lightweight, zero-dependency Heap class supporting arbitrary custom comparators:

```javascript
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }
  size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(val) {
    this.data.push(val);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.size() === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.size() > 0) {
      this.data[0] = bottom;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }

  _bubbleDown(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let target = (i << 1) + 1; // Left child
      const right = target + 1;
      if (right < len && this.compare(this.data[right], this.data[target]) < 0) {
        target = right;
      }
      if (this.compare(this.data[target], this.data[i]) < 0) {
        [this.data[i], this.data[target]] = [this.data[target], this.data[i]];
        i = target;
      } else break;
    }
  }
}

// Max-Heap: new MinHeap((a, b) => b - a);
// Object Heap: new MinHeap((a, b) => a.dist - b.dist);
```

### Small $K$ Simulation Without Heap (Binary Insertion)
For small $K$ ($K \le 100$), maintain a sorted array of length $K$ using binary search insertion:
```javascript
function insertSorted(arr, val) {
  let l = 0, r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] < val) l = mid + 1;
    else r = mid;
  }
  arr.splice(l, 0, val);
}
```

---

## 9. Binary Search & Two-Pointer Templates

### Safe Midpoint Calculation
```javascript
// Avoids 32-bit integer overflow and handles floats cleanly:
const mid = Math.floor(low + (high - low) / 2);
// Fast bitwise truncation:
const mid = (low + high) >> 1;
```

### Exact Match Binary Search
```javascript
function binarySearch(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
```

### Bisect Left (Lower Bound — First index where `nums[i] >= target`)
```javascript
function bisectLeft(nums, target) {
  let low = 0, high = nums.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (nums[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}
```

### Bisect Right (Upper Bound — First index where `nums[i] > target`)
```javascript
function bisectRight(nums, target) {
  let low = 0, high = nums.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (nums[mid] <= target) low = mid + 1;
    else high = mid;
  }
  return low;
}
```

### Dynamic Sliding Window Template
```javascript
function slidingWindow(s) {
  let left = 0;
  let ans = 0;
  const state = new Map();

  for (let right = 0; right < s.length; right++) {
    // 1. Expand window with s[right]:
    state.set(s[right], (state.get(s[right]) || 0) + 1);

    // 2. Contract window from left while condition is violated:
    while (/* condition invalid */ false) {
      state.set(s[left], state.get(s[left]) - 1);
      if (state.get(s[left]) === 0) state.delete(s[left]);
      left++;
    }

    // 3. Update answer:
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
}
```

### Floyd's Cycle Detection (Fast & Slow Pointers)
```javascript
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

---

## 10. Linked List, Tree & Graph Boilerplates

### Standard Constructors
```javascript
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
```

### Sentinel / Dummy Head (Linked Lists)
```javascript
const dummy = new ListNode(0, head);
let curr = dummy;
// ... modify curr.next ...
return dummy.next; // Eliminates null head special-casing
```

### Tree BFS Level-Order (Snapshot Loop)
```javascript
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length; // Snapshot level node count!
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
```

### Backtracking State Management (Push-Recurse-Pop)
```javascript
function backtrackTemplate(nums) {
  const result = [];
  const path = []; // Single shared array instance

  function dfs(start) {
    result.push([...path]); // ⚠️ MUST push shallow copy, NOT raw path!

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // 1. Choose
      dfs(i + 1);         // 2. Explore
      path.pop();         // 3. Un-choose (Backtrack)
    }
  }

  dfs(0);
  return result;
}
```

### 2D Grid Exploration (Direction Vectors & Bounds Guard)
```javascript
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up

function inBounds(r, c, rows, cols) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

for (const [dr, dc] of DIRS) {
  const nr = r + dr;
  const nc = c + dc;
  if (inBounds(nr, nc, rows, cols) && grid[nr][nc] === target) {
    // Traverse neighbor (nr, nc)
  }
}
```

### Iterative DFS (Heap Stack vs V8 Recursion Limit)
V8 crashes with `RangeError: Maximum call stack size exceeded` when recursion depth exceeds $\approx 10,000$ frames. An explicit heap array stack has no depth limit:

```javascript
function dfsIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    // Push right child first so left is popped and visited first!
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}
```

---

## 11. Bit Manipulation Complete Reference

All bitwise operations coerce operands to **32-bit signed integers** $[-2^{31}, 2^{31} - 1]$.

### Core Bitwise Operations Table

| Operation | Expression | Purpose / Notes |
| :--- | :--- | :--- |
| **Check $k$-th bit** | `(n & (1 << k)) !== 0` | Always wrap check in parentheses (precedence trap!) |
| **Set $k$-th bit** | `n = n | (1 << k)` | Forces bit at position $k$ to 1 |
| **Clear $k$-th bit** | `n = n & ~(1 << k)` | Clears bit at position $k$ to 0 |
| **Toggle $k$-th bit** | `n = n ^ (1 << k)` | Inverts bit at position $k$ |
| **Clear lowest set bit** | `n = n & (n - 1)` | Brian Kernighan's trick |
| **Extract lowest set bit** | `lowest = n & -n` | Isolates the single lowest 1-bit |
| **Power of 2 test** | `n > 0 && (n & (n - 1)) === 0` | Checks if $n$ is power of 2 ($2^k$) |
| **In-place XOR swap** | `a ^= b; b ^= a; a ^= b;` | Swaps two numbers without temporary variable |
| **Unsigned right shift** | `n >>> 0` | Converts signed 32-bit result into unsigned $[0, 2^{32}-1]$ |

```javascript
// Counting Set Bits (Hamming Weight in O(set bits)):
function countSetBits(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Clears rightmost set bit
    count++;
  }
  return count;
}
```

---

## 12. Built-In Time & Space Complexity Master Matrix

| Built-In Method | Time Complexity | Auxiliary Space | Critical Gotcha / Trap |
| :--- | :--- | :--- | :--- |
| `arr.push(x)` / `arr.pop()` | Amortized $O(1)$ | $O(1)$ | Append/pop at buffer tail. Optimal stack. |
| `arr.shift()` / `arr.unshift(x)` | **$O(n)$** ⚠️ | $O(1)$ | **Re-indexes entire array! Avoid in queues.** |
| `arr.slice(start, end)` | $O(k)$ ($k = end - start$) | $O(k)$ | Allocates a new contiguous shallow slice. |
| `arr.splice(start, count)` | **$O(n)$** | $O(count)$ | Re-indexes elements after `start`. |
| `arr.concat(...arrays)` | $O(n + m)$ | $O(n + m)$ | Copies all elements into new buffer. |
| `arr.indexOf(x)` / `includes(x)` | $O(n)$ | $O(1)$ | Linear scan. |
| `arr.sort(compareFn)` | $O(n \log n)$ | **$O(n)$** | V8 Timsort; allocates merge run buffers. |
| `str.charCodeAt(i)` | $O(1)$ | $O(1)$ | Constant time character code lookup. |
| `str.slice(start, end)` | $O(k)$ | $O(k)$ | Allocates new string slice. |
| `str.split(delim)` | $O(n)$ | $O(n)$ | Splits string into new array. |
| `Map.set / get / has / delete` | $O(1)$ average | $O(1)$ | Hash table with SameValueZero equality. |
| `Set.add / has / delete` | $O(1)$ average | $O(1)$ | Hash set. |
| `Object.keys / values / entries` | $O(n)$ | $O(n)$ | Allocates array of object properties. |
| `JSON.stringify(obj)` | $O(n)$ | $O(n)$ | Deeply serializes object graph. |

> 💡 **Garbage Collection Optimization Tip:** Creating `{ r, c }` objects or `${r},${c}` strings inside tight loops ($10^5$ iterations) causes frequent V8 Stop-the-World GC pauses $\rightarrow$ **TLE**. Pack coordinates into flat integers `(r * cols + c)` or typed arrays (`new Uint8Array(...)`) to keep execution entirely within CPU cache.
