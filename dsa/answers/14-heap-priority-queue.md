[⬅️ Previous: 13 · Stack & Monotonic Stack](13-stack-and-monotonic-stack.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 15 · Tree Dfs / Depth First Search ➡️](15-tree-dfs-depth-first-search.md)

---

## 14. HEAP / PRIORITY QUEUE

### 81. 🔴 P0 [Q] LC 215: Kth Largest Element in an Array [MEDIUM]
- **LeetCode Link:** [LC 215: Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))

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
- **Main Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))
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

### 82. 🔴 P0 [Q] LC 347: Top K Frequent Elements [MEDIUM]
- **LeetCode Link:** [LC 347: Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))

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
- **Main Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))
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

### 83. 🟠 P1 [Q] LC 973: K Closest Points to Origin [MEDIUM]
- **LeetCode Link:** [LC 973: K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))

**📜 Problem Statement & Explanation**
Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`. The distance between two points is the Euclidean distance `sqrt((x1 - x2)^2 + (y1 - y2)^2)`. You may return the answer in **any order**. The answer is guaranteed to be unique (except for the order that it is in).

**Example 1:**
- **Input:** `points = [[1,3],[-2,2]], k = 1`
- **Output:** `[[-2,2]]`
- **Explanation:** The distance of `(1, 3)` is `sqrt(10)` and of `(-2, 2)` is `sqrt(8)`. `sqrt(8) < sqrt(10)`, so `(-2, 2)` is closer.

**Example 2:**
- **Input:** `points = [[3,3],[5,-1],[-2,4]], k = 2`
- **Output:** `[[3,3],[-2,4]]`

**Constraints:**
- `1 <= k <= points.length <= 10^4`
- `-10^4 <= xi, yi <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))
- **Memory Mnemonic:** *"Keep the k best in a max-heap; the root is the worst of the best, so it is the first to go."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(log N) for sorting
- **Explanation:** Sort all points by squared distance from the origin and return the first `k`. Perfectly acceptable as a first answer; the heap improves it when `k` is much smaller than `N`.

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] * a[0] + a[1] * a[1] < b[0] * b[0] + b[1] * b[1];
        });
        return vector<vector<int>>(points.begin(), points.begin() + k);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log K) | **Space:** O(K)
- **Explanation:**
1. Use a max-heap of `{squaredDistance, index}` pairs. `priority_queue` in C++ is a max-heap by default.
2. Push every point. If the heap grows beyond `k`, pop the top, which is the **farthest** of the current candidates, so it cannot be among the `k` closest.
3. After processing all points, the heap holds exactly the `k` closest. Collect them.
Comparing squared distances gives the same order as comparing real distances, so `sqrt` is never needed.

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, int>> pq;   // {squared distance, index}, max-heap
        for (int i = 0; i < points.size(); i++) {
            int d = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            pq.push({d, i});
            if (pq.size() > k) pq.pop();
        }
        vector<vector<int>> res;
        while (!pq.empty()) {
            res.push_back(points[pq.top().second]);
            pq.pop();
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Max-heap for the k smallest, min-heap for the k largest.** It feels backwards, so say the reason: the heap's top must be the element you are most willing to throw away.
- **Skip `sqrt`.** It is slower and brings floating-point error; squared distances keep the same order. The largest squared distance here is `2 * 10^8`, which fits in `int`.
- **Quickselect alternative:** `nth_element` partitions the points around the `k`th closest in O(N) average time. Mention it as the follow-up for "can you beat O(N log K)?".
- **Same template** as Kth Largest Element in an Array (LC 215) and Top K Frequent Elements (LC 347).

---

### 84. 🔴 P0 [Q] LC 295: Find Median from Data Stream [HARD]
- **LeetCode Link:** [LC 295: Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- **Category / Sub-Pattern:** Sub-Pattern 14.2 (Two Heaps Median Tracking)

**📜 Problem Statement & Explanation**
Design a data structure that supports adding numbers from a data stream and finding the median of the stream.

**Example 1:**
- **Input:** `addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2.0`

**Constraints:**
- At most `5 * 10^4` calls to `addNum` and `findMedian`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 14.2 (Two Heaps Median Tracking)
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

### 85. 🔴 P0 [Q] LC 23: Merge k Sorted Lists [HARD]
- **LeetCode Link:** [LC 23: Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 14.3 (K-Way Merge)

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
- **Main Pattern:** Sub-Pattern 14.3 (K-Way Merge)
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


### 86. 🟢 P2 [BONUS] LC 621: Task Scheduler [MEDIUM]
- **LeetCode Link:** [LC 621: Task Scheduler](https://leetcode.com/problems/task-scheduler/)
- **Category / Sub-Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))

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
- **Main Pattern:** Sub-Pattern 14.1 (Top K Elements (Heap of Size K))
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

---

[⬅️ Previous: 13 · Stack & Monotonic Stack](13-stack-and-monotonic-stack.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 15 · Tree Dfs / Depth First Search ➡️](15-tree-dfs-depth-first-search.md)
