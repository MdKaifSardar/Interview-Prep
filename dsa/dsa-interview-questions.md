# Data Structures & Algorithms Technical Interview Master List (91 Core Blueprints)
**Track:** SDE-1 / Product & Startup Track (Core High-Yield Patterns & Blueprints)

## Legend

**Priority** — 🔴 P0 Essential (Highest startup/interview ROI) · 🟠 P1 Important
**Type** — [Q] Code/Mechanism · [C] Conceptual · [P] Performance/Optimization
**Difficulty** — [EASY] · [MEDIUM] · [HARD]

---

## 1. MATRIX SIMULATION & ARRAY TRANSFORMATIONS

### Sub-Pattern 1.1: Matrix Spiral Traversal & Generation

#### 1. 🔴 P0 [Q] LC 54: Spiral Matrix [MEDIUM]
- **LeetCode Link:** [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- **Key Concept:** 4-boundary shrinking loop (top, bottom, left, right).
- **Problem Statement:** Given an `m x n` matrix, return all elements of the matrix in spiral order.
- **Example:** Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]` | Output: `[1,2,3,6,9,8,7,4,5]`

#### 2. 🔴 P0 [Q] LC 59: Spiral Matrix II [MEDIUM]
- **LeetCode Link:** [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)
- **Key Concept:** Generating N x N matrix in spiral order filling 1..N^2.
- **Problem Statement:** Given a positive integer `n`, generate an `n x n` matrix filled with elements from `1` to `n^2` in spiral order.
- **Example:** Input: `n = 3` | Output: `[[1,2,3],[8,9,4],[7,6,5]]`

### Sub-Pattern 1.2: Matrix Symmetry & In-Place Rotations

#### 3. 🔴 P0 [Q] LC 48: Rotate Image [MEDIUM]
- **LeetCode Link:** [Rotate Image](https://leetcode.com/problems/rotate-image/)
- **Key Concept:** Transpose matrix (swap A[i][j] & A[j][i]) + reverse each row in-place.
- **Problem Statement:** You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.
- **Example:** Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]` | Output: `[[7,4,1],[8,5,2],[9,6,3]]`

#### 4. 🔴 P0 [Q] Custom / Interview: Rotate Matrix 90 Deg Anti-Clockwise [MEDIUM]
- **LeetCode Link:** [Rotate Matrix 90 Deg Anti-Clockwise](#)
- **Key Concept:** Transpose matrix + reverse each column.
- **Problem Statement:** Given the constraints and problem requirements of **Rotate Matrix 90 Deg Anti-Clockwise**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 1.3: Matrix State Marking & Pattern Generation

#### 5. 🔴 P0 [Q] LC 73: Set Matrix Zeroes [MEDIUM]
- **LeetCode Link:** [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- **Key Concept:** Use 1st row and 1st column as dummy markers for O(1) space.
- **Problem Statement:** Given the constraints and problem requirements of **Set Matrix Zeroes**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 6. 🔴 P0 [Q] LC 118: Pascal's Triangle [EASY]
- **LeetCode Link:** [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- **Key Concept:** Dynamic row generation using previous row element sums.
- **Problem Statement:** Given the constraints and problem requirements of **Pascal's Triangle**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 7. 🔴 P0 [Q] LC 31: Next Permutation [MEDIUM]
- **LeetCode Link:** [Next Permutation](https://leetcode.com/problems/next-permutation/)
- **Key Concept:** Find decrease pivot -> swap with next larger -> reverse suffix.
- **Problem Statement:** Given the constraints and problem requirements of **Next Permutation**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 2. COMPLETE SORTING ALGORITHMS SUITE

### Sub-Pattern 2.1: Elementary Comparison Sorts (O(N^2))

#### 8. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Selection Sort Algorithm Blueprint](#)
- **Key Concept:** Find min element in unsorted partition and swap with start.
- **Problem Statement:** Given the constraints and problem requirements of **Selection Sort Algorithm Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 9. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Bubble Sort Algorithm Blueprint](#)
- **Key Concept:** Repeatedly swap adjacent inverted pairs with early exit flag.
- **Problem Statement:** Given the constraints and problem requirements of **Bubble Sort Algorithm Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 10. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Insertion Sort Algorithm Blueprint](#)
- **Key Concept:** Shift elements right to insert key into sorted prefix.
- **Problem Statement:** Given the constraints and problem requirements of **Insertion Sort Algorithm Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 2.2: Divide & Conquer & Advanced Sorts (O(N log N))

#### 11. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
- **LeetCode Link:** [Merge Sort & Inversion Counting Blueprint](#)
- **Key Concept:** Divide halves recursively and merge in O(N log N) time.
- **Problem Statement:** Given the constraints and problem requirements of **Merge Sort & Inversion Counting Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 12. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
- **LeetCode Link:** [Quick Sort Algorithm Blueprint](#)
- **Key Concept:** Lomuto/Hoare randomized pivot partitioning.
- **Problem Statement:** Given the constraints and problem requirements of **Quick Sort Algorithm Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 2.3: Linear Non-Comparison Sorts (O(N))

#### 13. 🟠 P1 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
- **LeetCode Link:** [Counting Sort Algorithm Blueprint](#)
- **Key Concept:** Frequency array for bounded integer range [0, K].
- **Problem Statement:** Given the constraints and problem requirements of **Counting Sort Algorithm Blueprint**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 2.4: Custom Comparators & String Sorting

#### 14. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
- **LeetCode Link:** [Largest Number](https://leetcode.com/problems/largest-number/)
- **Key Concept:** Custom string concatenation comparator (a + b > b + a).
- **Problem Statement:** Given the constraints and problem requirements of **Largest Number**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 3. HASHING / FREQUENCY COUNTING

### Sub-Pattern 3.1: Frequency Counting & Anagrams

#### 15. 🟠 P1 [Q] LC 217: Contains Duplicate [EASY]
- **LeetCode Link:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Key Concept:** O(1) set presence check.
- **Problem Statement:** Given the constraints and problem requirements of **Contains Duplicate**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 16. 🔴 P0 [Q] LC 49: Group Anagrams [MEDIUM]
- **LeetCode Link:** [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- **Key Concept:** 26-char frequency vector encoding as map key.
- **Problem Statement:** Given the constraints and problem requirements of **Group Anagrams**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 3.2: O(1) Pair & Complement Lookup

#### 17. 🔴 P0 [Q] LC 1: Two Sum [EASY]
- **LeetCode Link:** [Two Sum](https://leetcode.com/problems/two-sum/)
- **Key Concept:** Complement lookup (target - nums[i]) in unordered_map.
- **Problem Statement:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
- **Example:** Input: `nums = [2,7,11,15], target = 9` | Output: `[0,1]`

#### 18. 🔴 P0 [Q] LC 128: Longest Consecutive Sequence [MEDIUM]
- **LeetCode Link:** [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- **Key Concept:** O(1) set lookup for sequence start boundary (!set.count(num - 1)).
- **Problem Statement:** Given the constraints and problem requirements of **Longest Consecutive Sequence**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 3.3: Prefix XOR & Bitwise Hashing

#### 19. 🔴 P0 [Q] IB 1: Subarray with Given XOR [MEDIUM]
- **LeetCode Link:** [Subarray with Given XOR](#)
- **Key Concept:** Maintain running XOR sum (xr). Lookup (xr ^ target) in map.
- **Problem Statement:** Given the constraints and problem requirements of **Subarray with Given XOR**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 4. PREFIX SUM & DIFFERENCE ARRAYS

### Sub-Pattern 4.1: Standard Prefix Sum & Subarray Sum K

#### 20. 🔴 P0 [Q] LC 560: Subarray Sum Equals K [MEDIUM]
- **LeetCode Link:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- **Key Concept:** Running sum - K hash map lookup.
- **Problem Statement:** Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.
- **Example:** Input: `nums = [1,1,1], k = 2` | Output: `2`

#### 21. 🔴 P0 [Q] LC 525: Contiguous Array [MEDIUM]
- **LeetCode Link:** [Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- **Key Concept:** Convert 0 to -1, track earliest index of prefix sum.
- **Problem Statement:** Given the constraints and problem requirements of **Contiguous Array**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 4.2: Difference Array & Range Updates

#### 22. 🟠 P1 [Q] LC 1109: Corporate Flight Bookings [MEDIUM]
- **LeetCode Link:** [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)
- **Key Concept:** Difference array +val at L, -val at R+1; compute prefix sum at end.
- **Problem Statement:** Given the constraints and problem requirements of **Corporate Flight Bookings**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 4.3: Prefix & Suffix Products

#### 23. 🔴 P0 [Q] LC 238: Product of Array Except Self [MEDIUM]
- **LeetCode Link:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- **Key Concept:** Prefix products from left x running suffix product from right without division.
- **Problem Statement:** Given the constraints and problem requirements of **Product of Array Except Self**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 4.4: Prefix Sum with Modulo Arithmetic

#### 24. 🔴 P0 [Q] LC 523: Continuous Subarray Sum [MEDIUM]
- **LeetCode Link:** [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- **Key Concept:** Store earliest index of (running_sum % k) in map (len >= 2).
- **Problem Statement:** Given the constraints and problem requirements of **Continuous Subarray Sum**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 5. TWO POINTERS

### Sub-Pattern 5.1: Opposite Direction Pointers

#### 25. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii---input-array-is-sorted/)
- **Key Concept:** Opposite pointers converging inward.
- **Problem Statement:** Given the constraints and problem requirements of **Two Sum II - Input Array Is Sorted**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 26. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [3Sum](https://leetcode.com/problems/3sum/)
- **Key Concept:** Sorted array + outer loop + opposite pointers with duplicate skipping.
- **Problem Statement:** Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`.
- **Example:** Input: `nums = [-1,0,1,2,-1,-4]` | Output: `[[-1,-1,2],[-1,0,1]]`

#### 27. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Key Concept:** Shrinking boundary pointers, moving shorter height inward.
- **Problem Statement:** Given the constraints and problem requirements of **Container With Most Water**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 28. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Key Concept:** Two pointers tracking maxLeft and maxRight heights.
- **Problem Statement:** Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.
- **Example:** Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]` | Output: `6`

### Sub-Pattern 5.2: Partitioning & Backward Pointers

#### 29. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors-dutch-national-flag/)
- **Key Concept:** Dutch National Flag 3-way low, mid, high pointer algorithm.
- **Problem Statement:** Given the constraints and problem requirements of **Sort Colors (Dutch National Flag)**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 30. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Key Concept:** Fill destination array backwards from (m + n - 1).
- **Problem Statement:** Given the constraints and problem requirements of **Merge Sorted Array**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 6. SLIDING WINDOW

### Sub-Pattern 6.1: Variable Length Sliding Window

#### 31. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Key Concept:** Expand right, shrink left when duplicate character found.
- **Problem Statement:** Given a string `s`, find the length of the longest substring without repeating characters.
- **Example:** Input: `s = "abcabcbb"` | Output: `3`

#### 32. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Key Concept:** Expand right until sum >= target, shrink left to minimize length.
- **Problem Statement:** Given the constraints and problem requirements of **Minimum Size Subarray Sum**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 33. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Key Concept:** Gold-standard variable window with required match counter.
- **Problem Statement:** Given the constraints and problem requirements of **Minimum Window Substring**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 6.2: Fixed-Size Sliding Window

#### 34. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Key Concept:** Fixed window of size |P| with 26-char frequency comparison.
- **Problem Statement:** Given the constraints and problem requirements of **Find All Anagrams in a String**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 6.3: Variable Window with K Operations / Replacement

#### 35. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Key Concept:** Track zero count in window; shrink left when zero count > K.
- **Problem Statement:** Given the constraints and problem requirements of **Max Consecutive Ones III**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 36. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Key Concept:** Track max_freq in window; shrink left when (window_len - max_freq) > K.
- **Problem Statement:** Given the constraints and problem requirements of **Longest Repeating Character Replacement**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 7. BINARY SEARCH

### Sub-Pattern 7.1: Standard & Boundary Search

#### 37. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [Binary Search](https://leetcode.com/problems/binary-search/)
- **Key Concept:** Classic low <= high midpoint search.
- **Problem Statement:** Given an array of integers `nums` sorted in ascending order and a target value, write a function to search target in `nums`. Return index if found, else `-1`.
- **Example:** Input: `nums = [-1,0,3,5,9,12], target = 9` | Output: `4`

### Sub-Pattern 7.2: Rotated & Modified Array Search

#### 38. 🔴 P0 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Key Concept:** Compare mid with left/right to determine sorted half.
- **Problem Statement:** Given the constraints and problem requirements of **Search In Rotated Sorted Array**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 39. 🔴 P0 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Key Concept:** Compare mid with high (mid > high => min in right half).
- **Problem Statement:** Given the constraints and problem requirements of **Find Minimum in Rotated Sorted Array**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 7.3: Binary Search on Answer Space

#### 40. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Key Concept:** Binary search speed range [1, max_piles].
- **Problem Statement:** Given the constraints and problem requirements of **Koko Eating Bananas**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 41. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Key Concept:** Binary search capacity range [max_weight, sum_weight].
- **Problem Statement:** Given the constraints and problem requirements of **Capacity To Ship Packages Within D Days**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 7.4: 2D Matrix & Unsorted Condition Search

#### 42. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Key Concept:** Virtual 1D mapping on M x N grid: matrix[mid / N][mid % N].
- **Problem Statement:** Given the constraints and problem requirements of **Search a 2D Matrix**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 43. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Key Concept:** Compare nums[mid] with nums[mid + 1] on unsorted array.
- **Problem Statement:** Given the constraints and problem requirements of **Find Peak Element**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 8. OVERLAPPING INTERVALS

### Sub-Pattern 8.1: Interval Merging & Insertion

#### 44. 🔴 P0 [Q] LC 56: Merge Intervals [MEDIUM]
- **LeetCode Link:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- **Key Concept:** Sort by start time, merge overlapping bounds.
- **Problem Statement:** Given the constraints and problem requirements of **Merge Intervals**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 45. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Key Concept:** 3-phase linear insertion (left, merged mid, right).
- **Problem Statement:** Given the constraints and problem requirements of **Insert Interval**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 46. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Key Concept:** Greedy scheduling sorted by end time.
- **Problem Statement:** Given the constraints and problem requirements of **Non-overlapping Intervals**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 47. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Key Concept:** Sort by start time + Min-Heap of active room end-times.
- **Problem Statement:** Given the constraints and problem requirements of **Meeting Rooms II**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 9. FAST & SLOW POINTERS (LINKED LIST)

### Sub-Pattern 9.1: Cycle Detection & Midpoint

#### 48. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Key Concept:** Fast pointer moves 2 steps, slow moves 1 step; collision = cycle.
- **Problem Statement:** Given the constraints and problem requirements of **Linked List Cycle**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 49. 🔴 P0 [Q] LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Key Concept:** Floyd's cycle detection + entry point recovery.
- **Problem Statement:** Given the constraints and problem requirements of **Linked List Cycle II**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 50. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [Reorder List](https://leetcode.com/problems/reorder-list/)
- **Key Concept:** Midpoint split + reverse second half + alternate weaving.
- **Problem Statement:** Given the constraints and problem requirements of **Reorder List**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 10. MONOTONIC STACK

### Sub-Pattern 10.1: Basic Stack Matching

#### 51. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Key Concept:** Push opening brackets, pop & match closing brackets.
- **Problem Statement:** Given the constraints and problem requirements of **Valid Parentheses**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 10.2: Next Greater / Smaller Element

#### 52. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Key Concept:** Monotonic decreasing stack storing indices.
- **Problem Statement:** Given the constraints and problem requirements of **Daily Temperatures**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 53. 🔴 P0 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Key Concept:** Monotonic increasing stack calculating width on pop.
- **Problem Statement:** Given the constraints and problem requirements of **Largest Rectangle in Histogram**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 11. HEAP / PRIORITY QUEUE

### Sub-Pattern 11.1: Top K Elements / Min-Heap Pattern

#### 54. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Key Concept:** Min-Heap of size K (or Quickselect).
- **Problem Statement:** Given the constraints and problem requirements of **Kth Largest Element in an Array**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 55. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Key Concept:** Frequency map + Min-Heap of size K.
- **Problem Statement:** Given the constraints and problem requirements of **Top K Frequent Elements**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 56. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Key Concept:** Dual Heap pattern (Max-Heap lower half, Min-Heap upper half).
- **Problem Statement:** Given the constraints and problem requirements of **Find Median from Data Stream**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 57. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Key Concept:** Min-Heap of size K storing current head node of each list.
- **Problem Statement:** Given the constraints and problem requirements of **Merge k Sorted Lists**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 12. TREE DFS / DEPTH FIRST SEARCH

### Sub-Pattern 12.1: Tree Height & Depth Recursion

#### 58. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Key Concept:** 1 + max(dfs(left), dfs(right)).
- **Problem Statement:** Given the constraints and problem requirements of **Maximum Depth of Binary Tree**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 59. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Key Concept:** Post-order height calculation updating global max.
- **Problem Statement:** Given the constraints and problem requirements of **Diameter of Binary Tree**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 60. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Key Concept:** Bottom-up DFS node bubbling matching P and Q.
- **Problem Statement:** Given the constraints and problem requirements of **Lowest Common Ancestor of a Binary Tree**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 61. 🔴 P0 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Key Concept:** Post-order DFS returning max branch while tracking global split path sum.
- **Problem Statement:** Given the constraints and problem requirements of **Binary Tree Maximum Path Sum**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 13. TREE BFS / LEVEL ORDER TRAVERSAL

### Sub-Pattern 13.1: Standard Level Order Traversal

#### 62. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Key Concept:** Queue iteration processing level size snapshot.
- **Problem Statement:** Given the constraints and problem requirements of **Binary Tree Level Order Traversal**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 63. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Key Concept:** Collect last node per queue level snapshot.
- **Problem Statement:** Given the constraints and problem requirements of **Binary Tree Right Side View**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 64. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Key Concept:** Alternating level insertion direction.
- **Problem Statement:** Given the constraints and problem requirements of **Binary Tree Zigzag Level Order Traversal**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 14. BINARY SEARCH TREE (BST)

### Sub-Pattern 14.1: BST Validation & Inorder Property

#### 65. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Key Concept:** Pass valid range [minVal, maxVal] downwards recursively.
- **Problem Statement:** Given the constraints and problem requirements of **Validate Binary Search Tree**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 66. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Key Concept:** In-order BST traversal yields sorted elements.
- **Problem Statement:** Given the constraints and problem requirements of **Kth Smallest Element in a BST**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 67. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Key Concept:** BST node deletion with in-order successor swap.
- **Problem Statement:** Given the constraints and problem requirements of **Delete Node in a BST**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 15. BACKTRACKING / SUBSETS & PERMUTATIONS

### Sub-Pattern 15.1: Subsets & Combination Choice

#### 68. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [Subsets](https://leetcode.com/problems/subsets/)
- **Key Concept:** Include / Exclude decision tree recursion.
- **Problem Statement:** Given the constraints and problem requirements of **Subsets**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 69. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [Permutations](https://leetcode.com/problems/permutations/)
- **Key Concept:** Used boolean array or in-place swap recursion.
- **Problem Statement:** Given the constraints and problem requirements of **Permutations**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 70. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Key Concept:** Unbounded choice recursion with index control.
- **Problem Statement:** Given the constraints and problem requirements of **Combination Sum**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 71. 🔴 P0 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [N-Queens](https://leetcode.com/problems/n-queens/)
- **Key Concept:** Constraint hashing (cols, main diagonals, anti-diagonals).
- **Problem Statement:** Given the constraints and problem requirements of **N-Queens**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 16. GRAPH DFS / BFS

### Sub-Pattern 16.1: Grid Matrix Flood Fill DFS

#### 72. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Key Concept:** Matrix traversal + 4-directional flood fill sink.
- **Problem Statement:** Given the constraints and problem requirements of **Number of Islands**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 73. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Key Concept:** Hash map node mapping (original -> clone) during DFS/BFS.
- **Problem Statement:** Given the constraints and problem requirements of **Clone Graph**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 74. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Key Concept:** 2-color graph coloring via BFS/DFS.
- **Problem Statement:** Given the constraints and problem requirements of **Is Graph Bipartite?**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

### Sub-Pattern 16.2: Multi-Source BFS

#### 75. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Key Concept:** Pre-populate queue with all initial rotten sources; level time tick.
- **Problem Statement:** Given the constraints and problem requirements of **Rotting Oranges**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 76. 🔴 P0 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Key Concept:** Unweighted shortest path BFS on mutated character state space.
- **Problem Statement:** Given the constraints and problem requirements of **Word Ladder**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 17. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### Sub-Pattern 17.1: Kahn's BFS In-degree Algorithm

#### 77. 🔴 P0 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Key Concept:** In-degree array + Queue processing; visited count == N => DAG.
- **Problem Statement:** Given the constraints and problem requirements of **Course Schedule**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 78. 🔴 P0 [Q] LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Key Concept:** Kahn's algorithm collecting top-sort ordering array.
- **Problem Statement:** Given the constraints and problem requirements of **Course Schedule II**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 18. DISJOINT SET UNION (DSU / UNION-FIND)

### Sub-Pattern 18.1: DSU Path Compression & Union by Rank

#### 79. 🟠 P1 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Key Concept:** Find cycle by checking if find(u) == find(v) before union(u, v).
- **Problem Statement:** Given the constraints and problem requirements of **Redundant Connection**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 80. 🟠 P1 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Key Concept:** Connected component counting via DSU union operations.
- **Problem Statement:** Given the constraints and problem requirements of **Number of Provinces**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 19. 1D DYNAMIC PROGRAMMING

### Sub-Pattern 19.1: State Transition & Space Optimization

#### 81. 🔴 P0 [Q] LC 198: House Robber [MEDIUM]
- **LeetCode Link:** [House Robber](https://leetcode.com/problems/house-robber/)
- **Key Concept:** dp[i] = max(dp[i-1], dp[i-2] + nums[i]) with 2 variables.
- **Problem Statement:** Given the constraints and problem requirements of **House Robber**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 82. 🟠 P1 [Q] LC 70: Climbing Stairs [EASY]
- **LeetCode Link:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- **Key Concept:** Fibonacci base DP transition.
- **Problem Statement:** Given the constraints and problem requirements of **Climbing Stairs**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 83. 🔴 P0 [Q] LC 139: Word Break [MEDIUM]
- **LeetCode Link:** [Word Break](https://leetcode.com/problems/word-break/)
- **Key Concept:** dp[i] = true if dp[j] && wordDict.count(s[j..i]).
- **Problem Statement:** Given the constraints and problem requirements of **Word Break**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 84. 🔴 P0 [Q] LC 300: Longest Increasing Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- **Key Concept:** O(N^2) DP or O(N log N) Patience Sorting with std::lower_bound.
- **Problem Statement:** Given the constraints and problem requirements of **Longest Increasing Subsequence**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 20. KNAPSACK / 2D DYNAMIC PROGRAMMING

### Sub-Pattern 20.1: Unbounded & 0/1 Knapsack Grid DP

#### 85. 🔴 P0 [Q] LC 322: Coin Change [MEDIUM]
- **LeetCode Link:** [Coin Change](https://leetcode.com/problems/coin-change/)
- **Key Concept:** dp[i] = min(dp[i], 1 + dp[i - coin]).
- **Problem Statement:** Given the constraints and problem requirements of **Coin Change**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 86. 🔴 P0 [Q] LC 1143: Longest Common Subsequence [MEDIUM]
- **LeetCode Link:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Key Concept:** 2D matrix matching grid dp[i][j].
- **Problem Statement:** Given the constraints and problem requirements of **Longest Common Subsequence**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 87. 🔴 P0 [Q] LC 416: Partition Equal Subset Sum [MEDIUM]
- **LeetCode Link:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- **Key Concept:** 0/1 Knapsack reduction with target sum = total / 2.
- **Problem Statement:** Given the constraints and problem requirements of **Partition Equal Subset Sum**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 88. 🔴 P0 [Q] LC 72: Edit Distance [HARD]
- **LeetCode Link:** [Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Key Concept:** 3-operation (Insert, Delete, Replace) matrix grid DP.
- **Problem Statement:** Given the constraints and problem requirements of **Edit Distance**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

## 21. BIT MANIPULATION & BITMASKING

### Sub-Pattern 21.1: XOR Cancelation & Bit Operations

#### 89. 🔴 P0 [Q] LC 136: Single Number [EASY]
- **LeetCode Link:** [Single Number](https://leetcode.com/problems/single-number/)
- **Key Concept:** XOR cancellation property (A ^ A = 0, A ^ 0 = A).
- **Problem Statement:** Given the constraints and problem requirements of **Single Number**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 90. 🟠 P1 [Q] LC 191: Number of 1 Bits [EASY]
- **LeetCode Link:** [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- **Key Concept:** Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit).
- **Problem Statement:** Given the constraints and problem requirements of **Number of 1 Bits**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`

#### 91. 🟠 P1 [Q] LC 338: Counting Bits [EASY]
- **LeetCode Link:** [Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Key Concept:** DP bit shift relationship (dp[i] = dp[i >> 1] + (i & 1)).
- **Problem Statement:** Given the constraints and problem requirements of **Counting Bits**, process the input payload and compute the optimal result.
- **Example:** Input: `nums = [2, 7, 11, 15]` | Output: `[0, 1]`
