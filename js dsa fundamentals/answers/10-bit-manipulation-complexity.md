[⬅️ Previous: 09 · Trees, Graphs & Recursion](09-trees-graphs-recursion.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md)

---

## 10. Bit Manipulation & Built-In Complexity

### 46. 🔴 P0 [Q] How do bitwise operators in JavaScript coerce numbers to 32-bit signed integers, why does `1 << 31` result in a negative number, and what is the unsigned right shift (`>>>`)?

> **TL;DR:** All bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) first convert 64-bit float operands into 32-bit two's-complement signed integers $[-2^{31}, 2^{31}-1]$. `1 << 31` sets the 32nd sign bit, yielding $-2,147,483,648$. The unsigned right shift `>>>` zero-fills the sign bit and treats the result as an unsigned 32-bit integer $[0, 2^{32}-1]$.

**💡 Core Concept & Explanation**
- Although numbers are 64-bit floats, the ECMAScript specification mandates that bitwise operations operate on 32-bit integers:
  $$\text{Float64} \xrightarrow{\text{ToInt32}} \text{32-bit Integer} \xrightarrow{\text{Bitwise Op}} \text{Float64}$$
- `>>` (Signed Right Shift): Preserves the sign bit (arithmetic shift). Negative numbers remain negative.
- `>>>` (Unsigned Right Shift): Shifts in zeros from the left (logical shift). Always produces a non-negative number.

**🛠️ Syntax / Code Template**
```javascript
// 32-Bit Truncation Demonstration:
console.log((1 << 30));      // 1073741824 (Positive)
console.log((1 << 31));      // -2147483648 (Sign bit set!)

// Signed vs Unsigned Right Shift:
const neg = -8;
console.log(neg >> 1);       // -4 (Sign preserved)
console.log(neg >>> 1);      // 2147483644 (Zero-filled, positive!)

// Truncating float to unsigned 32-bit int:
const u32 = (-1 >>> 0);      // 4294967295 (All 32 bits set to 1)
```

**⚠️ LeetCode / Interview Pitfall**
- In LeetCode 190 (Reverse Bits), reversing 32 bits of a number will set the 31st bit if the original had a 1 in its lowest bit. If you return the result using standard operations, JavaScript returns a negative number. Always append `>>> 0` to your final return statement to force an unsigned 32-bit result: `return (result >>> 0);`.

---

### 47. 🔴 P0 [Q] What are the essential bit manipulation recipes in JavaScript: check $k$-th bit, set $k$-th bit, clear $k$-th bit, and toggle $k$-th bit?

> **TL;DR:** Use bitwise masks with `1 << k`:
> - Check $k$-th bit: `(n & (1 << k)) !== 0`
> - Set $k$-th bit: `n | (1 << k)`
> - Clear $k$-th bit: `n & ~(1 << k)`
> - Toggle $k$-th bit: `n ^ (1 << k)`

**💡 Core Concept & Explanation**
A bitmask creates an integer with only the $k$-th bit turned on (`1 << k`, where $0 \le k < 31$):
- `&` extracts common 1s.
- `|` enforces a 1 at the target position.
- `~` inverts all bits, so `~(1 << k)` has 1s everywhere except at position $k$.
- `^` inverts the target bit ($1 \oplus 1 = 0$, $0 \oplus 1 = 1$).

**🛠️ Syntax / Code Template**
```javascript
let n = 5; // Binary: 0101 (Bits 0 and 2 are set)

// 1. Check if bit k is set (0-indexed from right):
const isBit2Set = (n & (1 << 2)) !== 0; // true
const isBit1Set = (n & (1 << 1)) !== 0; // false

// 2. Set bit k:
n = n | (1 << 1); // 0101 | 0010 = 0111 (7)

// 3. Clear bit k:
n = n & ~(1 << 0); // 0111 & ~0001 = 0110 (6)

// 4. Toggle bit k:
n = n ^ (1 << 1); // 0110 ^ 0010 = 0100 (4)

// 5. In-Place XOR Swap:
let a = 10, b = 25;
a ^= b;
b ^= a;
a ^= b;
console.log(a, b); // 25, 10
```

**⚠️ LeetCode / Interview Pitfall**
- Operator Precedence Gotcha: The equality operator `!==` has higher precedence than bitwise AND `&`!
  `if (n & 1 << k !== 0)` evaluates as `if (n & (1 << (k !== 0)))`. Always wrap bitwise checks in parentheses: `if ((n & (1 << k)) !== 0)`.

---

### 48. 🔴 P0 [Q] How does Brian Kernighan’s algorithm (`n & (n - 1)`) work to count set bits in $O(\text{set bits})$, and how do you test if a number is a power of 2?

> **TL;DR:** Subtracting 1 flips the lowest set bit and all trailing zeros (`10100 - 1 = 10011`). ANDing $n$ with $n-1$ strips that lowest set bit (`10100 & 10011 = 10000`). Repeating this counts set bits in $O(\text{set bits})$ rather than 32 iterations. A number $n > 0$ is a power of 2 if `(n & (n - 1)) === 0`.

**💡 Core Concept & Explanation**
- In binary, $n-1$ inverts every bit after the rightmost 1-bit, including that 1-bit itself.
- Computing `n & (n - 1)` clears the rightmost set bit while leaving all higher bits untouched.
- If $n$ is a power of 2, it has exactly one set bit (e.g. $16 = 10000_2$). Clearing its single set bit produces `0`.

**🛠️ Syntax / Code Template**
```javascript
// 1. Number of 1 Bits / Hamming Weight (LeetCode 191):
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Clears the lowest set bit!
    count++;
  }
  return count;
}

// 2. Power of Two Check (LeetCode 231):
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// 3. Extract the Lowest Set Bit:
function lowestSetBit(n) {
  return n & -n; // Two's complement trick
}
```

**⚠️ LeetCode / Interview Pitfall**
- Forgetting the `n > 0` guard in power of 2 checks: `0 & (0 - 1) === 0` evaluates to `true`, but $0$ is NOT a power of 2! Always verify `n > 0`.

---

### 49. 🟠 P1 [P] What are the exact time and space complexities of JavaScript array built-ins (`push`, `pop`, `shift`, `unshift`, `slice`, `splice`, `concat`, `indexOf`, `sort`)?

> **TL;DR:** `push`/`pop` are amortized $O(1)$. `shift`/`unshift` and `splice` are $O(n)$ because elements must be re-indexed in memory. `slice` is $O(k)$ where $k$ is slice length. `sort` is $O(n \log n)$ via Timsort with $O(n)$ space.

**💡 Core Concept & Explanation**

| Built-in Method | Time Complexity | Auxiliary Space | Engine Behavior / Interview Trap |
| :--- | :--- | :--- | :--- |
| `push(...items)` | Amortized $O(1)$ | $O(1)$ | Appends to buffer tail. Capacity doubles when full. |
| `pop()` | $O(1)$ | $O(1)$ | Truncates buffer length without reallocation. |
| `shift()` | **$O(n)$** ⚠️ | $O(1)$ | Copies all remaining elements left by 1 index. |
| `unshift(...items)` | **$O(n)$** ⚠️ | $O(1)$ | Shifts all elements right to make room at index 0. |
| `slice(start, end)` | $O(k)$ ($k = end - start$) | $O(k)$ | Allocates new contiguous array buffer. |
| `splice(start, count)` | **$O(n)$** | $O(count)$ | Re-indexes elements after `start`. |
| `concat(...arrays)` | $O(n + m)$ | $O(n + m)$ | Deeply copies all array elements into new buffer. |
| `indexOf(val)` / `includes` | $O(n)$ | $O(1)$ | Linear scan from index 0. |
| `sort(compareFn)` | $O(n \log n)$ | **$O(n)$** | V8 Timsort; allocates merge run buffers. |
| `reverse()` | $O(n)$ | $O(1)$ | In-place two-pointer swap. |

**🛠️ Syntax / Code Template**
```javascript
// Demonstrating the Shift Trap:
const arr = new Array(100000).fill(1);

// O(N^2) Anti-Pattern:
// while (arr.length > 0) arr.shift(); // ~3-5 seconds in V8!

// O(N) Optimal Pattern:
let head = 0;
while (head < arr.length) {
  const item = arr[head++]; // Instant O(1)!
}
```

**⚠️ LeetCode / Interview Pitfall**
- Calling `arr.splice(i, 1)` inside a loop to remove elements takes $O(n^2)$ time! In problems like Remove Element or Move Zeroes, use a **two-pointer in-place overwrite** (`arr[writeIndex++] = arr[readIndex]`) to achieve $O(n)$ time and $O(1)$ space.

---

### 50. 🟠 P1 [Q] What are the performance and Garbage Collection (GC) implications of excessive object and array allocations inside tight loops during algorithmic execution?

> **TL;DR:** Allocating objects, arrays, or closures inside inner loops triggers frequent V8 Young Generation Garbage Collection (Scavenger) pauses, turning an $O(n)$ algorithm into an unresponsive, memory-churning execution that fails platform time limits. Reuse pre-allocated flat arrays and primitive scalars.

**💡 Core Concept & Explanation**
- V8 divides memory into Young (Nursery) and Old Generation.
- New objects (`{}`, `[]`, strings) are allocated in the Nursery. When the Nursery fills, V8 halts execution (Stop-the-World pause) to run a Scavenge GC cycle.
- In competitive programming with $N = 10^5$ to $10^6$:
  - Creating `{ r, c }` objects in every BFS step allocates millions of objects, causing dozens of GC pauses $\rightarrow$ **TLE**.
  - Flat integer encoding (`r * cols + c`) or pre-allocated reusable arrays keep memory inside CPU registers and L1 cache with zero GC pauses.

**🛠️ Syntax / Code Template**
```javascript
// ❌ SLOW: Allocating objects in tight BFS queue
for (const [dr, dc] of DIRS) {
  queue.push({ r: r + dr, c: c + dc, dist: d + 1 }); // Thousands of allocations!
}

// ✅ FAST: Pre-allocated Typed Arrays or Flat Integer Encoding
// Pack (r, c) into single 32-bit integer: (r << 16) | c
const encodedCoord = (nr << 16) | nc;
queue.push(encodedCoord);

// Unpack:
const decodedR = encodedCoord >> 16;
const decodedC = encodedCoord & 0xFFFF;
```

**⚠️ LeetCode / Interview Pitfall**
- When coding dynamic programming, never use a `Map` with string keys `memo.set('${i},${j}', val)` if $N, M \le 1000$. String concatenation allocations inside $10^6$ calls will cause TLE or Memory Limit Exceeded (MLE). Always use a flat 1D `Int32Array` or pre-allocated 2D array.

---

[⬅️ Previous: 09 · Trees, Graphs & Recursion](09-trees-graphs-recursion.md) &nbsp;|&nbsp; [📋 Index](../js-dsa-interview-answers.md)
