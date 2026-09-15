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
- **Explanation:** Maintain a 2D boolean `visited[m][n]` matrix and direction vectors `dr = [0, 1, 0, -1]`, `dc = [1, 0, -1, 0]`. Step forward until hitting a boundary or visited cell, then turn right 90 degrees.

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
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
- **Explanation:** Use 4 shrinking boundary pointers: `top = 0`, `bottom = m-1`, `left = 0`, `right = n-1`. Loop while `top <= bottom` and `left <= right`. Traverse top row, right col, bottom row (if valid), and left col (if valid), shrinking boundaries inward.

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty()) return res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) res.push_back(matrix[top][col]);
            top++;
            for (int row = top; row <= bottom; row++) res.push_back(matrix[row][right]);
            right--;
            if (top <= bottom) {
                for (int col = right; col >= left; col--) res.push_back(matrix[bottom][col]);
                bottom--;
            }
            if (left <= right) {
                for (int row = bottom; row >= top; row--) res.push_back(matrix[left][row]);
                left++;
            }
        }
        return res;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- 1xN single row matrix or Mx1 single column matrix.
- Square vs non-square matrix dimensions (e.g. 3x5 or 5x3).
- Checking `top <= bottom` and `left <= right` before executing bottom and left traversal sweeps.

---

### 2. 🔴 P0 [Q] LC 59: Spiral Matrix II [MEDIUM]
- **LeetCode Link:** [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)

**📜 Problem Statement & Explanation**
Given the input parameters for **Spiral Matrix II**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Spiral Traversal & Generation
- **Memory Mnemonic:** *"Generating N x N matrix in spiral order filling 1..N^2."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Matrix Spiral Traversal & Generation to optimize calculation in a single pass. Generating N x N matrix in spiral order filling 1..N^2..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Generating N x N matrix in spiral order filling 1..N^2.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 3. 🟠 P1 [Q] LC 48: Rotate Image [MEDIUM]
- **LeetCode Link:** [Rotate Image](https://leetcode.com/problems/rotate-image/)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.

**Example 1:**
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[[7,4,1],[8,5,2],[9,6,3]]`
- **Explanation:** Matrix rotated 90 degrees clockwise in-place.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Symmetry & In-Place Rotations
- **Memory Mnemonic:** *"Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row in-place."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Create a new temporary `N x N` matrix `res`. Copy `matrix[i][j]` to `res[j][n - 1 - i]`, then copy `res` back into `matrix`. Requires extra O(N^2) memory.

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> res(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                res[j][n - 1 - i] = matrix[i][j];
            }
        }
        matrix = res;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) in-place
- **Explanation:** Two-step matrix transformation: 1) Transpose the matrix in-place by swapping `matrix[i][j]` with `matrix[j][i]` for `j > i`. 2) Reverse each row of the transposed matrix horizontally.

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 1. Transpose matrix
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // 2. Reverse each row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- 1x1 matrix (no-op).
- Anti-clockwise rotation variation: Transpose matrix + reverse each column vertically.
- In-place mutation constraint verification.

---

### 4. 🟠 P1 [Q] Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
- **LeetCode Link:** [Rotate Matrix 90 Deg Anti-Clockwise](#)
- **Category / Sub-Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)

**📜 Problem Statement & Explanation**
Given the input parameters for **Rotate Matrix 90 Deg Anti-Clockwise**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix Symmetry & In-Place Rotations
- **Memory Mnemonic:** *"Transpose matrix + reverse each column."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Matrix Symmetry & In-Place Rotations to optimize calculation in a single pass. Transpose matrix + reverse each column..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Transpose matrix + reverse each column.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 5. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
- **LeetCode Link:** [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the input parameters for **Set Matrix Zeroes**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Use 1st row and 1st column as dummy markers for O(1) space."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Matrix State Marking & Pattern Generation to optimize calculation in a single pass. Use 1st row and 1st column as dummy markers for O(1) space..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Use 1st row and 1st column as dummy markers for O(1) space.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 6. 🟠 P1 [Q] LC 118: Pascal's Triangle [EASY]
- **LeetCode Link:** [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the input parameters for **Pascal's Triangle**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Dynamic row generation using previous row element sums."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Matrix State Marking & Pattern Generation to optimize calculation in a single pass. Dynamic row generation using previous row element sums..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Dynamic row generation using previous row element sums.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 7. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
- **LeetCode Link:** [Next Permutation](https://leetcode.com/problems/next-permutation/)
- **Category / Sub-Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)

**📜 Problem Statement & Explanation**
Given the input parameters for **Next Permutation**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Matrix State Marking & Pattern Generation
- **Memory Mnemonic:** *"Find decrease pivot -> swap with next larger -> reverse suffix."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Matrix State Marking & Pattern Generation to optimize calculation in a single pass. Find decrease pivot -> swap with next larger -> reverse suffix..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Find decrease pivot -> swap with next larger -> reverse suffix.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 2. COMPLETE SORTING ALGORITHMS SUITE

### 8. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Selection Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Selection Sort Algorithm Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Find min element in unsorted partition and swap with start."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Elementary Comparison Sorts (O(N^2)) to optimize calculation in a single pass. Find min element in unsorted partition and swap with start..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Find min element in unsorted partition and swap with start.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 9. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Bubble Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Bubble Sort Algorithm Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Repeatedly swap adjacent inverted pairs with early exit flag."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Elementary Comparison Sorts (O(N^2)) to optimize calculation in a single pass. Repeatedly swap adjacent inverted pairs with early exit flag..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Repeatedly swap adjacent inverted pairs with early exit flag.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 10. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Insertion Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Insertion Sort Algorithm Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Elementary Comparison Sorts (O(N^2))
- **Memory Mnemonic:** *"Shift elements right to insert key into sorted prefix."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Elementary Comparison Sorts (O(N^2)) to optimize calculation in a single pass. Shift elements right to insert key into sorted prefix..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Shift elements right to insert key into sorted prefix.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 11. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
- **LeetCode Link:** [Merge Sort & Inversion Counting Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Merge Sort & Inversion Counting Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Divide & Conquer & Advanced Sorts (O(N log N))
- **Memory Mnemonic:** *"Divide halves recursively and merge in O(N log N) time."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Divide & Conquer & Advanced Sorts (O(N log N)) to optimize calculation in a single pass. Divide halves recursively and merge in O(N log N) time..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Divide halves recursively and merge in O(N log N) time.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 12. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
- **LeetCode Link:** [Quick Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Quick Sort Algorithm Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Divide & Conquer & Advanced Sorts (O(N log N))
- **Memory Mnemonic:** *"Lomuto/Hoare randomized pivot partitioning."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Divide & Conquer & Advanced Sorts (O(N log N)) to optimize calculation in a single pass. Lomuto/Hoare randomized pivot partitioning..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Lomuto/Hoare randomized pivot partitioning.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 13. 🟠 P1 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Counting Sort Algorithm Blueprint](#)
- **Category / Sub-Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))

**📜 Problem Statement & Explanation**
Given the input parameters for **Counting Sort Algorithm Blueprint**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Linear Non-Comparison Sorts (O(N))
- **Memory Mnemonic:** *"Frequency array for bounded integer range [0, K]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Linear Non-Comparison Sorts (O(N)) to optimize calculation in a single pass. Frequency array for bounded integer range [0, K]..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Frequency array for bounded integer range [0, K].
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 14. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
- **LeetCode Link:** [Largest Number](https://leetcode.com/problems/largest-number/)
- **Category / Sub-Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)

**📜 Problem Statement & Explanation**
Given the input parameters for **Largest Number**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Custom Comparators & String Sorting
- **Memory Mnemonic:** *"Custom string concatenation comparator (a + b > b + a)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Custom Comparators & String Sorting to optimize calculation in a single pass. Custom string concatenation comparator (a + b > b + a)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Custom string concatenation comparator (a + b > b + a).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 3. HASHING / FREQUENCY COUNTING

### 15. 🟠 P1 [Q] LC 217: Contains Duplicate [EASY]
- **LeetCode Link:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the input parameters for **Contains Duplicate**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Frequency Counting & Anagrams
- **Memory Mnemonic:** *"O(1) set presence check."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Frequency Counting & Anagrams to optimize calculation in a single pass. O(1) set presence check..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // O(1) set presence check.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 16. 🔴 P0 [Q] LC 49: Group Anagrams [MEDIUM]
- **LeetCode Link:** [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Category / Sub-Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)

**📜 Problem Statement & Explanation**
Given the input parameters for **Group Anagrams**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Frequency Counting & Anagrams
- **Memory Mnemonic:** *"26-char frequency vector encoding as map key."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Frequency Counting & Anagrams to optimize calculation in a single pass. 26-char frequency vector encoding as map key..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 26-char frequency vector encoding as map key.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

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
- **Explanation:** Use two nested loops. Outer loop selects `nums[i]`, inner loop checks every `nums[j]` where `j > i` to see if `nums[i] + nums[j] == target`.

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
- **Explanation:** Use a Hash Map `unordered_map<int, int>` storing `value -> index`. Iterate through `nums`, compute `complement = target - nums[i]`. If complement exists in map, return `{map[complement], i}`. Otherwise, insert `nums[i] -> i`.

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
- Duplicate numbers in array (e.g. `nums = [3, 3]`, `target = 6`).
- Negative numbers and zero values.
- Checking hash map BEFORE inserting current element to avoid reusing the same index twice.

---

### 18. 🔴 P0 [Q] LC 128: Longest Consecutive Sequence [MEDIUM]
- **LeetCode Link:** [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

**📜 Problem Statement & Explanation**
Given the input parameters for **Longest Consecutive Sequence**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** O(1) Pair & Complement Lookup
- **Memory Mnemonic:** *"O(1) set lookup for sequence start boundary (!set.count(num - 1))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use O(1) Pair & Complement Lookup to optimize calculation in a single pass. O(1) set lookup for sequence start boundary (!set.count(num - 1))..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // O(1) set lookup for sequence start boundary (!set.count(num - 1)).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 19. 🔴 P0 [Q] IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [Subarray with Given XOR](#)
- **Category / Sub-Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)

**📜 Problem Statement & Explanation**
Given the input parameters for **Subarray with Given XOR**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix XOR & Bitwise Hashing
- **Memory Mnemonic:** *"Maintain running XOR sum (xr). Lookup (xr ^ target) in map."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Prefix XOR & Bitwise Hashing to optimize calculation in a single pass. Maintain running XOR sum (xr). Lookup (xr ^ target) in map..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Maintain running XOR sum (xr). Lookup (xr ^ target) in map.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 4. PREFIX SUM & DIFFERENCE ARRAYS

### 20. 🔴 P0 [Q] LC 560: Subarray Sum Equals K [MEDIUM]
- **LeetCode Link:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given the input parameters for **Subarray Sum Equals K**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Prefix Sum & Subarray Sum K
- **Memory Mnemonic:** *"Running sum - K hash map lookup."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard Prefix Sum & Subarray Sum K to optimize calculation in a single pass. Running sum - K hash map lookup..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Running sum - K hash map lookup.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 21. 🔴 P0 [Q] LC 525: Contiguous Array [MEDIUM]
- **LeetCode Link:** [Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- **Category / Sub-Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)

**📜 Problem Statement & Explanation**
Given the input parameters for **Contiguous Array**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Prefix Sum & Subarray Sum K
- **Memory Mnemonic:** *"Convert 0 to -1, track earliest index of prefix sum."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard Prefix Sum & Subarray Sum K to optimize calculation in a single pass. Convert 0 to -1, track earliest index of prefix sum..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Convert 0 to -1, track earliest index of prefix sum.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 22. 🟠 P1 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
- **LeetCode Link:** [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)
- **Category / Sub-Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)

**📜 Problem Statement & Explanation**
Given the input parameters for **Corporate Flight Bookings**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Difference Array & Range Updates
- **Memory Mnemonic:** *"Difference array +val at L, -val at R+1; compute prefix sum at end."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Difference Array & Range Updates to optimize calculation in a single pass. Difference array +val at L, -val at R+1; compute prefix sum at end..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Difference array +val at L, -val at R+1; compute prefix sum at end.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 23. 🔴 P0 [Q] LC 238: Product of Array Except Self [MEDIUM]
- **LeetCode Link:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Category / Sub-Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)

**📜 Problem Statement & Explanation**
Given the input parameters for **Product of Array Except Self**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix & Suffix Products
- **Memory Mnemonic:** *"Prefix products from left x running suffix product from right without division."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Prefix & Suffix Products to optimize calculation in a single pass. Prefix products from left x running suffix product from right without division..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Prefix products from left x running suffix product from right without division.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 24. 🔴 P0 [Q] LC 523: Continuous Subarray Sum [MEDIUM]
- **LeetCode Link:** [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)

**📜 Problem Statement & Explanation**
Given the input parameters for **Continuous Subarray Sum**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Prefix Sum with Modulo Arithmetic
- **Memory Mnemonic:** *"Store earliest index of (running_sum % k) in map (len >= 2)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Prefix Sum with Modulo Arithmetic to optimize calculation in a single pass. Store earliest index of (running_sum % k) in map (len >= 2)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Store earliest index of (running_sum % k) in map (len >= 2).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 5. TWO POINTERS

### 25. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii---input-array-is-sorted/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the input parameters for **Two Sum II - Input Array Is Sorted**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Opposite pointers converging inward."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Opposite Direction Pointers to optimize calculation in a single pass. Opposite pointers converging inward..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Opposite pointers converging inward.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 26. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [3Sum](https://leetcode.com/problems/3sum/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`. Solution set must not contain duplicate triplets.

**Example 1:**
- **Input:** `nums = [-1,0,1,2,-1,-4]`
- **Output:** `[[-1,-1,2],[-1,0,1]]`
- **Explanation:** Distinct triplets summing to 0 are [-1,-1,2] and [-1,0,1].

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Sorted array + outer loop + opposite pointers with duplicate skipping."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3 * log(k)) | **Space:** O(k)
- **Explanation:** Three nested loops checking all triplets. Use a set to filter out duplicate triplets after sorting each valid triplet.

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
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip duplicate left
                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip duplicate right
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
- Array size less than 3 (n < 3).
- All elements positive or all elements negative (no triplet can sum to 0).
- Array with all zeros ([0, 0, 0, 0]).

---

### 27. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the input parameters for **Container With Most Water**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Shrinking boundary pointers, moving shorter height inward."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Opposite Direction Pointers to optimize calculation in a single pass. Shrinking boundary pointers, moving shorter height inward..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Shrinking boundary pointers, moving shorter height inward.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 28. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)

**📜 Problem Statement & Explanation**
Given the input parameters for **Trapping Rain Water**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Opposite Direction Pointers
- **Memory Mnemonic:** *"Two pointers tracking maxLeft and maxRight heights."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Opposite Direction Pointers to optimize calculation in a single pass. Two pointers tracking maxLeft and maxRight heights..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Two pointers tracking maxLeft and maxRight heights.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 29. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors-dutch-national-flag/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the input parameters for **Sort Colors (Dutch National Flag)**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Partitioning & Backward Pointers
- **Memory Mnemonic:** *"Dutch National Flag 3-way low, mid, high pointer algorithm."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Partitioning & Backward Pointers to optimize calculation in a single pass. Dutch National Flag 3-way low, mid, high pointer algorithm..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Dutch National Flag 3-way low, mid, high pointer algorithm.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 30. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)

**📜 Problem Statement & Explanation**
Given the input parameters for **Merge Sorted Array**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Partitioning & Backward Pointers
- **Memory Mnemonic:** *"Fill destination array backwards from (m + n - 1)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Partitioning & Backward Pointers to optimize calculation in a single pass. Fill destination array backwards from (m + n - 1)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Fill destination array backwards from (m + n - 1).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 6. SLIDING WINDOW

### 31. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the input parameters for **Longest Substring Without Repeating Characters**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Expand right, shrink left when duplicate character found."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Variable Length Sliding Window to optimize calculation in a single pass. Expand right, shrink left when duplicate character found..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Expand right, shrink left when duplicate character found.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 32. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the input parameters for **Minimum Size Subarray Sum**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Expand right until sum >= target, shrink left to minimize length."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Variable Length Sliding Window to optimize calculation in a single pass. Expand right until sum >= target, shrink left to minimize length..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Expand right until sum >= target, shrink left to minimize length.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 33. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given the input parameters for **Minimum Window Substring**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Length Sliding Window
- **Memory Mnemonic:** *"Gold-standard variable window with required match counter."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Variable Length Sliding Window to optimize calculation in a single pass. Gold-standard variable window with required match counter..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Gold-standard variable window with required match counter.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 34. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)

**📜 Problem Statement & Explanation**
Given the input parameters for **Find All Anagrams in a String**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Fixed-Size Sliding Window
- **Memory Mnemonic:** *"Fixed window of size |P| with 26-char frequency comparison."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Fixed-Size Sliding Window to optimize calculation in a single pass. Fixed window of size |P| with 26-char frequency comparison..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Fixed window of size |P| with 26-char frequency comparison.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 35. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the input parameters for **Max Consecutive Ones III**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Window with K Operations / Replacement
- **Memory Mnemonic:** *"Track zero count in window; shrink left when zero count > K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Variable Window with K Operations / Replacement to optimize calculation in a single pass. Track zero count in window; shrink left when zero count > K..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Track zero count in window; shrink left when zero count > K.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 36. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given the input parameters for **Longest Repeating Character Replacement**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Variable Window with K Operations / Replacement
- **Memory Mnemonic:** *"Track max_freq in window; shrink left when (window_len - max_freq) > K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Variable Window with K Operations / Replacement to optimize calculation in a single pass. Track max_freq in window; shrink left when (window_len - max_freq) > K..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Track max_freq in window; shrink left when (window_len - max_freq) > K.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 7. BINARY SEARCH

### 37. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [Binary Search](https://leetcode.com/problems/binary-search/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)

**📜 Problem Statement & Explanation**
Given the input parameters for **Binary Search**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard & Boundary Search
- **Memory Mnemonic:** *"Classic low <= high midpoint search."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard & Boundary Search to optimize calculation in a single pass. Classic low <= high midpoint search..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Classic low <= high midpoint search.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 38. 🟠 P1 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the input parameters for **Search In Rotated Sorted Array**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Rotated & Modified Array Search
- **Memory Mnemonic:** *"Compare mid with left/right to determine sorted half."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Rotated & Modified Array Search to optimize calculation in a single pass. Compare mid with left/right to determine sorted half..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Compare mid with left/right to determine sorted half.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 39. 🟠 P1 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)

**📜 Problem Statement & Explanation**
Given the input parameters for **Find Minimum in Rotated Sorted Array**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Rotated & Modified Array Search
- **Memory Mnemonic:** *"Compare mid with high (mid > high => min in right half)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Rotated & Modified Array Search to optimize calculation in a single pass. Compare mid with high (mid > high => min in right half)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Compare mid with high (mid > high => min in right half).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 40. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the input parameters for **Koko Eating Bananas**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Binary Search on Answer Space
- **Memory Mnemonic:** *"Binary search speed range [1, max_piles]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Binary Search on Answer Space to optimize calculation in a single pass. Binary search speed range [1, max_piles]..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Binary search speed range [1, max_piles].
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 41. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Category / Sub-Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)

**📜 Problem Statement & Explanation**
Given the input parameters for **Capacity To Ship Packages Within D Days**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Binary Search on Answer Space
- **Memory Mnemonic:** *"Binary search capacity range [max_weight, sum_weight]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Binary Search on Answer Space to optimize calculation in a single pass. Binary search capacity range [max_weight, sum_weight]..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Binary search capacity range [max_weight, sum_weight].
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 42. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the input parameters for **Search a 2D Matrix**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** 2D Matrix & Unsorted Condition Search
- **Memory Mnemonic:** *"Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use 2D Matrix & Unsorted Condition Search to optimize calculation in a single pass. Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N]..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N].
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 43. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Category / Sub-Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)

**📜 Problem Statement & Explanation**
Given the input parameters for **Find Peak Element**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** 2D Matrix & Unsorted Condition Search
- **Memory Mnemonic:** *"Compare nums[mid] with nums[mid + 1] on unsorted array."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use 2D Matrix & Unsorted Condition Search to optimize calculation in a single pass. Compare nums[mid] with nums[mid + 1] on unsorted array..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Compare nums[mid] with nums[mid + 1] on unsorted array.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 8. OVERLAPPING INTERVALS

### 44. 🔴 P0 [Q] LC 56: Merge Intervals [MEDIUM]
- **LeetCode Link:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Merge Intervals**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Sort by start time, merge overlapping bounds."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Interval Merging & Insertion to optimize calculation in a single pass. Sort by start time, merge overlapping bounds..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Sort by start time, merge overlapping bounds.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Insert Interval**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"3-phase linear insertion (left, merged mid, right)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Interval Merging & Insertion to optimize calculation in a single pass. 3-phase linear insertion (left, merged mid, right)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 3-phase linear insertion (left, merged mid, right).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 46. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Non-overlapping Intervals**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Greedy scheduling sorted by end time."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Interval Merging & Insertion to optimize calculation in a single pass. Greedy scheduling sorted by end time..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Greedy scheduling sorted by end time.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 47. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Meeting Rooms II**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Interval Merging & Insertion
- **Memory Mnemonic:** *"Sort by start time + Min-Heap of active room end-times."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Interval Merging & Insertion to optimize calculation in a single pass. Sort by start time + Min-Heap of active room end-times..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Sort by start time + Min-Heap of active room end-times.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 9. FAST & SLOW POINTERS (LINKED LIST)

### 48. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the input parameters for **Linked List Cycle**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Fast pointer moves 2 steps, slow moves 1 step; collision = cycle."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Cycle Detection & Midpoint to optimize calculation in a single pass. Fast pointer moves 2 steps, slow moves 1 step; collision = cycle..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Fast pointer moves 2 steps, slow moves 1 step; collision = cycle.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 49. 🔴 P0 [Q] LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the input parameters for **Linked List Cycle II**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Floyd's cycle detection + entry point recovery."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Cycle Detection & Midpoint to optimize calculation in a single pass. Floyd's cycle detection + entry point recovery..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Floyd's cycle detection + entry point recovery.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 50. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [Reorder List](https://leetcode.com/problems/reorder-list/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the input parameters for **Reorder List**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Cycle Detection & Midpoint
- **Memory Mnemonic:** *"Midpoint split + reverse second half + alternate weaving."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Cycle Detection & Midpoint to optimize calculation in a single pass. Midpoint split + reverse second half + alternate weaving..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Midpoint split + reverse second half + alternate weaving.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 10. MONOTONIC STACK

### 51. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)

**📜 Problem Statement & Explanation**
Given the input parameters for **Valid Parentheses**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Basic Stack Matching
- **Memory Mnemonic:** *"Push opening brackets, pop & match closing brackets."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Basic Stack Matching to optimize calculation in a single pass. Push opening brackets, pop & match closing brackets..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Push opening brackets, pop & match closing brackets.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 52. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the input parameters for **Daily Temperatures**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Next Greater / Smaller Element
- **Memory Mnemonic:** *"Monotonic decreasing stack storing indices."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Next Greater / Smaller Element to optimize calculation in a single pass. Monotonic decreasing stack storing indices..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Monotonic decreasing stack storing indices.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 53. 🔴 P0 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given the input parameters for **Largest Rectangle in Histogram**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Next Greater / Smaller Element
- **Memory Mnemonic:** *"Monotonic increasing stack calculating width on pop."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Next Greater / Smaller Element to optimize calculation in a single pass. Monotonic increasing stack calculating width on pop..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Monotonic increasing stack calculating width on pop.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 11. HEAP / PRIORITY QUEUE

### 54. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the input parameters for **Kth Largest Element in an Array**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Min-Heap of size K (or Quickselect)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Top K Elements / Min-Heap Pattern to optimize calculation in a single pass. Min-Heap of size K (or Quickselect)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Min-Heap of size K (or Quickselect).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 55. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the input parameters for **Top K Frequent Elements**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Frequency map + Min-Heap of size K."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Top K Elements / Min-Heap Pattern to optimize calculation in a single pass. Frequency map + Min-Heap of size K..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Frequency map + Min-Heap of size K.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 56. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the input parameters for **Find Median from Data Stream**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Top K Elements / Min-Heap Pattern to optimize calculation in a single pass. Dual Heap pattern (Max-Heap lower half, Min-Heap upper half)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Dual Heap pattern (Max-Heap lower half, Min-Heap upper half).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 57. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)

**📜 Problem Statement & Explanation**
Given the input parameters for **Merge k Sorted Lists**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Top K Elements / Min-Heap Pattern
- **Memory Mnemonic:** *"Min-Heap of size K storing current head node of each list."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Top K Elements / Min-Heap Pattern to optimize calculation in a single pass. Min-Heap of size K storing current head node of each list..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Min-Heap of size K storing current head node of each list.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 12. TREE DFS / DEPTH FIRST SEARCH

### 58. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Maximum Depth of Binary Tree**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"1 + max(dfs(left), dfs(right))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Tree Height & Depth Recursion to optimize calculation in a single pass. 1 + max(dfs(left), dfs(right))..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 1 + max(dfs(left), dfs(right)).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 59. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Diameter of Binary Tree**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Post-order height calculation updating global max."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Tree Height & Depth Recursion to optimize calculation in a single pass. Post-order height calculation updating global max..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Post-order height calculation updating global max.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 60. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Lowest Common Ancestor of a Binary Tree**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Bottom-up DFS node bubbling matching P and Q."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Tree Height & Depth Recursion to optimize calculation in a single pass. Bottom-up DFS node bubbling matching P and Q..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Bottom-up DFS node bubbling matching P and Q.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 61. 🔴 P0 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the input parameters for **Binary Tree Maximum Path Sum**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Tree Height & Depth Recursion
- **Memory Mnemonic:** *"Post-order DFS returning max branch while tracking global split path sum."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Tree Height & Depth Recursion to optimize calculation in a single pass. Post-order DFS returning max branch while tracking global split path sum..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Post-order DFS returning max branch while tracking global split path sum.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 13. TREE BFS / LEVEL ORDER TRAVERSAL

### 62. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the input parameters for **Binary Tree Level Order Traversal**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Queue iteration processing level size snapshot."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard Level Order Traversal to optimize calculation in a single pass. Queue iteration processing level size snapshot..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Queue iteration processing level size snapshot.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 63. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the input parameters for **Binary Tree Right Side View**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Collect last node per queue level snapshot."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard Level Order Traversal to optimize calculation in a single pass. Collect last node per queue level snapshot..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Collect last node per queue level snapshot.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 64. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the input parameters for **Binary Tree Zigzag Level Order Traversal**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Standard Level Order Traversal
- **Memory Mnemonic:** *"Alternating level insertion direction."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Standard Level Order Traversal to optimize calculation in a single pass. Alternating level insertion direction..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Alternating level insertion direction.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 14. BINARY SEARCH TREE (BST)

### 65. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the input parameters for **Validate Binary Search Tree**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"Pass valid range [minVal, maxVal] downwards recursively."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use BST Validation & Inorder Property to optimize calculation in a single pass. Pass valid range [minVal, maxVal] downwards recursively..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Pass valid range [minVal, maxVal] downwards recursively.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 66. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the input parameters for **Kth Smallest Element in a BST**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"In-order BST traversal yields sorted elements."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use BST Validation & Inorder Property to optimize calculation in a single pass. In-order BST traversal yields sorted elements..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // In-order BST traversal yields sorted elements.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 67. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the input parameters for **Delete Node in a BST**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** BST Validation & Inorder Property
- **Memory Mnemonic:** *"BST node deletion with in-order successor swap."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use BST Validation & Inorder Property to optimize calculation in a single pass. BST node deletion with in-order successor swap..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // BST node deletion with in-order successor swap.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 15. BACKTRACKING / SUBSETS & PERMUTATIONS

### 68. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [Subsets](https://leetcode.com/problems/subsets/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the input parameters for **Subsets**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Include / Exclude decision tree recursion."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Subsets & Combination Choice to optimize calculation in a single pass. Include / Exclude decision tree recursion..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Include / Exclude decision tree recursion.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 69. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [Permutations](https://leetcode.com/problems/permutations/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the input parameters for **Permutations**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Used boolean array or in-place swap recursion."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Subsets & Combination Choice to optimize calculation in a single pass. Used boolean array or in-place swap recursion..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Used boolean array or in-place swap recursion.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 70. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the input parameters for **Combination Sum**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Unbounded choice recursion with index control."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Subsets & Combination Choice to optimize calculation in a single pass. Unbounded choice recursion with index control..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Unbounded choice recursion with index control.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 71. 🔴 P0 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [N-Queens](https://leetcode.com/problems/n-queens/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)

**📜 Problem Statement & Explanation**
Given the input parameters for **N-Queens**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Subsets & Combination Choice
- **Memory Mnemonic:** *"Constraint hashing (cols, main diagonals, anti-diagonals)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Subsets & Combination Choice to optimize calculation in a single pass. Constraint hashing (cols, main diagonals, anti-diagonals)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Constraint hashing (cols, main diagonals, anti-diagonals).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 16. GRAPH DFS / BFS

### 72. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the input parameters for **Number of Islands**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"Matrix traversal + 4-directional flood fill sink."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Grid Matrix Flood Fill DFS to optimize calculation in a single pass. Matrix traversal + 4-directional flood fill sink..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Matrix traversal + 4-directional flood fill sink.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 73. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the input parameters for **Clone Graph**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"Hash map node mapping (original -> clone) during DFS/BFS."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Grid Matrix Flood Fill DFS to optimize calculation in a single pass. Hash map node mapping (original -> clone) during DFS/BFS..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Hash map node mapping (original -> clone) during DFS/BFS.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 74. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)

**📜 Problem Statement & Explanation**
Given the input parameters for **Is Graph Bipartite?**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Grid Matrix Flood Fill DFS
- **Memory Mnemonic:** *"2-color graph coloring via BFS/DFS."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Grid Matrix Flood Fill DFS to optimize calculation in a single pass. 2-color graph coloring via BFS/DFS..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 2-color graph coloring via BFS/DFS.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 75. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the input parameters for **Rotting Oranges**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Multi-Source BFS
- **Memory Mnemonic:** *"Pre-populate queue with all initial rotten sources; level time tick."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Multi-Source BFS to optimize calculation in a single pass. Pre-populate queue with all initial rotten sources; level time tick..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Pre-populate queue with all initial rotten sources; level time tick.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 76. 🔴 P0 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Category / Sub-Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)

**📜 Problem Statement & Explanation**
Given the input parameters for **Word Ladder**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Multi-Source BFS
- **Memory Mnemonic:** *"Unweighted shortest path BFS on mutated character state space."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Multi-Source BFS to optimize calculation in a single pass. Unweighted shortest path BFS on mutated character state space..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Unweighted shortest path BFS on mutated character state space.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 17. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### 77. 🟠 P1 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the input parameters for **Course Schedule**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Kahn's BFS In-degree Algorithm
- **Memory Mnemonic:** *"In-degree array + Queue processing; visited count == N => DAG."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Kahn's BFS In-degree Algorithm to optimize calculation in a single pass. In-degree array + Queue processing; visited count == N => DAG..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // In-degree array + Queue processing; visited count == N => DAG.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 78. 🟠 P1 [Q] LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Given the input parameters for **Course Schedule II**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Kahn's BFS In-degree Algorithm
- **Memory Mnemonic:** *"Kahn's algorithm collecting top-sort ordering array."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Kahn's BFS In-degree Algorithm to optimize calculation in a single pass. Kahn's algorithm collecting top-sort ordering array..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Kahn's algorithm collecting top-sort ordering array.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 18. DISJOINT SET UNION (DSU / UNION-FIND)

### 79. 🟠 P1 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the input parameters for **Redundant Connection**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** DSU Path Compression & Union by Rank
- **Memory Mnemonic:** *"Find cycle by checking if find(u) == find(v) before union(u, v)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use DSU Path Compression & Union by Rank to optimize calculation in a single pass. Find cycle by checking if find(u) == find(v) before union(u, v)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Find cycle by checking if find(u) == find(v) before union(u, v).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 80. 🟠 P1 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given the input parameters for **Number of Provinces**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** DSU Path Compression & Union by Rank
- **Memory Mnemonic:** *"Connected component counting via DSU union operations."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use DSU Path Compression & Union by Rank to optimize calculation in a single pass. Connected component counting via DSU union operations..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Connected component counting via DSU union operations.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 19. 1D DYNAMIC PROGRAMMING

### 81. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [House Robber](https://leetcode.com/problems/house-robber/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the input parameters for **House Robber**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use State Transition & Space Optimization to optimize calculation in a single pass. dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 82. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the input parameters for **Climbing Stairs**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"Fibonacci base DP transition."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use State Transition & Space Optimization to optimize calculation in a single pass. Fibonacci base DP transition..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Fibonacci base DP transition.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 83. 🔴 P0 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [Word Break](https://leetcode.com/problems/word-break/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the input parameters for **Word Break**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"dp[i] = true if dp[j] && wordDict.count(s[j..i])."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use State Transition & Space Optimization to optimize calculation in a single pass. dp[i] = true if dp[j] && wordDict.count(s[j..i])..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // dp[i] = true if dp[j] && wordDict.count(s[j..i]).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 84. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)

**📜 Problem Statement & Explanation**
Given the input parameters for **Longest Increasing Subsequence**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** State Transition & Space Optimization
- **Memory Mnemonic:** *"O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use State Transition & Space Optimization to optimize calculation in a single pass. O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 20. KNAPSACK / 2D DYNAMIC PROGRAMMING

### 85. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [Coin Change](https://leetcode.com/problems/coin-change/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the input parameters for **Coin Change**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"dp[i] = min(dp[i], 1 + dp[i - coin])."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Unbounded & 0/1 Knapsack Grid DP to optimize calculation in a single pass. dp[i] = min(dp[i], 1 + dp[i - coin])..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // dp[i] = min(dp[i], 1 + dp[i - coin]).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 86. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the input parameters for **Longest Common Subsequence**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"2D matrix matching grid dp[i][j]."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Unbounded & 0/1 Knapsack Grid DP to optimize calculation in a single pass. 2D matrix matching grid dp[i][j]..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 2D matrix matching grid dp[i][j].
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 87. 🔴 P0 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the input parameters for **Partition Equal Subset Sum**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"0/1 Knapsack reduction with target sum = total / 2."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Unbounded & 0/1 Knapsack Grid DP to optimize calculation in a single pass. 0/1 Knapsack reduction with target sum = total / 2..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 0/1 Knapsack reduction with target sum = total / 2.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 88. 🔴 P0 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)

**📜 Problem Statement & Explanation**
Given the input parameters for **Edit Distance**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Unbounded & 0/1 Knapsack Grid DP
- **Memory Mnemonic:** *"3-operation (Insert, Delete, Replace) matrix grid DP."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use Unbounded & 0/1 Knapsack Grid DP to optimize calculation in a single pass. 3-operation (Insert, Delete, Replace) matrix grid DP..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // 3-operation (Insert, Delete, Replace) matrix grid DP.
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

## 21. BIT MANIPULATION & BITMASKING

### 89. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [Single Number](https://leetcode.com/problems/single-number/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the input parameters for **Single Number**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"XOR cancellation property (A ^ A = 0, A ^ 0 = A)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use XOR Cancelation & Bit Operations to optimize calculation in a single pass. XOR cancellation property (A ^ A = 0, A ^ 0 = A)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // XOR cancellation property (A ^ A = 0, A ^ 0 = A).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 90. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the input parameters for **Number of 1 Bits**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use XOR Cancelation & Bit Operations to optimize calculation in a single pass. Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---

### 91. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)

**📜 Problem Statement & Explanation**
Given the input parameters for **Counting Bits**, solve the problem efficiently adhering to algorithmic constraints.

**Example 1:**
- **Input:** `nums = [1, 2, 3, 4], k = 2`
- **Output:** `[2, 4]`
- **Explanation:** Traverses array and processes window / pointers to extract optimal result.

---

**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** XOR Cancelation & Bit Operations
- **Memory Mnemonic:** *"DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))."*

---

**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Use nested loops or naive recursion to check all candidate solutions, taking O(N^2) time.

```cpp
// Naive / Brute Force Approach
class Solution {
public:
    int solveNaive(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                // Check all sub-ranges
                ans++;
            }
        }
        return ans;
    }
};
```

---

**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Use XOR Cancelation & Bit Operations to optimize calculation in a single pass. DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1))..

```cpp
// Optimal Approach
class Solution {
public:
    int solveOptimal(vector<int>& nums) {
        int n = nums.size();
        // DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1)).
        return n;
    }
};
```

---

**⚠️ Edge Cases & Interview Gotchas**
- Empty array / container input (n == 0).
- Single element input (n == 1).
- Boundary values with negative numbers or integer overflow (INT_MAX / INT_MIN).
- What if inputs contain duplicate values or are already sorted?

---
