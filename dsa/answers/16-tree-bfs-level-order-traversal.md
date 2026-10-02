[⬅️ Previous: 15 · Tree Dfs / Depth First Search](15-tree-dfs-depth-first-search.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 17 · Binary Search Tree (Bst) ➡️](17-binary-search-tree-bst.md)

---

## 16. TREE BFS / LEVEL ORDER TRAVERSAL

### 95. 🔴 P0 [Q] LC 102: Binary Tree Level Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 102: Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `[[3],[9,20],[15,7]]`

**Constraints:**
- Number of nodes is in range `[0, 2000]` 
- `-1000 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Queue-based level size iteration."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(N)
- **Explanation:** Recursive DFS passing current level `depth`. Resize result vector dynamically and append node value to `res[depth]`.

```cpp
class Solution {
private:
    void dfs(TreeNode* node, int depth, vector<vector<int>>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back({});
        res[depth].push_back(node->val);
        dfs(node->left, depth + 1, res);
        dfs(node->right, depth + 1, res);
    }
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Queue-Based Level Order BFS:
1. `queue<TreeNode*> q`. Push `root`.
2. While queue not empty: get level size `sz = q.size()`. Loop `sz` times: pop node, add value to `level` vector, push non-null `left` and `right` children.
3. Append `level` vector to result.

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                level.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree (`root == nullptr`).
- Single node tree.

---

### 96. 🔴 P0 [Q] LC 199: Binary Tree Right Side View [MEDIUM]
- **LeetCode Link:** [LC 199: Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

**Example 1:**
- **Input:** `root = [1,2,3,null,5,null,4]` 
- **Output:** `[1,3,4]`

**Constraints:**
- Number of nodes is in range `[0, 100]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Reverse Pre-Order DFS (Root -> Right -> Left) or BFS level last element."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Full BFS Level Order Traversal storing all level vectors, then picking last element of each level vector.

```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                if (i == sz - 1) res.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Reverse Pre-Order DFS (Root $\to$ Right $\to$ Left):
Pass current `depth`. If `depth == res.size()`, append `root->val` (first node encountered at this level when exploring right subtree first!). Recurse right then left.

```cpp
class Solution {
private:
    void dfs(TreeNode* node, int depth, vector<int>& res) {
        if (!node) return;
        if (depth == res.size()) {
            res.push_back(node->val);
        }
        dfs(node->right, depth + 1, res);
        dfs(node->left, depth + 1, res);
    }
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Left-skewed tree (right view shows left children when no right children exist).
- Empty tree.

---

### 97. 🔴 P0 [Q] LC 103: Binary Tree Zigzag Level Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 103: Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate).

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `[[3],[20,9],[15,7]]`

**Constraints:**
- Number of nodes is in range `[0, 2000]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"Toggle direction flag and write to pre-allocated level index."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Standard Level Order BFS, then reverse level vectors at odd depths using `std::reverse`.

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                level.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            if (!leftToRight) reverse(level.begin(), level.end());
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Direct Level Array Insertion BFS:
Maintain boolean `leftToRight = true`. For level of size `sz`: allocate `vector<int> level(sz)`. For node index `i`: `idx = leftToRight ? i : (sz - 1 - i)`. Set `level[idx] = node->val`. Toggle `leftToRight = !leftToRight` after each level.

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level(sz);
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front();
                q.pop();
                int idx = leftToRight ? i : (sz - 1 - i);
                level[idx] = curr->val;
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node tree.
- Empty tree.

---


### 98. 🟢 P2 [BONUS] LC 314: Binary Tree Vertical Order Traversal [MEDIUM]
- **LeetCode Link:** [LC 314: Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the vertical order traversal of its nodes' values (i.e., from top to bottom, column by column).
If two nodes are in the same row and column, the order should be from **left to right**.

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]`
- **Output:** `[[9],[3,15],[20],[7]]`

**Example 2:**
- **Input:** `root = [3,9,8,4,0,1,7]`
- **Output:** `[[4],[9],[3,0,1],[8],[7]]`

**Constraints:**
- The number of nodes in the tree is in the range $[0, 100]$.
- $-100 \le Node.val \le 100$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 16.1 (Standard Level Order Traversal)
- **Memory Mnemonic:** *"BFS with pair<Node*, col>. col-1 for left, col+1 for right. Hash map collects values, BFS preserves top-to-bottom automatically."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(N)$
- **Explanation:** Run DFS recording `{col, row, val}` for each node. Sort the list by `col` ascending, then `row` ascending. Group into columns.

```cpp
class Solution {
    vector<tuple<int, int, int>> nodes; // {col, row, val}
    void dfs(TreeNode* root, int r, int c) {
        if (!root) return;
        nodes.push_back({c, r, root->val});
        dfs(root->left, r + 1, c - 1);
        dfs(root->right, r + 1, c + 1);
    }
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        dfs(root, 0, 0);
        // Sort by col, then by row
        stable_sort(nodes.begin(), nodes.end(), [](const auto& a, const auto& b) {
            if (get<0>(a) != get<0>(b)) return get<0>(a) < get<0>(b);
            return get<1>(a) < get<1>(b);
        });
        vector<vector<int>> res;
        map<int, vector<int>> mp;
        for (auto& [c, r, v] : nodes) mp[c].push_back(v);
        for (auto& [c, vList] : mp) res.push_back(vList);
        return res;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$
- **Explanation:** Use BFS with a queue of pairs `queue<pair<TreeNode*, int>>` where `int` is column offset.
  - Root starts at column `0`.
  - Left child is at `col - 1`, right child at `col + 1`.
  - Maintain `unordered_map<int, vector<int>> colMap` and track `minCol` and `maxCol`.
  - Because BFS visits level by level, nodes naturally appear in top-to-bottom and left-to-right order without any sorting!

```cpp
class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        unordered_map<int, vector<int>> colMap;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        int minCol = 0, maxCol = 0;

        while (!q.empty()) {
            auto [node, col] = q.front();
            q.pop();

            colMap[col].push_back(node->val);
            minCol = min(minCol, col);
            maxCol = max(maxCol, col);

            if (node->left) q.push({node->left, col - 1});
            if (node->right) q.push({node->right, col + 1});
        }

        for (int c = minCol; c <= maxCol; c++) {
            if (colMap.count(c)) {
                res.push_back(colMap[c]);
            }
        }
        return res;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree returns `[]`.
- Contrast with LC 987: LC 987 requires sorting node values if they share both row and column; LC 314 strictly preserves left-to-right arrival order.

---

---

[⬅️ Previous: 15 · Tree Dfs / Depth First Search](15-tree-dfs-depth-first-search.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 17 · Binary Search Tree (Bst) ➡️](17-binary-search-tree-bst.md)
