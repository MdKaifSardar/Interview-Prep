[⬅️ Previous: 08 · Sliding Window](08-sliding-window.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Overlapping Intervals ➡️](10-overlapping-intervals.md)

---

## 9. BINARY SEARCH

### 51. 🟠 P1 [Q] LC 704: Binary Search [EASY]
- **LeetCode Link:** [LC 704: Binary Search](https://leetcode.com/problems/binary-search/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Standard & Boundary Search)

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
- **Main Pattern:** Sub-Pattern 9.1 (Standard & Boundary Search)
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

### 52. 🔴 P0 [Q] LC 34: Find First and Last Position of Element in Sorted Array [MEDIUM]
- **LeetCode Link:** [LC 34: Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 9.1 (Standard & Boundary Search)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If `target` is not found in the array, return `[-1, -1]`. You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
- **Input:** `nums = [5,7,7,8,8,10], target = 8`
- **Output:** `[3,4]`

**Example 2:**
- **Input:** `nums = [5,7,7,8,8,10], target = 6`
- **Output:** `[-1,-1]`

**Example 3:**
- **Input:** `nums = [], target = 0`
- **Output:** `[-1,-1]`

**Constraints:**
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non-decreasing array.
- `-10^9 <= target <= 10^9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 9.1 (Standard & Boundary Search)
- **Memory Mnemonic:** *"Found it? Don't stop. Record it and keep squeezing toward the edge."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1)
- **Explanation:** Scan left to right. The first index where `nums[i] == target` is the start; keep updating the end for every later match. Correct, but ignores the sorted order and breaks the required O(log N).

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = -1, last = -1;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                if (first == -1) first = i;
                last = i;
            }
        }
        return {first, last};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** Run binary search twice with one helper. The only change from standard binary search is what happens on a match:
1. Save `mid` as the current answer.
2. To find the **first** position, continue searching the left half (`hi = mid - 1`), because an earlier match may exist.
3. To find the **last** position, continue searching the right half (`lo = mid + 1`).
When the loop ends, the saved answer is the boundary, or `-1` if no match was ever seen.

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }
private:
    int findBound(vector<int>& nums, int target, bool first) {
        int lo = 0, hi = (int)nums.size() - 1, ans = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                ans = mid;
                if (first) hi = mid - 1;
                else lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
};
```

**🔁 Variant: STL One-Liner (follow-up: "can you do it with the standard library?")**
- **Complexity:** **Time:** O(log N) | **Space:** O(1) auxiliary
- **Explanation:** `lower_bound` returns the first position with value `>= target`; `upper_bound` returns the first position with value `> target`.
1. If `lower_bound` lands at the end, or on a value that is not `target`, the target is absent.
2. Otherwise the range is `[lower, upper - 1]`.
Good to know, but write the manual version first: the interviewer wants to see the boundary logic.

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        auto lo = lower_bound(nums.begin(), nums.end(), target);
        if (lo == nums.end() || *lo != target) return {-1, -1};
        auto hi = upper_bound(nums.begin(), nums.end(), target);
        return {(int)(lo - nums.begin()), (int)(hi - nums.begin()) - 1};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Empty array:** write `(int)nums.size() - 1`. Without the cast, `nums.size() - 1` on an empty vector underflows to a huge unsigned number.
- **Use `mid = lo + (hi - lo) / 2`** instead of `(lo + hi) / 2` to avoid overflow; it costs nothing to write it this way every time.
- **Stopping at the first match** is the classic bug: it finds *a* position, not the first or last.
- **This template powers others:** count of `target` = `last - first + 1`; Search Insert Position (LC 35) is exactly `lower_bound`.

---

### 53. 🔴 P0 [Q] LC 33: Search In Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [LC 33: Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 9.2 (Rotated & Modified Array Search)

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
- **Main Pattern:** Sub-Pattern 9.2 (Rotated & Modified Array Search)
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

### 54. 🔴 P0 [Q] LC 153: Find Minimum in Rotated Sorted Array [MEDIUM]
- **LeetCode Link:** [LC 153: Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 9.2 (Rotated & Modified Array Search)

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
- **Main Pattern:** Sub-Pattern 9.2 (Rotated & Modified Array Search)
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

### 55. 🔴 P0 [Q] LC 875: Koko Eating Bananas [MEDIUM]
- **LeetCode Link:** [LC 875: Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- **Category / Sub-Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)

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
- **Main Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)
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

### 56. 🔴 P0 [Q] LC 1011: Capacity To Ship Packages Within D Days [MEDIUM]
- **LeetCode Link:** [LC 1011: Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- **Category / Sub-Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)

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
- **Main Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)
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

### 57. 🔴 P0 [Q] LC 74: Search a 2D Matrix [MEDIUM]
- **LeetCode Link:** [LC 74: Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Category / Sub-Pattern:** Sub-Pattern 9.4 (2D Matrix & Unsorted Condition Search)

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
- **Main Pattern:** Sub-Pattern 9.4 (2D Matrix & Unsorted Condition Search)
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

### 58. 🔴 P0 [Q] LC 162: Find Peak Element [MEDIUM]
- **LeetCode Link:** [LC 162: Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Category / Sub-Pattern:** Sub-Pattern 9.4 (2D Matrix & Unsorted Condition Search)

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
- **Main Pattern:** Sub-Pattern 9.4 (2D Matrix & Unsorted Condition Search)
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


### 59. 🟢 P2 [BONUS] LC 4: Median of Two Sorted Arrays [HARD]
- **LeetCode Link:** [LC 4: Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- **Category / Sub-Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)

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
- **Main Pattern:** Sub-Pattern 9.3 (Binary Search on Answer Space)
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

---

[⬅️ Previous: 08 · Sliding Window](08-sliding-window.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Overlapping Intervals ➡️](10-overlapping-intervals.md)
