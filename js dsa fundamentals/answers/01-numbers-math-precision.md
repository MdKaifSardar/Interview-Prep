[📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Strings, ASCII & Character ➡️](02-strings-ascii-character.md)

---

## 1. Numbers, Math & Floating-Point Precision

### 1. 🔴 P0 [C] How are numbers represented internally in JavaScript (IEEE 754 float64), what are `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER`, and when does precision breakdown occur?

> **TL;DR:** All numbers in JavaScript are double-precision 64-bit binary floating-point numbers (IEEE 754). Integers can only be represented accurately without rounding up to $\pm(2^{53} - 1)$ (`Number.MAX_SAFE_INTEGER` = $9,007,199,254,740,991$). Beyond this, adjacent integers collapse to the same float representation.

**💡 Core Concept & Explanation**
JavaScript allocates 64 bits for every `Number`:
- 1 sign bit
- 11 exponent bits
- 52 fraction (significand/mantissa) bits (with 1 implicit leading bit = 53 bits of precision).

Because 53 bits are available for the significand:
- Any integer in the range $[-(2^{53} - 1), 2^{53} - 1]$ has a distinct, exact binary representation.
- Beyond $2^{53}$, integers must be rounded to the nearest representable floating-point number. As a result:
  `9007199254740992 + 1 === 9007199254740992` evaluates to `true`!

**🛠️ Syntax / Code Template**
```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Precision breakdown demonstration:
const max = Number.MAX_SAFE_INTEGER;
console.log(max + 1 === max + 2); // true! (Both evaluate to 9007199254740992)

// Testing safety:
Number.isSafeInteger(max);     // true
Number.isSafeInteger(max + 1); // false
```

**⚠️ LeetCode / Interview Pitfall**
- In problems involving large products, factorials, or 64-bit integer calculations (common in math/combinatorics problems like Subarray Product or Pascal's Triangle row calculations), regular JavaScript `Number` silently corrupts results. Use `BigInt` or apply modulo arithmetic ($10^9 + 7$) at every intermediate step.

---

### 2. 🔴 P0 [Q] What is the difference between `Math.floor()`, `Math.trunc()`, and bitwise truncation (`x | 0`, `~~x`) for positive and negative numbers in integer division?

> **TL;DR:** `Math.floor()` rounds down towards $-\infty$. `Math.trunc()` and bitwise truncation (`| 0`, `~~`) truncate towards zero (matching C++ integer division `int / int`). For negative results, `Math.floor(-1.5)` gives `-2`, while `Math.trunc(-1.5)` gives `-1`.

**💡 Core Concept & Explanation**
In C++, `7 / 2 = 3` and `-7 / 2 = -3` because integer division truncates the fractional portion towards zero.
In JavaScript, all divisions return floats: `7 / 2 === 3.5` and `-7 / 2 === -3.5`.
- `Math.floor(x)`: Greatest integer $\le x$. For negative numbers, it rounds *away from zero*.
- `Math.trunc(x)`: Removes fractional digits directly towards zero.
- `x | 0` or `~~x`: Converts float to a 32-bit signed integer, truncating towards zero.

| Expression | `Math.floor()` | `Math.trunc()` | `(x) \| 0` / `~~(x)` | C++ equivalent `a / b` |
| :--- | :--- | :--- | :--- | :--- |
| `7 / 2` (3.5) | `3` | `3` | `3` | `3` |
| `-7 / 2` (-3.5) | `-4` ⚠️ | `-3` | `-3` | `-3` |

**🛠️ Syntax / Code Template**
```javascript
// Safe integer division matching C++ behavior:
function intDiv(a, b) {
  return Math.trunc(a / b);
}

// Bitwise shortcut (only safe for values between -2^31 and 2^31 - 1):
const div = (a / b) | 0;

console.log(intDiv(7, 2));   // 3
console.log(intDiv(-7, 2));  // -3
console.log(Math.floor(-7 / 2)); // -4 (BEWARE!)
```

**⚠️ LeetCode / Interview Pitfall**
- When implementing problems like **Evaluate Reverse Polish Notation (LeetCode 150)** where the problem specifies: *"the division between two integers always truncates toward zero"*, using `Math.floor(a / b)` fails all test cases with negative divisions. Always use `Math.trunc(a / b)`.

---

### 3. 🟠 P1 [Q] How do `Infinity` and `-Infinity` behave in initialization, and why does `Math.max(...arr)` fail or throw a `RangeError` on large arrays?

> **TL;DR:** `Infinity` and `-Infinity` are safe initializers for finding minimums and maximums. However, spreading a large array into `Math.max(...arr)` unpacks elements as function arguments onto the call stack, throwing `RangeError: Maximum call stack size exceeded` when array length exceeds ~65,536.

**💡 Core Concept & Explanation**
- `Infinity > x` is true for any finite number $x$. `-Infinity < x` is true for any finite number $x$.
- When invoking `Math.max(...arr)`, the JavaScript engine pushes every array element as an argument onto the execution stack. JavaScript engines cap the maximum number of arguments in a function call (typically $65,536$ in V8).
- For large arrays ($N \ge 10^5$, standard on LeetCode), spreading throws a fatal stack overflow runtime error.

**🛠️ Syntax / Code Template**
```javascript
// Safe scalar initialization
let minVal = Infinity;
let maxVal = -Infinity;

for (const x of nums) {
  if (x < minVal) minVal = x;
  if (x > maxVal) maxVal = x;
}

// ❌ DANGEROUS on large inputs (N > 65,536):
// const max = Math.max(...nums); // RangeError!

// ✅ SAFE for arbitrary array sizes:
const max = nums.reduce((acc, x) => Math.max(acc, x), -Infinity);
const min = nums.reduce((acc, x) => Math.min(acc, x), Infinity);
```

**⚠️ LeetCode / Interview Pitfall**
- Calling `Math.max()` with no arguments returns `-Infinity`, and `Math.min()` returns `Infinity`. If `nums` is empty, `Math.max(...[])` evaluates to `-Infinity`. Always initialize with an explicit boundary or check array length before reducing.

---

### 4. 🟠 P1 [C] Why does `0.1 + 0.2 !== 0.3` in JavaScript, what is `Number.EPSILON`, and how do you safely compare floating-point numbers in algorithmic calculations?

> **TL;DR:** Binary floating-point cannot represent base-10 fractions like $0.1$ or $0.2$ exactly (they produce repeating binary fractions). Their sum has a tiny rounding artifact ($0.30000000000000004$). Use `Math.abs(a - b) < Number.EPSILON` to compare floating-point values for equality.

**💡 Core Concept & Explanation**
In binary, $1/10$ is an infinite repeating fraction: `0.0001100110011..._2`. Since IEEE 754 allocates only 53 bits of precision, the number is truncated.
When adding `0.1 + 0.2`, the truncated bits produce:
`0.30000000000000004440892098500626...`
`Number.EPSILON` ($2^{-52} \approx 2.22 \times 10^{-16}$) represents the difference between 1 and the smallest floating point number greater than 1. If the absolute difference between two floats is smaller than `Number.EPSILON` (or an application-specific tolerance $\epsilon = 10^{-6}$), they are mathematically equal.

**🛠️ Syntax / Code Template**
```javascript
function areFloatsEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}

console.log(0.1 + 0.2 === 0.3); // false
console.log(areFloatsEqual(0.1 + 0.2, 0.3)); // true

// In geometry / distance calculations with larger acceptable error:
function areClose(a, b, tolerance = 1e-6) {
  return Math.abs(a - b) <= tolerance;
}
```

**⚠️ LeetCode / Interview Pitfall**
- In computational geometry (e.g. slope calculations for line intersection, Euclidean distance), never compare slopes with `===` (`(y2 - y1) / (x2 - x1) === (y3 - y2) / (x3 - x2)`). Convert to cross-multiplication integer arithmetic: `(y2 - y1) * (x3 - x2) === (y3 - y2) * (x2 - x1)` to prevent float error entirely!

---

### 5. 🟠 P1 [Q] What is `BigInt`, how do you declare and operate with it, why can't it be mixed with regular numbers, and when is it necessary in competitive programming?

> **TL;DR:** `BigInt` represents arbitrarily large integers beyond $2^{53} - 1$. Create it with the `n` suffix (`100n`) or `BigInt(val)`. You cannot mix `BigInt` and `Number` in math operations without explicit conversion, and `BigInt` division always truncates fractions.

**💡 Core Concept & Explanation**
- `BigInt` is a primitive numeric type introduced in ES2020.
- It operates with standard arithmetic: `+`, `-`, `*`, `/`, `**`, `%`, and bitwise operators.
- JavaScript strictly prohibits implicit coercion between `Number` and `BigInt` (`10n + 5` throws `TypeError: Cannot mix BigInt and other types`) to avoid silent precision loss.
- `BigInt` division truncates towards zero: `5n / 2n === 2n` (no floating point component exists for BigInt).

**🛠️ Syntax / Code Template**
```javascript
// Creation:
const a = 9007199254740995n;
const b = BigInt("9007199254740995");
const c = BigInt(42);

// Operations:
const sum = a + b;
const div = 7n / 2n; // 3n (truncates automatically!)

// ❌ Mixing types throws:
// const bad = a + 10; // TypeError!

// ✅ Explicit conversion:
const safe = a + BigInt(10);
const num = Number(safe); // Warning: only safe if within MAX_SAFE_INTEGER
```

**⚠️ LeetCode / Interview Pitfall**
- `Math` methods (like `Math.max`, `Math.sqrt`, `Math.abs`) do NOT work on `BigInt`! Calling `Math.max(10n, 20n)` throws a `TypeError`.
- Write your own BigInt helpers:
  `const bigMax = (a, b) => (a > b ? a : b);`
  `const bigAbs = (a) => (a < 0n ? -a : a);`

---

[📋 Index](../js-dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Strings, ASCII & Character ➡️](02-strings-ascii-character.md)
