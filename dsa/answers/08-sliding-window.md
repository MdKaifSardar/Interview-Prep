[⬅️ Previous: 07 · String Manipulation & Palindromes](07-string-manipulation-and-palindromes.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Binary Search ➡️](09-binary-search.md)

---

## 8. SLIDING WINDOW

### 43. 🔴 P0 [Q] LC 3: Longest Substring Without Repeating Characters [MEDIUM]
- **LeetCode Link:** [LC 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given a string `s`, find the length of the longest substring without repeating characters.

**Example 1:**
- **Input:** `s = "abcabcbb"` 
- **Output:** `3` 
- **Explanation:** Longest substring is `"abc"`.

**Constraints:**
- `0 <= s.length <= 5 * 10^4` 
- `s` consists of English letters, digits, symbols and spaces.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right, shrink left when duplicate character found."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(N)
- **Explanation:** Generate all substrings `s[i...j]`. For each substring, check if it contains duplicate characters using a set.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                unordered_set<char> st;
                bool valid = true;
                for (int k = i; k <= j; k++) {
                    if (st.count(s[k])) { valid = false; break; }
                    st.insert(s[k]);
                }
                if (valid) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window with Index Table `lastSeen[256]` initialized to -1. `left = 0`, `maxLen = 0`.
Iterate `right` from 0 to `N - 1`: if character `s[right]` was seen at index `>= left`, jump `left = lastSeen[s[right]] + 1`. Update `lastSeen[s[right]] = right` and `maxLen = max(maxLen, right - left + 1)`.

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(256, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            if (lastSeen[s[right]] >= left) {
                left = lastSeen[s[right]] + 1;
            }
            lastSeen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty string `""` (returns 0).
- All characters identical `"bbbbb"` (returns 1).

---

### 44. 🔴 P0 [Q] LC 209: Minimum Size Subarray Sum [MEDIUM]
- **LeetCode Link:** [LC 209: Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0`.

**Example 1:**
- **Input:** `target = 7, nums = [2,3,1,2,4,3]` 
- **Output:** `2` 
- **Explanation:** Subarray `[4,3]` has minimal length 2.

**Constraints:**
- `1 <= target <= 10^9` 
- `1 <= nums.length <= 10^5` 
- `1 <= nums[i] <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Expand right until sum >= target, shrink left to minimize length."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops computing sum of every subarray starting at `i`. Update minimum length when `sum >= target`.

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size(), minLen = INT_MAX;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum >= target) {
                    minLen = min(minLen, j - i + 1);
                    break;
                }
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Variable Sliding Window: `left = 0`, `sum = 0`, `minLen = INT_MAX`.
Expand `right` pointer adding `nums[right]` to `sum`. While `sum >= target`: update `minLen = min(minLen, right - left + 1)`, subtract `nums[left]` from `sum` and shrink `left++`. Return `minLen == INT_MAX ? 0 : minLen`.

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, minLen = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Total sum of array < target (returns 0).
- Single element >= target.

---

### 45. 🔴 P0 [Q] LC 76: Minimum Window Substring [HARD]
- **LeetCode Link:** [LC 76: Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given two strings `s` and `t` of lengths `m` and `n`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return `""`.

**Example 1:**
- **Input:** `s = "ADOBECODEBANC", t = "ABC"` 
- **Output:** `"BANC"`

**Constraints:**
- `m == s.length`, `n == t.length` 
- `1 <= m, n <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"Gold-standard variable window with required match counter."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^3) | **Space:** O(1) auxiliary
- **Explanation:** Check all $O(N^2)$ substrings of `s`. For each substring, count character frequencies and compare against `t` in $O(N)$.

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        int m = s.length(), n = t.length();
        if (m < n) return "";
        int target[128] = {0};
        for (char c : t) target[c]++;
        
        string minStr = "";
        int minLen = INT_MAX;
        
        for (int i = 0; i < m; i++) {
            for (int j = i; j < m; j++) {
                int curr[128] = {0};
                for (int k = i; k <= j; k++) curr[s[k]]++;
                bool valid = true;
                for (int c = 0; c < 128; c++) {
                    if (curr[c] < target[c]) { valid = false; break; }
                }
                if (valid && (j - i + 1) < minLen) {
                    minLen = j - i + 1;
                    minStr = s.substr(i, minLen);
                }
            }
        }
        return minStr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(|S| + |T|) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window with Character Match Counter:
1. Build `targetCount[128]` for string `t`. Track `required` distinct character count.
2. Expand `right` pointer: increment `windowCount[s[right]]`. If `windowCount[c] == targetCount[c]`, `formed++`.
3. While `formed == required`: record minimum window length, then shrink `left` pointer. If `windowCount[s[left]] < targetCount[s[left]]`, decrement `formed`. `left++`.

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";
        vector<int> targetCount(128, 0);
        for (char c : t) targetCount[c]++;
        
        int required = 0;
        for (int i = 0; i < 128; i++) if (targetCount[i] > 0) required++;
        
        vector<int> windowCount(128, 0);
        int formed = 0;
        int left = 0, minLen = INT_MAX, startIdx = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            windowCount[c]++;
            if (targetCount[c] > 0 && windowCount[c] == targetCount[c]) {
                formed++;
            }
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char leftChar = s[left];
                windowCount[leftChar]--;
                if (targetCount[leftChar] > 0 && windowCount[leftChar] < targetCount[leftChar]) {
                    formed--;
                }
                left++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(startIdx, minLen);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `|S| < |T|` (returns `""`).
- String `s` equals `t`.
- `t` contains duplicate characters.

---

### 46. 🔴 P0 [Q] LC 438: Find All Anagrams in a String [MEDIUM]
- **LeetCode Link:** [LC 438: Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 8.2 (Fixed-Size Sliding Window)

**📜 Problem Statement & Explanation**
Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.

**Example 1:**
- **Input:** `s = "cbaebabacd", p = "abc"` 
- **Output:** `[0,6]` 
- **Explanation:** Substrings starting at index 0 (`"cba"`) and index 6 (`"bac"`) are anagrams.

**Constraints:**
- `1 <= s.length, p.length <= 3 * 10^4` 
- `s` and `p` consist of lowercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.2 (Fixed-Size Sliding Window)
- **Memory Mnemonic:** *"Fixed window of size |P| with 26-char frequency comparison."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((N - K) * K log K) | **Space:** O(K)
- **Explanation:** For every substring of length `k = p.length()`, sort the substring and compare with sorted `p`.

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        int n = s.length(), k = p.length();
        if (n < k) return res;
        string sortedP = p;
        sort(sortedP.begin(), sortedP.end());
        for (int i = 0; i <= n - k; i++) {
            string sub = s.substr(i, k);
            sort(sub.begin(), sub.end());
            if (sub == sortedP) res.push_back(i);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Fixed-Size Sliding Window of size `k = p.length()`:
Maintain two frequency vectors `pCount[26]` and `sCount[26]`. Populate `pCount` and initial window in `sCount`. Slide window from index `i = k` to `N - 1`: add `s[i]` frequency, remove `s[i - k]` frequency. If `pCount == sCount`, record start index `i - k + 1`.

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.length(), k = p.length();
        if (n < k) return {};
        vector<int> pCount(26, 0), sCount(26, 0), res;
        for (int i = 0; i < k; i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }
        if (pCount == sCount) res.push_back(0);
        for (int i = k; i < n; i++) {
            sCount[s[i] - 'a']++;
            sCount[s[i - k] - 'a']--;
            if (pCount == sCount) res.push_back(i - k + 1);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `|S| < |P|` (returns empty array).
- `s` and `p` have identical lengths.

---

### 47. 🔴 P0 [Q] LC 1004: Max Consecutive Ones III [MEDIUM]
- **LeetCode Link:** [LC 1004: Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Category / Sub-Pattern:** Sub-Pattern 8.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Example 1:**
- **Input:** `nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2` 
- **Output:** `6`

**Constraints:**
- `1 <= nums.length <= 10^5` 
- `nums[i]` is either `0` or `1` 
- `0 <= k <= nums.length`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track zero count in window; shrink left when zero count > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1)
- **Explanation:** Nested loops checking every subarray starting at index i. Count zeros until zero count exceeds k.

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int n = nums.size(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            int zeros = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 0) zeros++;
                if (zeros <= k) maxLen = max(maxLen, j - i + 1);
                else break;
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window tracking zero count: `left = 0`, `zeroCount = 0`, `maxLen = 0`.
Iterate `right` from 0 to `N - 1`: if `nums[right] == 0`, `zeroCount++`. While `zeroCount > k`: if `nums[left] == 0` decrement `zeroCount`, then `left++`. Update `maxLen = max(maxLen, right - left + 1)`.

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;
        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) zeroCount++;
            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 0` (standard longest consecutive ones).
- Array with all zeros.

---

### 48. 🔴 P0 [Q] LC 424: Longest Repeating Character Replacement [MEDIUM]
- **LeetCode Link:** [LC 424: Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- **Category / Sub-Pattern:** Sub-Pattern 8.3 (Variable Window with K Operations / Replacement)

**📜 Problem Statement & Explanation**
You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Return the length of the longest substring containing the same letter.

**Example 1:**
- **Input:** `s = "ABAB", k = 2` 
- **Output:** `4` 
- **Explanation:** Replace 2 'A's with 'B's or vice versa.

**Constraints:**
- `1 <= s.length <= 10^5` 
- `s` consists of uppercase English letters. 
- `0 <= k <= s.length`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.3 (Variable Window with K Operations / Replacement)
- **Memory Mnemonic:** *"Track max_freq in window; shrink left when (window_len - max_freq) > K."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Check all substrings `s[i...j]`. Find max character frequency `maxFreq`. Replacements required = `(windowLen - maxFreq)`. If `<= k`, update max length.

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        int n = s.length(), maxLen = 0;
        for (int i = 0; i < n; i++) {
            int count[26] = {0}, maxFreq = 0;
            for (int j = i; j < n; j++) {
                count[s[j] - 'A']++;
                maxFreq = max(maxFreq, count[s[j] - 'A']);
                int changesNeeded = (j - i + 1) - maxFreq;
                if (changesNeeded <= k) maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Sliding Window: `left = 0`, `maxFreq = 0`, `maxLen = 0`. Character count vector `count[26]`.
Expand `right`: `count[s[right] - 'A']++`, update `maxFreq = max(maxFreq, count[s[right] - 'A'])`.
If `(right - left + 1 - maxFreq) > k`: decrement `count[s[left] - 'A']` and shrink `left++`. Update `maxLen`.

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int left = 0, maxFreq = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            count[s[right] - 'A']++;
            maxFreq = max(maxFreq, count[s[right] - 'A']);
            while ((right - left + 1) - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 0`.
- String with all identical characters.

---

### 49. 🔴 P0 [Q] LC 239: Sliding Window Maximum [HARD]
- **LeetCode Link:** [LC 239: Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
- **Category / Sub-Pattern:** Sub-Pattern 8.4 (Monotonic Deque Window)

**📜 Problem Statement & Explanation**
You are given an array of integers `nums`, and there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window, i.e. the maximum of each window.

**Example 1:**
- **Input:** `nums = [1,3,-1,-3,5,3,6,7], k = 3`
- **Output:** `[3,3,5,5,6,7]`
- **Explanation:** Windows `[1,3,-1]`, `[3,-1,-3]`, `[-1,-3,5]`, `[-3,5,3]`, `[5,3,6]`, `[3,6,7]` have maxima `3,3,5,5,6,7`.

**Example 2:**
- **Input:** `nums = [1], k = 1`
- **Output:** `[1]`

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.4 (Monotonic Deque Window)
- **Memory Mnemonic:** *"A smaller element sitting behind a bigger, newer one can never be the max again, so evict it."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N * K) | **Space:** O(1) auxiliary (excluding output)
- **Explanation:** For each of the `N - K + 1` windows, scan all `K` elements to find the maximum. Times out when both `N` and `K` are large (e.g. `N = 10^5`, `K = 5 * 10^4`).

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        for (int i = 0; i + k <= nums.size(); i++) {
            int mx = nums[i];
            for (int j = i; j < i + k; j++) mx = max(mx, nums[j]);
            res.push_back(mx);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) amortized | **Space:** O(K)
- **Explanation:** Keep a `deque<int>` of indices whose values are strictly decreasing from front to back. For each index `i`:
1. **Expire:** if the front index is `<= i - k`, it has slid out of the window, so pop it from the front.
2. **Evict:** while the value at the back is `<= nums[i]`, pop it. Those elements are older *and* not bigger than `nums[i]`, so they can never be a window maximum again.
3. **Add:** push `i` at the back.
4. **Record:** once the first full window is formed (`i >= k - 1`), the front holds the index of the maximum.
Each index is pushed once and popped at most once, so the total work is O(N).

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Store indices, not values.** With values alone you cannot tell when the front has left the window.
- **Output starts at `i = k - 1`,** not at `i = 0`. Getting this wrong gives a result with `k - 1` extra entries.
- **Fallback if you blank on the deque:** a max-heap of `{value, index}` pairs, popping the top while its index is outside the window. That is O(N log N) and usually still accepted, but say the deque solution is the optimal one.
- **The window minimum** uses the same code with the comparison flipped (`>=` instead of `<=`). Longest Subarray with Absolute Diff <= Limit (LC 1438) uses one deque of each kind.

---


### 50. 🟢 P2 [BONUS] LC 992: Subarrays with K Different Integers [HARD]
- **LeetCode Link:** [LC 992: Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/)
- **Category / Sub-Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)

**📜 Problem Statement & Explanation**
Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`. A good array is an array where the number of different integers in that array is exactly `k`.

**Example 1:**
- **Input:** `nums = [1,2,1,2,3], k = 2`
- **Output:** `7`
- **Explanation:** Subarrays formed with exactly 2 different integers: `[1,2]`, `[2,1]`, `[1,2]`, `[2,3]`, `[1,2,1]`, `[2,1,2]`, `[1,2,1,2]`.

**Example 2:**
- **Input:** `nums = [1,2,1,3,4], k = 3`
- **Output:** `3`

**Constraints:**
- $1 \le nums.length \le 2 \times 10^4$
- $1 \le nums[i], k \le nums.length$

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 8.1 (Variable Length Sliding Window)
- **Memory Mnemonic:** *"exact(k) = atMost(k) - atMost(k - 1). Window of size (r - l + 1) contributes all subarrays ending at r."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^2)$ | **Space:** $O(K)$
- **Explanation:** Generate all possible subarrays using two nested loops. Maintain an `unordered_set<int>` for each starting point. When `set.size() == k`, increment the answer count. Break early if `set.size() > k`.

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size(), count = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> unique;
            for (int j = i; j < n; j++) {
                unique.insert(nums[j]);
                if (unique.size() == k) count++;
                else if (unique.size() > k) break;
            }
        }
        return count;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$ frequency array / map
- **Explanation:** Finding subarrays with *exactly* $k$ unique elements directly with sliding window is tricky because shrinking the window doesn't monotonically decrease the number of valid subarrays.
  Instead, notice that:
  $$\text{exact}(k) = \text{atMost}(k) - \text{atMost}(k - 1)$$
  In `atMost(k)`, we maintain a window `[left, right]` with at most $k$ distinct elements. Every time we expand `right`, the number of new valid subarrays ending at `right` is `(right - left + 1)`.

```cpp
class Solution {
private:
    int atMost(vector<int>& nums, int k) {
        if (k <= 0) return 0;
        int n = nums.size(), left = 0, count = 0;
        unordered_map<int, int> freq;

        for (int right = 0; right < n; right++) {
            if (freq[nums[right]]++ == 0) {
                k--;
            }
            while (k < 0) {
                if (--freq[nums[left]] == 0) {
                    k++;
                }
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- $k = 1$: `atMost(0)` must correctly return `0`.
- Array where all elements are identical.

---

---

[⬅️ Previous: 07 · String Manipulation & Palindromes](07-string-manipulation-and-palindromes.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Binary Search ➡️](09-binary-search.md)
