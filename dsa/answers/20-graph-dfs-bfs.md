[⬅️ Previous: 19 · Backtracking / Subsets & Permutations](19-backtracking-subsets-and-permutations.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 21 · Topological Sort (Kahn'S Algorithm) ➡️](21-topological-sort-kahn-s-algorithm.md)

---

## 20. GRAPH DFS / BFS

### 110. 🔴 P0 [Q] LC 200: Number of Islands [MEDIUM]
- **LeetCode Link:** [LC 200: Number of Islands](https://leetcode.com/problems/number-of-islands/)
- **Category / Sub-Pattern:** Sub-Pattern 20.1 (Grid Flood Fill (DFS/BFS))

**📜 Problem Statement & Explanation**
Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

**Example 1:**
- **Input:** `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]` 
- **Output:** `1`

**Constraints:**
- `m == grid.length`, `n == grid[i].length` 
- `1 <= m, n <= 300`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.1 (Grid Flood Fill (DFS/BFS))
- **Memory Mnemonic:** *"In-place sinking of land cells ('1' -> '0')."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((M * N)^2) | **Space:** O(M * N)
- **Explanation:** Launch separate BFS from every cell storing visited coordinates in an auxiliary set.

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        set<pair<int, int>> visited;
        int islands = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1' && !visited.count({r, c})) {
                    islands++;
                    queue<pair<int, int>> q;
                    q.push({r, c});
                    visited.insert({r, c});
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
                        for (int i = 0; i < 4; i++) {
                            int nr = cr + dr[i], nc = cc + dc[i];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1' && !visited.count({nr, nc})) {
                                visited.insert({nr, nc});
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return islands;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N) recursion stack
- **Explanation:** In-Place Sink Grid DFS:
Scan grid cells $(r, c)$. When `grid[r][c] == '1'`, increment `islands++` and launch `sinkDFS(r, c)` which sinks all connected land cells by setting `grid[r][c] = '0'` and exploring 4 directional neighbors.

```cpp
class Solution {
private:
    void sinkDFS(int r, int c, vector<vector<char>>& grid, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0') return;
        grid[r][c] = '0';
        sinkDFS(r + 1, c, grid, m, n);
        sinkDFS(r - 1, c, grid, m, n);
        sinkDFS(r, c + 1, grid, m, n);
        sinkDFS(r, c - 1, grid, m, n);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sinkDFS(r, c, grid, m, n);
                }
            }
        }
        return islands;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- All water grid.
- All land grid.

---

### 111. 🔴 P0 [Q] LC 133: Clone Graph [MEDIUM]
- **LeetCode Link:** [LC 133: Clone Graph](https://leetcode.com/problems/clone-graph/)
- **Category / Sub-Pattern:** Sub-Pattern 20.2 (Graph Traversal, Cloning & Bipartite Check)

**📜 Problem Statement & Explanation**
Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

**Example 1:**
- **Input:** `adjList = [[2,4],[1,3],[2,4],[1,3]]` 
- **Output:** `[[2,4],[1,3],[2,4],[1,3]]`

**Constraints:**
- Number of nodes is in range `[0, 100]` 
- `1 <= Node.val <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.2 (Graph Traversal, Cloning & Bipartite Check)
- **Memory Mnemonic:** *"DFS with hash map mapping original node -> cloned node."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V)
- **Explanation:** Two-pass BFS: create new nodes in first pass, then link neighbors in second pass.

```cpp
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        unordered_map<Node*, Node*> mp;
        queue<Node*> q;
        q.push(node);
        mp[node] = new Node(node->val);
        while (!q.empty()) {
            Node* curr = q.front(); q.pop();
            for (Node* neighbor : curr->neighbors) {
                if (!mp.count(neighbor)) {
                    mp[neighbor] = new Node(neighbor->val);
                    q.push(neighbor);
                }
            }
        }
        for (auto& pair : mp) {
            for (Node* neighbor : pair.first->neighbors) {
                pair.second->neighbors.push_back(mp[neighbor]);
            }
        }
        return mp[node];
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V) auxiliary
- **Explanation:** DFS Graph Cloning with Hash Map:
Maintain `unordered_map<Node*, Node*> visited`. Base cases: if `node == nullptr` return null. If `visited.count(node)` return `visited[node]`. Create clone `Node* clone = new Node(node->val)`. Store `visited[node] = clone`. Recurse for all neighbors: `clone->neighbors.push_back(cloneGraph(neighbor))`.

```cpp
class Solution {
private:
    unordered_map<Node*, Node*> visited;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (visited.count(node)) return visited[node];
        
        Node* clone = new Node(node->val);
        visited[node] = clone;
        
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        return clone;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty graph (`node == nullptr`).
- Single node graph without edges.

---

### 112. 🔴 P0 [Q] LC 785: Is Graph Bipartite? [MEDIUM]
- **LeetCode Link:** [LC 785: Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
- **Category / Sub-Pattern:** Sub-Pattern 20.2 (Graph Traversal, Cloning & Bipartite Check)

**📜 Problem Statement & Explanation**
There is an undirected graph with `n` nodes. Return `true` if and only if it is bipartite (can color vertices with 2 colors such that no adjacent vertices have same color).

**Example 1:**
- **Input:** `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]` 
- **Output:** `false`

**Constraints:**
- `graph.length == n` 
- `1 <= n <= 100`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.2 (Graph Traversal, Cloning & Bipartite Check)
- **Memory Mnemonic:** *"BFS 2-coloring (1 and -1); conflict = not bipartite."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(2^V) | **Space:** O(V)
- **Explanation:** Try all 2^V vertex colorings using backtracking and test edge consistency.

```cpp
class Solution {
private:
    bool tryColoring(int idx, int n, vector<int>& colors, vector<vector<int>>& graph) {
        if (idx == n) return true;
        for (int c : {1, -1}) {
            colors[idx] = c;
            bool valid = true;
            for (int v : graph[idx]) {
                if (colors[v] == c) { valid = false; break; }
            }
            if (valid && tryColoring(idx + 1, n, colors, graph)) return true;
            colors[idx] = 0;
        }
        return false;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> colors(n, 0);
        return tryColoring(0, n, colors, graph);
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V) auxiliary
- **Explanation:** BFS 2-Coloring (`color` array initialized to 0).
For each unvisited node `i`: color it with 1, push to BFS queue. For each popped node `u` and neighbor `v`:
- If `color[v] == 0`: color `v` with `-color[u]` and push to queue.
- If `color[v] == color[u]`: graph is NOT bipartite $\implies$ return `false`.

```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0);
        
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            queue<int> q;
            q.push(i);
            color[i] = 1;
            
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : graph[u]) {
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.push(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Disconnected graph components.
- Graph with odd length cycles.

---

### 113. 🔴 P0 [Q] LC 994: Rotting Oranges [MEDIUM]
- **LeetCode Link:** [LC 994: Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Category / Sub-Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)

**📜 Problem Statement & Explanation**
You are given an `m x n` grid where `0` is empty, `1` is fresh orange, `2` is rotten orange. Return the minimum number of minutes until no fresh orange remains. If impossible, return `-1`.

**Example 1:**
- **Input:** `grid = [[2,1,1],[1,1,0],[0,1,1]]` 
- **Output:** `4`

**Constraints:**
- `m == grid.length`, `n == grid[i].length` 
- `1 <= m, n <= 10`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)
- **Memory Mnemonic:** *"Multi-Source BFS starting from all rotten oranges simultaneously."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((M * N)^2) | **Space:** O(1)
- **Explanation:** Iteratively rot fresh oranges step-by-step using repeated full-grid scans until no new oranges rot.

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int minutes = 0;
        while (true) {
            vector<pair<int, int>> toRot;
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (grid[r][c] == 2) {
                        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
                        for (int i = 0; i < 4; i++) {
                            int nr = r + dr[i], nc = c + dc[i];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                                toRot.push_back({nr, nc});
                            }
                        }
                    }
                }
            }
            if (toRot.empty()) break;
            for (auto& p : toRot) grid[p.first][p.second] = 2;
            minutes++;
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) if (grid[r][c] == 1) return -1;
        }
        return minutes;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M * N) | **Space:** O(M * N)
- **Explanation:** Multi-Source BFS:
1. Count total fresh oranges and push all initial rotten orange coordinates `(r, c)` into `queue<pair<int, int>> q`.
2. While queue is non-empty and `freshCount > 0`: process level size `sz`, expand to 4 neighbors. For each fresh neighbor, turn to rotten (`grid[nr][nc] = 2`), decrement `freshCount--`, push to queue.
3. Increment `minutes++` after processing each level. Return `freshCount == 0 ? minutes : -1`.

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int freshCount = 0;
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) freshCount++;
            }
        }
        if (freshCount == 0) return 0;
        
        int minutes = 0;
        int dr[] = {0, 1, 0, -1}, dc[] = {1, 0, -1, 0};
        
        while (!q.empty() && freshCount > 0) {
            int sz = q.size();
            minutes++;
            for (int i = 0; i < sz; i++) {
                auto [r, c] = q.front(); q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d], nc = c + dc[d];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        freshCount--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return freshCount == 0 ? minutes : -1;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- No fresh oranges (returns 0).
- Unreachable fresh orange isolated by empty cells (returns -1).

---

### 114. 🟢 P2 [Q] LC 127: Word Ladder [HARD]
- **LeetCode Link:** [LC 127: Word Ladder](https://leetcode.com/problems/word-ladder/)
- **Category / Sub-Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)

**📜 Problem Statement & Explanation**
Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no sequence exists.

**Example 1:**
- **Input:** `beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]` 
- **Output:** `5`

**Constraints:**
- `1 <= beginWord.length <= 10` 
- `1 <= wordList.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)
- **Memory Mnemonic:** *"BFS on single character mutations with hash set lookup."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N^2 * L) | **Space:** O(N)
- **Explanation:** Build full adjacency graph comparing all pairs of words for single-character mutations, then run standard BFS.

```cpp
class Solution {
private:
    bool isAdjacent(const string& a, const string& b) {
        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a[i] != b[i]) diff++;
            if (diff > 1) return false;
        }
        return diff == 1;
    }
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        wordList.push_back(beginWord);
        int n = wordList.size();
        unordered_map<string, vector<string>> adj;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isAdjacent(wordList[i], wordList[j])) {
                    adj[wordList[i]].push_back(wordList[j]);
                    adj[wordList[j]].push_back(wordList[i]);
                }
            }
        }
        queue<pair<string, int>> q;
        unordered_set<string> visited;
        q.push({beginWord, 1});
        visited.insert(beginWord);
        while (!q.empty()) {
            auto [curr, steps] = q.front(); q.pop();
            if (curr == endWord) return steps;
            for (string& nxt : adj[curr]) {
                if (!visited.count(nxt)) {
                    visited.insert(nxt);
                    q.push({nxt, steps + 1});
                }
            }
        }
        return 0;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N * L^2) | **Space:** O(N * L)
- **Explanation:** BFS with Word Mutations:
1. Insert `wordList` into `unordered_set<string> wordSet` for $O(1)$ lookups.
2. `queue<string> q`. Push `beginWord`.
3. BFS level-by-level: for each word `curr`, mutate each position `i` from `'a'` to `'z'`. If mutated word is in `wordSet`, erase it (marking visited) and push to queue. If mutated word equals `endWord`, return `steps + 1`.

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (!wordSet.count(endWord)) return 0;
        
        queue<string> q;
        q.push(beginWord);
        int steps = 1;
        
        while (!q.empty()) {
            int sz = q.size();
            steps++;
            for (int k = 0; k < sz; k++) {
                string curr = q.front(); q.pop();
                for (int i = 0; i < curr.length(); i++) {
                    char orig = curr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        curr[i] = c;
                        if (curr == endWord) return steps;
                        if (wordSet.count(curr)) {
                            wordSet.erase(curr);
                            q.push(curr);
                        }
                    }
                    curr[i] = orig;
                }
            }
        }
        return 0;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- `endWord` not in `wordList` (returns 0).
- `beginWord` equals `endWord`.

---


### 115. 🟢 P2 [BONUS] LC 743: Network Delay Time [MEDIUM]
- **LeetCode Link:** [LC 743: Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- **Category / Sub-Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)

**📜 Problem Statement & Explanation**
You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (u_i, v_i, w_i)`, where $u_i$ is the source node, $v_i$ is the target node, and $w_i$ is the time it takes for a signal to travel from source to target.
We will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

**Example 1:**
- **Input:** `times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2`
- **Output:** `2`

**Example 2:**
- **Input:** `times = [[1,2,1]], n = 2, k = 1`
- **Output:** `1`

**Example 3:**
- **Input:** `times = [[1,2,1]], n = 2, k = 2`
- **Output:** `-1`

**Constraints:**
- $1 \le k \le n \le 100$
- $1 \le times.length \le 6000$
- $times[i].length == 3$
- $1 \le u_i, v_i \le n$, $u_i \ne v_i$
- $0 \le w_i \le 100$
- All pairs $(u_i, v_i)$ are unique.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 20.3 (Multi-Source BFS & Shortest Paths)
- **Memory Mnemonic:** *"Dijkstra's Algorithm: Min-heap of {dist, node}. Relax edges if dist[u] + w < dist[v]. Answer is max(dist)."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(V \times E)$ | **Space:** $O(V)$
- **Explanation:** Bellman-Ford algorithm: Initialize `dist` array of size $n+1$ with $\infty$, `dist[k] = 0`. Relax all edges in `times` $n - 1$ times.

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dist(n + 1, 1e9);
        dist[k] = 0;
        for (int i = 1; i < n; i++) {
            for (const auto& edge : times) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != 1e9 && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        return maxTime;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O((V + E) \log V)$ | **Space:** $O(V + E)$
- **Explanation:** Dijkstra's Algorithm:
  1. Construct adjacency list `adj[u] = {{v, w}}`.
  2. Maintain `dist` vector initialized to `INT_MAX`, with `dist[k] = 0`.
  3. Min-heap `priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>>` stores `{currentDist, node}`.
  4. Pop `{d, u}`. If `d > dist[u]`, continue (stale entry).
  5. For each neighbor `{v, weight}`: if `dist[u] + weight < dist[v]`, update `dist[v]` and push `{dist[v], v}`.
  6. Return `max_element(dist)` from `1` to `n`. If any node is unreachable (`INT_MAX`), return `-1`.

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (const auto& edge : times) {
            adj[edge[0]].push_back({edge[1], edge[2]});
        }

        vector<int> dist(n + 1, INT_MAX);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

        dist[k] = 0;
        pq.push({0, k}); // {distance, node}

        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();

            if (d > dist[u]) continue;

            for (auto& [v, weight] : adj[u]) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }

        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxTime = max(maxTime, dist[i]);
        }
        return maxTime;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Nodes are 1-indexed, so arrays must be of size `n + 1`.
- Graph may contain disconnected components where some nodes are unreachable.

---

---

[⬅️ Previous: 19 · Backtracking / Subsets & Permutations](19-backtracking-subsets-and-permutations.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 21 · Topological Sort (Kahn'S Algorithm) ➡️](21-topological-sort-kahn-s-algorithm.md)
