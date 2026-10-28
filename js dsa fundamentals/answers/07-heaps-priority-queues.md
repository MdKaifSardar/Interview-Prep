[⬅️ Previous: 06 · Stacks, Queues & Deques](06-stacks-queues-deques.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Two Pointers & Binary Search ➡️](08-binary-search-two-pointers.md)

---

## 7. Heaps & Priority Queues in JavaScript

### 32. 🔴 P0 [C] Why does JavaScript lack a built-in Priority Queue/Heap, and what libraries exist on competitive platforms (e.g., `@datastructures-js/priority-queue` on LeetCode)?

> **TL;DR:** ECMAScript was designed for browser UI events and web scripts, leaving out specialized algorithmic data structures like Heaps. On LeetCode, `@datastructures-js/priority-queue` is globally pre-imported (`MinPriorityQueue` and `MaxPriorityQueue`). However, in live whiteboard rounds (CoderPad/Google Docs), you must know how to implement a minimal heap from scratch.

**💡 Core Concept & Explanation**
- Unlike C++ (`std::priority_queue`), Java (`PriorityQueue`), or Python (`heapq`), JavaScript has no native heap in standard library specifications up to ES2024.
- **LeetCode Environment:**
  LeetCode embeds `@datastructures-js/priority-queue` v5. You can directly write:
  ```javascript
  const minHeap = new MinPriorityQueue();
  minHeap.enqueue(val);
  const min = minHeap.dequeue().element;
  ```
- **Interview Reality:** In Google, Meta, or startup CoderPad rounds, standard npm packages are frequently unavailable. Interviewers expect candidates to write a clean 20–25 line binary heap or simulate it cleanly.

**🛠️ Syntax / Code Template**
```javascript
// LeetCode Built-In Syntax (v5):
// Min Heap for numbers:
const minHeap = new MinPriorityQueue();
minHeap.enqueue(10);
minHeap.enqueue(5);
console.log(minHeap.dequeue().element); // 5

// Max Heap for objects with custom priority:
const maxHeap = new MaxPriorityQueue({ priority: x => x.score });
maxHeap.enqueue({ name: 'Alice', score: 95 });
maxHeap.enqueue({ name: 'Bob', score: 80 });
console.log(maxHeap.dequeue().element.name); // "Alice"
```

**⚠️ LeetCode / Interview Pitfall**
- Do NOT assume `@datastructures-js` works outside of LeetCode. If you type `new MinPriorityQueue()` on HackerRank, CodeSignal, or CoderPad, your code will crash with `ReferenceError: MinPriorityQueue is not defined`. Always confirm platform support with your interviewer before relying on it.

---

### 33. 🔴 P0 [Q] Implement a complete, clean, 25-line `MinHeap` class in JavaScript from scratch (`push`, `pop`, `bubbleUp`, `bubbleDown`) suitable for a live whiteboard interview.

> **TL;DR:** Represent a complete binary tree using a flat 1D array where parent is `(i - 1) >> 1` and children are `2i + 1` and `2i + 2`. Insert at the end and `bubbleUp`; remove the root by replacing it with the last element and `bubbleDown`.

**💡 Core Concept & Explanation**
- **Array Index Relationships:**
  - Parent of index $i$: $\lfloor(i - 1) / 2\rfloor \implies (i - 1) \gg 1$
  - Left child of index $i$: $2i + 1 \implies (i \ll 1) + 1$
  - Right child of index $i$: $2i + 2 \implies (i \ll 1) + 2$
- **Push ($O(\log n)$):** Append to array; swap with parent until heap property is restored (`bubbleUp`).
- **Pop ($O(\log n)$):** Swap root with last element, pop from array; swap down with the smaller child until restored (`bubbleDown`).

**🛠️ Syntax / Code Template**
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
```

**⚠️ LeetCode / Interview Pitfall**
- When `pop()` is called on a heap with only 1 element, `this.data.pop()` empties the array. If you forget the check `if (this.size() > 0)`, you will push that popped element back into `this.data[0]`, preventing the heap from ever becoming empty!

---

### 34. 🔴 P0 [Q] How do you adapt a `MinHeap` into a `MaxHeap` or custom object heap using comparator functions in JavaScript (e.g., for Top $K$ Frequent Elements or $K$ Closest Points)?

> **TL;DR:** Pass a custom comparator callback `(a, b) => ...` to the constructor. For a Max-Heap, invert the comparison to `(a, b) => b - a`. For custom objects, compare specific properties like `(a, b) => b.freq - a.freq`.

**💡 Core Concept & Explanation**
Our `MinHeap` implementation checks:
`if (this.compare(itemA, itemB) < 0)`
When `compare` returns `< 0`, `itemA` is treated as having higher priority and moves towards the root.
- **Min-Heap:** `(a, b) => a - b` (smaller values have higher priority).
- **Max-Heap:** `(a, b) => b - a` (larger values have higher priority).
- **Object Heap (e.g. Points by Distance):** `(p1, p2) => (p1.x**2 + p1.y**2) - (p2.x**2 + p2.y**2)`.

**🛠️ Syntax / Code Template**
```javascript
// 1. Max-Heap for Numbers:
const maxHeap = new MinHeap((a, b) => b - a);
maxHeap.push(10);
maxHeap.push(30);
maxHeap.push(20);
console.log(maxHeap.pop()); // 30

// 2. K Closest Points to Origin (LeetCode 973):
function kClosest(points, k) {
  // Max-Heap of size K based on Euclidean distance
  const dist = p => p[0] ** 2 + p[1] ** 2;
  const maxHeap = new MinHeap((a, b) => dist(b) - dist(a));

  for (const pt of points) {
    maxHeap.push(pt);
    if (maxHeap.size() > k) {
      maxHeap.pop(); // Evict farthest point
    }
  }

  const result = [];
  while (maxHeap.size() > 0) result.push(maxHeap.pop());
  return result;
}
```

**⚠️ LeetCode / Interview Pitfall**
- **Finding Top $K$ Largest vs Smallest:**
  - To find Top $K$ **Largest** elements in a stream of size $N$, maintain a **Min-Heap** of size $K$. When heap size exceeds $K$, pop the minimum. The remaining $K$ elements are the largest!
  - To find Top $K$ **Smallest** elements, maintain a **Max-Heap** of size $K$.

---

### 35. 🟠 P1 [Q] How can you simulate a Priority Queue for small $K$ ($K \le 100$) using binary search insertion (`splice`) without writing a full heap class?

> **TL;DR:** If $K$ is small (e.g. $K \le 100$ in Top $K$ problems), maintain a sorted array of size $K$. Use binary search to find the insertion index in $O(\log K)$ and `arr.splice(idx, 0, val)` to insert in $O(K)$. Total time $O(N \cdot K)$ is fast and requires zero boilerplate.

**💡 Core Concept & Explanation**
Writing a full 25-line Heap class in a 30-minute interview eats valuable time.
- If $K \le 100$, shifting $\le 100$ elements via `splice` takes $< 0.001$ milliseconds in V8.
- $N \log K$ (Heap) vs $N \cdot K$ (Sorted array with binary insertion): When $K$ is small, the constant factor of native C++ `splice` in V8 often outperforms pure JS heap implementations!

**🛠️ Syntax / Code Template**
```javascript
// Binary Insertion Helper:
function insertSorted(arr, val) {
  let l = 0, r = arr.length;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] < val) l = mid + 1;
    else r = mid;
  }
  arr.splice(l, 0, val); // Insert in sorted order
}

// Top K Largest in Stream using simulated K-sized sorted list:
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.arr = [];
    for (const num of nums) this.add(num);
  }

  add(val) {
    insertSorted(this.arr, val);
    if (this.arr.length > this.k) {
      this.arr.shift(); // Evict smallest element
    }
    return this.arr[0]; // K-th largest is at index 0!
  }
}
```

**⚠️ LeetCode / Interview Pitfall**
- Only use this shortcut when $K$ is small ($K \le 100$) or when explicitly approved by the interviewer. If $K = 50,000$, $O(N \cdot K)$ will result in Time Limit Exceeded (TLE), and a true binary heap ($O(N \log K)$) is mandatory.

---

[⬅️ Previous: 06 · Stacks, Queues & Deques](06-stacks-queues-deques.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Two Pointers & Binary Search ➡️](08-binary-search-two-pointers.md)
