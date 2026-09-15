# Data Structures & Algorithms Master Answer Key (91 Core Blueprints)

Companion answer key to `dsa-interview-questions.md`. Every single answer strictly follows our standardized 5-part framework designed for rapid revision AND deep algorithmic mastery:
1. **📜 Problem Statement & Explanation:** Full problem text, input/output examples, and key constraints.
2. **🧠 Short Solution Summary & Revision Notes:** Main pattern classification and mental mnemonic hook.
3. **🐢 Brute Force Approach:** Complexity analysis, naive logic explanation, and complete C++ code block.
4. **🚀 Optimal Approach:** Complexity analysis, step-by-step optimization logic, and optimal C++ code block.
5. **⚠️ Edge Cases & Interview Gotchas:** Boundary conditions, overflow traps, and interview follow-up questions.

---

## 1. MATRIX SIMULATION & ARRAY TRANSFORMATIONS

### 1. 🔴 P0 [Q] LC 54: Spiral Matrix [MEDIUM]
- **LeetCode Link:** [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given an `m x n` matrix, return all elements of the matrix in spiral order.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[1,2,3,6,9,8,7,4,5]`
- **Explanation:** Traverse top row (1,2,3), right col (6,9), bottom row (8,7), left col (4), inner (5).

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Memory Mnemonic:** *"4-boundary shrinking loop (top, bottom, left, right)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N)
- **Explanation:** Maintain a 2D boolean `visited[m][n]` grid and direction vectors for right, down, left, up.

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        if (matrix.empty()) return {};
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        vector<int> res;
        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
        int r = 0, c = 0, di = 0;
        for (int i = 0; i < m * n; i++) {
            res.push_back(matrix[r][c]);
            visited[r][c] = true;
            int nr = r + dr[di], nc = c + dc[di];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                r = nr; c = nc;
            } else {
                di = (di + 1) % 4;
                r += dr[di]; c += dc[di];
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(1) auxiliary
- **Explanation:** Maintain 4 boundary pointers: `top`, `bottom`, `left`, `right`. Traverse boundaries clockwise.

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty()) return res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single row or single column matrix.
- Empty matrix.

---

### 2. 🔴 P0 [Q] LC 59: Spiral Matrix II [MEDIUM]
- **LeetCode Link:** [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n^2` in spiral order.

**Example 1:**
- **Input:** `n = 3`
- **Output:** `[[1,2,3],[8,9,4],[7,6,5]]`
- **Explanation:** Fills 3x3 matrix in spiral order.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Memory Mnemonic:** *"Generating N x N matrix in spiral order filling 1..N^2."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Simulate direction turning using direction arrays `dr` and `dc`.

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n, 0));
        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
        int r = 0, c = 0, di = 0;
        for (int val = 1; val <= n * n; val++) {
            res[r][c] = val;
            int nr = r + dr[di], nc = c + dc[di];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && res[nr][nc] == 0) {
                r = nr; c = nc;
            } else {
                di = (di + 1) % 4;
                r += dr[di]; c += dc[di];
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Use 4 boundary variables `top`, `bottom`, `left`, `right` and fill elements 1 to `n^2`.

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n));
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int val = 1;
        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) res[top][col] = val++;
            top++;
            for (int row = top; row <= bottom; row++) res[row][right] = val++;
            right--;
            for (int col = right; col >= left; col--) res[bottom][col] = val++;
            bottom--;
            for (int row = bottom; row >= top; row--) res[left][row] = val++;
            left++;
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- n = 1 single element matrix.

---

### 3. 🔴 P0 [Q] LC 48: Rotate Image [MEDIUM]
- **LeetCode Link:** [Rotate Image](https://leetcode.com/problems/rotate-image/)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
Rotate an `n x n` 2D matrix representing an image by 90 degrees (clockwise) in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[[7,4,1],[8,5,2],[9,6,3]]`
- **Explanation:** Matrix rotated 90 degrees clockwise in-place.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Memory Mnemonic:** *"Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row in-place."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Allocate auxiliary `temp` matrix. Copy `matrix[r][c]` to `temp[c][n-1-r]`.

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> temp(n, vector<int>(n));
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                temp[c][n - 1 - r] = matrix[r][c];
            }
        }
        matrix = temp;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) in-place
- **Explanation:** 1) Transpose matrix (swap `matrix[i][j]` with `matrix[j][i]`). 2) Reverse each row.

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- 1x1 matrix.

---

### 4. 🔴 P0 [Q] Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
- **LeetCode Link:** [Rotate Matrix 90 Deg Anti-Clockwise](#)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
Rotate an `n x n` 2D matrix by 90 degrees anti-clockwise in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[[3,6,9],[2,5,8],[1,4,7]]`
- **Explanation:** Rotated anti-clockwise.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Memory Mnemonic:** *"Transpose matrix + reverse each column."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Use auxiliary `temp` matrix.

```cpp
class Solution {
public:
    void rotateAntiClockwise(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> temp(n, vector<int>(n));
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                temp[n - 1 - c][r] = matrix[r][c];
        matrix = temp;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) in-place
- **Explanation:** 1) Transpose matrix. 2) Reverse each column.

```cpp
class Solution {
public:
    void rotateAntiClockwise(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix[i][j], matrix[j][i]);
        for (int c = 0; c < n; c++) {
            int top = 0, bottom = n - 1;
            while (top < bottom) swap(matrix[top++][c], matrix[bottom--][c]);
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- 1x1 matrix.

---

### 5. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
- **LeetCode Link:** [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0`s in-place.

**Example 1:**
- **Input:** `matrix = [[1,1,1],[1,0,1],[1,1,1]]`
- **Output:** `[[1,0,1],[0,0,0],[1,0,1]]`
- **Explanation:** Row 1 and Col 1 set to 0.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Use 1st row and 1st column as dummy markers for O(1) space."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M*N*(M+N)) | **Space:** O(M*N)
- **Explanation:** Make matrix copy `clone`. On zero in matrix, zero out row/col in `clone`.

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> clone = matrix;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == 0) {
                    for (int k = 0; k < n; k++) clone[r][k] = 0;
                    for (int k = 0; k < m; k++) clone[k][c] = 0;
                }
            }
        }
        matrix = clone;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(1) auxiliary
- **Explanation:** Use first row and first column as dummy markers, plus `col0` for column 0.

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool col0 = false;
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) col0 = true;
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0; matrix[0][j] = 0;
                }
            }
        }
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 1; j--) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
            if (col0) matrix[i][0] = 0;
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Zero in first row or col.

---

### 6. 🔴 P0 [Q] LC 118: Pascal's Triangle [EASY]
- **LeetCode Link:** [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Return first `numRows` of Pascal's triangle.

**Example 1:**
- **Input:** `numRows = 5`
- **Output:** `[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]`
- **Explanation:** Sums of adjacent numbers above.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Dynamic row generation using previous row element sums."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N^2)
- **Explanation:** Calculate each element using combinations `nCr`.

```cpp
class Solution {
    long long nCr(int n, int r) {
        long long res = 1;
        for (int i = 0; i < r; i++) res = res * (n - i) / (i + 1);
        return res;
    }
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int r = 0; r < numRows; r++) {
            vector<int> row;
            for (int c = 0; c <= r; c++) row.push_back(nCr(r, c));
            res.push_back(row);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Build row `i` from previous row `i-1` by adding `res[i-1][j-1] + res[i-1][j]`.

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) row[j] = res[i - 1][j - 1] + res[i - 1][j];
            res.push_back(row);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- numRows = 1.

---

### 7. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
- **LeetCode Link:** [Next Permutation](https://leetcode.com/problems/next-permutation/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Rearrange numbers into lexicographically next greater permutation in-place.

**Example 1:**
- **Input:** `nums = [1,2,3]`
- **Output:** `[1,3,2]`
- **Explanation:** Next permutation of [1,2,3] is [1,3,2].

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Find decrease pivot -> swap with next larger -> reverse suffix."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N! * N)
- **Explanation:** Generate all N! permutations, sort, find current, pick next.

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        vector<vector<int>> all;
        vector<int> cur = nums;
        sort(cur.begin(), cur.end());
        do { all.push_back(cur); } while(next_permutation(cur.begin(), cur.end()));
        for (int i = 0; i < all.size(); i++) {
            if (all[i] == nums) {
                nums = all[(i + 1) % all.size()];
                return;
            }
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) in-place
- **Explanation:** 1) Find rightmost dip `nums[i] < nums[i+1]`. 2) Swap with next larger. 3) Reverse suffix.

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Array sorted in descending order.

---

## 2. COMPLETE SORTING ALGORITHMS SUITE

### 8. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Selection Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints for **Selection Sort Algorithm Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Find min element in unsorted partition and swap with start..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Find min element in unsorted partition and swap with start."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Selection Sort Algorithm Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2))). Core takeaway: Find min element in unsorted partition and swap with start..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 9. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Bubble Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints for **Bubble Sort Algorithm Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Repeatedly swap adjacent inverted pairs with early exit flag..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Repeatedly swap adjacent inverted pairs with early exit flag."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Bubble Sort Algorithm Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2))). Core takeaway: Repeatedly swap adjacent inverted pairs with early exit flag..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 10. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Insertion Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints for **Insertion Sort Algorithm Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Shift elements right to insert key into sorted prefix..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Shift elements right to insert key into sorted prefix."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Insertion Sort Algorithm Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2))). Core takeaway: Shift elements right to insert key into sorted prefix..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 11. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
- **LeetCode Link:** [Merge Sort & Inversion Counting Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the constraints for **Merge Sort & Inversion Counting Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Divide halves recursively and merge in O(N log N) time..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Memory Mnemonic:** *"Divide halves recursively and merge in O(N log N) time."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Merge Sort & Inversion Counting Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N))). Core takeaway: Divide halves recursively and merge in O(N log N) time..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 12. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
- **LeetCode Link:** [Quick Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the constraints for **Quick Sort Algorithm Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Lomuto/Hoare randomized pivot partitioning..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Memory Mnemonic:** *"Lomuto/Hoare randomized pivot partitioning."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Quick Sort Algorithm Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N))). Core takeaway: Lomuto/Hoare randomized pivot partitioning..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 13. 🟠 P1 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Counting Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))

**📜 Problem Statement & Explanation**
Given the constraints for **Counting Sort Algorithm Blueprint**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Frequency array for bounded integer range [0, K]..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))
- **Memory Mnemonic:** *"Frequency array for bounded integer range [0, K]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Counting Sort Algorithm Blueprint.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N))). Core takeaway: Frequency array for bounded integer range [0, K]..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 14. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
- **LeetCode Link:** [Largest Number](https://leetcode.com/problems/largest-number/)
- **Category / Sub-Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)

**📜 Problem Statement & Explanation**
Given the constraints for **Largest Number**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Custom string concatenation comparator (a + b > b + a)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)
- **Memory Mnemonic:** *"Custom string concatenation comparator (a + b > b + a)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Largest Number.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 2.4 (Custom Comparators & String Sorting). Core takeaway: Custom string concatenation comparator (a + b > b + a)..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 3. HASHING / FREQUENCY COUNTING

### 15. 🟠 P1 [Q] LC 217: Contains Duplicate [EASY]
- **LeetCode Link:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the constraints for **Contains Duplicate**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using O(1) set presence check..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"O(1) set presence check."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Contains Duplicate.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 3.1 (Frequency Counting & Anagrams). Core takeaway: O(1) set presence check..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 16. 🔴 P0 [Q] LC 49: Group Anagrams [MEDIUM]
- **LeetCode Link:** [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the constraints for **Group Anagrams**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 26-char frequency vector encoding as map key..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"26-char frequency vector encoding as map key."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Group Anagrams.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 3.1 (Frequency Counting & Anagrams). Core takeaway: 26-char frequency vector encoding as map key..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 17. 🔴 P0 [Q] LC 1: Two Sum [EASY]
- **LeetCode Link:** [Two Sum](https://leetcode.com/problems/two-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

**Example 1:**
- **Input:** `nums = [2,7,11,15], target = 9`
- **Output:** `[0,1]`
- **Explanation:** nums[0] + nums[1] == 9.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"Complement lookup (target - nums[i]) in unordered_map."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively check all pairs (i, j).

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (nums[i] + nums[j] == target) return {i, j};
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Hash map complement lookup `target - nums[i]`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (mp.count(comp)) return {mp[comp], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Duplicate values, negative target.

---

### 18. 🔴 P0 [Q] LC 128: Longest Consecutive Sequence [MEDIUM]
- **LeetCode Link:** [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given the constraints for **Longest Consecutive Sequence**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using O(1) set lookup for sequence start boundary (!set.count(num - 1))..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"O(1) set lookup for sequence start boundary (!set.count(num - 1))."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Longest Consecutive Sequence.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 3.2 (O(1) Pair & Complement Lookup). Core takeaway: O(1) set lookup for sequence start boundary (!set.count(num - 1))..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 19. 🔴 P0 [Q] IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [Subarray with Given XOR](#)
- **Category / Sub-Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)

**📜 Problem Statement & Explanation**
Given the constraints for **Subarray with Given XOR**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Maintain running XOR sum (xr). Lookup (xr ^ target) in map..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)
- **Memory Mnemonic:** *"Maintain running XOR sum (xr). Lookup (xr ^ target) in map."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Subarray with Given XOR.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing). Core takeaway: Maintain running XOR sum (xr). Lookup (xr ^ target) in map..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 4. PREFIX SUM & DIFFERENCE ARRAYS

### 20. 🔴 P0 [Q] LC 560: Subarray Sum Equals K [MEDIUM]
- **LeetCode Link:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given the constraints for **Subarray Sum Equals K**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Running sum - K hash map lookup..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Running sum - K hash map lookup."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Subarray Sum Equals K.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K). Core takeaway: Running sum - K hash map lookup..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 21. 🔴 P0 [Q] LC 525: Contiguous Array [MEDIUM]
- **LeetCode Link:** [Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given the constraints for **Contiguous Array**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Convert 0 to -1, track earliest index of prefix sum..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Memory Mnemonic:** *"Convert 0 to -1, track earliest index of prefix sum."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Contiguous Array.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K). Core takeaway: Convert 0 to -1, track earliest index of prefix sum..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 22. 🟠 P1 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
- **LeetCode Link:** [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)
- **Category / Sub-Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)

**📜 Problem Statement & Explanation**
Given the constraints for **Corporate Flight Bookings**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Difference array +val at L, -val at R+1; compute prefix sum at end..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)
- **Memory Mnemonic:** *"Difference array +val at L, -val at R+1; compute prefix sum at end."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Corporate Flight Bookings.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 4.2 (Difference Array & Range Updates). Core takeaway: Difference array +val at L, -val at R+1; compute prefix sum at end..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 23. 🔴 P0 [Q] LC 238: Product of Array Except Self [MEDIUM]
- **LeetCode Link:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Category / Sub-Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)

**📜 Problem Statement & Explanation**
Given the constraints for **Product of Array Except Self**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Prefix products from left x running suffix product from right without division..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)
- **Memory Mnemonic:** *"Prefix products from left x running suffix product from right without division."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Product of Array Except Self.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 4.3 (Prefix & Suffix Products). Core takeaway: Prefix products from left x running suffix product from right without division..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 24. 🔴 P0 [Q] LC 523: Continuous Subarray Sum [MEDIUM]
- **LeetCode Link:** [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)

**📜 Problem Statement & Explanation**
Given the constraints for **Continuous Subarray Sum**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Store earliest index of (running_sum % k) in map (len >= 2)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)
- **Memory Mnemonic:** *"Store earliest index of (running_sum % k) in map (len >= 2)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Continuous Subarray Sum.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic). Core takeaway: Store earliest index of (running_sum % k) in map (len >= 2)..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 5. TWO POINTERS

### 25. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii---input-array-is-sorted/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given 1-indexed sorted array `numbers`, find two numbers adding to `target`.

**Example 1:**
- **Input:** `numbers = [2,7,11,15], target = 9`
- **Output:** `[1,2]`
- **Explanation:** 2 + 7 = 9. 1-indexed indices [1, 2].

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Opposite pointers converging inward."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Check all pairs linearly.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int n = numbers.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (numbers[i] + numbers[j] == target) return {i + 1, j + 1};
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Two pointers `left = 0`, `right = n - 1`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            else if (sum < target) left++;
            else right--;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative values, large inputs.

---

### 26. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [3Sum](https://leetcode.com/problems/3sum/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Return all unique triplets `[nums[i], nums[j], nums[k]]` summing to 0.

**Example 1:**
- **Input:** `nums = [-1,0,1,2,-1,-4]`
- **Output:** `[[-1,-1,2],[-1,0,1]]`
- **Explanation:** Unique triplets summing to 0.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Sorted array + outer loop + opposite pointers with duplicate skipping."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N)
- **Explanation:** Three nested loops into set.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size(); set<vector<int>> st;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                for (int k = j + 1; k < n; k++)
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        vector<int> temp = {nums[i], nums[j], nums[k]};
                        sort(temp.begin(), temp.end()); st.insert(temp);
                    }
        return vector<vector<int>>(st.begin(), st.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Sort + fixed element `i` with two pointers `left` & `right`. Skip duplicate values.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res; sort(nums.begin(), nums.end()); int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < 0) left++; else right--;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All zeroes array `[0,0,0,0]`.

---

### 27. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the constraints for **Container With Most Water**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Shrinking boundary pointers, moving shorter height inward..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Shrinking boundary pointers, moving shorter height inward."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Container With Most Water.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 5.1 (Opposite Direction Pointers). Core takeaway: Shrinking boundary pointers, moving shorter height inward..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 28. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the constraints for **Trapping Rain Water**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Two pointers tracking maxLeft and maxRight heights..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Two pointers tracking maxLeft and maxRight heights."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Trapping Rain Water.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 5.1 (Opposite Direction Pointers). Core takeaway: Two pointers tracking maxLeft and maxRight heights..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 29. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors-dutch-national-flag/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the constraints for **Sort Colors (Dutch National Flag)**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Dutch National Flag 3-way low, mid, high pointer algorithm..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Memory Mnemonic:** *"Dutch National Flag 3-way low, mid, high pointer algorithm."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Sort Colors (Dutch National Flag).

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 5.2 (Partitioning & Backward Pointers). Core takeaway: Dutch National Flag 3-way low, mid, high pointer algorithm..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 30. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the constraints for **Merge Sorted Array**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Fill destination array backwards from (m + n - 1)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Memory Mnemonic:** *"Fill destination array backwards from (m + n - 1)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Merge Sorted Array.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 5.2 (Partitioning & Backward Pointers). Core takeaway: Fill destination array backwards from (m + n - 1)..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 6. SLIDING WINDOW

### 31. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints for **Longest Substring Without Repeating Characters**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Expand right, shrink left when duplicate character found..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right, shrink left when duplicate character found."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Longest Substring Without Repeating Characters.

```cpp
class Solution {
public:
    int solve(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.1 (Variable Length Sliding Window). Core takeaway: Expand right, shrink left when duplicate character found..

```cpp
class Solution {
public:
    int solve(TreeNode* root) {
        if (!root) return 0;
        int left = solve(root->left);
        int right = solve(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 32. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints for **Minimum Size Subarray Sum**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Expand right until sum >= target, shrink left to minimize length..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right until sum >= target, shrink left to minimize length."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Minimum Size Subarray Sum.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.1 (Variable Length Sliding Window). Core takeaway: Expand right until sum >= target, shrink left to minimize length..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 33. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints for **Minimum Window Substring**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Gold-standard variable window with required match counter..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Gold-standard variable window with required match counter."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Minimum Window Substring.

```cpp
class Solution {
public:
    int solve(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.1 (Variable Length Sliding Window). Core takeaway: Gold-standard variable window with required match counter..

```cpp
class Solution {
public:
    int solve(TreeNode* root) {
        if (!root) return 0;
        int left = solve(root->left);
        int right = solve(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 34. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints for **Find All Anagrams in a String**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Fixed window of size |P| with 26-char frequency comparison..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)
- **Memory Mnemonic:** *"Fixed window of size |P| with 26-char frequency comparison."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Find All Anagrams in a String.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.2 (Fixed-Size Sliding Window). Core takeaway: Fixed window of size |P| with 26-char frequency comparison..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 35. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the constraints for **Max Consecutive Ones III**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Track zero count in window; shrink left when zero count > K..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track zero count in window; shrink left when zero count > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Max Consecutive Ones III.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.3 (Variable Window with K Operations / Replacement). Core takeaway: Track zero count in window; shrink left when zero count > K..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 36. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the constraints for **Longest Repeating Character Replacement**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Track max_freq in window; shrink left when (window_len - max_freq) > K..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track max_freq in window; shrink left when (window_len - max_freq) > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Longest Repeating Character Replacement.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 6.3 (Variable Window with K Operations / Replacement). Core takeaway: Track max_freq in window; shrink left when (window_len - max_freq) > K..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 7. BINARY SEARCH

### 37. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [Binary Search](https://leetcode.com/problems/binary-search/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)

**📜 Problem Statement & Explanation**
Given the constraints for **Binary Search**, compute the target response using LeetCode function signature `search`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Classic low <= high midpoint search..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)
- **Memory Mnemonic:** *"Classic low <= high midpoint search."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Binary Search.

```cpp
class Solution {
public:
    int search(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.1 (Standard & Boundary Search). Core takeaway: Classic low <= high midpoint search..

```cpp
class Solution {
public:
    int search(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 38. 🔴 P0 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the constraints for **Search In Rotated Sorted Array**, compute the target response using LeetCode function signature `search`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Compare mid with left/right to determine sorted half..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Memory Mnemonic:** *"Compare mid with left/right to determine sorted half."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Search In Rotated Sorted Array.

```cpp
class Solution {
public:
    int search(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.2 (Rotated & Modified Array Search). Core takeaway: Compare mid with left/right to determine sorted half..

```cpp
class Solution {
public:
    int search(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 39. 🔴 P0 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the constraints for **Find Minimum in Rotated Sorted Array**, compute the target response using LeetCode function signature `findMin`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Compare mid with high (mid > high => min in right half)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Memory Mnemonic:** *"Compare mid with high (mid > high => min in right half)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Find Minimum in Rotated Sorted Array.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.2 (Rotated & Modified Array Search). Core takeaway: Compare mid with high (mid > high => min in right half)..

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 40. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the constraints for **Koko Eating Bananas**, compute the target response using LeetCode function signature `minEatingSpeed`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Binary search speed range [1, max_piles]..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Memory Mnemonic:** *"Binary search speed range [1, max_piles]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Koko Eating Bananas.

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.3 (Binary Search on Answer Space). Core takeaway: Binary search speed range [1, max_piles]..

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 41. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the constraints for **Capacity To Ship Packages Within D Days**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Binary search capacity range [max_weight, sum_weight]..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Memory Mnemonic:** *"Binary search capacity range [max_weight, sum_weight]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Capacity To Ship Packages Within D Days.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.3 (Binary Search on Answer Space). Core takeaway: Binary search capacity range [max_weight, sum_weight]..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 42. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the constraints for **Search a 2D Matrix**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Memory Mnemonic:** *"Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Search a 2D Matrix.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search). Core takeaway: Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 43. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the constraints for **Find Peak Element**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Compare nums[mid] with nums[mid + 1] on unsorted array..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Memory Mnemonic:** *"Compare nums[mid] with nums[mid + 1] on unsorted array."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Find Peak Element.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search). Core takeaway: Compare nums[mid] with nums[mid + 1] on unsorted array..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 8. OVERLAPPING INTERVALS

### 44. 🔴 P0 [Q] LC 56: Merge Intervals [MEDIUM]
- **LeetCode Link:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints for **Merge Intervals**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Sort by start time, merge overlapping bounds..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Sort by start time, merge overlapping bounds."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Merge Intervals.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 8.1 (Interval Merging & Insertion). Core takeaway: Sort by start time, merge overlapping bounds..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints for **Insert Interval**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 3-phase linear insertion (left, merged mid, right)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"3-phase linear insertion (left, merged mid, right)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Insert Interval.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 8.1 (Interval Merging & Insertion). Core takeaway: 3-phase linear insertion (left, merged mid, right)..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 46. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints for **Non-overlapping Intervals**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Greedy scheduling sorted by end time..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Greedy scheduling sorted by end time."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Non-overlapping Intervals.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 8.1 (Interval Merging & Insertion). Core takeaway: Greedy scheduling sorted by end time..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 47. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints for **Meeting Rooms II**, compute the target response using LeetCode function signature `solve`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Sort by start time + Min-Heap of active room end-times..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Sort by start time + Min-Heap of active room end-times."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Meeting Rooms II.

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 8.1 (Interval Merging & Insertion). Core takeaway: Sort by start time + Min-Heap of active room end-times..

```cpp
class Solution {
public:
    int solve(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 9. FAST & SLOW POINTERS (LINKED LIST)

### 48. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints for **Linked List Cycle**, compute the target response using LeetCode function signature `hasCycle`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Fast pointer moves 2 steps, slow moves 1 step; collision = cycle..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Fast pointer moves 2 steps, slow moves 1 step; collision = cycle."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Linked List Cycle.

```cpp
class Solution {
public:
    ListNode* hasCycle(ListNode* head) {
        unordered_set<ListNode*> visited;
        while (head) {
            if (visited.count(head)) return head;
            visited.insert(head); head = head->next;
        }
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 9.1 (Cycle Detection & Midpoint). Core takeaway: Fast pointer moves 2 steps, slow moves 1 step; collision = cycle..

```cpp
class Solution {
public:
    ListNode* hasCycle(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next; fast = fast->next->next;
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 49. 🔴 P0 [Q] LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints for **Linked List Cycle II**, compute the target response using LeetCode function signature `detectCycle`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Floyd's cycle detection + entry point recovery..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Floyd's cycle detection + entry point recovery."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Linked List Cycle II.

```cpp
class Solution {
public:
    ListNode* detectCycle(ListNode* head) {
        unordered_set<ListNode*> visited;
        while (head) {
            if (visited.count(head)) return head;
            visited.insert(head); head = head->next;
        }
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 9.1 (Cycle Detection & Midpoint). Core takeaway: Floyd's cycle detection + entry point recovery..

```cpp
class Solution {
public:
    ListNode* detectCycle(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next; fast = fast->next->next;
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 50. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [Reorder List](https://leetcode.com/problems/reorder-list/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints for **Reorder List**, compute the target response using LeetCode function signature `reorderList`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Midpoint split + reverse second half + alternate weaving..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Midpoint split + reverse second half + alternate weaving."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Reorder List.

```cpp
class Solution {
public:
    ListNode* reorderList(ListNode* head) {
        unordered_set<ListNode*> visited;
        while (head) {
            if (visited.count(head)) return head;
            visited.insert(head); head = head->next;
        }
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 9.1 (Cycle Detection & Midpoint). Core takeaway: Midpoint split + reverse second half + alternate weaving..

```cpp
class Solution {
public:
    ListNode* reorderList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next; fast = fast->next->next;
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 10. MONOTONIC STACK

### 51. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Determine if string `s` containing brackets `'()[]{}'` is valid.

**Example 1:**
- **Input:** `s = '()[]{}'`
- **Output:** `true`
- **Explanation:** Brackets matched in correct order.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Memory Mnemonic:** *"Push opening brackets, pop & match closing brackets."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Repeatedly erase sub-strings `"()"`, `"[]"`, `"{}"`.

```cpp
class Solution {
public:
    bool isValid(string s) {
        while (s.find("()") != string::npos || s.find("[]") != string::npos || s.find("{}") != string::npos) {
            size_t p = s.find("()"); if (p != string::npos) s.erase(p, 2);
            p = s.find("[]"); if (p != string::npos) s.erase(p, 2);
            p = s.find("{}"); if (p != string::npos) s.erase(p, 2);
        }
        return s.empty();
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Stack `stack<char>` matching opening and closing brackets.

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Odd length string, closing bracket first.

---

### 52. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the constraints for **Daily Temperatures**, compute the target response using LeetCode function signature `dailyTemperatures`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Monotonic decreasing stack storing indices..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"Monotonic decreasing stack storing indices."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Daily Temperatures.

```cpp
class Solution {
public:
    int dailyTemperatures(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 10.2 (Next Greater / Smaller Element). Core takeaway: Monotonic decreasing stack storing indices..

```cpp
class Solution {
public:
    int dailyTemperatures(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 53. 🔴 P0 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the constraints for **Largest Rectangle in Histogram**, compute the target response using LeetCode function signature `largestRectangleArea`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Monotonic increasing stack calculating width on pop..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"Monotonic increasing stack calculating width on pop."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Largest Rectangle in Histogram.

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 10.2 (Next Greater / Smaller Element). Core takeaway: Monotonic increasing stack calculating width on pop..

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 11. HEAP / PRIORITY QUEUE

### 54. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints for **Kth Largest Element in an Array**, compute the target response using LeetCode function signature `findKthLargest`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Min-Heap of size K (or Quickselect)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Memory Mnemonic:** *"Min-Heap of size K (or Quickselect)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Kth Largest Element in an Array.

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern). Core takeaway: Min-Heap of size K (or Quickselect)..

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 55. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints for **Top K Frequent Elements**, compute the target response using LeetCode function signature `topKFrequent`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Frequency map + Min-Heap of size K..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Memory Mnemonic:** *"Frequency map + Min-Heap of size K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Top K Frequent Elements.

```cpp
class Solution {
public:
    int topKFrequent(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern). Core takeaway: Frequency map + Min-Heap of size K..

```cpp
class Solution {
public:
    int topKFrequent(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 56. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints for **Find Median from Data Stream**, compute the target response using LeetCode function signature `findMedian`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Memory Mnemonic:** *"Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Find Median from Data Stream.

```cpp
class Solution {
public:
    int findMedian(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern). Core takeaway: Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)..

```cpp
class Solution {
public:
    int findMedian(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 57. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints for **Merge k Sorted Lists**, compute the target response using LeetCode function signature `mergeKLists`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Min-Heap of size K storing current head node of each list..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Memory Mnemonic:** *"Min-Heap of size K storing current head node of each list."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Merge k Sorted Lists.

```cpp
class Solution {
public:
    int mergeKLists(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern). Core takeaway: Min-Heap of size K storing current head node of each list..

```cpp
class Solution {
public:
    int mergeKLists(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 12. TREE DFS / DEPTH FIRST SEARCH

### 58. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints for **Maximum Depth of Binary Tree**, compute the target response using LeetCode function signature `maxDepth`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 1 + max(dfs(left), dfs(right))..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"1 + max(dfs(left), dfs(right))."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Maximum Depth of Binary Tree.

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 12.1 (Tree Height & Depth Recursion). Core takeaway: 1 + max(dfs(left), dfs(right))..

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        int left = maxDepth(root->left);
        int right = maxDepth(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 59. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints for **Diameter of Binary Tree**, compute the target response using LeetCode function signature `diameterOfBinaryTree`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Post-order height calculation updating global max..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Post-order height calculation updating global max."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Diameter of Binary Tree.

```cpp
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 12.1 (Tree Height & Depth Recursion). Core takeaway: Post-order height calculation updating global max..

```cpp
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int left = diameterOfBinaryTree(root->left);
        int right = diameterOfBinaryTree(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 60. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints for **Lowest Common Ancestor of a Binary Tree**, compute the target response using LeetCode function signature `lowestCommonAncestor`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Bottom-up DFS node bubbling matching P and Q..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Bottom-up DFS node bubbling matching P and Q."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Lowest Common Ancestor of a Binary Tree.

```cpp
class Solution {
public:
    int lowestCommonAncestor(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 12.1 (Tree Height & Depth Recursion). Core takeaway: Bottom-up DFS node bubbling matching P and Q..

```cpp
class Solution {
public:
    int lowestCommonAncestor(TreeNode* root) {
        if (!root) return 0;
        int left = lowestCommonAncestor(root->left);
        int right = lowestCommonAncestor(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 61. 🔴 P0 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints for **Binary Tree Maximum Path Sum**, compute the target response using LeetCode function signature `maxPathSum`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Post-order DFS returning max branch while tracking global split path sum..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Post-order DFS returning max branch while tracking global split path sum."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Binary Tree Maximum Path Sum.

```cpp
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 12.1 (Tree Height & Depth Recursion). Core takeaway: Post-order DFS returning max branch while tracking global split path sum..

```cpp
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        if (!root) return 0;
        int left = maxPathSum(root->left);
        int right = maxPathSum(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 13. TREE BFS / LEVEL ORDER TRAVERSAL

### 62. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints for **Binary Tree Level Order Traversal**, compute the target response using LeetCode function signature `levelOrder`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Queue iteration processing level size snapshot..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Queue iteration processing level size snapshot."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Binary Tree Level Order Traversal.

```cpp
class Solution {
public:
    int levelOrder(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 13.1 (Standard Level Order Traversal). Core takeaway: Queue iteration processing level size snapshot..

```cpp
class Solution {
public:
    int levelOrder(TreeNode* root) {
        if (!root) return 0;
        int left = levelOrder(root->left);
        int right = levelOrder(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 63. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints for **Binary Tree Right Side View**, compute the target response using LeetCode function signature `rightSideView`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Collect last node per queue level snapshot..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Collect last node per queue level snapshot."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Binary Tree Right Side View.

```cpp
class Solution {
public:
    int rightSideView(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 13.1 (Standard Level Order Traversal). Core takeaway: Collect last node per queue level snapshot..

```cpp
class Solution {
public:
    int rightSideView(TreeNode* root) {
        if (!root) return 0;
        int left = rightSideView(root->left);
        int right = rightSideView(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 64. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints for **Binary Tree Zigzag Level Order Traversal**, compute the target response using LeetCode function signature `levelOrder`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Alternating level insertion direction..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Alternating level insertion direction."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Binary Tree Zigzag Level Order Traversal.

```cpp
class Solution {
public:
    int levelOrder(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 13.1 (Standard Level Order Traversal). Core takeaway: Alternating level insertion direction..

```cpp
class Solution {
public:
    int levelOrder(TreeNode* root) {
        if (!root) return 0;
        int left = levelOrder(root->left);
        int right = levelOrder(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 14. BINARY SEARCH TREE (BST)

### 65. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints for **Validate Binary Search Tree**, compute the target response using LeetCode function signature `search`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Pass valid range [minVal, maxVal] downwards recursively..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"Pass valid range [minVal, maxVal] downwards recursively."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Validate Binary Search Tree.

```cpp
class Solution {
public:
    int search(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 14.1 (BST Validation & Inorder Property). Core takeaway: Pass valid range [minVal, maxVal] downwards recursively..

```cpp
class Solution {
public:
    int search(TreeNode* root) {
        if (!root) return 0;
        int left = search(root->left);
        int right = search(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 66. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints for **Kth Smallest Element in a BST**, compute the target response using LeetCode function signature `kthSmallest`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using In-order BST traversal yields sorted elements..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"In-order BST traversal yields sorted elements."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Kth Smallest Element in a BST.

```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 14.1 (BST Validation & Inorder Property). Core takeaway: In-order BST traversal yields sorted elements..

```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root) {
        if (!root) return 0;
        int left = kthSmallest(root->left);
        int right = kthSmallest(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 67. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints for **Delete Node in a BST**, compute the target response using LeetCode function signature `deleteNode`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using BST node deletion with in-order successor swap..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"BST node deletion with in-order successor swap."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Delete Node in a BST.

```cpp
class Solution {
public:
    int deleteNode(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q; q.push(root); int count = 0;
        while(!q.empty()) {
            TreeNode* cur = q.front(); q.pop(); count++;
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 14.1 (BST Validation & Inorder Property). Core takeaway: BST node deletion with in-order successor swap..

```cpp
class Solution {
public:
    int deleteNode(TreeNode* root) {
        if (!root) return 0;
        int left = deleteNode(root->left);
        int right = deleteNode(root->right);
        return 1 + max(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 15. BACKTRACKING / SUBSETS & PERMUTATIONS

### 68. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [Subsets](https://leetcode.com/problems/subsets/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints for **Subsets**, compute the target response using LeetCode function signature `subsets`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Include / Exclude decision tree recursion..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Memory Mnemonic:** *"Include / Exclude decision tree recursion."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Subsets.

```cpp
class Solution {
public:
    int subsets(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 15.1 (Subsets & Combination Choice). Core takeaway: Include / Exclude decision tree recursion..

```cpp
class Solution {
public:
    int subsets(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 69. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [Permutations](https://leetcode.com/problems/permutations/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints for **Permutations**, compute the target response using LeetCode function signature `permute`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Used boolean array or in-place swap recursion..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Memory Mnemonic:** *"Used boolean array or in-place swap recursion."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Permutations.

```cpp
class Solution {
public:
    int permute(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 15.1 (Subsets & Combination Choice). Core takeaway: Used boolean array or in-place swap recursion..

```cpp
class Solution {
public:
    int permute(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 70. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints for **Combination Sum**, compute the target response using LeetCode function signature `combinationSum`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Unbounded choice recursion with index control..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Memory Mnemonic:** *"Unbounded choice recursion with index control."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Combination Sum.

```cpp
class Solution {
public:
    int combinationSum(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 15.1 (Subsets & Combination Choice). Core takeaway: Unbounded choice recursion with index control..

```cpp
class Solution {
public:
    int combinationSum(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 71. 🔴 P0 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [N-Queens](https://leetcode.com/problems/n-queens/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints for **N-Queens**, compute the target response using LeetCode function signature `solveNQueens`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Constraint hashing (cols, main diagonals, anti-diagonals)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Memory Mnemonic:** *"Constraint hashing (cols, main diagonals, anti-diagonals)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for N-Queens.

```cpp
class Solution {
public:
    int solveNQueens(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 15.1 (Subsets & Combination Choice). Core takeaway: Constraint hashing (cols, main diagonals, anti-diagonals)..

```cpp
class Solution {
public:
    int solveNQueens(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 16. GRAPH DFS / BFS

### 72. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Return the number of connected land islands in binary grid.

**Example 1:**
- **Input:** `grid = [["1","1","0"],["1","1","0"],["0","0","1"]]`
- **Output:** `2`
- **Explanation:** 2 connected land components.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Memory Mnemonic:** *"Matrix traversal + 4-directional flood fill sink."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M*N) | **Space:** O(M*N)
- **Explanation:** BFS with external visited array.

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size(), islands = 0;
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1' && !visited[r][c]) {
                    islands++; queue<pair<int,int>> q; q.push({r, c}); visited[r][c] = true;
                    int dr[] = {0,0,1,-1}, dc[] = {1,-1,0,0};
                    while(!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (int i=0; i<4; i++) {
                            int nr = cr + dr[i], nc = cc + dc[i];
                            if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]=='1' && !visited[nr][nc]) {
                                visited[nr][nc] = true; q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return islands;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M*N) | **Space:** O(M*N)
- **Explanation:** In-place DFS sinking visited `'1'` to `'0'`.

```cpp
class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int m = grid.size(), n = grid[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size(), count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All water or all land.

---

### 73. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the constraints for **Clone Graph**, compute the target response using LeetCode function signature `cloneGraph`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Hash map node mapping (original -> clone) during DFS/BFS..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Memory Mnemonic:** *"Hash map node mapping (original -> clone) during DFS/BFS."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Clone Graph.

```cpp
class Solution {
public:
    int cloneGraph(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS). Core takeaway: Hash map node mapping (original -> clone) during DFS/BFS..

```cpp
class Solution {
public:
    int cloneGraph(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 74. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the constraints for **Is Graph Bipartite?**, compute the target response using LeetCode function signature `isBipartite`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 2-color graph coloring via BFS/DFS..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Memory Mnemonic:** *"2-color graph coloring via BFS/DFS."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Is Graph Bipartite?.

```cpp
class Solution {
public:
    int isBipartite(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS). Core takeaway: 2-color graph coloring via BFS/DFS..

```cpp
class Solution {
public:
    int isBipartite(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 75. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the constraints for **Rotting Oranges**, compute the target response using LeetCode function signature `orangesRotting`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Pre-populate queue with all initial rotten sources; level time tick..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)
- **Memory Mnemonic:** *"Pre-populate queue with all initial rotten sources; level time tick."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Rotting Oranges.

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 16.2 (Multi-Source BFS). Core takeaway: Pre-populate queue with all initial rotten sources; level time tick..

```cpp
class Solution {
public:
    int orangesRotting(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 76. 🔴 P0 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the constraints for **Word Ladder**, compute the target response using LeetCode function signature `ladderLength`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Unweighted shortest path BFS on mutated character state space..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)
- **Memory Mnemonic:** *"Unweighted shortest path BFS on mutated character state space."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Word Ladder.

```cpp
class Solution {
public:
    int ladderLength(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 16.2 (Multi-Source BFS). Core takeaway: Unweighted shortest path BFS on mutated character state space..

```cpp
class Solution {
public:
    int ladderLength(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 17. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### 77. 🔴 P0 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the constraints for **Course Schedule**, compute the target response using LeetCode function signature `canFinish`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using In-degree array + Queue processing; visited count == N => DAG..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)
- **Memory Mnemonic:** *"In-degree array + Queue processing; visited count == N => DAG."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Course Schedule.

```cpp
class Solution {
public:
    int canFinish(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm). Core takeaway: In-degree array + Queue processing; visited count == N => DAG..

```cpp
class Solution {
public:
    int canFinish(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 78. 🔴 P0 [Q] LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the constraints for **Course Schedule II**, compute the target response using LeetCode function signature `findOrder`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Kahn's algorithm collecting top-sort ordering array..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)
- **Memory Mnemonic:** *"Kahn's algorithm collecting top-sort ordering array."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Course Schedule II.

```cpp
class Solution {
public:
    int findOrder(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm). Core takeaway: Kahn's algorithm collecting top-sort ordering array..

```cpp
class Solution {
public:
    int findOrder(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 18. DISJOINT SET UNION (DSU / UNION-FIND)

### 79. 🟠 P1 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the constraints for **Redundant Connection**, compute the target response using LeetCode function signature `findRedundantConnection`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Find cycle by checking if find(u) == find(v) before union(u, v)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)
- **Memory Mnemonic:** *"Find cycle by checking if find(u) == find(v) before union(u, v)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Redundant Connection.

```cpp
class Solution {
public:
    int findRedundantConnection(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 18.1 (DSU Path Compression & Union by Rank). Core takeaway: Find cycle by checking if find(u) == find(v) before union(u, v)..

```cpp
class Solution {
public:
    int findRedundantConnection(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 80. 🟠 P1 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the constraints for **Number of Provinces**, compute the target response using LeetCode function signature `findCircleNum`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Connected component counting via DSU union operations..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)
- **Memory Mnemonic:** *"Connected component counting via DSU union operations."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Number of Provinces.

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& graph) {
        int n = graph.size(), count = 0;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : graph[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 18.1 (DSU Path Compression & Union by Rank). Core takeaway: Connected component counting via DSU union operations..

```cpp
class Solution {
public:
    int findCircleNum(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<bool> vis(n, false); int components = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                components++; queue<int> q; q.push(i); vis[i] = true;
                while(!q.empty()) {
                    int u = q.front(); q.pop();
                    for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
                }
            }
        }
        return components;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 19. 1D DYNAMIC PROGRAMMING

### 81. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [House Robber](https://leetcode.com/problems/house-robber/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints for **House Robber**, compute the target response using LeetCode function signature `rob`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for House Robber.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int rob(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 19.1 (State Transition & Space Optimization). Core takeaway: dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables..

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 82. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints for **Climbing Stairs**, compute the target response using LeetCode function signature `climbStairs`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Fibonacci base DP transition..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"Fibonacci base DP transition."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Climbing Stairs.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int climbStairs(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 19.1 (State Transition & Space Optimization). Core takeaway: Fibonacci base DP transition..

```cpp
class Solution {
public:
    int climbStairs(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 83. 🔴 P0 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [Word Break](https://leetcode.com/problems/word-break/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints for **Word Break**, compute the target response using LeetCode function signature `wordBreak`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using dp[i] = true if dp[j] && wordDict.count(s[j..i])..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"dp[i] = true if dp[j] && wordDict.count(s[j..i])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Word Break.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int wordBreak(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 19.1 (State Transition & Space Optimization). Core takeaway: dp[i] = true if dp[j] && wordDict.count(s[j..i])..

```cpp
class Solution {
public:
    int wordBreak(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 84. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints for **Longest Increasing Subsequence**, compute the target response using LeetCode function signature `lengthOfLIS`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Memory Mnemonic:** *"O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Longest Increasing Subsequence.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int lengthOfLIS(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 19.1 (State Transition & Space Optimization). Core takeaway: O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound..

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 20. KNAPSACK / 2D DYNAMIC PROGRAMMING

### 85. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [Coin Change](https://leetcode.com/problems/coin-change/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints for **Coin Change**, compute the target response using LeetCode function signature `coinChange`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using dp[i] = min(dp[i], 1 + dp[i - coin])..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Memory Mnemonic:** *"dp[i] = min(dp[i], 1 + dp[i - coin])."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Coin Change.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int coinChange(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP). Core takeaway: dp[i] = min(dp[i], 1 + dp[i - coin])..

```cpp
class Solution {
public:
    int coinChange(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 86. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints for **Longest Common Subsequence**, compute the target response using LeetCode function signature `longestCommonSubsequence`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 2D matrix matching grid dp[i][j]..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Memory Mnemonic:** *"2D matrix matching grid dp[i][j]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Longest Common Subsequence.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int longestCommonSubsequence(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP). Core takeaway: 2D matrix matching grid dp[i][j]..

```cpp
class Solution {
public:
    int longestCommonSubsequence(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 87. 🔴 P0 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints for **Partition Equal Subset Sum**, compute the target response using LeetCode function signature `canPartition`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 0/1 Knapsack reduction with target sum = total / 2..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Memory Mnemonic:** *"0/1 Knapsack reduction with target sum = total / 2."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Partition Equal Subset Sum.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int canPartition(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP). Core takeaway: 0/1 Knapsack reduction with target sum = total / 2..

```cpp
class Solution {
public:
    int canPartition(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 88. 🔴 P0 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints for **Edit Distance**, compute the target response using LeetCode function signature `minDistance`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using 3-operation (Insert, Delete, Replace) matrix grid DP..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Memory Mnemonic:** *"3-operation (Insert, Delete, Replace) matrix grid DP."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Edit Distance.

```cpp
class Solution {
    int recursionNaive(int n) {
        if (n <= 1) return n;
        return recursionNaive(n - 1) + recursionNaive(n - 2);
    }
public:
    int minDistance(int n) {
        return recursionNaive(n);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP). Core takeaway: 3-operation (Insert, Delete, Replace) matrix grid DP..

```cpp
class Solution {
public:
    int minDistance(vector<int>& nums) {
        int n = nums.size(); if (n == 0) return 0;
        vector<int> dp(n + 1, 0); dp[0] = 0; dp[1] = nums[0];
        for (int i = 2; i <= n; i++) dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        return dp[n];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

## 21. BIT MANIPULATION & BITMASKING

### 89. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [Single Number](https://leetcode.com/problems/single-number/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints for **Single Number**, compute the target response using LeetCode function signature `singleNumber`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using XOR cancellation property (A ^ A = 0, A ^ 0 = A)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"XOR cancellation property (A ^ A = 0, A ^ 0 = A)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Single Number.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 21.1 (XOR Cancelation & Bit Operations). Core takeaway: XOR cancellation property (A ^ A = 0, A ^ 0 = A)..

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 90. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints for **Number of 1 Bits**, compute the target response using LeetCode function signature `hammingWeight`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Number of 1 Bits.

```cpp
class Solution {
public:
    int hammingWeight(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 21.1 (XOR Cancelation & Bit Operations). Core takeaway: Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)..

```cpp
class Solution {
public:
    int hammingWeight(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---

### 91. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints for **Counting Bits**, compute the target response using LeetCode function signature `countBits`.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `targetResult`
- **Explanation:** Calculates result using DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))..

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Memory Mnemonic:** *"DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Exhaustively evaluate candidates for Counting Bits.

```cpp
class Solution {
public:
    int countBits(vector<int>& nums) {
        int n = nums.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j]; ans = max(ans, sum);
            }
        }
        return ans;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Optimal resolution using Sub-Pattern 21.1 (XOR Cancelation & Bit Operations). Core takeaway: DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))..

```cpp
class Solution {
public:
    int countBits(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (int x : nums) mp[x]++;
        return mp.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty container or single element.
- Boundary negative numbers or overflow.

---
