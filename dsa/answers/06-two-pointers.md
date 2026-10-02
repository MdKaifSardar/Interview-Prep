[⬅️ Previous: 05 · Array Greedy & Kadane'S Algorithm](05-array-greedy-and-kadane-s-algorithm.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · String Manipulation & Palindromes ➡️](07-string-manipulation-and-palindromes.md)

---

## 6. TWO POINTERS

### 31. 🟠 P1 [Q] LC 283: Move Zeroes [EASY]
- **LeetCode Link:** [LC 283: Move Zeroes](https://leetcode.com/problems/move-zeroes/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Same-Direction Read/Write Pointers)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this **in-place** without making a copy of the array.

**Example 1:**
- **Input:** `nums = [0,1,0,3,12]`
- **Output:** `[1,3,12,0,0]`

**Example 2:**
- **Input:** `nums = [0]`
- **Output:** `[0]`

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Same-Direction Read/Write Pointers)
- **Memory Mnemonic:** *"Read everything, write only the keepers."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Copy all non-zero elements into a temporary array in order, pad it with zeros up to size `n`, and copy it back into `nums`. Correct and simple, but uses extra memory, which the problem forbids.

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        vector<int> temp;
        for (int x : nums)
            if (x != 0) temp.push_back(x);
        while (temp.size() < nums.size()) temp.push_back(0);
        nums = temp;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Two pointers moving in the same direction.
1. `w` starts at `0` and always points to the first slot that should hold the next non-zero.
2. Scan with `i`. When `nums[i] != 0`, swap it into position `w` and advance `w`.
3. Everything before `w` is the non-zero elements in their original order; everything from `w` to `i` is zeros, so the swap only ever moves a zero to the right.

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int w = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
                swap(nums[w], nums[i]);
                w++;
            }
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Don't use opposite-end pointers** (swap zeros with elements from the back). That is faster to write but breaks the relative order of the non-zeros, which the problem requires.
- **All zeros or no zeros** both work without special cases: with no zeros, every swap is a self-swap (`w == i`).
- **This read/write template** is reused in Remove Duplicates from Sorted Array (LC 26) and Remove Element (LC 27). Recognize it, and those become 2-minute problems.

---

### 32. 🟠 P1 [Q] LC 26: Remove Duplicates from Sorted Array [EASY]
- **LeetCode Link:** [LC 26: Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 6.1 (Same-Direction Read/Write Pointers)

**📜 Problem Statement & Explanation**
Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only once. The relative order of the elements should be kept the same. Return `k`, the number of unique elements. The first `k` elements of `nums` must hold the unique elements in order; the remaining elements and the size of `nums` do not matter.

**Example 1:**
- **Input:** `nums = [1,1,2]`
- **Output:** `2, nums = [1,2,_]`
- **Explanation:** Return `k = 2` with the first two elements being `1` and `2`. What is left beyond index `k` does not matter.

**Example 2:**
- **Input:** `nums = [0,0,1,1,1,2,2,3,3,4]`
- **Output:** `5, nums = [0,1,2,3,4,_,_,_,_,_]`

**Constraints:**
- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 6.1 (Same-Direction Read/Write Pointers)
- **Memory Mnemonic:** *"Compare with the last value you kept, not with the neighbor you just read."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Insert every element into a `std::set` (which keeps unique values in sorted order), then write the set back into the front of `nums`. Ignores the fact that the input is already sorted, and uses extra memory.

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        set<int> unique(nums.begin(), nums.end());
        int k = 0;
        for (int x : unique) nums[k++] = x;
        return k;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** The first element is always kept, so the write pointer starts at `w = 1`.
1. Scan `i` from `1`.
2. If `nums[i] != nums[w - 1]`, it is a new value: write it at `nums[w]` and advance `w`.
3. Otherwise it is a duplicate of the last kept value: skip it.
At the end, `w` is the number of unique elements.

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int w = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[w - 1]) {
                nums[w] = nums[i];
                w++;
            }
        }
        return w;
    }
};
```

**🔁 Variant: Remove Duplicates from Sorted Array II (LC 80, common follow-up: "allow each value at most twice")**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Generalize the comparison. To allow at most 2 copies, compare with the value kept **two** positions back, `nums[w - 2]`.
1. The first two elements are always kept, so start with `w = 2`.
2. If `nums[i] != nums[w - 2]`, then `nums[i]` cannot be a third copy (the array is sorted, so a third copy would equal both of the last two kept values). Keep it.
The same idea allows at most `k` copies by comparing with `nums[w - k]`.

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.size() <= 2) return nums.size();
        int w = 2;
        for (int i = 2; i < nums.size(); i++) {
            if (nums[i] != nums[w - 2]) {
                nums[w] = nums[i];
                w++;
            }
        }
        return w;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Compare with `nums[w - 1]`, not `nums[i - 1]`.** For this problem both happen to work, but only the `w`-based version generalizes to LC 80. Learn the version that scales.
- **The leftover tail** after index `k` is not cleared, and that is fine: the judge only checks the first `k` elements.
- **Single element** returns `1` without entering the loop.

---

### 33. 🔴 P0 [Q] LC 167: Two Sum II - Input Array Is Sorted [MEDIUM]
- **LeetCode Link:** [LC 167: Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)

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
- **Main Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)
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

### 34. 🔴 P0 [Q] LC 15: 3Sum [MEDIUM]
- **LeetCode Link:** [LC 15: 3Sum](https://leetcode.com/problems/3sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)

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
- **Main Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)
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

### 35. 🔴 P0 [Q] LC 11: Container With Most Water [MEDIUM]
- **LeetCode Link:** [LC 11: Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)

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
- **Main Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)
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

### 36. 🔴 P0 [Q] LC 42: Trapping Rain Water [HARD]
- **LeetCode Link:** [LC 42: Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)

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
- **Main Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)
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

### 37. 🔴 P0 [Q] LC 75: Sort Colors (Dutch National Flag) [MEDIUM]
- **LeetCode Link:** [LC 75: Sort Colors (Dutch National Flag)](https://leetcode.com/problems/sort-colors/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Partitioning & Backward Pointers)

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
- **Main Pattern:** Sub-Pattern 6.3 (Partitioning & Backward Pointers)
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

### 38. 🟠 P1 [Q] LC 88: Merge Sorted Array [EASY]
- **LeetCode Link:** [LC 88: Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- **Category / Sub-Pattern:** Sub-Pattern 6.3 (Partitioning & Backward Pointers)

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
- **Main Pattern:** Sub-Pattern 6.3 (Partitioning & Backward Pointers)
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


### 39. 🟢 P2 [BONUS] LC 18: 4Sum [MEDIUM]
- **LeetCode Link:** [LC 18: 4Sum](https://leetcode.com/problems/4sum/)
- **Category / Sub-Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)

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
- **Main Pattern:** Sub-Pattern 6.2 (Opposite Direction Pointers)
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

---

[⬅️ Previous: 05 · Array Greedy & Kadane'S Algorithm](05-array-greedy-and-kadane-s-algorithm.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · String Manipulation & Palindromes ➡️](07-string-manipulation-and-palindromes.md)
