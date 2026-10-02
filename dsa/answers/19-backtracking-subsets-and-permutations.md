[⬅️ Previous: 18 · Trie (Prefix Tree)](18-trie-prefix-tree.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 20 · Graph Dfs / Bfs ➡️](20-graph-dfs-bfs.md)

---

## 19. BACKTRACKING / SUBSETS & PERMUTATIONS

### 105. 🔴 P0 [Q] LC 78: Subsets [MEDIUM]
- **LeetCode Link:** [LC 78: Subsets](https://leetcode.com/problems/subsets/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Subsets & Combinations)

**📜 Problem Statement & Explanation**
Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

**Example 1:**
- **Input:** `nums = [1,2,3]` 
- **Output:** `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

**Constraints:**
- `1 <= nums.length <= 10` 
- `-10 <= nums[i] <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (Subsets & Combinations)
- **Memory Mnemonic:** *"Backtracking recursion: include/exclude or loop start index."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^N * N) | **Space:** O(2^N * N)
- **Explanation:** Iterative Bitmasking: loop `i` from 0 to `(1 << n) - 1`. For each bit position `j`, if `i & (1 << j)` is set, include `nums[j]`.

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        int total = 1 << n;
        vector<vector<int>> res;
        for (int i = 0; i < total; i++) {
            vector<int> sub;
            for (int j = 0; j < n; j++) {
                if (i & (1 << j)) sub.push_back(nums[j]);
            }
            res.push_back(sub);
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(2^N * N) | **Space:** O(N) stack space
- **Explanation:** Backtracking DFS:
`backtrack(start, curr)`.
At each recursive step, push `curr` to result.
Loop `i` from `start` to `n - 1`:
- `curr.push_back(nums[i])`
- Recurse `backtrack(i + 1, curr)`
- Backtrack `curr.pop_back()`.

```cpp
class Solution {
private:
    void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {
        res.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            backtrack(i + 1, nums, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(0, nums, curr, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array `[0]`.
- Empty array.

---

### 106. 🔴 P0 [Q] LC 39: Combination Sum [MEDIUM]
- **LeetCode Link:** [LC 39: Combination Sum](https://leetcode.com/problems/combination-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 19.1 (Subsets & Combinations)

**📜 Problem Statement & Explanation**
Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may use the same number an unlimited number of times.

**Example 1:**
- **Input:** `candidates = [2,3,6,7], target = 7` 
- **Output:** `[[2,2,3],[7]]`

**Constraints:**
- `1 <= candidates.length <= 30` 
- `2 <= candidates[i] <= 40` 
- `1 <= target <= 40`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.1 (Subsets & Combinations)
- **Memory Mnemonic:** *"Backtracking with element index reuse (i instead of i + 1)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^target) | **Space:** O(target)
- **Explanation:** Generate combinations recursively. Store candidates in set to filter duplicates.

```cpp
class Solution {
private:
    void backtrack(int idx, int sum, int target, vector<int>& candidates, vector<int>& curr, set<vector<int>>& res) {
        if (sum == target) {
            res.insert(curr);
            return;
        }
        if (sum > target || idx >= candidates.size()) return;
        curr.push_back(candidates[idx]);
        backtrack(idx, sum + candidates[idx], target, candidates, curr, res);
        curr.pop_back();
        backtrack(idx + 1, sum, target, candidates, curr, res);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        set<vector<int>> res;
        vector<int> curr;
        backtrack(0, 0, target, candidates, curr, res);
        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(2^target) | **Space:** O(target) stack space
- **Explanation:** Backtracking with Element Reuse:
`backtrack(start, remain, curr)`.
If `remain == 0`, add `curr` to result.
Loop `i` from `start` to `n - 1`: if `candidates[i] <= remain`, `curr.push_back(candidates[i])`, recurse `backtrack(i, remain - candidates[i], curr)` (reusing index `i`), `curr.pop_back()`.

```cpp
class Solution {
private:
    void backtrack(int start, int remain, vector<int>& candidates, vector<int>& curr, vector<vector<int>>& res) {
        if (remain == 0) {
            res.push_back(curr);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] <= remain) {
                curr.push_back(candidates[i]);
                backtrack(i, remain - candidates[i], curr, res);
                curr.pop_back();
            }
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> curr;
        backtrack(0, target, candidates, curr, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Target cannot be formed.
- Single element candidate.

---

### 107. 🔴 P0 [Q] LC 46: Permutations [MEDIUM]
- **LeetCode Link:** [LC 46: Permutations](https://leetcode.com/problems/permutations/)
- **Category / Sub-Pattern:** Sub-Pattern 19.2 (Permutations)

**📜 Problem Statement & Explanation**
Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Example 1:**
- **Input:** `nums = [1,2,3]` 
- **Output:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

**Constraints:**
- `1 <= nums.length <= 6` 
- `-10 <= nums[i] <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.2 (Permutations)
- **Memory Mnemonic:** *"In-place swapping backtracking."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N! * N)
- **Explanation:** Call `std::next_permutation` in a loop after sorting `nums`.

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        do {
            res.push_back(nums);
        } while (next_permutation(nums.begin(), nums.end()));
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N! * N) | **Space:** O(N) stack space
- **Explanation:** In-Place Swapping Backtracking:
`backtrack(start)`.
If `start == nums.size()`, append `nums` to result.
Loop `i` from `start` to `n - 1`:
- `swap(nums[start], nums[i])`
- Recurse `backtrack(start + 1)`
- Backtrack `swap(nums[start], nums[i])`.

```cpp
class Solution {
private:
    void backtrack(int start, vector<int>& nums, vector<vector<int>>& res) {
        if (start == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1, nums, res);
            swap(nums[start], nums[i]);
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(0, nums, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single element array `[1]`.

---

### 108. 🟢 P2 [Q] LC 51: N-Queens [HARD]
- **LeetCode Link:** [LC 51: N-Queens](https://leetcode.com/problems/n-queens/)
- **Category / Sub-Pattern:** Sub-Pattern 19.3 (Grid & Constraint Backtracking)

**📜 Problem Statement & Explanation**
The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct solutions to the n-queens puzzle.

**Example 1:**
- **Input:** `n = 4` 
- **Output:** `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`

**Constraints:**
- `1 <= n <= 9`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.3 (Grid & Constraint Backtracking)
- **Memory Mnemonic:** *"Column & Diagonal Hash Sets for O(1) safety checks."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^N) | **Space:** O(N^2)
- **Explanation:** Place queens in all possible cell configurations, checking validity for each configuration using full grid scans.

```cpp
class Solution {
private:
    bool isSafe(int r, int c, vector<string>& board, int n) {
        for (int i = 0; i < r; i++) if (board[i][c] == 'Q') return false;
        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
    void solve(int r, int n, vector<string>& board, vector<vector<string>>& res) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (isSafe(r, c, board, n)) {
                board[r][c] = 'Q';
                solve(r + 1, n, board, res);
                board[r][c] = '.';
            }
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        solve(0, n, board, res);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N!) | **Space:** O(N) auxiliary
- **Explanation:** Backtracking with $O(1)$ Hash Set Checks:
Track occupied columns (`cols`), main diagonals (`diag1`: `r - c`), and anti-diagonals (`diag2`: `r + c`).
Recurse row `r` from 0 to `N - 1`. For column `c`: if `c`, `r - c`, or `r + c` are in set, skip. Place queen, insert into sets, recurse `r + 1`, backtrack.

```cpp
class Solution {
private:
    void solve(int r, int n, vector<string>& board, unordered_set<int>& cols,
               unordered_set<int>& diag1, unordered_set<int>& diag2, vector<vector<string>>& res) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            
            board[r][c] = 'Q';
            cols.insert(c);
            diag1.insert(r - c);
            diag2.insert(r + c);
            
            solve(r + 1, n, board, cols, diag1, diag2, res);
            
            board[r][c] = '.';
            cols.erase(c);
            diag1.erase(r - c);
            diag2.erase(r + c);
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols, diag1, diag2;
        solve(0, n, board, cols, diag1, diag2, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `n = 1` (returns `[["Q"]]`).
- `n = 2` or `n = 3` (no solution, returns `[]`).

---


### 109. 🟢 P2 [BONUS] LC 79: Word Search [MEDIUM]
- **LeetCode Link:** [LC 79: Word Search](https://leetcode.com/problems/word-search/)
- **Category / Sub-Pattern:** Sub-Pattern 19.3 (Grid & Constraint Backtracking)

**📜 Problem Statement & Explanation**
Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
- **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`
- **Output:** `true`

**Example 2:**
- **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`
- **Output:** `true`

**Constraints:**
- `m == board.length`, `n = board[i].length`
- $1 \le m, n \le 6$
- $1 \le word.length \le 15$
- `board` and `word` consist of only lowercase and uppercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 19.3 (Grid & Constraint Backtracking)
- **Memory Mnemonic:** *"Mask cell board[r][c] = '#' -> explore 4 directions -> unmask board[r][c] = temp (backtrack)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(M \times N \times 4^L)$ | **Space:** $O(M \times N + L)$
- **Explanation:** Maintain a 2D boolean array `visited[m][n]` and launch DFS from every cell matching `word[0]`.

```cpp
class Solution {
    bool dfs(vector<vector<char>>& board, string& word, int r, int c, int idx, vector<vector<bool>>& visited) {
        if (idx == word.size()) return true;
        int m = board.size(), n = board[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || board[r][c] != word[idx]) return false;

        visited[r][c] = true;
        bool found = dfs(board, word, r + 1, c, idx + 1, visited) ||
                     dfs(board, word, r - 1, c, idx + 1, visited) ||
                     dfs(board, word, r, c + 1, idx + 1, visited) ||
                     dfs(board, word, r, c - 1, idx + 1, visited);
        visited[r][c] = false;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(board, word, r, c, 0, visited)) return true;
            }
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(M \times N \times 3^L)$ | **Space:** $O(L)$ call stack (In-place grid masking)
- **Explanation:**
  1. Optimize space: Eliminate `visited` array by masking `board[r][c] = '#'` in-place, then restoring `board[r][c] = temp` during backtracking.
  2. Pruning heuristic: If the frequency of `word[0]` is greater than `word.back()`, reverse `word` to start searching from the rarer character.

```cpp
class Solution {
private:
    bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int idx) {
        if (idx == word.size()) return true;
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[idx]) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#'; // In-place visit mask

        bool found = dfs(board, word, r + 1, c, idx + 1) ||
                     dfs(board, word, r - 1, c, idx + 1) ||
                     dfs(board, word, r, c + 1, idx + 1) ||
                     dfs(board, word, r, c - 1, idx + 1);

        board[r][c] = temp; // Backtrack
        return found;
    }

public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        // Character count check optimization
        unordered_map<char, int> boardFreq, wordFreq;
        for (auto& row : board) for (char c : row) boardFreq[c]++;
        for (char c : word) wordFreq[c]++;
        for (auto& [ch, count] : wordFreq) {
            if (boardFreq[ch] < count) return false;
        }

        // Reverse search if end character is rarer
        if (boardFreq[word[0]] > boardFreq[word.back()]) {
            reverse(word.begin(), word.end());
        }

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word[0] && dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Failing to restore `board[r][c] = temp` breaks subsequent search paths.
- Single-letter word `word = "A"` on a $1 \times 1$ board.

---

---

[⬅️ Previous: 18 · Trie (Prefix Tree)](18-trie-prefix-tree.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 20 · Graph Dfs / Bfs ➡️](20-graph-dfs-bfs.md)
