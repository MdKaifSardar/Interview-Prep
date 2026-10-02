⬅️ (start) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Complete Sorting Algorithms Suite ➡️](02-complete-sorting-algorithms-suite.md)

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
- **Single row or single column** (`[[1,2,3]]` or `[[1],[2],[3]]`): this is why steps 3 and 4 re-check `top <= bottom` and `left <= right`. Without those checks, the bottom-row and left-column loops walk back over elements that were already added, and the output contains duplicates.
- **Non-square matrices** (Example 2 is `3 x 4`): rows and columns run out at different times, so never assume `m == n`. Trace Example 2 once to see the guards fire.
- **Quick self-check:** the result must contain exactly `m * n` elements. If a trace gives more, a guard is missing.
- **Direction-array version (the brute force)** has the same O(M * N) time and is accepted, but the boundary version is expected because it needs no `visited` grid.

---

#### 1a. 🔁 Follow-up Variant: LC 59: Spiral Matrix II [MEDIUM]
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
- **Same template as LC 54,** writing values instead of reading them. Keep the `top <= bottom` / `left <= right` guards even though the matrix is square, so you only have one loop to remember for both problems.
- **`n = 1`** returns `[[1]]`: the first loop fills the only cell and the boundaries cross immediately.
- **Odd `n`** leaves a single center cell, which the top-row loop of the last ring fills.

---

### 2. 🔴 P0 [Q] LC 48: Rotate Image [MEDIUM]
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
- **Transpose only the upper triangle (`j > i`).** Looping `j` over the full range swaps every pair twice, which undoes the transpose.
- **The order of the two steps decides the direction:** transpose then reverse each row is clockwise. Reversing each row first and then transposing is anti-clockwise (see the variant below).
- **"In-place" is the real constraint.** Mention the copy-based brute force first, but it uses O(N^2) extra space, which the problem forbids.
- **Alternative O(1) method:** rotate four cells at a time, ring by ring (top-left -> top-right -> bottom-right -> bottom-left). Same complexity, but more index arithmetic; transpose + reverse is easier to get right under pressure.
- **Follow-up: rotate by 180°.** Reverse the order of the rows, then reverse each row.

---

#### 2a. 🔁 Follow-up Variant: Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
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
- **Two equivalent recipes:** transpose then reverse each column, or reverse each row then transpose. Both are O(N^2) time and O(1) space; remember whichever one sticks.
- **Check the direction with one row:** the first row `[1,2,3]` must end up as the first column, reading `3, 2, 1` from top to bottom. Tracing this one row catches clockwise/anti-clockwise mix-ups.
- **1 x 1 matrix** stays unchanged; both loops do nothing.

---

### 3. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
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
- **Record row 0 and column 0 first.** The markers overwrite row 0 and column 0, so you must remember whether they *originally* contained a zero. That is why `firstRowZero` and `firstColZero` are computed before anything else.
- **Zero the first row and column last.** If you zero them early, every marker reads as zero and the whole matrix turns into zeros.
- **Never zero cells during the scan.** New zeros created mid-scan look like original zeros and spread incorrectly. The two-pass marker approach exists to avoid exactly this.
- **Talk through the space progression:** O(M * N) copy -> O(M + N) row/column flags (the brute force) -> O(1) markers. Interviewers often ask for this exact sequence.

---

### 4. 🔴 P0 [Q] LC 118: Pascal's Triangle [EASY]
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
- **The edges are always 1.** Creating each row as `vector<int>(i + 1, 1)` handles both ends, so the inner loop only fills `j = 1 .. i - 1`.
- **Overflow:** not an issue for `numRows <= 30` (the largest value is about `1.5 * 10^8`). In the nCr brute force, multiplying and dividing alternately keeps intermediate values small; computing full factorials would overflow past row 20.
- **Follow-up: Pascal's Triangle II (LC 119)** asks for only row `k` in O(k) space. Keep a single row and update it from right to left (`row[j] += row[j - 1]`), so you never overwrite a value you still need.

---

### 5. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
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
- **Explanation:** Treat the array like a number. To get the next bigger one, change the rightmost position you can, by the smallest amount you can.
1. **Find the pivot `i`:** scan from the right for the first `nums[i] < nums[i + 1]`. Everything to the right of `i` is in descending order, meaning that suffix is already in its largest arrangement, so the change must happen at `i`. If there is no pivot, the whole array is the last permutation, and reversing it gives the first one.
2. **Find the swap partner `j`:** scan from the right for the first `nums[j] > nums[i]`. Because the suffix is descending, this is the smallest value larger than `nums[i]`. Swap them; the prefix is now only just bigger than before.
3. **Reverse the suffix** `i + 1 .. end`. It is still descending after the swap; reversing makes it ascending, its smallest arrangement, so the result is the very next permutation.

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
- **No pivot means last permutation:** for a fully descending array like `[3,2,1]`, `i` ends at `-1`, the swap is skipped, and `reverse(nums.begin() + i + 1, ...)` reverses the whole array to `[1,2,3]`. No special case is needed.
- **Duplicates need `>=` and `<=`:** the pivot scan uses `nums[i] >= nums[i + 1]` and the swap scan uses `nums[j] <= nums[i]`. Strict comparisons break inputs like `[1,1,5]` and `[1,5,1]`.
- **Why reverse instead of sort:** the suffix is still descending after the swap, so reversing gives ascending order in O(N). Sorting also works but costs O(N log N).
- **Related:** Next Greater Element III (LC 556), "next bigger number with the same digits", is this exact algorithm applied to the digits of an integer.

---


### 6. 🟢 P2 [BONUS] LC 289: Game of Life [MEDIUM]
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

---

⬅️ (start) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Complete Sorting Algorithms Suite ➡️](02-complete-sorting-algorithms-suite.md)
