[⬅️ Previous: 17 · Binary Search Tree (Bst)](17-binary-search-tree-bst.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 19 · Backtracking / Subsets & Permutations ➡️](19-backtracking-subsets-and-permutations.md)

---

## 18. TRIE (PREFIX TREE)

### 103. 🟠 P1 [Q] LC 208: Implement Trie (Prefix Tree) [MEDIUM]
- **LeetCode Link:** [LC 208: Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (Trie Insert / Search / Prefix)

**📜 Problem Statement & Explanation**
A **trie** (pronounced "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a set of strings. Implement the `Trie` class:
- `Trie()` initializes the trie object.
- `void insert(String word)` inserts the string `word` into the trie.
- `boolean search(String word)` returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

**Example 1:**
- **Input:** `["Trie","insert","search","search","startsWith","insert","search"]`, `[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]`
- **Output:** `[null,null,true,false,true,null,true]`
- **Explanation:** After inserting `"apple"`, `search("app")` is `false` because `"app"` was never inserted as a whole word, but `startsWith("app")` is `true`. After inserting `"app"`, `search("app")` becomes `true`.

**Constraints:**
- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10^4` calls **in total** will be made to `insert`, `search`, and `startsWith`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (Trie Insert / Search / Prefix)
- **Memory Mnemonic:** *"Walk the letters down the tree; isEnd separates a whole word from a mere prefix."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** insert / search O(L) average, startsWith O(N * L) | **Space:** O(total characters)
- **Explanation:** Keep all words in an `unordered_set<string>`. `insert` and `search` are plain hash operations. `startsWith` has no shortcut: it must check every stored word to see whether it begins with `prefix`. That linear scan is exactly what a trie removes.

```cpp
class Trie {
    unordered_set<string> words;
public:
    Trie() {}

    void insert(string word) { words.insert(word); }

    bool search(string word) { return words.count(word) > 0; }

    bool startsWith(string prefix) {
        for (const string& w : words)
            if (w.compare(0, prefix.size(), prefix) == 0) return true;
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(L) per operation, where L is the word length | **Space:** O(total characters * 26) in the worst case
- **Explanation:**
1. **Node:** `children[26]` (one slot per letter, `nullptr` if absent) and `isEnd`, which is `true` if a word ends exactly at this node.
2. **insert(word):** start at the root; for each letter, create the child if it is missing, then move into it. Mark the last node `isEnd = true`.
3. **walk(s):** a shared helper that follows the letters of `s` and returns the node reached, or `nullptr` as soon as a letter is missing.
4. **search(word):** the walk must succeed **and** end on a node with `isEnd`. Otherwise `word` is only a prefix of something longer.
5. **startsWith(prefix):** the walk only has to succeed; any path that exists belongs to at least one inserted word.

```cpp
class Trie {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root;

    Node* walk(const string& s) {
        Node* node = root;
        for (char c : s) {
            int i = c - 'a';
            if (!node->children[i]) return nullptr;
            node = node->children[i];
        }
        return node;
    }

public:
    Trie() : root(new Node()) {}

    void insert(string word) {
        Node* node = root;
        for (char c : word) {
            int i = c - 'a';
            if (!node->children[i]) node->children[i] = new Node();
            node = node->children[i];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Node* node = walk(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(string prefix) {
        return walk(prefix) != nullptr;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **`search` vs `startsWith`:** forgetting the `isEnd` check makes `search("app")` return `true` after only `"apple"` was inserted. This is the most common bug, and Example 1 exists to catch it.
- **Initialize the children array** (`= {}`) so every slot starts as `nullptr`. Uninitialized pointers make the walk read garbage.
- **Array vs hash map children:** `children[26]` is fastest for lowercase letters. For a large or unknown alphabet (Unicode, any characters), use `unordered_map<char, Node*>` to avoid wasting 26 slots per node.
- **Memory:** the nodes are never freed here. Mention a destructor that deletes the tree recursively if the interviewer asks about cleanup.
- **Where tries show up next:** Design Add and Search Words (LC 211, the bonus in this section) adds a `.` wildcard. Word Search II (LC 212) and autocomplete/search-suggestion design questions are built on this same structure.

---


### 104. 🟢 P2 [BONUS] LC 211: Design Add and Search Words Data Structure [MEDIUM]
- **LeetCode Link:** [LC 211: Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
- **Category / Sub-Pattern:** Sub-Pattern 18.1 (Trie Insert / Search / Prefix)

**📜 Problem Statement & Explanation**
Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the `WordDictionary` class:
- `WordDictionary()` initializes the object.
- `void addWord(word)` adds `word` to the data structure; it can be matched later.
- `bool search(word)` returns `true` if there is any string in the data structure that matches `word`, or `false` otherwise. `word` may contain dots `'.'`, where a dot can be matched with any letter.

**Example 1:**
- **Input:** `["WordDictionary","addWord","addWord","addWord","search","search","search","search"]`, `[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]`
- **Output:** `[null,null,null,null,false,true,true,true]`
- **Explanation:** `"pad"` was never added. `".ad"` matches `"bad"`, `"dad"` and `"mad"`; `"b.."` matches `"bad"`.

**Constraints:**
- `1 <= word.length <= 25`
- `word` in `addWord` consists of lowercase English letters.
- `word` in `search` consists of `'.'` or lowercase English letters.
- There will be at most `2` dots in `word` for `search` queries.
- At most `10^4` calls will be made to `addWord` and `search`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 18.1 (Trie Insert / Search / Prefix)
- **Memory Mnemonic:** *"Letters walk one path; a dot fans out to every child."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** addWord O(L), search O(N * L) | **Space:** O(total characters)
- **Explanation:** Group words by length in an `unordered_map<int, vector<string>>`, since a match must have the same length. For `search`, compare the query against every stored word of that length, character by character, treating `.` as "matches anything".

```cpp
class WordDictionary {
    unordered_map<int, vector<string>> byLen;
public:
    WordDictionary() {}

    void addWord(string word) { byLen[word.size()].push_back(word); }

    bool search(string word) {
        auto it = byLen.find(word.size());
        if (it == byLen.end()) return false;
        for (const string& w : it->second) {
            bool ok = true;
            for (int i = 0; i < word.size() && ok; i++)
                if (word[i] != '.' && word[i] != w[i]) ok = false;
            if (ok) return true;
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** addWord O(L); search O(L) without dots, up to O(26^d * L) with d dots (d <= 2 here) | **Space:** O(total characters * 26)
- **Explanation:**
1. `addWord` is a normal trie insert (same as LC 208).
2. `search` calls `dfs(node, word, i)`, which asks: "starting at `node`, can `word[i..]` be matched?"
3. If `node` is null, this path does not exist: return `false`. If `i == word.size()`, the whole query was consumed: return `node->isEnd`.
4. If `word[i]` is a letter, move to that one child. If it is `.`, try every child and return `true` if any of them succeeds.

```cpp
class WordDictionary {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root;

    bool dfs(Node* node, const string& word, int i) {
        if (!node) return false;
        if (i == word.size()) return node->isEnd;
        if (word[i] == '.') {
            for (Node* child : node->children)
                if (dfs(child, word, i + 1)) return true;
            return false;
        }
        return dfs(node->children[word[i] - 'a'], word, i + 1);
    }

public:
    WordDictionary() : root(new Node()) {}

    void addWord(string word) {
        Node* node = root;
        for (char c : word) {
            int i = c - 'a';
            if (!node->children[i]) node->children[i] = new Node();
            node = node->children[i];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        return dfs(root, word, 0);
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **`isEnd` still matters:** after adding `"bad"`, searching `"ba"` or `"b."` must return `false`, because no word ends there.
- **Return early** as soon as one branch of a `.` succeeds. Exploring all branches is still correct, but slower.
- **The dot limit (at most 2)** keeps the branching small. Without it, a query of all dots could visit the whole trie, which is worth saying when asked about worst-case complexity.

---

---

[⬅️ Previous: 17 · Binary Search Tree (Bst)](17-binary-search-tree-bst.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 19 · Backtracking / Subsets & Permutations ➡️](19-backtracking-subsets-and-permutations.md)
