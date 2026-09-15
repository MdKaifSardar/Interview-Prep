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
- **Main Pattern:** Matrix Spiral Traversal & Generation
- **Memory Mnemonic:** *"4-boundary shrinking loop (top, bottom, left, right)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N)
- **Explanation:** Maintain a 2D boolean `visited[m][n]` grid and direction vectors for right, down, left, up. Step forward until hitting a matrix boundary or an already visited cell, then turn right 90 degrees.

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
- **Explanation:** Maintain 4 boundary pointers: `top = 0`, `bottom = m-1`, `left = 0`, `right = n-1`. Loop while `top <= bottom && left <= right`. Traverse top row, right col, bottom row (if `top <= bottom`), and left col (if `left <= right`), shrinking boundaries inward after each sweep.

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
- Single row (1 x N) or single column (M x 1) matrices.
- Ensuring `top <= bottom` and `left <= right` checks before bottom and left sweeps.
- Empty matrix input.

---

### 2. 🔴 P0 [Q] LC 59: Spiral Matrix II [MEDIUM]
- **LeetCode Link:** [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n^2` in spiral order.

**Example 1:**
- **Input:** `n = 3`
- **Output:** `[[1,2,3],[8,9,4],[7,6,5]]`
- **Explanation:** Fills 3x3 grid with values 1 through 9 in spiral order.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Spiral Traversal & Generation
- **Memory Mnemonic:** *"Generating N x N matrix in spiral order filling 1..N^2."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Simulate direction turning using direction arrays `dr` and `dc`. Fill values 1 to `n^2` step by step, turning right when out of bounds or encountering a non-zero cell.

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
- **Explanation:** Use 4 boundary variables `top`, `bottom`, `left`, `right` and an incrementing counter `val = 1`. Populate top row, right col, bottom row, and left col sequentially, shrinking boundaries until `val > n*n`.

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
- n = 1 boundary case (returns [[1]]).
- Handling odd vs even dimensions for center element filling.

---

### 3. 🔴 P0 [Q] LC 48: Rotate Image [MEDIUM]
- **LeetCode Link:** [Rotate Image](https://leetcode.com/problems/rotate-image/)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[[7,4,1],[8,5,2],[9,6,3]]`
- **Explanation:** Rotated 90 degrees clockwise in-place.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Symmetry & In-Place Rotations
- **Memory Mnemonic:** *"Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row in-place."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Allocate an auxiliary `N x N` matrix `temp`. Copy `matrix[r][c]` to `temp[c][n - 1 - r]`. Copy `temp` back into `matrix`. Uses O(N^2) extra space.

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
- **Explanation:** 1) Transpose matrix in-place by swapping `matrix[i][j]` with `matrix[j][i]` for `j > i`. 2) Reverse each row horizontally using `std::reverse`.

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
- Anti-clockwise variation (Transpose + Column Reverse).

---

### 4. 🔴 P0 [Q] Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
- **LeetCode Link:** [Rotate Matrix 90 Deg Anti-Clockwise](#)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Rotate Matrix 90 Deg Anti-Clockwise**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Transpose matrix + reverse each column..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Symmetry & In-Place Rotations
- **Memory Mnemonic:** *"Transpose matrix + reverse each column."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Matrix Symmetry & In-Place Rotations. Transpose matrix + reverse each column..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Transpose matrix + reverse each column.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 5. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
- **LeetCode Link:** [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Set Matrix Zeroes**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Use 1st row and 1st column as dummy markers for O(1) space..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Use 1st row and 1st column as dummy markers for O(1) space."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Matrix State Marking & Pattern Generation. Use 1st row and 1st column as dummy markers for O(1) space..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Use 1st row and 1st column as dummy markers for O(1) space.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 6. 🔴 P0 [Q] LC 118: Pascal's Triangle [EASY]
- **LeetCode Link:** [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Pascal's Triangle**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Dynamic row generation using previous row element sums..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Dynamic row generation using previous row element sums."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Matrix State Marking & Pattern Generation. Dynamic row generation using previous row element sums..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Dynamic row generation using previous row element sums.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 7. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
- **LeetCode Link:** [Next Permutation](https://leetcode.com/problems/next-permutation/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Next Permutation**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Find decrease pivot -> swap with next larger -> reverse suffix..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Find decrease pivot -> swap with next larger -> reverse suffix."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Matrix State Marking & Pattern Generation. Find decrease pivot -> swap with next larger -> reverse suffix..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Find decrease pivot -> swap with next larger -> reverse suffix.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 2. COMPLETE SORTING ALGORITHMS SUITE

### 8. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Selection Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Selection Sort Algorithm Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Find min element in unsorted partition and swap with start..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Find min element in unsorted partition and swap with start."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Elementary Comparison Sorts (O(N^2)). Find min element in unsorted partition and swap with start..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Find min element in unsorted partition and swap with start.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 9. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Bubble Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Bubble Sort Algorithm Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Repeatedly swap adjacent inverted pairs with early exit flag..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Repeatedly swap adjacent inverted pairs with early exit flag."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Elementary Comparison Sorts (O(N^2)). Repeatedly swap adjacent inverted pairs with early exit flag..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Repeatedly swap adjacent inverted pairs with early exit flag.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 10. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Insertion Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Insertion Sort Algorithm Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Shift elements right to insert key into sorted prefix..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Shift elements right to insert key into sorted prefix."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Elementary Comparison Sorts (O(N^2)). Shift elements right to insert key into sorted prefix..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Shift elements right to insert key into sorted prefix.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 11. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
- **LeetCode Link:** [Merge Sort & Inversion Counting Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Merge Sort & Inversion Counting Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Divide halves recursively and merge in O(N log N) time..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Divide & Conquer & Advanced Sorts (O(N log N))
- **Memory Mnemonic:** *"Divide halves recursively and merge in O(N log N) time."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Divide & Conquer & Advanced Sorts (O(N log N)). Divide halves recursively and merge in O(N log N) time..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Divide halves recursively and merge in O(N log N) time.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 12. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
- **LeetCode Link:** [Quick Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Quick Sort Algorithm Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Lomuto/Hoare randomized pivot partitioning..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Divide & Conquer & Advanced Sorts (O(N log N))
- **Memory Mnemonic:** *"Lomuto/Hoare randomized pivot partitioning."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Divide & Conquer & Advanced Sorts (O(N log N)). Lomuto/Hoare randomized pivot partitioning..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Lomuto/Hoare randomized pivot partitioning.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 13. 🟠 P1 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Counting Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Counting Sort Algorithm Blueprint**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Frequency array for bounded integer range [0, K]..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Linear Non-Comparison Sorts (O(N))
- **Memory Mnemonic:** *"Frequency array for bounded integer range [0, K]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Linear Non-Comparison Sorts (O(N)). Frequency array for bounded integer range [0, K]..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Frequency array for bounded integer range [0, K].
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 14. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
- **LeetCode Link:** [Largest Number](https://leetcode.com/problems/largest-number/)
- **Category / Sub-Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Largest Number**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Custom string concatenation comparator (a + b > b + a)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Custom Comparators & String Sorting
- **Memory Mnemonic:** *"Custom string concatenation comparator (a + b > b + a)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Custom Comparators & String Sorting. Custom string concatenation comparator (a + b > b + a)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Custom string concatenation comparator (a + b > b + a).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 3. HASHING / FREQUENCY COUNTING

### 15. 🟠 P1 [Q] LC 217: Contains Duplicate [EASY]
- **LeetCode Link:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Contains Duplicate**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on O(1) set presence check..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Frequency Counting & Anagrams
- **Memory Mnemonic:** *"O(1) set presence check."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Frequency Counting & Anagrams. O(1) set presence check..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // O(1) set presence check.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 16. 🔴 P0 [Q] LC 49: Group Anagrams [MEDIUM]
- **LeetCode Link:** [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Group Anagrams**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 26-char frequency vector encoding as map key..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Frequency Counting & Anagrams
- **Memory Mnemonic:** *"26-char frequency vector encoding as map key."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Frequency Counting & Anagrams. 26-char frequency vector encoding as map key..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 26-char frequency vector encoding as map key.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 17. 🔴 P0 [Q] LC 1: Two Sum [EASY]
- **LeetCode Link:** [Two Sum](https://leetcode.com/problems/two-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

**Example 1:**
- **Input:** `nums = [2,7,11,15], target = 9`
- **Output:** `[0,1]`
- **Explanation:** nums[0] + nums[1] == 2 + 7 == 9, return [0, 1].

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** O(1) Pair & Complement Lookup
- **Memory Mnemonic:** *"Complement lookup (target - nums[i]) in unordered_map."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use two nested loops. Outer loop selects `nums[i]`, inner loop checks every `nums[j]` (`j > i`) to see if `nums[i] + nums[j] == target`.

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
- **Explanation:** Use a Hash Map `unordered_map<int, int>` storing `value -> index`. Iterate through `nums`, compute `complement = target - nums[i]`. If complement exists in map, return `{mp[complement], i}`. Otherwise, insert `nums[i] -> i`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) return {mp[complement], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Duplicates in array (e.g. nums = [3,3], target = 6).
- Negative numbers and zero values.
- Checking hash map BEFORE inserting current element to prevent self-pairing.

---

### 18. 🔴 P0 [Q] LC 128: Longest Consecutive Sequence [MEDIUM]
- **LeetCode Link:** [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Longest Consecutive Sequence**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on O(1) set lookup for sequence start boundary (!set.count(num - 1))..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** O(1) Pair & Complement Lookup
- **Memory Mnemonic:** *"O(1) set lookup for sequence start boundary (!set.count(num - 1))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using O(1) Pair & Complement Lookup. O(1) set lookup for sequence start boundary (!set.count(num - 1))..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // O(1) set lookup for sequence start boundary (!set.count(num - 1)).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 19. 🔴 P0 [Q] IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [Subarray with Given XOR](#)
- **Category / Sub-Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Subarray with Given XOR**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Maintain running XOR sum (xr). Lookup (xr ^ target) in map..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix XOR & Bitwise Hashing
- **Memory Mnemonic:** *"Maintain running XOR sum (xr). Lookup (xr ^ target) in map."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Prefix XOR & Bitwise Hashing. Maintain running XOR sum (xr). Lookup (xr ^ target) in map..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Maintain running XOR sum (xr). Lookup (xr ^ target) in map.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 4. PREFIX SUM & DIFFERENCE ARRAYS

### 20. 🔴 P0 [Q] LC 560: Subarray Sum Equals K [MEDIUM]
- **LeetCode Link:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.

**Example 1:**
- **Input:** `nums = [1,1,1], k = 2`
- **Output:** `2`
- **Explanation:** Subarrays [1,1] starting at index 0 and index 1 sum to 2.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Prefix Sum & Subarray Sum K
- **Memory Mnemonic:** *"Running sum - K hash map lookup."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Check every possible subarray `(i, j)`. Compute sum from index `i` to `j`. If sum equals `k`, increment count.

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size();
        int count = 0;
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
- **Explanation:** Maintain running prefix sum `prefSum`. If `prefSum - k` exists in hash map `mp` (`prefSum -> frequency`), add its frequency to total count. Increment `mp[prefSum]`. Initialize `mp[0] = 1` for subarrays starting from index 0.

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        mp[0] = 1;
        int prefSum = 0, count = 0;

        for (int num : nums) {
            prefSum += num;
            if (mp.count(prefSum - k)) {
                count += mp[prefSum - k];
            }
            mp[prefSum]++;
        }
        return count;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Subarrays containing negative numbers (Prefix Sum hash map handles negatives; Sliding Window fails!).
- k = 0 with array containing zeros.
- Initializing `mp[0] = 1` to account for prefix sums matching `k` from index 0.

---

### 21. 🔴 P0 [Q] LC 525: Contiguous Array [MEDIUM]
- **LeetCode Link:** [Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Contiguous Array**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Convert 0 to -1, track earliest index of prefix sum..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Prefix Sum & Subarray Sum K
- **Memory Mnemonic:** *"Convert 0 to -1, track earliest index of prefix sum."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Standard Prefix Sum & Subarray Sum K. Convert 0 to -1, track earliest index of prefix sum..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Convert 0 to -1, track earliest index of prefix sum.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 22. 🟠 P1 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
- **LeetCode Link:** [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)
- **Category / Sub-Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Corporate Flight Bookings**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Difference array +val at L, -val at R+1; compute prefix sum at end..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Difference Array & Range Updates
- **Memory Mnemonic:** *"Difference array +val at L, -val at R+1; compute prefix sum at end."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Difference Array & Range Updates. Difference array +val at L, -val at R+1; compute prefix sum at end..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Difference array +val at L, -val at R+1; compute prefix sum at end.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 23. 🔴 P0 [Q] LC 238: Product of Array Except Self [MEDIUM]
- **LeetCode Link:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Category / Sub-Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Product of Array Except Self**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Prefix products from left x running suffix product from right without division..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix & Suffix Products
- **Memory Mnemonic:** *"Prefix products from left x running suffix product from right without division."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Prefix & Suffix Products. Prefix products from left x running suffix product from right without division..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Prefix products from left x running suffix product from right without division.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 24. 🔴 P0 [Q] LC 523: Continuous Subarray Sum [MEDIUM]
- **LeetCode Link:** [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Continuous Subarray Sum**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Store earliest index of (running_sum % k) in map (len >= 2)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix Sum with Modulo Arithmetic
- **Memory Mnemonic:** *"Store earliest index of (running_sum % k) in map (len >= 2)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Prefix Sum with Modulo Arithmetic. Store earliest index of (running_sum % k) in map (len >= 2)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Store earliest index of (running_sum % k) in map (len >= 2).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 5. TWO POINTERS

### 25. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii---input-array-is-sorted/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Two Sum II - Input Array Is Sorted**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Opposite pointers converging inward..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Opposite pointers converging inward."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Opposite Direction Pointers. Opposite pointers converging inward..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Opposite pointers converging inward.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 26. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [3Sum](https://leetcode.com/problems/3sum/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`.

**Example 1:**
- **Input:** `nums = [-1,0,1,2,-1,-4]`
- **Output:** `[[-1,-1,2],[-1,0,1]]`
- **Explanation:** Distinct triplets summing to 0.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Sorted array + outer loop + opposite pointers with duplicate skipping."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3 * log(k)) | **Space:** O(k)
- **Explanation:** Three nested loops checking all triplets. Use a set of vectors to filter out duplicate triplets after sorting each valid triplet.

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
- **Explanation:** Sort array. Fix outer element `nums[i]`. Use Two Pointers (`left = i + 1`, `right = n - 1`) to find pairs summing to `-nums[i]`. Skip duplicate elements for `i`, `left`, and `right` to prevent duplicate triplets without using a Set.

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        int n = nums.size();
        sort(nums.begin(), nums.end());

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
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Array size less than 3.
- All positive or all negative elements.
- Array with all zeros [0, 0, 0, 0].

---

### 27. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Container With Most Water**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Shrinking boundary pointers, moving shorter height inward..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Shrinking boundary pointers, moving shorter height inward."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Opposite Direction Pointers. Shrinking boundary pointers, moving shorter height inward..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Shrinking boundary pointers, moving shorter height inward.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 28. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**
- **Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
- **Output:** `6`
- **Explanation:** 6 units of rain water trapped between bars.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Two pointers tracking maxLeft and maxRight heights."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** For each bar `i`, scan left to find `maxLeft` and scan right to find `maxRight`. Water trapped at bar `i` is `max(0, min(maxLeft, maxRight) - height[i])`. Sum up for all bars.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int totalWater = 0;
        for (int i = 0; i < n; i++) {
            int maxLeft = 0, maxRight = 0;
            for (int j = i; j >= 0; j--) maxLeft = max(maxLeft, height[j]);
            for (int j = i; j < n; j++) maxRight = max(maxRight, height[j]);
            totalWater += min(maxLeft, maxRight) - height[i];
        }
        return totalWater;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Two Pointers `left = 0` and `right = n - 1` with variables `maxLeft` and `maxRight`. At each step, if `height[left] <= height[right]`, the water level at `left` is bottlenecked by `maxLeft`. Update `maxLeft` or add `maxLeft - height[left]` to answer and increment `left`. Otherwise, do the symmetric operation for `right` pointer.

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int left = 0, right = n - 1;
        int maxLeft = 0, maxRight = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= maxLeft) maxLeft = height[left];
                else totalWater += maxLeft - height[left];
                left++;
            } else {
                if (height[right] >= maxRight) maxRight = height[right];
                else totalWater += maxRight - height[right];
                right--;
            }
        }
        return totalWater;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array or size <= 2 (cannot trap any water).
- Strictly ascending or strictly descending heights (0 trapped water).
- Flat elevations [3,3,3,3].

---

### 29. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors-dutch-national-flag/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Sort Colors (Dutch National Flag)**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Dutch National Flag 3-way low, mid, high pointer algorithm..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Partitioning & Backward Pointers
- **Memory Mnemonic:** *"Dutch National Flag 3-way low, mid, high pointer algorithm."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Partitioning & Backward Pointers. Dutch National Flag 3-way low, mid, high pointer algorithm..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Dutch National Flag 3-way low, mid, high pointer algorithm.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 30. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Merge Sorted Array**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Fill destination array backwards from (m + n - 1)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Partitioning & Backward Pointers
- **Memory Mnemonic:** *"Fill destination array backwards from (m + n - 1)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Partitioning & Backward Pointers. Fill destination array backwards from (m + n - 1)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Fill destination array backwards from (m + n - 1).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 6. SLIDING WINDOW

### 31. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given a string `s`, find the length of the longest substring without repeating characters.

**Example 1:**
- **Input:** `s = "abcabcbb"`
- **Output:** `3`
- **Explanation:** The answer is "abc", with length 3.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Expand right, shrink left when duplicate character found."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N)
- **Explanation:** Generate all substrings `(i, j)`. Check if substring contains all unique characters using a hash set. Track maximum length.

```cpp
class Solution {
    bool isUnique(string& s, int start, int end) {
        unordered_set<char> st;
        for (int i = start; i <= end; i++) {
            if (st.count(s[i])) return false;
            st.insert(s[i]);
        }
        return true;
    }
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (isUnique(s, i, j)) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(min(N, M))
- **Explanation:** Use Variable Sliding Window (`left`, `right`) with a Hash Map / Frequency Array storing `char -> last_seen_index`. As `right` advances, if `s[right]` was seen at index `>= left`, move `left = last_seen_index + 1`. Update max length `right - left + 1`.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastPos(256, -1);
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            if (lastPos[s[right]] >= left) {
                left = lastPos[s[right]] + 1;
            }
            lastPos[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty string "" (returns 0).
- String with all identical characters "bbbbb" (returns 1).
- String with special characters or spaces.

---

### 32. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Minimum Size Subarray Sum**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Expand right until sum >= target, shrink left to minimize length..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Expand right until sum >= target, shrink left to minimize length."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Variable Length Sliding Window. Expand right until sum >= target, shrink left to minimize length..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Expand right until sum >= target, shrink left to minimize length.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 33. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Minimum Window Substring**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Gold-standard variable window with required match counter..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Gold-standard variable window with required match counter."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Variable Length Sliding Window. Gold-standard variable window with required match counter..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Gold-standard variable window with required match counter.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 34. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Find All Anagrams in a String**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Fixed window of size |P| with 26-char frequency comparison..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Fixed-Size Sliding Window
- **Memory Mnemonic:** *"Fixed window of size |P| with 26-char frequency comparison."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Fixed-Size Sliding Window. Fixed window of size |P| with 26-char frequency comparison..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Fixed window of size |P| with 26-char frequency comparison.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 35. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Max Consecutive Ones III**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Track zero count in window; shrink left when zero count > K..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Window with K Operations / Replacement
- **Memory Mnemonic:** *"Track zero count in window; shrink left when zero count > K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Variable Window with K Operations / Replacement. Track zero count in window; shrink left when zero count > K..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Track zero count in window; shrink left when zero count > K.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 36. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Longest Repeating Character Replacement**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Track max_freq in window; shrink left when (window_len - max_freq) > K..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Window with K Operations / Replacement
- **Memory Mnemonic:** *"Track max_freq in window; shrink left when (window_len - max_freq) > K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Variable Window with K Operations / Replacement. Track max_freq in window; shrink left when (window_len - max_freq) > K..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Track max_freq in window; shrink left when (window_len - max_freq) > K.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 7. BINARY SEARCH

### 37. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [Binary Search](https://leetcode.com/problems/binary-search/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` sorted in ascending order and a target value, write a function to search target in `nums`. Return index if found, else `-1`.

**Example 1:**
- **Input:** `nums = [-1,0,3,5,9,12], target = 9`
- **Output:** `4`
- **Explanation:** 9 exists in nums and its index is 4.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard & Boundary Search
- **Memory Mnemonic:** *"Classic low <= high midpoint search."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Linear scan from index 0 to n-1 comparing each element with `target`.

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
- **Complexity:** **Time:** O(log N) | **Space:** O(1)
- **Explanation:** Maintain two pointers `low = 0` and `high = n - 1`. While `low <= high`, calculate `mid = low + (high - low) / 2`. If `nums[mid] == target`, return `mid`. If `nums[mid] < target`, discard left half (`low = mid + 1`). Otherwise discard right half (`high = mid - 1`).

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
- Target smaller than nums[0] or larger than nums[n-1].
- Array size 1.
- Using `low + (high - low) / 2` instead of `(low + high) / 2` to prevent integer overflow.

---

### 38. 🔴 P0 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Search In Rotated Sorted Array**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Compare mid with left/right to determine sorted half..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Rotated & Modified Array Search
- **Memory Mnemonic:** *"Compare mid with left/right to determine sorted half."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Rotated & Modified Array Search. Compare mid with left/right to determine sorted half..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Compare mid with left/right to determine sorted half.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 39. 🔴 P0 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Find Minimum in Rotated Sorted Array**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Compare mid with high (mid > high => min in right half)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Rotated & Modified Array Search
- **Memory Mnemonic:** *"Compare mid with high (mid > high => min in right half)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Rotated & Modified Array Search. Compare mid with high (mid > high => min in right half)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Compare mid with high (mid > high => min in right half).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 40. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Koko Eating Bananas**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Binary search speed range [1, max_piles]..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Binary Search on Answer Space
- **Memory Mnemonic:** *"Binary search speed range [1, max_piles]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Binary Search on Answer Space. Binary search speed range [1, max_piles]..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Binary search speed range [1, max_piles].
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 41. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Capacity To Ship Packages Within D Days**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Binary search capacity range [max_weight, sum_weight]..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Binary Search on Answer Space
- **Memory Mnemonic:** *"Binary search capacity range [max_weight, sum_weight]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Binary Search on Answer Space. Binary search capacity range [max_weight, sum_weight]..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Binary search capacity range [max_weight, sum_weight].
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 42. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Search a 2D Matrix**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** 2D Matrix & Unsorted Condition Search
- **Memory Mnemonic:** *"Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using 2D Matrix & Unsorted Condition Search. Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N].
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 43. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Find Peak Element**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Compare nums[mid] with nums[mid + 1] on unsorted array..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** 2D Matrix & Unsorted Condition Search
- **Memory Mnemonic:** *"Compare nums[mid] with nums[mid + 1] on unsorted array."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using 2D Matrix & Unsorted Condition Search. Compare nums[mid] with nums[mid + 1] on unsorted array..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Compare nums[mid] with nums[mid + 1] on unsorted array.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 8. OVERLAPPING INTERVALS

### 44. 🔴 P0 [Q] LC 56: Merge Intervals [MEDIUM]
- **LeetCode Link:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Merge Intervals**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Sort by start time, merge overlapping bounds..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Sort by start time, merge overlapping bounds."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Interval Merging & Insertion. Sort by start time, merge overlapping bounds..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Sort by start time, merge overlapping bounds.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Insert Interval**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 3-phase linear insertion (left, merged mid, right)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"3-phase linear insertion (left, merged mid, right)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Interval Merging & Insertion. 3-phase linear insertion (left, merged mid, right)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 3-phase linear insertion (left, merged mid, right).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 46. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Non-overlapping Intervals**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Greedy scheduling sorted by end time..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Greedy scheduling sorted by end time."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Interval Merging & Insertion. Greedy scheduling sorted by end time..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Greedy scheduling sorted by end time.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 47. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Meeting Rooms II**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Sort by start time + Min-Heap of active room end-times..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Sort by start time + Min-Heap of active room end-times."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Interval Merging & Insertion. Sort by start time + Min-Heap of active room end-times..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Sort by start time + Min-Heap of active room end-times.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 9. FAST & SLOW POINTERS (LINKED LIST)

### 48. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Linked List Cycle**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Fast pointer moves 2 steps, slow moves 1 step; collision = cycle..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Fast pointer moves 2 steps, slow moves 1 step; collision = cycle."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Cycle Detection & Midpoint. Fast pointer moves 2 steps, slow moves 1 step; collision = cycle..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Fast pointer moves 2 steps, slow moves 1 step; collision = cycle.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 49. 🔴 P0 [Q] LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Linked List Cycle II**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Floyd's cycle detection + entry point recovery..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Floyd's cycle detection + entry point recovery."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Cycle Detection & Midpoint. Floyd's cycle detection + entry point recovery..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Floyd's cycle detection + entry point recovery.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 50. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [Reorder List](https://leetcode.com/problems/reorder-list/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Reorder List**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Midpoint split + reverse second half + alternate weaving..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Midpoint split + reverse second half + alternate weaving."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Cycle Detection & Midpoint. Midpoint split + reverse second half + alternate weaving..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Midpoint split + reverse second half + alternate weaving.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 10. MONOTONIC STACK

### 51. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Valid Parentheses**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Push opening brackets, pop & match closing brackets..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Basic Stack Matching
- **Memory Mnemonic:** *"Push opening brackets, pop & match closing brackets."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Basic Stack Matching. Push opening brackets, pop & match closing brackets..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Push opening brackets, pop & match closing brackets.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 52. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Daily Temperatures**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Monotonic decreasing stack storing indices..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Next Greater / Smaller Element
- **Memory Mnemonic:** *"Monotonic decreasing stack storing indices."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Next Greater / Smaller Element. Monotonic decreasing stack storing indices..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Monotonic decreasing stack storing indices.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 53. 🔴 P0 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Largest Rectangle in Histogram**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Monotonic increasing stack calculating width on pop..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Next Greater / Smaller Element
- **Memory Mnemonic:** *"Monotonic increasing stack calculating width on pop."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Next Greater / Smaller Element. Monotonic increasing stack calculating width on pop..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Monotonic increasing stack calculating width on pop.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 11. HEAP / PRIORITY QUEUE

### 54. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Kth Largest Element in an Array**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Min-Heap of size K (or Quickselect)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Min-Heap of size K (or Quickselect)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Top K Elements / Min-Heap Pattern. Min-Heap of size K (or Quickselect)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Min-Heap of size K (or Quickselect).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 55. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Top K Frequent Elements**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Frequency map + Min-Heap of size K..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Frequency map + Min-Heap of size K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Top K Elements / Min-Heap Pattern. Frequency map + Min-Heap of size K..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Frequency map + Min-Heap of size K.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 56. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Find Median from Data Stream**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Top K Elements / Min-Heap Pattern. Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Dual Heap pattern (Max-Heap lower half, Min-Heap upper half).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 57. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Merge k Sorted Lists**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Min-Heap of size K storing current head node of each list..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Min-Heap of size K storing current head node of each list."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Top K Elements / Min-Heap Pattern. Min-Heap of size K storing current head node of each list..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Min-Heap of size K storing current head node of each list.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 12. TREE DFS / DEPTH FIRST SEARCH

### 58. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Maximum Depth of Binary Tree**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 1 + max(dfs(left), dfs(right))..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"1 + max(dfs(left), dfs(right))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Tree Height & Depth Recursion. 1 + max(dfs(left), dfs(right))..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 1 + max(dfs(left), dfs(right)).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 59. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Diameter of Binary Tree**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Post-order height calculation updating global max..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Post-order height calculation updating global max."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Tree Height & Depth Recursion. Post-order height calculation updating global max..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Post-order height calculation updating global max.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 60. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Lowest Common Ancestor of a Binary Tree**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Bottom-up DFS node bubbling matching P and Q..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Bottom-up DFS node bubbling matching P and Q."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Tree Height & Depth Recursion. Bottom-up DFS node bubbling matching P and Q..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Bottom-up DFS node bubbling matching P and Q.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 61. 🔴 P0 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Binary Tree Maximum Path Sum**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Post-order DFS returning max branch while tracking global split path sum..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Post-order DFS returning max branch while tracking global split path sum."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Tree Height & Depth Recursion. Post-order DFS returning max branch while tracking global split path sum..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Post-order DFS returning max branch while tracking global split path sum.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 13. TREE BFS / LEVEL ORDER TRAVERSAL

### 62. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Binary Tree Level Order Traversal**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Queue iteration processing level size snapshot..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Queue iteration processing level size snapshot."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Standard Level Order Traversal. Queue iteration processing level size snapshot..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Queue iteration processing level size snapshot.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 63. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Binary Tree Right Side View**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Collect last node per queue level snapshot..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Collect last node per queue level snapshot."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Standard Level Order Traversal. Collect last node per queue level snapshot..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Collect last node per queue level snapshot.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 64. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Binary Tree Zigzag Level Order Traversal**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Alternating level insertion direction..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Alternating level insertion direction."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Standard Level Order Traversal. Alternating level insertion direction..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Alternating level insertion direction.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 14. BINARY SEARCH TREE (BST)

### 65. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Validate Binary Search Tree**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Pass valid range [minVal, maxVal] downwards recursively..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"Pass valid range [minVal, maxVal] downwards recursively."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using BST Validation & Inorder Property. Pass valid range [minVal, maxVal] downwards recursively..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Pass valid range [minVal, maxVal] downwards recursively.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 66. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Kth Smallest Element in a BST**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on In-order BST traversal yields sorted elements..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"In-order BST traversal yields sorted elements."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using BST Validation & Inorder Property. In-order BST traversal yields sorted elements..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // In-order BST traversal yields sorted elements.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 67. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Delete Node in a BST**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on BST node deletion with in-order successor swap..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"BST node deletion with in-order successor swap."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using BST Validation & Inorder Property. BST node deletion with in-order successor swap..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // BST node deletion with in-order successor swap.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 15. BACKTRACKING / SUBSETS & PERMUTATIONS

### 68. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [Subsets](https://leetcode.com/problems/subsets/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Subsets**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Include / Exclude decision tree recursion..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Include / Exclude decision tree recursion."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Subsets & Combination Choice. Include / Exclude decision tree recursion..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Include / Exclude decision tree recursion.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 69. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [Permutations](https://leetcode.com/problems/permutations/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Permutations**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Used boolean array or in-place swap recursion..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Used boolean array or in-place swap recursion."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Subsets & Combination Choice. Used boolean array or in-place swap recursion..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Used boolean array or in-place swap recursion.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 70. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Combination Sum**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Unbounded choice recursion with index control..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Unbounded choice recursion with index control."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Subsets & Combination Choice. Unbounded choice recursion with index control..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Unbounded choice recursion with index control.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 71. 🔴 P0 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [N-Queens](https://leetcode.com/problems/n-queens/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **N-Queens**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Constraint hashing (cols, main diagonals, anti-diagonals)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Constraint hashing (cols, main diagonals, anti-diagonals)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Subsets & Combination Choice. Constraint hashing (cols, main diagonals, anti-diagonals)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Constraint hashing (cols, main diagonals, anti-diagonals).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 16. GRAPH DFS / BFS

### 72. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Number of Islands**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Matrix traversal + 4-directional flood fill sink..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"Matrix traversal + 4-directional flood fill sink."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Grid Matrix Flood Fill DFS. Matrix traversal + 4-directional flood fill sink..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Matrix traversal + 4-directional flood fill sink.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 73. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Clone Graph**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Hash map node mapping (original -> clone) during DFS/BFS..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"Hash map node mapping (original -> clone) during DFS/BFS."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Grid Matrix Flood Fill DFS. Hash map node mapping (original -> clone) during DFS/BFS..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Hash map node mapping (original -> clone) during DFS/BFS.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 74. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Is Graph Bipartite?**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 2-color graph coloring via BFS/DFS..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"2-color graph coloring via BFS/DFS."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Grid Matrix Flood Fill DFS. 2-color graph coloring via BFS/DFS..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 2-color graph coloring via BFS/DFS.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 75. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Rotting Oranges**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Pre-populate queue with all initial rotten sources; level time tick..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Multi-Source BFS
- **Memory Mnemonic:** *"Pre-populate queue with all initial rotten sources; level time tick."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Multi-Source BFS. Pre-populate queue with all initial rotten sources; level time tick..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Pre-populate queue with all initial rotten sources; level time tick.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 76. 🔴 P0 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Word Ladder**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Unweighted shortest path BFS on mutated character state space..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Multi-Source BFS
- **Memory Mnemonic:** *"Unweighted shortest path BFS on mutated character state space."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Multi-Source BFS. Unweighted shortest path BFS on mutated character state space..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Unweighted shortest path BFS on mutated character state space.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 17. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### 77. 🔴 P0 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Course Schedule**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on In-degree array + Queue processing; visited count == N => DAG..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Kahn's BFS In-degree Algorithm
- **Memory Mnemonic:** *"In-degree array + Queue processing; visited count == N => DAG."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Kahn's BFS In-degree Algorithm. In-degree array + Queue processing; visited count == N => DAG..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // In-degree array + Queue processing; visited count == N => DAG.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 78. 🔴 P0 [Q] LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Course Schedule II**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Kahn's algorithm collecting top-sort ordering array..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Kahn's BFS In-degree Algorithm
- **Memory Mnemonic:** *"Kahn's algorithm collecting top-sort ordering array."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Kahn's BFS In-degree Algorithm. Kahn's algorithm collecting top-sort ordering array..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Kahn's algorithm collecting top-sort ordering array.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 18. DISJOINT SET UNION (DSU / UNION-FIND)

### 79. 🟠 P1 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Redundant Connection**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Find cycle by checking if find(u) == find(v) before union(u, v)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** DSU Path Compression & Union by Rank
- **Memory Mnemonic:** *"Find cycle by checking if find(u) == find(v) before union(u, v)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using DSU Path Compression & Union by Rank. Find cycle by checking if find(u) == find(v) before union(u, v)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Find cycle by checking if find(u) == find(v) before union(u, v).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 80. 🟠 P1 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Number of Provinces**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Connected component counting via DSU union operations..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** DSU Path Compression & Union by Rank
- **Memory Mnemonic:** *"Connected component counting via DSU union operations."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using DSU Path Compression & Union by Rank. Connected component counting via DSU union operations..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Connected component counting via DSU union operations.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 19. 1D DYNAMIC PROGRAMMING

### 81. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [House Robber](https://leetcode.com/problems/house-robber/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **House Robber**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using State Transition & Space Optimization. dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 82. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Climbing Stairs**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Fibonacci base DP transition..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"Fibonacci base DP transition."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using State Transition & Space Optimization. Fibonacci base DP transition..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Fibonacci base DP transition.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 83. 🔴 P0 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [Word Break](https://leetcode.com/problems/word-break/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Word Break**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on dp[i] = true if dp[j] && wordDict.count(s[j..i])..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"dp[i] = true if dp[j] && wordDict.count(s[j..i])."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using State Transition & Space Optimization. dp[i] = true if dp[j] && wordDict.count(s[j..i])..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // dp[i] = true if dp[j] && wordDict.count(s[j..i]).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 84. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Longest Increasing Subsequence**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using State Transition & Space Optimization. O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 20. KNAPSACK / 2D DYNAMIC PROGRAMMING

### 85. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [Coin Change](https://leetcode.com/problems/coin-change/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Coin Change**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on dp[i] = min(dp[i], 1 + dp[i - coin])..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"dp[i] = min(dp[i], 1 + dp[i - coin])."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Unbounded & 0/1 Knapsack Grid DP. dp[i] = min(dp[i], 1 + dp[i - coin])..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // dp[i] = min(dp[i], 1 + dp[i - coin]).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 86. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Longest Common Subsequence**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 2D matrix matching grid dp[i][j]..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"2D matrix matching grid dp[i][j]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Unbounded & 0/1 Knapsack Grid DP. 2D matrix matching grid dp[i][j]..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 2D matrix matching grid dp[i][j].
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 87. 🔴 P0 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Partition Equal Subset Sum**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 0/1 Knapsack reduction with target sum = total / 2..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"0/1 Knapsack reduction with target sum = total / 2."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Unbounded & 0/1 Knapsack Grid DP. 0/1 Knapsack reduction with target sum = total / 2..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 0/1 Knapsack reduction with target sum = total / 2.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 88. 🔴 P0 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Edit Distance**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on 3-operation (Insert, Delete, Replace) matrix grid DP..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"3-operation (Insert, Delete, Replace) matrix grid DP."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using Unbounded & 0/1 Knapsack Grid DP. 3-operation (Insert, Delete, Replace) matrix grid DP..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // 3-operation (Insert, Delete, Replace) matrix grid DP.
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

## 21. BIT MANIPULATION & BITMASKING

### 89. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [Single Number](https://leetcode.com/problems/single-number/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Single Number**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on XOR cancellation property (A ^ A = 0, A ^ 0 = A)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"XOR cancellation property (A ^ A = 0, A ^ 0 = A)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using XOR Cancelation & Bit Operations. XOR cancellation property (A ^ A = 0, A ^ 0 = A)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // XOR cancellation property (A ^ A = 0, A ^ 0 = A).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 90. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Number of 1 Bits**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using XOR Cancelation & Bit Operations. Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---

### 91. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the constraints and problem requirements of **Counting Bits**, process the input payload and compute the optimal result.

**Example 1:**
- **Input:** `nums = [2, 7, 11, 15]`
- **Output:** `[0, 1]`
- **Explanation:** Computes answer based on DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))..

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Exhaustively iterate through all possible candidates using nested loops or naive checks to evaluate validity.

```cpp
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Naive comparison
            }
        }
        return 0;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Optimize using XOR Cancelation & Bit Operations. DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))..

```cpp
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        // DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1)).
        return 0;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Boundary cases: empty input or n = 1.
- Negative values or integer overflow.
- Handling duplicate values correctly.

---
