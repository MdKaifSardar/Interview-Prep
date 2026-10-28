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

**🛠️ Code / Visual Diagram / Table**

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

### 67. 🟠 P1 [Q] Implement a stack and a queue in JavaScript: [LeetCode 232: Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) & [LeetCode 225: Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/), and explain why shift() is inefficient for a queue.

> **TL;DR:** Stacks follow LIFO (Last-In, First-Out) using $O(1)$ `push()` and `pop()`. Queues follow FIFO (First-In, First-Out). Modeling a Queue with `arr.shift()` causes $O(n)$ element re-indexing on every dequeue. On LeetCode, queues are implemented using two stacks (`inStack` and `outStack`) for amortized $O(1)$ operations.

**💡 Core Concept & Explanation**
- **LeetCode 232 (Queue using Two Stacks):**
  - Maintain `inStack` for `push` and `outStack` for `pop`/`peek`.
  - When `pop()` or `peek()` is called and `outStack` is empty, transfer all elements from `inStack` to `outStack`. This reverses their order to FIFO!
  - Each element is moved between stacks at most once, achieving amortized $O(1)$ time per operation.

**🛠️ Code / Visual Diagram / Table**

```javascript
// LeetCode 232: Implement Queue using Stacks
var MyQueue = function() {
  this.inStack = [];
  this.outStack = [];
};

MyQueue.prototype.push = function(x) {
  this.inStack.push(x);
};

MyQueue.prototype.pop = function() {
  this.peek(); // Ensures outStack has elements
  return this.outStack.pop();
};

MyQueue.prototype.peek = function() {
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function() {
  return this.inStack.length === 0 && this.outStack.length === 0;
};

// Usage Example:
const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek());  // 1
console.log(queue.pop());   // 1
console.log(queue.empty()); // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Transferring Elements:** In `MyQueue`, do not transfer elements back and forth on every `push`. Only transfer from `inStack` to `outStack` on `pop`/`peek` when `outStack` is completely empty. This preserves the amortized $O(1)$ bound.

---

### 9.2 Strings & Palindromes

### 68. 🔴 P0 [Q] [LeetCode 125: Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) — Reverse a string and check whether it is a palindrome, with and without built-in methods.

> **TL;DR:** [LeetCode 125](https://leetcode.com/problems/valid-palindrome/) requires verifying if a string is a palindrome after converting to lowercase and removing all non-alphanumeric characters. The Two-Pointer technique compares characters from both ends inward in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **Alphanumeric Filtering:** Palindrome checks must ignore case and non-alphanumeric characters. You can clean the string with regex `/[^a-z0-9]/gi` or skip non-alphanumeric characters directly using ASCII ranges during pointer movement.
- **Two-Pointer Approach:** Start `left = 0`, `right = s.length - 1`. Advance pointers while skipping non-alphanumerics, checking if `s[left].toLowerCase() === s[right].toLowerCase()`.

**🛠️ Code / Visual Diagram / Table**

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let left = 0;
  let right = s.length - 1;

  function isAlphanumeric(ch) {
    const code = ch.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) || // 0-9
      (code >= 65 && code <= 90) || // A-Z
      (code >= 97 && code <= 122)   // a-z
    );
  }

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

// Test Cases:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                              // true
```

**⚠️ Interview Pitfall / Pro-Tip**
- **String Cleaning Memory Tradeoff:** Doing `s.replace(/[^a-z0-9]/gi, '').toLowerCase()` is a clean 3-line solution, but it allocates a new string in memory ($O(n)$ space). Moving pointers and skipping characters in-place achieves $O(1)$ auxiliary space.

---

### 69. 🔴 P0 [Q] [LeetCode 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/) — Check whether two strings are anagrams.

> **TL;DR:** [LeetCode 242](https://leetcode.com/problems/valid-anagram/) checks if $t$ is an anagram of $s$. If lengths differ, return `false`. A 26-element integer frequency array or `Map` counts character frequencies in $s$ and decrements with $t$ in $O(n)$ time and $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
1. **Length Check:** If `s.length !== t.length`, return `false` immediately.
2. **Frequency Counter:** Since inputs consist of lowercase English letters, a 26-element array `freq` indexed by `char.charCodeAt(0) - 97` is faster than a hash map and consumes $O(1)$ fixed space.
3. If any frequency drops below 0 when scanning $t$, return `false`.

**🛠️ Code / Visual Diagram / Table**

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

// Test Cases:
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Sorting Shortcut:** `s.split('').sort().join('') === t.split('').sort().join('')` is a 1-line solution, but it takes $O(n \log n)$ time and $O(n)$ space. Interviewers expect the $O(n)$ time and $O(1)$ space frequency array.

---

### 70. 🔴 P0 [Q] [LeetCode 387: First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/) — Count character frequencies in a string and find the first non-repeating character.

> **TL;DR:** [LeetCode 387](https://leetcode.com/problems/first-unique-character-in-a-string/) asks for the index of the first non-repeating character in $s$ (or `-1` if none exists). Count frequencies in a first pass, then return the index of the first character with `count === 1` in a second pass in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **Pass 1:** Build a 26-element frequency array `count[s.charCodeAt(i) - 97]++`.
- **Pass 2:** Iterate through the string from index $0$ to $n-1$. The first character where `count[s.charCodeAt(i) - 97] === 1` is our answer.
- If the loop finishes without finding any unique character, return `-1`.

**🛠️ Code / Visual Diagram / Table**

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const count = new Array(26).fill(0);

  // Pass 1: Build frequencies
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  // Pass 2: Find first character with count 1
  for (let i = 0; i < s.length; i++) {
    if (count[s.charCodeAt(i) - 97] === 1) {
      return i;
    }
  }

  return -1;
};

// Test Cases:
console.log(firstUniqChar("leetcode"));     // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
console.log(firstUniqChar("aabb"));         // -1
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Nested `indexOf` Trap:** `s.indexOf(ch) === s.lastIndexOf(ch)` inside a loop runs in $O(n^2)$ time! The two-pass frequency array runs in linear $O(n)$ time.

---

### 71. 🟠 P1 [Q] [LeetCode 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) — Reverse the words in a sentence and handle multiple whitespace separators.

> **TL;DR:** [LeetCode 151](https://leetcode.com/problems/reverse-words-in-a-string/) requires reversing the order of words in a string, trimming leading/trailing spaces, and reducing multiple spaces between words to a single space in $O(n)$ time.

**💡 Core Concept & Explanation**
1. **Sanitization:** `s.trim()` strips leading and trailing whitespace.
2. **Whitespace Collapsing:** Splitting by regex `/\s+/` tokenizes words while cleanly collapsing any sequence of spaces, tabs, or newlines into distinct word tokens.
3. **Reversal & Join:** Reverse the tokens array and join with a single space `' '`.

**🛠️ Code / Visual Diagram / Table**

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};

// Test Cases:
console.log(reverseWords("the sky is blue"));          // "blue is sky the"
console.log(reverseWords("  hello world  "));          // "world hello"
console.log(reverseWords("a good   example"));         // "example good a"
```

**⚠️ Interview Pitfall / Pro-Tip**
- `s.split(' ')` on `"a   b"` returns `["a", "", "", "b"]` with empty strings! Always use regex `/\s+/` with `.trim()`.
- If the interviewer requires an in-place $O(1)$ space solution (when input is given as a character array `char[]`), reverse the entire array first, then reverse each individual word in-place, and shift characters to collapse spaces.

---

### 9.3 Sliding Window & Stack

### 72. 🟠 P1 [Q] [LeetCode 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — Check whether a string of brackets is valid using a stack.

> **TL;DR:** [LeetCode 20](https://leetcode.com/problems/valid-parentheses/) validates bracket matching for `'()[]{}'`. Push opening brackets onto an array stack; for closing brackets, pop from the stack and verify the pair matches. Return `true` if the stack is empty at the end.

**💡 Core Concept & Explanation**
- **LIFO Stack Matching:** The most recently opened bracket must be closed first.
- If string length is odd (`s.length % 2 !== 0`), it can never be valid—return `false` immediately ($O(1)$ fast path).
- Map closing brackets to opening counterparts: `{ ')': '(', '}': '{', ']': '[' }`.
- If a closing bracket is encountered and the popped element does not match, return `false`.

**🛠️ Code / Visual Diagram / Table**

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
      // Closing bracket
      const top = stack.pop();
      if (top !== map[ch]) return false;
    } else {
      // Opening bracket
      stack.push(ch);
    }
  }

  return stack.length === 0;
};

// Test Cases:
console.log(isValid("()"));     // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
console.log(isValid("([)]"));   // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- Don't forget `return stack.length === 0` at the end! If the input is `"((("`, no closing bracket is ever processed, so returning `true` without checking `stack.length === 0` is a classic bug.

---

### 73. 🔴 P0 [Q] [LeetCode 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — Find the longest substring without repeating characters using the dynamic sliding window pattern.

> **TL;DR:** [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) asks for the length of the longest substring with zero duplicate characters. Use a sliding window with two pointers (`left` and `right`) and a `Map` storing character last-seen indices to achieve $O(n)$ time and $O(\min(n, \sigma))$ space.

**💡 Core Concept & Explanation**
- Pointers `[left, right]` define the active window.
- When `s[right]` is already in `lastSeen`, jump `left` forward to `lastSeen.get(char) + 1`.
- **Forward-Only Guard:** Use `left = Math.max(left, lastSeen.get(char) + 1)` so that `left` never moves backward if the duplicate was recorded outside the current window.

**🛠️ Code / Visual Diagram / Table**

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let maxLength = 0;
  let left = 0;
  const lastSeen = new Map(); // char -> last seen index

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char)) {
      // Jump left pointer forward past earlier duplicate (never backwards!)
      left = Math.max(left, lastSeen.get(char) + 1);
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// Test Cases:
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ("wke")
console.log(lengthOfLongestSubstring("abba"));     // 2 ("ab")
```

**⚠️ Interview Pitfall / Pro-Tip**
- The `"abba"` trap: When reading the second `'a'` at index 3, `lastSeen.get('a')` is index 0. Without `Math.max(left, ...)`, `left` rewinds from index 2 back to 1, re-introducing the duplicate `'b'`!

---

### 9.4 Arrays, Two Pointers & Hash Maps

### 74. 🔴 P0 [Q] [LeetCode 215: Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — Find the largest and second-largest numbers in an array without sorting.

> **TL;DR:** [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) finds the $k$-th largest element (for $k=2$, the second largest). Maintain `max1` and `max2` initialized to `-Infinity` to find the largest and second-largest in a single $O(n)$ pass without sorting (which takes $O(n \log n)$).

**💡 Core Concept & Explanation**
- **Single-Pass Logic:**
  - If `num > max1`: `max2 = max1; max1 = num;`
  - Else if `num > max2 && num !== max1`: `max2 = num;`
- **For arbitrary $k$ on LeetCode:** Use a Min-Heap of size $k$ in $O(n \log k)$ time, or Quickselect in $O(n)$ average time.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Classic Second-Largest Element (Single Pass O(n) Time, O(1) Space):
function getSecondLargest(nums) {
  if (nums.length < 2) return -1;
  let max1 = -Infinity;
  let max2 = -Infinity;

  for (const num of nums) {
    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num !== max1) {
      max2 = num;
    }
  }

  return max2 === -Infinity ? -1 : max2;
}

// 2. LeetCode 215 Canonical Solution (Quickselect / Min-Heap):
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  // Using Quickselect algorithm (O(n) average time):
  const targetIdx = nums.length - k;

  function quickselect(left, right) {
    const pivot = nums[right];
    let p = left;
    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[p], nums[i]] = [nums[i], nums[p]];
        p++;
      }
    }
    [nums[p], nums[right]] = [nums[right], nums[p]];

    if (p === targetIdx) return nums[p];
    if (p < targetIdx) return quickselect(p + 1, right);
    return quickselect(left, p - 1);
  }

  return quickselect(0, nums.length - 1);
};

console.log(getSecondLargest([12, 35, 1, 10, 34, 1])); // 34
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));    // 5
```

**⚠️ Interview Pitfall / Pro-Tip**
- Clarify whether "second largest" allows duplicates (`[10, 10, 9]` $\rightarrow$ is it `10` or `9`?). In LeetCode 215, it is based on sorted index (`10`); in strict distinct second-largest problems, `num !== max1` ensures distinctness.

---

### 75. 🔴 P0 [Q] [LeetCode 1: Two Sum](https://leetcode.com/problems/two-sum/) — Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.

> **TL;DR:** [LeetCode 1](https://leetcode.com/problems/two-sum/) finds two indices whose values sum to `target`. A Hash Map stores `{ number -> index }`. For each number, check if `complement = target - num` is already present. Operates in $O(n)$ time and $O(n)$ space, beating brute-force $O(n^2)$.

**💡 Core Concept & Explanation**
- For each element `nums[i]`, we need `complement = target - nums[i]`.
- Checking if `complement` exists in a Hash Map takes $O(1)$ average time.
- Check before inserting to prevent using the same element twice.

**🛠️ Code / Visual Diagram / Table**

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

// Test Cases:
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]
```

**⚠️ Interview Pitfall / Pro-Tip**
- Don't use a two-pointer approach after sorting for LeetCode 1 unless you store original indices first, because `nums.sort()` alters the original index positions requested by the problem.

---

### 76. 🟠 P1 [Q] [LeetCode 169: Majority Element](https://leetcode.com/problems/majority-element/) & [LeetCode 347: Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Find the most frequent element in an array using a hash map.

> **TL;DR:** [LeetCode 169](https://leetcode.com/problems/majority-element/) finds the element appearing more than $\lfloor n/2 \rfloor$ times using Boyer-Moore Voting in $O(n)$ time and $O(1)$ space. For general frequencies ([LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/)), use a frequency map and bucket sort in $O(n)$ time.

**💡 Core Concept & Explanation**
- **Boyer-Moore Voting Algorithm (LC 169):** Maintain a `candidate` and a `count`. When `count === 0`, pick the current number as `candidate`. Increment count if current number matches candidate, else decrement. The majority element is guaranteed to survive.
- **Top K Frequent (LC 347):** Count frequencies with a `Map`, group elements by frequency into an array of buckets, and collect the top $k$ from the highest bucket downwards in $O(n)$ time.

**🛠️ Code / Visual Diagram / Table**

```javascript
// LeetCode 169: Majority Element (Boyer-Moore Voting -> O(n) Time, O(1) Space)
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let candidate = nums[0];
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate ? 1 : -1);
  }

  return candidate;
};

// LeetCode 347: Top K Frequent Elements (Bucket Sort -> O(n) Time, O(n) Space)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  // Buckets where index = frequency:
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
};

console.log(majorityElement([3, 2, 3]));       // 3
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
```

**⚠️ Interview Pitfall / Pro-Tip**
- For LeetCode 347, sorting map entries by frequency `[...map.entries()].sort((a,b) => b[1] - a[1])` takes $O(n \log n)$ time. Bucket sort achieves optimal $O(n)$ linear time.

---

### 77. 🟠 P1 [Q] [LeetCode 268: Missing Number](https://leetcode.com/problems/missing-number/) — Find the missing number in an array containing 0 to n.

> **TL;DR:** [LeetCode 268](https://leetcode.com/problems/missing-number/) finds the single missing number from $[0, n]$. Calculate Gauss's sum $S = \frac{n(n+1)}{2}$ and subtract array sum, or XOR all numbers from $0$ to $n$ with all array elements. Runs in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **XOR Property ($x \oplus x = 0$):** Every number that appears in the array will cancel out with its corresponding index counterpart in the range $[0, n]$. The missing number has no duplicate and remains.
- Completely immune to integer overflow.

**🛠️ Syntax / Code Template**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let xor = nums.length; // Start with n

  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i]; // Pair each index with each array value
  }

  return xor;
};

// Math Sum Alternative:
var missingNumberSum = function(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, x) => acc + x, 0);
  return expectedSum - actualSum;
};

// Test Cases:
console.log(missingNumber([3, 0, 1]));             // 2
console.log(missingNumber([0, 1]));                // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1]));   // 8
```

**⚠️ Interview Pitfall / Pro-Tip**
- In LeetCode 268, the range is $[0, n]$ (length is $n$, numbers up to $n$). Notice `let xor = nums.length;` initializes `xor` with $n$, so all numbers $0..n$ are XORed across the $n$ loop steps.

---

### 78. 🟠 P1 [Q] [LeetCode 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/) — Move all zeros to the end of an array in place while preserving order.

> **TL;DR:** [LeetCode 283](https://leetcode.com/problems/move-zeroes/) requires mutating `nums` in-place without returning anything (`void`). Maintain a `write` pointer. Whenever `nums[read]` is non-zero, swap `nums[write]` with `nums[read]` and increment `write`. Runs in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- `write` pointer tracks where the next non-zero number should go.
- `read` pointer scans every element.
- Swapping when `read !== write` guarantees all non-zeros stay in original order while zeros are pushed to the tail.

**🛠️ Syntax / Code Template**

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

// Test Case:
const arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log(arr); // [1, 3, 12, 0, 0] (Mutated in-place!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Do not return anything!** LeetCode's test runner checks `nums` after calling `moveZeroes(nums)`. Returning an array or allocating a new array `[...nonZeroes, ...zeroes]` fails the $O(1)$ extra memory requirement.

---

### 79. 🟠 P1 [Q] [LeetCode 189: Rotate Array](https://leetcode.com/problems/rotate-array/) — Rotate an array by k positions in-place using the 3-step reversal algorithm.

> **TL;DR:** [LeetCode 189](https://leetcode.com/problems/rotate-array/) rotates `nums` right by $k$ steps in-place (`void`). Normalize $k = k \% n$. Reverse the entire array, reverse the first $k$ elements, and reverse the remaining $n - k$ elements in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **3-Step Reversal:**
  1. $k = k \% n$ (handles $k > n$).
  2. Reverse entire array: `[1,2,3,4,5,6,7]` $\to$ `[7,6,5,4,3,2,1]`
  3. Reverse first $k$ items ($k=3$): `[5,6,7,4,3,2,1]`
  4. Reverse remaining $n-k$ items: `[5,6,7,1,2,3,4]`

**🛠️ Syntax / Code Template**

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const n = nums.length;
  k = k % n;
  if (k === 0) return;

  function reverse(arr, start, end) {
    while (start < end) {
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }

  // 1. Reverse whole array
  reverse(nums, 0, n - 1);
  // 2. Reverse first k elements
  reverse(nums, 0, k - 1);
  // 3. Reverse remaining n - k elements
  reverse(nums, k, n - 1);
};

// Test Case:
const arr = [1, 2, 3, 4, 5, 6, 7];
rotate(arr, 3);
console.log(arr); // [5, 6, 7, 1, 2, 3, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- `nums.unshift(...nums.splice(-k))` looks like an elegant one-liner, but `splice` allocates a new array and `unshift` re-indexes all elements in $O(n \cdot k)$ time, which times out on LeetCode with large inputs.

---

### 9.5 Array Transformations & Recursion

### 80. 🟠 P1 [Q] [LeetCode 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) — Merge two sorted arrays into nums1 in-place from back to front.

> **TL;DR:** [LeetCode 88](https://leetcode.com/problems/merge-sorted-array/) merges `nums2` into `nums1` in-place (`void`). Because `nums1` has trailing zeros of length $m + n$, fill from the **back to front** using 3 pointers (`p1 = m - 1`, `p2 = n - 1`, `p = m + n - 1`) in $O(m + n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- Merging from front to back overwrites unread elements in `nums1`.
- Merging from back to front places the largest elements into the unused zero slots at the end of `nums1`, requiring zero extra memory buffers!

**🛠️ Syntax / Code Template**

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

// Test Case:
const nums1 = [1, 2, 3, 0, 0, 0];
merge(nums1, 3, [2, 5, 6], 3);
console.log(nums1); // [1, 2, 2, 3, 5, 6]
```

**⚠️ Interview Pitfall / Pro-Tip**
- The loop condition only needs `while (p2 >= 0)`. If `p2 < 0`, any remaining items in `nums1` are already in their correct sorted positions!

---

### 81. 🟠 P1 [Q] [LeetCode 349: Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) — Find the intersection of two arrays returning unique elements.

> **TL;DR:** [LeetCode 349](https://leetcode.com/problems/intersection-of-two-arrays/) returns an array of unique intersection values. Store `nums1` in a `Set`. Iterate `nums2` and collect elements found in the set, deleting matched elements from the set to avoid duplicates. Runs in $O(n + m)$ time.

**💡 Core Concept & Explanation**
- `set1.has(x)` is $O(1)$ average time.
- Deleting `set1.delete(num)` upon discovery guarantees uniqueness without allocating a second `Set`.

**🛠️ Syntax / Code Template**

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
      set1.delete(num); // Prevents duplicates in result
    }
  }

  return result;
};

// Test Cases:
console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- If the problem is **LeetCode 350 (Intersection of Two Arrays II)** where duplicates must be preserved according to frequency, use a frequency counter `Map` rather than a `Set`.

---

### 82. 🟠 P1 [Q] [LeetCode 2677: Chunk Array](https://leetcode.com/problems/chunk-array/) — Split an array into sub-arrays of size n.

> **TL;DR:** [LeetCode 2677](https://leetcode.com/problems/chunk-array/) (part of 30 Days of JavaScript) requires splitting `arr` into chunks of `size`. Iterate with step `size`, using `arr.slice(i, i + size)` to extract chunks without mutating the input array in $O(n)$ time.

**💡 Core Concept & Explanation**
- `arr.slice(i, i + size)` extracts sub-arrays safely. If `i + size > arr.length`, `slice` stops at `arr.length`.
- Returns an empty array `[]` if `arr` is empty.

**🛠️ Syntax / Code Template**

```javascript
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

// Test Cases:
console.log(chunk([1, 2, 3, 4, 5], 1)); // [[1], [2], [3], [4], [5]]
console.log(chunk([1, 9, 6, 3, 2], 3)); // [[1, 9, 6], [3, 2]]
console.log(chunk([], 1));              // []
```

**⚠️ Interview Pitfall / Pro-Tip**
- Avoid `arr.splice(0, size)` in a while loop! `splice` mutates and empties the original input array passed by the caller.

---

### 83. 🟠 P1 [Q] [LeetCode 2625: Flatten Deeply Nested Array](https://leetcode.com/problems/flatten-deeply-nested-array/) — Flatten deeply nested arrays and objects into dot-notation keys.

> **TL;DR:** [LeetCode 2625](https://leetcode.com/problems/flatten-deeply-nested-array/) flattens an array up to depth $n$. Recursively explore items: if an element is an array and current depth $< n$, recurse; otherwise push value directly. In frontend interviews, the object equivalent flattens nested objects into dot-notation keys (`{ a: { b: 1 } }` $\to$ `{ "a.b": 1 }`).

**💡 Core Concept & Explanation**
- **LeetCode 2625:** Takes `(arr, n)`. Traverses array, maintaining current recursion depth.
- **Flatten Object Companion:** Recursively joins nested object keys with `.` until reaching primitives.

**🛠️ Syntax / Code Template**

```javascript
// 1. LeetCode 2625: Flatten Deeply Nested Array up to depth n:
/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function(arr, n) {
  if (n <= 0) return arr;
  const result = [];

  function helper(currentArr, currentDepth) {
    for (const item of currentArr) {
      if (Array.isArray(item) && currentDepth < n) {
        helper(item, currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  }

  helper(arr, 0);
  return result;
};

// 2. Flatten Object (Frontend Interview Favorite):
function flattenObject(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

console.log(flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1));
// [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

console.log(flattenObject({ a: { b: 1, c: { d: 2 } }, e: 3 }));
// { "a.b": 1, "a.c.d": 2, "e": 3 }
```

**⚠️ Interview Pitfall / Pro-Tip**
- For LeetCode 2625, writing `arr.flat(n)` passes the problem in modern runtimes, but interviewers explicitly test your recursive depth-tracking logic. Writing the custom helper proves you understand traversal and recursion boundaries.

---

### 84. 🟠 P1 [Q] [LeetCode 509: Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) — Compute Fibonacci recursively, iteratively, and with memoization, comparing time complexities.

> **TL;DR:** [LeetCode 509](https://leetcode.com/problems/fibonacci-number/) calculates $F(n)$. Naive recursion is $O(2^n)$ exponential time. Memoization reduces it to $O(n)$ time and $O(n)$ space. Iterative bottom-up DP calculates $F(n)$ in $O(n)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- Base cases: $F(0) = 0, F(1) = 1$.
- Relation: $F(n) = F(n-1) + F(n-2)$.
- Space Optimization: You only need the previous two numbers (`prev1` and `prev2`) to compute the current Fibonacci value, eliminating the need for an array table.

**🛠️ Syntax / Code Template**

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n <= 1) return n;

  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

// Test Cases:
console.log(fib(2)); // 1
console.log(fib(3)); // 2
console.log(fib(4)); // 3
```

| Approach | Time Complexity | Auxiliary Space | Call Stack Risk |
| :--- | :--- | :--- | :--- |
| **Naive Recursion** | $O(2^n)$ | $O(n)$ | High (`RangeError: Maximum call stack size exceeded`) |
| **Memoized DP** | $O(n)$ | $O(n)$ | Moderate for large $n$ |
| **Iterative DP (Optimal)** | **$O(n)$** | **$O(1)$** | **None** |

**⚠️ Interview Pitfall / Pro-Tip**
- Calling naive recursive `fib(50)` freezes JavaScript execution because it requires $\approx 2^{50} \approx 1.12 \times 10^{15}$ operations!

---

[⬅️ Previous: 08 · Polyfills & Utilities](08-coding-challenges-and-polyfills.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️
