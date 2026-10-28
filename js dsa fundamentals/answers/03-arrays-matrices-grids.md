[⬅️ Previous: 02 · Strings, ASCII & Character](02-strings-ascii-character.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Sorting & Comparators ➡️](04-sorting-comparators.md)

---

## 3. Arrays, 2D Matrices & Grid Traversal

### 11. 🔴 P0 [Q] What is the critical memory aliasing trap with `new Array(m).fill(new Array(n).fill(0))`, and what bug does it cause when modifying a single matrix cell?

> **TL;DR:** `new Array(n).fill(0)` creates a **single** inner array instance in memory. `.fill(...)` copies that exact same memory reference into every row of the outer array. Modifying `matrix[0][0] = 99` causes column 0 in **every single row** to become 99!

**💡 Core Concept & Explanation**
In JavaScript, arrays are reference types (objects stored on the heap).
When you execute:
```javascript
const row = new Array(cols).fill(0);
const matrix = new Array(rows).fill(row);
```
The outer array does not clone `row`. It fills every slot with a pointer to the exact same memory address.
```
matrix[0] ──┐
matrix[1] ──┼──> [ 0, 0, 0 ] (Single Array Instance in Memory!)
matrix[2] ──┘
```
Any write operation `matrix[r][c] = val` mutates that shared instance, immediately corrupting every row.

**🛠️ Syntax / Code Template**
```javascript
// ❌ CRITICAL BUG (Common LeetCode failure):
const rows = 3, cols = 3;
const badMatrix = new Array(rows).fill(new Array(cols).fill(0));

badMatrix[0][0] = 99;
console.log(badMatrix);
// [ [ 99, 0, 0 ],
//   [ 99, 0, 0 ],   <-- Rows 1 and 2 corrupted!
//   [ 99, 0, 0 ] ]
```

**⚠️ LeetCode / Interview Pitfall**
- This is the #1 most common JavaScript bug on Dynamic Programming grid problems (e.g., Minimum Path Sum, Unique Paths, Edit Distance). If all your DP rows show identical numbers or your matrix DFS behaves erratically, you fell into this reference sharing trap.

---

### 12. 🔴 P0 [Q] What is the correct, bug-free way to allocate and initialize a 2D matrix of dimensions $M \times N$ in JavaScript?

> **TL;DR:** Use `Array.from({ length: rows }, () => new Array(cols).fill(0))` or a nested `for` loop. The mapping function inside `Array.from()` executes for each row index, guaranteeing a fresh, independent array reference for every row.

**💡 Core Concept & Explanation**
- `Array.from({ length: rows }, mapFn)` creates an array of length `rows` and calls `mapFn` once for every index.
- Because `mapFn` returns `new Array(cols).fill(0)` on every call, $M$ completely independent array instances are instantiated on the heap.

**🛠️ Syntax / Code Template**
```javascript
const rows = 3, cols = 4;

// ✅ Method 1: Array.from (Most idiomatic & concise)
const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

matrix[0][0] = 99;
console.log(matrix[0]); // [ 99, 0, 0, 0 ]
console.log(matrix[1]); // [ 0, 0, 0, 0 ] (Independent and untouched!)

// ✅ Method 2: Nested Loops (Fastest execution in competitive programming)
const fastMatrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  fastMatrix[i] = new Array(cols).fill(0);
}
```

**⚠️ LeetCode / Interview Pitfall**
- When initializing a visited boolean matrix or a DP memoization table, avoid `new Array(rows).map(() => ...)`! An uninitialized array created with `new Array(rows)` contains empty slots ("holes"), and `Array.prototype.map` skips empty holes entirely without executing your callback! Always use `Array.from()` or initialize with `new Array(rows).fill(null).map(...)`.

---

### 13. 🔴 P0 [Q] How do you swap two elements in an array in-place using ES6 destructuring (`[arr[i], arr[j]] = [arr[j], arr[i]]`), and what is its performance relative to a temporary variable?

> **TL;DR:** Swap elements in a single line using array destructuring: `[arr[i], arr[j]] = [arr[j], arr[i]]`. In ultra-hot loops (millions of iterations), a classic temporary variable is 2–4x faster because it avoids allocating a temporary 2-element array tuple.

**💡 Core Concept & Explanation**
- `[arr[i], arr[j]] = [arr[j], arr[i]]`:
  - The right-hand side creates an anonymous temporary array containing the two values.
  - The left-hand side unpacks those values back into the respective indices.
- Modern V8 engines often optimize this pattern into register swaps, but in complex expressions or tight sorting loops (e.g. Quicksort, Heapify), the temporary array allocation might trigger minor Garbage Collection pressure.

**🛠️ Syntax / Code Template**
```javascript
const arr = [10, 20, 30];

// 1. ES6 Destructuring Swap (Clean, standard for interviews):
[arr[0], arr[2]] = [arr[2], arr[0]];
console.log(arr); // [30, 20, 10]

// 2. Classic Temp Variable (Maximum micro-benchmark speed):
function fastSwap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
```

**⚠️ LeetCode / Interview Pitfall**
- Semicolon trap: If the line preceding an ES6 destructuring swap does not end with a semicolon, JavaScript's Automatic Semicolon Insertion (ASI) attempts to call the preceding statement as a function with the array as an argument!
```javascript
let i = 0, j = 1
[arr[i], arr[j]] = [arr[j], arr[i]] // ❌ TypeError: 1 is not a function!
```
Always terminate the preceding line with a semicolon `;` before `[...] = [...]`.

---

### 14. 🔴 P0 [Q] What is the standard direction vector template (`DIRS = [[0,1],[1,0],[0,-1],[-1,0]]`) for 4-directional and 8-directional 2D grid BFS/DFS exploration, and how do you write clean boundary guards?

> **TL;DR:** Store neighbor coordinate deltas in a constant array `DIRS`. Loop through `DIRS` and calculate `(r + dr, c + dc)`, filtering out-of-bounds cells with an `inBounds(nr, nc)` helper before recurring or enqueueing.

**💡 Core Concept & Explanation**
Manual copy-pasting of 4 separate calls (`dfs(r+1, c)`, `dfs(r-1, c)`, `dfs(r, c+1)`, `dfs(r, c-1)`) introduces code bloat and indexing typos.
- 4-Directions: Right `(0, 1)`, Down `(1, 0)`, Left `(0, -1)`, Up `(-1, 0)`.
- 8-Directions: Adds diagonals `(1, 1)`, `(1, -1)`, `(-1, 1)`, `(-1, -1)`.

**🛠️ Syntax / Code Template**
```javascript
// 4-Directional Exploration Template:
const DIRS = [
  [0, 1],   // Right
  [1, 0],   // Down
  [0, -1],  // Left
  [-1, 0]   // Up
];

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    // Sink the land (mark visited)
    grid[r][c] = '0';

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      // In-bounds guard & condition
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
        dfs(nr, nc);
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
```

**⚠️ LeetCode / Interview Pitfall**
- Writing boundary guards in the wrong order: Always check row boundaries before accessing `grid[nr][nc]`. If you evaluate `grid[nr][nc]` when `nr = -1`, JavaScript throws `TypeError: Cannot read properties of undefined (reading '-1')`.

---

### 15. 🟠 P1 [Q] What is the difference between mutating and non-mutating array operations (`splice` vs `slice`), and how do you perform a shallow copy of an array vs a deep copy of a 2D matrix?

> **TL;DR:** `slice(start, end)` returns a new shallow copy without modifying the original. `splice(start, count, ...items)` directly modifies the original array in-place. A shallow copy `[...matrix]` leaves inner rows shared; a deep copy of a 2D matrix requires `matrix.map(row => [...row])`.

**💡 Core Concept & Explanation**
- **Mutating Operations:** `splice()`, `sort()`, `reverse()`, `push()`, `pop()`, `shift()`, `unshift()`.
- **Non-Mutating Operations:** `slice()`, `concat()`, `map()`, `filter()`.
- Copying a 2D grid with spread `const copy = [...grid]` only copies pointers to the existing row arrays. Modifying `copy[0][0]` will mutate `grid[0][0]`.

**🛠️ Syntax / Code Template**
```javascript
const arr = [1, 2, 3, 4, 5];

// Non-mutating slice:
const sub = arr.slice(1, 4); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] (Unchanged!)

// Mutating splice (removes 2 elements from index 1):
const removed = arr.splice(1, 2); // [2, 3]
console.log(arr); // [1, 4, 5] (Modified!)

// Deep-copying a 2D Matrix:
const matrix = [[1, 2], [3, 4]];
const matrixCopy = matrix.map(row => [...row]);

matrixCopy[0][0] = 999;
console.log(matrix[0][0]); // 1 (Original untouched!)
```

**⚠️ LeetCode / Interview Pitfall**
- When storing valid solutions in backtracking (e.g., Subsets, Permutations), pushing `result.push(path)` pushes a reference to the active mutable array! When backtracking pops elements later, every saved answer in `result` becomes empty. Always push a clone: `result.push([...path])`.

---

### 16. 🟠 P1 [P] Why is `Array.prototype.shift()` an $O(n)$ performance trap for queues in JavaScript, and how do you implement an $O(1)$ amortized queue using an array and a pointer index?

> **TL;DR:** `arr.shift()` removes the first element and shifts all remaining $n-1$ elements in memory by one index, taking $O(n)$ time. Performing $N$ dequeue operations in BFS results in $O(N^2)$ runtime, causing TLE. Use an array with a moving head pointer for $O(1)$ dequeues.

**💡 Core Concept & Explanation**
In V8, JavaScript arrays are backed by contiguous memory buffers. Removing the element at index 0 requires copying every remaining element one position to the left.
- With $N = 10^5$, $10^5$ shift calls require $\approx 5 \times 10^9$ operations $\rightarrow$ **Time Limit Exceeded (TLE)**.
- By maintaining an integer `head` pointer that increments on every dequeue, no elements are shifted in memory, achieving true $O(1)$ time per operation.

**🛠️ Syntax / Code Template**
```javascript
// High-Performance O(1) Queue Template for LeetCode BFS:
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
    this.head++;

    // Periodic garbage reclamation when head exceeds threshold
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

**⚠️ LeetCode / Interview Pitfall**
- If an interviewer asks you to write BFS for a graph with $10^5$ nodes and you use `queue.shift()`, they will ask: *"What is the time complexity of your queue dequeue operation?"* Answering $O(1)$ is an immediate red flag. State that `shift()` is $O(n)$ and demonstrate the head-pointer queue.

---

[⬅️ Previous: 02 · Strings, ASCII & Character](02-strings-ascii-character.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Sorting & Comparators ➡️](04-sorting-comparators.md)
