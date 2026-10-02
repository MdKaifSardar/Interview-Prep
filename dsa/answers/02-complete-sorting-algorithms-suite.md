[⬅️ Previous: 01 · Matrix Simulation & Array Transformations](01-matrix-simulation-and-array-transformations.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Hashing / Frequency Counting ➡️](03-hashing-frequency-counting.md)

---

## 2. COMPLETE SORTING ALGORITHMS SUITE

### 7. 🟠 P1 [Q] ALG 1: Selection Sort Algorithm Blueprint [EASY]
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

### 8. 🟠 P1 [Q] ALG 2: Bubble Sort Algorithm Blueprint [EASY]
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

### 9. 🟠 P1 [Q] ALG 3: Insertion Sort Algorithm Blueprint [EASY]
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

### 10. 🔴 P0 [Q] ALG 4: Merge Sort & Inversion Counting Blueprint [MEDIUM]
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

### 11. 🔴 P0 [Q] ALG 5: Quick Sort Algorithm Blueprint [MEDIUM]
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

### 12. 🟢 P2 [Q] ALG 6: Counting Sort Algorithm Blueprint [EASY]
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

### 13. 🔴 P0 [Q] LC 179: Largest Number [MEDIUM]
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


### 14. 🟢 P2 [BONUS] LC 148: Sort List [MEDIUM]
- **LeetCode Link:** [LC 148: Sort List](https://leetcode.com/problems/sort-list/)
- **Category / Sub-Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))

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
- **Main Pattern:** Sub-Pattern 2.2 (Divide & Conquer & Advanced Sorts (O(N log N)))
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

---

[⬅️ Previous: 01 · Matrix Simulation & Array Transformations](01-matrix-simulation-and-array-transformations.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Hashing / Frequency Counting ➡️](03-hashing-frequency-counting.md)
