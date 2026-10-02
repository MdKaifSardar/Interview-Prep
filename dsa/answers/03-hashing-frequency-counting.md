[⬅️ Previous: 02 · Complete Sorting Algorithms Suite](02-complete-sorting-algorithms-suite.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Prefix Sum & Difference Arrays ➡️](04-prefix-sum-and-difference-arrays.md)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"O(1) set presence check."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every pair `(i, j)` with `i != j` to test equality `nums[i] == nums[j]`.

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Use an `unordered_set<int>`. For each `x` in `nums`, check if `seen.count(x)` exists; if so return `true`. Else insert `x`. Average time complexity O(N).

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x)) return true;
            seen.insert(x);
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All unique elements.
- Single element array.
- Large negative and positive values.

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.1 (Frequency Counting & Anagrams)
- **Memory Mnemonic:** *"26-char frequency vector encoding as map key."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2 * K) | **Space:** O(N * K)
- **Explanation:** Compare each string against all previously formed groups by counting character frequencies.

```cpp
class Solution {
private:
    bool isAnagram(const string& a, const string& b) {
        if (a.length() != b.length()) return false;
        int count[26] = {0};
        for (char c : a) count[c - 'a']++;
        for (char c : b) count[c - 'a']--;
        for (int x : count) if (x != 0) return false;
        return true;
    }
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> res;
        for (const string& s : strs) {
            bool added = false;
            for (auto& group : res) {
                if (isAnagram(group[0], s)) {
                    group.push_back(s);
                    added = true;
                    break;
                }
            }
            if (!added) res.push_back({s});
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * K) | **Space:** O(N * K)
- **Explanation:** Encode each string using a 26-character frequency count string as the key in an `unordered_map<string, vector<string>> mp`. Append original string to `mp[key]`. Collect map values.

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (const string& s : strs) {
            vector<int> count(26, 0);
            for (char c : s) count[c - 'a']++;
            string key = "";
            for (int i = 0; i < 26; i++) {
                key += "#" + to_string(count[i]);
            }
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& pair : mp) {
            res.push_back(pair.second);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty string input `[""]`.
- Single character strings.

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"Complement lookup (target - nums[i]) in unordered_map."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every pair `(i, j)` with `i < j` to see if `nums[i] + nums[j] == target`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) return {i, j};
            }
        }
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Single pass Hash Map lookup. Maintain `unordered_map<int, int> numToIdx`. For `nums[i]`, compute `complement = target - nums[i]`. If `numToIdx.count(complement)`, return `{numToIdx[complement], i}`. Else store `numToIdx[nums[i]] = i`.

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Negative numbers and zero.
- Duplicate values sum to target e.g., `[3,3], target = 6`.

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"O(1) set lookup for sequence start boundary (!set.count(num - 1))."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N log N) | **Space:** O(1)
- **Explanation:** Sort array `nums` in O(N log N) time, remove duplicates, and iterate to find longest continuous incrementing sequence.

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        sort(nums.begin(), nums.end());
        int maxLen = 1, currLen = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                currLen++;
            } else {
                maxLen = max(maxLen, currLen);
                currLen = 1;
            }
        }
        return max(maxLen, currLen);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Insert all elements into `unordered_set<int> numSet`. Iterate through set: check if `x` is sequence start (`!numSet.count(x - 1)`). If start, loop `curr = x` while `numSet.count(curr + 1)`, incrementing sequence length. Overall time O(N) since each element is visited at most twice.

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int maxLen = 0;
        
        for (int x : st) {
            if (!st.count(x - 1)) {
                int curr = x;
                int currLen = 1;
                while (st.count(curr + 1)) {
                    curr++;
                    currLen++;
                }
                maxLen = max(maxLen, currLen);
            }
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty array `nums = []` (returns 0).
- Array with negative numbers.

---


### 19. 🟢 P2 [BONUS] LC 380: Insert Delete GetRandom O(1) [MEDIUM]
- **LeetCode Link:** [LC 380: Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)
- **Category / Sub-Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)

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
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 3.2 (O(1) Pair & Complement Lookup)
- **Memory Mnemonic:** *"Vector for random index + Hash map for value-to-index. Swap with last element on remove."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** `insert`: $O(1)$, `remove`: $O(N)$, `getRandom`: $O(1)$ | **Space:** $O(N)$
- **Explanation:** Store values in a `vector<int>`. `insert` checks for existence using linear scan ($O(N)$) or uses `unordered_set`. On `remove`, locating and erasing an element shifts elements, causing $O(N)$ time.

```cpp
class RandomizedSetBrute {
    vector<int> nums;
public:
    bool insert(int val) {
        if (find(nums.begin(), nums.end(), val) != nums.end()) return false;
        nums.push_back(val);
        return true;
    }
    bool remove(int val) {
        auto it = find(nums.begin(), nums.end(), val);
        if (it == nums.end()) return false;
        nums.erase(it); // O(N) shift
        return true;
    }
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(1)$ average for all three methods | **Space:** $O(N)$
- **Explanation:** Maintain a `vector<int> nums` and `unordered_map<int, int> valToIdx`.
  - `insert(val)`: Check map. If absent, append `val` to `nums`, store `valToIdx[val] = nums.size() - 1`.
  - `remove(val)`: Check map. Swap `val` with `nums.back()`, update the index of `nums.back()` in the map, call `nums.pop_back()`, and erase `val` from the map.
  - `getRandom()`: Pick `rand() % nums.size()` directly from `nums` in $O(1)$.

```cpp
class RandomizedSet {
private:
    vector<int> nums;
    unordered_map<int, int> valToIdx;
public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if (valToIdx.count(val)) return false;
        nums.push_back(val);
        valToIdx[val] = nums.size() - 1;
        return true;
    }
    
    bool remove(int val) {
        if (!valToIdx.count(val)) return false;
        int idx = valToIdx[val];
        int lastVal = nums.back();

        nums[idx] = lastVal;
        valToIdx[lastVal] = idx;

        nums.pop_back();
        valToIdx.erase(val);
        return true;
    }
    
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Removing the element that is already the last element in `nums`: Updating `valToIdx[lastVal]` before or simultaneously with erasing `valToIdx.erase(val)` avoids incorrect map resurrection.

---

---

[⬅️ Previous: 02 · Complete Sorting Algorithms Suite](02-complete-sorting-algorithms-suite.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Prefix Sum & Difference Arrays ➡️](04-prefix-sum-and-difference-arrays.md)
