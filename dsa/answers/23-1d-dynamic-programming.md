[⬅️ Previous: 22 · Disjoint Set Union (Dsu / Union-Find)](22-disjoint-set-union-dsu-union-find.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 24 · Knapsack / 2D Dynamic Programming ➡️](24-knapsack-2d-dynamic-programming.md)

---

## 23. 1D DYNAMIC PROGRAMMING

### 121. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [LC 198: House Robber](https://leetcode.com/problems/house-robber/)
- **Category / Sub-Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected. Return the maximum amount of money you can rob tonight without alerting the police.

**Example 1:**
- **Input:** `nums = [1,2,3,1]` 
- **Output:** `4` 
- **Explanation:** Rob house 1 (money = 1) and rob house 3 (money = 3). Total = 4.

**Constraints:**
- `1 <= nums.length <= 100` 
- `0 <= nums[i] <= 400`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"rob(i) = max(rob(i-1), rob(i-2) + nums[i])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N) stack
- **Explanation:** Recursive Backtracking: for each house `i`, explore two choices: rob house `i` and jump to `i + 2`, or skip house `i` and move to `i + 1`.

```cpp
class Solution {
private:
    int robHelper(int i, vector<int>& nums) {
        if (i >= nums.size()) return 0;
        return max(nums[i] + robHelper(i + 2, nums), robHelper(i + 1, nums));
    }
public:
    int rob(vector<int>& nums) {
        return robHelper(0, nums);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 1D DP State Reduction:
At each house `i`, `dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`.
Maintain two state variables `prev1 = 0`, `prev2 = 0`. For each `x` in `nums`: `curr = max(prev1, prev2 + x)`, `prev2 = prev1`, `prev1 = curr`. Return `prev1`.

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev1 = 0, prev2 = 0;
        for (int x : nums) {
            int curr = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single house `nums = [5]` (returns 5).
- Two houses `nums = [2,3]` (returns max(2,3) = 3).

---

### 122. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [LC 70: Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Category / Sub-Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
- **Input:** `n = 2` 
- **Output:** `2` 

**Example 2:**
- **Input:** `n = 3` 
- **Output:** `3`

**Constraints:**
- `1 <= n <= 45`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"climb(n) = climb(n-1) + climb(n-2)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N) stack
- **Explanation:** Naive recursive Fibonacci `climb(n) = climb(n - 1) + climb(n - 2)` without memoization.

```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Fibonacci DP:
`prev2 = 1`, `prev1 = 1`. For `i = 2` to `n`: `curr = prev1 + prev2`, `prev2 = prev1`, `prev1 = curr`. Return `prev1`.

```cpp
class Solution {
public:
    int climbStairs(int n) {
        int prev2 = 1, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 1` (returns 1).
- Maximum boundary `n = 45`.

---

### 123. 🟠 P1 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [LC 139: Word Break](https://leetcode.com/problems/word-break/)
- **Category / Sub-Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Example 1:**
- **Input:** `s = "leetcode", wordDict = ["leet","code"]` 
- **Output:** `true`

**Constraints:**
- `1 <= s.length <= 300` 
- `1 <= wordDict.length <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"dp[i] = true if dp[j] && wordDict.count(s[j..i])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N) stack
- **Explanation:** Recursive backtracking exploring all valid dictionary word prefixes.

```cpp
class Solution {
private:
    bool backtrack(int start, string& s, unordered_set<string>& dict) {
        if (start == s.length()) return true;
        for (int end = start + 1; end <= s.length(); end++) {
            if (dict.count(s.substr(start, end - start)) && backtrack(end, s, dict)) {
                return true;
            }
        }
        return false;
    }
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        return backtrack(0, s, dict);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2 * L) | **Space:** O(N) auxiliary
- **Explanation:** 1D DP Array:
Insert `wordDict` into `unordered_set<string> dict`. `dp[i]` represents whether prefix `s[0...i-1]` can be segmented.
Set `dp[0] = true`. Loop `i` from 1 to `N`, inner loop `j` from 0 to `i - 1`: if `dp[j] && dict.count(s.substr(j, i - j))`, set `dp[i] = true` and break. Return `dp[n]`.

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.length();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Word reusable multiple times.
- Single character string.

---

### 124. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [LC 300: Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

**Example 1:**
- **Input:** `nums = [10,9,2,5,3,7,101,18]` 
- **Output:** `4` 
- **Explanation:** Longest increasing subsequence is `[2,3,7,101]`.

**Constraints:**
- `1 <= nums.length <= 2500` 
- `-10^4 <= nums[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"Patience Sorting binary search (std::lower_bound) in O(N log N)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N) stack
- **Explanation:** Generate all $2^N$ subsequences, check if strictly increasing, and track maximum length.

```cpp
class Solution {
private:
    int solve(int i, int prevIdx, vector<int>& nums) {
        if (i == nums.size()) return 0;
        int take = 0;
        if (prevIdx == -1 || nums[i] > nums[prevIdx]) {
            take = 1 + solve(i + 1, i, nums);
        }
        int skip = solve(i + 1, prevIdx, nums);
        return max(take, skip);
    }
public:
    int lengthOfLIS(vector<int>& nums) {
        return solve(0, -1, nums);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Patience Sorting with Binary Search (`std::lower_bound`):
Maintain dynamic array `tails`. For each `x` in `nums`:
- If `x` is larger than all elements in `tails`, append `x` to `tails`.
- Else find the first element in `tails` $\ge x$ using binary search (`lower_bound`) and replace it with `x`.
The size of `tails` at the end equals the length of the LIS!

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All identical elements `[7,7,7,7]` (returns 1).
- Strictly decreasing array.

---


### 125. 🟢 P2 [BONUS] LC 152: Maximum Product Subarray [MEDIUM]
- **LeetCode Link:** [LC 152: Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- **Category / Sub-Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, find a subarray that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.

**Example 1:**
- **Input:** `nums = [2,3,-2,4]`
- **Output:** `6`
- **Explanation:** `[2,3]` has the largest product 6.

**Example 2:**
- **Input:** `nums = [-2,0,-1]`
- **Output:** `0`

**Constraints:**
- $1 \le nums.length \le 2 \times 10^4$
- $-10 \le nums[i] \le 10$
- The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 23.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"Track currMax AND currMin. If nums[i] < 0, swap(currMax, currMin). Kadane with multiplication."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^2)$ | **Space:** $O(1)$
- **Explanation:** Iterate over all pairs $(i, j)$, calculate the product of subarray `nums[i..j]`, and update `maxProduct`.

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), maxProd = INT_MIN;
        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = i; j < n; j++) {
                prod *= nums[j];
                maxProd = max(maxProd, prod);
            }
        }
        return maxProd;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(1)$
- **Explanation:** Because multiplying two negative numbers yields a positive number, a minimum negative product can suddenly become the maximum positive product when multiplied by a negative number.
  1. Maintain `currMax`, `currMin`, and `res`, all initialized to `nums[0]`.
  2. For each element $x$ from `1` to `n-1`:
     - If $x < 0$, `swap(currMax, currMin)`.
     - `currMax = max(x, currMax * x)`.
     - `currMin = min(x, currMin * x)`.
     - `res = max(res, currMax)`.

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int currMax = nums[0];
        int currMin = nums[0];
        int res = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            int x = nums[i];
            if (x < 0) {
                swap(currMax, currMin);
            }
            currMax = max(x, currMax * x);
            currMin = min(x, currMin * x);
            res = max(res, currMax);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Arrays containing zeros: `max(x, currMax * x)` automatically resets the running subarray when encountering 0.
- Single element array with negative value e.g. `[-2]`.

---

---

[⬅️ Previous: 22 · Disjoint Set Union (Dsu / Union-Find)](22-disjoint-set-union-dsu-union-find.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 24 · Knapsack / 2D Dynamic Programming ➡️](24-knapsack-2d-dynamic-programming.md)
