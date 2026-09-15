# Data Structures & Algorithms Master Question Bank (91 Core Blueprints)

Master repository of 91 high-yield, curated interview questions. Designed for rapid pattern recognition and deep algorithmic preparation.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Key Takeaway:** 4-boundary shrinking loop (top, bottom, left, right).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.1 (Matrix Spiral Traversal & Generation)
- **Key Takeaway:** Generating N x N matrix in spiral order filling 1..N^2.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Key Takeaway:** Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row in-place.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.2 (Matrix Symmetry & In-Place Rotations)
- **Key Takeaway:** Transpose matrix + reverse each column.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Use 1st row and 1st column as dummy markers for O(1) space.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Dynamic row generation using previous row element sums.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 1.3 (Matrix State Marking & Pattern Generation)
- **Key Takeaway:** Find decrease pivot -> swap with next larger -> reverse suffix.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Find min element in unsorted partition and swap with start.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Repeatedly swap adjacent inverted pairs with early exit flag.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.1 (Elementary Comparison Sorts (O(N^2)))
- **Key Takeaway:** Shift elements right to insert key into sorted prefix.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Key Takeaway:** Divide halves recursively and merge in O(N log N) time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
- **Key Takeaway:** Lomuto/Hoare randomized pivot partitioning.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.3 (Linear Non-Comparison Sorts (O(N)))
- **Key Takeaway:** Frequency array for bounded integer range [0, K].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 2.4 (Custom Comparators & String Sorting)
- **Key Takeaway:** Custom string concatenation comparator (a + b > b + a).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Key Takeaway:** O(1) set presence check.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Key Takeaway:** 26-char frequency vector encoding as map key.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Key Takeaway:** Complement lookup (target - nums[i]) in unordered_map.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Key Takeaway:** O(1) set lookup for sequence start boundary (!set.count(num - 1)).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 3.3 (Prefix XOR & Bitwise Hashing)
- **Key Takeaway:** Maintain running XOR sum (xr). Lookup (xr ^ target) in map.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Key Takeaway:** Running sum - K hash map lookup.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.1 (Standard Prefix Sum & Subarray Sum K)
- **Key Takeaway:** Convert 0 to -1, track earliest index of prefix sum.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.2 (Difference Array & Range Updates)
- **Key Takeaway:** Difference array +val at L, -val at R+1; compute prefix sum at end.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.3 (Prefix & Suffix Products)
- **Key Takeaway:** Prefix products from left x running suffix product from right without division.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 4.4 (Prefix Sum with Modulo Arithmetic)
- **Key Takeaway:** Store earliest index of (running_sum % k) in map (len >= 2).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Opposite pointers converging inward.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Sorted array + outer loop + opposite pointers with duplicate skipping.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Shrinking boundary pointers, moving shorter height inward.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.1 (Opposite Direction Pointers)
- **Key Takeaway:** Two pointers tracking maxLeft and maxRight heights.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Key Takeaway:** Dutch National Flag 3-way low, mid, high pointer algorithm.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 5.2 (Partitioning & Backward Pointers)
- **Key Takeaway:** Fill destination array backwards from (m + n - 1).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Expand right, shrink left when duplicate character found.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Expand right until sum >= target, shrink left to minimize length.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.1 (Variable Length Sliding Window)
- **Key Takeaway:** Gold-standard variable window with required match counter.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.2 (Fixed-Size Sliding Window)
- **Key Takeaway:** Fixed window of size |P| with 26-char frequency comparison.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Key Takeaway:** Track zero count in window; shrink left when zero count > K.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 6.3 (Variable Window with K Operations / Replacement)
- **Key Takeaway:** Track max_freq in window; shrink left when (window_len - max_freq) > K.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.1 (Standard & Boundary Search)
- **Key Takeaway:** Classic low <= high midpoint search.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Key Takeaway:** Compare mid with left/right to determine sorted half.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.2 (Rotated & Modified Array Search)
- **Key Takeaway:** Compare mid with high (mid > high => min in right half).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Key Takeaway:** Binary search speed range [1, max_piles].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.3 (Binary Search on Answer Space)
- **Key Takeaway:** Binary search capacity range [max_weight, sum_weight].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Key Takeaway:** Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 7.4 (2D Matrix & Unsorted Condition Search)
- **Key Takeaway:** Compare nums[mid] with nums[mid + 1] on unsorted array.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Sort by start time, merge overlapping bounds.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** 3-phase linear insertion (left, merged mid, right).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Greedy scheduling sorted by end time.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 8.1 (Interval Merging & Insertion)
- **Key Takeaway:** Sort by start time + Min-Heap of active room end-times.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Fast pointer moves 2 steps, slow moves 1 step; collision = cycle.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Floyd's cycle detection + entry point recovery.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 9.1 (Cycle Detection & Midpoint)
- **Key Takeaway:** Midpoint split + reverse second half + alternate weaving.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.1 (Basic Stack Matching)
- **Key Takeaway:** Push opening brackets, pop & match closing brackets.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)
- **Key Takeaway:** Monotonic decreasing stack storing indices.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 10.2 (Next Greater / Smaller Element)
- **Key Takeaway:** Monotonic increasing stack calculating width on pop.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Key Takeaway:** Min-Heap of size K (or Quickselect).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Key Takeaway:** Frequency map + Min-Heap of size K.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Key Takeaway:** Dual Heap pattern (Max-Heap lower half, Min-Heap upper half).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 11.1 (Top K Elements / Min-Heap Pattern)
- **Key Takeaway:** Min-Heap of size K storing current head node of each list.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Key Takeaway:** 1 + max(dfs(left), dfs(right)).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Key Takeaway:** Post-order height calculation updating global max.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Key Takeaway:** Bottom-up DFS node bubbling matching P and Q.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 12.1 (Tree Height & Depth Recursion)
- **Key Takeaway:** Post-order DFS returning max branch while tracking global split path sum.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Key Takeaway:** Queue iteration processing level size snapshot.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Key Takeaway:** Collect last node per queue level snapshot.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 13.1 (Standard Level Order Traversal)
- **Key Takeaway:** Alternating level insertion direction.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Key Takeaway:** Pass valid range [minVal, maxVal] downwards recursively.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Key Takeaway:** In-order BST traversal yields sorted elements.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 14.1 (BST Validation & Inorder Property)
- **Key Takeaway:** BST node deletion with in-order successor swap.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Key Takeaway:** Include / Exclude decision tree recursion.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Key Takeaway:** Used boolean array or in-place swap recursion.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Key Takeaway:** Unbounded choice recursion with index control.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 15.1 (Subsets & Combination Choice)
- **Key Takeaway:** Constraint hashing (cols, main diagonals, anti-diagonals).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Key Takeaway:** Matrix traversal + 4-directional flood fill sink.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Key Takeaway:** Hash map node mapping (original -> clone) during DFS/BFS.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.1 (Grid Matrix Flood Fill DFS)
- **Key Takeaway:** 2-color graph coloring via BFS/DFS.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)
- **Key Takeaway:** Pre-populate queue with all initial rotten sources; level time tick.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 16.2 (Multi-Source BFS)
- **Key Takeaway:** Unweighted shortest path BFS on mutated character state space.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)
- **Key Takeaway:** In-degree array + Queue processing; visited count == N => DAG.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 17.1 (Kahn's BFS In-degree Algorithm)
- **Key Takeaway:** Kahn's algorithm collecting top-sort ordering array.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)
- **Key Takeaway:** Find cycle by checking if find(u) == find(v) before union(u, v).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 18.1 (DSU Path Compression & Union by Rank)
- **Key Takeaway:** Connected component counting via DSU union operations.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Key Takeaway:** dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Key Takeaway:** Fibonacci base DP transition.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Key Takeaway:** dp[i] = true if dp[j] && wordDict.count(s[j..i]).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 19.1 (State Transition & Space Optimization)
- **Key Takeaway:** O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Key Takeaway:** dp[i] = min(dp[i], 1 + dp[i - coin]).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Key Takeaway:** 2D matrix matching grid dp[i][j].

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Key Takeaway:** 0/1 Knapsack reduction with target sum = total / 2.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 20.1 (Unbounded & 0/1 Knapsack Grid DP)
- **Key Takeaway:** 3-operation (Insert, Delete, Replace) matrix grid DP.

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Key Takeaway:** XOR cancellation property (A ^ A = 0, A ^ 0 = A).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Key Takeaway:** Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit).

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
**💡 Key Concepts & Core Blueprint:**
- **Pattern:** Sub-Pattern 21.1 (XOR Cancelation & Bit Operations)
- **Key Takeaway:** DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1)).

---
