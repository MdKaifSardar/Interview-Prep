[⬅️ Previous: 04 · Prefix Sum & Difference Arrays](04-prefix-sum-and-difference-arrays.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Two Pointers ➡️](06-two-pointers.md)

---

## 5. ARRAY GREEDY & KADANE'S ALGORITHM

### 26. 🔴 P0 [Q] LC 53: Maximum Subarray [MEDIUM]
- **LeetCode Link:** [LC 53: Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Kadane's Algorithm & Running Best)

**📜 Problem Statement & Explanation**
Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

**Example 1:**
- **Input:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`
- **Output:** `6`
- **Explanation:** The subarray `[4,-1,2,1]` has the largest sum `6`.

**Example 2:**
- **Input:** `nums = [1]`
- **Output:** `1`

**Example 3:**
- **Input:** `nums = [5,4,-1,7,8]`
- **Output:** `23`

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Kadane's Algorithm & Running Best)
- **Memory Mnemonic:** *"Carry the running sum only while it helps; a negative prefix is dead weight, so drop it."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Fix every start index `i`, then extend the end index `j` one step at a time while keeping a running `sum`. Each extension is one candidate subarray, so update `best` after every addition. Recomputing from scratch for each `(i, j)` would be O(N^3); the running sum brings it down to O(N^2).

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size(), best = INT_MIN;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                best = max(best, sum);
            }
        }
        return best;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Kadane's Algorithm. Let `curr` be the best sum of a subarray that **ends exactly at index `i`**. There are only two choices for it:
1. Extend the best subarray ending at `i - 1`: `curr + nums[i]`.
2. Start a new subarray at `i`: `nums[i]`.
Take the larger one. If the previous `curr` was negative, starting fresh always wins, which is exactly "drop the negative prefix". The answer is the maximum `curr` over all positions, tracked in `best`.

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int curr = nums[0], best = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            curr = max(nums[i], curr + nums[i]);
            best = max(best, curr);
        }
        return best;
    }
};
```

**🔁 Variant: Return the Subarray Itself (common follow-up: "which subarray gives that sum?")**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Same Kadane loop, plus bookkeeping for indices.
1. Keep `start`, the index where the current running subarray began.
2. When starting fresh wins (`nums[i] > curr + nums[i]`), reset `curr = nums[i]` and move `start = i`.
3. Whenever `curr` beats `best`, record the window as `[start, i]`.
The recorded window at the end is the maximum subarray. This is not a separate LeetCode problem, so the signature below returns the `[left, right]` indices.

```cpp
class Solution {
public:
    vector<int> maxSubArrayRange(vector<int>& nums) {
        int curr = nums[0], best = nums[0];
        int start = 0, bestL = 0, bestR = 0;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] > curr + nums[i]) {
                curr = nums[i];
                start = i;
            } else {
                curr += nums[i];
            }
            if (curr > best) {
                best = curr;
                bestL = start;
                bestR = i;
            }
        }
        return {bestL, bestR};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **All-negative array** such as `[-3,-1,-2]` must return `-1`. Initializing `best = 0` (a very common bug) would wrongly return `0`, which is the sum of an empty subarray, and empty is not allowed. Always start from `nums[0]`.
- **Overflow is not a concern here:** the largest possible sum is `10^5 * 10^4 = 10^9`, which fits in `int`. Mention that you checked; interviewers like it.
- **Follow-up: divide and conquer.** LeetCode asks for an O(N log N) solution as a follow-up: the best subarray lies in the left half, the right half, or crosses the middle. Know the idea; Kadane is the answer they want.
- **Related:** Maximum Product Subarray (LC 152, #125) is Kadane where you also track the running minimum, because a negative number flips min and max. Maximum Sum Circular Subarray (LC 918) is `max(kadaneMax, total - kadaneMin)`.

---

### 27. 🔴 P0 [Q] LC 121: Best Time to Buy and Sell Stock [EASY]
- **LeetCode Link:** [LC 121: Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- **Category / Sub-Pattern:** Sub-Pattern 5.1 (Kadane's Algorithm & Running Best)

**📜 Problem Statement & Explanation**
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

**Example 1:**
- **Input:** `prices = [7,1,5,3,6,4]`
- **Output:** `5`
- **Explanation:** Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. Buying on day 2 and selling on day 1 is not allowed, because you must buy before you sell.

**Example 2:**
- **Input:** `prices = [7,6,4,3,1]`
- **Output:** `0`
- **Explanation:** Prices only fall, so no transaction makes a profit.

**Constraints:**
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.1 (Kadane's Algorithm & Running Best)
- **Memory Mnemonic:** *"Remember the cheapest day behind you, and sell today against it."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Try every pair of days `(i, j)` with `i < j`: buy on day `i`, sell on day `j`, and keep the maximum `prices[j] - prices[i]`. Correct, but times out for `N = 10^5`.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size(), best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                best = max(best, prices[j] - prices[i]);
        return best;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** For any selling day, the best buying day is simply the cheapest day **before** it. So we never need to look back at all pairs:
1. Keep `minPrice`, the lowest price seen so far.
2. For each price, first update `minPrice`, then compute the profit of selling today, `price - minPrice`.
3. Track the maximum profit in `best`.
Updating `minPrice` before computing profit is safe: if today is the new minimum, the profit is `0`, which never beats a real profit.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, best = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            best = max(best, price - minPrice);
        }
        return best;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Strictly falling prices** must return `0`, not a negative number. Starting `best` at `0` handles this automatically.
- **Order matters:** you cannot sell before you buy, so the answer is not simply `max - min` of the whole array (in `[7,1,5,3,6,4]` the max `7` comes before the min `1`).
- **Kadane connection:** this is Maximum Subarray (LC 53) applied to the array of day-to-day price differences. Interviewers sometimes ask you to spot that.
- **Follow-up family:** LC 122 (unlimited transactions) is greedy: add every positive day-to-day difference. LC 123 / 188 (at most 2 / k transactions) and LC 309 (cooldown) need DP and are rarely asked at mid-level.

---

### 28. 🟠 P1 [Q] LC 169: Majority Element [EASY]
- **LeetCode Link:** [LC 169: Majority Element](https://leetcode.com/problems/majority-element/)
- **Category / Sub-Pattern:** Sub-Pattern 5.2 (Voting & Cancellation Greedy)

**📜 Problem Statement & Explanation**
Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**
- **Input:** `nums = [3,2,3]`
- **Output:** `3`

**Example 2:**
- **Input:** `nums = [2,2,1,1,1,2,2]`
- **Output:** `2`

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`
- **Follow-up:** Could you solve the problem in linear time and in O(1) space?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.2 (Voting & Cancellation Greedy)
- **Memory Mnemonic:** *"Pair off different votes; the majority has more than half, so it can never be fully cancelled."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Count every value in an `unordered_map<int,int>`. As soon as a count exceeds `n / 2`, that value is the majority. Fast, but uses extra memory, which the follow-up forbids.

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> freq;
        int n = nums.size();
        for (int x : nums) {
            if (++freq[x] > n / 2) return x;
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Boyer-Moore Voting Algorithm. Think of it as a fight where every non-majority element can knock out one majority element and die with it.
1. Start with `count = 0`.
2. For each `x`: if `count == 0`, make `x` the new `candidate`.
3. If `x == candidate`, `count++`; otherwise `count--` (one pair cancels out).
Every cancellation removes one majority vote and one other vote. The majority has more than `n / 2` votes, so it cannot be cancelled completely, and it is the candidate left at the end.

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int x : nums) {
            if (count == 0) candidate = x;
            count += (x == candidate) ? 1 : -1;
        }
        return candidate;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **The guarantee matters.** Boyer-Moore only works because a majority is guaranteed to exist. If the interviewer removes that guarantee, add a second pass that counts the candidate and checks `count > n / 2`.
- **Quick alternative:** sorting and returning `nums[n / 2]` works in O(N log N), because the majority must cover the middle position. Good to mention as a stepping stone.
- **Follow-up: Majority Element II (LC 229)**, elements appearing more than `n / 3` times. There can be at most 2 of them, so keep 2 candidates and 2 counters, and always verify them with a second pass.

---

### 29. 🟠 P1 [Q] LC 55: Jump Game [MEDIUM]
- **LeetCode Link:** [LC 55: Jump Game](https://leetcode.com/problems/jump-game/)
- **Category / Sub-Pattern:** Sub-Pattern 5.3 (Reachability & Circuit Greedy)

**📜 Problem Statement & Explanation**
You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.

**Example 1:**
- **Input:** `nums = [2,3,1,1,4]`
- **Output:** `true`
- **Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**
- **Input:** `nums = [3,2,1,0,4]`
- **Output:** `false`
- **Explanation:** Every path arrives at index 3, whose maximum jump is `0`, so the last index is unreachable.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.3 (Reachability & Circuit Greedy)
- **Memory Mnemonic:** *"Walk while you are inside your reach, and keep stretching the reach."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N * maxJump) | **Space:** O(N)
- **Explanation:** DP over reachability. `reach[0] = true`. For each reachable index `i`, mark every index from `i + 1` to `i + nums[i]` as reachable. Return `reach[n - 1]`. Correct, but the inner loop can be long when jump values are large.

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        vector<bool> reach(n, false);
        reach[0] = true;
        for (int i = 0; i < n; i++) {
            if (!reach[i]) continue;
            for (int j = 1; j <= nums[i] && i + j < n; j++)
                reach[i + j] = true;
        }
        return reach[n - 1];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Reachable indices always form one continuous block starting at `0`, so a single number, `farthest`, describes the whole block.
1. For each index `i`: if `i > farthest`, index `i` is outside the block, so it (and everything after it) is unreachable. Return `false`.
2. Otherwise extend the block: `farthest = max(farthest, i + nums[i])`.
3. As soon as `farthest >= n - 1`, return `true`.

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size(), farthest = 0;
        for (int i = 0; i < n; i++) {
            if (i > farthest) return false;
            farthest = max(farthest, i + nums[i]);
            if (farthest >= n - 1) return true;
        }
        return true;
    }
};
```

**🔁 Variant: Jump Game II (LC 45, common follow-up: "now return the minimum number of jumps")**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Treat it like BFS without a queue. All indices reachable with `jumps` jumps form a block ending at `currentEnd`.
1. While scanning the current block, track `farthest`, the furthest index the next jump could land on.
2. When `i` reaches `currentEnd`, the current block is finished: take one more jump (`jumps++`) and the next block ends at `farthest`.
3. Loop only to `n - 2`: once you are inside a block that contains the last index, no further jump is needed.
The last index is guaranteed reachable in LC 45.

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < (int)nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Single element** `[0]` returns `true`: you already stand on the last index.
- **Zeros are the only trap.** A `0` stops you only if `farthest` cannot jump over it; `[2,0,0]` is `true`, `[1,0,1]` is `false`.
- **Jump Game II loop bound:** iterating to `n - 1` instead of `n - 2` counts one extra jump when `currentEnd` lands exactly on the last index.
- **Why greedy is safe:** you never need to choose *which* jump to take; you only need to know how far the set of reachable indices extends. Saying this sentence out loud is usually what the interviewer is looking for.

---

### 30. 🟠 P1 [Q] LC 134: Gas Station [MEDIUM]
- **LeetCode Link:** [LC 134: Gas Station](https://leetcode.com/problems/gas-station/)
- **Category / Sub-Pattern:** Sub-Pattern 5.3 (Reachability & Circuit Greedy)

**📜 Problem Statement & Explanation**
There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`. You have a car with an unlimited gas tank, and it costs `cost[i]` of gas to travel from the `i`th station to its next `(i + 1)`th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is guaranteed to be unique.

**Example 1:**
- **Input:** `gas = [1,2,3,4,5], cost = [3,4,5,1,2]`
- **Output:** `3`
- **Explanation:** Start at station 3 with 4 gas. Tank after each leg: 4-1+5 = 8, 8-2+1 = 7, 7-3+2 = 6, 6-4+3 = 5, and the last leg costs 5, leaving 0. The circuit is completed.

**Example 2:**
- **Input:** `gas = [2,3,4], cost = [3,4,3]`
- **Output:** `-1`
- **Explanation:** Total gas is 9 but total cost is 10, so no start can finish.

**Constraints:**
- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 5.3 (Reachability & Circuit Greedy)
- **Memory Mnemonic:** *"If you can't get past station i from your start, no station in between can either, so jump the start past i."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Try each station `s` as the start and simulate the full circle, adding `gas[i] - cost[i]` at each station (index taken modulo `n`). If the tank never goes negative for all `n` legs, return `s`.

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        for (int s = 0; s < n; s++) {
            int tank = 0, k = 0;
            for (; k < n; k++) {
                int i = (s + k) % n;
                tank += gas[i] - cost[i];
                if (tank < 0) break;
            }
            if (k == n) return s;
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Two facts make one pass enough.
1. **Feasibility:** a full circle is possible from *some* start if and only if `sum(gas) >= sum(cost)`. Track that `total`.
2. **Skipping:** suppose you start at `start` and the tank first goes negative at station `i`. Every station between `start` and `i` was reached with a tank `>= 0`, so starting at any of them with an empty tank is no better, and they would also fail at `i`. So the next possible start is `i + 1`: reset `start = i + 1` and `tank = 0`.
If `total >= 0`, the last `start` you set is the answer.

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.size(); i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return total < 0 ? -1 : start;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Don't skip the `total` check.** Without it, the one-pass loop can return a start even when the circle is impossible, as in Example 2.
- **The restart is the whole insight.** Be ready to explain *why* the stations between `start` and `i` can be skipped (point 2 above). That proof is what the interviewer is testing.
- **`start` never ends up as `n`** when `total >= 0`: the tank cannot go negative at the last station if the overall sum is non-negative.
- **Single station** `gas = [5], cost = [4]` returns `0`.

---

---

[⬅️ Previous: 04 · Prefix Sum & Difference Arrays](04-prefix-sum-and-difference-arrays.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Two Pointers ➡️](06-two-pointers.md)
