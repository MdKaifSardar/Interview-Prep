[⬅️ Previous: 16 · Tree Bfs / Level Order Traversal](16-tree-bfs-level-order-traversal.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 18 · Trie (Prefix Tree) ➡️](18-trie-prefix-tree.md)

---

## 17. BINARY SEARCH TREE (BST)

### 99. 🔴 P0 [Q] LC 98: Validate Binary Search Tree [MEDIUM]
- **LeetCode Link:** [LC 98: Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

**Example 1:**
- **Input:** `root = [2,1,3]` 
- **Output:** `true` 

**Example 2:**
- **Input:** `root = [5,1,4,null,null,3,6]` 
- **Output:** `false`

**Constraints:**
- Number of nodes is in range `[1, 10^4]` 
- `-2^31 <= Node.val <= 2^31 - 1`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"Inorder traversal values must be strictly increasing."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2) | **Space:** O(H)
- **Explanation:** For every node `u`, check that all nodes in its left subtree are strictly smaller than `u->val` and all nodes in its right subtree are strictly larger than `u->val`.

```cpp
class Solution {
private:
    bool isSubtreeLess(TreeNode* node, int val) {
        if (!node) return true;
        return node->val < val && isSubtreeLess(node->left, val) && isSubtreeLess(node->right, val);
    }
    bool isSubtreeGreater(TreeNode* node, int val) {
        if (!node) return true;
        return node->val > val && isSubtreeGreater(node->left, val) && isSubtreeGreater(node->right, val);
    }
public:
    bool isValidBST(TreeNode* root) {
        if (!root) return true;
        return isSubtreeLess(root->left, root->val) && isSubtreeGreater(root->right, root->val) &&
               isValidBST(root->left) && isValidBST(root->right);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(H) auxiliary
- **Explanation:** Inorder Traversal Property: Inorder traversal of a valid BST yields strictly ascending values!
Traverse tree inorder tracking `prev` node pointer. If `prev != nullptr && root->val <= prev->val`, return `false`. Update `prev = root`.

```cpp
class Solution {
private:
    bool inorder(TreeNode* node, TreeNode*& prev) {
        if (!node) return true;
        if (!inorder(node->left, prev)) return false;
        if (prev && node->val <= prev->val) return false;
        prev = node;
        return inorder(node->right, prev);
    }
public:
    bool isValidBST(TreeNode* root) {
        TreeNode* prev = nullptr;
        return inorder(root, prev);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Node values equal to `INT_MIN` or `INT_MAX`.
- Duplicate node values (BST requires strictly greater/less).

---

### 100. 🔴 P0 [Q] LC 230: Kth Smallest Element in a BST [MEDIUM]
- **LeetCode Link:** [LC 230: Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
Given the `root` of a binary search tree, and an integer `k`, return the `k`-th smallest value (1-indexed) of all the values of the nodes in the tree.

**Example 1:**
- **Input:** `root = [3,1,4,null,2], k = 1` 
- **Output:** `1`

**Constraints:**
- Number of nodes is in range `[1, 10^4]` 
- `1 <= k <= n <= 10^4`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"Inorder traversal returns elements in sorted order."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Perform Inorder Traversal storing all node values in a vector `vals`. Return `vals[k - 1]`.

```cpp
class Solution {
private:
    void inorder(TreeNode* node, vector<int>& vals) {
        if (!node) return;
        inorder(node->left, vals);
        vals.push_back(node->val);
        inorder(node->right, vals);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        vector<int> vals;
        inorder(root, vals);
        return vals[k - 1];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(H + K) | **Space:** O(H) auxiliary
- **Explanation:** Iterative Inorder Traversal with Stack:
Go left as far as possible pushing nodes onto stack. Pop top node, decrement `k--`. If `k == 0`, return `curr->val`. Move `curr = curr->right`. Stops early after visiting K nodes.

```cpp
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top();
            st.pop();
            k--;
            if (k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `k = 1` (smallest element).
- `k = N` (largest element).

---

### 101. 🔴 P0 [Q] LC 450: Delete Node in a BST [MEDIUM]
- **LeetCode Link:** [LC 450: Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Category / Sub-Pattern:** Sub-Pattern 17.2 (BST Search & Mutation)

**📜 Problem Statement & Explanation**
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference of the BST.

**Example 1:**
- **Input:** `root = [5,3,6,2,4,null,7], key = 3` 
- **Output:** `[5,4,6,2,null,null,7]`

**Constraints:**
- Number of nodes is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.2 (BST Search & Mutation)
- **Memory Mnemonic:** *"Replace node with Inorder Successor (min in right subtree)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Store all values except `key` in an array, and construct a new BST from scratch.

```cpp
class Solution {
private:
    void getVals(TreeNode* node, int key, vector<int>& vals) {
        if (!node) return;
        getVals(node->left, key, vals);
        if (node->val != key) vals.push_back(node->val);
        getVals(node->right, key, vals);
    }
    TreeNode* buildBST(vector<int>& vals, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* node = new TreeNode(vals[mid]);
        node->left = buildBST(vals, l, mid - 1);
        node->right = buildBST(vals, mid + 1, r);
        return node;
    }
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        vector<int> vals;
        getVals(root, key, vals);
        return buildBST(vals, 0, (int)vals.size() - 1);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(H) | **Space:** O(H) auxiliary
- **Explanation:** Standard Recursive BST Deletion:
1. Search for node: if `key < root->val` `root->left = deleteNode(root->left, key)`, else if `key > root->val` `root->right = deleteNode(root->right, key)`.
2. When found (`root->val == key`):
   - Case 1 & 2: 0 or 1 child $\implies$ return non-null child.
   - Case 3: 2 children $\implies$ find Inorder Successor `curr = root->right` (min node in right subtree). Replace `root->val = curr->val`, then delete successor recursively `root->right = deleteNode(root->right, curr->val)`.

```cpp
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        
        if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            
            TreeNode* succ = root->right;
            while (succ->left) succ = succ->left;
            root->val = succ->val;
            root->right = deleteNode(root->right, succ->val);
        }
        return root;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Target key not present in tree.
- Deleting root node.

---


### 102. 🟢 P2 [BONUS] LC 99: Recover Binary Search Tree [MEDIUM]
- **LeetCode Link:** [LC 99: Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)

**📜 Problem Statement & Explanation**
You are given the `root` of a binary search tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. Recover the tree without changing its structure.

**Example 1:**
- **Input:** `root = [1,3,null,null,2]`
- **Output:** `[3,1,null,null,2]`
- **Explanation:** 3 cannot be a left child of 1 because $3 > 1$. Swapping 1 and 3 recovers the BST.

**Example 2:**
- **Input:** `root = [3,1,4,null,null,2]`
- **Output:** `[2,1,4,null,null,1]`

**Constraints:**
- The number of nodes in the tree is in the range $[2, 1000]$.
- $-2^{31} \le Node.val \le 2^{31} - 1$.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 17.1 (BST Validation & Inorder Property)
- **Memory Mnemonic:** *"Inorder traversal must be sorted. First violation: first = prev. Second violation: second = curr. Swap(first->val, second->val)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ | **Space:** $O(N)$
- **Explanation:** Perform inorder traversal and store all node pointers and values in lists. Sort the values array. Walk the tree again in inorder and overwrite each node's value with the sorted values.

```cpp
class Solution {
    vector<TreeNode*> nodes;
    vector<int> vals;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        nodes.push_back(root);
        vals.push_back(root->val);
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        sort(vals.begin(), vals.end());
        for (int i = 0; i < nodes.size(); i++) {
            nodes[i]->val = vals[i];
        }
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(H)$ recursion stack (or $O(1)$ via Morris Inorder)
- **Explanation:** Inorder traversal of a valid BST visits nodes in strictly increasing order. When two nodes are swapped, there will be either:
  1. Two violations (`prev->val > curr->val`): `first` is `prev` of the first violation, and `second` is `curr` of the second violation.
  2. One violation (the swapped nodes were adjacent in inorder): `first` is `prev`, and `second` is `curr`.
  After completing the traversal, swap the values of `first` and `second`.

```cpp
class Solution {
private:
    TreeNode* first = nullptr;
    TreeNode* second = nullptr;
    TreeNode* prev = nullptr;

    void inorder(TreeNode* curr) {
        if (!curr) return;
        inorder(curr->left);

        if (prev && prev->val > curr->val) {
            if (!first) first = prev; // First violation
            second = curr;           // Second violation (or adjacent)
        }
        prev = curr;

        inorder(curr->right);
    }

public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        if (first && second) {
            swap(first->val, second->val);
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Swapped nodes are direct parent-child or adjacent in inorder traversal (only one inversion is triggered).
- Modifying node pointers vs swapping node values: Problem statement specifically asks to recover without changing tree structure.

---

---

[⬅️ Previous: 16 · Tree Bfs / Level Order Traversal](16-tree-bfs-level-order-traversal.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 18 · Trie (Prefix Tree) ➡️](18-trie-prefix-tree.md)
