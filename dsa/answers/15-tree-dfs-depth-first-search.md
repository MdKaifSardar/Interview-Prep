[⬅️ Previous: 14 · Heap / Priority Queue](14-heap-priority-queue.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 16 · Tree Bfs / Level Order Traversal ➡️](16-tree-bfs-level-order-traversal.md)

---

## 15. TREE DFS / DEPTH FIRST SEARCH

### 87. 🟠 P1 [Q] LC 104: Maximum Depth of Binary Tree [EASY]
- **LeetCode Link:** [LC 104: Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return its maximum depth.

**Example 1:**
- **Input:** `root = [3,9,20,null,null,15,7]` 
- **Output:** `3`

**Constraints:**
- Number of nodes in tree is in range `[0, 10^4]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Max depth = 1 + max(leftDepth, rightDepth)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Level Order BFS Traversal counting levels using queue. Iterate through all levels until queue is empty.

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 0;
        while (!q.empty()) {
            int sz = q.size();
            depth++;
            while (sz--) {
                TreeNode* curr = q.front();
                q.pop();
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
        }
        return depth;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Recursive Post-Order DFS:
Base case: if `root == nullptr`, return 0.
Recursively compute `leftDepth = maxDepth(root->left)` and `rightDepth = maxDepth(root->right)`.
Return `1 + max(leftDepth, rightDepth)`.

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree (`root == nullptr`).
- Skewed tree (depth = N, $O(N)$ stack space).

---

### 88. 🟠 P1 [Q] LC 543: Diameter of Binary Tree [EASY]
- **LeetCode Link:** [LC 543: Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.

**Example 1:**
- **Input:** `root = [1,2,3,4,5]` 
- **Output:** `3` 
- **Explanation:** 3 is length of path `[4,2,1,3]` or `[5,2,1,3]`.

**Constraints:**
- Number of nodes in tree is in range `[1, 10^4]` 
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Single-pass post-order DFS: diameter = left_height + right_height."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, compute height of left subtree and right subtree using a separate recursive `height()` function. Sum `leftH + rightH` and track maximum diameter across all nodes.

```cpp
class Solution {
private:
    int height(TreeNode* node) {
        if (!node) return 0;
        return 1 + max(height(node->left), height(node->right));
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int dRoot = height(root->left) + height(root->right);
        int dLeft = diameterOfBinaryTree(root->left);
        int dRight = diameterOfBinaryTree(root->right);
        return max({dRoot, dLeft, dRight});
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Single-Pass Post-Order DFS:
Helper `height(node, maxDiam)` computes height while updating `maxDiam = max(maxDiam, leftH + rightH)` at each node. Returns `1 + max(leftH, rightH)` to parent. Every node visited exactly once in $O(N)$.

```cpp
class Solution {
private:
    int getHeight(TreeNode* node, int& maxDiam) {
        if (!node) return 0;
        int leftH = getHeight(node->left, maxDiam);
        int rightH = getHeight(node->right, maxDiam);
        maxDiam = max(maxDiam, leftH + rightH);
        return 1 + max(leftH, rightH);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDiam = 0;
        getHeight(root, maxDiam);
        return maxDiam;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node tree (diameter = 0).
- Skewed line tree.

---

### 89. 🟠 P1 [Q] LC 124: Binary Tree Maximum Path Sum [HARD]
- **LeetCode Link:** [LC 124: Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- **Category / Sub-Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)

**📜 Problem Statement & Explanation**
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.

**Example 1:**
- **Input:** `root = [-10,9,20,null,null,15,7]` 
- **Output:** `42` 
- **Explanation:** Optimal path is `15 -> 20 -> 7` with sum `15 + 20 + 7 = 42`.

**Constraints:**
- Number of nodes is in range `[1, 3 * 10^4]` 
- `-1000 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.1 (Tree Height & Depth Recursion)
- **Memory Mnemonic:** *"Single-pass post-order DFS: node->val + max(0, left) + max(0, right)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, compute max single branch gain from left and right children using separate recursive functions, updating max path sum `node->val + max(0, leftGain) + max(0, rightGain)`.

```cpp
class Solution {
private:
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int leftG = max(0, maxGain(node->left));
        int rightG = max(0, maxGain(node->right));
        return node->val + max(leftG, rightG);
    }
public:
    int maxPathSum(TreeNode* root) {
        if (!root) return INT_MIN;
        int currPath = root->val + max(0, maxGain(root->left)) + max(0, maxGain(root->right));
        int leftPath = maxPathSum(root->left);
        int rightPath = maxPathSum(root->right);
        return max({currPath, leftPath, rightPath});
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Single-Pass Post-Order DFS:
Helper `maxGain(node, maxSum)` returns max single-branch contribution to parent: `node->val + max(0, max(leftGain, rightGain))`.
At each node, update global `maxSum = max(maxSum, node->val + max(0, leftGain) + max(0, rightGain))`.

```cpp
class Solution {
private:
    int maxGain(TreeNode* node, int& maxSum) {
        if (!node) return 0;
        int leftGain = max(0, maxGain(node->left, maxSum));
        int rightGain = max(0, maxGain(node->right, maxSum));
        int priceNewPath = node->val + leftGain + rightGain;
        maxSum = max(maxSum, priceNewPath);
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxGain(root, maxSum);
        return maxSum;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Tree with all negative values (returns max single node value).
- Single node tree.

---

### 90. 🔴 P0 [Q] LC 236: Lowest Common Ancestor of a Binary Tree [MEDIUM]
- **LeetCode Link:** [LC 236: Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.2 (Lowest Common Ancestor (LCA))

**📜 Problem Statement & Explanation**
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.

**Example 1:**
- **Input:** `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1` 
- **Output:** `3`

**Constraints:**
- Number of nodes is in range `[2, 10^5]` 
- All `Node.val` are unique 
- `p != q` and both exist in tree.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.2 (Lowest Common Ancestor (LCA))
- **Memory Mnemonic:** *"Post-order DFS: if left and right non-null, root is LCA."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Find path from root to `p` and path from root to `q` using backtracking, store paths in vectors, and find last common node pointer in both paths.

```cpp
class Solution {
private:
    bool findPath(TreeNode* root, TreeNode* target, vector<TreeNode*>& path) {
        if (!root) return false;
        path.push_back(root);
        if (root == target) return true;
        if (findPath(root->left, target, path) || findPath(root->right, target, path)) return true;
        path.pop_back();
        return false;
    }
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        vector<TreeNode*> pathP, pathQ;
        findPath(root, p, pathP);
        findPath(root, q, pathQ);
        TreeNode* lca = nullptr;
        for (int i = 0; i < min(pathP.size(), pathQ.size()); i++) {
            if (pathP[i] == pathQ[i]) lca = pathP[i];
            else break;
        }
        return lca;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Post-Order DFS:
- Base case: if `root == nullptr || root == p || root == q`, return `root`.
- Recurse `left = LCA(root->left)` and `right = LCA(root->right)`.
- If both `left != null` and `right != null`, `p` and `q` lie in different subtrees $\implies$ current `root` is the LCA!
- If only `left` is non-null, return `left`, else return `right`.

```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `p` is an ancestor of `q` (returns `p`).
- `p` and `q` are leaf nodes.

---

### 91. 🔴 P0 [Q] LC 226: Invert Binary Tree [EASY]
- **LeetCode Link:** [LC 226: Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, invert the tree, and return its root. Inverting means mirroring: every left child becomes a right child and vice versa, at every level.

**Example 1:**
- **Input:** `root = [4,2,7,1,3,6,9]`
- **Output:** `[4,7,2,9,6,3,1]`

**Example 2:**
- **Input:** `root = [2,1,3]`
- **Output:** `[2,3,1]`

**Example 3:**
- **Input:** `root = []`
- **Output:** `[]`

**Constraints:**
- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)
- **Memory Mnemonic:** *"Swap the kids, then let recursion mirror each subtree."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(W), where W is the maximum width of the tree
- **Explanation:** There is no truly slower approach: any solution must touch every node once. The usual alternative is iterative BFS, which is also the answer when the interviewer says "no recursion". Pop a node from a queue, swap its children, and push the non-null children.

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            swap(node->left, node->right);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        return root;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) recursion stack, where H is the tree height
- **Explanation:** Recursive DFS.
1. **Base case:** a null node is already inverted; return it.
2. Swap the node's left and right pointers.
3. Recursively invert the new left subtree and the new right subtree.
4. Return the node.
Swapping before or after the recursive calls both work, as long as both subtrees are processed exactly once.

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **The in-order trap:** writing `invert(left); swap; invert(left)` looks wrong but is actually right, while `invert(left); swap; invert(right)` inverts the same subtree twice and leaves the other untouched. Swap first (pre-order) to avoid thinking about it.
- **Empty tree** returns `nullptr` through the base case.
- **Recursion depth** equals the tree height, which can be N for a skewed tree. Mention the BFS version if the interviewer worries about stack overflow.

---

### 92. 🟠 P1 [Q] LC 101: Symmetric Tree [EASY]
- **LeetCode Link:** [LC 101: Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

**Example 1:**
- **Input:** `root = [1,2,2,3,4,4,3]`
- **Output:** `true`

**Example 2:**
- **Input:** `root = [1,2,2,null,3,null,3]`
- **Output:** `false`
- **Explanation:** Both `2` nodes have their child `3` on the right side, so the shapes are not mirrors.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`
- **Follow-up:** Could you solve it both recursively and iteratively?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)
- **Memory Mnemonic:** *"Compare outside with outside, inside with inside."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(W), where W is the maximum width of the tree
- **Explanation:** Level-order traversal that records every level, **including null children** (as a marker value outside the allowed range). The tree is symmetric exactly when every level reads the same forwards and backwards. Easy to reason about, but builds an extra list per level.

```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front();
                q.pop();
                if (!node) {
                    level.push_back(INT_MIN);   // null marker
                    continue;
                }
                level.push_back(node->val);
                q.push(node->left);
                q.push(node->right);
            }
            for (int l = 0, r = level.size() - 1; l < r; l++, r--)
                if (level[l] != level[r]) return false;
        }
        return true;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) recursion stack
- **Explanation:** A tree is symmetric if its left and right subtrees are mirrors of each other. Write a helper `isMirror(a, b)`:
1. Both null: mirrors (empty matches empty).
2. Exactly one null, or the values differ: not mirrors.
3. Otherwise, the **outer** pair `(a->left, b->right)` and the **inner** pair `(a->right, b->left)` must both be mirrors.
Call `isMirror(root->left, root->right)`.

```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root->left, root->right);
    }
private:
    bool isMirror(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return isMirror(a->left, b->right) && isMirror(a->right, b->left);
    }
};
```

**🔁 Variant: Iterative with a Queue of Pairs (the problem's own follow-up)**
- **Complexity:** **Time:** O(N) | **Space:** O(W)
- **Explanation:** Replace the recursion with a queue that holds pairs of nodes that must be mirrors.
1. Start with the pair `(root->left, root->right)`.
2. Pop a pair: if both are null, continue; if only one is null or the values differ, return `false`.
3. Push the outer pair `(a->left, b->right)` and the inner pair `(a->right, b->left)`.
4. If the queue empties without a mismatch, the tree is symmetric.

```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        queue<pair<TreeNode*, TreeNode*>> q;
        q.push({root->left, root->right});
        while (!q.empty()) {
            auto [a, b] = q.front();
            q.pop();
            if (!a && !b) continue;
            if (!a || !b || a->val != b->val) return false;
            q.push({a->left, b->right});
            q.push({a->right, b->left});
        }
        return true;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Pairing the wrong children** (`a->left` with `b->left`) checks whether the two subtrees are *identical*, not mirrored. That is Same Tree (LC 100), a different problem.
- **Check for null before reading `->val`.** The order of the two `if` lines in `isMirror` matters.
- **Values alone are not enough.** Example 2 has symmetric values level by level if you ignore nulls; the shape is what makes it asymmetric. That is why the brute force records null markers.

---

### 93. 🔴 P0 [Q] LC 105: Construct Binary Tree from Preorder and Inorder Traversal [MEDIUM]
- **LeetCode Link:** [LC 105: Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- **Category / Sub-Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)

**📜 Problem Statement & Explanation**
Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
- **Input:** `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]`
- **Output:** `[3,9,20,null,null,15,7]`

**Example 2:**
- **Input:** `preorder = [-1], inorder = [-1]`
- **Output:** `[-1]`

**Constraints:**
- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of **unique** values.
- Each value of `inorder` also appears in `preorder`.
- `preorder` is guaranteed to be the preorder traversal of the tree, and `inorder` is guaranteed to be the inorder traversal of the tree.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)
- **Memory Mnemonic:** *"Preorder tells you WHO the root is; inorder tells you WHAT is on each side."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) worst case (skewed tree) | **Space:** O(H) recursion stack
- **Explanation:** Same recursion as the optimal solution, but find the root's position in `inorder` with a linear scan each time. For a skewed tree, each scan is O(N), giving O(N^2) overall.
1. `build(lo, hi)` constructs the subtree whose inorder values are `inorder[lo..hi]`.
2. The next unused preorder value (`preorder[preIdx++]`) is that subtree's root.
3. Scan `inorder[lo..hi]` for it at index `mid`; the left subtree is `lo..mid-1`, the right subtree is `mid+1..hi`.

```cpp
class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int preIdx = 0;
        return build(preorder, inorder, preIdx, 0, (int)inorder.size() - 1);
    }
private:
    TreeNode* build(vector<int>& pre, vector<int>& in, int& preIdx, int lo, int hi) {
        if (lo > hi) return nullptr;
        TreeNode* root = new TreeNode(pre[preIdx++]);
        int mid = lo;
        while (in[mid] != root->val) mid++;
        root->left = build(pre, in, preIdx, lo, mid - 1);
        root->right = build(pre, in, preIdx, mid + 1, hi);
        return root;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N) for the hashmap + O(H) recursion stack
- **Explanation:** Remove the linear scan by precomputing `inIdx[value] = position in inorder`.
1. Fill the hashmap once, in O(N).
2. Recurse exactly as before: take `preorder[preIdx++]` as the root, look up its inorder position `mid` in O(1), build the left subtree from `lo..mid-1`, then the right subtree from `mid+1..hi`.
3. The left subtree **must** be built before the right one, because in preorder all left-subtree nodes come before all right-subtree nodes, and `preIdx` only moves forward.

```cpp
class Solution {
    unordered_map<int, int> inIdx;
    int preIdx = 0;
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) inIdx[inorder[i]] = i;
        return build(preorder, 0, (int)inorder.size() - 1);
    }
private:
    TreeNode* build(vector<int>& preorder, int lo, int hi) {
        if (lo > hi) return nullptr;
        TreeNode* root = new TreeNode(preorder[preIdx++]);
        int mid = inIdx[root->val];
        root->left = build(preorder, lo, mid - 1);
        root->right = build(preorder, mid + 1, hi);
        return root;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Build left before right.** Swapping the two recursive calls assigns preorder values to the wrong subtrees.
- **`preIdx` must be shared** across all calls (a member variable or a reference). Passing it by value restarts it in every call and builds the wrong tree.
- **Unique values are required.** With duplicates, the hashmap cannot tell which inorder position belongs to which root, and the tree is ambiguous. Say this if asked "what if values repeat?".
- **Follow-up: Inorder + Postorder (LC 106).** Postorder lists the root **last**, so take roots from the end of the postorder array, moving backwards, and build the **right** subtree before the left.

---


### 94. 🟢 P2 [BONUS] LC 297: Serialize and Deserialize Binary Tree [HARD]
- **LeetCode Link:** [LC 297: Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)

**📜 Problem Statement & Explanation**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network.
Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.

**Example 1:**
- **Input:** `root = [1,2,3,null,null,4,5]`
- **Output:** `[1,2,3,null,null,4,5]`

**Example 2:**
- **Input:** `root = []`
- **Output:** `[]`

**Constraints:**
- The number of nodes in the tree is in the range $[0, 10^4]$.
- $-1000 \le Node.val \le 1000$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 15.3 (Tree Mirror & Construction)
- **Memory Mnemonic:** *"Preorder DFS with '#' for null and comma delimiter. Stringstream in deserialize recursively builds root->left->right."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(2^H)$ | **Space:** $O(2^H)$
- **Explanation:** Store the complete binary tree array representation (like a heap array) including all null pointers up to depth $H$. For skewed trees, $2^H$ space blows up memory.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(N)$
- **Explanation:**
  - `serialize`: Use Preorder DFS (`Root, Left, Right`). If node is null, append `"#, "`. Otherwise, append `to_string(node->val) + ","` and recurse on left and right.
  - `deserialize`: Read tokens separated by comma using `stringstream`. If token is `"#"`, return `nullptr`. Otherwise, create `TreeNode(stoi(token))` and recurse to build `root->left` and `root->right`.

```cpp
class Codec {
private:
    void serializeHelper(TreeNode* root, string& s) {
        if (!root) {
            s += "#,";
            return;
        }
        s += to_string(root->val) + ",";
        serializeHelper(root->left, s);
        serializeHelper(root->right, s);
    }

    TreeNode* deserializeHelper(stringstream& ss) {
        string token;
        if (!getline(ss, token, ',')) return nullptr;
        if (token == "#") return nullptr;

        TreeNode* node = new TreeNode(stoi(token));
        node->left = deserializeHelper(ss);
        node->right = deserializeHelper(ss);
        return node;
    }

public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string s = "";
        serializeHelper(root, s);
        return s;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return deserializeHelper(ss);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty tree `root == nullptr` serializes to `"#, "` and deserializes safely to `nullptr`.
- Negative numbers (e.g. `-100`) must be parsed properly by `stoi`.

---

---

[⬅️ Previous: 14 · Heap / Priority Queue](14-heap-priority-queue.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 16 · Tree Bfs / Level Order Traversal ➡️](16-tree-bfs-level-order-traversal.md)
