[⬅️ Previous: 11 · Linked List Manipulation](11-linked-list-manipulation.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 13 · Stack & Monotonic Stack ➡️](13-stack-and-monotonic-stack.md)

---

## 12. FAST & SLOW POINTERS (LINKED LIST)

### 72. 🔴 P0 [Q] LC 141: Linked List Cycle [EASY]
- **LeetCode Link:** [LC 141: Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

**Example 1:**
- **Input:** `head = [3,2,0,-4], pos = 1` 
- **Output:** `true` 
- **Explanation:** There is a cycle in the linked list, where tail connects to the 1st node (0-indexed).

**Constraints:**
- Number of nodes in list is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Fast pointer moves 2 steps, slow moves 1 step; collision = cycle."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Traverse linked list using a pointer while inserting visited `ListNode*` addresses into `unordered_set<ListNode*> visited`. If a node address is already in the set, a cycle exists.

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode* curr = head;
        while (curr != nullptr) {
            if (visited.count(curr)) return true;
            visited.insert(curr);
            curr = curr->next;
        }
        return false;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Floyd's Cycle Detection Algorithm (Tortoise & Hare):
Initialize `slow = head` and `fast = head`. Move `slow` by 1 step (`slow = slow->next`) and `fast` by 2 steps (`fast = fast->next->next`). If `fast` or `fast->next` becomes null, no cycle exists. If `slow == fast`, a cycle is detected!

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Empty list `head = nullptr`.
- Single node without cycle.
- Two nodes with cycle.

---

#### 72a. 🔁 Follow-up Variant: LC 142: Linked List Cycle II [MEDIUM]
- **LeetCode Link:** [LC 142: Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

**Example 1:**
- **Input:** `head = [3,2,0,-4], pos = 1` 
- **Output:** `tail connects to node index 1`

**Constraints:**
- Number of nodes in list is in range `[0, 10^4]` 
- `-10^5 <= Node.val <= 10^5`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Floyd's cycle detection + entry point recovery."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Traverse list with `unordered_set<ListNode*> visited`. Return the first node address encountered that is already in set.

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_set<ListNode*> visited;
        ListNode* curr = head;
        while (curr != nullptr) {
            if (visited.count(curr)) return curr;
            visited.insert(curr);
            curr = curr->next;
        }
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Floyd's Cycle Entry Recovery Algorithm:
1. Detect collision using `slow` (1 step) and `fast` (2 steps).
2. If collision occurs, reset `slow = head` while keeping `fast` at collision point.
3. Move both `slow` and `fast` 1 step at a time. The node where they meet again is the exact start of the cycle!

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;
        ListNode *slow = head, *fast = head;
        bool hasCycle = false;
        
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        if (!hasCycle) return nullptr;
        
        slow = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- No cycle.
- Entire list is a cycle (head is cycle entry).

---

### 73. 🔴 P0 [Q] LC 143: Reorder List [MEDIUM]
- **LeetCode Link:** [LC 143: Reorder List](https://leetcode.com/problems/reorder-list/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
You are given the head of a singly linked list `L0 -> L1 -> ... -> Ln-1 -> Ln`. Reorder the list to be: `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...` in-place.

**Example 1:**
- **Input:** `head = [1,2,3,4]` 
- **Output:** `[1,4,2,3]` 

**Example 2:**
- **Input:** `head = [1,2,3,4,5]` 
- **Output:** `[1,5,2,4,3]`

**Constraints:**
- Number of nodes in list is in range `[1, 5 * 10^4]` 
- `1 <= Node.val <= 1000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Midpoint split + reverse second half + alternate weaving."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Store node pointers in `vector<ListNode*> nodes`. Re-link nodes using two pointers `left = 0` and `right = n - 1` alternating inward.

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head) return;
        vector<ListNode*> nodes;
        ListNode* curr = head;
        while (curr) {
            nodes.push_back(curr);
            curr = curr->next;
        }
        int left = 0, right = nodes.size() - 1;
        while (left < right) {
            nodes[left]->next = nodes[right];
            left++;
            if (left == right) break;
            nodes[right]->next = nodes[left];
            right--;
        }
        nodes[left]->next = nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** 3-Step In-Place Weaving:
1. **Find Midpoint:** Use fast/slow pointers to split list into two halves.
2. **Reverse 2nd Half:** Reverse second half in-place using `prev`, `curr`, `next` pointers.
3. **Interleave/Weave:** Alternate pointers `first` (from 1st half) and `second` (from reversed 2nd half).

```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        
        // Step 1: Find midpoint
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // Step 2: Reverse second half
        ListNode *prev = nullptr, *curr = slow->next;
        slow->next = nullptr;
        while (curr) {
            ListNode *nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        
        // Step 3: Weave two halves
        ListNode *first = head, *second = prev;
        while (second) {
            ListNode *tmp1 = first->next;
            ListNode *tmp2 = second->next;
            
            first->next = second;
            second->next = tmp1;
            
            first = tmp1;
            second = tmp2;
        }
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Single node or 2-node list.
- Odd vs even total node counts.

---


### 74. 🟢 P2 [BONUS] LC 287: Find the Duplicate Number [MEDIUM]
- **LeetCode Link:** [LC 287: Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)
- **Category / Sub-Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)

**📜 Problem Statement & Explanation**
Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is only one repeated number in `nums`, return this repeated number.
You must solve the problem **without modifying** the array `nums` and using only **$O(1)$ constant extra space**.

**Example 1:**
- **Input:** `nums = [1,3,4,2,2]`
- **Output:** `2`

**Example 2:**
- **Input:** `nums = [3,1,3,4,2]`
- **Output:** `3`

**Constraints:**
- $1 \le n \le 10^5$
- `nums.length == n + 1`
- $1 \le nums[i] \le n$
- All integers in `nums` appear only once except for precisely one integer which appears two or more times.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 12.1 (Cycle Detection & Midpoint)
- **Memory Mnemonic:** *"Floyd's Tortoise & Hare on Array: index -> nums[index]. Intersection -> Reset slow to 0 -> Meet at cycle start."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** $O(N \log N)$ or $O(N)$ with set | **Space:** $O(N)$ (or $O(1)$ with sorting, but sorting violates the "do not modify array" constraint)
- **Explanation:** Use an `unordered_set<int>` to store visited numbers. The first number that already exists in the set is the duplicate.

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return num;
            seen.insert(num);
        }
        return -1;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** $O(N)$ | **Space:** $O(1)$ extra space, zero array modification
- **Explanation:** Interpret the array as a linked list where `nums[i]` represents `node->next`. Because values are in range `[1, n]` and the array length is `n + 1`, index `0` can never be inside a cycle (since no value is `0`). A duplicate value means multiple indices point to the same value, forming a cycle entrance.
  1. Phase 1 (Find intersection): `slow = nums[slow]`, `fast = nums[nums[fast]]`.
  2. Phase 2 (Find cycle entrance): Reset `slow = 0`. Advance both pointers by 1 step (`slow = nums[slow]`, `fast = nums[fast]`) until they meet. The meeting point is the duplicate value.

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];

        // Phase 1: Detect cycle
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Phase 2: Find entrance to cycle
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- Modifying the array (e.g. sign negation `nums[abs(x)] = -nums[abs(x)]`) is strictly prohibited by problem constraints.
- Why does index 0 never belong to a cycle? Because values are $\ge 1$, no element can point to index 0.

---

---

[⬅️ Previous: 11 · Linked List Manipulation](11-linked-list-manipulation.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 13 · Stack & Monotonic Stack ➡️](13-stack-and-monotonic-stack.md)
