[⬅️ Previous: 08 · Two Pointers & Binary Search](08-binary-search-two-pointers.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Bit Manipulation & Complexity ➡️](10-bit-manipulation-complexity.md)

---

## 9. Trees, Graphs & Recursion/Backtracking

### 41. 🔴 P0 [Q] How do you define standard `ListNode` and `TreeNode` object structures in JavaScript, and how does the Sentinel/Dummy Head node simplify linked list edge cases?

> **TL;DR:** Use standard constructor functions for nodes (`this.val = val; this.next = null;`). A Sentinel/Dummy Head node (`const dummy = new ListNode(0); dummy.next = head;`) eliminates null pointer checks and special-case branching when inserting at or removing the head of a linked list.

**💡 Core Concept & Explanation**
- Without a dummy node, deleting the head node requires conditional logic: `if (node === head) head = head.next; else prev.next = curr.next;`.
- With a dummy node, the head is treated identically to any internal node. Operations modify `prev.next`, and returning `dummy.next` automatically returns the updated head, even if the original head was deleted!

**🛠️ Syntax / Code Template**
```javascript
// Standard Constructors (LeetCode / CoderPad):
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// Dummy Head in Action: Remove Elements (LeetCode 203)
function removeElements(head, val) {
  const dummy = new ListNode(0, head);
  let curr = dummy;

  while (curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next; // Bypass node
    } else {
      curr = curr.next;
    }
  }

  return dummy.next; // Guaranteed to be the clean new head
}
```

**⚠️ LeetCode / Interview Pitfall**
- When traversing a linked list to build or reverse it, never return `dummy`. Always return `dummy.next`. If the input list is `null` and you return `dummy`, you return an erroneous node with value `0`!

---

### 42. 🔴 P0 [Q] What are the canonical templates for Tree Depth-First Search (Pre-order, In-order, Post-order) and Tree Breadth-First Search (Level-Order with queue snapshotting)?

> **TL;DR:** Tree DFS is recursive: Pre-order visits root-left-right, In-order visits left-root-right (sorted in BST), Post-order visits left-right-root. Tree BFS uses a queue with a level-size snapshot loop `for (let i = 0, len = queue.length; i < len; i++)` to process one level at a time.

**💡 Core Concept & Explanation**
- **DFS:** Follows call stack / explicit stack down branches until reaching `null` base case.
- **BFS Level-Order:** Uses a FIFO queue. Capturing `const size = queue.length` before the loop freezes the exact count of nodes in the current horizontal level. Any newly enqueued children are deferred to subsequent levels.

**🛠️ Syntax / Code Template**
```javascript
// 1. In-Order DFS (Left -> Root -> Right):
function inorderTraversal(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}

// 2. BFS Level-Order Traversal (LeetCode 102):
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

**⚠️ LeetCode / Interview Pitfall**
- In BFS, writing `for (let i = 0; i < queue.length; i++)` directly in the loop condition evaluates the dynamic, growing length of the queue as children are pushed! This collapses all tree levels into one giant flat array. Always assign `const levelSize = queue.length` into a fixed local variable first.

---

### 43. 🔴 P0 [Q] How do you manage backtracking state in JavaScript: passing newly cloned arrays (`[...path, val]`) vs mutating and popping in-place (`path.push(val); dfs(); path.pop()`)?

> **TL;DR:** Always prefer in-place mutation with push-recurse-pop (`path.push(val); dfs(); path.pop()`). Passing clones (`[...path, val]`) creates a new array at every recursive node, wasting $O(N \cdot 2^N)$ memory and degrading performance due to GC pressure. When saving answers to the result list, always clone (`result.push([...path])`).

**💡 Core Concept & Explanation**
- **Passing Clones `dfs([...path, val])`:** Easy to write, but creates $2^N$ temporary arrays across the call tree.
- **Push-Recurse-Pop:** Uses a **single shared array** across the entire traversal. Pushing advances state, recurring explores branches, and popping undoes the decision (backtracks) to restore state.
- **Snapshot Requirement:** When reaching a base case, you must push a shallow copy `result.push([...path])`. If you push `result.push(path)`, you store a reference to the active array, which becomes `[]` when the search concludes!

**🛠️ Syntax / Code Template**
```javascript
// Subsets / Permutations / Combinations Template:
function subsets(nums) {
  const result = [];
  const path = []; // Single shared array instance

  function backtrack(start) {
    // 1. Record snapshot of current path
    result.push([...path]); // Crucial copy!

    // 2. Explore choices
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);      // Choose
      backtrack(i + 1);        // Recurse
      path.pop();              // Un-choose (Backtrack)
    }
  }

  backtrack(0);
  return result;
}
```

**⚠️ LeetCode / Interview Pitfall**
- Result showing empty arrays `[[], [], [], ...]`: This happens when you write `result.push(path)` instead of `result.push([...path])`. When the recursive tree finishes unwinding, `path.length` returns to `0`, causing every recorded entry to display as an empty array.

---

### 44. 🔴 P0 [Q] How do you represent an Adjacency List for graphs in JavaScript using an array of arrays or a `Map<number, number[]>`, and how do you track visited nodes?

> **TL;DR:** For vertices numbered $0$ to $V-1$, use `Array.from({ length: V }, () => [])`. For arbitrary strings or non-contiguous IDs, use `Map<string, string[]>`. Track visited states using a `Set()` or a boolean/typed array (`new Uint8Array(V)`).

**💡 Core Concept & Explanation**
- Graph representation choices:
  - Directed Edge $u \to v$: `adj[u].push(v)`
  - Undirected Edge $u \leftrightarrow v$: `adj[u].push(v); adj[v].push(u);`
- Cycle Detection in Directed Graphs: Requires 3-state coloring ($0 = \text{unvisited}$, $1 = \text{visiting in current path}$, $2 = \text{fully visited}$).

**🛠️ Syntax / Code Template**
```javascript
// Build Adjacency List for Directed Graph:
function buildGraph(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
  }
  return adj;
}

// Course Schedule (LeetCode 207) - Cycle Detection with 3-State Array:
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
  }

  // 0 = unvisited, 1 = visiting (in recursion stack), 2 = visited (safe)
  const state = new Uint8Array(numCourses);

  function hasCycle(node) {
    if (state[node] === 1) return true;  // Back-edge detected!
    if (state[node] === 2) return false; // Already verified safe

    state[node] = 1; // Mark visiting

    for (const neighbor of adj[node]) {
      if (hasCycle(neighbor)) return true;
    }

    state[node] = 2; // Mark fully explored
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}
```

**⚠️ LeetCode / Interview Pitfall**
- Using `new Array(n).fill([])` to create an adjacency list! Just like 2D matrices, every node will share the exact same neighbor list in memory. Always use `Array.from({ length: n }, () => [])`.

---

### 45. 🟠 P1 [P] What is the V8 engine call stack frame limit (~10,000 frames), what causes `RangeError: Maximum call stack size exceeded`, and how do you convert recursive DFS to an iterative stack?

> **TL;DR:** V8 limits recursion depth to $\approx 10,000$ stack frames. In graph/tree problems with degenerate linear topologies (e.g., linked-list-like trees of depth $10^5$), recursion throws `RangeError`. Convert recursion to an iterative loop using an explicit array stack on the heap.

**💡 Core Concept & Explanation**
- Each recursive function call allocates a stack frame storing parameters, local variables, and return pointers in OS execution memory.
- If $N \ge 10^4$ (common in LeetCode graph tests), deep recursion crashes the process.
- The heap has gigabytes of memory. Moving state to an explicit JavaScript array `const stack = [...]` eliminates recursion depth limits completely.

**🛠️ Syntax / Code Template**
```javascript
// Iterative DFS using Explicit Array Stack (Immune to Stack Overflow):
function dfsIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root]; // Heap-allocated stack

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Push right first so left is popped and processed first!
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
```

**⚠️ LeetCode / Interview Pitfall**
- When converting Pre-Order DFS to an iterative stack, remember LIFO ordering: push `node.right` onto the stack **before** `node.left` so that `node.left` is popped and processed first.

---

[⬅️ Previous: 08 · Two Pointers & Binary Search](08-binary-search-two-pointers.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Bit Manipulation & Complexity ➡️](10-bit-manipulation-complexity.md)
