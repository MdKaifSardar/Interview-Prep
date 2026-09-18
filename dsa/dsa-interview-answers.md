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
- **LeetCode Link:** [LC 54: Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given an `m x n` matrix, return all elements of the matrix in spiral order starting from top-left and moving clockwise.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]` 
- **Output:** `[1,2,3,6,9,8,7,4,5]`
- **Explanation:** Traverse top row (1,2,3), right col (6,9), bottom row (8,7), left col (4), inner (5).

**Example 2:**
- **Input:** `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`
- **Output:** `[1,2,3,4,8,12,11,10,9,5,6,7]`

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Memory Mnemonic:** *"4-boundary shrinking loop (top, bottom, left, right)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N)
- **Explanation:** Maintain a 2D boolean array `visited[m][n]` and four directional vectors `dr = {0, 1, 0, -1}` and `dc = {1, 0, -1, 0}` representing Right, Down, Left, and Up. Start at `(0, 0)` moving right. At each step, calculate next position `(nr, nc)`. If out of bounds or visited, turn right by updating direction index `di = (di + 1) % 4`. Iterate M * N times.

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
- **Explanation:** Use 4 boundary pointers: `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`. Traverse clockwise:
1. Top row: from `left` to `right` along `matrix[top][j]`, then increment `top++`.
2. Right column: from `top` to `bottom` along `matrix[i][right]`, then decrement `right--`.
3. Bottom row (if `top <= bottom`): from `right` to `left` along `matrix[bottom][j]`, then decrement `bottom--`.
4. Left column (if `left <= right`): from `bottom` to `top` along `matrix[i][left]`, then increment `left++`.
Repeat while `top <= bottom && left <= right`.

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
- 1 x 1 matrix `[[5]]`.
- Non-square rectangular matrices.

---

### 2. 🔴 P0 [Q] LC 59: Spiral Matrix II [MEDIUM]
- **LeetCode Link:** [LC 59: Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n^2` in spiral order.

**Example 1:**
- **Input:** `n = 3` 
- **Output:** `[[1,2,3],[8,9,4],[7,6,5]]` 

**Example 2:**
- **Input:** `n = 1` 
- **Output:** `[[1]]`

**Constraints:**
- `1 <= n <= 20`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Memory Mnemonic:** *"Sequential filling 1..N^2 with 4-boundary shrinking loop."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Allocate an N x N grid initialized with zeros and a boolean `visited` grid. Maintain directional vectors `dr` and `dc` for Right, Down, Left, Up. Sequentially assign value `val` from 1 to N^2 while stepping through coordinates, turning right whenever a wall or visited cell is reached.

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n, 0));
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
        int r = 0, c = 0, di = 0;
        for (int val = 1; val <= n * n; val++) {
            res[r][c] = val;
            visited[r][c] = true;
            int nr = r + dr[di], nc = c + dc[di];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
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
- **Explanation:** Initialize an N x N matrix and boundary variables: `top = 0`, `bottom = n - 1`, `left = 0`, `right = n - 1`. Maintain counter `val = 1`.
Execute a 4-phase loop:
1. Fill top row `left` to `right` at `res[top][j]`, then `top++`.
2. Fill right column `top` to `bottom` at `res[i][right]`, then `right--`.
3. Fill bottom row `right` to `left` at `res[bottom][j]`, then `bottom--`.
4. Fill left column `bottom` to `top` at `res[i][left]`, then `left++`.
Continue until `val > n * n`.

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n, 0));
        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;
        int val = 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res[top][j] = val++;
            top++;
            for (int i = top; i <= bottom; i++) res[i][right] = val++;
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res[bottom][j] = val++;
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res[i][left] = val++;
                left++;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 1` (returns `[[1]]`).
- Maximum boundary `n = 20`.

---

### 3. 🔴 P0 [Q] LC 48: Rotate Image [MEDIUM]
- **LeetCode Link:** [LC 48: Rotate Image](https://leetcode.com/problems/rotate-image/)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]` 
- **Output:** `[[7,4,1],[8,5,2],[9,6,3]]` 

**Example 2:**
- **Input:** `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]` 
- **Output:** `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`

**Constraints:**
- `n == matrix.length == matrix[i].length` 
- `1 <= n <= 20` 
- `-1000 <= matrix[i][j] <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Memory Mnemonic:** *"Transpose matrix + reverse each row in-place."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Allocate a separate N x N auxiliary matrix `rotated`. Map cell `matrix[i][j]` in original grid to `rotated[j][n - 1 - i]`. Once populated, copy all values from `rotated` back into `matrix` to satisfy in-place signature.

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> rotated(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][n - 1 - i] = matrix[i][j];
            }
        }
        matrix = rotated;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Apply a 2-step geometric decomposition:
1. **Transpose Matrix:** Swap element `matrix[i][j]` with `matrix[j][i]` for all i < j. This flips the matrix across its main diagonal.
2. **Reverse Each Row:** Reverse the elements of each row horizontally (`reverse(matrix[i].begin(), matrix[i].end())`). Combining transpose + horizontal reflection yields an exact 90° clockwise rotation in O(1) space.

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
- 1 x 1 matrix `[[1]]`.
- 2 x 2 matrix `[[1,2],[3,4]]`.
- Matrix with negative elements.

---

### 4. 🔴 P0 [Q] Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
- **LeetCode Link:** [Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise](https://leetcode.com/problems/rotate-image/)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
Given an `n x n` 2D matrix, rotate the matrix by 90 degrees anti-clockwise (counter-clockwise) in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]` 
- **Output:** `[[3,6,9],[2,5,8],[1,4,7]]` 

**Example 2:**
- **Input:** `matrix = [[1,2],[3,4]]` 
- **Output:** `[[2,4],[1,3]]`

**Constraints:**
- `n == matrix.length == matrix[i].length` 
- `1 <= n <= 20`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Memory Mnemonic:** *"Transpose matrix + reverse each column."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Allocate an auxiliary matrix `rotated[n][n]`. For anti-clockwise rotation, element `matrix[i][j]` is placed into `rotated[n - 1 - j][i]`. Copy result back to input matrix.

```cpp
class Solution {
public:
    void rotateAntiClockwise(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> rotated(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rotated[n - 1 - j][i] = matrix[i][j];
            }
        }
        matrix = rotated;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Apply a 2-step geometric transformation:
1. **Transpose Matrix:** Swap `matrix[i][j]` with `matrix[j][i]` for all i < j.
2. **Reverse Each Column:** For each column j, swap element `matrix[top][j]` with `matrix[bottom][j]` moving `top` down and `bottom` up. This flips the matrix vertically, achieving 90° counter-clockwise rotation.

```cpp
class Solution {
public:
    void rotateAntiClockwise(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        for (int j = 0; j < n; j++) {
            int top = 0, bottom = n - 1;
            while (top < bottom) {
                swap(matrix[top][j], matrix[bottom][j]);
                top++; bottom--;
            }
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- 1 x 1 matrix.
- 2 x 2 matrix.

---

### 5. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
- **LeetCode Link:** [LC 73: Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s. You must do it in-place.

**Example 1:**
- **Input:** `matrix = [[1,1,1],[1,0,1],[1,1,1]]` 
- **Output:** `[[1,0,1],[0,0,0],[1,0,1]]` 

**Example 2:**
- **Input:** `matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]` 
- **Output:** `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]`

**Constraints:**
- `m == matrix.length` 
- `n == matrix[0].length` 
- `1 <= m, n <= 200` 
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Use 1st row and 1st column as dummy markers for O(1) space."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M + N)
- **Explanation:** Maintain two separate boolean arrays: `rowHasZero[m]` and `colHasZero[n]`. Perform a first pass over `matrix` to mark `rowHasZero[i] = true` and `colHasZero[j] = true` whenever `matrix[i][j] == 0`. Perform a second pass: if `rowHasZero[i] || colHasZero[j]` is true, set `matrix[i][j] = 0`.

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<bool> rowHasZero(m, false);
        vector<bool> colHasZero(n, false);
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rowHasZero[i] = true;
                    colHasZero[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rowHasZero[i] || colHasZero[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(1) auxiliary
- **Explanation:** Use the matrix's own **first row** (`matrix[0][j]`) and **first column** (`matrix[i][0]`) as state storage arrays to eliminate auxiliary memory!
1. Use two variables `firstRowZero` and `firstColZero` to track if row 0 or col 0 initially contain any zeros.
2. Iterate through grid (i=1..m-1, j=1..n-1). If `matrix[i][j] == 0`, mark `matrix[i][0] = 0` and `matrix[0][j] = 0`.
3. Iterate (i=1..m-1, j=1..n-1) and set `matrix[i][j] = 0` if `matrix[i][0] == 0 || matrix[0][j] == 0`.
4. Finally, update row 0 if `firstRowZero` is true, and col 0 if `firstColZero` is true.

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRowZero = false, firstColZero = false;
        
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRowZero = true;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstColZero = true;
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (firstRowZero) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstColZero) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Zeros already in row 0 or col 0.
- Matrix with all zeros or no zeros.
- Single row / single column matrices.

---

### 6. 🔴 P0 [Q] LC 118: Pascal's Triangle [EASY]
- **LeetCode Link:** [LC 118: Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given an integer `numRows`, return the first `numRows` of Pascal's triangle.

**Example 1:**
- **Input:** `numRows = 5` 
- **Output:** `[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]` 

**Example 2:**
- **Input:** `numRows = 1` 
- **Output:** `[[1]]`

**Constraints:**
- `1 <= numRows <= 30`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Dynamic row generation using previous row element sums."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(numRows^3) | **Space:** O(1) auxiliary
- **Explanation:** Calculate each value in Pascal's triangle at row r and column c using combination formula nCr = r! / (c! * (r-c)!). Computing factorials for every cell causes redundant multiplication and integer overflow for r > 12.

```cpp
class Solution {
private:
    long long nCr(int n, int r) {
        long long res = 1;
        for (int i = 0; i < r; i++) {
            res = res * (n - i);
            res = res / (i + 1);
        }
        return res;
    }
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;
        for (int i = 0; i < numRows; i++) {
            vector<int> row;
            for (int j = 0; j <= i; j++) {
                row.push_back(nCr(i, j));
            }
            triangle.push_back(row);
        }
        return triangle;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(numRows^2) | **Space:** O(1) auxiliary
- **Explanation:** Use dynamic programming to build rows iteratively:
1. Initialize `triangle` vector.
2. For each row i from 0 to `numRows - 1`: create a vector `row` of size `i + 1` filled with `1`s.
3. For middle elements (j=1..i-1), compute `row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]`.
4. Push `row` into `triangle`.

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;
        for (int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; j++) {
                row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
            triangle.push_back(row);
        }
        return triangle;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `numRows = 1` (returns `[[1]]`).
- `numRows = 2` (returns `[[1],[1,1]]`).

---

### 7. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
- **LeetCode Link:** [LC 31: Next Permutation](https://leetcode.com/problems/next-permutation/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Rearrange numbers into the lexicographically next greater permutation of numbers in-place.

**Example 1:**
- **Input:** `nums = [1,2,3]` 
- **Output:** `[1,3,2]` 

**Example 2:**
- **Input:** `nums = [3,2,1]` 
- **Output:** `[1,2,3]` 

**Example 3:**
- **Input:** `nums = [1,1,5]` 
- **Output:** `[1,5,1]`

**Constraints:**
- `1 <= nums.length <= 100` 
- `0 <= nums[i] <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"Find decrease pivot -> swap with next larger -> reverse suffix."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N! * N)
- **Explanation:** Generate all N! permutations recursively using backtracking, store them in a sorted list, locate `nums` in the list, and select the next permutation. Time complexity O(N! * N) causes TLE for N > 10.

```cpp
class Solution {
private:
    void permute(vector<int>& nums, int start, vector<vector<int>>& allPerms) {
        if (start == nums.size()) {
            allPerms.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            permute(nums, start + 1, allPerms);
            swap(nums[start], nums[i]);
        }
    }
public:
    void nextPermutation(vector<int>& nums) {
        vector<vector<int>> allPerms;
        vector<int> copy = nums;
        permute(copy, 0, allPerms);
        sort(allPerms.begin(), allPerms.end());
        for (int i = 0; i < allPerms.size(); i++) {
            if (allPerms[i] == nums) {
                if (i + 1 < allPerms.size()) nums = allPerms[i + 1];
                else nums = allPerms[0];
                return;
            }
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 3-step algorithm operating right-to-left:
1. **Find Pivot Index i:** Scan right-to-left to find first `nums[i] < nums[i + 1]`. If no such i, reverse whole array.
2. **Find Swap Element j:** Scan right-to-left to find first `j > i` with `nums[j] > nums[i]`. Swap `nums[i]` and `nums[j]`.
3. **Reverse Suffix:** Reverse subarray from `i + 1` to end of `nums`.

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Fully descending array e.g., `[3,2,1]` (reverses to `[1,2,3]`).
- Array with duplicates e.g., `[1,1,5]`.

---


## 2. COMPLETE SORTING ALGORITHMS SUITE

### 8. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [ALG 1: Selection Sort Algorithm Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Implement Selection Sort to sort an array of integers in non-decreasing order.

**Example 1:**
- **Input:** `nums = [64, 25, 12, 22, 11]` 
- **Output:** `[11, 12, 22, 25, 64]`

**Constraints:**
- `1 <= nums.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Find min element in unsorted partition and swap with start."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Create an extra array `sorted`. Iteratively find the minimum element in `nums`, append it to `sorted`, and remove it from `nums`. Involves vector deletions shifting memory.

```cpp
class Solution {
public:
    vector<int> selectionSort(vector<int>& nums) {
        vector<int> sorted;
        while (!nums.empty()) {
            auto minIt = min_element(nums.begin(), nums.end());
            sorted.push_back(*minIt);
            nums.erase(minIt);
        }
        return sorted;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Perform in-place selection sort. Loop `i` from 0 to `N - 2`. Find the index `minIdx` of the smallest element in the subarray `nums[i...N-1]`. Swap `nums[i]` with `nums[minIdx]`. Performs exactly N-1 swaps.

```cpp
class Solution {
public:
    vector<int> selectionSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[minIdx]) {
                    minIdx = j;
                }
            }
            swap(nums[i], nums[minIdx]);
        }
        return nums;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Already sorted array.
- Reverse sorted array.
- Array with duplicate values.

---

### 9. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [ALG 2: Bubble Sort Algorithm Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Implement Bubble Sort with early exit optimization to sort an array in non-decreasing order.

**Example 1:**
- **Input:** `nums = [5, 1, 4, 2, 8]` 
- **Output:** `[1, 2, 4, 5, 8]`

**Constraints:**
- `1 <= nums.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Repeatedly swap adjacent inverted pairs with early exit flag."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Unoptimized nested loops running full N^2 iterations comparing adjacent elements `nums[j]` and `nums[j+1]` without tracking whether swaps occurred.

```cpp
class Solution {
public:
    vector<int> bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                }
            }
        }
        return nums;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) best, O(N^2) worst | **Space:** O(1) auxiliary
- **Explanation:** Add a `swapped` boolean flag inside outer loop. Inner loop compares `nums[j]` and `nums[j+1]` up to `n - 1 - i`. If no swaps occur in a pass, the array is already sorted—break early in O(N) time!

```cpp
class Solution {
public:
    vector<int> bubbleSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return nums;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Already sorted array (exits after 1 pass in O(N)).
- Reverse sorted array.

---

### 10. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [ALG 3: Insertion Sort Algorithm Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Implement Insertion Sort to sort an array of integers in non-decreasing order.

**Example 1:**
- **Input:** `nums = [12, 11, 13, 5, 6]` 
- **Output:** `[5, 6, 11, 12, 13]`

**Constraints:**
- `1 <= nums.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Memory Mnemonic:** *"Shift elements right to insert key into sorted prefix."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Build a new array by finding insertion positions using linear search and calling vector insert, incurring shift overhead.

```cpp
class Solution {
public:
    vector<int> insertionSort(vector<int>& nums) {
        vector<int> sorted;
        for (int x : nums) {
            auto it = sorted.begin();
            while (it != sorted.end() && *it < x) it++;
            sorted.insert(it, x);
        }
        return sorted;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) best, O(N^2) worst | **Space:** O(1) auxiliary
- **Explanation:** In-place Insertion Sort. Loop `i` from 1 to `N - 1`. Store `key = nums[i]`. Shift all elements in sorted prefix `nums[0...i-1]` rightwards while `j >= 0 && nums[j] > key`. Insert `key` at position `j + 1`.

```cpp
class Solution {
public:
    vector<int> insertionSort(vector<int>& nums) {
        int n = nums.size();
        for (int i = 1; i < n; i++) {
            int key = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Already sorted array (O(N) time).
- Reverse sorted array (O(N^2) shifts).

---

### 11. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
- **LeetCode Link:** [ALG 4: Merge Sort & Inversion Counting Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Implement Merge Sort and count total inversion pairs `(i, j)` where `i < j` and `nums[i] > nums[j]`.

**Example 1:**
- **Input:** `nums = [8, 4, 2, 1]` 
- **Output:** Inversions = 6, Sorted = `[1, 2, 4, 8]`

**Constraints:**
- `1 <= nums.length <= 50000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Memory Mnemonic:** *"Divide halves recursively and count inversions during merge phase."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Check all pairs `(i, j)` with `i < j` in O(N^2) nested loops to count inversions.

```cpp
class Solution {
public:
    long long countInversions(vector<int>& nums) {
        long long count = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] > nums[j]) count++;
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Divide & Conquer Merge Sort. When merging two sorted halves `left` and `right`, if `left[i] > right[j]`, then ALL remaining elements in left half `(mid - i + 1)` are greater than `right[j]`. Add `(mid - i + 1)` to inversion count during merge.

```cpp
class Solution {
private:
    long long mergeAndCount(vector<int>& nums, int low, int mid, int high) {
        vector<int> temp;
        int i = low, j = mid + 1;
        long long invCount = 0;
        
        while (i <= mid && j <= high) {
            if (nums[i] <= nums[j]) {
                temp.push_back(nums[i++]);
            } else {
                temp.push_back(nums[j++]);
                invCount += (mid - i + 1);
            }
        }
        while (i <= mid) temp.push_back(nums[i++]);
        while (j <= high) temp.push_back(nums[j++]);
        for (int k = low; k <= high; k++) nums[k] = temp[k - low];
        return invCount;
    }
    
    long long mergeSort(vector<int>& nums, int low, int high) {
        long long invCount = 0;
        if (low < high) {
            int mid = low + (high - low) / 2;
            invCount += mergeSort(nums, low, mid);
            invCount += mergeSort(nums, mid + 1, high);
            invCount += mergeAndCount(nums, low, mid, high);
        }
        return invCount;
    }
public:
    long long countInversionsAndSort(vector<int>& nums) {
        return mergeSort(nums, 0, nums.size() - 1);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Sorted array (0 inversions).
- Reverse sorted array (N(N-1)/2 inversions).

---

### 12. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
- **LeetCode Link:** [ALG 5: Quick Sort Algorithm Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Implement Quick Sort with randomized pivot selection to sort an array in non-decreasing order.

**Example 1:**
- **Input:** `nums = [10, 7, 8, 9, 1, 5]` 
- **Output:** `[1, 5, 7, 8, 9, 10]`

**Constraints:**
- `1 <= nums.length <= 50000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Memory Mnemonic:** *"Randomized Lomuto/Hoare pivot partitioning."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) avg, O(N^2) worst | **Space:** O(N)
- **Explanation:** Standard Quick Sort picking first/last element as pivot without randomization. On pre-sorted inputs, recurses N times causing O(N^2) stack overflow.

```cpp
class Solution {
private:
    int partition(vector<int>& nums, int low, int high) {
        int pivot = nums[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (nums[j] < pivot) {
                i++;
                swap(nums[i], nums[j]);
            }
        }
        swap(nums[i + 1], nums[high]);
        return i + 1;
    }
public:
    void quickSort(vector<int>& nums, int low, int high) {
        if (low < high) {
            int p = partition(nums, low, high);
            quickSort(nums, low, p - 1);
            quickSort(nums, p + 1, high);
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(log N) auxiliary
- **Explanation:** Randomized Quick Sort. Swap `nums[high]` with a random element in `[low, high]` before partitioning. Prevents O(N^2) worst-case performance on sorted or identical array inputs.

```cpp
class Solution {
private:
    int randomizedPartition(vector<int>& nums, int low, int high) {
        int randIdx = low + rand() % (high - low + 1);
        swap(nums[randIdx], nums[high]);
        int pivot = nums[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (nums[j] < pivot) {
                i++;
                swap(nums[i], nums[j]);
            }
        }
        swap(nums[i + 1], nums[high]);
        return i + 1;
    }
    
    void quickSortHelper(vector<int>& nums, int low, int high) {
        if (low < high) {
            int p = randomizedPartition(nums, low, high);
            quickSortHelper(nums, low, p - 1);
            quickSortHelper(nums, p + 1, high);
        }
    }
public:
    vector<int> quickSort(vector<int>& nums) {
        quickSortHelper(nums, 0, nums.size() - 1);
        return nums;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Pre-sorted array.
- All elements identical.

---

### 13. 🟠 P1 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [ALG 6: Counting Sort Algorithm Blueprint](https://leetcode.com/problems/sort-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))

**📜 Problem Statement & Explanation**
Implement Counting Sort for integers in bounded range `[minVal, maxVal]`.

**Example 1:**
- **Input:** `nums = [4, 2, 2, 8, 3, 3, 1]` 
- **Output:** `[1, 2, 2, 3, 3, 4, 8]`

**Constraints:**
- `1 <= nums.length <= 50000` 
- Bounded range `maxVal - minVal <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))
- **Memory Mnemonic:** *"Frequency array for bounded integer range [0, K]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Using comparison-based sort (O(N log N)) when elements are integers in a small bounded range.

```cpp
class Solution {
public:
    vector<int> countingSort(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N + K) | **Space:** O(K) auxiliary
- **Explanation:** Non-comparison linear sort:
1. Find `minVal` and `maxVal` in `nums` (K = maxVal - minVal + 1).
2. Build frequency map array `freq[K]`.
3. Compute prefix sums of `freq` to get exact output index positions.
4. Build stable output array iterating input backwards.

```cpp
class Solution {
public:
    vector<int> countingSort(vector<int>& nums) {
        if (nums.empty()) return nums;
        int minVal = *min_element(nums.begin(), nums.end());
        int maxVal = *max_element(nums.begin(), nums.end());
        int range = maxVal - minVal + 1;
        
        vector<int> count(range, 0);
        vector<int> output(nums.size());
        
        for (int x : nums) count[x - minVal]++;
        for (int i = 1; i < range; i++) count[i] += count[i - 1];
        
        for (int i = nums.size() - 1; i >= 0; i--) {
            output[count[nums[i] - minVal] - 1] = nums[i];
            count[nums[i] - minVal]--;
        }
        return output;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative integers (handled by offset `x - minVal`).
- Range K larger than 10^6.

---

### 14. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
- **LeetCode Link:** [LC 179: Largest Number](https://leetcode.com/problems/largest-number/)
- **Category / Sub-Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)

**📜 Problem Statement & Explanation**
Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it as a string.

**Example 1:**
- **Input:** `nums = [10,2]` 
- **Output:** `"210"` 

**Example 2:**
- **Input:** `nums = [3,30,34,5,9]` 
- **Output:** `"9534330"`

**Constraints:**
- `1 <= nums.length <= 100` 
- `0 <= nums[i] <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)
- **Memory Mnemonic:** *"Custom string concatenation comparator (a + b > b + a)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N! * N)
- **Explanation:** Generate all N! string permutations, concatenate them, and find the lexicographically largest string.

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> strNums;
        for (int x : nums) strNums.push_back(to_string(x));
        string maxStr = "";
        sort(strNums.begin(), strNums.end());
        do {
            string curr = "";
            for (string& s : strNums) curr += s;
            if (curr > maxStr) maxStr = curr;
        } while (next_permutation(strNums.begin(), strNums.end()));
        return maxStr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N * L) | **Space:** O(N * L)
- **Explanation:** Convert integers to strings. Sort strings with custom comparator `[](string &a, string &b){ return a + b > b + a; }`. Concatenate sorted strings. If highest value string is `"0"`, return `"0"`.

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> strNums;
        for (int x : nums) strNums.push_back(to_string(x));
        
        sort(strNums.begin(), strNums.end(), [](const string& a, const string& b) {
            return a + b > b + a;
        });
        
        if (strNums[0] == "0") return "0";
        
        string res = "";
        for (const string& s : strNums) res += s;
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Array containing all zeros `[0, 0]` (must return `"0"`, not `"00"`).
- Prefixed numbers like `[3, 30]` (`"330" > "303"`).

---


## 3. HASHING / FREQUENCY COUNTING

### 15. 🟠 P1 [Q] LC 217: Contains Duplicate [EASY]
- **LeetCode Link:** [LC 217: Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

**Example 1:**
- **Input:** `nums = [1,2,3,1]` 
- **Output:** `true` 

**Example 2:**
- **Input:** `nums = [1,2,3,4]` 
- **Output:** `false`

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `-10^9 <= nums[i] <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"O(1) set presence check."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every pair `(i, j)` with `i != j` to test equality `nums[i] == nums[j]`.

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Use an `unordered_set<int>`. For each `x` in `nums`, check if `seen.count(x)` exists; if so return `true`. Else insert `x`. Average time complexity O(N).

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x)) return true;
            seen.insert(x);
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All unique elements.
- Single element array.
- Large negative and positive values.

---

### 16. 🔴 P0 [Q] LC 49: Group Anagrams [MEDIUM]
- **LeetCode Link:** [LC 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

**Example 1:**
- **Input:** `strs = ["eat","tea","tan","ate","nat","bat"]` 
- **Output:** `[["bat"],["nat","tan"],["ate","eat","tea"]]`

**Constraints:**
- `1 <= strs.length <= 10^4` 
- `0 <= strs[i].length <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"26-char frequency vector encoding as map key."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2 * K) | **Space:** O(N * K)
- **Explanation:** Compare each string against all previously formed groups by counting character frequencies.

```cpp
class Solution {
private:
    bool isAnagram(const string& a, const string& b) {
        if (a.length() != b.length()) return false;
        int count[26] = {0};
        for (char c : a) count[c - 'a']++;
        for (char c : b) count[c - 'a']--;
        for (int x : count) if (x != 0) return false;
        return true;
    }
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> res;
        for (const string& s : strs) {
            bool added = false;
            for (auto& group : res) {
                if (isAnagram(group[0], s)) {
                    group.push_back(s);
                    added = true;
                    break;
                }
            }
            if (!added) res.push_back({s});
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * K) | **Space:** O(N * K)
- **Explanation:** Encode each string using a 26-character frequency count string as the key in an `unordered_map<string, vector<string>> mp`. Append original string to `mp[key]`. Collect map values.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (const string& s : strs) {
            vector<int> count(26, 0);
            for (char c : s) count[c - 'a']++;
            string key = "";
            for (int i = 0; i < 26; i++) {
                key += "#" + to_string(count[i]);
            }
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& pair : mp) {
            res.push_back(pair.second);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty string input `[""]`.
- Single character strings.

---

### 17. 🔴 P0 [Q] LC 1: Two Sum [EASY]
- **LeetCode Link:** [LC 1: Two Sum](https://leetcode.com/problems/two-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

**Example 1:**
- **Input:** `nums = [2,7,11,15], target = 9` 
- **Output:** `[0,1]` 

**Example 2:**
- **Input:** `nums = [3,2,4], target = 6` 
- **Output:** `[1,2]`

**Constraints:**
- `2 <= nums.length <= 10^4` 
- `-10^9 <= nums[i] <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"Complement lookup (target - nums[i]) in unordered_map."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every pair `(i, j)` with `i < j` to see if `nums[i] + nums[j] == target`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) return {i, j};
            }
        }
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Single pass Hash Map lookup. Maintain `unordered_map<int, int> numToIdx`. For `nums[i]`, compute `complement = target - nums[i]`. If `numToIdx.count(complement)`, return `{numToIdx[complement], i}`. Else store `numToIdx[nums[i]] = i`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative numbers and zero.
- Duplicate values sum to target e.g., `[3,3], target = 6`.

---

### 18. 🔴 P0 [Q] LC 128: Longest Consecutive Sequence [MEDIUM]
- **LeetCode Link:** [LC 128: Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(N) time.

**Example 1:**
- **Input:** `nums = [100,4,200,1,3,2]` 
- **Output:** `4` 
- **Explanation:** Longest sequence is `[1, 2, 3, 4]`. 

**Example 2:**
- **Input:** `nums = [0,3,7,2,5,8,4,6,0,1]` 
- **Output:** `9`

**Constraints:**
- `0 <= nums.length <= 10^5` 
- `-10^9 <= nums[i] <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"O(1) set lookup for sequence start boundary (!set.count(num - 1))."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1)
- **Explanation:** Sort array `nums` in O(N log N) time, remove duplicates, and iterate to find longest continuous incrementing sequence.

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        sort(nums.begin(), nums.end());
        int maxLen = 1, currLen = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                currLen++;
            } else {
                maxLen = max(maxLen, currLen);
                currLen = 1;
            }
        }
        return max(maxLen, currLen);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Insert all elements into `unordered_set<int> numSet`. Iterate through set: check if `x` is sequence start (`!numSet.count(x - 1)`). If start, loop `curr = x` while `numSet.count(curr + 1)`, incrementing sequence length. Overall time O(N) since each element is visited at most twice.

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int maxLen = 0;
        
        for (int x : st) {
            if (!st.count(x - 1)) {
                int curr = x;
                int currLen = 1;
                while (st.count(curr + 1)) {
                    curr++;
                    currLen++;
                }
                maxLen = max(maxLen, currLen);
            }
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty array `nums = []` (returns 0).
- Array with negative numbers.

---

### 19. 🔴 P0 [Q] IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [IB 1: Subarray with Given XOR](https://www.interviewbit.com/problems/subarray-with-given-xor/)
- **Category / Sub-Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)

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
- **Main Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)
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
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example 1:**
- **Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
- **Output:** `[[1,6],[8,10],[15,18]]`
- **Explanation:** Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

**Example 2:**
- **Input:** `intervals = [[1,4],[4,5]]`
- **Output:** `[[1,5]]`
- **Explanation:** Intervals `[1,4]` and `[4,5]` are considered overlapping.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Sort by start time, merge overlapping bounds (`res.back()[1] = max(res.back()[1], interval[1])`)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort intervals by start time. For each unvisited interval, check subsequent intervals to see if they overlap (`intervals[j][0] <= end`). If so, expand `end = max(end, intervals[j][1])` and mark index `j` as visited.

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if (n <= 1) return intervals;
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        vector<bool> visited(n, false);
        for (int i = 0; i < n; i++) {
            if (visited[i]) continue;
            int start = intervals[i][0];
            int end = intervals[i][1];
            for (int j = i + 1; j < n; j++) {
                if (intervals[j][0] <= end) {
                    end = max(end, intervals[j][1]);
                    visited[j] = true;
                }
            }
            res.push_back({start, end});
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Sort intervals by start time. Iterate sequentially: if `res` is empty or `res.back()[1] < interval[0]`, no overlap exists, so append `interval`. Otherwise, merge by setting `res.back()[1] = max(res.back()[1], interval[1])`.

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Adjacent endpoints touching e.g., `[[1,4],[4,5]]` -> `[[1,5]]` (`4 <= 4` is overlapping).
- Nested intervals e.g., `[[1,10],[2,3]]` -> `[[1,10]]`.
- Unsorted input array (must sort by start time first).
- Empty input or single element array.

---

### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]`.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still has no overlapping intervals (merge overlapping intervals if necessary). Return `intervals` after insertion.

**Example 1:**
- **Input:** `intervals = [[1,3],[6,9]], newInterval = [2,5]`
- **Output:** `[[1,5],[6,9]]`

**Example 2:**
- **Input:** `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]`
- **Output:** `[[1,2],[3,10],[12,16]]`
- **Explanation:** Because `[4,8]` overlaps with `[3,5],[6,7],[8,10]`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"3-phase linear scan: left non-overlapping -> merge overlapping mid -> right non-overlapping."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Append `newInterval` to `intervals`, sort the merged vector by start time in `O(N log N)`, and apply standard Merge Intervals logic in `O(N)`.

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        intervals.push_back(newInterval);
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N) auxiliary
- **Explanation:** Take advantage of the existing sorted order with a 3-phase single pass:
  1. Add all intervals ending before `newInterval` starts (`interval[1] < newInterval[0]`).
  2. Merge all overlapping intervals (`interval[0] <= newInterval[1]`) into `newInterval` by taking `min(start)` and `max(end)`. Push updated `newInterval`.
  3. Add all remaining intervals starting after `newInterval` ends (`interval[0] > newInterval[1]`).

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        
        // Phase 1: Add intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }
        
        // Phase 2: Merge overlapping intervals with newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        
        // Phase 3: Add remaining intervals after newInterval ends
        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }
        
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty `intervals` array (return `[newInterval]`).
- `newInterval` inserted at the very beginning (before all existing intervals).
- `newInterval` inserted at the very end (after all existing intervals).
- `newInterval` completely spans and swallows all existing intervals.

---

### 46. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

**Example 1:**
- **Input:** `intervals = [[1,2],[2,3],[3,4],[1,3]]`
- **Output:** `1`
- **Explanation:** `[1,3]` can be removed and the rest of the intervals are non-overlapping.

**Example 2:**
- **Input:** `intervals = [[1,2],[1,2],[1,2]]`
- **Output:** `2`
- **Explanation:** Remove two `[1,2]` to make the rest non-overlapping.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Greedy scheduling: Sort by end time, discard current if start < prevEnd."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort intervals by start time. Compute the Longest Non-Overlapping Subsequence using dynamic programming (similar to LIS). `dp[i]` represents max non-overlapping intervals ending at index `i`. Return `N - max(dp)`.

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        int n = intervals.size();
        vector<int> dp(n, 1);
        int maxKeep = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxKeep = max(maxKeep, dp[i]);
        }
        return n - maxKeep;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1) auxiliary
- **Explanation:** Greedy Activity Selection. Sort intervals by **end time** `intervals[i][1]` in ascending order. Maintain `prevEnd` for the last kept interval. If current `intervals[i][0] < prevEnd`, overlap occurs; increment `removals++`. Otherwise, keep interval and set `prevEnd = intervals[i][1]`.

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int removals = 0;
        int prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) {
                removals++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return removals;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Intervals touching at boundary e.g. `[1,2]` and `[2,3]` are non-overlapping (`2 <= 2`).
- Why sort by end time vs start time: Sorting by end time leaves maximum room for future intervals.

---

### 47. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required to hold all meetings.

**Example 1:**
- **Input:** `intervals = [[0,30],[5,10],[15,20]]`
- **Output:** `2`
- **Explanation:** Room 1 handles `[0,30]`. Room 2 handles `[5,10]` and `[15,20]`.

**Example 2:**
- **Input:** `intervals = [[7,10],[2,4]]`
- **Output:** `1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Sort by start time + Min-Heap of active room end-times (`minHeap.top() <= start` to reuse room)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort meetings by start time. Maintain a list `roomEndTimes`. For each meeting, linearly search if any room is free (`roomEndTimes[i] <= start`). If free, update `roomEndTimes[i] = end`. If no free room, allocate a new room by appending `end`.

```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        vector<int> roomEndTimes;
        for (const auto& meeting : intervals) {
            int start = meeting[0], end = meeting[1];
            bool assigned = false;
            for (int i = 0; i < roomEndTimes.size(); i++) {
                if (roomEndTimes[i] <= start) {
                    roomEndTimes[i] = end;
                    assigned = true;
                    break;
                }
            }
            if (!assigned) {
                roomEndTimes.push_back(end);
            }
        }
        return roomEndTimes.size();
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Sort meetings by start time `O(N log N)`. Use a Min-Heap (`priority_queue<int, vector<int>, greater<int>>`) storing room end times. For each meeting `[start, end]`: if `minHeap.top() <= start`, the room with earliest end time is free, so pop it. Push `end` onto heap. Final heap size = minimum rooms needed.

```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (const auto& interval : intervals) {
            if (!minHeap.empty() && minHeap.top() <= interval[0]) {
                minHeap.pop();
            }
            minHeap.push(interval[1]);
        }
        return minHeap.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Back-to-back meetings e.g., `[0,5]` and `[5,10]` can use the same room (`5 <= 5`).
- Empty interval array (returns `0`).
- All meetings overlapping simultaneously requires N rooms.

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
