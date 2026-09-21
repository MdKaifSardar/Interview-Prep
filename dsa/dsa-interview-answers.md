# Data Structures & Algorithms Master Answer Key (91 Core + 21 Bonus Blueprints)

Companion answer key to `dsa-interview-questions.md` covering all 112 questions (91 Core + 21 Bonus Blueprints). Every single answer strictly follows our standardized 5-part framework designed for rapid revision AND deep algorithmic mastery:
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


### [BONUS 1] 🟢 P2 [BONUS] LC 289: Game of Life [MEDIUM]
- **LeetCode Link:** [LC 289: Game of Life](https://leetcode.com/problems/game-of-life/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
According to Conway's Game of Life, the board is made up of an `m x n` grid of cells, where each cell has an initial state: live (`1`) or dead (`0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules:
1. Any live cell with fewer than two live neighbors dies (under-population).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (over-population).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

The next state is created by applying the above rules simultaneously to every cell in the current state of the grid. Given the current state of the `m x n` grid `board`, update the board to its next state **in-place**.

**Example 1:**
- **Input:** `board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]`
- **Output:** `[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]`

**Example 2:**
- **Input:** `board = [[1,1],[1,0]]`
- **Output:** `[[1,1],[1,1]]`

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 25`
- `board[i][j]` is either `0` or `1`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Memory Mnemonic:** *"2-bit intermediate encoding: 0->0: 0, 1->1: 1, 1->0: 2, 0->1: 3. Modulo 2 at the end."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(M \times N)$
- **Explanation:** Create a deep copy of the original board. Count the 8 live neighbors for each cell using the cloned board, and update the values in the original board according to Conway's rules.

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        vector<vector<int>> copyBoard = board;
        int dr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[] = {-1, 0, 1, -1, 1, -1, 0, 1};
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int liveNeighbors = 0;
                for (int i = 0; i < 8; i++) {
                    int nr = r + dr[i], nc = c + dc[i];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && copyBoard[nr][nc] == 1) {
                        liveNeighbors++;
                    }
                }
                if (copyBoard[r][c] == 1) {
                    if (liveNeighbors < 2 || liveNeighbors > 3) board[r][c] = 0;
                } else {
                    if (liveNeighbors == 3) board[r][c] = 1;
                }
            }
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(1)$ auxiliary memory
- **Explanation:** Encode state transitions in-place using integers:
  - `0`: was dead, remains dead
  - `1`: was live, remains live
  - `2`: was live, now dies (`1 -> 0`)
  - `3`: was dead, now becomes live (`0 -> 1`)
  During neighbor counting, any cell with value `1` or `2` was originally alive. In a second pass, map `board[r][c] % 2` (or check for `1` and `3`) to recover the final binary state.

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        int dr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[] = {-1, 0, 1, -1, 1, -1, 0, 1};

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int liveNeighbors = 0;
                for (int i = 0; i < 8; i++) {
                    int nr = r + dr[i], nc = c + dc[i];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                        if (board[nr][nc] == 1 || board[nr][nc] == 2) liveNeighbors++;
                    }
                }
                if (board[r][c] == 1) {
                    if (liveNeighbors < 2 || liveNeighbors > 3) board[r][c] = 2; // was 1, now 0
                } else {
                    if (liveNeighbors == 3) board[r][c] = 3; // was 0, now 1
                }
            }
        }

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                board[r][c] %= 2;
            }
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- $1 \times 1$ or $1 \times 2$ matrices where neighbors are strictly limited.
- Infinite board follow-up: If the board is unbounded, store only live cell coordinates `(r, c)` in a hash set.

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


### [BONUS 2] 🟢 P2 [BONUS] LC 148: Sort List [MEDIUM]
- **LeetCode Link:** [LC 148: Sort List](https://leetcode.com/problems/sort-list/)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts)

**📜 Problem Statement & Explanation**
Given the `head` of a linked list, return the list after sorting it in ascending order. You must achieve $O(N \log N)$ time complexity and $O(\log N)$ or $O(1)$ space complexity.

**Example 1:**
- **Input:** `head = [4,2,1,3]`
- **Output:** `[1,2,3,4]`

**Example 2:**
- **Input:** `head = [-1,5,3,4,0]`
- **Output:** `[-1,0,3,4,5]`

**Constraints:**
- The number of nodes in the list is in the range $[0, 5 \times 10^4]$.
- $-10^5 \le \text{Node.val} \le 10^5$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts)
- **Memory Mnemonic:** *"Fast/slow pointer with prev unlinking to bisect list -> Recursive Merge Sort -> Dummy head merge."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(N)$
- **Explanation:** Traverse the linked list, extract all node values into a `vector<int>`, sort using `std::sort`, and write the sorted values back into the nodes.

```cpp
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head) return nullptr;
        vector<int> vals;
        ListNode* curr = head;
        while (curr) {
            vals.push_back(curr->val);
            curr = curr->next;
        }
        sort(vals.begin(), vals.end());
        curr = head;
        for (int v : vals) {
            curr->val = v;
            curr = curr->next;
        }
        return head;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(\log N)$ recursion call stack
- **Explanation:** Implement top-down Merge Sort:
  1. Base case: If `head == nullptr || head->next == nullptr`, return `head`.
  2. Use fast and slow pointers with a `prev` pointer to locate the midpoint. Unlink the left half by setting `prev->next = nullptr`.
  3. Recursively call `sortList` on left and right halves.
  4. Merge the two sorted linked lists using a dummy node.

```cpp
class Solution {
private:
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) {
                tail->next = l1;
                l1 = l1->next;
            } else {
                tail->next = l2;
                l2 = l2->next;
            }
            tail = tail->next;
        }
        tail->next = l1 ? l1 : l2;
        return dummy.next;
    }
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode* prev = nullptr;
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        prev->next = nullptr; // Disconnect left half from right half

        ListNode* left = sortList(head);
        ListNode* right = sortList(slow);
        return merge(left, right);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Failing to set `prev->next = nullptr` results in infinite recursion / stack overflow.
- Empty list (`nullptr`) and single-node list.
- Bottom-up iterative Merge Sort achieves true $O(1)$ space, but top-down is preferred in interviews unless strictly pressed for $O(1)$.

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


### [BONUS 3] 🟢 P2 [BONUS] LC 380: Insert Delete GetRandom O(1) [MEDIUM]
- **LeetCode Link:** [LC 380: Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Hash Map State Design)

**📜 Problem Statement & Explanation**
Implement the `RandomizedSet` class:
- `RandomizedSet()` Initializes the `RandomizedSet` object.
- `bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.
- `bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.
- `int getRandom()` Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.

You must implement the functions of the class such that each function works in **average $O(1)$** time complexity.

**Example 1:**
- **Input:**
  `["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]`
  `[[], [1], [2], [2], [], [1], [2], []]`
- **Output:** `[null, true, false, true, 2, true, false, 2]`

**Constraints:**
- $-2^{31} \le val \le 2^{31} - 1$
- At most $2 \times 10^5$ calls will be made to `insert`, `remove`, and `getRandom`.
- There will be at least one element in the data structure when `getRandom` is called.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Hash Map State Design)
- **Memory Mnemonic:** *"Vector for random index + Hash map for value-to-index. Swap with last element on remove."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** `insert`: $O(1)$, `remove`: $O(N)$, `getRandom`: $O(1)$ | **Space:** $O(N)$
- **Explanation:** Store values in a `vector<int>`. `insert` checks for existence using linear scan ($O(N)$) or uses `unordered_set`. On `remove`, locating and erasing an element shifts elements, causing $O(N)$ time.

```cpp
class RandomizedSetBrute {
    vector<int> nums;
public:
    bool insert(int val) {
        if (find(nums.begin(), nums.end(), val) != nums.end()) return false;
        nums.push_back(val);
        return true;
    }
    bool remove(int val) {
        auto it = find(nums.begin(), nums.end(), val);
        if (it == nums.end()) return false;
        nums.erase(it); // O(N) shift
        return true;
    }
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(1)$ average for all three methods | **Space:** $O(N)$
- **Explanation:** Maintain a `vector<int> nums` and `unordered_map<int, int> valToIdx`.
  - `insert(val)`: Check map. If absent, append `val` to `nums`, store `valToIdx[val] = nums.size() - 1`.
  - `remove(val)`: Check map. Swap `val` with `nums.back()`, update the index of `nums.back()` in the map, call `nums.pop_back()`, and erase `val` from the map.
  - `getRandom()`: Pick `rand() % nums.size()` directly from `nums` in $O(1)$.

```cpp
class RandomizedSet {
private:
    vector<int> nums;
    unordered_map<int, int> valToIdx;
public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if (valToIdx.count(val)) return false;
        nums.push_back(val);
        valToIdx[val] = nums.size() - 1;
        return true;
    }
    
    bool remove(int val) {
        if (!valToIdx.count(val)) return false;
        int idx = valToIdx[val];
        int lastVal = nums.back();

        nums[idx] = lastVal;
        valToIdx[lastVal] = idx;

        nums.pop_back();
        valToIdx.erase(val);
        return true;
    }
    
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Removing the element that is already the last element in `nums`: Updating `valToIdx[lastVal]` before or simultaneously with erasing `valToIdx.erase(val)` avoids incorrect map resurrection.

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

### 22. 🟠 P1 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
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


### [BONUS 4] 🟢 P2 [BONUS] LC 304: Range Sum Query 2D - Immutable [MEDIUM]
- **LeetCode Link:** [LC 304: Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (2D Prefix Sums)

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
- **Main Pattern:** Sub-Pattern 4.1 (2D Prefix Sums)
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


## 5. TWO POINTERS

### 25. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [LC 167: Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number.

**Example 1:**
- **Input:** `numbers = [2,7,11,15], target = 9` 
- **Output:** `[1,2]`

**Constraints:**
- `2 <= numbers.length <= 3 * 10^4` 
- `-1000 <= numbers[i] <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Opposite pointers converging inward."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking all pairs `(i, j)` with `i < j` to see if `numbers[i] + numbers[j] == target`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int n = numbers.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers[i] + numbers[j] == target) return {i + 1, j + 1};
            }
        }
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Two pointers `left = 0`, `right = n - 1`. Compute `sum = numbers[left] + numbers[right]`:
- If `sum == target`, return `{left + 1, right + 1}`.
- If `sum < target`, increment `left++` to increase sum.
- If `sum > target`, decrement `right--` to decrease sum.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative target and numbers.
- Duplicates in array.

---

### 26. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [LC 15: 3Sum](https://leetcode.com/problems/3sum/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0` without duplicates.

**Example 1:**
- **Input:** `nums = [-1,0,1,2,-1,-4]` 
- **Output:** `[[-1,-1,2],[-1,0,1]]`

**Constraints:**
- `3 <= nums.length <= 3000` 
- `-10^5 <= nums[i] <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Sorted array + outer loop + opposite pointers with duplicate skipping."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N)
- **Explanation:** Triple nested loop checking all triplets (i, j, k). Sort triplets and insert into a set to eliminate duplicate solutions.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size();
        set<vector<int>> st;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        vector<int> temp = {nums[i], nums[j], nums[k]};
                        sort(temp.begin(), temp.end());
                        st.insert(temp);
                    }
                }
            }
        }
        return vector<vector<int>>(st.begin(), st.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Sort `nums`. Loop `i` from 0 to `N - 3`. If `i > 0 && nums[i] == nums[i - 1]`, skip to avoid duplicates. Set `left = i + 1`, `right = n - 1`. While `left < right`:
- `sum = nums[i] + nums[left] + nums[right]`.
- If `sum == 0`: add triplet, skip duplicate `nums[left]` and `nums[right]` via while loops, then `left++`, `right--`.
- If `sum < 0`: `left++`.
- If `sum > 0`: `right--`.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        
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
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All zeros `[0,0,0,0]`.
- No triplets summing to 0.

---

### 27. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [LC 11: Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
You are given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container, such that the container contains the most water.

**Example 1:**
- **Input:** `height = [1,8,6,2,5,4,8,3,7]` 
- **Output:** `49`

**Constraints:**
- `n == height.length` 
- `2 <= n <= 10^5` 
- `0 <= height[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Shrinking boundary pointers, moving shorter height inward."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every pair of lines (i, j). Calculate container area = `min(height[i], height[j]) * (j - i)` and track max area.

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size(), maxW = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int h = min(height[i], height[j]);
                maxW = max(maxW, h * (j - i));
            }
        }
        return maxW;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Two Pointers starting at extremities: `left = 0`, `right = n - 1`. Area is constrained by shorter height `min(height[left], height[right]) * (right - left)`. To potentially find a larger area, we MUST move the pointer pointing to the **shorter height** inward (`left++` if `height[left] < height[right]` else `right--`).

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxW = 0;
        while (left < right) {
            int h = min(height[left], height[right]);
            maxW = max(maxW, h * (right - left));
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxW;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All heights equal.
- Heights in strictly ascending/descending order.

---

### 28. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [LC 42: Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**
- **Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]` 
- **Output:** `6`

**Constraints:**
- `n == height.length` 
- `1 <= n <= 2 * 10^4` 
- `0 <= height[i] <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Memory Mnemonic:** *"Two pointers tracking maxLeft and maxRight heights."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** For each bar i, find max height to its left (`maxLeft`) and right (`maxRight`). Trapped water at i = `min(maxLeft, maxRight) - height[i]`.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size(), water = 0;
        for (int i = 0; i < n; i++) {
            int maxLeft = 0, maxRight = 0;
            for (int j = 0; j <= i; j++) maxLeft = max(maxLeft, height[j]);
            for (int j = i; j < n; j++) maxRight = max(maxRight, height[j]);
            water += min(maxLeft, maxRight) - height[i];
        }
        return water;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Two Pointers `left = 0`, `right = n - 1`, maintaining `leftMax` and `rightMax`. While `left < right`:
- If `height[left] < height[right]`: if `height[left] >= leftMax` update `leftMax = height[left]`, else add `leftMax - height[left]` to water, then `left++`.
- Else: if `height[right] >= rightMax` update `rightMax = height[right]`, else add `rightMax - height[right]` to water, then `right--`.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Monotonically increasing or decreasing heights (0 water trapped).
- Empty height vector.

---

### 29. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [LC 75: Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given an array `nums` with `n` objects colored red, white, or blue (represented by `0`, `1`, `2`), sort them in-place so that objects of the same color are adjacent in order `0`, `1`, `2`.

**Example 1:**
- **Input:** `nums = [2,0,2,1,1,0]` 
- **Output:** `[0,0,1,1,2,2]`

**Constraints:**
- `n == nums.length` 
- `1 <= n <= 300` 
- `nums[i]` is `0`, `1`, or `2`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Memory Mnemonic:** *"Dutch National Flag 3-way low, mid, high pointer algorithm."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Two-pass Counting Sort: count frequencies of 0, 1, and 2 in first pass, then overwrite array in second pass.

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int c0 = 0, c1 = 0, c2 = 0;
        for (int x : nums) {
            if (x == 0) c0++;
            else if (x == 1) c1++;
            else c2++;
        }
        int idx = 0;
        while (c0--) nums[idx++] = 0;
        while (c1--) nums[idx++] = 1;
        while (c2--) nums[idx++] = 2;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Single-Pass Dutch National Flag Algorithm with 3 Pointers: `low = 0`, `mid = 0`, `high = n - 1`.
While `mid <= high`:
- If `nums[mid] == 0`: `swap(nums[low], nums[mid])`, `low++`, `mid++`.
- If `nums[mid] == 1`: `mid++`.
- If `nums[mid] == 2`: `swap(nums[mid], nums[high])`, `high--`.

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++; mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Array with all zeros, all ones, or all twos.
- Already sorted array.

---

### 30. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [LC 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`. Merge `nums1` and `nums2` into `nums1` as one sorted array in-place.

**Example 1:**
- **Input:** `nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3` 
- **Output:** `[1,2,2,3,5,6]`

**Constraints:**
- `nums1.length == m + n` 
- `nums2.length == n` 
- `0 <= m, n <= 200`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Memory Mnemonic:** *"Fill destination array backwards from (m + n - 1)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((M+N) log(M+N)) | **Space:** O(1)
- **Explanation:** Copy elements of `nums2` into trailing empty slots of `nums1` (from index `m` to `m + n - 1`) and call `std::sort`.

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        for (int i = 0; i < n; i++) {
            nums1[m + i] = nums2[i];
        }
        sort(nums1.begin(), nums1.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M + N) | **Space:** O(1) auxiliary
- **Explanation:** Backward Three Pointers to avoid overwriting unmerged elements: `p1 = m - 1`, `p2 = n - 1`, `p = m + n - 1`.
While `p2 >= 0`:
If `p1 >= 0 && nums1[p1] > nums2[p2]`, set `nums1[p--] = nums1[p1--]`. Else set `nums1[p--] = nums2[p2--]`.

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `m = 0` (simply copy `nums2` into `nums1`).
- `n = 0` (no-op).

---


### [BONUS 5] 🟢 P2 [BONUS] LC 18: 4Sum [MEDIUM]
- **LeetCode Link:** [LC 18: 4Sum](https://leetcode.com/problems/4sum/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Multi-Pointer Sorting & Convergence)

**📜 Problem Statement & Explanation**
Given an array `nums` of $n$ integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:
- $0 \le a, b, c, d < n$
- $a, b, c,$ and $d$ are distinct.
- `nums[a] + nums[b] + nums[c] + nums[d] == target`
You may return the answer in any order. The solution set must not contain duplicate quadruplets.

**Example 1:**
- **Input:** `nums = [1,0,-1,0,-2,2], target = 0`
- **Output:** `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`

**Example 2:**
- **Input:** `nums = [2,2,2,2,2], target = 8`
- **Output:** `[[2,2,2,2]]`

**Constraints:**
- $1 \le nums.length \le 200$
- $-10^9 \le nums[i] \le 10^9$
- $-10^9 \le target \le 10^9$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Multi-Pointer Sorting & Convergence)
- **Memory Mnemonic:** *"Sort -> Two outer loops + Two-pointer convergence inner loop. Skip duplicates at all 4 levels + use long long for sum."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^4 \log K)$ | **Space:** $O(K)$
- **Explanation:** Run 4 nested loops over indices $i, j, k, l$. Check if the sum equals `target`. To ensure uniqueness, sort each quadruplet and insert into `std::set`.

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        set<vector<int>> s;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    for (int l = k + 1; l < n; l++) {
                        long long sum = (long long)nums[i] + nums[j] + nums[k] + nums[l];
                        if (sum == target) {
                            vector<int> quad = {nums[i], nums[j], nums[k], nums[l]};
                            sort(quad.begin(), quad.end());
                            s.insert(quad);
                        }
                    }
                }
            }
        }
        return vector<vector<int>>(s.begin(), s.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N^3)$ | **Space:** $O(1)$ auxiliary memory
- **Explanation:**
  1. Sort `nums`.
  2. Fix outer index $i$ from `0` to `n-4`. If $i > 0$ and `nums[i] == nums[i-1]`, skip.
  3. Fix second index $j$ from `i+1` to `n-3`. If $j > i+1$ and `nums[j] == nums[j-1]`, skip.
  4. Use two pointers `left = j + 1` and `right = n - 1`. Calculate `long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right]`.
  5. If `sum == target`, record the quadruplet, and increment `left` (skipping duplicates) and decrement `right` (skipping duplicates).
  6. If `sum < target`, increment `left`; if `sum > target`, decrement `right`.

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> res;
        if (n < 4) return res;
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[left], nums[right]});
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- 32-bit signed integer overflow when summing 4 numbers near $10^9$. Casting to `long long` is mandatory.
- Arrays with fewer than 4 elements.

---


## 6. SLIDING WINDOW

### 31. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [LC 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given a string `s`, find the length of the longest substring without repeating characters.

**Example 1:**
- **Input:** `s = "abcabcbb"` 
- **Output:** `3` 
- **Explanation:** Longest substring is `"abc"`.

**Constraints:**
- `0 <= s.length <= 5 * 10^4` 
- `s` consists of English letters, digits, symbols and spaces.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right, shrink left when duplicate character found."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N)
- **Explanation:** Generate all substrings `s[i...j]`. For each substring, check if it contains duplicate characters using a set.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                unordered_set<char> st;
                bool valid = true;
                for (int k = i; k <= j; k++) {
                    if (st.count(s[k])) { valid = false; break; }
                    st.insert(s[k]);
                }
                if (valid) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window with Index Table `lastSeen[256]` initialized to -1. `left = 0`, `maxLen = 0`.
Iterate `right` from 0 to `N - 1`: if character `s[right]` was seen at index `>= left`, jump `left = lastSeen[s[right]] + 1`. Update `lastSeen[s[right]] = right` and `maxLen = max(maxLen, right - left + 1)`.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(256, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (lastSeen[s[right]] >= left) {
                left = lastSeen[s[right]] + 1;
            }
            lastSeen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty string `""` (returns 0).
- All characters identical `"bbbbb"` (returns 1).

---

### 32. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [LC 209: Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0`.

**Example 1:**
- **Input:** `target = 7, nums = [2,3,1,2,4,3]` 
- **Output:** `2` 
- **Explanation:** Subarray `[4,3]` has minimal length 2.

**Constraints:**
- `1 <= target <= 10^9` 
- `1 <= nums.length <= 10^5` 
- `1 <= nums[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right until sum >= target, shrink left to minimize length."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops computing sum of every subarray starting at `i`. Update minimum length when `sum >= target`.

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size(), minLen = INT_MAX;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum >= target) {
                    minLen = min(minLen, j - i + 1);
                    break;
                }
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Variable Sliding Window: `left = 0`, `sum = 0`, `minLen = INT_MAX`.
Expand `right` pointer adding `nums[right]` to `sum`. While `sum >= target`: update `minLen = min(minLen, right - left + 1)`, subtract `nums[left]` from `sum` and shrink `left++`. Return `minLen == INT_MAX ? 0 : minLen`.

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, minLen = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Total sum of array < target (returns 0).
- Single element >= target.

---

### 33. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [LC 76: Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given two strings `s` and `t` of lengths `m` and `n`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return `""`.

**Example 1:**
- **Input:** `s = "ADOBECODEBANC", t = "ABC"` 
- **Output:** `"BANC"`

**Constraints:**
- `m == s.length`, `n == t.length` 
- `1 <= m, n <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Gold-standard variable window with required match counter."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(1) auxiliary
- **Explanation:** Check all $O(N^2)$ substrings of `s`. For each substring, count character frequencies and compare against `t` in $O(N)$.

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        int m = s.length(), n = t.length();
        if (m < n) return "";
        int target[128] = {0};
        for (char c : t) target[c]++;
        
        string minStr = "";
        int minLen = INT_MAX;
        
        for (int i = 0; i < m; i++) {
            for (int j = i; j < m; j++) {
                int curr[128] = {0};
                for (int k = i; k <= j; k++) curr[s[k]]++;
                bool valid = true;
                for (int c = 0; c < 128; c++) {
                    if (curr[c] < target[c]) { valid = false; break; }
                }
                if (valid && (j - i + 1) < minLen) {
                    minLen = j - i + 1;
                    minStr = s.substr(i, minLen);
                }
            }
        }
        return minStr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(|S| + |T|) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window with Character Match Counter:
1. Build `targetCount[128]` for string `t`. Track `required` distinct character count.
2. Expand `right` pointer: increment `windowCount[s[right]]`. If `windowCount[c] == targetCount[c]`, `formed++`.
3. While `formed == required`: record minimum window length, then shrink `left` pointer. If `windowCount[s[left]] < targetCount[s[left]]`, decrement `formed`. `left++`.

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";
        vector<int> targetCount(128, 0);
        for (char c : t) targetCount[c]++;
        
        int required = 0;
        for (int i = 0; i < 128; i++) if (targetCount[i] > 0) required++;
        
        vector<int> windowCount(128, 0);
        int formed = 0;
        int left = 0, minLen = INT_MAX, startIdx = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            windowCount[c]++;
            if (targetCount[c] > 0 && windowCount[c] == targetCount[c]) {
                formed++;
            }
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char leftChar = s[left];
                windowCount[leftChar]--;
                if (targetCount[leftChar] > 0 && windowCount[leftChar] < targetCount[leftChar]) {
                    formed--;
                }
                left++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(startIdx, minLen);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `|S| < |T|` (returns `""`).
- String `s` equals `t`.
- `t` contains duplicate characters.

---

### 34. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [LC 438: Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)

**📜 Problem Statement & Explanation**
Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.

**Example 1:**
- **Input:** `s = "cbaebabacd", p = "abc"` 
- **Output:** `[0,6]` 
- **Explanation:** Substrings starting at index 0 (`"cba"`) and index 6 (`"bac"`) are anagrams.

**Constraints:**
- `1 <= s.length, p.length <= 3 * 10^4` 
- `s` and `p` consist of lowercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)
- **Memory Mnemonic:** *"Fixed window of size |P| with 26-char frequency comparison."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((N - K) * K log K) | **Space:** O(K)
- **Explanation:** For every substring of length `k = p.length()`, sort the substring and compare with sorted `p`.

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        int n = s.length(), k = p.length();
        if (n < k) return res;
        string sortedP = p;
        sort(sortedP.begin(), sortedP.end());
        for (int i = 0; i <= n - k; i++) {
            string sub = s.substr(i, k);
            sort(sub.begin(), sub.end());
            if (sub == sortedP) res.push_back(i);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Fixed-Size Sliding Window of size `k = p.length()`:
Maintain two frequency vectors `pCount[26]` and `sCount[26]`. Populate `pCount` and initial window in `sCount`. Slide window from index `i = k` to `N - 1`: add `s[i]` frequency, remove `s[i - k]` frequency. If `pCount == sCount`, record start index `i - k + 1`.

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.length(), k = p.length();
        if (n < k) return {};
        vector<int> pCount(26, 0), sCount(26, 0), res;
        for (int i = 0; i < k; i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }
        if (pCount == sCount) res.push_back(0);
        for (int i = k; i < n; i++) {
            sCount[s[i] - 'a']++;
            sCount[s[i - k] - 'a']--;
            if (pCount == sCount) res.push_back(i - k + 1);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `|S| < |P|` (returns empty array).
- `s` and `p` have identical lengths.

---

### 35. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [LC 1004: Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Example 1:**
- **Input:** `nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2` 
- **Output:** `6`

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `nums[i]` is either `0` or `1` 
- `0 <= k <= nums.length`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track zero count in window; shrink left when zero count > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every subarray starting at index i. Count zeros until zero count exceeds k.

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int n = nums.size(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            int zeros = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) zeros++;
                if (zeros <= k) maxLen = max(maxLen, j - i + 1);
                else break;
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window tracking zero count: `left = 0`, `zeroCount = 0`, `maxLen = 0`.
Iterate `right` from 0 to `N - 1`: if `nums[right] == 0`, `zeroCount++`. While `zeroCount > k`: if `nums[left] == 0` decrement `zeroCount`, then `left++`. Update `maxLen = max(maxLen, right - left + 1)`.

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;
        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) zeroCount++;
            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 0` (standard longest consecutive ones).
- Array with all zeros.

---

### 36. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [LC 424: Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Return the length of the longest substring containing the same letter.

**Example 1:**
- **Input:** `s = "ABAB", k = 2` 
- **Output:** `4` 
- **Explanation:** Replace 2 'A's with 'B's or vice versa.

**Constraints:**
- `1 <= s.length <= 10^5` 
- `s` consists of uppercase English letters. 
- `0 <= k <= s.length`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track max_freq in window; shrink left when (window_len - max_freq) > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Check all substrings `s[i...j]`. Find max character frequency `maxFreq`. Replacements required = `(windowLen - maxFreq)`. If `<= k`, update max length.

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int n = s.length(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            int count[26] = {0}, maxFreq = 0;
            for (int j = i; j < n; j++) {
                count[s[j] - 'A']++;
                maxFreq = max(maxFreq, count[s[j] - 'A']);
                int changesNeeded = (j - i + 1) - maxFreq;
                if (changesNeeded <= k) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window: `left = 0`, `maxFreq = 0`, `maxLen = 0`. Character count vector `count[26]`.
Expand `right`: `count[s[right] - 'A']++`, update `maxFreq = max(maxFreq, count[s[right] - 'A'])`.
If `(right - left + 1 - maxFreq) > k`: decrement `count[s[left] - 'A']` and shrink `left++`. Update `maxLen`.

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            count[s[right] - 'A']++;
            maxFreq = max(maxFreq, count[s[right] - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 0`.
- String with all identical characters.

---


### [BONUS 6] 🟢 P2 [BONUS] LC 992: Subarrays with K Different Integers [HARD]
- **LeetCode Link:** [LC 992: Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Variable-Size / Reduction Windows)

**📜 Problem Statement & Explanation**
Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`. A good array is an array where the number of different integers in that array is exactly `k`.

**Example 1:**
- **Input:** `nums = [1,2,1,2,3], k = 2`
- **Output:** `7`
- **Explanation:** Subarrays formed with exactly 2 different integers: `[1,2]`, `[2,1]`, `[1,2]`, `[2,3]`, `[1,2,1]`, `[2,1,2]`, `[1,2,1,2]`.

**Example 2:**
- **Input:** `nums = [1,2,1,3,4], k = 3`
- **Output:** `3`

**Constraints:**
- $1 \le nums.length \le 2 \times 10^4$
- $1 \le nums[i], k \le nums.length$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.2 (Variable-Size / Reduction Windows)
- **Memory Mnemonic:** *"exact(k) = atMost(k) - atMost(k - 1). Window of size (r - l + 1) contributes all subarrays ending at r."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^2)$ | **Space:** $O(K)$
- **Explanation:** Generate all possible subarrays using two nested loops. Maintain an `unordered_set<int>` for each starting point. When `set.size() == k`, increment the answer count. Break early if `set.size() > k`.

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size(), count = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> unique;
            for (int j = i; j < n; j++) {
                unique.insert(nums[j]);
                if (unique.size() == k) count++;
                else if (unique.size() > k) break;
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$ frequency array / map
- **Explanation:** Finding subarrays with *exactly* $k$ unique elements directly with sliding window is tricky because shrinking the window doesn't monotonically decrease the number of valid subarrays.
  Instead, notice that:
  $$\text{exact}(k) = \text{atMost}(k) - \text{atMost}(k - 1)$$
  In `atMost(k)`, we maintain a window `[left, right]` with at most $k$ distinct elements. Every time we expand `right`, the number of new valid subarrays ending at `right` is `(right - left + 1)`.

```cpp
class Solution {
private:
    int atMost(vector<int>& nums, int k) {
        if (k <= 0) return 0;
        int n = nums.size(), left = 0, count = 0;
        unordered_map<int, int> freq;

        for (int right = 0; right < n; right++) {
            if (freq[nums[right]]++ == 0) {
                k--;
            }
            while (k < 0) {
                if (--freq[nums[left]] == 0) {
                    k++;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- $k = 1$: `atMost(0)` must correctly return `0`.
- Array where all elements are identical.

---


## 7. BINARY SEARCH

### 37. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [LC 704: Binary Search](https://leetcode.com/problems/binary-search/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. Return its index if target exists, else return `-1`.

**Example 1:**
- **Input:** `nums = [-1,0,3,5,9,12], target = 9` 
- **Output:** `4`

**Constraints:**
- `1 <= nums.length <= 10^4` 
- `-10^4 < nums[i], target < 10^4` 
- All integers in `nums` are unique.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)
- **Memory Mnemonic:** *"Classic low <= high midpoint search."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Linear scan through array checking `nums[i] == target`.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** Binary Search: `low = 0`, `high = n - 1`.
While `low <= high`: `mid = low + (high - low) / 2`.
- If `nums[mid] == target`, return `mid`.
- If `nums[mid] < target`, `low = mid + 1`.
- If `nums[mid] > target`, `high = mid - 1`.
Return -1 if not found.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Target at `low` (index 0) or `high` (index `n-1`).
- Single element array.
- Target absent.

---

### 38. 🔴 P0 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [LC 33: Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given a rotated sorted array `nums` of unique values and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.

**Example 1:**
- **Input:** `nums = [4,5,6,7,0,1,2], target = 0` 
- **Output:** `4`

**Constraints:**
- `1 <= nums.length <= 5000` 
- All values of `nums` are unique.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Memory Mnemonic:** *"Compare mid with left/right to determine sorted half."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Linear scan through array.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** Modified Binary Search: `low = 0`, `high = n - 1`. `mid = low + (high - low) / 2`.
- If `nums[mid] == target`, return `mid`.
- If `nums[low] <= nums[mid]` (Left Half Sorted): if `nums[low] <= target && target < nums[mid]`, `high = mid - 1`, else `low = mid + 1`.
- Else (Right Half Sorted): if `nums[mid] < target && target <= nums[high]`, `low = mid + 1`, else `high = mid - 1`.

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Unrotated array.
- Single element array.

---

### 39. 🔴 P0 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [LC 153: Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given a rotated sorted array `nums` of unique elements, return the minimum element of this array.

**Example 1:**
- **Input:** `nums = [3,4,5,1,2]` 
- **Output:** `1`

**Constraints:**
- `n == nums.length` 
- `1 <= n <= 5000` 
- All integers in `nums` are unique.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Memory Mnemonic:** *"Compare mid with high (mid > high => min in right half)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Linear scan finding minimum value in vector.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int minVal = nums[0];
        for (int x : nums) minVal = min(minVal, x);
        return minVal;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** Binary Search: `low = 0`, `high = n - 1`.
While `low < high`: `mid = low + (high - low) / 2`.
- If `nums[mid] > nums[high]`: minimum must be in right unsorted portion $\implies$ `low = mid + 1`.
- Else: minimum is in left portion including `mid` $\implies$ `high = mid`.
Return `nums[low]`.

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Array not rotated e.g., `[1,2,3,4,5]`.
- Single element array.

---

### 40. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [LC 875: Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Koko can decide her banana-eating speed of `k` per hour. Each hour, she chooses a pile and eats `k` bananas. Return the minimum integer `k` such that she can eat all bananas within `h` hours.

**Example 1:**
- **Input:** `piles = [3,6,7,11], h = 8` 
- **Output:** `4`

**Constraints:**
- `1 <= piles.length <= 10^4` 
- `piles.length <= h <= 10^9` 
- `1 <= piles[i] <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Memory Mnemonic:** *"Binary search speed range [1, max_piles]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(max(piles) * N) | **Space:** O(1)
- **Explanation:** Iterate speed k linearly from 1 to max(piles). Calculate total hours = sum(ceil(pile / k)). First k satisfying hours <= h is answer.

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int maxP = *max_element(piles.begin(), piles.end());
        for (int speed = 1; speed <= maxP; speed++) {
            long long hours = 0;
            for (int p : piles) hours += (p + speed - 1) / speed;
            if (hours <= h) return speed;
        }
        return maxP;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log(max(piles))) | **Space:** O(1) auxiliary
- **Explanation:** Binary Search on Answer Space: speed range `low = 1`, `high = max(piles)`.
For candidate `mid = speed`: compute `hours = sum(ceil(pile / mid))`. If `hours <= h`, speed is sufficient, try smaller speed (`ans = mid`, `high = mid - 1`). Else (`low = mid + 1`).

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1, high = *max_element(piles.begin(), piles.end());
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            long long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `h == piles.length` (speed MUST be `max(piles)`).
- Large `h` values.

---

### 41. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [LC 1011: Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
A conveyor belt has packages that must be shipped within `days` days. Return the least weight capacity of the ship that will result in all packages being shipped within `days` days.

**Example 1:**
- **Input:** `weights = [1,2,3,4,5,6,7,8,9,10], days = 5` 
- **Output:** `15`

**Constraints:**
- `1 <= days <= weights.length <= 5 * 10^4` 
- `1 <= weights[i] <= 500`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Memory Mnemonic:** *"Binary search capacity range [max_weight, sum_weight]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(sum(weights) * N) | **Space:** O(1)
- **Explanation:** Try capacity linearly from `max(weights)` to `sum(weights)`. Simulate shipping for each capacity until required days <= `days`.

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = *max_element(weights.begin(), weights.end());
        int high = 0;
        for (int w : weights) high += w;
        
        for (int cap = low; cap <= high; cap++) {
            int neededDays = 1, currLoad = 0;
            for (int w : weights) {
                if (currLoad + w > cap) {
                    neededDays++;
                    currLoad = 0;
                }
                currLoad += w;
            }
            if (neededDays <= days) return cap;
        }
        return high;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log(sum(weights))) | **Space:** O(1) auxiliary
- **Explanation:** Binary Search on Capacity: `low = max(weights)`, `high = sum(weights)`.
For capacity `mid`: simulate shipping. If adding `w` exceeds `mid`, increment `neededDays` and reset `currLoad`. If `neededDays <= days`, capacity is valid (`ans = mid`, `high = mid - 1`), else `low = mid + 1`.

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = *max_element(weights.begin(), weights.end());
        int high = 0;
        for (int w : weights) high += w;
        int ans = high;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int neededDays = 1, currLoad = 0;
            for (int w : weights) {
                if (currLoad + w > mid) {
                    neededDays++;
                    currLoad = 0;
                }
                currLoad += w;
            }
            if (neededDays <= days) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `days = 1` (capacity must equal `sum(weights)`).
- `days = weights.length` (capacity equals `max(weights)`).

---

### 42. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [LC 74: Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given an `m x n` integer matrix `matrix` where each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the previous row, search for `target`.

**Example 1:**
- **Input:** `matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3` 
- **Output:** `true`

**Constraints:**
- `m == matrix.length`, `n == matrix[i].length` 
- `1 <= m, n <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Memory Mnemonic:** *"Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(1)
- **Explanation:** Nested loops traversing every element in the grid.

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (auto& row : matrix) {
            for (int x : row) {
                if (x == target) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log(M * N)) | **Space:** O(1) auxiliary
- **Explanation:** Virtual 1D Binary Search on $M \times N$ grid:
Range `low = 0`, `high = M * N - 1`. Virtual index `mid` maps to 2D cell `r = mid / n` and `c = mid % n`. Compare `matrix[r][c]` with `target` using standard binary search.

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        int low = 0, high = m * n - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single row / single column matrix.
- Target smaller than first element or larger than last element.

---

### 43. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [LC 162: Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element, and return its index.

**Example 1:**
- **Input:** `nums = [1,2,3,1]` 
- **Output:** `2`

**Constraints:**
- `1 <= nums.length <= 1000` 
- `nums[i] != nums[i + 1]` for all valid `i`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Memory Mnemonic:** *"Compare nums[mid] with nums[mid + 1] on unsorted array."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Linear scan finding first index i where `nums[i] > nums[i + 1]`.

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] > nums[i + 1]) return i;
        }
        return nums.size() - 1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** Binary Search on Slope: `low = 0`, `high = n - 1`.
Compare `nums[mid]` with `nums[mid + 1]`:
- If `nums[mid] < nums[mid + 1]`: ascending slope, peak MUST exist to the right $\implies$ `low = mid + 1`.
- Else: descending slope, peak exists at `mid` or to the left $\implies$ `high = mid`.
Return `low`.

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array.
- Monotonically increasing or decreasing array.

---


### [BONUS 7] 🟢 P2 [BONUS] LC 4: Median of Two Sorted Arrays [HARD]
- **LeetCode Link:** [LC 4: Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Binary Search on Answer Space / Partitions)

**📜 Problem Statement & Explanation**
Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be $O(\log (m+n))$.

**Example 1:**
- **Input:** `nums1 = [1,3], nums2 = [2]`
- **Output:** `2.00000`
- **Explanation:** merged array = `[1,2,3]` and median is `2`.

**Example 2:**
- **Input:** `nums1 = [1,2], nums2 = [3,4]`
- **Output:** `2.50000`
- **Explanation:** merged array = `[1,2,3,4]` and median is `(2 + 3) / 2 = 2.5`.

**Constraints:**
- `nums1.length == m`, `nums2.length == n`
- $0 \le m \le 1000$, $0 \le n \le 1000$
- $1 \le m + n \le 2000$
- $-10^6 \le nums1[i], nums2[i] \le 10^6$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Binary Search on Answer Space / Partitions)
- **Memory Mnemonic:** *"Binary search partition on smaller array. LeftMaxA <= RightMinB and LeftMaxB <= RightMinA."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M + N)$ | **Space:** $O(M + N)$
- **Explanation:** Merge both arrays using the standard two-pointer merge algorithm into a single sorted array of size $M + N$. Return the middle element (for odd length) or the average of the two middle elements (for even length).

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<int> merged;
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) merged.push_back(nums1[i++]);
            else merged.push_back(nums2[j++]);
        }
        while (i < m) merged.push_back(nums1[i++]);
        while (j < n) merged.push_back(nums2[j++]);

        int total = m + n;
        if (total % 2 == 1) return merged[total / 2];
        return (merged[total / 2 - 1] + merged[total / 2]) / 2.0;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(\log(\min(M, N)))$ | **Space:** $O(1)$
- **Explanation:**
  1. Ensure `nums1` is the shorter array (if not, swap).
  2. Perform binary search for partition `cut1` in `nums1` in range `[0, m]`.
  3. Set `cut2 = (m + n + 1) / 2 - cut1`.
  4. Define boundary elements:
     - `l1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1]`
     - `r1 = (cut1 == m) ? INT_MAX : nums1[cut1]`
     - `l2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1]`
     - `r2 = (cut2 == n) ? INT_MAX : nums2[cut2]`
  5. If `l1 <= r2` and `l2 <= r1`:
     - If total elements is odd: `return max(l1, l2)`.
     - If total elements is even: `return (max(l1, l2) + min(r1, r2)) / 2.0`.
  6. If `l1 > r2`, move binary search left (`high = cut1 - 1`).
  7. Else, move binary search right (`low = cut1 + 1`).

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = (m + n + 1) / 2 - cut1;

            int l1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1];
            int r1 = (cut1 == m) ? INT_MAX : nums1[cut1];
            int l2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1];
            int r2 = (cut2 == n) ? INT_MAX : nums2[cut2];

            if (l1 <= r2 && l2 <= r1) {
                if ((m + n) % 2 == 1) return max(l1, l2);
                return (max(l1, l2) + min(r1, r2)) / 2.0;
            } else if (l1 > r2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }
        return 0.0;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- One array is completely empty: Handling `INT_MIN` / `INT_MAX` sentinels correctly prevents indexing bugs.
- Division by 2 must use `2.0` to avoid integer truncation.

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

### [BONUS 8] 🟢 P2 [BONUS] LC 986: Interval List Intersections [MEDIUM]
- **LeetCode Link:** [LC 986: Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Sweeps & Intersections)

**📜 Problem Statement & Explanation**
You are given two lists of closed intervals, `firstList` and `secondList`, where `firstList[i] = [start_i, end_i]` and `secondList[j] = [start_j, end_j]`. Each list of intervals is pairwise disjoint and in sorted order.
Return the intersection of these two interval lists.

**Example 1:**
- **Input:** `firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]`
- **Output:** `[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`

**Example 2:**
- **Input:** `firstList = [[1,3],[5,9]], secondList = []`
- **Output:** `[]`

**Constraints:**
- $0 \le firstList.length, secondList.length \le 1000$
- `firstList[i].length == 2`, `secondList[j].length == 2`
- $0 \le start_i < end_i \le 10^9$
- $0 \le start_j < end_j \le 10^9$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Interval Sweeps & Intersections)
- **Memory Mnemonic:** *"Overlap start = max(A.start, B.start), Overlap end = min(A.end, B.end). Advance the one that ends first."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(1)$ auxiliary
- **Explanation:** Check all pairs $(i, j)$ using nested loops. For each pair, calculate `start = max(firstList[i][0], secondList[j][0])` and `end = min(firstList[i][1], secondList[j][1])`. If `start <= end`, record `[start, end]`.

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        for (const auto& a : firstList) {
            for (const auto& b : secondList) {
                int start = max(a[0], b[0]);
                int end = min(a[1], b[1]);
                if (start <= end) {
                    res.push_back({start, end});
                }
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M + N)$ | **Space:** $O(1)$ auxiliary memory
- **Explanation:** Because both lists are already sorted and disjoint, use two pointers `i` and `j`:
  1. Potential overlap: `start = max(firstList[i][0], secondList[j][0])`, `end = min(firstList[i][1], secondList[j][1])`.
  2. If `start <= end`, add `[start, end]` to result.
  3. Discard the interval that ends earlier: if `firstList[i][1] < secondList[j][1]`, increment `i`; otherwise increment `j`.

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        int i = 0, j = 0;
        int m = firstList.size(), n = secondList.size();

        while (i < m && j < n) {
            int start = max(firstList[i][0], secondList[j][0]);
            int end = min(firstList[i][1], secondList[j][1]);

            if (start <= end) {
                res.push_back({start, end});
            }

            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Closed intervals mean single-point intersections (e.g., `[5, 5]`) are valid.
- One or both lists empty returns `[]`.

---


## 9. FAST & SLOW POINTERS (LINKED LIST)

### 48. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [LC 141: Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

**Example 1:**
- **Input:** `head = [3,2,0,-4], pos = 1` 
- **Output:** `true` 
- **Explanation:** There is a cycle in the linked list, where tail connects to the 1st node (0-indexed).

**Constraints:**
- Number of nodes in list is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Fast pointer moves 2 steps, slow moves 1 step; collision = cycle."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Traverse linked list using a pointer while inserting visited `ListNode*` addresses into `unordered_set<ListNode*> visited`. If a node address is already in the set, a cycle exists.

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode* curr = head;
        while (curr != nullptr) {
            if (visited.count(curr)) return true;
            visited.insert(curr);
            curr = curr->next;
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Floyd's Cycle Detection Algorithm (Tortoise & Hare):
Initialize `slow = head` and `fast = head`. Move `slow` by 1 step (`slow = slow->next`) and `fast` by 2 steps (`fast = fast->next->next`). If `fast` or `fast->next` becomes null, no cycle exists. If `slow == fast`, a cycle is detected!

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty list `head = nullptr`.
- Single node without cycle.
- Two nodes with cycle.

---

### 49. 🔴 P0 [Q] LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [LC 142: Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

**Example 1:**
- **Input:** `head = [3,2,0,-4], pos = 1` 
- **Output:** `tail connects to node index 1`

**Constraints:**
- Number of nodes in list is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Floyd's cycle detection + entry point recovery."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Traverse list with `unordered_set<ListNode*> visited`. Return the first node address encountered that is already in set.

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode* curr = head;
        while (curr != nullptr) {
            if (visited.count(curr)) return curr;
            visited.insert(curr);
            curr = curr->next;
        }
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Floyd's Cycle Entry Recovery Algorithm:
1. Detect collision using `slow` (1 step) and `fast` (2 steps).
2. If collision occurs, reset `slow = head` while keeping `fast` at collision point.
3. Move both `slow` and `fast` 1 step at a time. The node where they meet again is the exact start of the cycle!

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;
        ListNode *slow = head, *fast = head;
        bool hasCycle = false;
        
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        if (!hasCycle) return nullptr;
        
        slow = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- No cycle.
- Entire list is a cycle (head is cycle entry).

---

### 50. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [LC 143: Reorder List](https://leetcode.com/problems/reorder-list/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
You are given the head of a singly linked list `L0 -> L1 -> ... -> Ln-1 -> Ln`. Reorder the list to be: `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...` in-place.

**Example 1:**
- **Input:** `head = [1,2,3,4]` 
- **Output:** `[1,4,2,3]` 

**Example 2:**
- **Input:** `head = [1,2,3,4,5]` 
- **Output:** `[1,5,2,4,3]`

**Constraints:**
- Number of nodes in list is in range `[1, 5 * 10^4]` 
- `1 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Midpoint split + reverse second half + alternate weaving."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Store node pointers in `vector<ListNode*> nodes`. Re-link nodes using two pointers `left = 0` and `right = n - 1` alternating inward.

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head) return;
        vector<ListNode*> nodes;
        ListNode* curr = head;
        while (curr) {
            nodes.push_back(curr);
            curr = curr->next;
        }
        int left = 0, right = nodes.size() - 1;
        while (left < right) {
            nodes[left]->next = nodes[right];
            left++;
            if (left == right) break;
            nodes[right]->next = nodes[left];
            right--;
        }
        nodes[left]->next = nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 3-Step In-Place Weaving:
1. **Find Midpoint:** Use fast/slow pointers to split list into two halves.
2. **Reverse 2nd Half:** Reverse second half in-place using `prev`, `curr`, `next` pointers.
3. **Interleave/Weave:** Alternate pointers `first` (from 1st half) and `second` (from reversed 2nd half).

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        
        // Step 1: Find midpoint
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // Step 2: Reverse second half
        ListNode *prev = nullptr, *curr = slow->next;
        slow->next = nullptr;
        while (curr) {
            ListNode *nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        
        // Step 3: Weave two halves
        ListNode *first = head, *second = prev;
        while (second) {
            ListNode *tmp1 = first->next;
            ListNode *tmp2 = second->next;
            
            first->next = second;
            second->next = tmp1;
            
            first = tmp1;
            second = tmp2;
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node or 2-node list.
- Odd vs even total node counts.

---


### [BONUS 9] 🟢 P2 [BONUS] LC 287: Find the Duplicate Number [MEDIUM]
- **LeetCode Link:** [LC 287: Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection on Functional Graphs)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is only one repeated number in `nums`, return this repeated number.
You must solve the problem **without modifying** the array `nums` and using only **$O(1)$ constant extra space**.

**Example 1:**
- **Input:** `nums = [1,3,4,2,2]`
- **Output:** `2`

**Example 2:**
- **Input:** `nums = [3,1,3,4,2]`
- **Output:** `3`

**Constraints:**
- $1 \le n \le 10^5$
- `nums.length == n + 1`
- $1 \le nums[i] \le n$
- All integers in `nums` appear only once except for precisely one integer which appears two or more times.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Cycle Detection on Functional Graphs)
- **Memory Mnemonic:** *"Floyd's Tortoise & Hare on Array: index -> nums[index]. Intersection -> Reset slow to 0 -> Meet at cycle start."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ or $O(N)$ with set | **Space:** $O(N)$ (or $O(1)$ with sorting, but sorting violates the "do not modify array" constraint)
- **Explanation:** Use an `unordered_set<int>` to store visited numbers. The first number that already exists in the set is the duplicate.

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return num;
            seen.insert(num);
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(1)$ extra space, zero array modification
- **Explanation:** Interpret the array as a linked list where `nums[i]` represents `node->next`. Because values are in range `[1, n]` and the array length is `n + 1`, index `0` can never be inside a cycle (since no value is `0`). A duplicate value means multiple indices point to the same value, forming a cycle entrance.
  1. Phase 1 (Find intersection): `slow = nums[slow]`, `fast = nums[nums[fast]]`.
  2. Phase 2 (Find cycle entrance): Reset `slow = 0`. Advance both pointers by 1 step (`slow = nums[slow]`, `fast = nums[fast]`) until they meet. The meeting point is the duplicate value.

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];

        // Phase 1: Detect cycle
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Phase 2: Find entrance to cycle
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Modifying the array (e.g. sign negation `nums[abs(x)] = -nums[abs(x)]`) is strictly prohibited by problem constraints.
- Why does index 0 never belong to a cycle? Because values are $\ge 1$, no element can point to index 0.

---


## 10. MONOTONIC STACK

### 51. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [LC 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

**Example 1:**
- **Input:** `s = "()[]{}"` 
- **Output:** `true` 

**Example 2:**
- **Input:** `s = "(]"` 
- **Output:** `false`

**Constraints:**
- `1 <= s.length <= 10^4` 
- `s` consists of parentheses only `()[]{}`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Memory Mnemonic:** *"Push opening brackets, pop matching closing brackets."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Repeatedly find and replace matching pairs `()`, `{}`, `[]` with empty string `""` until no pairs remain. If remaining string is empty, valid.

```cpp
class Solution {
public:
    bool isValid(string s) {
        while (s.find("()") != string::npos || s.find("{}") != string::npos || s.find("[]") != string::npos) {
            size_t p1 = s.find("()");
            if (p1 != string::npos) s.erase(p1, 2);
            size_t p2 = s.find("{}");
            if (p2 != string::npos) s.erase(p2, 2);
            size_t p3 = s.find("[]");
            if (p3 != string::npos) s.erase(p3, 2);
        }
        return s.empty();
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Stack Matching:
Traverse characters in `s`: push opening brackets `'('`, `'{'`, `'['`. For closing brackets, check if `st.empty()` or top does not match corresponding opening bracket; if so return `false`. Else pop `st.top()`. Return `st.empty()` at end.

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- String starting with closing bracket.
- Odd length strings.

---

### 52. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [LC 739: Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.

**Example 1:**
- **Input:** `temperatures = [73,74,75,71,69,72,76,73]` 
- **Output:** `[1,1,4,2,1,1,0,0]`

**Constraints:**
- `1 <= temperatures.length <= 10^5` 
- `30 <= temperatures[i] <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Memory Mnemonic:** *"Monotonic decreasing stack storing indices."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** For each day i, run an inner loop over future days `j > i` until `temperatures[j] > temperatures[i]`. Distance is `j - i`.

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    res[i] = j - i;
                    break;
                }
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Monotonic Decreasing Stack storing day indices:
Iterate `i` from 0 to `N - 1`. While stack is not empty and `temperatures[i] > temperatures[st.top()]`: pop top index `prevIdx = st.top()`, compute answer `res[prevIdx] = i - prevIdx`. Push current index `i` onto stack.

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // stores indices
        
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                res[prevIdx] = i - prevIdx;
            }
            st.push(i);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Strictly decreasing temperatures (all answers 0).
- Strictly increasing temperatures.

---

### 53. 🔴 P0 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [LC 84: Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

**Example 1:**
- **Input:** `heights = [2,1,5,6,2,3]` 
- **Output:** `10` 
- **Explanation:** Largest rectangle has height 5 and width 2 (area = 10).

**Constraints:**
- `1 <= heights.length <= 10^5` 
- `0 <= heights[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Memory Mnemonic:** *"Monotonic increasing stack tracking Next Smaller Element left/right."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** For each bar i, find Next Smaller Element to Left (NSL) and Right (NSR) using linear scans. Width = `NSR - NSL - 1`. Area = `heights[i] * width`.

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size(), maxArea = 0;
        for (int i = 0; i < n; i++) {
            int nsl = -1, nsr = n;
            for (int j = i - 1; j >= 0; j--) {
                if (heights[j] < heights[i]) { nsl = j; break; }
            }
            for (int j = i + 1; j < n; j++) {
                if (heights[j] < heights[i]) { nsr = j; break; }
            }
            int width = nsr - nsl - 1;
            maxArea = max(maxArea, heights[i] * width);
        }
        return maxArea;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Monotonic Increasing Stack of indices:
Iterate `i` from 0 to `N`. (At `i == N`, treat height as 0).
While stack not empty and `currHeight < heights[st.top()]`:
Pop `h = heights[st.top()]`. Width is `st.empty() ? i : i - st.top() - 1`. Area = `h * width`. Maximize `maxArea`.

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int maxArea = 0;
        
        for (int i = 0; i <= n; i++) {
            int currH = (i == n ? 0 : heights[i]);
            while (!st.empty() && currH < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * width);
            }
            st.push(i);
        }
        return maxArea;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All heights equal.
- Monotonically increasing or decreasing heights.

---


### [BONUS 10] 🟢 P2 [BONUS] LC 85: Maximal Rectangle [HARD]
- **LeetCode Link:** [LC 85: Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Histogram Expansion via Monotonic Stack)

**📜 Problem Statement & Explanation**
Given a `rows x cols` binary `matrix` filled with `'0'`s and `'1'`s, find the largest rectangle containing only `'1'`s and return its area.

**Example 1:**
- **Input:** `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`
- **Output:** `6`
- **Explanation:** The maximal rectangle is shown in the middle with 6 ones.

**Example 2:**
- **Input:** `matrix = [["0"]]`
- **Output:** `0`

**Constraints:**
- `rows == matrix.length`
- `cols == matrix[i].length`
- $1 \le rows, cols \le 200$
- `matrix[i][j]` is `'0'` or `'1'`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Histogram Expansion via Monotonic Stack)
- **Memory Mnemonic:** *"Row-by-row cumulative histogram: If '1' h++, else h=0. Run LC 84 Largest Rectangle in Histogram on each row."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M^3 \times N^3)$ | **Space:** $O(1)$
- **Explanation:** Check every possible subrectangle $(r1, c1)$ to $(r2, c2)$. If all cells are `'1'`, calculate area $(r2 - r1 + 1) \times (c2 - c1 + 1)$ and update max area.

```cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size(), maxArea = 0;
        for (int r1 = 0; r1 < m; r1++) {
            for (int c1 = 0; c1 < n; c1++) {
                for (int r2 = r1; r2 < m; r2++) {
                    for (int c2 = c1; c2 < n; c2++) {
                        bool allOnes = true;
                        for (int r = r1; r <= r2 && allOnes; r++) {
                            for (int c = c1; c <= c2; c++) {
                                if (matrix[r][c] == '0') { allOnes = false; break; }
                            }
                        }
                        if (allOnes) maxArea = max(maxArea, (r2 - r1 + 1) * (c2 - c1 + 1));
                    }
                }
            }
        }
        return maxArea;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(N)$
- **Explanation:**
  1. Treat each row as the base of a histogram. Maintain an array `heights` of length $N$.
  2. For row $r$, if `matrix[r][c] == '1'`, `heights[c] += 1`; otherwise, `heights[c] = 0`.
  3. Apply the LC 84 Monotonic Stack algorithm on `heights`: maintain a monotonic increasing stack of indices. When popping an index $i$, the popped bar has height $h = heights[i]$ and width $w = right - left - 1$.
  4. Track the maximum area across all rows.

```cpp
class Solution {
private:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0); // Sentinel to flush remaining elements
        int n = heights.size(), maxArea = 0;
        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && heights[st.top()] > heights[i]) {
                int h = heights[st.top()];
                st.pop();
                int w = st.empty() ? i : (i - st.top() - 1);
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        heights.pop_back();
        return maxArea;
    }
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '1') heights[c]++;
                else heights[c] = 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- When `matrix[r][c] == '0'`, `heights[c]` must be reset to `0`, not simply left un-incremented.
- Append a sentinel `0` to `heights` to cleanly flush all bars from the stack without post-loop cleanup logic.

---


## 11. HEAP / PRIORITY QUEUE

### 54. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [LC 215: Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)

**📜 Problem Statement & Explanation**
Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.

**Example 1:**
- **Input:** `nums = [3,2,1,5,6,4], k = 2` 
- **Output:** `5`

**Constraints:**
- `1 <= k <= nums.length <= 10^5` 
- `-10^4 <= nums[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)
- **Memory Mnemonic:** *"Maintain Min-Heap of size K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1)
- **Explanation:** Sort array in descending order and return `nums[k - 1]`.

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end(), greater<int>());
        return nums[k - 1];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log K) | **Space:** O(K) auxiliary
- **Explanation:** Min-Heap of size K (`priority_queue<int, vector<int>, greater<int>> minHeap`). Iterate elements: push `x`. If `minHeap.size() > k`, pop top (eliminating elements smaller than top K). After processing all elements, `minHeap.top()` is the Kth largest element!

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int x : nums) {
            minHeap.push(x);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 1` (maximum element).
- `k = N` (minimum element).
- Duplicate values.

---

### 55. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [LC 347: Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)

**📜 Problem Statement & Explanation**
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example 1:**
- **Input:** `nums = [1,1,1,2,2,3], k = 2` 
- **Output:** `[1,2]`

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `k` is in range `[1, number of unique elements]`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)
- **Memory Mnemonic:** *"Bucket Sort by frequency in O(N) linear time."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Build frequency map `unordered_map<int, int>`, convert to vector of pairs `(freq, num)`, sort descending by frequency, return top `k` elements.

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        vector<pair<int, int>> freqPairs;
        for (auto& p : counts) freqPairs.push_back({p.second, p.first});
        sort(freqPairs.rbegin(), freqPairs.rend());
        vector<int> res;
        for (int i = 0; i < k; i++) res.push_back(freqPairs[i].second);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Bucket Sort by Frequency:
1. Count element frequencies using `unordered_map<int, int> counts`.
2. Create bucket array `vector<vector<int>> buckets(n + 1)` where bucket index represents frequency.
3. Populate buckets: `buckets[freq].push_back(num)`.
4. Iterate buckets backwards from `n` down to 1, collecting elements until `res.size() == k`.

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        
        int n = nums.size();
        vector<vector<int>> buckets(n + 1);
        for (auto& pair : counts) {
            buckets[pair.second].push_back(pair.first);
        }
        
        vector<int> res;
        for (int i = n; i >= 1 && res.size() < k; i--) {
            for (int num : buckets[i]) {
                res.push_back(num);
                if (res.size() == k) break;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k` equals unique element count.
- All elements have frequency 1.

---

### 56. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [LC 295: Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Category / Sub-Pattern:** Sub-Pattern 11.2 (Two Heaps Median Tracking)

**📜 Problem Statement & Explanation**
Design a data structure that supports adding numbers from a data stream and finding the median of the stream.

**Example 1:**
- **Input:** `addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2.0`

**Constraints:**
- At most `5 * 10^4` calls to `addNum` and `findMedian`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.2 (Two Heaps Median Tracking)
- **Memory Mnemonic:** *"Max-Heap for lower half, Min-Heap for upper half."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) per insertion | **Space:** O(N)
- **Explanation:** Store numbers in `vector<int> stream`. On every `findMedian` call, sort the vector in $O(N log N)$ and return middle element.

```cpp
class MedianFinder {
private:
    vector<int> stream;
public:
    MedianFinder() {}
    void addNum(int num) {
        stream.push_back(num);
    }
    double findMedian() {
        sort(stream.begin(), stream.end());
        int n = stream.size();
        if (n % 2 == 1) return stream[n / 2];
        return (stream[n / 2 - 1] + stream[n / 2]) / 2.0;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) insertion, O(1) median | **Space:** O(N)
- **Explanation:** Two Heaps Pattern:
1. `small`: Max-Heap storing lower half of numbers.
2. `large`: Min-Heap storing upper half of numbers.
- **addNum(x):** Push to `small`. Balance by moving `small.top()` to `large`. If `large.size() > small.size()`, move `large.top()` to `small`.
- **findMedian():** If `small.size() > large.size()`, return `small.top()`. Else return `(small.top() + large.top()) / 2.0`.

```cpp
class MedianFinder {
private:
    priority_queue<int> small; // Max-heap for lower half
    priority_queue<int, vector<int>, greater<int>> large; // Min-heap for upper half
public:
    MedianFinder() {}
    
    void addNum(int num) {
        small.push(num);
        large.push(small.top());
        small.pop();
        
        if (large.size() > small.size()) {
            small.push(large.top());
            large.pop();
        }
    }
    
    double findMedian() {
        if (small.size() > large.size()) {
            return small.top();
        }
        return (small.top() + large.top()) / 2.0;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Odd total stream count vs even stream count.
- Duplicate stream numbers.

---

### 57. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [LC 23: Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.3 (K-Way Merge)

**📜 Problem Statement & Explanation**
You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
- **Input:** `lists = [[1,4,5],[1,3,4],[2,6]]` 
- **Output:** `[1,1,2,3,4,4,5,6]`

**Constraints:**
- `k == lists.length` 
- `0 <= k <= 10^4` 
- `0 <= total nodes <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.3 (K-Way Merge)
- **Memory Mnemonic:** *"Min-Heap of head node pointers."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Traverse all K lists, collect node values into a vector, sort vector in $O(N log N)$, and build new linked list.

```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        vector<int> vals;
        for (auto node : lists) {
            while (node) {
                vals.push_back(node->val);
                node = node->next;
            }
        }
        sort(vals.begin(), vals.end());
        ListNode dummy(0);
        ListNode* curr = &dummy;
        for (int x : vals) {
            curr->next = new ListNode(x);
            curr = curr->next;
        }
        return dummy.next;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log K) | **Space:** O(K) auxiliary
- **Explanation:** Min-Heap K-Way Merge:
1. Define custom comparator `Compare` for `ListNode*` pointers.
2. Push initial non-null head pointers of all `k` lists into `priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap`.
3. Pop smallest node `curr`, append to dummy result list. If `curr->next != nullptr`, push `curr->next` into heap.
Total time $O(N log K)$ where $N$ is total node count across all lists.

```cpp
class Solution {
struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;
        for (auto head : lists) {
            if (head) minHeap.push(head);
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!minHeap.empty()) {
            ListNode* curr = minHeap.top();
            minHeap.pop();
            
            tail->next = curr;
            tail = tail->next;
            
            if (curr->next) {
                minHeap.push(curr->next);
            }
        }
        return dummy.next;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `lists` is empty `[]`.
- `lists` contains empty node heads `[[], []]`.

---


### [BONUS 11] 🟢 P2 [BONUS] LC 621: Task Scheduler [MEDIUM]
- **LeetCode Link:** [LC 621: Task Scheduler](https://leetcode.com/problems/task-scheduler/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Priority Queue Simulation & Greedy Math)

**📜 Problem Statement & Explanation**
You are given an array of CPU `tasks`, each represented by letters A to Z, and a cooldown period `n`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least `n` intervals with other tasks or idling.
Return the minimum number of intervals the CPU will take to finish all the given tasks.

**Example 1:**
- **Input:** `tasks = ["A","A","A","B","B","B"], n = 2`
- **Output:** `8`
- **Explanation:** `A -> B -> idle -> A -> B -> idle -> A -> B`. Total = 8 intervals.

**Example 2:**
- **Input:** `tasks = ["A","C","A","B","D","B"], n = 1`
- **Output:** `6`

**Constraints:**
- $1 \le tasks.length \le 10^4$
- `tasks[i]` is an uppercase English letter.
- $0 \le n \le 100$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (Priority Queue Simulation & Greedy Math)
- **Memory Mnemonic:** *"Max frequency determines frame: (maxFreq - 1) * (n + 1) + countOfMaxFreq. Result = max(tasks.size(), frameSize)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(\text{Total Intervals} \times \log 26)$ | **Space:** $O(26)$
- **Explanation:** Simulate cycle by cycle using a Max-Heap of remaining task counts and a queue storing `{remainingCount, availableTime}` to manage the cooldown of tasks.

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        for (char t : tasks) freq[t - 'A']++;
        priority_queue<int> pq;
        for (int f : freq) if (f > 0) pq.push(f);

        queue<pair<int, int>> q; // {remainingCount, timeAvailable}
        int time = 0;

        while (!pq.empty() || !q.empty()) {
            time++;
            if (!pq.empty()) {
                int cnt = pq.top() - 1;
                pq.pop();
                if (cnt > 0) q.push({cnt, time + n});
            }
            if (!q.empty() && q.front().second == time) {
                pq.push(q.front().first);
                q.pop();
            }
        }
        return time;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(1)$ auxiliary memory
- **Explanation:**
  1. The task with the maximum frequency `maxFreq` forms the structure. Between each occurrence of this task, there must be at least `n` slots.
  2. Number of chunks formed = `maxFreq - 1`.
  3. Chunk size = `n + 1`.
  4. Count how many distinct tasks share this maximum frequency (`countMax`).
  5. The formula is `(maxFreq - 1) * (n + 1) + countMax`.
  6. If other tasks fill all idle slots, no idling is needed, and the total intervals is simply `tasks.size()`.
  7. Final answer: `max((int)tasks.size(), (maxFreq - 1) * (n + 1) + countMax)`.

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        int maxFreq = 0;
        for (char t : tasks) {
            freq[t - 'A']++;
            maxFreq = max(maxFreq, freq[t - 'A']);
        }

        int countMax = 0;
        for (int f : freq) {
            if (f == maxFreq) countMax++;
        }

        int emptySlots = (maxFreq - 1) * (n + 1) + countMax;
        return max((int)tasks.size(), emptySlots);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- $n = 0$: Cooldown is 0, so the answer is strictly `tasks.size()`.
- When `emptySlots < tasks.size()`, no idle cycles are needed. Taking `max` handles this naturally.

---


## 12. TREE DFS / DEPTH FIRST SEARCH

### 58. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [LC 104: Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return its maximum depth.

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `3`

**Constraints:**
- Number of nodes in tree is in range `[0, 10^4]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)
- **Memory Mnemonic:** *"Max depth = 1 + max(leftDepth, rightDepth)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Level Order BFS Traversal counting levels using queue. Iterate through all levels until queue is empty.

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 0;
        while (!q.empty()) {
            int sz = q.size();
            depth++;
            while (sz--) {
                TreeNode* curr = q.front();
                q.pop();
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
        }
        return depth;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Recursive Post-Order DFS:
Base case: if `root == nullptr`, return 0.
Recursively compute `leftDepth = maxDepth(root->left)` and `rightDepth = maxDepth(root->right)`.
Return `1 + max(leftDepth, rightDepth)`.

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree (`root == nullptr`).
- Skewed tree (depth = N, $O(N)$ stack space).

---

### 59. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [LC 543: Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.

**Example 1:**
- **Input:** `root = [1,2,3,4,5]` 
- **Output:** `3` 
- **Explanation:** 3 is length of path `[4,2,1,3]` or `[5,2,1,3]`.

**Constraints:**
- Number of nodes in tree is in range `[1, 10^4]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)
- **Memory Mnemonic:** *"Single-pass post-order DFS: diameter = left_height + right_height."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, compute height of left subtree and right subtree using a separate recursive `height()` function. Sum `leftH + rightH` and track maximum diameter across all nodes.

```cpp
class Solution {
private:
    int height(TreeNode* node) {
        if (!node) return 0;
        return 1 + max(height(node->left), height(node->right));
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int dRoot = height(root->left) + height(root->right);
        int dLeft = diameterOfBinaryTree(root->left);
        int dRight = diameterOfBinaryTree(root->right);
        return max({dRoot, dLeft, dRight});
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Single-Pass Post-Order DFS:
Helper `height(node, maxDiam)` computes height while updating `maxDiam = max(maxDiam, leftH + rightH)` at each node. Returns `1 + max(leftH, rightH)` to parent. Every node visited exactly once in $O(N)$.

```cpp
class Solution {
private:
    int getHeight(TreeNode* node, int& maxDiam) {
        if (!node) return 0;
        int leftH = getHeight(node->left, maxDiam);
        int rightH = getHeight(node->right, maxDiam);
        maxDiam = max(maxDiam, leftH + rightH);
        return 1 + max(leftH, rightH);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDiam = 0;
        getHeight(root, maxDiam);
        return maxDiam;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node tree (diameter = 0).
- Skewed line tree.

---

### 60. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [LC 236: Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.2 (Lowest Common Ancestor - LCA)

**📜 Problem Statement & Explanation**
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.

**Example 1:**
- **Input:** `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1` 
- **Output:** `3`

**Constraints:**
- Number of nodes is in range `[2, 10^5]` 
- All `Node.val` are unique 
- `p != q` and both exist in tree.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.2 (Lowest Common Ancestor - LCA)
- **Memory Mnemonic:** *"Post-order DFS: if left and right non-null, root is LCA."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Find path from root to `p` and path from root to `q` using backtracking, store paths in vectors, and find last common node pointer in both paths.

```cpp
class Solution {
private:
    bool findPath(TreeNode* root, TreeNode* target, vector<TreeNode*>& path) {
        if (!root) return false;
        path.push_back(root);
        if (root == target) return true;
        if (findPath(root->left, target, path) || findPath(root->right, target, path)) return true;
        path.pop_back();
        return false;
    }
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        vector<TreeNode*> pathP, pathQ;
        findPath(root, p, pathP);
        findPath(root, q, pathQ);
        TreeNode* lca = nullptr;
        for (int i = 0; i < min(pathP.size(), pathQ.size()); i++) {
            if (pathP[i] == pathQ[i]) lca = pathP[i];
            else break;
        }
        return lca;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Post-Order DFS:
- Base case: if `root == nullptr || root == p || root == q`, return `root`.
- Recurse `left = LCA(root->left)` and `right = LCA(root->right)`.
- If both `left != null` and `right != null`, `p` and `q` lie in different subtrees $\implies$ current `root` is the LCA!
- If only `left` is non-null, return `left`, else return `right`.

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `p` is an ancestor of `q` (returns `p`).
- `p` and `q` are leaf nodes.

---

### 61. 🔴 P0 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [LC 124: Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 12.3 (Path Sum Problems)

**📜 Problem Statement & Explanation**
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.

**Example 1:**
- **Input:** `root = [-10,9,20,null,null,15,7]` 
- **Output:** `42` 
- **Explanation:** Optimal path is `15 -> 20 -> 7` with sum `15 + 20 + 7 = 42`.

**Constraints:**
- Number of nodes is in range `[1, 3 * 10^4]` 
- `-1000 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.3 (Path Sum Problems)
- **Memory Mnemonic:** *"Single-pass post-order DFS: node->val + max(0, left) + max(0, right)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, compute max single branch gain from left and right children using separate recursive functions, updating max path sum `node->val + max(0, leftGain) + max(0, rightGain)`.

```cpp
class Solution {
private:
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int leftG = max(0, maxGain(node->left));
        int rightG = max(0, maxGain(node->right));
        return node->val + max(leftG, rightG);
    }
public:
    int maxPathSum(TreeNode* root) {
        if (!root) return INT_MIN;
        int currPath = root->val + max(0, maxGain(root->left)) + max(0, maxGain(root->right));
        int leftPath = maxPathSum(root->left);
        int rightPath = maxPathSum(root->right);
        return max({currPath, leftPath, rightPath});
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Single-Pass Post-Order DFS:
Helper `maxGain(node, maxSum)` returns max single-branch contribution to parent: `node->val + max(0, max(leftGain, rightGain))`.
At each node, update global `maxSum = max(maxSum, node->val + max(0, leftGain) + max(0, rightGain))`.

```cpp
class Solution {
private:
    int maxGain(TreeNode* node, int& maxSum) {
        if (!node) return 0;
        int leftGain = max(0, maxGain(node->left, maxSum));
        int rightGain = max(0, maxGain(node->right, maxSum));
        int priceNewPath = node->val + leftGain + rightGain;
        maxSum = max(maxSum, priceNewPath);
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxGain(root, maxSum);
        return maxSum;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Tree with all negative values (returns max single node value).
- Single node tree.

---


### [BONUS 12] 🟢 P2 [BONUS] LC 297: Serialize and Deserialize Binary Tree [HARD]
- **LeetCode Link:** [LC 297: Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Preorder Traversal & String Stream State)

**📜 Problem Statement & Explanation**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network.
Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.

**Example 1:**
- **Input:** `root = [1,2,3,null,null,4,5]`
- **Output:** `[1,2,3,null,null,4,5]`

**Example 2:**
- **Input:** `root = []`
- **Output:** `[]`

**Constraints:**
- The number of nodes in the tree is in the range $[0, 10^4]$.
- $-1000 \le Node.val \le 1000$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Tree Preorder Traversal & String Stream State)
- **Memory Mnemonic:** *"Preorder DFS with '#' for null and comma delimiter. Stringstream in deserialize recursively builds root->left->right."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(2^H)$ | **Space:** $O(2^H)$
- **Explanation:** Store the complete binary tree array representation (like a heap array) including all null pointers up to depth $H$. For skewed trees, $2^H$ space blows up memory.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$
- **Explanation:**
  - `serialize`: Use Preorder DFS (`Root, Left, Right`). If node is null, append `"#, "`. Otherwise, append `to_string(node->val) + ","` and recurse on left and right.
  - `deserialize`: Read tokens separated by comma using `stringstream`. If token is `"#"`, return `nullptr`. Otherwise, create `TreeNode(stoi(token))` and recurse to build `root->left` and `root->right`.

```cpp
class Codec {
private:
    void serializeHelper(TreeNode* root, string& s) {
        if (!root) {
            s += "#,";
            return;
        }
        s += to_string(root->val) + ",";
        serializeHelper(root->left, s);
        serializeHelper(root->right, s);
    }

    TreeNode* deserializeHelper(stringstream& ss) {
        string token;
        if (!getline(ss, token, ',')) return nullptr;
        if (token == "#") return nullptr;

        TreeNode* node = new TreeNode(stoi(token));
        node->left = deserializeHelper(ss);
        node->right = deserializeHelper(ss);
        return node;
    }

public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string s = "";
        serializeHelper(root, s);
        return s;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return deserializeHelper(ss);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree `root == nullptr` serializes to `"#, "` and deserializes safely to `nullptr`.
- Negative numbers (e.g. `-100`) must be parsed properly by `stoi`.

---


## 13. TREE BFS / LEVEL ORDER TRAVERSAL

### 62. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 102: Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `[[3],[9,20],[15,7]]`

**Constraints:**
- Number of nodes is in range `[0, 2000]` 
- `-1000 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Memory Mnemonic:** *"Queue-based level size iteration."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Recursive DFS passing current level `depth`. Resize result vector dynamically and append node value to `res[depth]`.

```cpp
class Solution {
private:
    void dfs(TreeNode* node, int depth, vector<vector<int>>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back({});
        res[depth].push_back(node->val);
        dfs(node->left, depth + 1, res);
        dfs(node->right, depth + 1, res);
    }
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Queue-Based Level Order BFS:
1. `queue<TreeNode*> q`. Push `root`.
2. While queue not empty: get level size `sz = q.size()`. Loop `sz` times: pop node, add value to `level` vector, push non-null `left` and `right` children.
3. Append `level` vector to result.

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                level.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree (`root == nullptr`).
- Single node tree.

---

### 63. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [LC 199: Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

**Example 1:**
- **Input:** `root = [1,2,3,null,5,null,4]` 
- **Output:** `[1,3,4]`

**Constraints:**
- Number of nodes is in range `[0, 100]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Memory Mnemonic:** *"Reverse Pre-Order DFS (Root -> Right -> Left) or BFS level last element."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Full BFS Level Order Traversal storing all level vectors, then picking last element of each level vector.

```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                if (i == sz - 1) res.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Reverse Pre-Order DFS (Root $\to$ Right $\to$ Left):
Pass current `depth`. If `depth == res.size()`, append `root->val` (first node encountered at this level when exploring right subtree first!). Recurse right then left.

```cpp
class Solution {
private:
    void dfs(TreeNode* node, int depth, vector<int>& res) {
        if (!node) return;
        if (depth == res.size()) {
            res.push_back(node->val);
        }
        dfs(node->right, depth + 1, res);
        dfs(node->left, depth + 1, res);
    }
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Left-skewed tree (right view shows left children when no right children exist).
- Empty tree.

---

### 64. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 103: Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate).

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `[[3],[20,9],[15,7]]`

**Constraints:**
- Number of nodes is in range `[0, 2000]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Memory Mnemonic:** *"Toggle direction flag and write to pre-allocated level index."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Standard Level Order BFS, then reverse level vectors at odd depths using `std::reverse`.

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                level.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            if (!leftToRight) reverse(level.begin(), level.end());
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Direct Level Array Insertion BFS:
Maintain boolean `leftToRight = true`. For level of size `sz`: allocate `vector<int> level(sz)`. For node index `i`: `idx = leftToRight ? i : (sz - 1 - i)`. Set `level[idx] = node->val`. Toggle `leftToRight = !leftToRight` after each level.

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level(sz);
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                int idx = leftToRight ? i : (sz - 1 - i);
                level[idx] = curr->val;
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node tree.
- Empty tree.

---


### [BONUS 13] 🟢 P2 [BONUS] LC 314: Binary Tree Vertical Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 314: Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Coordinate-Based BFS Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the vertical order traversal of its nodes' values (i.e., from top to bottom, column by column).
If two nodes are in the same row and column, the order should be from **left to right**.

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]`
- **Output:** `[[9],[3,15],[20],[7]]`

**Example 2:**
- **Input:** `root = [3,9,8,4,0,1,7]`
- **Output:** `[[4],[9],[3,0,1],[8],[7]]`

**Constraints:**
- The number of nodes in the tree is in the range $[0, 100]$.
- $-100 \le Node.val \le 100$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Coordinate-Based BFS Traversal)
- **Memory Mnemonic:** *"BFS with pair<Node*, col>. col-1 for left, col+1 for right. Hash map collects values, BFS preserves top-to-bottom automatically."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(N)$
- **Explanation:** Run DFS recording `{col, row, val}` for each node. Sort the list by `col` ascending, then `row` ascending. Group into columns.

```cpp
class Solution {
    vector<tuple<int, int, int>> nodes; // {col, row, val}
    void dfs(TreeNode* root, int r, int c) {
        if (!root) return;
        nodes.push_back({c, r, root->val});
        dfs(root->left, r + 1, c - 1);
        dfs(root->right, r + 1, c + 1);
    }
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        dfs(root, 0, 0);
        // Sort by col, then by row
        stable_sort(nodes.begin(), nodes.end(), [](const auto& a, const auto& b) {
            if (get<0>(a) != get<0>(b)) return get<0>(a) < get<0>(b);
            return get<1>(a) < get<1>(b);
        });
        vector<vector<int>> res;
        map<int, vector<int>> mp;
        for (auto& [c, r, v] : nodes) mp[c].push_back(v);
        for (auto& [c, vList] : mp) res.push_back(vList);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$
- **Explanation:** Use BFS with a queue of pairs `queue<pair<TreeNode*, int>>` where `int` is column offset.
  - Root starts at column `0`.
  - Left child is at `col - 1`, right child at `col + 1`.
  - Maintain `unordered_map<int, vector<int>> colMap` and track `minCol` and `maxCol`.
  - Because BFS visits level by level, nodes naturally appear in top-to-bottom and left-to-right order without any sorting!

```cpp
class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        unordered_map<int, vector<int>> colMap;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        int minCol = 0, maxCol = 0;

        while (!q.empty()) {
            auto [node, col] = q.front();
            q.pop();

            colMap[col].push_back(node->val);
            minCol = min(minCol, col);
            maxCol = max(maxCol, col);

            if (node->left) q.push({node->left, col - 1});
            if (node->right) q.push({node->right, col + 1});
        }

        for (int c = minCol; c <= maxCol; c++) {
            if (colMap.count(c)) {
                res.push_back(colMap[c]);
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree returns `[]`.
- Contrast with LC 987: LC 987 requires sorting node values if they share both row and column; LC 314 strictly preserves left-to-right arrival order.

---


## 14. BINARY SEARCH TREE (BST)

### 65. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [LC 98: Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

**Example 1:**
- **Input:** `root = [2,1,3]` 
- **Output:** `true` 

**Example 2:**
- **Input:** `root = [5,1,4,null,null,3,6]` 
- **Output:** `false`

**Constraints:**
- Number of nodes is in range `[1, 10^4]` 
- `-2^31 <= Node.val <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)
- **Memory Mnemonic:** *"Inorder traversal values must be strictly increasing."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, check that all nodes in its left subtree are strictly smaller than `u->val` and all nodes in its right subtree are strictly larger than `u->val`.

```cpp
class Solution {
private:
    bool isSubtreeLess(TreeNode* node, int val) {
        if (!node) return true;
        return node->val < val && isSubtreeLess(node->left, val) && isSubtreeLess(node->right, val);
    }
    bool isSubtreeGreater(TreeNode* node, int val) {
        if (!node) return true;
        return node->val > val && isSubtreeGreater(node->left, val) && isSubtreeGreater(node->right, val);
    }
public:
    bool isValidBST(TreeNode* root) {
        if (!root) return true;
        return isSubtreeLess(root->left, root->val) && isSubtreeGreater(root->right, root->val) &&
               isValidBST(root->left) && isValidBST(root->right);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Inorder Traversal Property: Inorder traversal of a valid BST yields strictly ascending values!
Traverse tree inorder tracking `prev` node pointer. If `prev != nullptr && root->val <= prev->val`, return `false`. Update `prev = root`.

```cpp
class Solution {
private:
    bool inorder(TreeNode* node, TreeNode*& prev) {
        if (!node) return true;
        if (!inorder(node->left, prev)) return false;
        if (prev && node->val <= prev->val) return false;
        prev = node;
        return inorder(node->right, prev);
    }
public:
    bool isValidBST(TreeNode* root) {
        TreeNode* prev = nullptr;
        return inorder(root, prev);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Node values equal to `INT_MIN` or `INT_MAX`.
- Duplicate node values (BST requires strictly greater/less).

---

### 66. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [LC 230: Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary search tree, and an integer `k`, return the `k`-th smallest value (1-indexed) of all the values of the nodes in the tree.

**Example 1:**
- **Input:** `root = [3,1,4,null,2], k = 1` 
- **Output:** `1`

**Constraints:**
- Number of nodes is in range `[1, 10^4]` 
- `1 <= k <= n <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)
- **Memory Mnemonic:** *"Inorder traversal returns elements in sorted order."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Perform Inorder Traversal storing all node values in a vector `vals`. Return `vals[k - 1]`.

```cpp
class Solution {
private:
    void inorder(TreeNode* node, vector<int>& vals) {
        if (!node) return;
        inorder(node->left, vals);
        vals.push_back(node->val);
        inorder(node->right, vals);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        vector<int> vals;
        inorder(root, vals);
        return vals[k - 1];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(H + K) | **Space:** O(H) auxiliary
- **Explanation:** Iterative Inorder Traversal with Stack:
Go left as far as possible pushing nodes onto stack. Pop top node, decrement `k--`. If `k == 0`, return `curr->val`. Move `curr = curr->right`. Stops early after visiting K nodes.

```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top();
            st.pop();
            k--;
            if (k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 1` (smallest element).
- `k = N` (largest element).

---

### 67. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [LC 450: Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.2 (BST Search & Mutation)

**📜 Problem Statement & Explanation**
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference of the BST.

**Example 1:**
- **Input:** `root = [5,3,6,2,4,null,7], key = 3` 
- **Output:** `[5,4,6,2,null,null,7]`

**Constraints:**
- Number of nodes is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.2 (BST Search & Mutation)
- **Memory Mnemonic:** *"Replace node with Inorder Successor (min in right subtree)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Store all values except `key` in an array, and construct a new BST from scratch.

```cpp
class Solution {
private:
    void getVals(TreeNode* node, int key, vector<int>& vals) {
        if (!node) return;
        getVals(node->left, key, vals);
        if (node->val != key) vals.push_back(node->val);
        getVals(node->right, key, vals);
    }
    TreeNode* buildBST(vector<int>& vals, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* node = new TreeNode(vals[mid]);
        node->left = buildBST(vals, l, mid - 1);
        node->right = buildBST(vals, mid + 1, r);
        return node;
    }
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        vector<int> vals;
        getVals(root, key, vals);
        return buildBST(vals, 0, (int)vals.size() - 1);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(H) | **Space:** O(H) auxiliary
- **Explanation:** Standard Recursive BST Deletion:
1. Search for node: if `key < root->val` `root->left = deleteNode(root->left, key)`, else if `key > root->val` `root->right = deleteNode(root->right, key)`.
2. When found (`root->val == key`):
   - Case 1 & 2: 0 or 1 child $\implies$ return non-null child.
   - Case 3: 2 children $\implies$ find Inorder Successor `curr = root->right` (min node in right subtree). Replace `root->val = curr->val`, then delete successor recursively `root->right = deleteNode(root->right, curr->val)`.

```cpp
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        
        if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            
            TreeNode* succ = root->right;
            while (succ->left) succ = succ->left;
            root->val = succ->val;
            root->right = deleteNode(root->right, succ->val);
        }
        return root;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Target key not present in tree.
- Deleting root node.

---


### [BONUS 14] 🟢 P2 [BONUS] LC 99: Recover Binary Search Tree [MEDIUM]
- **LeetCode Link:** [LC 99: Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (Inorder Inversion Detection)

**📜 Problem Statement & Explanation**
You are given the `root` of a binary search tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. Recover the tree without changing its structure.

**Example 1:**
- **Input:** `root = [1,3,null,null,2]`
- **Output:** `[3,1,null,null,2]`
- **Explanation:** 3 cannot be a left child of 1 because $3 > 1$. Swapping 1 and 3 recovers the BST.

**Example 2:**
- **Input:** `root = [3,1,4,null,null,2]`
- **Output:** `[2,1,4,null,null,1]`

**Constraints:**
- The number of nodes in the tree is in the range $[2, 1000]$.
- $-2^{31} \le Node.val \le 2^{31} - 1$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (Inorder Inversion Detection)
- **Memory Mnemonic:** *"Inorder traversal must be sorted. First violation: first = prev. Second violation: second = curr. Swap(first->val, second->val)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(N)$
- **Explanation:** Perform inorder traversal and store all node pointers and values in lists. Sort the values array. Walk the tree again in inorder and overwrite each node's value with the sorted values.

```cpp
class Solution {
    vector<TreeNode*> nodes;
    vector<int> vals;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        nodes.push_back(root);
        vals.push_back(root->val);
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        sort(vals.begin(), vals.end());
        for (int i = 0; i < nodes.size(); i++) {
            nodes[i]->val = vals[i];
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(H)$ recursion stack (or $O(1)$ via Morris Inorder)
- **Explanation:** Inorder traversal of a valid BST visits nodes in strictly increasing order. When two nodes are swapped, there will be either:
  1. Two violations (`prev->val > curr->val`): `first` is `prev` of the first violation, and `second` is `curr` of the second violation.
  2. One violation (the swapped nodes were adjacent in inorder): `first` is `prev`, and `second` is `curr`.
  After completing the traversal, swap the values of `first` and `second`.

```cpp
class Solution {
private:
    TreeNode* first = nullptr;
    TreeNode* second = nullptr;
    TreeNode* prev = nullptr;

    void inorder(TreeNode* curr) {
        if (!curr) return;
        inorder(curr->left);

        if (prev && prev->val > curr->val) {
            if (!first) first = prev; // First violation
            second = curr;           // Second violation (or adjacent)
        }
        prev = curr;

        inorder(curr->right);
    }

public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        if (first && second) {
            swap(first->val, second->val);
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Swapped nodes are direct parent-child or adjacent in inorder traversal (only one inversion is triggered).
- Modifying node pointers vs swapping node values: Problem statement specifically asks to recover without changing tree structure.

---


## 15. BACKTRACKING / SUBSETS & PERMUTATIONS

### 68. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [LC 78: Subsets](https://leetcode.com/problems/subsets/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)

**📜 Problem Statement & Explanation**
Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

**Example 1:**
- **Input:** `nums = [1,2,3]` 
- **Output:** `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

**Constraints:**
- `1 <= nums.length <= 10` 
- `-10 <= nums[i] <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)
- **Memory Mnemonic:** *"Backtracking recursion: include/exclude or loop start index."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N * N) | **Space:** O(2^N * N)
- **Explanation:** Iterative Bitmasking: loop `i` from 0 to `(1 << n) - 1`. For each bit position `j`, if `i & (1 << j)` is set, include `nums[j]`.

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        int total = 1 << n;
        vector<vector<int>> res;
        for (int i = 0; i < total; i++) {
            vector<int> sub;
            for (int j = 0; j < n; j++) {
                if (i & (1 << j)) sub.push_back(nums[j]);
            }
            res.push_back(sub);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(2^N * N) | **Space:** O(N) stack space
- **Explanation:** Backtracking DFS:
`backtrack(start, curr)`.
At each recursive step, push `curr` to result.
Loop `i` from `start` to `n - 1`:
- `curr.push_back(nums[i])`
- Recurse `backtrack(i + 1, curr)`
- Backtrack `curr.pop_back()`.

```cpp
class Solution {
private:
    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {
        res.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            backtrack(i + 1, nums, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(0, nums, curr, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array `[0]`.
- Empty array.

---

### 69. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [LC 46: Permutations](https://leetcode.com/problems/permutations/)
- **Category / Sub-Pattern:** Sub-Pattern 15.2 (Permutations)

**📜 Problem Statement & Explanation**
Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Example 1:**
- **Input:** `nums = [1,2,3]` 
- **Output:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

**Constraints:**
- `1 <= nums.length <= 6` 
- `-10 <= nums[i] <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.2 (Permutations)
- **Memory Mnemonic:** *"In-place swapping backtracking."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N! * N)
- **Explanation:** Call `std::next_permutation` in a loop after sorting `nums`.

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        do {
            res.push_back(nums);
        } while (next_permutation(nums.begin(), nums.end()));
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N) stack space
- **Explanation:** In-Place Swapping Backtracking:
`backtrack(start)`.
If `start == nums.size()`, append `nums` to result.
Loop `i` from `start` to `n - 1`:
- `swap(nums[start], nums[i])`
- Recurse `backtrack(start + 1)`
- Backtrack `swap(nums[start], nums[i])`.

```cpp
class Solution {
private:
    void backtrack(int start, vector<int>& nums, vector<vector<int>>& res) {
        if (start == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1, nums, res);
            swap(nums[start], nums[i]);
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(0, nums, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array `[1]`.

---

### 70. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [LC 39: Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)

**📜 Problem Statement & Explanation**
Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may use the same number an unlimited number of times.

**Example 1:**
- **Input:** `candidates = [2,3,6,7], target = 7` 
- **Output:** `[[2,2,3],[7]]`

**Constraints:**
- `1 <= candidates.length <= 30` 
- `2 <= candidates[i] <= 40` 
- `1 <= target <= 40`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)
- **Memory Mnemonic:** *"Backtracking with element index reuse (i instead of i + 1)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^target) | **Space:** O(target)
- **Explanation:** Generate combinations recursively. Store candidates in set to filter duplicates.

```cpp
class Solution {
private:
    void backtrack(int idx, int sum, int target, vector<int>& candidates, vector<int>& curr, set<vector<int>>& res) {
        if (sum == target) {
            res.insert(curr);
            return;
        }
        if (sum > target || idx >= candidates.size()) return;
        curr.push_back(candidates[idx]);
        backtrack(idx, sum + candidates[idx], target, candidates, curr, res);
        curr.pop_back();
        backtrack(idx + 1, sum, target, candidates, curr, res);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        set<vector<int>> res;
        vector<int> curr;
        backtrack(0, 0, target, candidates, curr, res);
        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(2^target) | **Space:** O(target) stack space
- **Explanation:** Backtracking with Element Reuse:
`backtrack(start, remain, curr)`.
If `remain == 0`, add `curr` to result.
Loop `i` from `start` to `n - 1`: if `candidates[i] <= remain`, `curr.push_back(candidates[i])`, recurse `backtrack(i, remain - candidates[i], curr)` (reusing index `i`), `curr.pop_back()`.

```cpp
class Solution {
private:
    void backtrack(int start, int remain, vector<int>& candidates, vector<int>& curr, vector<vector<int>>& res) {
        if (remain == 0) {
            res.push_back(curr);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] <= remain) {
                curr.push_back(candidates[i]);
                backtrack(i, remain - candidates[i], curr, res);
                curr.pop_back();
            }
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(0, target, candidates, curr, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Target cannot be formed.
- Single element candidate.

---

### 71. 🔴 P0 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [LC 51: N-Queens](https://leetcode.com/problems/n-queens/)
- **Category / Sub-Pattern:** Sub-Pattern 15.3 (Grid & Constraint Backtracking)

**📜 Problem Statement & Explanation**
The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct solutions to the n-queens puzzle.

**Example 1:**
- **Input:** `n = 4` 
- **Output:** `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`

**Constraints:**
- `1 <= n <= 9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.3 (Grid & Constraint Backtracking)
- **Memory Mnemonic:** *"Column & Diagonal Hash Sets for O(1) safety checks."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^N) | **Space:** O(N^2)
- **Explanation:** Place queens in all possible cell configurations, checking validity for each configuration using full grid scans.

```cpp
class Solution {
private:
    bool isSafe(int r, int c, vector<string>& board, int n) {
        for (int i = 0; i < r; i++) if (board[i][c] == 'Q') return false;
        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
    void solve(int r, int n, vector<string>& board, vector<vector<string>>& res) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (isSafe(r, c, board, n)) {
                board[r][c] = 'Q';
                solve(r + 1, n, board, res);
                board[r][c] = '.';
            }
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        solve(0, n, board, res);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N!) | **Space:** O(N) auxiliary
- **Explanation:** Backtracking with $O(1)$ Hash Set Checks:
Track occupied columns (`cols`), main diagonals (`diag1`: `r - c`), and anti-diagonals (`diag2`: `r + c`).
Recurse row `r` from 0 to `N - 1`. For column `c`: if `c`, `r - c`, or `r + c` are in set, skip. Place queen, insert into sets, recurse `r + 1`, backtrack.

```cpp
class Solution {
private:
    void solve(int r, int n, vector<string>& board, unordered_set<int>& cols,
               unordered_set<int>& diag1, unordered_set<int>& diag2, vector<vector<string>>& res) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            
            board[r][c] = 'Q';
            cols.insert(c);
            diag1.insert(r - c);
            diag2.insert(r + c);
            
            solve(r + 1, n, board, cols, diag1, diag2, res);
            
            board[r][c] = '.';
            cols.erase(c);
            diag1.erase(r - c);
            diag2.erase(r + c);
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols, diag1, diag2;
        solve(0, n, board, cols, diag1, diag2, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 1` (returns `[["Q"]]`).
- `n = 2` or `n = 3` (no solution, returns `[]`).

---


### [BONUS 15] 🟢 P2 [BONUS] LC 79: Word Search [MEDIUM]
- **LeetCode Link:** [LC 79: Word Search](https://leetcode.com/problems/word-search/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Grid DFS Backtracking)

**📜 Problem Statement & Explanation**
Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
- **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`
- **Output:** `true`

**Example 2:**
- **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`
- **Output:** `true`

**Constraints:**
- `m == board.length`, `n = board[i].length`
- $1 \le m, n \le 6$
- $1 \le word.length \le 15$
- `board` and `word` consist of only lowercase and uppercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Grid DFS Backtracking)
- **Memory Mnemonic:** *"Mask cell board[r][c] = '#' -> explore 4 directions -> unmask board[r][c] = temp (backtrack)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M \times N \times 4^L)$ | **Space:** $O(M \times N + L)$
- **Explanation:** Maintain a 2D boolean array `visited[m][n]` and launch DFS from every cell matching `word[0]`.

```cpp
class Solution {
    bool dfs(vector<vector<char>>& board, string& word, int r, int c, int idx, vector<vector<bool>>& visited) {
        if (idx == word.size()) return true;
        int m = board.size(), n = board[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || board[r][c] != word[idx]) return false;

        visited[r][c] = true;
        bool found = dfs(board, word, r + 1, c, idx + 1, visited) ||
                     dfs(board, word, r - 1, c, idx + 1, visited) ||
                     dfs(board, word, r, c + 1, idx + 1, visited) ||
                     dfs(board, word, r, c - 1, idx + 1, visited);
        visited[r][c] = false;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(board, word, r, c, 0, visited)) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M \times N \times 3^L)$ | **Space:** $O(L)$ call stack (In-place grid masking)
- **Explanation:**
  1. Optimize space: Eliminate `visited` array by masking `board[r][c] = '#'` in-place, then restoring `board[r][c] = temp` during backtracking.
  2. Pruning heuristic: If the frequency of `word[0]` is greater than `word.back()`, reverse `word` to start searching from the rarer character.

```cpp
class Solution {
private:
    bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int idx) {
        if (idx == word.size()) return true;
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[idx]) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#'; // In-place visit mask

        bool found = dfs(board, word, r + 1, c, idx + 1) ||
                     dfs(board, word, r - 1, c, idx + 1) ||
                     dfs(board, word, r, c + 1, idx + 1) ||
                     dfs(board, word, r, c - 1, idx + 1);

        board[r][c] = temp; // Backtrack
        return found;
    }

public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        // Character count check optimization
        unordered_map<char, int> boardFreq, wordFreq;
        for (auto& row : board) for (char c : row) boardFreq[c]++;
        for (char c : word) wordFreq[c]++;
        for (auto& [ch, count] : wordFreq) {
            if (boardFreq[ch] < count) return false;
        }

        // Reverse search if end character is rarer
        if (boardFreq[word[0]] > boardFreq[word.back()]) {
            reverse(word.begin(), word.end());
        }

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word[0] && dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Failing to restore `board[r][c] = temp` breaks subsequent search paths.
- Single-letter word `word = "A"` on a $1 \times 1$ board.

---


## 16. GRAPH DFS / BFS

### 72. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [LC 200: Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))

**📜 Problem Statement & Explanation**
Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

**Example 1:**
- **Input:** `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]` 
- **Output:** `1`

**Constraints:**
- `m == grid.length`, `n == grid[i].length` 
- `1 <= m, n <= 300`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Memory Mnemonic:** *"In-place sinking of land cells ('1' -> '0')."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((M * N)^2) | **Space:** O(M * N)
- **Explanation:** Launch separate BFS from every cell storing visited coordinates in an auxiliary set.

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        set<pair<int, int>> visited;
        int islands = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1' && !visited.count({r, c})) {
                    islands++;
                    queue<pair<int, int>> q;
                    q.push({r, c});
                    visited.insert({r, c});
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
                        for (int i = 0; i < 4; i++) {
                            int nr = cr + dr[i], nc = cc + dc[i];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1' && !visited.count({nr, nc})) {
                                visited.insert({nr, nc});
                                q.push({nr, nc});
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
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N) recursion stack
- **Explanation:** In-Place Sink Grid DFS:
Scan grid cells $(r, c)$. When `grid[r][c] == '1'`, increment `islands++` and launch `sinkDFS(r, c)` which sinks all connected land cells by setting `grid[r][c] = '0'` and exploring 4 directional neighbors.

```cpp
class Solution {
private:
    void sinkDFS(int r, int c, vector<vector<char>>& grid, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0') return;
        grid[r][c] = '0';
        sinkDFS(r + 1, c, grid, m, n);
        sinkDFS(r - 1, c, grid, m, n);
        sinkDFS(r, c + 1, grid, m, n);
        sinkDFS(r, c - 1, grid, m, n);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sinkDFS(r, c, grid, m, n);
                }
            }
        }
        return islands;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All water grid.
- All land grid.

---

### 73. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [LC 133: Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)

**📜 Problem Statement & Explanation**
Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

**Example 1:**
- **Input:** `adjList = [[2,4],[1,3],[2,4],[1,3]]` 
- **Output:** `[[2,4],[1,3],[2,4],[1,3]]`

**Constraints:**
- Number of nodes is in range `[0, 100]` 
- `1 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)
- **Memory Mnemonic:** *"DFS with hash map mapping original node -> cloned node."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V)
- **Explanation:** Two-pass BFS: create new nodes in first pass, then link neighbors in second pass.

```cpp
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        unordered_map<Node*, Node*> mp;
        queue<Node*> q;
        q.push(node);
        mp[node] = new Node(node->val);
        while (!q.empty()) {
            Node* curr = q.front(); q.pop();
            for (Node* neighbor : curr->neighbors) {
                if (!mp.count(neighbor)) {
                    mp[neighbor] = new Node(neighbor->val);
                    q.push(neighbor);
                }
            }
        }
        for (auto& pair : mp) {
            for (Node* neighbor : pair.first->neighbors) {
                pair.second->neighbors.push_back(mp[neighbor]);
            }
        }
        return mp[node];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V) auxiliary
- **Explanation:** DFS Graph Cloning with Hash Map:
Maintain `unordered_map<Node*, Node*> visited`. Base cases: if `node == nullptr` return null. If `visited.count(node)` return `visited[node]`. Create clone `Node* clone = new Node(node->val)`. Store `visited[node] = clone`. Recurse for all neighbors: `clone->neighbors.push_back(cloneGraph(neighbor))`.

```cpp
class Solution {
private:
    unordered_map<Node*, Node*> visited;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (visited.count(node)) return visited[node];
        
        Node* clone = new Node(node->val);
        visited[node] = clone;
        
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        return clone;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty graph (`node == nullptr`).
- Single node graph without edges.

---

### 74. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [LC 785: Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)

**📜 Problem Statement & Explanation**
There is an undirected graph with `n` nodes. Return `true` if and only if it is bipartite (can color vertices with 2 colors such that no adjacent vertices have same color).

**Example 1:**
- **Input:** `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]` 
- **Output:** `false`

**Constraints:**
- `graph.length == n` 
- `1 <= n <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)
- **Memory Mnemonic:** *"BFS 2-coloring (1 and -1); conflict = not bipartite."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^V) | **Space:** O(V)
- **Explanation:** Try all 2^V vertex colorings using backtracking and test edge consistency.

```cpp
class Solution {
private:
    bool tryColoring(int idx, int n, vector<int>& colors, vector<vector<int>>& graph) {
        if (idx == n) return true;
        for (int c : {1, -1}) {
            colors[idx] = c;
            bool valid = true;
            for (int v : graph[idx]) {
                if (colors[v] == c) { valid = false; break; }
            }
            if (valid && tryColoring(idx + 1, n, colors, graph)) return true;
            colors[idx] = 0;
        }
        return false;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> colors(n, 0);
        return tryColoring(0, n, colors, graph);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V) auxiliary
- **Explanation:** BFS 2-Coloring (`color` array initialized to 0).
For each unvisited node `i`: color it with 1, push to BFS queue. For each popped node `u` and neighbor `v`:
- If `color[v] == 0`: color `v` with `-color[u]` and push to queue.
- If `color[v] == color[u]`: graph is NOT bipartite $\implies$ return `false`.

```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0);
        
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            queue<int> q;
            q.push(i);
            color[i] = 1;
            
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : graph[u]) {
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.push(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Disconnected graph components.
- Graph with odd length cycles.

---

### 75. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [LC 994: Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))

**📜 Problem Statement & Explanation**
You are given an `m x n` grid where `0` is empty, `1` is fresh orange, `2` is rotten orange. Return the minimum number of minutes until no fresh orange remains. If impossible, return `-1`.

**Example 1:**
- **Input:** `grid = [[2,1,1],[1,1,0],[0,1,1]]` 
- **Output:** `4`

**Constraints:**
- `m == grid.length`, `n == grid[i].length` 
- `1 <= m, n <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Memory Mnemonic:** *"Multi-Source BFS starting from all rotten oranges simultaneously."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((M * N)^2) | **Space:** O(1)
- **Explanation:** Iteratively rot fresh oranges step-by-step using repeated full-grid scans until no new oranges rot.

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int minutes = 0;
        while (true) {
            vector<pair<int, int>> toRot;
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (grid[r][c] == 2) {
                        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
                        for (int i = 0; i < 4; i++) {
                            int nr = r + dr[i], nc = c + dc[i];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                                toRot.push_back({nr, nc});
                            }
                        }
                    }
                }
            }
            if (toRot.empty()) break;
            for (auto& p : toRot) grid[p.first][p.second] = 2;
            minutes++;
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) if (grid[r][c] == 1) return -1;
        }
        return minutes;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N)
- **Explanation:** Multi-Source BFS:
1. Count total fresh oranges and push all initial rotten orange coordinates `(r, c)` into `queue<pair<int, int>> q`.
2. While queue is non-empty and `freshCount > 0`: process level size `sz`, expand to 4 neighbors. For each fresh neighbor, turn to rotten (`grid[nr][nc] = 2`), decrement `freshCount--`, push to queue.
3. Increment `minutes++` after processing each level. Return `freshCount == 0 ? minutes : -1`.

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int freshCount = 0;
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) freshCount++;
            }
        }
        if (freshCount == 0) return 0;
        
        int minutes = 0;
        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
        
        while (!q.empty() && freshCount > 0) {
            int sz = q.size();
            minutes++;
            for (int i = 0; i < sz; i++) {
                auto [r, c] = q.front(); q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d], nc = c + dc[d];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        freshCount--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return freshCount == 0 ? minutes : -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- No fresh oranges (returns 0).
- Unreachable fresh orange isolated by empty cells (returns -1).

---

### 76. 🔴 P0 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [LC 127: Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))

**📜 Problem Statement & Explanation**
Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no sequence exists.

**Example 1:**
- **Input:** `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]` 
- **Output:** `5`

**Constraints:**
- `1 <= beginWord.length <= 10` 
- `1 <= wordList.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Memory Mnemonic:** *"BFS on single character mutations with hash set lookup."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2 * L) | **Space:** O(N)
- **Explanation:** Build full adjacency graph comparing all pairs of words for single-character mutations, then run standard BFS.

```cpp
class Solution {
private:
    bool isAdjacent(const string& a, const string& b) {
        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a[i] != b[i]) diff++;
            if (diff > 1) return false;
        }
        return diff == 1;
    }
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        wordList.push_back(beginWord);
        int n = wordList.size();
        unordered_map<string, vector<string>> adj;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isAdjacent(wordList[i], wordList[j])) {
                    adj[wordList[i]].push_back(wordList[j]);
                    adj[wordList[j]].push_back(wordList[i]);
                }
            }
        }
        queue<pair<string, int>> q;
        unordered_set<string> visited;
        q.push({beginWord, 1});
        visited.insert(beginWord);
        while (!q.empty()) {
            auto [curr, steps] = q.front(); q.pop();
            if (curr == endWord) return steps;
            for (string& nxt : adj[curr]) {
                if (!visited.count(nxt)) {
                    visited.insert(nxt);
                    q.push({nxt, steps + 1});
                }
            }
        }
        return 0;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * L^2) | **Space:** O(N * L)
- **Explanation:** BFS with Word Mutations:
1. Insert `wordList` into `unordered_set<string> wordSet` for $O(1)$ lookups.
2. `queue<string> q`. Push `beginWord`.
3. BFS level-by-level: for each word `curr`, mutate each position `i` from `'a'` to `'z'`. If mutated word is in `wordSet`, erase it (marking visited) and push to queue. If mutated word equals `endWord`, return `steps + 1`.

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (!wordSet.count(endWord)) return 0;
        
        queue<string> q;
        q.push(beginWord);
        int steps = 1;
        
        while (!q.empty()) {
            int sz = q.size();
            steps++;
            for (int k = 0; k < sz; k++) {
                string curr = q.front(); q.pop();
                for (int i = 0; i < curr.length(); i++) {
                    char orig = curr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        curr[i] = c;
                        if (curr == endWord) return steps;
                        if (wordSet.count(curr)) {
                            wordSet.erase(curr);
                            q.push(curr);
                        }
                    }
                    curr[i] = orig;
                }
            }
        }
        return 0;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `endWord` not in `wordList` (returns 0).
- `beginWord` equals `endWord`.

---


### [BONUS 16] 🟢 P2 [BONUS] LC 743: Network Delay Time [MEDIUM]
- **LeetCode Link:** [LC 743: Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Weighted Shortest Path / Dijkstra's Algorithm)

**📜 Problem Statement & Explanation**
You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (u_i, v_i, w_i)`, where $u_i$ is the source node, $v_i$ is the target node, and $w_i$ is the time it takes for a signal to travel from source to target.
We will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

**Example 1:**
- **Input:** `times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2`
- **Output:** `2`

**Example 2:**
- **Input:** `times = [[1,2,1]], n = 2, k = 1`
- **Output:** `1`

**Example 3:**
- **Input:** `times = [[1,2,1]], n = 2, k = 2`
- **Output:** `-1`

**Constraints:**
- $1 \le k \le n \le 100$
- $1 \le times.length \le 6000$
- $times[i].length == 3$
- $1 \le u_i, v_i \le n$, $u_i \ne v_i$
- $0 \le w_i \le 100$
- All pairs $(u_i, v_i)$ are unique.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.2 (Weighted Shortest Path / Dijkstra's Algorithm)
- **Memory Mnemonic:** *"Dijkstra's Algorithm: Min-heap of {dist, node}. Relax edges if dist[u] + w < dist[v]. Answer is max(dist)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(V \times E)$ | **Space:** $O(V)$
- **Explanation:** Bellman-Ford algorithm: Initialize `dist` array of size $n+1$ with $\infty$, `dist[k] = 0`. Relax all edges in `times` $n - 1$ times.

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dist(n + 1, 1e9);
        dist[k] = 0;
        for (int i = 1; i < n; i++) {
            for (const auto& edge : times) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != 1e9 && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        return maxTime;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O((V + E) \log V)$ | **Space:** $O(V + E)$
- **Explanation:** Dijkstra's Algorithm:
  1. Construct adjacency list `adj[u] = {{v, w}}`.
  2. Maintain `dist` vector initialized to `INT_MAX`, with `dist[k] = 0`.
  3. Min-heap `priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>>` stores `{currentDist, node}`.
  4. Pop `{d, u}`. If `d > dist[u]`, continue (stale entry).
  5. For each neighbor `{v, weight}`: if `dist[u] + weight < dist[v]`, update `dist[v]` and push `{dist[v], v}`.
  6. Return `max_element(dist)` from `1` to `n`. If any node is unreachable (`INT_MAX`), return `-1`.

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (const auto& edge : times) {
            adj[edge[0]].push_back({edge[1], edge[2]});
        }

        vector<int> dist(n + 1, INT_MAX);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

        dist[k] = 0;
        pq.push({0, k}); // {distance, node}

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) continue;

            for (auto& [v, weight] : adj[u]) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }

        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        return maxTime;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Nodes are 1-indexed, so arrays must be of size `n + 1`.
- Graph may contain disconnected components where some nodes are unreachable.

---


## 17. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### 77. 🔴 P0 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [LC 207: Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)

**📜 Problem Statement & Explanation**
There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `true` if you can finish all courses.

**Example 1:**
- **Input:** `numCourses = 2, prerequisites = [[1,0]]` 
- **Output:** `true`

**Constraints:**
- `1 <= numCourses <= 2000` 
- `0 <= prerequisites.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)
- **Memory Mnemonic:** *"Kahn's Algorithm BFS in-degree tracking."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V!) | **Space:** O(V)
- **Explanation:** Backtracking permutation check searching for a valid linear ordering of courses.

```cpp
class Solution {
private:
    bool isCycleDFS(int u, vector<vector<int>>& adj, vector<int>& visited) {
        visited[u] = 1; // visiting
        for (int v : adj[u]) {
            if (visited[v] == 1) return true;
            if (visited[v] == 0 && isCycleDFS(v, adj, visited)) return true;
        }
        visited[u] = 2; // visited
        return false;
    }
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        vector<int> visited(numCourses, 0);
        for (int i = 0; i < numCourses; i++) {
            if (visited[i] == 0 && isCycleDFS(i, adj, visited)) return false;
        }
        return true;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V + E)
- **Explanation:** Kahn's BFS Topological Sort:
1. Build adjacency list `adj` and `inDegree` array of size `numCourses`.
2. For each edge `[a, b]`: `adj[b].push_back(a)`, `inDegree[a]++`.
3. Push all nodes with `inDegree[i] == 0` into queue `q`.
4. While `q` not empty: pop node, increment `visitedCount++`. For each neighbor `v`: decrement `inDegree[v]--`. If `inDegree[v] == 0`, push to queue.
5. Return `visitedCount == numCourses`.

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        int count = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            count++;
            for (int v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) q.push(v);
            }
        }
        return count == numCourses;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Graph with circular dependency `[[1,0],[0,1]]` (returns false).
- Disconnected courses without prerequisites.

---

### 78. 🔴 P0 [Q] LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [LC 210: Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)

**📜 Problem Statement & Explanation**
Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.

**Example 1:**
- **Input:** `numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]` 
- **Output:** `[0,2,1,3]`

**Constraints:**
- `1 <= numCourses <= 2000` 
- `0 <= prerequisites.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)
- **Memory Mnemonic:** *"Kahn's Algorithm collecting topological order."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V!) | **Space:** O(V)
- **Explanation:** Try all course permutations using backtracking and test prerequisite ordering.

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> order(numCourses);
        for (int i = 0; i < numCourses; i++) order[i] = i;
        do {
            unordered_map<int, int> pos;
            for (int i = 0; i < numCourses; i++) pos[order[i]] = i;
            bool valid = true;
            for (auto& p : prerequisites) {
                if (pos[p[1]] > pos[p[0]]) { valid = false; break; }
            }
            if (valid) return order;
        } while (next_permutation(order.begin(), order.end()));
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V + E)
- **Explanation:** Kahn's BFS Topo-Order Collection:
Same setup as LC 207: when popping node `u` from queue, append `u` to `order` vector. If `order.size() == numCourses`, return `order`, else return `{}` (cycle detected).

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) q.push(v);
            }
        }
        return order.size() == numCourses ? order : vector<int>();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Cycle present (returns empty vector `{}`).
- No prerequisites (returns `[0, 1, ..., n-1]`).

---


### [BONUS 17] 🟢 P2 [BONUS] LC 269: Alien Dictionary [HARD]
- **LeetCode Link:** [LC 269: Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Graph Construction & Topological Kahn's Algorithm)

**📜 Problem Statement & Explanation**
There is a new alien language that uses the English alphabet. The characters in the dictionary are sorted lexicographically by the rules of this new language.
Given a list of strings `words` from the alien language's dictionary, return a string of the unique letters in the new alien language sorted in lexicographically increasing order. If there is no valid ordering, return `""`. If there are multiple valid solutions, return any of them.

**Example 1:**
- **Input:** `words = ["wrt","wrf","er","ett","rftt"]`
- **Output:** `"wertf"`

**Example 2:**
- **Input:** `words = ["z","x"]`
- **Output:** `"zx"`

**Example 3:**
- **Input:** `words = ["z","x","z"]`
- **Output:** `""` (Explanation: The order is invalid because 'z' cannot appear both before and after 'x').

**Constraints:**
- $1 \le words.length \le 100$
- $1 \le words[i].length \le 100$
- `words[i]` consists of only lowercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (Graph Construction & Topological Kahn's Algorithm)
- **Memory Mnemonic:** *"Compare adjacent words for first mismatch -> directed edge. Prefix edge case check. Kahn's BFS for cycle detection."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(26!)$ | **Space:** $O(26)$
- **Explanation:** Generate all permutations of 26 letters and verify each permutation against every word pair in the dictionary. Intractable.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(C)$ where $C$ is total characters across all words | **Space:** $O(1)$ fixed 26-character alphabet graph
- **Explanation:**
  1. Extract all unique characters from `words` into `inDegree` map.
  2. Compare adjacent word pairs `w1` and `w2`:
     - If `w1.size() > w2.size()` and `w1.rfind(w2, 0) == 0` (e.g. `["abc", "ab"]`), it's invalid prefix ordering; immediately return `""`.
     - Find the first index $j$ where `w1[j] != w2[j]`. Add edge `w1[j] -> w2[j]` and increment `inDegree[w2[j]]` (ensuring edges are deduplicated using set).
  3. Kahn's Algorithm: Push all characters with `inDegree == 0` into queue.
  4. While queue is not empty, pop `u`, append to `result`, and decrement `inDegree` of neighbors.
  5. If `result.size() == inDegree.size()`, return `result`; else return `""` (cycle detected).

```cpp
class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;

        for (const string& word : words) {
            for (char c : word) {
                inDegree[c] = 0;
            }
        }

        for (int i = 0; i < (int)words.size() - 1; i++) {
            const string& w1 = words[i];
            const string& w2 = words[i + 1];

            // Invalid prefix check: e.g. ["apple", "app"]
            if (w1.size() > w2.size() && w1.compare(0, w2.size(), w2) == 0) {
                return "";
            }

            int minLen = min(w1.size(), w2.size());
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    break;
                }
            }
        }

        queue<char> q;
        for (auto& [ch, deg] : inDegree) {
            if (deg == 0) q.push(ch);
        }

        string result = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            result += u;

            for (char v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        return result.size() == inDegree.size() ? result : "";
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- The prefix trap: `["abc", "ab"]` where the longer word appears before its prefix is invalid and must return `""`.
- Duplicate edges between characters: using `unordered_set<char>` for adjacency prevents double-incrementing `inDegree`.

---


## 18. DISJOINT SET UNION (DSU / UNION-FIND)

### 79. 🟠 P1 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [LC 684: Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)

**📜 Problem Statement & Explanation**
In this problem, a tree is an undirected graph that is connected and has no cycles. Return an edge that can be removed so that the resulting graph is a tree of `n` nodes.

**Example 1:**
- **Input:** `edges = [[1,2],[1,3],[2,3]]` 
- **Output:** `[2,3]`

**Constraints:**
- `n == edges.length` 
- `3 <= n <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)
- **Memory Mnemonic:** *"DSU find root collision detects redundant cycle edge."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(E * (V + E)) | **Space:** O(V + E)
- **Explanation:** Iterate through edges. Remove current edge, run DFS to check if graph remains connected.

```cpp
class Solution {
private:
    bool isConnectedDFS(int u, int target, vector<vector<int>>& adj, vector<bool>& visited) {
        if (u == target) return true;
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v] && isConnectedDFS(v, target, adj, visited)) return true;
        }
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<vector<int>> adj(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            vector<bool> visited(n + 1, false);
            if (!adj[u].empty() && !adj[v].empty() && isConnectedDFS(u, v, adj, visited)) {
                return edge;
            }
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(E * alpha(V)) | **Space:** O(V) auxiliary
- **Explanation:** Disjoint Set Union (DSU) with Path Compression:
Initialize `parent[i] = i`. For each edge `[u, v]`:
- `rootU = find(u)`, `rootV = find(v)`.
- If `rootU == rootV`, `[u, v]` connects two nodes already in the same component $\implies$ cycle edge! Return `[u, v]`.
- Else `parent[rootU] = rootV`.

```cpp
class Solution {
private:
    int findParent(int node, vector<int>& parent) {
        if (node == parent[node]) return node;
        return parent[node] = findParent(parent[node], parent);
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        for (const auto& edge : edges) {
            int u = edge[0], v = edge[1];
            int rootU = findParent(u, parent);
            int rootV = findParent(v, parent);
            if (rootU == rootV) return edge;
            parent[rootU] = rootV;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Multiple candidate edges (problem guarantees returning last edge in input).

---

### 80. 🟠 P1 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [LC 547: Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)

**📜 Problem Statement & Explanation**
There are `n` cities. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`. Return total number of provinces.

**Example 1:**
- **Input:** `isConnected = [[1,1,0],[1,1,0],[0,0,1]]` 
- **Output:** `2`

**Constraints:**
- `n == isConnected.length` 
- `1 <= n <= 200`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)
- **Memory Mnemonic:** *"DSU union decrement or DFS connected component count."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V^3) | **Space:** O(V)
- **Explanation:** Compute Warshall's transitive closure matrix to find all pairs reachable from each node.

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<vector<int>> reach = isConnected;
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
                }
            }
        }
        vector<bool> visited(n, false);
        int provinces = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                provinces++;
                for (int j = 0; j < n; j++) if (reach[i][j]) visited[j] = true;
            }
        }
        return provinces;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V^2 * alpha(V)) | **Space:** O(V) auxiliary
- **Explanation:** DSU Component Counter:
Initialize `parent[i] = i` and `provinces = n`.
Iterate upper triangle `isConnected[i][j] == 1`: if `find(i) != find(j)`, `union(i, j)` and decrement `provinces--`. Return final `provinces` count.

```cpp
class Solution {
private:
    int findParent(int i, vector<int>& parent) {
        if (parent[i] == i) return i;
        return parent[i] = findParent(parent[i], parent);
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> parent(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        int provinces = n;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    int rootI = findParent(i, parent);
                    int rootJ = findParent(j, parent);
                    if (rootI != rootJ) {
                        parent[rootI] = rootJ;
                        provinces--;
                    }
                }
            }
        }
        return provinces;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All cities isolated (returns n).
- All cities connected in single component (returns 1).

---


### [BONUS 18] 🟢 P2 [BONUS] LC 721: Accounts Merge [MEDIUM]
- **LeetCode Link:** [LC 721: Accounts Merge](https://leetcode.com/problems/accounts-merge/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (Union-Find Component Grouping)

**📜 Problem Statement & Explanation**
Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account.
Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that two accounts with the same name might belong to different people, as people might have the same name. A person can have any number of accounts, but all of their accounts definitely have the same name.
After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.

**Example 1:**
- **Input:** `accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`
- **Output:** `[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`

**Constraints:**
- $1 \le accounts.length \le 1000$
- $2 \le accounts[i].length \le 10$
- $1 \le accounts[i][j].length \le 30$
- `accounts[i][0]` consists of English letters.
- `accounts[i][j]` (for $j \ge 1$) is a valid email.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (Union-Find Component Grouping)
- **Memory Mnemonic:** *"Map email -> first occurrence account index. Union current account with previous account index for all shared emails."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^2 \times L)$ | **Space:** $O(N \times L)$
- **Explanation:** Repeatedly scan all pairs of accounts. If two accounts share any common email, merge their email sets into one account and delete the second account. Repeat until no two accounts can be merged.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N \times K \alpha(N) + N \times K \log K)$ where $N$ is accounts, $K$ is emails per account | **Space:** $O(N \times K)$
- **Explanation:**
  1. Build a DSU over account indices `0` to `n - 1`.
  2. Maintain `unordered_map<string, int> emailToAccount` mapping each email to the first account index that contained it.
  3. For each account $i$, for each email $e$:
     - If $e$ is already seen in account $j$, union accounts $i$ and $j$.
     - Else, set `emailToAccount[e] = i`.
  4. Collect all emails by parent root: `unordered_map<int, vector<string>> mergedEmails`.
  5. For each group, sort emails, prepend `accounts[root][0]`, and add to result.

```cpp
class DSU {
public:
    vector<int> parent;
    DSU(int n) : parent(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] == x) return x;
        return parent[x] = find(parent[x]);
    }
    void unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX != rootY) parent[rootX] = rootY;
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        DSU dsu(n);
        unordered_map<string, int> emailToAccount;

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                const string& email = accounts[i][j];
                if (emailToAccount.count(email)) {
                    dsu.unite(i, emailToAccount[email]);
                } else {
                    emailToAccount[email] = i;
                }
            }
        }

        unordered_map<int, vector<string>> components;
        for (auto& [email, accIdx] : emailToAccount) {
            int root = dsu.find(accIdx);
            components[root].push_back(email);
        }

        vector<vector<string>> merged;
        for (auto& [root, emailList] : components) {
            sort(emailList.begin(), emailList.end());
            vector<string> account = {accounts[root][0]};
            account.insert(account.end(), emailList.begin(), emailList.end());
            merged.push_back(account);
        }
        return merged;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Same account name belonging to two different people with no overlapping emails (must stay separate).
- Duplicate emails within the same account line.

---


## 19. 1D DYNAMIC PROGRAMMING

### 81. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [LC 198: House Robber](https://leetcode.com/problems/house-robber/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)

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
- **Main Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
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

### 82. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [LC 70: Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)

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
- **Main Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
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

### 83. 🔴 P0 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [LC 139: Word Break](https://leetcode.com/problems/word-break/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)

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
- **Main Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
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

### 84. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [LC 300: Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)

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
- **Main Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
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


### [BONUS 19] 🟢 P2 [BONUS] LC 152: Maximum Product Subarray [MEDIUM]
- **LeetCode Link:** [LC 152: Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State-Tracking Kadane Variation)

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
- **Main Pattern:** Sub-Pattern 19.1 (State-Tracking Kadane Variation)
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


## 20. KNAPSACK / 2D DYNAMIC PROGRAMMING

### 85. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [LC 322: Coin Change](https://leetcode.com/problems/coin-change/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)

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
- **Main Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
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

### 86. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [LC 1143: Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)

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
- **Main Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
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

### 87. 🔴 P0 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [LC 416: Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)

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
- **Main Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
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

### 88. 🔴 P0 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [LC 72: Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)

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
- **Main Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
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


### [BONUS 20] 🟢 P2 [BONUS] LC 518: Coin Change II [MEDIUM]
- **LeetCode Link:** [LC 518: Coin Change II](https://leetcode.com/problems/coin-change-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded Knapsack Combinations)

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
- **Main Pattern:** Sub-Pattern 20.1 (Unbounded Knapsack Combinations)
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


## 21. BIT MANIPULATION & BITMASKING

### 89. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [LC 136: Single Number](https://leetcode.com/problems/single-number/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)

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
- **Main Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
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

### 90. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [LC 191: Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)

**📜 Problem Statement & Explanation**
Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as Hamming weight).

**Example 1:**
- **Input:** `n = 11` (1011 in binary)
- **Output:** `3`

**Constraints:**
- `1 <= n <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
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

### 91. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [LC 338: Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)

**📜 Problem Statement & Explanation**
Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the binary representation of `i`.

**Example 1:**
- **Input:** `n = 5` 
- **Output:** `[0,1,1,2,1,2]`

**Constraints:**
- `0 <= n <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
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

### [BONUS 21] 🟢 P2 [BONUS] LC 260: Single Number III [MEDIUM]
- **LeetCode Link:** [LC 260: Single Number III](https://leetcode.com/problems/single-number-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Partitioning & Rightmost Set Bit Masking)

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
- **Main Pattern:** Sub-Pattern 21.1 (XOR Partitioning & Rightmost Set Bit Masking)
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

