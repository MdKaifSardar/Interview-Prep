[⬅️ Previous: 20 · Graph Dfs / Bfs](20-graph-dfs-bfs.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 22 · Disjoint Set Union (Dsu / Union-Find) ➡️](22-disjoint-set-union-dsu-union-find.md)

---

## 21. TOPOLOGICAL SORT (KAHN'S ALGORITHM)

### 116. 🔴 P0 [Q] LC 207: Course Schedule [MEDIUM]
- **LeetCode Link:** [LC 207: Course Schedule](https://leetcode.com/problems/course-schedule/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `true` if you can finish all courses.

**Example 1:**
- **Input:** `numCourses = 2, prerequisites = [[1,0]]` 
- **Output:** `true`

**Constraints:**
- `1 <= numCourses <= 2000` 
- `0 <= prerequisites.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)
- **Memory Mnemonic:** *"Kahn's Algorithm BFS in-degree tracking."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V!) | **Space:** O(V)
- **Explanation:** Backtracking permutation check searching for a valid linear ordering of courses.

```cpp
class Solution {
private:
    bool isCycleDFS(int u, vector<vector<int>>& adj, vector<int>& visited) {
        visited[u] = 1; // visiting
        for (int v : adj[u]) {
            if (visited[v] == 1) return true;
            if (visited[v] == 0 && isCycleDFS(v, adj, visited)) return true;
        }
        visited[u] = 2; // visited
        return false;
    }
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);
        vector<int> visited(numCourses, 0);
        for (int i = 0; i < numCourses; i++) {
            if (visited[i] == 0 && isCycleDFS(i, adj, visited)) return false;
        }
        return true;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V + E)
- **Explanation:** Kahn's BFS Topological Sort:
1. Build adjacency list `adj` and `inDegree` array of size `numCourses`.
2. For each edge `[a, b]`: `adj[b].push_back(a)`, `inDegree[a]++`.
3. Push all nodes with `inDegree[i] == 0` into queue `q`.
4. While `q` not empty: pop node, increment `visitedCount++`. For each neighbor `v`: decrement `inDegree[v]--`. If `inDegree[v] == 0`, push to queue.
5. Return `visitedCount == numCourses`.

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        int count = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            count++;
            for (int v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) q.push(v);
            }
        }
        return count == numCourses;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Graph with circular dependency `[[1,0],[0,1]]` (returns false).
- Disconnected courses without prerequisites.

---

#### 116a. 🔁 Follow-up Variant: LC 210: Course Schedule II [MEDIUM]
- **LeetCode Link:** [LC 210: Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.

**Example 1:**
- **Input:** `numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]` 
- **Output:** `[0,2,1,3]`

**Constraints:**
- `1 <= numCourses <= 2000` 
- `0 <= prerequisites.length <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)
- **Memory Mnemonic:** *"Kahn's Algorithm collecting topological order."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(V!) | **Space:** O(V)
- **Explanation:** Try all course permutations using backtracking and test prerequisite ordering.

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> order(numCourses);
        for (int i = 0; i < numCourses; i++) order[i] = i;
        do {
            unordered_map<int, int> pos;
            for (int i = 0; i < numCourses; i++) pos[order[i]] = i;
            bool valid = true;
            for (auto& p : prerequisites) {
                if (pos[p[1]] > pos[p[0]]) { valid = false; break; }
            }
            if (valid) return order;
        } while (next_permutation(order.begin(), order.end()));
        return {};
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(V + E) | **Space:** O(V + E)
- **Explanation:** Kahn's BFS Topo-Order Collection:
Same setup as LC 207: when popping node `u` from queue, append `u` to `order` vector. If `order.size() == numCourses`, return `order`, else return `{}` (cycle detected).

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) q.push(v);
            }
        }
        return order.size() == numCourses ? order : vector<int>();
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Cycle present (returns empty vector `{}`).
- No prerequisites (returns `[0, 1, ..., n-1]`).

---


### 117. 🟢 P2 [BONUS] LC 269: Alien Dictionary [HARD]
- **LeetCode Link:** [LC 269: Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- **Category / Sub-Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)

**📜 Problem Statement & Explanation**
There is a new alien language that uses the English alphabet. The characters in the dictionary are sorted lexicographically by the rules of this new language.
Given a list of strings `words` from the alien language's dictionary, return a string of the unique letters in the new alien language sorted in lexicographically increasing order. If there is no valid ordering, return `""`. If there are multiple valid solutions, return any of them.

**Example 1:**
- **Input:** `words = ["wrt","wrf","er","ett","rftt"]`
- **Output:** `"wertf"`

**Example 2:**
- **Input:** `words = ["z","x"]`
- **Output:** `"zx"`

**Example 3:**
- **Input:** `words = ["z","x","z"]`
- **Output:** `""` (Explanation: The order is invalid because 'z' cannot appear both before and after 'x').

**Constraints:**
- $1 \le words.length \le 100$
- $1 \le words[i].length \le 100$
- `words[i]` consists of only lowercase English letters.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 21.1 (Kahn's BFS In-degree Algorithm)
- **Memory Mnemonic:** *"Compare adjacent words for first mismatch -> directed edge. Prefix edge case check. Kahn's BFS for cycle detection."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(26!)$ | **Space:** $O(26)$
- **Explanation:** Generate all permutations of 26 letters and verify each permutation against every word pair in the dictionary. Intractable.

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(C)$ where $C$ is total characters across all words | **Space:** $O(1)$ fixed 26-character alphabet graph
- **Explanation:**
  1. Extract all unique characters from `words` into `inDegree` map.
  2. Compare adjacent word pairs `w1` and `w2`:
     - If `w1.size() > w2.size()` and `w1.rfind(w2, 0) == 0` (e.g. `["abc", "ab"]`), it's invalid prefix ordering; immediately return `""`.
     - Find the first index $j$ where `w1[j] != w2[j]`. Add edge `w1[j] -> w2[j]` and increment `inDegree[w2[j]]` (ensuring edges are deduplicated using set).
  3. Kahn's Algorithm: Push all characters with `inDegree == 0` into queue.
  4. While queue is not empty, pop `u`, append to `result`, and decrement `inDegree` of neighbors.
  5. If `result.size() == inDegree.size()`, return `result`; else return `""` (cycle detected).

```cpp
class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;

        for (const string& word : words) {
            for (char c : word) {
                inDegree[c] = 0;
            }
        }

        for (int i = 0; i < (int)words.size() - 1; i++) {
            const string& w1 = words[i];
            const string& w2 = words[i + 1];

            // Invalid prefix check: e.g. ["apple", "app"]
            if (w1.size() > w2.size() && w1.compare(0, w2.size(), w2) == 0) {
                return "";
            }

            int minLen = min(w1.size(), w2.size());
            for (int j = 0; j < minLen; j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    break;
                }
            }
        }

        queue<char> q;
        for (auto& [ch, deg] : inDegree) {
            if (deg == 0) q.push(ch);
        }

        string result = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            result += u;

            for (char v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        return result.size() == inDegree.size() ? result : "";
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- The prefix trap: `["abc", "ab"]` where the longer word appears before its prefix is invalid and must return `""`.
- Duplicate edges between characters: using `unordered_set<char>` for adjacency prevents double-incrementing `inDegree`.

---

---

[⬅️ Previous: 20 · Graph Dfs / Bfs](20-graph-dfs-bfs.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 22 · Disjoint Set Union (Dsu / Union-Find) ➡️](22-disjoint-set-union-dsu-union-find.md)
