[⬅️ Previous: 07 · Heaps & Priority Queues](07-heaps-priority-queues.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Trees, Graphs & Recursion ➡️](09-trees-graphs-recursion.md)

---

## 8. Two Pointers, Sliding Window & Binary Search

### 36. 🔴 P0 [Q] How do you calculate the midpoint in Binary Search safely in JavaScript without float conversion bugs, comparing `Math.floor(l + (r - l) / 2)` and bitwise `(l + r) >> 1`?

> **TL;DR:** Never write `(l + r) / 2` without rounding in JavaScript (it returns a floating-point number, causing infinite loops with fractional indices). Use `Math.floor(l + (r - l) / 2)` or fast bitwise `(l + r) >> 1`.

**💡 Core Concept & Explanation**
1. **The Float Trap:** In JavaScript, `0 + 1 = 1`, and `(0 + 1) / 2 === 0.5`. Accessing `nums[0.5]` returns `undefined`, breaking all binary search comparisons silently!
2. **Integer Overflow:** In Java/C++, `(l + r)` can exceed $2^{31} - 1$. In JavaScript, numbers are 64-bit floats (up to $2^{53} - 1$), so standard array lengths never overflow float math.
3. **Bitwise Right Shift `>> 1`:** Bitwise operators convert numbers to 32-bit signed integers and perform integer floor division by 2 in a single instruction.

**🛠️ Syntax / Code Template**
```javascript
// Method 1: Math.floor (Universal, works for arbitrarily large indices)
const mid = Math.floor(low + (high - low) / 2);

// Method 2: Bitwise Right Shift (Fastest micro-benchmark, auto-truncates float)
const mid = (low + high) >> 1;

// Method 3: Unsigned Right Shift (Handles 32-bit values up to 2^32 - 1)
const mid = (low + high) >>> 1;
```

**⚠️ LeetCode / Interview Pitfall**
- When `high = nums.length - 1`, if you update `low = mid` without adding 1 (`low = mid`), when `low` and `high` differ by 1, `mid` rounds down to `low`, producing an **infinite loop**! Always pair `while (low <= high)` with `low = mid + 1` and `high = mid - 1`.

---

### 37. 🔴 P0 [Q] Write the canonical templates for Bisect Left (lower bound) and Bisect Right (upper bound) in JavaScript, and explain their loop condition (`while (low < high)`).

> **TL;DR:** Bisect Left finds the first index where `nums[i] >= target`. Bisect Right finds the first index where `nums[i] > target`. Both use `while (low < high)` with `high = nums.length` and return `low`.

**💡 Core Concept & Explanation**
- **Search Space:** `[0, nums.length]`. Notice `high` starts at `nums.length` (not `length - 1`), allowing insertion after the last element.
- **Invariant:** When the loop terminates, `low === high`.
- **Bisect Left:** If `nums[mid] < target`, the target must be to the right $\implies low = mid + 1$. Else, `nums[mid] >= target`, so `mid` is a candidate $\implies high = mid$.
- **Bisect Right:** If `nums[mid] <= target`, the target is to the right $\implies low = mid + 1$. Else, $high = mid$.

**🛠️ Syntax / Code Template**
```javascript
// Bisect Left: First index where nums[i] >= target
function bisectLeft(nums, target) {
  let low = 0, high = nums.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid; // Narrow search space to left half including mid
    }
  }
  return low;
}

// Bisect Right: First index where nums[i] > target
function bisectRight(nums, target) {
  let low = 0, high = nums.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (nums[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

// Example: Search Range of Target (LeetCode 34)
function searchRange(nums, target) {
  const left = bisectLeft(nums, target);
  if (left === nums.length || nums[left] !== target) return [-1, -1];
  const right = bisectRight(nums, target) - 1;
  return [left, right];
}
```

**⚠️ LeetCode / Interview Pitfall**
- When `nums` does not contain `target`, `bisectLeft` returns the index where `target` *should be inserted*. Always check `left < nums.length && nums[left] === target` before assuming the target exists.

---

### 38. 🔴 P0 [Q] What is the standard Two-Pointer convergent template (`while (left < right)`), and how does it apply to sorted Two Sum and Container With Most Water?

> **TL;DR:** Start pointers at opposite ends (`left = 0`, `right = n - 1`). Evaluate condition at each step and move either `left++` or `right--` based on greedy or monotonic constraints, eliminating an entire row/column of candidates in $O(1)$ time to achieve $O(n)$ overall runtime.

**💡 Core Concept & Explanation**
- **Sorted Array Target (Two Sum II):**
  - If `nums[left] + nums[right] < target`, incrementing `left` increases the sum.
  - If `nums[left] + nums[right] > target`, decrementing `right` decreases the sum.
- **Container With Most Water (LeetCode 11):**
  - $\text{Area} = \min(h[l], h[r]) \times (r - l)$.
  - Moving the pointer with the larger height can only decrease width without increasing the constraining height. Thus, greedily move the pointer pointing to the **shorter** height: `if (h[l] < h[r]) l++; else r--;`.

**🛠️ Syntax / Code Template**
```javascript
// Two Sum II - Input Array Is Sorted (LeetCode 167):
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // 1-based index
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}
```

**⚠️ LeetCode / Interview Pitfall**
- In **3Sum (LeetCode 15)**, duplicate handling is the #1 failure mode: after finding a valid triplet and updating pointers, skip adjacent duplicates with `while (left < right && nums[left] === nums[left - 1]) left++` and `while (left < right && nums[right] === nums[right + 1]) right--`.

---

### 39. 🔴 P0 [Q] What is the canonical Sliding Window template in JavaScript with dynamic window expansion (`right++`) and conditional contraction (`left++`)?

> **TL;DR:** Expand window by moving `right++` and updating state. When a window condition is violated (or valid, depending on problem), shrink from the left with `while (invalid) { updateState(); left++; }`. Update global answer at each valid window state.

**💡 Core Concept & Explanation**
Sliding window converts an $O(n^2)$ nested loop into $O(n)$ by ensuring both `left` and `right` traverse the array monotonically forward:
1. `right` pointer expands the window to acquire elements.
2. `left` pointer contracts the window to satisfy or optimize constraints.
3. Because each pointer moves at most $N$ times, total operations are $\le 2N = O(n)$.

**🛠️ Syntax / Code Template**
```javascript
// Longest Substring Without Repeating Characters (LeetCode 3):
function lengthOfLongestSubstring(s) {
  const charMap = new Map(); // char -> last seen index
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character was already seen inside current window, jump left pointer:
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

**⚠️ LeetCode / Interview Pitfall**
- When storing last-seen indices in a map, always verify `charMap.get(char) >= left`. If `charMap.get(char) < left`, that duplicate occurred outside the active window and must NOT pull the `left` pointer backwards!

---

### 40. 🟠 P1 [Q] What is the Fast & Slow Pointers (Floyd's Tortoise and Hare) cycle detection template, and how is it implemented for linked lists and array indices in JavaScript?

> **TL;DR:** Advance `slow` by 1 step and `fast` by 2 steps. If a cycle exists, `fast` and `slow` will collide inside the cycle. To find the entry point, reset `slow = head` and advance both 1 step at a time until they meet again.

**💡 Core Concept & Explanation**
- **Phase 1 (Cycle Detection):** In every iteration, the relative distance between `fast` and `slow` decreases by 1 inside the cycle. If there is a cycle of length $C$, they collide in $\le C$ steps.
- **Phase 2 (Cycle Entrance):** Distance from head to cycle entrance equals distance from collision point to cycle entrance modulo $C$. Resetting `slow` to head and moving both at speed 1 finds the exact start node.

**🛠️ Syntax / Code Template**
```javascript
// Linked List Cycle II (LeetCode 142):
function detectCycle(head) {
  let slow = head;
  let fast = head;

  // Phase 1: Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // Phase 2: Find cycle start
      let entry = head;
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry;
    }
  }

  return null; // No cycle
}
```

**⚠️ LeetCode / Interview Pitfall**
- Always check both `while (fast && fast.next)`. If you only check `fast.next`, and `fast` becomes `null` on an even-length list without a cycle, evaluating `fast.next` throws `TypeError: Cannot read properties of null`.

---

[⬅️ Previous: 07 · Heaps & Priority Queues](07-heaps-priority-queues.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Trees, Graphs & Recursion ➡️](09-trees-graphs-recursion.md)
