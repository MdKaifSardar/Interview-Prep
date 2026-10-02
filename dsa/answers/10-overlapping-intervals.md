[⬅️ Previous: 09 · Binary Search](09-binary-search.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 11 · Linked List Manipulation ➡️](11-linked-list-manipulation.md)

---

## 10. OVERLAPPING INTERVALS

### 60. 🔴 P0 [Q] LC 56: Merge Intervals [MEDIUM]
- **LeetCode Link:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Interval Merging & Insertion)

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

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"Sort by start time, merge overlapping bounds (`res.back()[1] = max(res.back()[1], interval[1])`)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort intervals by start time. For each unvisited interval, check subsequent intervals to see if they overlap (`intervals[j][0] <= end`). If so, expand `end = max(end, intervals[j][1])` and mark index `j` as visited.

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if (n <= 1) return intervals;
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        vector<bool> visited(n, false);
        for (int i = 0; i < n; i++) {
            if (visited[i]) continue;
            int start = intervals[i][0];
            int end = intervals[i][1];
            for (int j = i + 1; j < n; j++) {
                if (intervals[j][0] <= end) {
                    end = max(end, intervals[j][1]);
                    visited[j] = true;
                }
            }
            res.push_back({start, end});
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Sort intervals by start time. Iterate sequentially: if `res` is empty or `res.back()[1] < interval[0]`, no overlap exists, so append `interval`. Otherwise, merge by setting `res.back()[1] = max(res.back()[1], interval[1])`.

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Adjacent endpoints touching e.g., `[[1,4],[4,5]]` -> `[[1,5]]` (`4 <= 4` is overlapping).
- Nested intervals e.g., `[[1,10],[2,3]]` -> `[[1,10]]`.
- Unsorted input array (must sort by start time first).
- Empty input or single element array.

---

### 61. 🔴 P0 [Q] LC 57: Insert Interval [MEDIUM]
- **LeetCode Link:** [Insert Interval](https://leetcode.com/problems/insert-interval/)
- **Category / Sub-Pattern:** Sub-Pattern 10.1 (Interval Merging & Insertion)

**📜 Problem Statement & Explanation**
You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]`.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `start_i` and `intervals` still has no overlapping intervals (merge overlapping intervals if necessary). Return `intervals` after insertion.

**Example 1:**
- **Input:** `intervals = [[1,3],[6,9]], newInterval = [2,5]`
- **Output:** `[[1,5],[6,9]]`

**Example 2:**
- **Input:** `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]`
- **Output:** `[[1,2],[3,10],[12,16]]`
- **Explanation:** Because `[4,8]` overlaps with `[3,5],[6,7],[8,10]`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.1 (Interval Merging & Insertion)
- **Memory Mnemonic:** *"3-phase linear scan: left non-overlapping -> merge overlapping mid -> right non-overlapping."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N)
- **Explanation:** Append `newInterval` to `intervals`, sort the merged vector by start time in `O(N log N)`, and apply standard Merge Intervals logic in `O(N)`.

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        intervals.push_back(newInterval);
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N) auxiliary
- **Explanation:** Take advantage of the existing sorted order with a 3-phase single pass:
  1. Add all intervals ending before `newInterval` starts (`interval[1] < newInterval[0]`).
  2. Merge all overlapping intervals (`interval[0] <= newInterval[1]`) into `newInterval` by taking `min(start)` and `max(end)`. Push updated `newInterval`.
  3. Add all remaining intervals starting after `newInterval` ends (`interval[0] > newInterval[1]`).

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        
        // Phase 1: Add intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }
        
        // Phase 2: Merge overlapping intervals with newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        
        // Phase 3: Add remaining intervals after newInterval ends
        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }
        
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty `intervals` array (return `[newInterval]`).
- `newInterval` inserted at the very beginning (before all existing intervals).
- `newInterval` inserted at the very end (after all existing intervals).
- `newInterval` completely spans and swallows all existing intervals.

---

### 62. 🔴 P0 [Q] LC 435: Non-overlapping Intervals [MEDIUM]
- **LeetCode Link:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)

**📜 Problem Statement & Explanation**
Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

**Example 1:**
- **Input:** `intervals = [[1,2],[2,3],[3,4],[1,3]]`
- **Output:** `1`
- **Explanation:** `[1,3]` can be removed and the rest of the intervals are non-overlapping.

**Example 2:**
- **Input:** `intervals = [[1,2],[1,2],[1,2]]`
- **Output:** `2`
- **Explanation:** Remove two `[1,2]` to make the rest non-overlapping.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)
- **Memory Mnemonic:** *"Greedy scheduling: Sort by end time, discard current if start < prevEnd."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort intervals by start time. Compute the Longest Non-Overlapping Subsequence using dynamic programming (similar to LIS). `dp[i]` represents max non-overlapping intervals ending at index `i`. Return `N - max(dp)`.

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        int n = intervals.size();
        vector<int> dp(n, 1);
        int maxKeep = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxKeep = max(maxKeep, dp[i]);
        }
        return n - maxKeep;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1) auxiliary
- **Explanation:** Greedy Activity Selection. Sort intervals by **end time** `intervals[i][1]` in ascending order. Maintain `prevEnd` for the last kept interval. If current `intervals[i][0] < prevEnd`, overlap occurs; increment `removals++`. Otherwise, keep interval and set `prevEnd = intervals[i][1]`.

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int removals = 0;
        int prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) {
                removals++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return removals;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Intervals touching at boundary e.g. `[1,2]` and `[2,3]` are non-overlapping (`2 <= 2`).
- Why sort by end time vs start time: Sorting by end time leaves maximum room for future intervals.

---

### 63. 🔴 P0 [Q] LC 253: Meeting Rooms II [MEDIUM]
- **LeetCode Link:** [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)

**📜 Problem Statement & Explanation**
Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required to hold all meetings.

**Example 1:**
- **Input:** `intervals = [[0,30],[5,10],[15,20]]`
- **Output:** `2`
- **Explanation:** Room 1 handles `[0,30]`. Room 2 handles `[5,10]` and `[15,20]`.

**Example 2:**
- **Input:** `intervals = [[7,10],[2,4]]`
- **Output:** `1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)
- **Memory Mnemonic:** *"Sort by start time + Min-Heap of active room end-times (`minHeap.top() <= start` to reuse room)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Sort meetings by start time. Maintain a list `roomEndTimes`. For each meeting, linearly search if any room is free (`roomEndTimes[i] <= start`). If free, update `roomEndTimes[i] = end`. If no free room, allocate a new room by appending `end`.

```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        vector<int> roomEndTimes;
        for (const auto& meeting : intervals) {
            int start = meeting[0], end = meeting[1];
            bool assigned = false;
            for (int i = 0; i < roomEndTimes.size(); i++) {
                if (roomEndTimes[i] <= start) {
                    roomEndTimes[i] = end;
                    assigned = true;
                    break;
                }
            }
            if (!assigned) {
                roomEndTimes.push_back(end);
            }
        }
        return roomEndTimes.size();
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(N) auxiliary
- **Explanation:** Sort meetings by start time `O(N log N)`. Use a Min-Heap (`priority_queue<int, vector<int>, greater<int>>`) storing room end times. For each meeting `[start, end]`: if `minHeap.top() <= start`, the room with earliest end time is free, so pop it. Push `end` onto heap. Final heap size = minimum rooms needed.

```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (const auto& interval : intervals) {
            if (!minHeap.empty() && minHeap.top() <= interval[0]) {
                minHeap.pop();
            }
            minHeap.push(interval[1]);
        }
        return minHeap.size();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Back-to-back meetings e.g., `[0,5]` and `[5,10]` can use the same room (`5 <= 5`).
- Empty interval array (returns `0`).
- All meetings overlapping simultaneously requires N rooms.

---


### 64. 🟢 P2 [BONUS] LC 986: Interval List Intersections [MEDIUM]
- **LeetCode Link:** [LC 986: Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)
- **Category / Sub-Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 10.2 (Greedy Interval Scheduling & Sweep Line)
- **Memory Mnemonic:** *"Overlap start = max(A.start, B.start), Overlap end = min(A.end, B.end). Advance the one that ends first."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(1)$ auxiliary
- **Explanation:** Check all pairs $(i, j)$ using nested loops. For each pair, calculate `start = max(firstList[i][0], secondList[j][0])` and `end = min(firstList[i][1], secondList[j][1])`. If `start <= end`, record `[start, end]`.

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        for (const auto& a : firstList) {
            for (const auto& b : secondList) {
                int start = max(a[0], b[0]);
                int end = min(a[1], b[1]);
                if (start <= end) {
                    res.push_back({start, end});
                }
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M + N)$ | **Space:** $O(1)$ auxiliary memory
- **Explanation:** Because both lists are already sorted and disjoint, use two pointers `i` and `j`:
  1. Potential overlap: `start = max(firstList[i][0], secondList[j][0])`, `end = min(firstList[i][1], secondList[j][1])`.
  2. If `start <= end`, add `[start, end]` to result.
  3. Discard the interval that ends earlier: if `firstList[i][1] < secondList[j][1]`, increment `i`; otherwise increment `j`.

```cpp
class Solution {
public:
    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {
        vector<vector<int>> res;
        int i = 0, j = 0;
        int m = firstList.size(), n = secondList.size();

        while (i < m && j < n) {
            int start = max(firstList[i][0], secondList[j][0]);
            int end = min(firstList[i][1], secondList[j][1]);

            if (start <= end) {
                res.push_back({start, end});
            }

            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Closed intervals mean single-point intersections (e.g., `[5, 5]`) are valid.
- One or both lists empty returns `[]`.

---

---

[⬅️ Previous: 09 · Binary Search](09-binary-search.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 11 · Linked List Manipulation ➡️](11-linked-list-manipulation.md)
