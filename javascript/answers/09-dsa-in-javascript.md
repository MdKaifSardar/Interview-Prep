[⬅️ Previous: 08 · Polyfills & Utilities](08-coding-challenges-and-polyfills.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️

---

## 9. DSA in JavaScript

### 9.1 Built-in Complexities & Structures

### 66. 🔴 P0 [P] What are the time complexities of common JavaScript built-ins (push/pop vs shift/unshift, includes/indexOf, Map/Set lookups, sort, string concatenation), and why do they matter when solving problems?

> **TL;DR:** Array `push`/`pop` operate in $O(1)$ amortized time. `shift`/`unshift` operate in $O(N)$ time due to memory element re-indexing. `includes`/`indexOf` are $O(N)$ linear scans. `Map`/`Set` operations are $O(1)$ amortized lookups. `Array.prototype.sort()` is $O(N \log N)$ (V8 Timsort).

**💡 Core Concept & Explanation**
Understanding JavaScript engine internals (V8) prevents accidental performance traps in problem solving:
- **`shift()` / `unshift()` Cost:** Operating at index 0 requires the V8 engine to re-index and shift every single remaining element in memory by 1 position ($O(N)$ operation). Calling `shift()` inside a loop creates an unintentional $O(N^2)$ algorithm!
- **`Map` / `Set` vs `Object` / `Array`:** `Set.prototype.has()` and `Map.prototype.get()` use hash tables for $O(1)$ lookup time, whereas `Array.prototype.includes()` performs an $O(N)$ linear scan.
- **`Array.prototype.sort()`:** Implements **Timsort** (hybrid insertion sort + merge sort), running in $O(N \log N)$ time. Default sorting coerces elements to strings alphabetically (`[10, 2].sort()` yields `[10, 2]`), requiring an explicit numeric comparator function `(a, b) => a - b`.

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
| `Array.unshift(x)` / `shift()` | **$O(N)$** | $O(1)$ | Re-indexes all $N$ elements in memory. |
| `Array.includes(x)` / `indexOf(x)` | $O(N)$ | $O(1)$ | Linear scan from index 0 to $N-1$. |
| `Set.has(x)` / `Map.get(key)` | **$O(1)$ Amortized** | $O(N)$ | Hash table bucket lookup. |
| `Array.sort((a,b) => a-b)` | $O(N \log N)$ | $O(N)$ | V8 Timsort algorithm. |
| String Concatenation (`a + b`) | $O(N + M)$ | $O(N + M)$ | Creates new immutable string in heap memory. |

**⚠️ Interview Pitfall / Pro-Tip**
- **Default Sort Trap:** `[10, 2, 5, 1, 20].sort()` outputs `[1, 10, 2, 20, 5]`! In JavaScript, `.sort()` converts numbers to UTF-16 strings by default. Always pass `(a, b) => a - b` for ascending numerical sorting.


---

### 67. 🟠 P1 [Q] How do you implement a stack and a queue in JavaScript, and why is shift() inefficient for a queue?

> **TL;DR:** Stacks follow LIFO (Last-In, First-Out) using $O(1)$ `push()` and `pop()`. Queues follow FIFO (First-In, First-Out). Modeling a Queue with `shift()` causes $O(N)$ element re-indexing on every dequeue. Efficient Queues use Object hash maps with pointers or two-stack algorithms for $O(1)$ operations.

**💡 Core Concept & Explanation**
- **Stack:** Operates at the end of the array. `push()` and `pop()` execute in $O(1)$ constant time.
- **Queue:** Operates at opposite ends (enqueue at tail, dequeue at head). Using `Array.prototype.shift()` requires re-allocating memory indices for all remaining $N-1$ elements.
- **$O(1)$ Queue Solution:** Maintain `head` and `tail` index pointers on a JavaScript Object map.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Stack Implementation (LIFO) -> O(1) operations
class Stack {
  constructor() { this.items = []; }
  push(element) { this.items.push(element); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// 2. High-Performance Queue Implementation (FIFO) -> O(1) operations (No shift!)
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head]; // Clean up memory
    this.head++;
    return item;
  }
  peek() {
    return this.items[this.head];
  }
  isEmpty() {
    return this.tail - this.head === 0;
  }
  size() {
    return this.tail - this.head;
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Memory Leaks in Pointer Queues:** In pointer-based object queues, forgetting `delete this.items[this.head]` retains references to dequeued items, preventing garbage collection and causing memory leaks!


---

### 9.2 Strings & Palindromes

### 68. 🔴 P0 [Q] Reverse a string and check whether it is a palindrome, with and without built-in methods.

> **TL;DR:** Built-in string reversal (`str.split('').reverse().join('')`) requires $O(N)$ time and $O(N)$ auxiliary space. The Two-Pointer technique compares characters from both ends inward, checking palindromes in $O(N)$ time with $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
- **Sanitization:** Palindrome checks must ignore case and non-alphanumeric characters using Regex `/[^a-z0-9]/gi`.
- **Two-Pointer Efficiency:** Move `left` pointer rightward and `right` pointer leftward simultaneously. Stop if characters mismatch. Avoids allocating intermediate array instances in heap memory.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Method 1: Two-Pointer Approach -> O(N) Time, O(1) Auxiliary Space
function isPalindromeTwoPointer(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Method 2: Built-in Array Reversal -> O(N) Time, O(N) Space
function isPalindromeBuiltIn(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = clean.split('').reverse().join('');
  return clean === reversed;
}

console.log(isPalindromeTwoPointer("A man, a plan, a canal: Panama")); // true
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Unicode Surrogate Pair Trap:** `str.split('')` breaks multi-byte Unicode characters (e.g. emojis 😃). Use Array spread `[...str].reverse().join('')` or `String.prototype.codePointAt()` for full Unicode safety.


---

### 69. 🔴 P0 [Q] Check whether two strings are anagrams.

> **TL;DR:** Two strings are anagrams if they contain identical character frequencies. Sorting takes $O(N \log N)$ time. Frequency counter hash maps verify anagrams in $O(N)$ time and $O(1)$ auxiliary space (max 26/128 characters).

**💡 Core Concept & Explanation**
1. **Length Check:** If `str1.length !== str2.length`, return `false` immediately.
2. **Frequency Map:** Count character frequencies in string 1, then decrement counts using string 2. If any count drops below 0 or remains non-zero, they are not anagrams.

**🛠️ Code / Visual Diagram / Table**

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freqMap = {};

  for (let char of s) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  for (let char of t) {
    if (!freqMap[char]) {
      return false; // Character missing or frequency exceeded
    }
    freqMap[char]--;
  }

  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("rat", "car"));       // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Sorting Shortcut:** `s.split('').sort().join('') === t.split('').sort().join('')` is simple $O(N \log N)$ code, but interviewers explicitly ask for $O(N)$ linear hash map solutions.


---

### 70. 🔴 P0 [Q] Count character frequencies in a string and find the first non-repeating character.

> **TL;DR:** Use a `Map` to count character frequencies in a single pass. JavaScript `Map` preserves key insertion order, allowing the first character with a frequency count of `1` to be identified in a second linear scan in $O(N)$ time and $O(U)$ space.

**💡 Core Concept & Explanation**
- **Insertion-Order Guarantee:** Unlike plain objects prior to ES6, JavaScript `Map` guarantees iteration over keys in exact insertion order.
- **Two-Pass Algorithm:**
  1. Pass 1: Build frequency map `{ char -> count }`.
  2. Pass 2: Iterate string or map keys to find the first entry with `count === 1`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function firstUniqChar(s) {
  const charCounts = new Map();

  // Pass 1: Build Frequency Map
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }

  // Pass 2: Find First Character with Count 1
  for (let i = 0; i < s.length; i++) {
    if (charCounts.get(s[i]) === 1) {
      return i; // Return index (or s[i] for character)
    }
  }

  return -1; // No unique character found
}

console.log(firstUniqChar("leetcode"));     // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Nested `indexOf` Trap:** Using `s.indexOf(char) === s.lastIndexOf(char)` inside a loop runs in $O(N^2)$ time! The two-pass `Map` solution achieves linear $O(N)$ performance.


---

### 71. 🟠 P1 [Q] Reverse the words in a sentence and capitalize the first letter of each word.

> **TL;DR:** Split the sentence into words using Regex `/\s+/` (handling multiple spaces), transform each word by capitalizing the first letter and reversing or mapping characters, and join back into a single space-separated string in $O(N)$ time.

**💡 Core Concept & Explanation**
1. **Sanitization:** `str.trim().split(/\s+/)` strips leading/trailing spaces and handles multiple contiguous spaces.
2. **Transformation:** Capitalize `word[0].toUpperCase()` and append `word.slice(1)`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function reverseWordsAndCapitalize(sentence) {
  if (!sentence || typeof sentence !== 'string') return '';

  return sentence
    .trim()
    .split(/\s+/)
    .reverse() // Reverse order of words in sentence
    .map(word => {
      if (word.length === 0) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

console.log(reverseWordsAndCapitalize("  hello   world  javascript  "));
// Output: "Javascript World Hello"
```

**⚠️ Interview Pitfall / Pro-Tip**
- **String Immutability:** Strings in JavaScript are immutable. Concatenating strings in loops allocates new strings. Array `map()` and `join(' ')` is the optimal idiom.


---

### 9.3 Sliding Window & Stack

### 72. 🟠 P1 [Q] Check whether a string of brackets is valid using a stack.

> **TL;DR:** Push opening brackets `(`, `{`, `[` onto an array stack. When encountering a closing bracket `)`, `}`, `]`, pop from the stack and verify matching bracket pairs using a map lookup. Return `true` if the stack is completely empty at the end.

**💡 Core Concept & Explanation**
- **LIFO Stack Matching:** The most recently opened bracket must be closed first.
- **Algorithm:**
  1. Map closing brackets to opening counterparts: `{ ')': '(', '}': '{', ']': '[' }`.
  2. Iterate string: if opening bracket, `stack.push(char)`.
  3. If closing bracket, `stack.pop()` and compare. If mismatch or stack was empty, return `false`.
  4. Final check: `stack.length === 0`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function isValidParentheses(s) {
  if (s.length % 2 !== 0) return false; // Odd length cannot be valid!

  const stack = [];
  const matchingMap = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (matchingMap[char]) {
      // Closing bracket encountered
      const top = stack.pop();
      if (top !== matchingMap[char]) {
        return false;
      }
    } else {
      // Opening bracket encountered
      stack.push(char);
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("(]"));     // false
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Length Parity Optimization:** An odd-length bracket string can NEVER be balanced. Checking `if (s.length % 2 !== 0) return false;` at line 1 provides an instant $O(1)$ fast-path return.


---

### 73. 🔴 P0 [Q] Find the longest substring without repeating characters (sliding window pattern).

> **TL;DR:** Use a sliding window with two pointers (`left` and `right`) and a `Map` storing the last seen index of each character. When a duplicate is encountered inside the current window, jump `left` to `lastSeenIndex + 1`, tracking the maximum window length (`right - left + 1`) in $O(N)$ time and $O(\min(N, \Sigma))$ space.

**💡 Core Concept & Explanation**
- **Dynamic Sliding Window:** Pointers define a valid contiguous window containing zero duplicate characters.
- **Index Map Jump Optimization:** Rather than shrinking the window one character at a time with a `Set` (which takes $2N$ steps), storing character indices in a `Map` allows jumping `left` directly past the earlier occurrence of the duplicate character.
- **Window Boundary Guard:** When jumping `left`, you must ensure you only move `left` *forward* (`left = Math.max(left, map.get(char) + 1)`), preventing `left` from rewinding to an index outside the current active window.

**🛠️ Code / Visual Diagram / Table**

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const lastSeen = new Map(); // char -> last seen index

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastSeen.has(char)) {
      // Jump left pointer forward past duplicate (never backwards)
      left = Math.max(left, lastSeen.get(char) + 1);
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Test cases:
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ("wke")
```

```
String: " a  b  c  a  b  c  b  b "
Window: [a  b  c] -> max = 3
Next 'a' seen at idx 0: jump left to idx 1
Window:    [b  c  a] -> max = 3
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Rewinding `left` Pointer:** Forgetting `Math.max(left, ...)` is the classic bug. In `"abba"`, when reaching the second `'a'` at index 3, `lastSeen.get('a')` is 0. If you blindly do `left = lastSeen.get('a') + 1 = 1`, `left` rewinds from 2 back to 1, including duplicate `'b'` again!

---

### 9.4 Arrays, Two Pointers & Hash Maps

### 74. 🔴 P0 [Q] Find the largest and second-largest numbers in an array without sorting.

> **TL;DR:** Maintain two pointers `max1` and `max2` initialized to `-Infinity`. Iterate through the array once in $O(N)$ time and $O(1)$ auxiliary space, updating pointers dynamically without sorting (which takes $O(N \log N)$ time).

**💡 Core Concept & Explanation**
- **Single Pass Logic:**
  - If `num > max1`: `max2 = max1; max1 = num;`
  - Else if `num > max2 && num !== max1`: `max2 = num;`

**🛠️ Code / Visual Diagram / Table**

```javascript
function findTwoLargest(nums) {
  if (!Array.isArray(nums) || nums.length < 2) {
    return { max1: null, max2: null };
  }

  let max1 = -Infinity;
  let max2 = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num !== max1) {
      max2 = num;
    }
  }

  return {
    max1: max1 === -Infinity ? null : max1,
    max2: max2 === -Infinity ? null : max2
  };
}

console.log(findTwoLargest([12, 35, 1, 10, 34, 1])); // { max1: 35, max2: 34 }
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Duplicate Elements Gotcha:** If the array contains duplicates `[10, 10, 9]`, ask the interviewer if "second largest" means distinct value (`9`) or second index position (`10`). The `num !== max1` guard handles distinct values.


---

### 75. 🔴 P0 [Q] Solve Two Sum using a hash map, and explain why it beats the nested-loop approach.

> **TL;DR:** Brute-force nested loops check all pairs in $O(N^2)$ time. A Hash Map stores seen numbers and their array indices `map.set(num, index)`, checking if `complement = target - num` exists in a single linear pass in $O(N)$ time and $O(N)$ space.

**💡 Core Concept & Explanation**
- **Mathematical Identity:** For each number $x$, we need $y$ such that $x + y = target \implies y = target - x$.
- **Hash Map Lookup:** Checking if $y$ exists in a Hash Map takes $O(1)$ time, reducing time complexity from $O(N^2)$ to $O(N)$.

**🛠️ Code / Visual Diagram / Table**

```javascript
function twoSum(nums, target) {
  const map = new Map(); // Stores { number -> index }

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (map.has(complement)) {
      return [map.get(complement), i]; // Pair found!
    }

    map.set(num, i); // Store current number and index
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Same Element Reuse:** Ensure you check `map.has(complement)` BEFORE adding the current element `map.set(num, i)` into the map, preventing an element from matching with itself when `target = 2 * num`.


---

### 76. 🟠 P1 [Q] Find the most frequent element in an array using a hash map.

> **TL;DR:** Populate a frequency hash map (`Map` or object) by iterating through the array. Track the element with the maximum frequency counter during a single pass or second pass in $O(N)$ time and $O(U)$ auxiliary space (where $U$ is unique elements).

**💡 Core Concept & Explanation**
- **Hash Map Counter:** Key is the element value, value is its count.
- **Single-Pass Tracking:** You can maintain `maxCount` and `mostFrequent` dynamically inside the same loop as counting, avoiding a separate iteration over map entries.
- **Handling Ties:** Clarify with interviewer whether to return the first-occurring element, any tie, or an array of all tied modal elements.

**🛠️ Code / Visual Diagram / Table**

```javascript
function findMostFrequent(arr) {
  if (!arr || arr.length === 0) return null;

  const freq = new Map();
  let maxCount = 0;
  let mostFrequent = arr[0];

  for (const item of arr) {
    const count = (freq.get(item) || 0) + 1;
    freq.set(item, count);

    if (count > maxCount) {
      maxCount = count;
      mostFrequent = item;
    }
  }

  return { element: mostFrequent, count: maxCount };
}

// Test cases:
console.log(findMostFrequent([1, 3, 2, 1, 4, 1])); // { element: 1, count: 3 }
console.log(findMostFrequent(["apple", "banana", "apple", "orange"])); // { element: "apple", count: 2 }
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Object Key String Coercion:** Using plain object `{}` coerces all keys to strings: `freq[1]` and `freq["1"]` collide under the same key! Using a JS `Map` preserves numeric, boolean, and object key distinctions cleanly.

---

### 77. 🟠 P1 [Q] Find the missing number in an array containing 1 to n.

> **TL;DR:** Calculate expected sum using Gauss's formula $S = rac{N(N+1)}{2}$ and subtract the actual array sum in $O(N)$ time and $O(1)$ space. Alternatively, use XOR bitwise properties ($x \oplus x = 0$) to eliminate overflow risks.

**💡 Core Concept & Explanation**
1. **Gauss Sum Approach:** Sum of integers from $1$ to $N$ is $rac{N(N+1)}{2}$. Expected Sum $-$ Actual Sum $=$ Missing Number.
2. **Bitwise XOR Approach:** XORing a number by itself yields $0$ ($A \oplus A = 0$). XORing all indices $1..N$ with all array values cancels out all present numbers, leaving only the missing number!

**🛠️ Code / Visual Diagram / Table**

```javascript
// Method 1: Math Sum Formula -> O(N) Time, O(1) Space
function findMissingNumberMath(nums, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, val) => acc + val, 0);
  return expectedSum - actualSum;
}

// Method 2: Bitwise XOR -> O(N) Time, O(1) Space (Overflow-Safe)
function findMissingNumberXOR(nums, n) {
  let xorSum = 0;

  // XOR all numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    xorSum ^= i;
  }

  // XOR all elements in array
  for (let num of nums) {
    xorSum ^= num;
  }

  return xorSum;
}

console.log(findMissingNumberXOR([1, 2, 4, 5, 6], 6)); // 3
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Integer Overflow:** In languages with fixed-size 32-bit integers, $N(N+1)/2$ can overflow for large $N$. In JavaScript, `Number.MAX_SAFE_INTEGER` is $2^{53} - 1$, but XOR is the gold standard for zero-overflow safety.


---

### 78. 🟠 P1 [Q] Move all zeros to the end of an array in place while preserving order.

> **TL;DR:** Use a Two-Pointer technique (`writePointer` and `readPointer`). Iterate through the array; whenever a non-zero element is found, swap it to `writePointer` and increment `writePointer`. Runs in $O(N)$ time and $O(1)$ auxiliary space.

**💡 Core Concept & Explanation**
- **Two-Pointer Swap:**
  - `writePointer`: Tracks the target index for the next non-zero element.
  - `readPointer`: Scans the array sequentially.
  - Swapping elements preserves relative order of non-zero elements while pushing zeros rightward.

**🛠️ Code / Visual Diagram / Table**

```javascript
function moveZeroes(nums) {
  let writePointer = 0;

  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      // Swap non-zero element to writePointer position
      const temp = nums[writePointer];
      nums[writePointer] = nums[readPointer];
      nums[readPointer] = temp;

      writePointer++;
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **In-Place Constraint:** Creating a new array `[...nonZeros, ...zeros]` takes $O(N)$ extra space, violating the in-place $O(1)$ space requirement. Always mutate `nums` directly.


---

### 79. 🟠 P1 [Q] Rotate an array by k positions.

> **TL;DR:** Normalize $k = k \% N$. Reverse the entire array, reverse the first $k$ elements, and reverse the remaining $N - k$ elements. Achieves $O(N)$ time complexity and $O(1)$ auxiliary space in-place.

**💡 Core Concept & Explanation**
- **3-Step Reversal Algorithm:**
  1. Normalize $k$: $k = k \% N$ (handles $k > N$).
  2. Reverse entire array: `[1, 2, 3, 4, 5, 6, 7]` $
ightarrow$ `[7, 6, 5, 4, 3, 2, 1]`
  3. Reverse first $k$ elements ($k=3$): `[5, 6, 7, 4, 3, 2, 1]`
  4. Reverse remaining elements: `[5, 6, 7, 1, 2, 3, 4]`

**🛠️ Code / Visual Diagram / Table**

```javascript
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n; // Normalize k

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
  // 3. Reverse remaining elements
  reverse(nums, k, n - 1);

  return nums;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`splice` / `unshift` Trap:** `nums.unshift(...nums.splice(-k))` looks short, but `unshift` re-indexes the array in $O(N 	imes k)$ time, making it far slower than the $O(N)$ 3-step reversal algorithm.


---

### 9.5 Array Transformations & Recursion

### 80. 🟠 P1 [Q] Merge two sorted arrays into one sorted array.

> **TL;DR:** Compare elements using two pointers starting at index 0 of both arrays. Append the smaller element to the merged output array until one array is exhausted, then append all remaining items in $O(N + M)$ time.

**💡 Core Concept & Explanation**
- **Two-Pointer Merge:**
  - Pointer `i` for `arr1`, Pointer `j` for `arr2`.
  - Compare `arr1[i]` vs `arr2[j]`. Push smaller item and increment pointer.
  - Flush remaining items once one pointer reaches array bounds.

**🛠️ Code / Visual Diagram / Table**

```javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // Flush remaining elements
  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

console.log(mergeSortedArrays([1, 3, 5, 7], [2, 4, 6, 8])); // [1, 2, 3, 4, 5, 6, 7, 8]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Naive Concatenation & Sort:** `[...arr1, ...arr2].sort((a,b) => a-b)` takes $O((N+M) \log(N+M))$ time, completely discarding the pre-sorted property of the input arrays!


---

### 81. 🟠 P1 [Q] Find the intersection of two arrays.

> **TL;DR:** Convert the first array into a `Set` for $O(1)$ lookups. Filter the second array for elements present in the `Set`, returning distinct common elements in $O(N + M)$ time.

**💡 Core Concept & Explanation**
- **Set Lookup:** `set.has(item)` is an $O(1)$ amortized hash table lookup.
- **Duplicates Handling:** To ensure unique intersection values, wrap the final filtered array in `Array.from(new Set(...))`.

**🛠️ Code / Visual Diagram / Table**

```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const resultSet = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      resultSet.add(num);
    }
  }

  return Array.from(resultSet);
}

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Intersection with Multiplicity:** If duplicate frequencies matter (e.g. `[2, 2]` intersecting `[2, 2]` should return `[2, 2]`), use a frequency map counter instead of a `Set`.


---

### 82. 🟠 P1 [Q] Split an array into chunks of size n.

> **TL;DR:** Iterate through an array using a `for` loop with step size `n`, slicing sub-arrays `arr.slice(i, i + n)` and appending them into a master chunk array in $O(N)$ time.

**💡 Core Concept & Explanation**
- `Array.prototype.slice(start, end)` extracts a portion of an array into a new array object without mutating the original array. If `end > arr.length`, `slice` safely stops at the array end.

**🛠️ Code / Visual Diagram / Table**

```javascript
function chunkArray(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];

  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7]]
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`splice` Mutative Bug:** Using `arr.splice(0, size)` mutates and destroys the original input array! Always use non-mutative `slice()`.


---

### 83. 🟠 P1 [Q] Flatten a deeply nested array or object into dot-notation keys (e.g. { a: { b: 1 } } → { "a.b": 1 }).

> **TL;DR:** Recursively traverse nested object/array properties, accumulating hierarchical key paths joined with dot notation (`${prefix}.${key}`). Base cases return primitive values or empty objects, producing a single-level key-value object in $O(N)$ time (where $N$ is total leaf nodes).

**💡 Core Concept & Explanation**
- **Recursive Depth Traversal:** Check each value with `typeof value === 'object' && value !== null`. If object or array, recurse with an updated prefix.
- **Arrays vs Plain Objects:** Arrays can be flattened with numeric indices (e.g. `users.0.name`) or handled as leaves depending on requirements.
- **Empty Object/Array Edge Case:** `{ a: {} }` should serialize to `{ "a": {} }` rather than being discarded or throwing a recursion error.

**🛠️ Code / Visual Diagram / Table**

```javascript
function flattenObject(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    // Check if value is a non-null, non-empty object or array
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// Test cases:
const nested = {
  user: {
    name: "Alex",
    address: {
      city: "San Francisco",
      geo: { lat: 37.77, lng: -122.41 }
    }
  },
  active: true
};

console.log(flattenObject(nested));
/* Output:
{
  "user.name": "Alex",
  "user.address.city": "San Francisco",
  "user.address.geo.lat": 37.77,
  "user.address.geo.lng": -122.41,
  "active": true
}
*/
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Circular References:** Deeply nested structures with circular references (`obj.self = obj`) cause `RangeError: Maximum call stack size exceeded`. Guard against circular references in production with a `WeakSet` visited tracker.

---

### 84. 🟠 P1 [Q] Compute Fibonacci recursively, iteratively, and with memoization, and compare their time complexities.

> **TL;DR:** Naive recursion takes exponential $O(2^N)$ time due to overlapping subproblem recalculations. Memoization reduces time to $O(N)$ with $O(N)$ call stack space. Iterative DP computes in $O(N)$ time and $O(1)$ space.

**💡 Core Concept & Explanation**
- **Formula:** $F(n) = F(n-1) + F(n-2)$, with $F(0)=0, F(1)=1$.

**🛠️ Code / Visual Diagram / Table**

```javascript
// 1. Naive Recursion -> O(2^N) Time, O(N) Call Stack
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 2. Memoized (Top-Down DP) -> O(N) Time, O(N) Space
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 3. Iterative (Bottom-Up DP) -> O(N) Time, O(1) Space
function fibIterative(n) {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;
  let current = 0;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}
```

| Approach | Time Complexity | Auxiliary Space | Call Stack Risk |
| :--- | :--- | :--- | :--- |
| **Naive Recursion** | $O(2^N)$ | $O(N)$ | High (`RangeError: Maximum call stack size exceeded`) |
| **Memoized DP** | $O(N)$ | $O(N)$ | Moderate for large $N$ |
| **Iterative DP** | **$O(N)$** | **$O(1)$** | **None (Optimal)** |

**⚠️ Interview Pitfall / Pro-Tip**
- Calling `fibRecursive(50)` will freeze the JS execution thread for minutes due to $2^{50} pprox 1.12 	imes 10^{15}$ function calls!


> **Next Step:** For comprehensive TypeScript interview preparation, continue to the dedicated [TypeScript Master Answer Key](../../typescript/typescript-interview-answers.md).

---

[⬅️ Previous: 08 · Polyfills & Utilities](08-coding-challenges-and-polyfills.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️
