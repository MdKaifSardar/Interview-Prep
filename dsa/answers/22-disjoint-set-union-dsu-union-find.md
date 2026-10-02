[⬅️ Previous: 21 · Topological Sort (Kahn'S Algorithm)](21-topological-sort-kahn-s-algorithm.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 23 · 1D Dynamic Programming ➡️](23-1d-dynamic-programming.md)

---

## 22. DISJOINT SET UNION (DSU / UNION-FIND)

### 118. 🟢 P2 [Q] LC 684: Redundant Connection [MEDIUM]
- **LeetCode Link:** [LC 684: Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- **Category / Sub-Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
In this problem, a tree is an undirected graph that is connected and has no cycles. Return an edge that can be removed so that the resulting graph is a tree of `n` nodes.

**Example 1:**
- **Input:** `edges = [[1,2],[1,3],[2,3]]` 
- **Output:** `[2,3]`

**Constraints:**
- `n == edges.length` 
- `3 <= n <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)
- **Memory Mnemonic:** *"DSU find root collision detects redundant cycle edge."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(E * (V + E)) | **Space:** O(V + E)
- **Explanation:** Iterate through edges. Remove current edge, run DFS to check if graph remains connected.

```cpp
class Solution {
private:
    bool isConnectedDFS(int u, int target, vector<vector<int>>& adj, vector<bool>& visited) {
        if (u == target) return true;
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v] && isConnectedDFS(v, target, adj, visited)) return true;
        }
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<vector<int>> adj(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            vector<bool> visited(n + 1, false);
            if (!adj[u].empty() && !adj[v].empty() && isConnectedDFS(u, v, adj, visited)) {
                return edge;
            }
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(E * alpha(V)) | **Space:** O(V) auxiliary
- **Explanation:** Disjoint Set Union (DSU) with Path Compression:
Initialize `parent[i] = i`. For each edge `[u, v]`:
- `rootU = find(u)`, `rootV = find(v)`.
- If `rootU == rootV`, `[u, v]` connects two nodes already in the same component $\implies$ cycle edge! Return `[u, v]`.
- Else `parent[rootU] = rootV`.

```cpp
class Solution {
private:
    int findParent(int node, vector<int>& parent) {
        if (node == parent[node]) return node;
        return parent[node] = findParent(parent[node], parent);
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        
        for (const auto& edge : edges) {
            int u = edge[0], v = edge[1];
            int rootU = findParent(u, parent);
            int rootV = findParent(v, parent);
            if (rootU == rootV) return edge;
            parent[rootU] = rootV;
        }
        return {};
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Multiple candidate edges (problem guarantees returning last edge in input).

---

### 119. 🟢 P2 [Q] LC 547: Number of Provinces [MEDIUM]
- **LeetCode Link:** [LC 547: Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Category / Sub-Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
There are `n` cities. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`. Return total number of provinces.

**Example 1:**
- **Input:** `isConnected = [[1,1,0],[1,1,0],[0,0,1]]` 
- **Output:** `2`

**Constraints:**
- `n == isConnected.length` 
- `1 <= n <= 200`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)
- **Memory Mnemonic:** *"DSU union decrement or DFS connected component count."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V^3) | **Space:** O(V)
- **Explanation:** Compute Warshall's transitive closure matrix to find all pairs reachable from each node.

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<vector<int>> reach = isConnected;
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
                }
            }
        }
        vector<bool> visited(n, false);
        int provinces = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                provinces++;
                for (int j = 0; j < n; j++) if (reach[i][j]) visited[j] = true;
            }
        }
        return provinces;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V^2 * alpha(V)) | **Space:** O(V) auxiliary
- **Explanation:** DSU Component Counter:
Initialize `parent[i] = i` and `provinces = n`.
Iterate upper triangle `isConnected[i][j] == 1`: if `find(i) != find(j)`, `union(i, j)` and decrement `provinces--`. Return final `provinces` count.

```cpp
class Solution {
private:
    int findParent(int i, vector<int>& parent) {
        if (parent[i] == i) return i;
        return parent[i] = findParent(parent[i], parent);
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> parent(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        int provinces = n;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    int rootI = findParent(i, parent);
                    int rootJ = findParent(j, parent);
                    if (rootI != rootJ) {
                        parent[rootI] = rootJ;
                        provinces--;
                    }
                }
            }
        }
        return provinces;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All cities isolated (returns n).
- All cities connected in single component (returns 1).

---


### 120. 🟢 P2 [BONUS] LC 721: Accounts Merge [MEDIUM]
- **LeetCode Link:** [LC 721: Accounts Merge](https://leetcode.com/problems/accounts-merge/)
- **Category / Sub-Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)

**📜 Problem Statement & Explanation**
Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account.
Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that two accounts with the same name might belong to different people, as people might have the same name. A person can have any number of accounts, but all of their accounts definitely have the same name.
After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.

**Example 1:**
- **Input:** `accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`
- **Output:** `[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]`

**Constraints:**
- $1 \le accounts.length \le 1000$
- $2 \le accounts[i].length \le 10$
- $1 \le accounts[i][j].length \le 30$
- `accounts[i][0]` consists of English letters.
- `accounts[i][j]` (for $j \ge 1$) is a valid email.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 22.1 (DSU Path Compression & Union by Rank)
- **Memory Mnemonic:** *"Map email -> first occurrence account index. Union current account with previous account index for all shared emails."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N^2 \times L)$ | **Space:** $O(N \times L)$
- **Explanation:** Repeatedly scan all pairs of accounts. If two accounts share any common email, merge their email sets into one account and delete the second account. Repeat until no two accounts can be merged.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N \times K \alpha(N) + N \times K \log K)$ where $N$ is accounts, $K$ is emails per account | **Space:** $O(N \times K)$
- **Explanation:**
  1. Build a DSU over account indices `0` to `n - 1`.
  2. Maintain `unordered_map<string, int> emailToAccount` mapping each email to the first account index that contained it.
  3. For each account $i$, for each email $e$:
     - If $e$ is already seen in account $j$, union accounts $i$ and $j$.
     - Else, set `emailToAccount[e] = i`.
  4. Collect all emails by parent root: `unordered_map<int, vector<string>> mergedEmails`.
  5. For each group, sort emails, prepend `accounts[root][0]`, and add to result.

```cpp
class DSU {
public:
    vector<int> parent;
    DSU(int n) : parent(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] == x) return x;
        return parent[x] = find(parent[x]);
    }
    void unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX != rootY) parent[rootX] = rootY;
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        DSU dsu(n);
        unordered_map<string, int> emailToAccount;

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                const string& email = accounts[i][j];
                if (emailToAccount.count(email)) {
                    dsu.unite(i, emailToAccount[email]);
                } else {
                    emailToAccount[email] = i;
                }
            }
        }

        unordered_map<int, vector<string>> components;
        for (auto& [email, accIdx] : emailToAccount) {
            int root = dsu.find(accIdx);
            components[root].push_back(email);
        }

        vector<vector<string>> merged;
        for (auto& [root, emailList] : components) {
            sort(emailList.begin(), emailList.end());
            vector<string> account = {accounts[root][0]};
            account.insert(account.end(), emailList.begin(), emailList.end());
            merged.push_back(account);
        }
        return merged;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Same account name belonging to two different people with no overlapping emails (must stay separate).
- Duplicate emails within the same account line.

---

---

[⬅️ Previous: 21 · Topological Sort (Kahn'S Algorithm)](21-topological-sort-kahn-s-algorithm.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 23 · 1D Dynamic Programming ➡️](23-1d-dynamic-programming.md)
