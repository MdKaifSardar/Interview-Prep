# JavaScript Fundamentals for DSA & Problem Solving — Master List (50 Questions)

> **Track:** DSA in JavaScript · LeetCode Mastery · CoderPad Technical Interview Coding
> 
> **Standard Legend:**
> - **Priority:** 🔴 P0 Essential (Highest frequency & fatal gotcha risks) · 🟠 P1 Important (High yield & deep mechanics)
> - **Type:** [C] Conceptual & Engine Internals · [Q] Code Mechanism & Implementation · [P] Performance & Complexity

---

## Module 1: Numbers, Math & Floating-Point Precision

1. 🔴 P0 [C] How are numbers represented internally in JavaScript (IEEE 754 float64), what are `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER`, and when does precision breakdown occur?
2. 🔴 P0 [Q] What is the difference between `Math.floor()`, `Math.trunc()`, and bitwise truncation (`x | 0`, `~~x`) for positive and negative numbers in integer division?
3. 🟠 P1 [Q] How do `Infinity` and `-Infinity` behave in initialization, and why does `Math.max(...arr)` fail or throw a `RangeError` on large arrays?
4. 🟠 P1 [C] Why does `0.1 + 0.2 !== 0.3` in JavaScript, what is `Number.EPSILON`, and how do you safely compare floating-point numbers in algorithmic calculations?
5. 🟠 P1 [Q] What is `BigInt`, how do you declare and operate with it, why can't it be mixed with regular numbers, and when is it necessary in competitive programming?

---

## Module 2: Strings, ASCII & Character Manipulation

6. 🔴 P0 [Q] How do you convert characters to ASCII codes and vice versa in JavaScript (`charCodeAt`, `codePointAt`, `String.fromCharCode`), and how do they handle surrogate pairs?
7. 🔴 P0 [Q] How do you implement a fixed 26-element frequency array for lowercase English letters `'a'`–`'z'` using character math (`charCodeAt(0) - 97`), and why is it faster than a hash map?
8. 🔴 P0 [Q] Why are strings immutable in JavaScript, what happens when you attempt `str[i] = 'x'`, and what are the most memory-efficient ways to build or mutate strings?
9. 🟠 P1 [Q] What is the difference between `String.prototype.slice()` and `String.prototype.substring()`, and how does negative index handling differ between them?
10. 🟠 P1 [Q] What are the essential regular expressions used in string DSA problems (e.g., stripping non-alphanumerics `/[^a-z0-9]/gi`, trimming, and splitting on multiple whitespace characters `/\s+/`)?

---

## Module 3: Arrays, 2D Matrices & Grid Traversal

11. 🔴 P0 [Q] What is the critical memory aliasing trap with `new Array(m).fill(new Array(n).fill(0))`, and what bug does it cause when modifying a single matrix cell?
12. 🔴 P0 [Q] What is the correct, bug-free way to allocate and initialize a 2D matrix of dimensions $M \times N$ in JavaScript?
13. 🔴 P0 [Q] How do you swap two elements in an array in-place using ES6 destructuring (`[arr[i], arr[j]] = [arr[j], arr[i]]`), and what is its performance relative to a temporary variable?
14. 🔴 P0 [Q] What is the standard direction vector template (`DIRS = [[0,1],[1,0],[0,-1],[-1,0]]`) for 4-directional and 8-directional 2D grid BFS/DFS exploration, and how do you write clean boundary guards?
15. 🟠 P1 [Q] What is the difference between mutating and non-mutating array operations (`splice` vs `slice`), and how do you perform a shallow copy of an array vs a deep copy of a 2D matrix?
16. 🟠 P1 [P] Why is `Array.prototype.shift()` an $O(n)$ performance trap for queues in JavaScript, and how do you implement an $O(1)$ amortized queue using an array and a pointer index?

---

## Module 4: Sorting & Custom Comparators

17. 🔴 P0 [Q] Why does `[10, 2, 5].sort()` sort as `[10, 2, 5]`, and how does the numeric comparator callback `(a, b) => a - b` work internally?
18. 🔴 P0 [Q] How do you implement multi-key and tie-breaker sorting in JavaScript (e.g., sort intervals `[start, end]` by start ascending, and by end descending on ties)?
19. 🟠 P1 [C] What sorting algorithm is used by JavaScript engines (V8's Timsort), is `Array.prototype.sort()` guaranteed to be stable, and what are its time and space complexities?
20. 🟠 P1 [Q] How do you sort an array of strings in alphabetical or natural order using `localeCompare()`, and how do you sort based on custom character priority?
21. 🟠 P1 [Q] What are the ES2023 non-mutating array methods `toSorted()`, `toReversed()`, and `toSpliced()`, and how do they differ from `sort()`, `reverse()`, and `splice()`?

---

## Module 5: Hash Maps & Hash Sets (`Map` & `Set`)

22. 🔴 P0 [C] What are the differences between a plain object `{}` and a `Map` when used as a hash table in DSA (key types, prototype pollution, iteration, size)?
23. 🔴 P0 [Q] Why does `new Set().add([1, 2]).has([1, 2])` return `false`, and how do you serialize array or coordinate keys for `Set` and `Map` in grid/graph problems?
24. 🔴 P0 [Q] What is the idiomatic pattern for frequency counting and element cleanup with a `Map` in JavaScript (`map.set(k, (map.get(k) || 0) + 1)`, decrementing, and deleting)?
25. 🟠 P1 [Q] How do you perform mathematical Set operations in JavaScript (union, intersection, difference, and deduplicating an array with `[...new Set(arr)]`)?
26. 🟠 P1 [P] How does key equality work in `Map` and `Set` (SameValueZero algorithm, handling of `NaN` and `+0`/`-0`), and what is the average vs worst-case lookup complexity?

---

## Module 6: Stacks, Queues & Deques

27. 🔴 P0 [Q] How do you implement an $O(1)$ stack using JavaScript built-in array methods (`push`, `pop`, peeking via `.at(-1)` or `arr[arr.length - 1]`)?
28. 🔴 P0 [Q] How do you implement an interview-ready, high-performance Queue class with $O(1)$ enqueue and dequeue operations without triggering memory leaks?
29. 🟠 P1 [Q] What is the Monotonic Stack pattern, and what is its canonical JavaScript template for finding the Next Greater Element in $O(n)$ time?
30. 🟠 P1 [Q] What is the Monotonic Deque pattern, and how is it used to solve the Sliding Window Maximum problem in $O(n)$ time?
31. 🟠 P1 [Q] How do you implement a Doubly Linked List node in JavaScript to support $O(1)$ deletion and insertion for a Deque or LRU Cache?

---

## Module 7: Heaps & Priority Queues in JavaScript

32. 🔴 P0 [C] Why does JavaScript lack a built-in Priority Queue/Heap, and what libraries exist on competitive platforms (e.g., `@datastructures-js/priority-queue` on LeetCode)?
33. 🔴 P0 [Q] Implement a complete, clean, 25-line `MinHeap` class in JavaScript from scratch (`push`, `pop`, `bubbleUp`, `bubbleDown`) suitable for a live whiteboard interview.
34. 🔴 P0 [Q] How do you adapt a `MinHeap` into a `MaxHeap` or custom object heap using comparator functions in JavaScript (e.g., for Top $K$ Frequent Elements or $K$ Closest Points)?
35. 🟠 P1 [Q] How can you simulate a Priority Queue for small $K$ ($K \le 100$) using binary search insertion (`splice`) without writing a full heap class?

---

## Module 8: Two Pointers, Sliding Window & Binary Search

36. 🔴 P0 [Q] How do you calculate the midpoint in Binary Search safely in JavaScript without float conversion bugs, comparing `Math.floor(l + (r - l) / 2)` and bitwise `(l + r) >> 1`?
37. 🔴 P0 [Q] Write the canonical templates for Bisect Left (lower bound) and Bisect Right (upper bound) in JavaScript, and explain their loop condition (`while (low < high)`).
38. 🔴 P0 [Q] What is the standard Two-Pointer convergent template (`while (left < right)`), and how does it apply to sorted Two Sum and Container With Most Water?
39. 🔴 P0 [Q] What is the canonical Sliding Window template in JavaScript with dynamic window expansion (`right++`) and conditional contraction (`left++`)?
40. 🟠 P1 [Q] What is the Fast & Slow Pointers (Floyd's Tortoise and Hare) cycle detection template, and how is it implemented for linked lists and array indices in JavaScript?

---

## Module 9: Trees, Graphs & Recursion/Backtracking

41. 🔴 P0 [Q] How do you define standard `ListNode` and `TreeNode` object structures in JavaScript, and how does the Sentinel/Dummy Head node simplify linked list edge cases?
42. 🔴 P0 [Q] What are the canonical templates for Tree Depth-First Search (Pre-order, In-order, Post-order) and Tree Breadth-First Search (Level-Order with queue snapshotting)?
43. 🔴 P0 [Q] How do you manage backtracking state in JavaScript: passing newly cloned arrays (`[...path, val]`) vs mutating and popping in-place (`path.push(val); dfs(); path.pop()`)?
44. 🔴 P0 [Q] How do you represent an Adjacency List for graphs in JavaScript using an array of arrays or a `Map<number, number[]>`, and how do you track visited nodes?
45. 🟠 P1 [P] What is the V8 engine call stack frame limit (~10,000 frames), what causes `RangeError: Maximum call stack size exceeded`, and how do you convert recursive DFS to an iterative stack?

---

## Module 10: Bit Manipulation & Built-In Complexity

46. 🔴 P0 [Q] How do bitwise operators in JavaScript coerce numbers to 32-bit signed integers, why does `1 << 31` result in a negative number, and what is the unsigned right shift (`>>>`)?
47. 🔴 P0 [Q] What are the essential bit manipulation recipes in JavaScript: check $k$-th bit, set $k$-th bit, clear $k$-th bit, and toggle $k$-th bit?
48. 🔴 P0 [Q] How does Brian Kernighan’s algorithm (`n & (n - 1)`) work to count set bits in $O(\text{set bits})$, and how do you test if a number is a power of 2?
49. 🟠 P1 [P] What are the exact time and space complexities of JavaScript array built-ins (`push`, `pop`, `shift`, `unshift`, `slice`, `splice`, `concat`, `indexOf`, `sort`)?
50. 🟠 P1 [Q] What are the performance and Garbage Collection (GC) implications of excessive object and array allocations inside tight loops during algorithmic execution?
