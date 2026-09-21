# Data Structures & Algorithms Master Question Bank (91 Core + 21 Bonus Blueprints)

Master repository of 112 high-yield, curated interview questions (91 Core Blueprints + 21 Advanced Bonus Blueprints). Designed for rapid pattern recognition and deep algorithmic preparation.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Key Takeaway:** Maintain 4 boundary pointers (`top`, `bottom`, `left`, `right`) and shrink boundaries after completing each side.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Key Takeaway:** Fill values 1..N^2 directly using boundary pointers without needing extra visited matrix.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Key Takeaway:** Clockwise 90° rotation = Transpose + Reverse Rows. Counter-clockwise 90° = Transpose + Reverse Columns.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Key Takeaway:** Anti-clockwise rotation = Transpose + Reverse Columns (or Reverse Rows + Transpose).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Store flags in first row/col to achieve true O(1) space complexity.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Each interior element is the sum of the two elements directly above it in the previous row.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Find first decrease pivot from right -> swap with next larger from right -> reverse suffix.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** 2-bit intermediate encoding: 0->0: 0, 1->1: 1, 1->0: 2, 0->1: 3. Modulo 2 at the end.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Repeatedly pick the minimum element from the unsorted region and swap it into the sorted position.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Early exit flag reduces best-case runtime to O(N) for nearly sorted inputs.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Shift elements of sorted prefix to right to insert key into correct sorted position.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Key Takeaway:** Merge step counts cross-inversions in O(N log N) total time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Key Takeaway:** Randomized pivot selection guarantees expected O(N log N) time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))
- **Key Takeaway:** Linear time O(N + K) sort for bounded integer ranges.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)
- **Key Takeaway:** Sort strings by checking if concatenation `a + b > b + a`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts)
- **Key Takeaway:** Fast/slow pointer with prev unlinking to bisect list -> Recursive Merge Sort -> Dummy head merge.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Key Takeaway:** Hash set allows O(1) duplicate checking in O(N) single pass.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Key Takeaway:** 26-char frequency string key yields O(N * K) grouping time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Key Takeaway:** Store index in hash map for O(1) complement lookup.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Key Takeaway:** Only check sequences starting at `!st.count(x - 1)` to guarantee O(N) linear time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)
- **Key Takeaway:** Prefix XOR property: `xr[i..j] = xr[0..j] ^ xr[0..i-1]`. Look up `xr ^ B` in map.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.1 (Hash Map State Design)
- **Key Takeaway:** Vector for random index + Hash map for value-to-index. Swap with last element on remove.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Key Takeaway:** If prefix sum at j is S_j and at i is S_i, then sum(i..j) = S_j - S_i = k -> look up S_j - k in hash map.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Key Takeaway:** Map 0 -> -1 so equal 0s and 1s becomes Subarray Sum = 0. Store earliest index of prefix sum.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)
- **Key Takeaway:** Range updates `[L, R] += val` in $O(1)$ by setting `diff[L] += val` and `diff[R+1] -= val`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)
- **Key Takeaway:** Combine left prefix product array with right suffix product accumulator to avoid division.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)
- **Key Takeaway:** Store EARLIEST index of remainder `running_sum % k` to satisfy length >= 2 constraint.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.1 (2D Prefix Sums)
- **Key Takeaway:** Inclusion-Exclusion Principle: Precompute sum from (0,0) to (r,c). Query = BottomRight - Top - Left + TopLeft.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Sorted array allows linear inward convergence of opposite pointers in O(1) space.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Fix outer index `i`, then run Two Pointers on remaining sorted subarray while skipping duplicates.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Moving the shorter line inward is the only way to possibly get a taller container boundary.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Process pointer with smaller boundary max height since it determines the water level bottleneck.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Key Takeaway:** Partition array into 3 sections `[0..low-1] = 0`, `[low..high] = 1`, `[high+1..N-1] = 2` in single pass.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Key Takeaway:** Merge from back to front to utilize empty padding space without extra memory.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Multi-Pointer Sorting & Convergence)
- **Key Takeaway:** Sort -> Two outer loops + Two-pointer convergence inner loop. Skip duplicates at all 4 levels + use long long for sum.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Jump `left` pointer directly past the last duplicate index to achieve $O(N)$ single pass.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Shrink `left` pointer aggressively while `sum >= target` to minimize window length.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Track `formed == required` distinct character matches to shrink window in $O(|S| + |T|)$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)
- **Key Takeaway:** Fixed window of size `k`: vector equality comparison `pCount == sCount` takes $O(26) = O(1)$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Key Takeaway:** Shrink `left` whenever zero count exceeds budget `k`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Key Takeaway:** Window is valid if `(window_len - max_freq) <= k`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.2 (Variable-Size / Reduction Windows)
- **Key Takeaway:** exact(k) = atMost(k) - atMost(k - 1). Window of size (r - l + 1) contributes all subarrays ending at r.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)
- **Key Takeaway:** Use `low + (high - low) / 2` to prevent integer overflow.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Key Takeaway:** At least one half (left or right) is ALWAYS strictly sorted in a rotated array.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Key Takeaway:** Compare `nums[mid]` against `nums[high]` to determine which side contains the pivot point.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Key Takeaway:** Use integer division trick `(p + mid - 1) / mid` for exact `ceil(p / mid)`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Key Takeaway:** Lower bound of capacity search space MUST be `max(weights)`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Key Takeaway:** Map 1D index `mid` to 2D matrix coordinates via `r = mid / N, c = mid % N`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Key Takeaway:** Binary search works on unsorted arrays if we can eliminate one half based on slope direction.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.2 (Binary Search on Answer Space / Partitions)
- **Key Takeaway:** Binary search partition on smaller array. LeftMaxA <= RightMinB and LeftMaxB <= RightMinA.

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

**Constraints:**
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

---
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Sort by start time, merge overlapping bounds (`res.back()[1] = max(res.back()[1], interval[1])`).

---

### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still has no overlapping intervals (merge overlapping intervals if necessary). Return `intervals` after the insertion.

**Example 1:**
- **Input:** `intervals = [[1,3],[6,9]], newInterval = [2,5]`
- **Output:** `[[1,5],[6,9]]`

**Example 2:**
- **Input:** `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]`
- **Output:** `[[1,2],[3,10],[12,16]]`
- **Explanation:** Because the new interval `[4,8]` overlaps with `[3,5],[6,7],[8,10]`.

**Constraints:**
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^5`
- `intervals` is sorted by `start_i` in ascending order.
- `newInterval.length == 2`

---
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** 3-phase linear insertion (left non-overlapping, merged overlapping mid, right non-overlapping).

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
- **Explanation:** You need to remove two `[1,2]` to make the rest of the intervals non-overlapping.

**Example 3:**
- **Input:** `intervals = [[1,2],[2,3]]`
- **Output:** `0`
- **Explanation:** You don't need to remove any of the intervals since they are already non-overlapping.

**Constraints:**
- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= start_i < end_i <= 5 * 10^4`

---
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Greedy scheduling: Sort by **end time** `intervals[i][1]`, discard current if `start < prevEnd`.

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

**Constraints:**
- `1 <= intervals.length <= 10^4`
- `0 <= start_i < end_i <= 10^6`

---
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Sort by start time + Min-Heap of active room end-times (`minHeap.top() <= start` to reuse room).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Sweeps & Intersections)
- **Key Takeaway:** Overlap start = max(A.start, B.start), Overlap end = min(A.end, B.end). Advance the one that ends first.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Fast pointer moves 2x speed of slow pointer; collision guarantees cycle presence in O(1) space.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Distance from head to cycle entry equals distance from collision point to cycle entry.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Find midpoint -> Reverse second half -> Weave nodes alternately in $O(1)$ space.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection on Functional Graphs)
- **Key Takeaway:** Floyd's Tortoise & Hare on Array: index -> nums[index]. Intersection -> Reset slow to 0 -> Meet at cycle start.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Key Takeaway:** LIFO stack guarantees inner nested bracket pairs match before outer ones.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Key Takeaway:** Stack stores un-matched indices in decreasing order of temperature until warmer day is encountered.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Key Takeaway:** Stack top is popped when a smaller element is encountered; popped bar's width is bounded by new top and current index.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.1 (Histogram Expansion via Monotonic Stack)
- **Key Takeaway:** Row-by-row cumulative histogram: If '1' h++, else h=0. Run LC 84 Largest Rectangle in Histogram on each row.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)
- **Key Takeaway:** Min-Heap of size K retains the K largest elements seen so far; root is the K-th largest.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Kth Element & Min/Max-Heap)
- **Key Takeaway:** Max frequency is bounded by N, enabling Bucket Sort in linear $O(N)$ time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.2 (Two Heaps Median Tracking)
- **Key Takeaway:** Max-Heap (lower half) + Min-Heap (upper half) maintain exact median elements at roots.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.3 (K-Way Merge)
- **Key Takeaway:** Min-Heap maintains smallest head pointer among K active lists in $O(log K)$ step time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Priority Queue Simulation & Greedy Math)
- **Key Takeaway:** Max frequency determines frame: (maxFreq - 1) * (n + 1) + countOfMaxFreq. Result = max(tasks.size(), frameSize).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)
- **Key Takeaway:** Tree height = 1 + max(left_height, right_height).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Depth & Diameter)
- **Key Takeaway:** Update diameter at every node during bottom-up height computation.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.2 (Lowest Common Ancestor - LCA)
- **Key Takeaway:** If left and right recursive calls return non-null, current node is LCA.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.3 (Path Sum Problems)
- **Key Takeaway:** Clamped `max(0, gain)` ignores negative subtrees that diminish path sum.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Preorder Traversal & String Stream State)
- **Key Takeaway:** Preorder DFS with '#' for null and comma delimiter. Stringstream in deserialize recursively builds root->left->right.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Key Takeaway:** Snapshot `sz = q.size()` at start of loop to process nodes level-by-level.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Key Takeaway:** Reverse Pre-Order DFS visits rightmost node of each level first.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard BFS Level Order)
- **Key Takeaway:** Pre-allocate level vector and place values at `i` or `sz - 1 - i` based on direction flag.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Coordinate-Based BFS Traversal)
- **Key Takeaway:** BFS with pair<Node*, col>. col-1 for left, col+1 for right. Hash map collects values, BFS preserves top-to-bottom automatically.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)
- **Key Takeaway:** Inorder traversal of BST MUST be strictly increasing.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Traversal)
- **Key Takeaway:** Iterative inorder traversal stops at the K-th node without visiting entire tree.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.2 (BST Search & Mutation)
- **Key Takeaway:** Node with 2 children is replaced by its Inorder Successor.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (Inorder Inversion Detection)
- **Key Takeaway:** Inorder traversal must be sorted. First violation: first = prev. Second violation: second = curr. Swap(first->val, second->val).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)
- **Key Takeaway:** Power set size is $2^N$; backtracking builds subsets level-by-level.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.2 (Permutations)
- **Key Takeaway:** In-place swapping generates all $N!$ permutations without additional visited arrays.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combinations)
- **Key Takeaway:** Pass `i` (not `i + 1`) to recursive call to allow unlimited reuse of current element.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.3 (Grid & Constraint Backtracking)
- **Key Takeaway:** Use `r - c` for main diagonals and `r + c` for anti-diagonals for $O(1)$ conflict checking.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Grid DFS Backtracking)
- **Key Takeaway:** Mask cell board[r][c] = '#' -> explore 4 directions -> unmask board[r][c] = temp (backtrack).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Key Takeaway:** Sink visited land cells directly to '0' to avoid auxiliary visited matrix memory.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)
- **Key Takeaway:** Hash map maps original node pointers to cloned node pointers to prevent infinite cycles.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.2 (Graph Traversal & Cloning)
- **Key Takeaway:** Graph is bipartite if and only if it contains no odd-length cycles.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Key Takeaway:** Push all initial sources to BFS queue to simulate simultaneous propagation.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Traversal (DFS/BFS))
- **Key Takeaway:** Mutate word characters directly $O(26 	imes L)$ instead of comparing all word pairs $O(N^2)$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.2 (Weighted Shortest Path / Dijkstra's Algorithm)
- **Key Takeaway:** Dijkstra's Algorithm: Min-heap of {dist, node}. Relax edges if dist[u] + w < dist[v]. Answer is max(dist).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)
- **Key Takeaway:** Cycle exists if total processed nodes in Kahn's BFS < numCourses.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 17.1 (Kahn's Algorithm & Cycle Detection)
- **Key Takeaway:** Kahn's BFS order gives valid topological sort.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 17.1 (Graph Construction & Topological Kahn's Algorithm)
- **Key Takeaway:** Compare adjacent words for first mismatch -> directed edge. Prefix edge case check. Kahn's BFS for cycle detection.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)
- **Key Takeaway:** First edge whose endpoints share the same DSU root creates a cycle.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 18.1 (Union-Find & Connected Components)
- **Key Takeaway:** Each successful union of distinct components reduces province count by 1.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 18.1 (Union-Find Component Grouping)
- **Key Takeaway:** Map email -> first occurrence account index. Union current account with previous account index for all shared emails.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
- **Key Takeaway:** Maintain previous 2 optimal subproblem values for $O(1)$ space DP.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
- **Key Takeaway:** To reach step N, you must come from step N-1 (1 step) or step N-2 (2 steps).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
- **Key Takeaway:** `dp[i]` depends on valid sub-problem `dp[j]` plus valid dictionary word `s[j...i]`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (Linear DP & State Transitions)
- **Key Takeaway:** `tails` array stores smallest tail of all increasing subsequences of length `i + 1`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (State-Tracking Kadane Variation)
- **Key Takeaway:** Track currMax AND currMin. If nums[i] < 0, swap(currMax, currMin). Kadane with multiplication.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
- **Key Takeaway:** Unbounded knapsack allows reusing same coin denomination multiple times.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
- **Key Takeaway:** Match adds 1 to diagonal `dp[i-1][j-1]`; mismatch takes max of top `dp[i-1][j]` and left `dp[i][j-1]`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
- **Key Takeaway:** Iterate target backwards in 1D array to enforce 0/1 Knapsack item uniqueness.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Knapsack & 2D State DP)
- **Key Takeaway:** 3 choices when mismatch: Insert `dp[i][j-1]`, Delete `dp[i-1][j]`, Replace `dp[i-1][j-1]`.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Unbounded Knapsack Combinations)
- **Key Takeaway:** Combinations vs Permutations: Coins in OUTER loop, amount in INNER loop. dp[a] += dp[a - coin].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
- **Key Takeaway:** XOR operation is commutative and associative: $A \oplus B \oplus A = B$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
- **Key Takeaway:** `n & (n - 1)` drops the lowest set bit in $O(1)$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (Bitwise Invariants & Operations)
- **Key Takeaway:** `ans[i] = ans[i >> 1] + (i & 1)` computes set bits in single linear pass $O(N)$.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (XOR Partitioning & Rightmost Set Bit Masking)
- **Key Takeaway:** Total XOR = a ^ b. diff = (unsigned)XOR & (-(unsigned)XOR) isolates differentiating bit. Partition into 2 buckets.

---

