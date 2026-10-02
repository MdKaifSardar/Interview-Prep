[⬅️ Previous: 24 · Knapsack / 2D Dynamic Programming](24-knapsack-2d-dynamic-programming.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; (end) ➡️

---

## 25. BIT MANIPULATION & BITMASKING

### 131. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [LC 136: Single Number](https://leetcode.com/problems/single-number/)
- **Category / Sub-Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one in $O(N)$ time and $O(1)$ space.

**Example 1:**
- **Input:** `nums = [2,2,1]` 
- **Output:** `1`

**Constraints:**
- `1 <= nums.length <= 3 * 10^4` 
- Every element appears twice except one.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"XOR invariant: a ^ a = 0, a ^ 0 = a."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Frequency counting using `unordered_map<int, int>`.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        for (auto& p : counts) if (p.second == 1) return p.first;
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Bitwise XOR Property:
`xr = 0`. Iterate `x` in `nums`: `xr ^= x`.
Identical pairs cancel out ($x \oplus x = 0$). Resulting XOR sum equals the unique single number ($0 \oplus single = single$).

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int xr = 0;
        for (int x : nums) xr ^= x;
        return xr;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array `[1]`.
- Negative integers.

---

### 132. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [LC 191: Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as Hamming weight).

**Example 1:**
- **Input:** `n = 11` (1011 in binary)
- **Output:** `3`

**Constraints:**
- `1 <= n <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"Brian Kernighan's n &= (n - 1) clears lowest set bit."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(32) | **Space:** O(1)
- **Explanation:** Loop 32 times testing each bit position with right shifts `(n >> i) & 1`.

```cpp
class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        for (int i = 0; i < 32; i++) {
            if ((n >> i) & 1) count++;
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(set bits) | **Space:** O(1) auxiliary
- **Explanation:** Brian Kernighan's Bit Manipulation Algorithm:
While `n != 0`: `n &= (n - 1)` (which clears the lowest set bit), increment `count++`. Runs in operations proportional to the actual number of set bits!

```cpp
class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 1` (1 bit).
- `n = 2^31 - 1` (31 bits).

---

### 133. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [LC 338: Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the binary representation of `i`.

**Example 1:**
- **Input:** `n = 5` 
- **Output:** `[0,1,1,2,1,2]`

**Constraints:**
- `0 <= n <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"ans[i] = ans[i >> 1] + (i & 1)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1) auxiliary
- **Explanation:** For each integer `i` from 0 to `n`, run Brian Kernighan's algorithm individually.

```cpp
class Solution {
private:
    int count(int num) {
        int c = 0;
        while (num) { num &= (num - 1); c++; }
        return c;
    }
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1);
        for (int i = 0; i <= n; i++) ans[i] = count(i);
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 1D DP Bitwise Transition:
Set `ans[0] = 0`. For `i = 1` to `n`: `ans[i] = ans[i >> 1] + (i & 1)`. Shift `i >> 1` drops lowest bit, so number of 1s equals number of 1s in `i >> 1` plus `1` if `i` is odd.

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 0` (returns `[0]`).

---


### 134. 🟢 P2 [BONUS] LC 260: Single Number III [MEDIUM]
- **LeetCode Link:** [LC 260: Single Number III](https://leetcode.com/problems/single-number-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.
You must write an algorithm that runs in **linear runtime complexity** and uses only **constant extra space**.

**Example 1:**
- **Input:** `nums = [1,2,1,3,2,5]`
- **Output:** `[3,5]`
- **Explanation:** `[5, 3]` is also valid.

**Example 2:**
- **Input:** `nums = [-1,0]`
- **Output:** `[-1,0]`

**Constraints:**
- $2 \le nums.length \le 3 \times 10^4$
- $-2^{31} \le nums[i] \le 2^{31} - 1$
- Each integer in `nums` will appear twice, only two integers will appear once.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 25.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"Total XOR = a ^ b. diff = (unsigned)XOR & (-(unsigned)XOR) isolates differentiating bit. Partition into 2 buckets."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$
- **Explanation:** Use an `unordered_map<int, int>` to count frequencies of all numbers. Return the two numbers with count 1. Violates the $O(1)$ extra space requirement.

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++;
        vector<int> res;
        for (auto& [val, count] : freq) {
            if (count == 1) res.push_back(val);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(1)$ constant auxiliary memory
- **Explanation:**
  1. XOR all numbers together. Duplicate numbers cancel out ($x \oplus x = 0$), leaving `xorSum = a ^ b`.
  2. Since $a \ne b$, `xorSum` must have at least one set bit. Any set bit indicates a position where $a$ and $b$ differ.
  3. Isolate the rightmost set bit: `diff = (unsigned int)xorSum & (-(unsigned int)xorSum)`.
  4. Partition the numbers into two groups based on whether that bit is set:
     - Group 1: `(num & diff) == 0`
     - Group 2: `(num & diff) != 0`
  5. XOR elements within each group independently. The duplicate numbers will cancel within their respective groups, isolating $a$ in one group and $b$ in the other.

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        long long xorSum = 0;
        for (int num : nums) {
            xorSum ^= num;
        }

        // Isolate rightmost set bit
        long long diff = xorSum & (-xorSum);

        int a = 0, b = 0;
        for (int num : nums) {
            if (num & diff) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return {a, b};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- When `xorSum == INT_MIN` ($-2^{31}$), negating it in signed 32-bit integer causes undefined behavior / signed integer overflow. Using `long long` or `unsigned int` prevents this overflow bug.

---

---

[⬅️ Previous: 24 · Knapsack / 2D Dynamic Programming](24-knapsack-2d-dynamic-programming.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; (end) ➡️
