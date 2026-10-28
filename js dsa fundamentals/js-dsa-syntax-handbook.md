# JavaScript Fundamentals & Syntax — DSA & LeetCode Revision Handbook

> A pure JavaScript fundamentals and algorithmic syntax cheat sheet. Designed for quick review of language mechanics, character/ASCII processing, safe matrix allocation, custom comparators, Map/Set semantics, minimal binary heaps, and built-in time complexity before coding interviews.

---

## Quick Navigation Index

1. [Numbers, Integer Math & Precision](#1-numbers-integer-math--precision)
2. [Character & ASCII Processing](#2-character--ascii-processing)
3. [String Manipulation & Regex](#3-string-manipulation--regex)
4. [Array & 2D Matrix Allocation](#4-array--2d-matrix-allocation)
5. [Sorting & Custom Comparators](#5-sorting--custom-comparators)
6. [Hash Maps & Hash Sets (`Map` & `Set`)](#6-hash-maps--hash-sets-map--set)
7. [Stack, Queue & Deque Patterns](#7-stack-queue--deque-patterns)
8. [Minimal Binary Heap (Priority Queue)](#8-minimal-binary-heap-priority-queue)
9. [Binary Search & Two-Pointer Templates](#9-binary-search--two-pointer-templates)
10. [Tree, Linked List & Grid Boilerplates](#10-tree-linked-list--grid-boilerplates)
11. [Bit Manipulation Cheat Sheet](#11-bit-manipulation-cheat-sheet)
12. [Time & Space Complexity Master Matrix](#12-time--space-complexity-master-matrix)

---

## 1. Numbers, Integer Math & Precision

### Number Boundaries & Constants
```javascript
Number.MAX_SAFE_INTEGER; // 9007199254740991 (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991 (-(2^53 - 1))
Infinity;                // Greater than any number
-Infinity;               // Smaller than any number
Number.EPSILON;          // 2.220446049250313e-16 (diff between 1 and smallest float > 1)
```

### Integer Division & Truncation
```javascript
// Positive numbers:
Math.floor(7 / 2); // 3
Math.trunc(7 / 2); // 3
(7 / 2) | 0;       // 3 (bitwise OR truncates to 32-bit int)
~~(7 / 2);         // 3 (double bitwise NOT)

// Negative numbers (CRITICAL DIFFERENCE):
Math.floor(-7 / 2); // -4 (rounds DOWN towards -Infinity)
Math.trunc(-7 / 2); // -3 (truncates towards zero, matches C++ int division)
(-7 / 2) | 0;       // -3 (truncates towards zero)
```

### Safe Min / Max Initialization
```javascript
let minVal = Infinity;
let maxVal = -Infinity;

// Math.max / Math.min on arrays:
Math.max(...nums); // WARNING: Throws RangeError if nums.length > ~65,536 (stack overflow)
// For large arrays:
let max = nums.reduce((a, b) => Math.max(a, b), -Infinity);
```

### Safe Float Comparison
```javascript
function areFloatsEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
console.log(0.1 + 0.2 === 0.3); // false
console.log(areFloatsEqual(0.1 + 0.2, 0.3)); // true
```

---

## 2. Character & ASCII Processing

JavaScript characters are 1-length strings. Use numeric ASCII codes for frequency counting.

```javascript
// Character to ASCII Code
'a'.charCodeAt(0); // 97
'z'.charCodeAt(0); // 122
'A'.charCodeAt(0); // 65
'Z'.charCodeAt(0); // 90
'0'.charCodeAt(0); // 48
'9'.charCodeAt(0); // 57

// ASCII Code to Character
String.fromCharCode(97); // 'a'
String.fromCharCode(65); // 'A'
```

### 26-Letter Frequency Array
```javascript
const freq = new Array(26).fill(0);

for (let i = 0; i < s.length; i++) {
  const code = s.charCodeAt(i) - 97; // 0 to 25
  freq[code]++;
}

// Read frequency of character 'c':
const count = freq['c'.charCodeAt(0) - 97];
```

### Character Type Testing
```javascript
function isAlphaNumeric(ch) {
  const code = ch.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||  // 0-9
    (code >= 65 && code <= 90) ||  // A-Z
    (code >= 97 && code <= 122)    // a-z
  );
}
```

---

## 3. String Manipulation & Regex

Strings in JavaScript are **immutable**. `s[0] = 'a'` fails silently (or throws in strict mode).

### Substring Extraction
```javascript
const str = "0123456789";

// slice(startIndex, endIndexExclusive) - PREFERRED
str.slice(2, 5);  // "234"
str.slice(-3);    // "789" (supports negative indexing)

// substring(startIndex, endIndexExclusive) - Does not support negative indices
str.substring(2, 5); // "234"
```

### Building / Mutating Strings
```javascript
// Array Join Pattern (O(n) memory, fastest for heavy building)
const chars = str.split('');
chars[0] = 'X';
const result = chars.join('');

// Reversing a string
const reversed = str.split('').reverse().join('');
```

### High-Yield Regex for DSA
```javascript
// Strip all non-alphanumeric characters and lowercase (e.g. Valid Palindrome)
const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();

// Split by one or more whitespace characters
const words = s.trim().split(/\s+/);
```

---

## 4. Array & 2D Matrix Allocation

### 1D Pre-allocation
```javascript
const arr = new Array(n).fill(0); // [0, 0, 0, ..., 0]
```

### ⚠️ THE 2D MATRIX TRAP
```javascript
// ❌ CRITICAL BUG: ALL rows reference the EXACT same inner array in memory!
const matrix = new Array(rows).fill(new Array(cols).fill(0));
matrix[0][0] = 99; // Every single row's column 0 becomes 99!

// ✅ CORRECT: Allocate a unique array instance for each row
const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
```

### In-Place Swapping
```javascript
// Destructuring swap:
[arr[i], arr[j]] = [arr[j], arr[i]];

// Classic temp variable (slightly faster in hot inner loops):
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
```

### Matrix Copying
```javascript
// Shallow copy 1D array:
const copy1D = [...arr]; // or arr.slice()

// Deep copy 2D matrix (independent row references):
const matrixCopy = matrix.map(row => [...row]);
```

---

## 5. Sorting & Custom Comparators

JavaScript's `Array.prototype.sort()` sorts **lexicographically** by converting values to strings by default!

```javascript
// ❌ WRONG: Converts to strings!
[10, 2, 5].sort(); // [10, 2, 5] because '10' < '2'

// ✅ Numeric Ascending:
arr.sort((a, b) => a - b);

// ✅ Numeric Descending:
arr.sort((a, b) => b - a);

// ✅ Multi-Key Sorting (e.g. Intervals: start ascending, then end descending):
intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

// ✅ String / Alphabetical Sorting:
words.sort((a, b) => a.localeCompare(b));
```

> **Algorithm & Stability:** V8 uses **Timsort** ($O(n \log n)$ time, $O(n)$ space), guaranteed **stable** across all modern engines since ECMAScript 2019.

---

## 6. Hash Maps & Hash Sets (`Map` & `Set`)

Use `Map` and `Set` instead of plain `{}` for numerical keys, insertion order preservation, and explicit `.size`.

### `Map` Quick Reference
```javascript
const map = new Map();

map.set(key, val);
map.get(key);        // Returns value, or undefined if absent
map.has(key);        // Returns true / false
map.delete(key);     // Removes key, returns true if present
map.size;            // Current number of entries
map.clear();         // Empties map

// Frequency Count Idiom:
map.set(x, (map.get(x) || 0) + 1);

// Decrement & Clean:
if (map.get(x) === 1) {
  map.delete(x);
} else {
  map.set(x, map.get(x) - 1);
}
```

### `Set` Quick Reference
```javascript
const set = new Set();
set.add(val);
set.has(val);    // O(1) average lookup
set.delete(val);
set.size;

// Deduplicate array:
const unique = [...new Set(nums)];
```

### ⚠️ Coordinate Key Serialization in `Map` / `Set`
`Map` and `Set` match objects and arrays by **reference**, not value:
```javascript
const visited = new Set();
visited.add([0, 1]);
visited.has([0, 1]); // ❌ FALSE! Different array reference in memory!

// ✅ Solution 1: String Key Serialization
visited.add(`${r},${c}`);
visited.has(`${r},${c}`); // true

// ✅ Solution 2: Flat Integer Index (fastest, requires known columns count C)
const key = r * cols + c;
visited.add(key);
visited.has(key); // true
```

---

## 7. Stack, Queue & Deque Patterns

### Stack: Built-in $O(1)$ Array Methods
```javascript
const stack = [];
stack.push(val);               // O(1) amortized
const top = stack[stack.length - 1]; // or stack.at(-1)
const popped = stack.pop();    // O(1)
const isEmpty = stack.length === 0;
```

### Queue: The $O(n)$ `shift()` Trap & High-Performance Solution
```javascript
// ❌ WRONG for large N: arr.shift() is O(n), causes TLE in LeetCode BFS!
const queue = [start];
while (queue.length > 0) {
  const node = queue.shift(); // Copies all remaining elements over!
}

// ✅ CORRECT: Array with Head Pointer (O(1) amortized dequeue)
class FastQueue {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  push(val) {
    this.items.push(val);
  }
  pop() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    this.head++;
    // Periodically trim memory to avoid unbounded array growth
    if (this.head > 1000 && this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
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

---

## 8. Minimal Binary Heap (Priority Queue)

JavaScript does not have a built-in heap. Memorize this clean, 25-line binary heap for CoderPad and live coding:

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
    this.bubbleUp(this.data.length - 1);
  }
  pop() {
    if (this.size() === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.size() > 0) {
      this.data[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }
  bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  bubbleDown(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let smallest = (i << 1) + 1;
      const right = smallest + 1;
      if (right < len && this.compare(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }
      if (this.compare(this.data[smallest], this.data[i]) < 0) {
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      } else break;
    }
  }
}

// Max-Heap: new MinHeap((a, b) => b - a);
// Object Heap: new MinHeap((a, b) => a.weight - b.weight);
```

---

## 9. Binary Search & Two-Pointer Templates

### Safe Midpoint Calculation
```javascript
// Avoids 32-bit integer overflow and handles floats cleanly
const mid = Math.floor(low + (high - low) / 2);
// Or fast bitwise:
const mid = (low + high) >> 1;
```

### Standard Exact Match Binary Search
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

---

## 10. Tree, Linked List & Grid Boilerplates

### Standard LeetCode Constructors
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

### Dummy Head for Linked Lists
```javascript
const dummy = new ListNode(0);
let curr = dummy;
// ... append nodes via curr.next = new Node(...) ...
return dummy.next;
```

### Tree BFS Level-Order Traversal
```javascript
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length; // Snapshot level size
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

### 2D Grid Exploration (Direction Vectors)
```javascript
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up

function inBounds(r, c, rows, cols) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

for (const [dr, dc] of DIRS) {
  const nr = r + dr;
  const nc = c + dc;
  if (inBounds(nr, nc, rows, cols)) {
    // Process neighbor (nr, nc)
  }
}
```

---

## 11. Bit Manipulation Cheat Sheet

All bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`) in JavaScript coerce operands to **32-bit signed integers**.

| Operation | Expression | Purpose |
| :--- | :--- | :--- |
| **Check $k$-th bit** | `(n & (1 << k)) !== 0` | Tests if bit at position $k$ is 1 |
| **Set $k$-th bit** | `n = n | (1 << k)` | Sets bit at position $k$ to 1 |
| **Clear $k$-th bit** | `n = n & ~(1 << k)` | Clears bit at position $k$ to 0 |
| **Toggle $k$-th bit** | `n = n ^ (1 << k)` | Inverts bit at position $k$ |
| **Clear lowest set bit** | `n = n & (n - 1)` | Drops lowest 1-bit (Kernighan's count) |
| **Extract lowest set bit** | `lowest = n & -n` | Isolates the lowest 1-bit |
| **Power of 2 test** | `n > 0 && (n & (n - 1)) === 0` | Checks if $n$ is power of 2 ($2^k$) |
| **XOR swap** | `a ^= b; b ^= a; a ^= b;` | Swaps two numbers without temp var |
| **Unsigned right shift** | `n >>> k` | Shifts right, filling with zeroes |

---

## 12. Time & Space Complexity Master Matrix

| Built-In Method | Time Complexity | Space Complexity | Critical Note / Warning |
| :--- | :--- | :--- | :--- |
| `arr.push(x)` / `arr.pop()` | $O(1)$ amortized | $O(1)$ | Efficient stack operations |
| `arr.shift()` / `arr.unshift(x)` | $O(n)$ | $O(1)$ | **Re-indexes entire array! Avoid in queues** |
| `arr.slice(start, end)` | $O(k)$ where $k = end - start$ | $O(k)$ | Creates shallow copy |
| `arr.splice(start, count)` | $O(n)$ | $O(k)$ | In-place removal & shifting |
| `arr.concat(arr2)` | $O(n + m)$ | $O(n + m)$ | Copies both arrays into new instance |
| `arr.indexOf(x)` / `includes(x)` | $O(n)$ | $O(1)$ | Linear scan |
| `arr.sort(compareFn)` | $O(n \log n)$ | $O(n)$ | V8 Timsort, stable |
| `str.charCodeAt(i)` | $O(1)$ | $O(1)$ | Constant time character code lookup |
| `str.slice(start, end)` | $O(k)$ | $O(k)$ | Allocates new string slice |
| `str.split(delim)` | $O(n)$ | $O(n)$ | Splits into new string array |
| `Map.prototype.get / set / has / delete` | $O(1)$ average | $O(1)$ | Hash table |
| `Set.prototype.add / has / delete` | $O(1)$ average | $O(1)$ | Hash set |
| `Object.keys / values / entries` | $O(n)$ | $O(n)$ | Extracts enumerable keys array |
| `JSON.stringify(obj)` | $O(n)$ | $O(n)$ | Traverses full object graph |
