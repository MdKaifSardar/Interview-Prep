[⬅️ Previous: 23 · 1D Dynamic Programming](23-1d-dynamic-programming.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 25 · Bit Manipulation & Bitmasking ➡️](25-bit-manipulation-and-bitmasking.md)

---

## 24. KNAPSACK / 2D DYNAMIC PROGRAMMING

### 126. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [LC 322: Coin Change](https://leetcode.com/problems/coin-change/)
- **Category / Sub-Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)

**📜 Problem Statement & Explanation**
Given an integer array `coins` representing coins of different denominations and an integer `amount`, return the fewest number of coins that you need to make up that amount. If impossible, return `-1`.

**Example 1:**
- **Input:** `coins = [1,2,5], amount = 11` 
- **Output:** `3` 
- **Explanation:** 11 = 5 + 5 + 1.

**Constraints:**
- `1 <= coins.length <= 12` 
- `0 <= amount <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)
- **Memory Mnemonic:** *"dp[i] = min(dp[i], 1 + dp[i - coin])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(amount^coins.length) | **Space:** O(amount)
- **Explanation:** Recursive branch exploration trying all coin combinations until exact amount is formed.

```cpp
class Solution {
private:
    int solve(int remain, vector<int>& coins) {
        if (remain == 0) return 0;
        if (remain < 0) return 1e9;
        int minCoins = 1e9;
        for (int c : coins) {
            minCoins = min(minCoins, 1 + solve(remain - c, coins));
        }
        return minCoins;
    }
public:
    int coinChange(vector<int>& coins, int amount) {
        int ans = solve(amount, coins);
        return ans >= 1e9 ? -1 : ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * amount) | **Space:** O(amount) auxiliary
- **Explanation:** Unbounded Knapsack 1D DP:
`vector<int> dp(amount + 1, amount + 1)`. `dp[0] = 0`.
For `i = 1` to `amount`, for each `c` in `coins`: if `c <= i`, `dp[i] = min(dp[i], 1 + dp[i - c])`.
Return `dp[amount] > amount ? -1 : dp[amount]`.

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (c <= i) {
                    dp[i] = min(dp[i], 1 + dp[i - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `amount = 0` (returns 0).
- Amount cannot be formed with given coins (returns -1).

---

### 127. 🟢 P2 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [LC 416: Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.

**Example 1:**
- **Input:** `nums = [1,5,11,5]` 
- **Output:** `true` 
- **Explanation:** `[1, 5, 5]` and `[11]`.

**Constraints:**
- `1 <= nums.length <= 200` 
- `1 <= nums[i] <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)
- **Memory Mnemonic:** *"0/1 Knapsack subset sum for target = sum / 2."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Recursive 0/1 Knapsack subset sum search.

```cpp
class Solution {
private:
    bool solve(int i, int target, vector<int>& nums) {
        if (target == 0) return true;
        if (i >= nums.size() || target < 0) return false;
        return solve(i + 1, target - nums[i], nums) || solve(i + 1, target, nums);
    }
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        return solve(0, sum / 2, nums);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * target) | **Space:** O(target) auxiliary
- **Explanation:** 0/1 Knapsack 1D DP:
Compute `sum`. If `sum % 2 != 0`, return `false`. Set `target = sum / 2`.
`vector<bool> dp(target + 1, false)`. Set `dp[0] = true`.
For each `x` in `nums`, iterate `j` backwards from `target` down to `x`: `dp[j] = dp[j] || dp[j - x]`. Return `dp[target]`.

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                dp[j] = dp[j] || dp[j - x];
            }
        }
        return dp[target];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Odd sum array (returns false immediately).
- Single element array.

---

### 128. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [LC 1143: Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 24.2 (Two-String Grid DP)

**📜 Problem Statement & Explanation**
Given two strings `text1` and `text2`, return the length of their longest common subsequence.

**Example 1:**
- **Input:** `text1 = "abcde", text2 = "ace"` 
- **Output:** `3` 
- **Explanation:** LCS is `"ace"`.

**Constraints:**
- `1 <= text1.length, text2.length <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 24.2 (Two-String Grid DP)
- **Memory Mnemonic:** *"If match: 1 + dp[i-1][j-1], else: max(dp[i-1][j], dp[i][j-1])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^(M+N)) | **Space:** O(M+N)
- **Explanation:** Recursive character match/skip backtracking.

```cpp
class Solution {
private:
    int lcs(int i, int j, string& s1, string& s2) {
        if (i == s1.length() || j == s2.length()) return 0;
        if (s1[i] == s2[j]) return 1 + lcs(i + 1, j + 1, s1, s2);
        return max(lcs(i + 1, j, s1, s2), lcs(i, j + 1, s1, s2));
    }
public:
    int longestCommonSubsequence(string text1, string text2) {
        return lcs(0, 0, text1, text2);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(N) auxiliary
- **Explanation:** 2D DP Table with 1D Space Optimization:
Maintain `prev` and `curr` rows of size `n + 1`.
Outer loop `i` from 1 to `m`, inner loop `j` from 1 to `n`:
- If `text1[i-1] == text2[j-1]`: `curr[j] = 1 + prev[j - 1]`.
- Else: `curr[j] = max(prev[j], curr[j - 1])`.
Update `prev = curr`.

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<int> prev(n + 1, 0), curr(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        return prev[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- No common characters (returns 0).
- Identical strings.

---

### 129. 🟢 P2 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [LC 72: Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Category / Sub-Pattern:** Sub-Pattern 24.2 (Two-String Grid DP)

**📜 Problem Statement & Explanation**
Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (insert, delete, or replace a character).

**Example 1:**
- **Input:** `word1 = "horse", word2 = "ros"` 
- **Output:** `3` 
- **Explanation:** horse -> rorse -> rose -> ros.

**Constraints:**
- `0 <= word1.length, word2.length <= 500`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 24.2 (Two-String Grid DP)
- **Memory Mnemonic:** *"Min operations: 1 + min(insert, delete, replace)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(3^(M+N)) | **Space:** O(M+N)
- **Explanation:** Recursive backtracking exploring insert, delete, replace operations.

```cpp
class Solution {
private:
    int minDist(int i, int j, string& w1, string& w2) {
        if (i == 0) return j;
        if (j == 0) return i;
        if (w1[i - 1] == w2[j - 1]) return minDist(i - 1, j - 1, w1, w2);
        int insertOp = minDist(i, j - 1, w1, w2);
        int deleteOp = minDist(i - 1, j, w1, w2);
        int replaceOp = minDist(i - 1, j - 1, w1, w2);
        return 1 + min({insertOp, deleteOp, replaceOp});
    }
public:
    int minDistance(string word1, string word2) {
        return minDist(word1.length(), word2.length(), word1, word2);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(N) auxiliary
- **Explanation:** 2D DP Table:
`dp[i][j]` represents min operations to convert `word1[0...i-1]` to `word2[0...j-1]`.
- Base cases: `dp[i][0] = i`, `dp[0][j] = j`.
- If `word1[i-1] == word2[j-1]`: `dp[i][j] = dp[i-1][j-1]`.
- Else: `dp[i][j] = 1 + min({dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace)})`.

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
                }
            }
        }
        return dp[m][n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty `word1` or `word2`.
- Identical strings.

---


### 130. 🟢 P2 [BONUS] LC 518: Coin Change II [MEDIUM]
- **LeetCode Link:** [LC 518: Coin Change II](https://leetcode.com/problems/coin-change-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)

**📜 Problem Statement & Explanation**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.
You may assume that you have an infinite number of each kind of coin. The answer is guaranteed to fit into a signed 32-bit integer.

**Example 1:**
- **Input:** `amount = 5, coins = [1,2,5]`
- **Output:** `4`
- **Explanation:** There are four ways to make up the amount:
  $5=5$
  $5=2+2+1$
  $5=2+1+1+1$
  $5=1+1+1+1+1$

**Example 2:**
- **Input:** `amount = 3, coins = [2]`
- **Output:** `0`

**Constraints:**
- $1 \le coins.length \le 300$
- $1 \le coins[i] \le 5000$
- All the values of `coins` are unique.
- $0 \le amount \le 5000$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 24.1 (Unbounded & 0/1 Knapsack)
- **Memory Mnemonic:** *"Combinations vs Permutations: Coins in OUTER loop, amount in INNER loop. dp[a] += dp[a - coin]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(2^{\text{amount}})$ | **Space:** $O(\text{amount})$ recursion stack
- **Explanation:** Naive recursive backtracking trying each coin from index `idx` to avoid duplicate permutations.

```cpp
class Solution {
    int backtrack(int idx, int remaining, vector<int>& coins) {
        if (remaining == 0) return 1;
        if (idx == coins.size() || remaining < 0) return 0;
        int take = backtrack(idx, remaining - coins[idx], coins);
        int skip = backtrack(idx + 1, remaining, coins);
        return take + skip;
    }
public:
    int change(int amount, vector<int>& coins) {
        return backtrack(0, amount, coins);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N \times \text{amount})$ | **Space:** $O(\text{amount})$ 1D DP array
- **Explanation:**
  - Let `dp[a]` be the number of combinations to make sum `a`.
  - Initialize `dp[0] = 1`.
  - **Crucial order of loops:** Put `coins` in the **outer** loop and `amount` in the **inner** loop. This guarantees that coins are considered in a fixed order, ensuring combinations are counted rather than permutations (e.g., `[1, 2]` is counted once, not as both `[1, 2]` and `[2, 1]`).
  - Transition: `dp[a] += dp[a - coin]`.

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<unsigned int> dp(amount + 1, 0);
        dp[0] = 1;

        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }
        return dp[amount];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- If the outer loop is `amount` and inner is `coins`, you compute **permutations** (LC 377 Combination Sum IV) instead of **combinations**.
- Use `unsigned int` to prevent intermediate 32-bit signed overflow before final reduction.

---

---

[⬅️ Previous: 23 · 1D Dynamic Programming](23-1d-dynamic-programming.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 25 · Bit Manipulation & Bitmasking ➡️](25-bit-manipulation-and-bitmasking.md)
