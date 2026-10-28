[⬅️ Previous: 08 · Polyfills & Utilities](08-coding-challenges-and-polyfills.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️

---

## 9. DSA in JavaScript

### 9.1 Built-in Complexities & Structures

### 66. 🔴 P0 [P] What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?

> **TL;DR:** Array `push`/`pop` operate in $O(1)$ amortized time. `shift`/`unshift` operate in $O(n)$ time due to memory element re-indexing. `includes`/`indexOf` are $O(n)$ linear scans. `Map`/`Set` operations are $O(1)$ amortized lookups. `Array.prototype.sort()` is $O(n \log n)$ (V8 Timsort).

**💡 Core Concept & Explanation**
Understanding JavaScript engine internals (V8) prevents accidental performance traps in problem solving:
- **`shift()` / `unshift()` Cost:** Operating at index 0 requires the V8 engine to re-index and shift every single remaining element in memory by 1 position ($O(n)$ operation). Calling `shift()` inside a loop creates an unintentional $O(n^2)$ algorithm!
- **`Map` / `Set` vs `Object` / `Array`:** `Set.prototype.has()` and `Map.prototype.get()` use hash tables for $O(1)$ lookup time, whereas `Array.prototype.includes()` performs an $O(n)$ linear scan.
- **`Array.prototype.sort()`:** Implements **Timsort** (hybrid insertion sort + merge sort), running in $O(n \log n)$ time. Default sorting coerces elements to strings alphabetically (`[10, 2].sort()` yields `[10, 2]`), requiring an explicit numeric comparator function `(a, b) => a - b`.

**🛠️ Code / Benchmark Comparison**

```javascript
// Benchmark Example: Array shift() vs Index Increment Pointer
const N = 100000;
const arr = new Array(N).fill(1);

// ❌ Inefficient: shift() takes O(N^2) total time for N elements
console.time('shift');
const arrCopy = [...arr];
while (arrCopy.length > 0) {
  arrCopy.shift(); // O(N) operation inside O(N) loop!
}
console.timeEnd('shift'); // ~2000ms!

// ✅ Efficient: Pointer increment takes O(N) total time
console.time('pointer');
let head = 0;
while (head < arr.length) {
  head++; // O(1) operation inside O(N) loop!
}
console.timeEnd('pointer'); // ~1ms!
```

| Operation | Time Complexity | Auxiliary Space | Engine Internal / Notes |
| :--- | :--- | :--- | :--- |
| `Array.push(x)` / `pop()` | $O(1)$ Amortized | $O(1)$ | Appends/removes at array tail. |
| `Array.unshift(x)` / `shift()` | **$O(n)$** | $O(1)$ | Re-indexes all $n$ elements in memory. |
| `Array.includes(x)` / `indexOf(x)` | $O(n)$ | $O(1)$ | Linear scan from index 0 to $n-1$. |
| `Set.has(x)` / `Map.get(key)` | **$O(1)$ Amortized** | $O(n)$ | Hash table bucket lookup. |
| `Array.sort((a,b) => a-b)` | $O(n \log n)$ | $O(n)$ | V8 Timsort algorithm. |
| String Concatenation (`a + b`) | $O(n + m)$ | $O(n + m)$ | Creates new immutable string in heap memory. |

**⚠️ Interview Pitfall / Pro-Tip**
- **Default Sort Trap:** `[10, 2, 5, 1, 20].sort()` outputs `[1, 10, 2, 20, 5]`! In JavaScript, `.sort()` converts numbers to UTF-16 strings by default. Always pass `(a, b) => a - b` for ascending numerical sorting.

---

### 9.2 Hash Maps & Frequency Counting

### 67. 🔴 P0 [Q] [LeetCode 1: Two Sum](https://leetcode.com/problems/two-sum/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 1: Two Sum](https://leetcode.com/problems/two-sum/)
- **Description:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Hash Map Complement Lookup.
- **Mnemonic:** *"Don't search forward for a pair; store the past and look back for the complement in $O(1)$."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n^2)$ | **Space:** $O(1)$
- **Explanation:** Use two nested loops to check every possible pair `(i, j)` where $j > i$. Suboptimal because checking pairs takes quadratic time.

```javascript
var twoSumBrute = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** As we iterate through `nums`, calculate `complement = target - nums[i]`. If `complement` already exists in our `Map`, we have found the matching pair in a single pass.

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Same Element Reuse:** Check `map.has(complement)` *before* setting `map.set(nums[i], i)` so an element like `nums[i] = 3` with `target = 6` does not match itself.

---

### 68. 🔴 P0 [Q] [LeetCode 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/)
- **Description:** Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** 26-Element Fixed Frequency Array.
- **Mnemonic:** *"If character counts cancel to zero, they are anagrams."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n \log n)$ | **Space:** $O(n)$
- **Explanation:** Split both strings into arrays, sort alphabetically, and compare joined strings. Correct, but sorting takes $O(n \log n)$ time and creates unnecessary array copies.

```javascript
var isAnagramBrute = function(s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(1)$ (Fixed 26-slot array)
- **Explanation:** English lowercase letters range from ASCII 97 (`'a'`) to 122 (`'z'`). Use a fixed 26-element array. Increment for characters in `s` and decrement for characters in `t`. All values must be `0`.

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) return false;
  }

  return true;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Length Mismatch Guard:** Always verify `if (s.length !== t.length) return false` on line 1 for an instant $O(1)$ fast-path exit.

---

### 69. 🔴 P0 [Q] [LeetCode 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Description:** Given an array of strings `strs`, group the anagrams together in any order.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Canonical Key Hashing with Map.
- **Mnemonic:** *"All anagrams share the same sorted canonical signature or frequency string."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n^2 \cdot k)$ | **Space:** $O(n)$
- **Explanation:** For every string, compare with all other unvisited strings using the $O(k)$ anagram check and group them into arrays. Nested comparisons cause quadratic $O(n^2)$ time.

```javascript
var groupAnagramsBrute = function(strs) {
  const visited = new Array(strs.length).fill(false);
  const result = [];

  for (let i = 0; i < strs.length; i++) {
    if (visited[i]) continue;
    const group = [strs[i]];
    visited[i] = true;

    for (let j = i + 1; j < strs.length; j++) {
      if (!visited[j] && isAnagram(strs[i], strs[j])) {
        group.push(strs[j]);
        visited[j] = true;
      }
    }
    result.push(group);
  }
  return result;
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n \cdot k \log k)$ | **Space:** $O(n \cdot k)$
- **Explanation:** Sort each string's characters to create a canonical key (e.g. `"eat"`, `"tea"`, `"ate"` all produce key `"aet"`). Store words in a `Map<string, string[]>`.

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map();

  for (const s of strs) {
    // Generate canonical sorted key
    const key = s.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(s);
  }

  return Array.from(map.values());
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Alternative $O(n \cdot k)$ Optimal Key:** Instead of sorting characters, you can build a 26-count delimiter string (e.g., `#1#0#0...#1`) to achieve linear $O(n \cdot k)$ time. In practice on LeetCode, `s.split('').sort().join('')` runs faster in V8 due to small string lengths ($k \le 100$).

---

### 70. 🔴 P0 [Q] [LeetCode 387: First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 387: First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)
- **Description:** Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Two-Pass Frequency Counting.
- **Mnemonic:** *"Count in pass 1; identify the earliest count of 1 in pass 2."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n^2)$ | **Space:** $O(1)$
- **Explanation:** Use built-in `s.indexOf(ch) === s.lastIndexOf(ch)`. For each character, both `indexOf` and `lastIndexOf` scan the entire string, creating an $O(n^2)$ nested loop.

```javascript
var firstUniqCharBrute = function(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(1)$ (26 lowercase characters)
- **Explanation:** Pass 1 populates a 26-slot integer array with frequencies. Pass 2 scans `s` from index 0; the first character with `count === 1` is returned.

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const count = new Array(26).fill(0);

  // Pass 1: Build frequency table
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  // Pass 2: Find first character with frequency 1
  for (let i = 0; i < s.length; i++) {
    if (count[s.charCodeAt(i) - 97] === 1) {
      return i;
    }
  }

  return -1;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **All duplicates (`"aabb"`):** Loop finishes without returning, hitting `-1`.
- **Single character (`"z"`):** Immediately returns index `0`.

---

### 71. 🟠 P1 [Q] [LeetCode 349: Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 349: Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)
- **Description:** Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Set Membership & In-Place Deletion.
- **Mnemonic:** *"Load smaller array into a Set; delete as you match to enforce uniqueness."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n \cdot m)$ | **Space:** $O(n)$
- **Explanation:** Filter `nums1` using `nums2.includes(x)`. Because `includes()` performs an $O(m)$ scan on every element, total time is quadratic $O(n \cdot m)$.

```javascript
var intersectionBrute = function(nums1, nums2) {
  const matches = nums1.filter(x => nums2.includes(x));
  return Array.from(new Set(matches));
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n + m)$ | **Space:** $O(n)$
- **Explanation:** Convert `nums1` into a `Set`. Iterate `nums2`: if an element exists in the set, push it to `result` and **delete it from the set immediately**. Deleting prevents duplicate entries without needing a second set!

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = [];

  for (const num of nums2) {
    if (set1.has(num)) {
      result.push(num);
      set1.delete(num); // Guarantees uniqueness in O(1)!
    }
  }

  return result;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Intersection with Duplicates (LC 350):** If duplicate counts matter (`[2, 2]` intersecting `[2, 2]` must yield `[2, 2]`), use a frequency map counter instead of a Set.

---

### 9.3 Strings & Two Pointers

### 72. 🔴 P0 [Q] [LeetCode 125: Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 125: Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- **Description:** A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Two Pointers Inward Traversal.
- **Mnemonic:** *"Meet in the middle while skipping non-alphanumerics."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** Strip non-alphanumerics with regex, lowercase, reverse string with `split('').reverse().join('')`, and check equality. Allocates multiple intermediate strings and arrays in heap memory.

```javascript
var isPalindromeBrute = function(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(1)$
- **Explanation:** Maintain two pointers `left = 0` and `right = s.length - 1`. Advance pointers past non-alphanumeric characters using ASCII comparisons, comparing lowercase characters without allocating extra strings.

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(code) {
    return (
      (code >= 48 && code <= 57) || // 0-9
      (code >= 65 && code <= 90) || // A-Z
      (code >= 97 && code <= 122)   // a-z
    );
  }

  while (left < right) {
    while (left < right && !isAlphanumeric(s.charCodeAt(left))) left++;
    while (left < right && !isAlphanumeric(s.charCodeAt(right))) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Empty string or all spaces (`"   "`):** Pointers bypass spaces and cross over, safely returning `true`.

---

### 73. 🟠 P1 [Q] [LeetCode 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)
- **Description:** Given an input string `s`, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Regex Tokenization & Reversal.
- **Mnemonic:** *"Trim ends, split on whitespace chunks `/\s+/`, reverse, and join."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** Naively splitting by a single space `s.split(' ')` creates an array containing empty strings `""` whenever multiple spaces occur. Requires manual filtering loops.

```javascript
var reverseWordsNaive = function(s) {
  const words = s.split(' ');
  const filtered = [];
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].length > 0) filtered.push(words[i]);
  }
  return filtered.join(' ');
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** `s.trim()` strips boundary spaces; regex `/\s+/` tokenizes words by collapsing arbitrary contiguous spaces in one pass. Reverse and join.

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Multiple spaces between words (`"a   good   example"`):** `/\s+/` handles arbitrary spacing cleanly.

---

### 74. 🟠 P1 [Q] [LeetCode 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/)
- **Description:** Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements. You must do this **in-place** without returning anything.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Same-Direction Read/Write Pointers.
- **Mnemonic:** *"Read every element; swap non-zeros forward into the write index."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** Filter all non-zeros into a new array, pad trailing zeros, and copy back into `nums`. Suboptimal because it violates the in-place $O(1)$ space requirement.

```javascript
var moveZeroesBrute = function(nums) {
  const temp = [];
  for (const x of nums) if (x !== 0) temp.push(x);
  while (temp.length < nums.length) temp.push(0);
  for (let i = 0; i < nums.length; i++) nums[i] = temp[i];
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(1)$
- **Explanation:** `write` pointer tracks where the next non-zero should land. `read` pointer scans. When `nums[read] !== 0`, swap `nums[write]` with `nums[read]` and increment `write`.

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      if (read !== write) {
        const temp = nums[write];
        nums[write] = nums[read];
        nums[read] = temp;
      }
      write++;
    }
  }
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Do not return `nums`:** LeetCode verifies the modified array in-place. Returning a value is ignored, but allocating a copy fails memory bounds.

---

### 75. 🟠 P1 [Q] [LeetCode 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Description:** Merge two sorted integer arrays `nums1` and `nums2` into `nums1` as one sorted array in-place. `nums1` has a length of $m + n$, where the last $n$ elements are set to `0`.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** 3-Pointer Back-to-Front In-Place Merge.
- **Mnemonic:** *"Start from the back where the empty space lives."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O((m + n) \log (m + n))$ | **Space:** $O(1)$
- **Explanation:** Copy `nums2` into the tail of `nums1` and run `nums1.sort((a,b) => a-b)`. Suboptimal because it ignores the pre-sorted property of both input arrays.

```javascript
var mergeBrute = function(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(m + n)$ | **Space:** $O(1)$
- **Explanation:** Merging from the front overwrites unread elements in `nums1`. Merging from the **back** (`p = m + n - 1`) places the largest elements into the empty trailing buffer without overwriting.

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Loop Condition:** Only `while (p2 >= 0)` is needed. If `p2 < 0`, remaining elements in `nums1` are already in their correct sorted positions.

---

### 9.4 Sliding Window

### 76. 🔴 P0 [Q] [LeetCode 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Description:** Given a string `s`, find the length of the longest substring without duplicate characters.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Dynamic Sliding Window with Last-Seen Index Map.
- **Mnemonic:** *"Expand right; on duplicate, jump left forward past its earlier position."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n^2)$ | **Space:** $O(\min(n, \sigma))$
- **Explanation:** Check all possible substrings starting at index $i$, using a `Set` to stop when a duplicate is found. Takes quadratic time.

```javascript
var lengthOfLongestSubstringBrute = function(s) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(\min(n, \sigma))$
- **Explanation:** Two pointers define the window `[left, right]`. Store character last-seen indices in a `Map`. When `s[right]` is encountered, jump `left` directly to `lastSeen.get(char) + 1` (using `Math.max` to guarantee `left` never moves backward).

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let maxLen = 0;
  let left = 0;
  const lastSeen = new Map(); // char -> last seen index

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char)) {
      // Jump left forward past duplicate (never backwards!)
      left = Math.max(left, lastSeen.get(char) + 1);
    }

    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **The `"abba"` Trap:** When reaching the second `'a'` at index 3, `lastSeen.get('a')` is 0. Without `Math.max(left, ...)`, `left` rewinds from 2 back to 1, corrupting window integrity.

---

### 9.5 Stack & Queue

### 77. 🟠 P1 [Q] [LeetCode 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Description:** Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** LIFO Stack Matching.
- **Mnemonic:** *"The most recently opened bracket must be closed first."*

**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(n^2)$ | **Space:** $O(n)$
- **Explanation:** Repeatedly replace pairs `()`, `[]`, `{}` with empty strings until none remain. Replacing inside a loop takes quadratic time.

```javascript
var isValidBrute = function(s) {
  let prevLen = -1;
  while (s.length !== prevLen) {
    prevLen = s.length;
    s = s.replace('()', '').replace('[]', '').replace('{}', '');
  }
  return s.length === 0;
};
```

**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(n)$ | **Space:** $O(n)$
- **Explanation:** Odd length can never be valid ($O(1)$ guard). Push opening brackets to an array stack; for closing brackets, pop and verify matching pair. Return `stack.length === 0`.

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (map[ch]) {
      // Closing bracket: pop and compare
      if (stack.pop() !== map[ch]) return false;
    } else {
      // Opening bracket: push to stack
      stack.push(ch);
    }
  }

  return stack.length === 0;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Unclosed Brackets (`"((("`):** Loop finishes without mismatch, but `stack.length === 0` correctly evaluates to `false`.

---

### 78. 🟠 P1 [Q] [LeetCode 232: Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)

**📜 Problem Statement & LeetCode Link**
- **LeetCode Link:** [LeetCode 232: Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)
- **Description:** Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support `push`, `pop`, `peek`, and `empty`.

**🧠 Solution Summary & Pattern Mnemonic**
- **Pattern:** Two Stacks (`inStack` & `outStack`) with Lazy Reversal.
- **Mnemonic:** *"Push to inStack; transfer to outStack only when outStack is empty."*

**🐢 Brute Force Approach**
- **Complexity:** **Push:** $O(n)$ | **Pop:** $O(1)$
- **Explanation:** On *every* push, dump all elements to a helper stack, push the new item, and dump everything back. Unnecessarily runs in $O(n)$ for every push.

```javascript
var MyQueueBrute = function() {
  this.s1 = [];
  this.s2 = [];
};

MyQueueBrute.prototype.push = function(x) {
  while (this.s1.length > 0) this.s2.push(this.s1.pop());
  this.s1.push(x);
  while (this.s2.length > 0) this.s1.push(this.s2.pop());
};
MyQueueBrute.prototype.pop = function() { return this.s1.pop(); };
MyQueueBrute.prototype.peek = function() { return this.s1[this.s1.length - 1]; };
MyQueueBrute.prototype.empty = function() { return this.s1.length === 0; };
```

**🚀 Optimal Approach**
- **Complexity:** **Push:** $O(1)$ | **Pop / Peek:** **Amortized $O(1)$** | **Space:** $O(n)$
- **Explanation:** Maintain `inStack` and `outStack`. `push` always appends to `inStack` in $O(1)$. When `pop` or `peek` is called and `outStack` is empty, transfer all elements from `inStack` to `outStack`. Each element is pushed and popped between stacks at most twice!

```javascript
var MyQueue = function() {
  this.inStack = [];
  this.outStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.inStack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  this.peek(); // Ensures outStack is loaded
  return this.outStack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack[this.outStack.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.inStack.length === 0 && this.outStack.length === 0;
};
```

**⚠️ Edge Cases & Interview Gotchas**
- **Amortized Analysis:** Interviewers love asking why `peek()` is $O(1)$ amortized when the `while` loop runs in $O(n)$ in the worst case. Explain that every element enters `inStack` once and `outStack` once, totaling $\le 2$ operations per element across its lifetime.

---

[⬅️ Previous: 08 · Polyfills & Utilities](08-coding-challenges-and-polyfills.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️
