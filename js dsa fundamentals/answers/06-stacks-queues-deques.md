[⬅️ Previous: 05 · Hash Maps & Sets](05-hash-maps-sets-lookups.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Heaps & Priority Queues ➡️](07-heaps-priority-queues.md)

---

## 6. Stacks, Queues & Deques

### 27. 🔴 P0 [Q] How do you implement an $O(1)$ stack using JavaScript built-in array methods (`push`, `pop`, peeking via `.at(-1)` or `arr[arr.length - 1]`)?

> **TL;DR:** JavaScript arrays natively function as optimal LIFO stacks. `.push(x)` and `.pop()` operate in amortized $O(1)$ time at the end of the array. Peek at the top element using `stack[stack.length - 1]` or modern `stack.at(-1)`.

**💡 Core Concept & Explanation**
Because elements are inserted and removed from the *end* of the array, the V8 engine does not re-index existing elements. Memory buffers grow exponentially (capacity doubling), yielding amortized $O(1)$ time complexity for all standard stack operations:
- Push: `stack.push(val)` $\rightarrow O(1)$
- Pop: `stack.pop()` $\rightarrow O(1)$
- Top: `stack[stack.length - 1]` $\rightarrow O(1)$
- Size / IsEmpty: `stack.length === 0` $\rightarrow O(1)$

**🛠️ Syntax / Code Template**
```javascript
// Canonical Valid Parentheses (LeetCode 20):
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch); // O(1)
    } else {
      // Peek & pop
      if (stack.length === 0 || stack.pop() !== map[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

**⚠️ LeetCode / Interview Pitfall**
- Do NOT use `stack.unshift()` and `stack.shift()` to implement a stack at the front of an array. Both take $O(n)$ time and will cause TLE. Always append and pop from the *tail*.
- Note on `.at(-1)`: ES2022 `.at(-1)` is convenient, but in performance-critical tight loops, `stack[stack.length - 1]` is slightly faster as it skips function call dispatch.

---

### 28. 🔴 P0 [Q] How do you implement an interview-ready, high-performance Queue class with $O(1)$ enqueue and dequeue operations without triggering memory leaks?

> **TL;DR:** Maintain an array with an advancing `head` pointer. Dequeue reads `items[head++]` in $O(1)$ time without shifting elements. Periodically compact the array when `head` crosses an allocation threshold to prevent unbounded memory growth.

**💡 Core Concept & Explanation**
- `arr.shift()` shifts all remaining items in memory, taking $O(n)$ time.
- Incrementing a `head` integer pointer avoids memory copies, giving instant $O(1)$ dequeue.
- **Garbage Collection Compaction:** If millions of items are processed, `this.items` holds references to old dequeued items. Slicing `this.items = this.items.slice(this.head)` once `head` reaches a compaction threshold (e.g., $1000$ items and $> 50\%$ capacity) frees memory for GC.

**🛠️ Syntax / Code Template**
```javascript
class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  push(val) {
    this.items.push(val); // O(1)
  }

  pop() {
    if (this.isEmpty()) return null;
    const val = this.items[this.head];
    this.items[this.head] = null; // Free reference for GC
    this.head++;

    // Periodic memory compaction
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
- When implementing Breadth-First Search (BFS) level-order traversal, if you snapshot `const size = queue.size`, ensure you use your custom `.size` getter rather than `queue.items.length` (which includes dead dequeued slots before `head`).

---

### 29. 🟠 P1 [Q] What is the Monotonic Stack pattern, and what is its canonical JavaScript template for finding the Next Greater Element in $O(n)$ time?

> **TL;DR:** A monotonic stack maintains elements in strictly increasing or decreasing order. As each new element arrives, pop smaller elements from the stack before pushing the current element. Every element enters and leaves the stack at most once, yielding linear $O(n)$ time.

**💡 Core Concept & Explanation**
- **Monotonic Decreasing Stack:** Stores indices of elements whose "next greater" has not yet been found.
- When an element $nums[i]$ is greater than the stack top $nums[stack.at(-1)]$, $nums[i]$ is the Next Greater Element for that popped top!
- Total time: $O(n)$ amortized because each index is pushed once and popped at most once.

**🛠️ Syntax / Code Template**
```javascript
// Next Greater Element (LeetCode 739: Daily Temperatures / LeetCode 496):
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Stores INDICES, not values

  for (let i = 0; i < n; i++) {
    // While current temp is greater than temp at stack top:
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex; // Distance to warmer day
    }
    stack.push(i);
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// Output: [ 1, 1, 4, 2, 1, 1, 0, 0 ]
```

**⚠️ LeetCode / Interview Pitfall**
- Store **indices** on the stack rather than values! Storing indices allows calculating distances (`i - prevIndex`), looking up the original values, and updating the output array directly.

---

### 30. 🟠 P1 [Q] What is the Monotonic Deque pattern, and how is it used to solve the Sliding Window Maximum problem in $O(n)$ time?

> **TL;DR:** A monotonic deque stores candidate maximums in decreasing order of value. Smaller elements at the back of the deque are popped when a larger element enters, and elements falling outside the window boundaries are popped from the front. The window maximum is always at `deque[0]`.

**💡 Core Concept & Explanation**
In a sliding window of size $K$:
1. If element $nums[i]$ enters and $nums[i] \ge nums[j]$ where $j < i$, element $j$ can never be the maximum in any current or future window. Hence, pop $j$ from the back.
2. If the index at the front of the deque has expired ($front \le i - k$), pop it from the front.
3. The current window maximum is always the front element `nums[deque[0]]`.

**🛠️ Syntax / Code Template**
```javascript
// Sliding Window Maximum (LeetCode 239) in O(n) Time:
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove indices outside the current window [i - k + 1, i]
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // 2. Remove smaller elements from the back (maintain decreasing order)
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    // 3. Add current element index
    deque.push(i);

    // 4. Record maximum once the first window of size k is formed
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

**⚠️ LeetCode / Interview Pitfall**
- For competitive programming with large $N$ ($N \ge 10^5$), `deque.shift()` can be replaced by a head pointer to avoid the $O(n)$ shift cost when deque contains multiple elements.

---

### 31. 🟠 P1 [Q] How do you implement a Doubly Linked List node in JavaScript to support $O(1)$ deletion and insertion for a Deque or LRU Cache?

> **TL;DR:** Create a `Node` containing `key`, `val`, `prev`, and `next`. Connect a `head` sentinel and a `tail` sentinel. Any node can be inserted at the head or deleted in $O(1)$ time by rewiring 4 pointers without edge-case null checks.

**💡 Core Concept & Explanation**
- **Sentinels (Dummy Head & Tail):** `head.next = tail` and `tail.prev = head`. Eliminates boundary checks for empty lists.
- **$O(1)$ Removal:**
  `node.prev.next = node.next;`
  `node.next.prev = node.prev;`
- **$O(1)$ Insertion at Head (Most Recently Used):**
  `node.next = head.next;`
  `node.prev = head;`
  `head.next.prev = node;`
  `head.next = node;`

**🛠️ Syntax / Code Template**
```javascript
class DNode {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key -> DNode
    this.head = new DNode();
    this.tail = new DNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insertHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }
    const node = new DNode(key, value);
    this._insertHead(node);
    this.map.set(key, node);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
}
```

**⚠️ LeetCode / Interview Pitfall**
- When evicting the least recently used node `this.tail.prev`, you must store `node.key` on the node so you can delete it from `this.map`. If your node only stores `val`, you cannot identify which key to evict from the hash map in $O(1)$ time!

---

[⬅️ Previous: 05 · Hash Maps & Sets](05-hash-maps-sets-lookups.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Heaps & Priority Queues ➡️](07-heaps-priority-queues.md)
