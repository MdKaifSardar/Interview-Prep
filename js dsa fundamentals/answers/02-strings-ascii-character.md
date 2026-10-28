[⬅️ Previous: 01 · Numbers, Math & Precision](01-numbers-math-precision.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Arrays, Matrices & Grids ➡️](03-arrays-matrices-grids.md)

---

## 2. Strings, ASCII & Character Manipulation

### 6. 🔴 P0 [Q] How do you convert characters to ASCII codes and vice versa in JavaScript (`charCodeAt`, `codePointAt`, `String.fromCharCode`), and how do they handle surrogate pairs?

> **TL;DR:** Use `str.charCodeAt(i)` to obtain the 16-bit UTF-16 code unit (0–65535, sufficient for standard ASCII 0–127). Use `String.fromCharCode(code)` to convert back. For full Unicode (characters outside BMP like emojis), use `codePointAt(i)` and `String.fromCodePoint(code)`.

**💡 Core Concept & Explanation**
JavaScript represents strings as sequences of 16-bit code units (UTF-16).
- Standard ASCII characters (`'a'` to `'z'`, `'A'` to `'Z'`, `'0'` to `'9'`) reside within $[0, 127]$, so `charCodeAt(i)` gives the exact ASCII value in $O(1)$ time.
- **Surrogate pairs:** Characters with code points $> 65535$ require two 16-bit code units. `charCodeAt(i)` returns only the high or low surrogate. `codePointAt(i)` correctly returns the full 32-bit Unicode code point.

**🛠️ Syntax / Code Template**
```javascript
// Char to Code:
const codeA = 'A'.charCodeAt(0); // 65
const codea = 'a'.charCodeAt(0); // 97
const code0 = '0'.charCodeAt(0); // 48

// Code to Char:
const charA = String.fromCharCode(65); // 'A'
const chara = String.fromCharCode(97); // 'a'

// Unicode beyond BMP:
const emoji = '😀';
console.log(emoji.charCodeAt(0));     // 55357 (surrogate unit)
console.log(emoji.codePointAt(0));    // 128512 (true code point)
console.log(String.fromCodePoint(128512)); // '😀'
```

**⚠️ LeetCode / Interview Pitfall**
- Never assume `'a' + 1` produces `'b'` in JavaScript. In C++, `'a' + 1` evaluates to `'b'`. In JavaScript, `'a' + 1` evaluates to the string `"a1"`. To advance a character in JavaScript, you must explicitly decode and encode: `String.fromCharCode(char.charCodeAt(0) + 1)`.

---

### 7. 🔴 P0 [Q] How do you implement a fixed 26-element frequency array for lowercase English letters `'a'`–`'z'` using character math (`charCodeAt(0) - 97`), and why is it faster than a hash map?

> **TL;DR:** Map characters `'a'`–`'z'` directly to indices $0$–$25$ using `str.charCodeAt(i) - 97`. A flat typed array (`new Int32Array(26)` or `new Array(26).fill(0)`) delivers $O(1)$ cache-coherent operations with zero hash-collision overhead and zero garbage collection pressure.

**💡 Core Concept & Explanation**
Hash maps (`Map` or `{}`) introduce:
1. Dynamic memory allocation on the heap.
2. String hashing and hash table bucket lookups.
3. Garbage collector overhead when allocated repeatedly inside loops.

A contiguous 26-element array operates directly in contiguous memory (L1/L2 CPU cache friendly). Since lowercase English letters have contiguous ASCII values ($97$ to $122$):
$$\text{Index} = \text{ASCII}(\text{char}) - 97$$

**🛠️ Syntax / Code Template**
```javascript
function isAnagram(s, t) {
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
}
```

**⚠️ LeetCode / Interview Pitfall**
- Forgetting to subtract $97$ (or `'a'.charCodeAt(0)`): writing `count[s.charCodeAt(i)]++` allocates an array of length 123 with 97 unused empty slots. Always normalize to a zero-based offset $[0, 25]$.
- Case sensitivity: If the problem contains both upper and lowercase letters, either lowercase the string first (`s.toLowerCase()`) or use a 52/128-element array.

---

### 8. 🔴 P0 [Q] Why are strings immutable in JavaScript, what happens when you attempt `str[i] = 'x'`, and what are the most memory-efficient ways to build or mutate strings?

> **TL;DR:** Strings in JavaScript are primitive and strictly immutable. Writing `str[0] = 'X'` fails silently in non-strict mode (or throws `TypeError` in strict mode). To mutate, convert to a character array (`str.split('')`), modify in-place, and join back (`arr.join('')`).

**💡 Core Concept & Explanation**
- When a string is created, its memory block is frozen by the V8 engine to allow string interning and safe sharing across threads.
- Bracket property assignment `str[i] = 'c'` attempts to set a property on a temporary primitive wrapper object that is immediately discarded.
- Repeated concatenation in a loop (`s += char`) in older engines allocated a new string copy on every step ($O(n^2)$ total work). While modern V8 optimizes ropes/flattening, pushing to an array and calling `.join('')` guarantees linear $O(n)$ time and predictable memory.

**🛠️ Syntax / Code Template**
```javascript
const str = "hello";

// ❌ SILENT FAILURE:
str[0] = 'H';
console.log(str); // "hello" (Unchanged!)

// ✅ CORRECT: Convert to array, mutate, join
const chars = str.split('');
chars[0] = 'H';
const updated = chars.join(''); // "Hello"

// ✅ In-Place String Reversal:
function reverseString(s) {
  const arr = s.split('');
  let l = 0, r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++;
    r--;
  }
  return arr.join('');
}
```

**⚠️ LeetCode / Interview Pitfall**
- In LeetCode problems like **Reverse String (LeetCode 344)**, the input is explicitly given as `char[]` (`s = ["h","e","l","l","o"]`) specifically because JavaScript strings cannot be reversed in-place. If the input is an array of characters, mutate `s[l]` and `s[r]` directly without creating a new array.

---

### 9. 🟠 P1 [Q] What is the difference between `String.prototype.slice()` and `String.prototype.substring()`, and how does negative index handling differ between them?

> **TL;DR:** Always prefer `slice()`. `slice(start, end)` supports negative indices (counting backwards from the end). `substring(start, end)` treats negative values as `0` and silently swaps arguments if `start > end`.

**💡 Core Concept & Explanation**
- `str.slice(start, end)`:
  - Extracts characters from `start` up to (but not including) `end`.
  - Negative values wrap from string end: `str.slice(-3)` extracts the last 3 characters.
- `str.substring(start, end)`:
  - If `start > end`, it swaps the two arguments (`str.substring(4, 1)` becomes `str.substring(1, 4)`).
  - Negative arguments are coerced to `0`.
- Deprecated `str.substr(start, length)`: Second argument is *length*, not end index. Avoid using it in modern interviews.

| Method | `str.slice(1, 4)` | Negative indices: `str.slice(-3)` | Swapped indices: `(4, 1)` |
| :--- | :--- | :--- | :--- |
| `slice()` | `"ell"` | Last 3 chars | `""` (Empty string) |
| `substring()` | `"ell"` | Coerced to `(0, 0)` $\rightarrow$ `""` | Swaps to `(1, 4)` $\rightarrow$ `"ell"` |

**🛠️ Syntax / Code Template**
```javascript
const s = "abcdefgh";

console.log(s.slice(2, 5));  // "cde" (indices 2, 3, 4)
console.log(s.slice(-3));    // "fgh" (last 3 chars)
console.log(s.slice(0, -1)); // "abcdefg" (all except last char)
```

**⚠️ LeetCode / Interview Pitfall**
- When extracting a sliding window substring `s.slice(left, right + 1)`, remember that the second argument is **exclusive**. If you write `s.slice(left, right)`, you will miss the character at `right`.

---

### 10. 🟠 P1 [Q] What are the essential regular expressions used in string DSA problems (e.g., stripping non-alphanumerics `/[^a-z0-9]/gi`, trimming, and splitting on multiple whitespace characters `/\s+/`)?

> **TL;DR:** Use `s.replace(/[^a-z0-9]/gi, '')` to strip punctuation and non-alphanumerics in palindrome checks. Use `s.trim().split(/\s+/)` to tokenize words while collapsing multiple arbitrary spaces into single separators.

**💡 Core Concept & Explanation**
Regular expressions simplify complex preprocessing in string manipulation problems:
- `/[^a-z0-9]/gi`:
  - `[^...]`: Inverted character set (matches anything NOT in brackets).
  - `a-z0-9`: Lowercase letters and numbers.
  - `g`: Global (replace all occurrences, not just the first).
  - `i`: Case-insensitive flag.
- `/\s+/`:
  - `\s`: Matches any whitespace character (space, tab, newline).
  - `+`: One or more (collapses consecutive spaces).

**🛠️ Syntax / Code Template**
```javascript
// 1. Valid Palindrome preprocessing:
function isPalindrome(s) {
  const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let l = 0, r = cleaned.length - 1;
  while (l < r) {
    if (cleaned[l++] !== cleaned[r--]) return false;
  }
  return true;
}

// 2. Reverse Words in a String (LeetCode 151):
function reverseWords(s) {
  // trim() removes leading/trailing spaces; split(/\s+/) handles multiple spaces
  return s.trim().split(/\s+/).reverse().join(' ');
}
```

**⚠️ LeetCode / Interview Pitfall**
- Splitting by a single space string `s.split(' ')` on `"hello   world"` returns `["hello", "", "", "world"]`. The empty strings will corrupt your word counts or reversals. Always use regex whitespace `/\s+/` after `.trim()`.

---

[⬅️ Previous: 01 · Numbers, Math & Precision](01-numbers-math-precision.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Arrays, Matrices & Grids ➡️](03-arrays-matrices-grids.md)
