[⬅️ Previous: 12 · Fast & Slow Pointers (Linked List)](12-fast-and-slow-pointers-linked-list.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 14 · Heap / Priority Queue ➡️](14-heap-priority-queue.md)

---

## 13. STACK & MONOTONIC STACK

### 75. 🔴 P0 [Q] LC 20: Valid Parentheses [EASY]
- **LeetCode Link:** [LC 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- **Category / Sub-Pattern:** Sub-Pattern 13.1 (Basic Stack Matching)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.1 (Basic Stack Matching)
- **Memory Mnemonic:** *"Push opening brackets, pop matching closing brackets."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Repeatedly find and replace matching pairs `()`, `{}`, `[]` with empty string `""` until no pairs remain. If remaining string is empty, valid.

```cpp
class Solution {
public:
    bool isValid(string s) {
        while (s.find("()") != string::npos || s.find("{}") != string::npos || s.find("[]") != string::npos) {
            size_t p1 = s.find("()");
            if (p1 != string::npos) s.erase(p1, 2);
            size_t p2 = s.find("{}");
            if (p2 != string::npos) s.erase(p2, 2);
            size_t p3 = s.find("[]");
            if (p3 != string::npos) s.erase(p3, 2);
        }
        return s.empty();
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Stack Matching:
Traverse characters in `s`: push opening brackets `'('`, `'{'`, `'['`. For closing brackets, check if `st.empty()` or top does not match corresponding opening bracket; if so return `false`. Else pop `st.top()`. Return `st.empty()` at end.

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- String starting with closing bracket.
- Odd length strings.

---

### 76. 🔴 P0 [Q] LC 155: Min Stack [MEDIUM]
- **LeetCode Link:** [LC 155: Min Stack](https://leetcode.com/problems/min-stack/)
- **Category / Sub-Pattern:** Sub-Pattern 13.2 (Stack Design (Auxiliary State))

**📜 Problem Statement & Explanation**
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the `MinStack` class:
- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

**Example 1:**
- **Input:** `["MinStack","push","push","push","getMin","pop","top","getMin"]`, `[[],[-2],[0],[-3],[],[],[],[]]`
- **Output:** `[null,null,null,null,-3,null,0,-2]`
- **Explanation:** After pushing `-2, 0, -3`, the minimum is `-3`. After `pop()` removes `-3`, `top()` is `0` and the minimum goes back to `-2`.

**Constraints:**
- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` will always be called on **non-empty** stacks.
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.2 (Stack Design (Auxiliary State))
- **Memory Mnemonic:** *"Every level remembers the minimum beneath it, so popping restores the old min for free."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(1) for push/pop/top, O(N) for getMin | **Space:** O(N)
- **Explanation:** Use a plain `vector<int>` as the stack and scan all elements in `getMin`. Simple, but `getMin` is linear, which breaks the O(1) requirement.

```cpp
class MinStack {
    vector<int> st;
public:
    MinStack() {}
    void push(int val) { st.push_back(val); }
    void pop() { st.pop_back(); }
    int top() { return st.back(); }
    int getMin() { return *min_element(st.begin(), st.end()); }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(1) for every operation | **Space:** O(N)
- **Explanation:** The minimum only changes on push and pop, and a stack only ever pops the most recent push. So each entry can store the answer for "what is the minimum if I am the top?"
1. **push(val):** the new minimum is `min(val, current minimum)` (or just `val` if the stack is empty). Push the pair `{val, newMin}`.
2. **pop():** pop the pair. The pair below it already stores the correct older minimum.
3. **top():** first field of the top pair. **getMin():** second field of the top pair.

```cpp
class MinStack {
    stack<pair<int, int>> st;   // {value, min so far}
public:
    MinStack() {}

    void push(int val) {
        int currMin = st.empty() ? val : min(val, st.top().second);
        st.push({val, currMin});
    }

    void pop() { st.pop(); }

    int top() { return st.top().first; }

    int getMin() { return st.top().second; }
};
```

**🔁 Variant: O(1) Extra Space with Encoding (follow-up: "can you avoid storing a second value per element?")**
- **Complexity:** **Time:** O(1) for every operation | **Space:** O(N) for the stack itself, O(1) extra
- **Explanation:** Keep one variable `mn` for the current minimum. When a new minimum arrives, push an **encoded** value that also remembers the old minimum.
1. **push(x):** if the stack is empty, push `x` and set `mn = x`. If `x >= mn`, push `x` normally. If `x < mn`, push `2*x - mn` and set `mn = x`. Because `x < mn`, the encoded value `2*x - mn` is **smaller than `x`**, i.e. smaller than the new `mn`. That is the flag.
2. **pop():** if the top `t` is smaller than `mn`, it is encoded: the real value was `mn`, and the previous minimum is `2*mn - t`, so restore `mn = 2*mn - t`. Then pop.
3. **top():** if `t < mn`, the real value is `mn`; otherwise it is `t`.
4. **getMin():** `mn`.
Use `long long`, because `2*x - mn` overflows `int` for values near `±2^31`.

```cpp
class MinStack {
    stack<long long> st;
    long long mn;
public:
    MinStack() {}

    void push(int val) {
        long long x = val;
        if (st.empty()) {
            st.push(x);
            mn = x;
        } else if (x >= mn) {
            st.push(x);
        } else {
            st.push(2 * x - mn);
            mn = x;
        }
    }

    void pop() {
        long long t = st.top();
        st.pop();
        if (t < mn) mn = 2 * mn - t;
    }

    int top() {
        long long t = st.top();
        return (int)(t < mn ? mn : t);
    }

    int getMin() { return (int)mn; }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Duplicates of the minimum:** with the common two-stack approach (a second stack that only stores minimums), push onto the min stack when `val <= currentMin`, not `<`. Otherwise popping one copy of the minimum loses it while another copy is still in the stack. The pair approach above avoids this issue entirely.
- **Overflow in the encoding variant:** `2 * x - mn` with `x = -2^31` overflows `int`. Always use `long long` there.
- **Don't call `top()` / `getMin()` on an empty stack.** The problem guarantees it won't happen; say so instead of adding checks.
- **Related design:** Max Stack works the same way with `max`. Implement Queue using Stacks (LC 232) is the other common stack-design warm-up.

---

### 77. 🟠 P1 [Q] LC 496: Next Greater Element I [EASY]
- **LeetCode Link:** [LC 496: Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)
- **Category / Sub-Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
The **next greater element** of some element `x` in an array is the **first greater** element that is **to the right** of `x` in the same array. You are given two **distinct 0-indexed** integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each `nums1[i]`, find the index `j` such that `nums1[i] == nums2[j]` and determine the next greater element of `nums2[j]` in `nums2`. If there is no next greater element, the answer for this query is `-1`. Return an array `ans` of length `nums1.length` such that `ans[i]` is the next greater element as described above.

**Example 1:**
- **Input:** `nums1 = [4,1,2], nums2 = [1,3,4,2]`
- **Output:** `[-1,3,-1]`
- **Explanation:** `4` has nothing greater to its right in `nums2`; the next greater of `1` is `3`; `2` is the last element, so `-1`.

**Example 2:**
- **Input:** `nums1 = [2,4], nums2 = [1,2,3,4]`
- **Output:** `[3,-1]`

**Constraints:**
- `1 <= nums1.length <= nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 10^4`
- All integers in `nums1` and `nums2` are **unique**.
- All the integers of `nums1` also appear in `nums2`.
- **Follow-up:** Could you find an O(nums1.length + nums2.length) solution?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"The stack holds elements still waiting for someone bigger; the first bigger arrival answers them all."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(1) auxiliary (excluding output)
- **Explanation:** For each value in `nums1`, find its position in `nums2`, then scan to the right for the first larger value. Fine for the given limits (1000 x 1000), but the follow-up asks for linear time.

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res;
        for (int x : nums1) {
            int j = find(nums2.begin(), nums2.end(), x) - nums2.begin();
            int ans = -1;
            for (int k = j + 1; k < nums2.size(); k++) {
                if (nums2[k] > x) {
                    ans = nums2[k];
                    break;
                }
            }
            res.push_back(ans);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M + N) | **Space:** O(N)
- **Explanation:** Compute the next greater element for **every** value in `nums2` in one pass, store it in a hash map, then answer each query in O(1).
1. Scan `nums2` left to right with a stack of values that have not found their next greater element yet. The stack is always decreasing from bottom to top.
2. For each `x`: while the top is smaller than `x`, `x` is the first greater element to its right. Record `nge[top] = x` and pop.
3. Push `x`; it now waits for its own answer.
4. Anything left in the stack at the end has no greater element: answer `-1`.
Each element is pushed and popped at most once, so the scan is O(N).

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nge;
        stack<int> st;
        for (int x : nums2) {
            while (!st.empty() && st.top() < x) {
                nge[st.top()] = x;
                st.pop();
            }
            st.push(x);
        }
        vector<int> res;
        for (int x : nums1) {
            auto it = nge.find(x);
            res.push_back(it == nge.end() ? -1 : it->second);
        }
        return res;
    }
};
```

**🔁 Variant: Next Greater Element II (LC 503, common follow-up: "the array is circular")**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** In a circular array, the next greater element may wrap around to the beginning. Simulate the array twice without copying it.
1. Loop `i` from `0` to `2n - 1` and read `nums[i % n]`.
2. The stack now stores **indices** (values can repeat in LC 503, so values alone are ambiguous).
3. Pop and answer while `nums[stack top] < nums[i % n]`.
4. Push indices only during the first pass (`i < n`); the second pass exists only to answer elements that are still waiting.

```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, -1);
        stack<int> st;
        for (int i = 0; i < 2 * n; i++) {
            int x = nums[i % n];
            while (!st.empty() && nums[st.top()] < x) {
                res[st.top()] = x;
                st.pop();
            }
            if (i < n) st.push(i);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Values vs indices on the stack:** values work here only because all elements are distinct. When duplicates exist (LC 503) or you need a distance (Daily Temperatures, LC 739), store indices.
- **Leftover elements** in the stack after the scan have no greater element: they get `-1`.
- **This is the template** for Daily Temperatures (LC 739), Online Stock Span (LC 901) and Largest Rectangle in Histogram (LC 84). Flip `<` to `>` to get the next **smaller** element.

---

### 78. 🔴 P0 [Q] LC 739: Daily Temperatures [MEDIUM]
- **LeetCode Link:** [LC 739: Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Category / Sub-Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)

**📜 Problem Statement & Explanation**
Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.

**Example 1:**
- **Input:** `temperatures = [73,74,75,71,69,72,76,73]` 
- **Output:** `[1,1,4,2,1,1,0,0]`

**Constraints:**
- `1 <= temperatures.length <= 10^5` 
- `30 <= temperatures[i] <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"Monotonic decreasing stack storing indices."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** For each day i, run an inner loop over future days `j > i` until `temperatures[j] > temperatures[i]`. Distance is `j - i`.

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    res[i] = j - i;
                    break;
                }
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Monotonic Decreasing Stack storing day indices:
Iterate `i` from 0 to `N - 1`. While stack is not empty and `temperatures[i] > temperatures[st.top()]`: pop top index `prevIdx = st.top()`, compute answer `res[prevIdx] = i - prevIdx`. Push current index `i` onto stack.

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // stores indices
        
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                res[prevIdx] = i - prevIdx;
            }
            st.push(i);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Strictly decreasing temperatures (all answers 0).
- Strictly increasing temperatures.

---

### 79. 🟢 P2 [Q] LC 84: Largest Rectangle in Histogram [HARD]
- **LeetCode Link:** [LC 84: Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- **Category / Sub-Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"Monotonic increasing stack tracking Next Smaller Element left/right."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** For each bar i, find Next Smaller Element to Left (NSL) and Right (NSR) using linear scans. Width = `NSR - NSL - 1`. Area = `heights[i] * width`.

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size(), maxArea = 0;
        for (int i = 0; i < n; i++) {
            int nsl = -1, nsr = n;
            for (int j = i - 1; j >= 0; j--) {
                if (heights[j] < heights[i]) { nsl = j; break; }
            }
            for (int j = i + 1; j < n; j++) {
                if (heights[j] < heights[i]) { nsr = j; break; }
            }
            int width = nsr - nsl - 1;
            maxArea = max(maxArea, heights[i] * width);
        }
        return maxArea;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Monotonic Increasing Stack of indices:
Iterate `i` from 0 to `N`. (At `i == N`, treat height as 0).
While stack not empty and `currHeight < heights[st.top()]`:
Pop `h = heights[st.top()]`. Width is `st.empty() ? i : i - st.top() - 1`. Area = `h * width`. Maximize `maxArea`.

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int maxArea = 0;
        
        for (int i = 0; i <= n; i++) {
            int currH = (i == n ? 0 : heights[i]);
            while (!st.empty() && currH < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * width);
            }
            st.push(i);
        }
        return maxArea;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All heights equal.
- Monotonically increasing or decreasing heights.

---


### 80. 🟢 P2 [BONUS] LC 85: Maximal Rectangle [HARD]
- **LeetCode Link:** [LC 85: Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- **Category / Sub-Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 13.3 (Next Greater / Smaller Element)
- **Memory Mnemonic:** *"Row-by-row cumulative histogram: If '1' h++, else h=0. Run LC 84 Largest Rectangle in Histogram on each row."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M^3 \times N^3)$ | **Space:** $O(1)$
- **Explanation:** Check every possible subrectangle $(r1, c1)$ to $(r2, c2)$. If all cells are `'1'`, calculate area $(r2 - r1 + 1) \times (c2 - c1 + 1)$ and update max area.

```cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size(), maxArea = 0;
        for (int r1 = 0; r1 < m; r1++) {
            for (int c1 = 0; c1 < n; c1++) {
                for (int r2 = r1; r2 < m; r2++) {
                    for (int c2 = c1; c2 < n; c2++) {
                        bool allOnes = true;
                        for (int r = r1; r <= r2 && allOnes; r++) {
                            for (int c = c1; c <= c2; c++) {
                                if (matrix[r][c] == '0') { allOnes = false; break; }
                            }
                        }
                        if (allOnes) maxArea = max(maxArea, (r2 - r1 + 1) * (c2 - c1 + 1));
                    }
                }
            }
        }
        return maxArea;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M \times N)$ | **Space:** $O(N)$
- **Explanation:**
  1. Treat each row as the base of a histogram. Maintain an array `heights` of length $N$.
  2. For row $r$, if `matrix[r][c] == '1'`, `heights[c] += 1`; otherwise, `heights[c] = 0`.
  3. Apply the LC 84 Monotonic Stack algorithm on `heights`: maintain a monotonic increasing stack of indices. When popping an index $i$, the popped bar has height $h = heights[i]$ and width $w = right - left - 1$.
  4. Track the maximum area across all rows.

```cpp
class Solution {
private:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0); // Sentinel to flush remaining elements
        int n = heights.size(), maxArea = 0;
        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && heights[st.top()] > heights[i]) {
                int h = heights[st.top()];
                st.pop();
                int w = st.empty() ? i : (i - st.top() - 1);
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        heights.pop_back();
        return maxArea;
    }
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '1') heights[c]++;
                else heights[c] = 0;
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- When `matrix[r][c] == '0'`, `heights[c]` must be reset to `0`, not simply left un-incremented.
- Append a sentinel `0` to `heights` to cleanly flush all bars from the stack without post-loop cleanup logic.

---

---

[⬅️ Previous: 12 · Fast & Slow Pointers (Linked List)](12-fast-and-slow-pointers-linked-list.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 14 · Heap / Priority Queue ➡️](14-heap-priority-queue.md)
