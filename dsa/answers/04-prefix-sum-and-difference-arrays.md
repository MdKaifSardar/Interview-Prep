[⬅️ Previous: 03 · Hashing / Frequency Counting](03-hashing-frequency-counting.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Array Greedy & Kadane'S Algorithm ➡️](05-array-greedy-and-kadane-s-algorithm.md)

---

## 4. PREFIX SUM & DIFFERENCE ARRAYS

### 20. 🔴 P0 [Q] LC 560: Subarray Sum Equals K [MEDIUM]
- **LeetCode Link:** [LC 560: Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.

**Example 1:**
- **Input:** `nums = [1,1,1], k = 2` 
- **Output:** `2` 

**Example 2:**
- **Input:** `nums = [1,2,3], k = 3` 
- **Output:** `2`

**Constraints:**
- `1 <= nums.length <= 2 * 10^4` 
- `-1000 <= nums[i] <= 1000` 
- `-10^7 <= k <= 10^7`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Running sum - K hash map lookup."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops computing running sum for every subarray starting at index i and ending at index j. Increment counter whenever running sum equals k.

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size(), count = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum == k) count++;
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Maintain running prefix sum `sum` and hash map `unordered_map<int, int> prefixCounts` storing frequencies of prefix sums. Initialize `prefixCounts[0] = 1`. For each element, update `sum += x`. If `prefixCounts.count(sum - k)` exists, add its count to answer. Then increment `prefixCounts[sum]++`.

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;
        int sum = 0, count = 0;
        for (int x : nums) {
            sum += x;
            if (prefixCounts.count(sum - k)) {
                count += prefixCounts[sum - k];
            }
            prefixCounts[sum]++;
        }
        return count;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative numbers in array (two distinct prefix sums can have same value).
- `k = 0`.

---

#### 20a. 🔁 Follow-up Variant: IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [IB 1: Subarray with Given XOR](https://www.interviewbit.com/problems/subarray-with-given-xor/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given an array of integers `A` and an integer `B`, find the total number of subarrays having bitwise XOR equal to `B`.

**Example 1:**
- **Input:** `A = [4, 2, 2, 6, 4], B = 6` 
- **Output:** `4` 
- **Explanation:** Subarrays: `[4, 2]`, `[4, 2, 2, 6, 4]`, `[2, 2, 6]`, `[6]`.

**Constraints:**
- `1 <= A.length <= 10^5` 
- `1 <= A[i] <= 10^9` 
- `1 <= B <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Maintain running XOR sum (xr). Lookup (xr ^ target) in map."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every subarray `A[i...j]` by computing XOR sum and incrementing count when XOR equals `B`.

```cpp
class Solution {
public:
    int solve(vector<int>& A, int B) {
        int n = A.size(), count = 0;
        for (int i = 0; i < n; i++) {
            int xr = 0;
            for (int j = i; j < n; j++) {
                xr ^= A[j];
                if (xr == B) count++;
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Maintain running XOR `xr` and frequency hash map `unordered_map<int, int> freq`. At index `i`, update `xr ^= A[i]`. If `xr == B`, increment `count++`. Look up `target = xr ^ B` in `freq` map and add `freq[target]` to `count`. Insert `freq[xr]++`.

```cpp
class Solution {
public:
    int solve(vector<int>& A, int B) {
        unordered_map<int, int> freq;
        int xr = 0, count = 0;
        
        for (int x : A) {
            xr ^= x;
            if (xr == B) count++;
            int target = xr ^ B;
            if (freq.count(target)) {
                count += freq[target];
            }
            freq[xr]++;
        }
        return count;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `B = 0` (subarrays with XOR sum 0).
- Single element array.

---

### 21. 🔴 P0 [Q] LC 525: Contiguous Array [MEDIUM]
- **LeetCode Link:** [LC 525: Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of `0` and `1`.

**Example 1:**
- **Input:** `nums = [0,1]` 
- **Output:** `2` 

**Example 2:**
- **Input:** `nums = [0,1,0]` 
- **Output:** `2`

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `nums[i]` is either `0` or `1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Convert 0 to -1, track earliest index of prefix sum."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Check all subarrays using nested loops. Count zeros and ones. If zero count equals one count, update max length.

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        int n = nums.size(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            int zeros = 0, ones = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) zeros++;
                else ones++;
                if (zeros == ones) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Treat 0 as -1 and 1 as +1. Finding equal zeros and ones reduces to finding the longest subarray with sum = 0! Maintain running prefix sum `sum` and hash map `unordered_map<int, int> firstSeen` storing the EARLIEST index where `sum` occurred. Initialize `firstSeen[0] = -1`. If `sum` seen before at index `j`, subarray length is `i - j`. Maximize `maxLen`.

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> firstSeen;
        firstSeen[0] = -1;
        int sum = 0, maxLen = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += (nums[i] == 1 ? 1 : -1);
            if (firstSeen.count(sum)) {
                maxLen = max(maxLen, i - firstSeen[sum]);
            } else {
                firstSeen[sum] = i;
            }
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Entire array has equal zeros and ones.
- Array with all zeros or all ones.

---

### 22. 🟢 P2 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
- **LeetCode Link:** [LC 1109: Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)
- **Category / Sub-Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)

**📜 Problem Statement & Explanation**
There are `n` flights numbered `1` to `n`. You are given bookings `bookings[i] = [first, last, seats]`. Return an array of length `n` where `ans[i]` is total seats booked for flight `i`.

**Example 1:**
- **Input:** `bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5` 
- **Output:** `[10,55,45,25,25]`

**Constraints:**
- `1 <= n <= 2 * 10^4` 
- `1 <= bookings.length <= 2 * 10^4` 
- `1 <= first <= last <= n`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)
- **Memory Mnemonic:** *"Difference array +val at L, -val at R+1; compute prefix sum at end."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(B * N) | **Space:** O(1) auxiliary
- **Explanation:** Iterate over every booking `[first, last, seats]`, then run an inner loop from `first - 1` to `last - 1` adding `seats` directly into result array.

```cpp
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> res(n, 0);
        for (auto& b : bookings) {
            int first = b[0] - 1, last = b[1] - 1, seats = b[2];
            for (int i = first; i <= last; i++) {
                res[i] += seats;
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N + B) | **Space:** O(1) auxiliary
- **Explanation:** Difference Array Range Update:
1. Initialize array `diff` of size `n + 1` with 0s.
2. For each booking `[first, last, seats]`: add `+seats` at `diff[first - 1]` and subtract `-seats` at `diff[last]`.
3. Compute prefix sums over `diff` to accumulate flight seats in single pass $O(N)$.

```cpp
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> diff(n + 1, 0);
        for (const auto& b : bookings) {
            int first = b[0] - 1;
            int last = b[1];
            int seats = b[2];
            diff[first] += seats;
            diff[last] -= seats;
        }
        vector<int> res(n);
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            res[i] = running;
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `last = n` (subtraction at index `n` stays within boundary `n + 1`).
- Bookings covering entire range `[1, n]`.

---

### 23. 🔴 P0 [Q] LC 238: Product of Array Except Self [MEDIUM]
- **LeetCode Link:** [LC 238: Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Category / Sub-Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in $O(N)$ time without using division.

**Example 1:**
- **Input:** `nums = [1,2,3,4]` 
- **Output:** `[24,12,8,6]` 

**Example 2:**
- **Input:** `nums = [-1,1,0,-3,3]` 
- **Output:** `[0,0,9,0,0]`

**Constraints:**
- `2 <= nums.length <= 10^5` 
- `-30 <= nums[i] <= 30`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)
- **Memory Mnemonic:** *"Prefix products from left x running suffix product from right without division."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Nested loops computing product of all elements except index i for every position.

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) prod *= nums[j];
            }
            res[i] = prod;
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 2-pass Prefix and Suffix Product algorithm:
1. Pass 1 (Left-to-Right): Store product of all elements to the left of index `i` into `res[i]`. `res[0] = 1`, `res[i] = res[i - 1] * nums[i - 1]`.
2. Pass 2 (Right-to-Left): Maintain running suffix product `rightProd = 1`. Multiply `res[i] *= rightProd`, then update `rightProd *= nums[i]`.

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        int rightProd = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= rightProd;
            rightProd *= nums[i];
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single zero in array (all positions except zero position become 0).
- Multiple zeros in array (all positions become 0).

---

### 24. 🔴 P0 [Q] LC 523: Continuous Subarray Sum [MEDIUM]
- **LeetCode Link:** [LC 523: Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)

**📜 Problem Statement & Explanation**
Given an integer array `nums` and an integer `k`, return `true` if `nums` has a good subarray of size at least 2 whose sum is a multiple of `k`.

**Example 1:**
- **Input:** `nums = [23,2,4,6,7], k = 6` 
- **Output:** `true` 
- **Explanation:** `[2, 4]` is a continuous subarray of size 2 whose sum is 6.

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `0 <= nums[i] <= 10^9` 
- `1 <= k <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)
- **Memory Mnemonic:** *"Store earliest index of (running_sum % k) in map (len >= 2)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Check all subarrays of length >= 2 using nested loops. Compute sum and check if `sum % k == 0`.

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < n; j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Modulo Arithmetic Property: If $(S_j - S_i) \pmod k == 0 \implies S_j \pmod k == S_i \pmod k$.
Maintain running remainder `rem = (rem + nums[i]) % k` and map `unordered_map<int, int> earliestIndex` storing earliest index of remainder `rem`. Initialize `earliestIndex[0] = -1`. If `rem` was seen before at index `j` and `i - j >= 2`, return `true`. Else store `earliestIndex[rem] = i` (only on first occurrence to maximize length).

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> earliestIndex;
        earliestIndex[0] = -1;
        int rem = 0;
        
        for (int i = 0; i < nums.size(); i++) {
            rem = (rem + nums[i]) % k;
            if (earliestIndex.count(rem)) {
                if (i - earliestIndex[rem] >= 2) return true;
            } else {
                earliestIndex[rem] = i;
            }
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Subarray starting from index 0 (`earliestIndex[0] = -1` handles this).
- Subarrays of length 1 (must enforce `i - earliestIndex[rem] >= 2`).

---


### 25. 🟢 P2 [BONUS] LC 304: Range Sum Query 2D - Immutable [MEDIUM]
- **LeetCode Link:** [LC 304: Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given a 2D matrix `matrix`, handle multiple queries of the following type:
- Calculate the sum of the elements of `matrix` inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

Implement the `NumMatrix` class:
- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the sum of the elements inside the rectangle in $O(1)$ time.

**Example 1:**
- **Input:**
  `["NumMatrix","sumRegion","sumRegion","sumRegion"]`
  `[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]`
- **Output:** `[null, 8, 11, 12]`

**Constraints:**
- `m == matrix.length`, `n == matrix[i].length`
- `1 <= m, n <= 200`
- $-10^4 \le matrix[i][j] \le 10^4$
- `0 <= row1 <= row2 < m`, `0 <= col1 <= col2 < n`
- At most $10^4$ calls will be made to `sumRegion`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Inclusion-Exclusion Principle: Precompute sum from (0,0) to (r,c). Query = BottomRight - Top - Left + TopLeft."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Precomputation:** $O(1)$ | **Query:** $O(M \times N)$ | **Space:** $O(1)$
- **Explanation:** Store the matrix directly. For each query, iterate through rows `row1` to `row2` and columns `col1` to `col2`, accumulating the sum.

```cpp
class NumMatrixBrute {
    vector<vector<int>> mat;
public:
    NumMatrixBrute(vector<vector<int>>& matrix) : mat(matrix) {}
    int sumRegion(int r1, int c1, int r2, int c2) {
        int total = 0;
        for (int r = r1; r <= r2; r++) {
            for (int c = c1; c <= c2; c++) {
                total += mat[r][c];
            }
        }
        return total;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Precomputation:** $O(M \times N)$ | **Query:** $O(1)$ | **Space:** $O(M \times N)$
- **Explanation:** Build a 2D prefix sum array of dimensions `(m + 1) x (n + 1)` with 1-based indexing:
  `P[r][c] = matrix[r-1][c-1] + P[r-1][c] + P[r][c-1] - P[r-1][c-1]`.
  To compute `sumRegion(r1, c1, r2, c2)`:
  `sum = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]`.

```cpp
class NumMatrix {
private:
    vector<vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        prefix.assign(m + 1, vector<int>(n + 1, 0));
        for (int r = 1; r <= m; r++) {
            for (int c = 1; c <= n; c++) {
                prefix[r][c] = matrix[r - 1][c - 1] 
                             + prefix[r - 1][c] 
                             + prefix[r][c - 1] 
                             - prefix[r - 1][c - 1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2 + 1][col2 + 1] 
             - prefix[row1][col2 + 1] 
             - prefix[row2 + 1][col1] 
             + prefix[row1][col1];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Using 1-based indexing with size `(m+1) x (n+1)` prevents out-of-bound edge checks when `row1 == 0` or `col1 == 0`.

---

---

[⬅️ Previous: 03 · Hashing / Frequency Counting](03-hashing-frequency-counting.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Array Greedy & Kadane'S Algorithm ➡️](05-array-greedy-and-kadane-s-algorithm.md)
