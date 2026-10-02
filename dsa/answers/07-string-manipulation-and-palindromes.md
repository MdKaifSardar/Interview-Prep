[⬅️ Previous: 06 · Two Pointers](06-two-pointers.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Sliding Window ➡️](08-sliding-window.md)

---

## 7. STRING MANIPULATION & PALINDROMES

### 40. 🔴 P0 [Q] LC 125: Valid Palindrome [EASY]
- **LeetCode Link:** [LC 125: Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Palindrome Check & Expand Around Center)

**📜 Problem Statement & Explanation**
A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Example 1:**
- **Input:** `s = "A man, a plan, a canal: Panama"`
- **Output:** `true`
- **Explanation:** After cleanup it becomes `"amanaplanacanalpanama"`, which is a palindrome.

**Example 2:**
- **Input:** `s = "race a car"`
- **Output:** `false`
- **Explanation:** `"raceacar"` is not a palindrome.

**Example 3:**
- **Input:** `s = " "`
- **Output:** `true`
- **Explanation:** After removing non-alphanumeric characters the string is empty, and an empty string reads the same both ways.

**Constraints:**
- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.1 (Palindrome Check & Expand Around Center)
- **Memory Mnemonic:** *"Skip junk on both ends, compare lowercase, move inward."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Build a cleaned string containing only lowercase alphanumeric characters, then check whether it equals its own reverse. Easy to get right, but uses an extra copy of the string.

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        string clean;
        for (char c : s)
            if (isalnum(c)) clean += tolower(c);
        string rev(clean.rbegin(), clean.rend());
        return clean == rev;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Compare from both ends without building a new string.
1. `l` starts at the beginning, `r` at the end.
2. Move `l` right while `s[l]` is not alphanumeric; move `r` left while `s[r]` is not alphanumeric. Keep `l < r` in both loops so they never cross.
3. Compare `tolower(s[l])` with `tolower(s[r])`. A mismatch means it is not a palindrome.
4. Move both pointers inward and repeat.

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++;
            r--;
        }
        return true;
    }
};
```

**🔁 Variant: Valid Palindrome II (LC 680, common follow-up: "you may delete at most one character")**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Run the same two-pointer scan (this problem has only lowercase letters, so no skipping is needed).
1. While `s[l] == s[r]`, move inward.
2. At the first mismatch you must delete either `s[l]` or `s[r]`. Try both: check whether `s[l+1..r]` **or** `s[l..r-1]` is a palindrome.
3. Only one deletion is allowed, so the helper check is a plain palindrome test with no further skipping.

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l] != s[r])
                return isPal(s, l + 1, r) || isPal(s, l, r - 1);
            l++;
            r--;
        }
        return true;
    }
private:
    bool isPal(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) return false;
            l++;
            r--;
        }
        return true;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Digits count.** `"0P"` must return `false`: `isalnum` keeps digits, so `'0'` is compared with `'p'`. Using `isalpha` here is a classic bug.
- **Keep `l < r` inside the skip loops.** Without it, a string like `".,"` lets `l` run past the end.
- **A string of only symbols** (Example 3) is a palindrome, because the empty string is.
- **Valid Palindrome II:** at the mismatch, trying only one of the two deletions is the common mistake. In `"cbbcc"` the mismatch is `b` vs `c`; deleting the left `b` fails, and only deleting the right `c` works.

---

### 41. 🔴 P0 [Q] LC 5: Longest Palindromic Substring [MEDIUM]
- **LeetCode Link:** [LC 5: Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- **Category / Sub-Pattern:** Sub-Pattern 7.1 (Palindrome Check & Expand Around Center)

**📜 Problem Statement & Explanation**
Given a string `s`, return the longest palindromic substring in `s`.

**Example 1:**
- **Input:** `s = "babad"`
- **Output:** `"bab"`
- **Explanation:** `"aba"` is also a valid answer.

**Example 2:**
- **Input:** `s = "cbbd"`
- **Output:** `"bb"`

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of only digits and English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.1 (Palindrome Check & Expand Around Center)
- **Memory Mnemonic:** *"Every palindrome mirrors around a center; try every center, both odd and even."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N^2)
- **Explanation:** Interval DP. (Checking every substring directly would be O(N^3).) `dp[i][j]` is `true` when `s[i..j]` is a palindrome. A substring is a palindrome when its two ends match **and** the inside is a palindrome: `dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1])`. Fill `i` from right to left so `dp[i+1][...]` is ready before it is needed, and record the longest `true` entry.

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.size(), start = 0, maxLen = 1;
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    if (j - i + 1 > maxLen) {
                        maxLen = j - i + 1;
                        start = i;
                    }
                }
            }
        }
        return s.substr(start, maxLen);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(1) auxiliary
- **Explanation:** Expand Around Center. Same time as the DP, but no table.
1. For each index `i`, expand twice: once from `(i, i)` for odd-length palindromes, once from `(i, i + 1)` for even-length ones.
2. The `expand` helper moves `l` left and `r` right while both are in range and `s[l] == s[r]`.
3. When the loop stops, `l` and `r` have each gone one step too far, so the palindrome is `s[l+1 .. r-1]`, with length `r - l - 1`.
4. Keep the longest one found.

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.size(); i++) {
            expand(s, i, i, start, maxLen);
            expand(s, i, i + 1, start, maxLen);
        }
        return s.substr(start, maxLen);
    }
private:
    void expand(const string& s, int l, int r, int& start, int& maxLen) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) {
            l--;
            r++;
        }
        int len = r - l - 1;
        if (len > maxLen) {
            maxLen = len;
            start = l + 1;
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Forgetting even-length centers** is the number one bug: `"cbbd"` would return `"c"` instead of `"bb"`.
- **Length is `r - l - 1`, not `r - l + 1`,** because the loop exits one step past each end. Trace `"aba"` once to convince yourself.
- **Single character** input returns itself; every character is a palindrome of length 1.
- **Related: Palindromic Substrings (LC 647)** uses the exact same expansion, but counts every successful expansion step instead of tracking the longest.
- **Manacher's algorithm** solves this in O(N), but it is almost never expected. Mentioning that it exists is enough.

---

### 42. 🟠 P1 [Q] LC 151: Reverse Words in a String [MEDIUM]
- **LeetCode Link:** [LC 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)
- **Category / Sub-Pattern:** Sub-Pattern 7.2 (Word-Level String Manipulation)

**📜 Problem Statement & Explanation**
Given an input string `s`, reverse the order of the **words**. A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words, with no extra spaces.

**Example 1:**
- **Input:** `s = "the sky is blue"`
- **Output:** `"blue is sky the"`

**Example 2:**
- **Input:** `s = "  hello world  "`
- **Output:** `"world hello"`
- **Explanation:** Leading and trailing spaces are removed.

**Example 3:**
- **Input:** `s = "a good   example"`
- **Output:** `"example good a"`
- **Explanation:** Multiple spaces between words are reduced to a single space.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.
- There is at least one word in `s`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 7.2 (Word-Level String Manipulation)
- **Memory Mnemonic:** *"Flip everything, then flip each word back."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Split the string into words with a `stringstream` (the `>>` operator skips any amount of whitespace automatically), reverse the list of words, and join them with single spaces. This is the expected answer in many interviews; the in-place version is the follow-up.

```cpp
class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string word;
        vector<string> words;
        while (ss >> word) words.push_back(word);
        reverse(words.begin(), words.end());
        string res;
        for (int i = 0; i < words.size(); i++) {
            if (i > 0) res += ' ';
            res += words[i];
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary (in-place on the C++ string)
- **Explanation:**
1. Reverse the entire string. The words are now in the right order but each one is spelled backwards: `"the sky"` becomes `"yks eht"`.
2. Scan with a read pointer `i` and a write pointer `w`. Skip spaces. When a word starts, write one separating space first (unless it is the first word), then copy the word's characters to position `w`.
3. Reverse the just-copied word in place to fix its spelling.
4. Finally, cut the string to length `w` to drop the leftover characters.
`w` never overtakes `i`, because every written character corresponds to a character already read, so copying forward is safe.

```cpp
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int n = s.size(), w = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == ' ') continue;
            if (w != 0) s[w++] = ' ';
            int start = w;
            while (i < n && s[i] != ' ') s[w++] = s[i++];
            reverse(s.begin() + start, s.begin() + w);
        }
        s.resize(w);
        return s;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Spaces are the whole difficulty:** leading, trailing and repeated spaces (Examples 2 and 3). Test all three before saying you are done.
- **"Do it in O(1) extra space"** is the usual follow-up. It is only possible in languages with mutable strings (C++); in Java or Python, say that strings are immutable, so O(N) is the floor.
- **The "reverse all, then reverse parts" trick** also solves Rotate Array (LC 189): reverse everything, then reverse the first `k` and the remaining `n - k` elements.

---

---

[⬅️ Previous: 06 · Two Pointers](06-two-pointers.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Sliding Window ➡️](08-sliding-window.md)
