[⬅️ Previous: 10 · Overlapping Intervals](10-overlapping-intervals.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 12 · Fast & Slow Pointers (Linked List) ➡️](12-fast-and-slow-pointers-linked-list.md)

---

## 11. LINKED LIST MANIPULATION

### 65. 🔴 P0 [Q] LC 206: Reverse Linked List [EASY]
- **LeetCode Link:** [LC 206: Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (In-Place Reversal & Re-linking)

**📜 Problem Statement & Explanation**
Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**
- **Input:** `head = [1,2,3,4,5]`
- **Output:** `[5,4,3,2,1]`

**Example 2:**
- **Input:** `head = [1,2]`
- **Output:** `[2,1]`

**Example 3:**
- **Input:** `head = []`
- **Output:** `[]`

**Constraints:**
- Number of nodes in the list is in range `[0, 5000]`
- `-5000 <= Node.val <= 5000`

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (In-Place Reversal & Re-linking)
- **Memory Mnemonic:** *"Save next, flip link, step forward. prev ends as the new head."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Traverse the list and push every node value into a `vector<int> vals`. Traverse the list a second time, overwriting each node's value from the back of the vector. The links are untouched; only the values move. Interviewers usually reject this because it changes values instead of relinking nodes.

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        vector<int> vals;
        for (ListNode* curr = head; curr != nullptr; curr = curr->next)
            vals.push_back(curr->val);
        int i = vals.size() - 1;
        for (ListNode* curr = head; curr != nullptr; curr = curr->next)
            curr->val = vals[i--];
        return head;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:** Iterative 3-pointer reversal. Initialize `prev = nullptr` and `curr = head`. While `curr` is not null:
1. Save `next = curr->next` (otherwise the rest of the list is lost after flipping).
2. Flip the link: `curr->next = prev`.
3. Advance: `prev = curr`, `curr = next`.
When `curr` becomes null, `prev` points to the old tail, which is the new head.

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
```

**🔁 Variant: Recursive Reversal (common follow-up: "now do it without a loop")**
- **Complexity:** **Time:** O(N) | **Space:** O(N) recursion stack
- **Explanation:** Trust the recursion to reverse everything after `head`, then fix the one link that remains.
1. **Base case:** if `head` is null (empty list) or `head->next` is null (last node), return `head`. The last node becomes the new head.
2. **Recurse:** `newHead = reverseList(head->next)` reverses the rest of the list. For `1 -> 2 -> 3`, while at `head = 1` the rest becomes `3 -> 2`, but node `1` still points to `2`.
3. **Fix the link:** `head->next` is node `2`, now the tail of the reversed part. Set `head->next->next = head` so `2` points back to `1`.
4. **Cut the old link:** set `head->next = nullptr`, so `1` becomes the new tail and no cycle remains.
5. **Return `newHead`** unchanged on every level, because it always points to the old last node.

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Empty list** `head = nullptr` returns `nullptr`: the loop never runs and `prev` is still null.
- **Returning `head` instead of `prev`** is the most common bug: after the loop, `head` is the tail.
- **Recursive version:** forgetting `head->next = nullptr` leaves the first two nodes pointing at each other, creating a cycle.
- **Follow-ups:** Reverse Linked List II (LC 92, reverse only positions `left..right`) and Reverse Nodes in k-Group (LC 25) both reuse this exact 3-pointer loop on a sub-range.
- **Building block:** this loop is step 2 of Reorder List (LC 143) and Palindrome Linked List (LC 234).

---

### 66. 🟠 P1 [Q] LC 234: Palindrome Linked List [EASY]
- **LeetCode Link:** [LC 234: Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)
- **Category / Sub-Pattern:** Sub-Pattern 11.1 (In-Place Reversal & Re-linking)

**📜 Problem Statement & Explanation**
Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.

**Example 1:**
- **Input:** `head = [1,2,2,1]`
- **Output:** `true`

**Example 2:**
- **Input:** `head = [1,2]`
- **Output:** `false`

**Constraints:**
- Number of nodes in the list is in range `[1, 10^5]`
- `0 <= Node.val <= 9`
- **Follow-up:** Could you do it in O(n) time and O(1) space?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.1 (In-Place Reversal & Re-linking)
- **Memory Mnemonic:** *"Middle, reverse, compare: three building blocks you already know."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(N)
- **Explanation:** Copy all node values into a vector, then check the vector with two pointers from both ends. Simple, but the follow-up asks for O(1) space.

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        vector<int> vals;
        for (ListNode* curr = head; curr; curr = curr->next)
            vals.push_back(curr->val);
        for (int l = 0, r = vals.size() - 1; l < r; l++, r--)
            if (vals[l] != vals[r]) return false;
        return true;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N) | **Space:** O(1) auxiliary
- **Explanation:**
1. **Find the middle:** move `slow` 1 step and `fast` 2 steps until `fast` runs out. `slow` stops at the start of the second half (for odd length, at the exact middle node).
2. **Reverse the second half** starting at `slow`, using the LC 206 loop.
3. **Compare:** walk `p1` from `head` and `p2` from the reversed half, comparing values until `p2` reaches null. The second half is never longer than the first, so `p2` finishing first is the right stop condition. For odd lengths the middle node is compared with itself, which is harmless.
4. **Restore:** reverse the second half again so the caller gets the list back unchanged.

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* second = reverseList(slow);
        ListNode *p1 = head, *p2 = second;
        bool result = true;
        while (p2) {
            if (p1->val != p2->val) {
                result = false;
                break;
            }
            p1 = p1->next;
            p2 = p2->next;
        }
        reverseList(second);
        return result;
    }
private:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Restore the list.** Modifying the input and leaving it broken is something interviewers notice. Reversing the second half back costs one extra O(N) pass.
- **Loop on `p2`, not `p1`.** The first half still links into the middle node, so `p1` never becomes null early, but `p2` does at the right time.
- **Single node** is always a palindrome; the code handles it without a special case.
- **Odd vs even length:** trace `[1,2,3,2,1]` and `[1,2,2,1]` once each to see where `slow` lands.

---

### 67. 🔴 P0 [Q] LC 21: Merge Two Sorted Lists [EASY]
- **LeetCode Link:** [LC 21: Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.2 (Dummy Node Merge & Construction)

**📜 Problem Statement & Explanation**
You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example 1:**
- **Input:** `list1 = [1,2,4], list2 = [1,3,4]`
- **Output:** `[1,1,2,3,4,4]`

**Example 2:**
- **Input:** `list1 = [], list2 = []`
- **Output:** `[]`

**Example 3:**
- **Input:** `list1 = [], list2 = [0]`
- **Output:** `[0]`

**Constraints:**
- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in non-decreasing order.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.2 (Dummy Node Merge & Construction)
- **Memory Mnemonic:** *"A dummy head removes the "which list starts first" special case."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O((N + M) log(N + M)) | **Space:** O(N + M)
- **Explanation:** Collect every value from both lists into a vector, sort it, and build a brand-new list. Ignores that the inputs are already sorted, and creates new nodes instead of splicing the existing ones.

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        vector<int> vals;
        for (ListNode* p = list1; p; p = p->next) vals.push_back(p->val);
        for (ListNode* p = list2; p; p = p->next) vals.push_back(p->val);
        sort(vals.begin(), vals.end());
        ListNode dummy(0);
        ListNode* tail = &dummy;
        for (int v : vals) {
            tail->next = new ListNode(v);
            tail = tail->next;
        }
        return dummy.next;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N + M) | **Space:** O(1) auxiliary
- **Explanation:**
1. Create a `dummy` node on the stack and a `tail` pointer at it. The merged list will hang off `dummy.next`, so there is no special case for choosing the first node.
2. While both lists are non-empty, attach the smaller current node to `tail->next`, advance that list, and advance `tail`.
3. When one list runs out, the other is already sorted, so attach it in one step.
4. Return `dummy.next`.

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};
```

**🔁 Variant: Recursive Merge (common follow-up: "can you write it recursively?")**
- **Complexity:** **Time:** O(N + M) | **Space:** O(N + M) recursion stack
- **Explanation:** The merged list starts with the smaller of the two heads; everything after it is the merge of the remaining nodes.
1. **Base cases:** if one list is empty, the answer is the other list.
2. If `list1->val <= list2->val`, then `list1` is the head of the result. Its `next` becomes the merge of `list1->next` and `list2`. Return `list1`.
3. Otherwise do the same with `list2` as the head.

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if (!list1) return list2;
        if (!list2) return list1;
        if (list1->val <= list2->val) {
            list1->next = mergeTwoLists(list1->next, list2);
            return list1;
        }
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Forgetting the leftover:** after the loop, one list may still have nodes. `tail->next = list1 ? list1 : list2;` attaches them in O(1).
- **Return `dummy.next`, not `dummy`.** The dummy itself is not part of the answer.
- **Stack dummy (`ListNode dummy(0)`)** avoids allocating with `new` and leaking a node.
- **Where it is reused:** Merge k Sorted Lists (LC 23) and Sort List (LC 148, #14) both call this exact merge.

---

### 68. 🟠 P1 [Q] LC 2: Add Two Numbers [MEDIUM]
- **LeetCode Link:** [LC 2: Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
- **Category / Sub-Pattern:** Sub-Pattern 11.2 (Dummy Node Merge & Construction)

**📜 Problem Statement & Explanation**
You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
- **Input:** `l1 = [2,4,3], l2 = [5,6,4]`
- **Output:** `[7,0,8]`
- **Explanation:** 342 + 465 = 807.

**Example 2:**
- **Input:** `l1 = [0], l2 = [0]`
- **Output:** `[0]`

**Example 3:**
- **Input:** `l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]`
- **Output:** `[8,9,9,9,0,0,0,1]`

**Constraints:**
- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.2 (Dummy Node Merge & Construction)
- **Memory Mnemonic:** *"Digit is sum % 10, carry is sum / 10, and don't forget the last carry."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N + M) | **Space:** O(1) auxiliary
- **Explanation:** Convert each list into an integer, add them, and convert the sum back into a list. This is what most people try first, and it is **wrong** for this problem: a list can have 100 digits, far beyond the 19 digits that fit in a `long long`. Recognizing this overflow is the point of the problem. The code below only works for short inputs.

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        long long a = 0, b = 0, place = 1;
        for (ListNode* p = l1; p; p = p->next, place *= 10) a += p->val * place;
        place = 1;
        for (ListNode* p = l2; p; p = p->next, place *= 10) b += p->val * place;
        long long sum = a + b;
        ListNode dummy(0);
        ListNode* tail = &dummy;
        do {
            tail->next = new ListNode(sum % 10);
            tail = tail->next;
            sum /= 10;
        } while (sum > 0);
        return dummy.next;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(max(N, M)) | **Space:** O(1) auxiliary (excluding the output list)
- **Explanation:** The digits are already in reverse order, which is exactly the order you add numbers by hand: ones place first.
1. Keep a `carry` (starts at `0`) and a `dummy` head with a `tail` pointer.
2. Loop while `l1` or `l2` still has nodes, **or** `carry` is non-zero.
3. `sum = carry + (l1 digit or 0) + (l2 digit or 0)`. The new digit is `sum % 10`, and the new carry is `sum / 10`.
4. Append the digit as a new node, then advance whichever lists are non-empty.

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) {
                sum += l1->val;
                l1 = l1->next;
            }
            if (l2) {
                sum += l2->val;
                l2 = l2->next;
            }
            carry = sum / 10;
            tail->next = new ListNode(sum % 10);
            tail = tail->next;
        }
        return dummy.next;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **The final carry:** `[5] + [5]` must give `[0,1]`. Including `carry` in the loop condition handles it; forgetting it drops the leading `1`.
- **Unequal lengths** (Example 3): treat a finished list as contributing `0` instead of writing a separate loop for the leftover.
- **Follow-up: Add Two Numbers II (LC 445)**, where digits are stored in normal (most significant first) order. Either reverse both lists first (LC 206) and reuse this code, or push the digits onto two stacks and add from the top.

---

### 69. 🔴 P0 [Q] LC 19: Remove Nth Node From End of List [MEDIUM]
- **LeetCode Link:** [LC 19: Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- **Category / Sub-Pattern:** Sub-Pattern 11.3 (Two-Pointer Gap & Intersection)

**📜 Problem Statement & Explanation**
Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.

**Example 1:**
- **Input:** `head = [1,2,3,4,5], n = 2`
- **Output:** `[1,2,3,5]`

**Example 2:**
- **Input:** `head = [1], n = 1`
- **Output:** `[]`

**Example 3:**
- **Input:** `head = [1,2], n = 1`
- **Output:** `[1]`

**Constraints:**
- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`
- **Follow-up:** Could you do this in one pass?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.3 (Two-Pointer Gap & Intersection)
- **Memory Mnemonic:** *"Keep a gap of n between two pointers; when the front falls off, the back is right before the target."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(N), two passes | **Space:** O(1)
- **Explanation:** First pass: count the length `L`. The node to delete is at position `L - n` (0-indexed) from the front. Second pass: walk to the node just before it and unlink it. A dummy node in front of `head` makes deleting the head itself work without a special case.

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int len = 0;
        for (ListNode* p = head; p; p = p->next) len++;
        ListNode dummy(0, head);
        ListNode* prev = &dummy;
        for (int i = 0; i < len - n; i++) prev = prev->next;
        ListNode* del = prev->next;
        prev->next = del->next;
        delete del;
        return dummy.next;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(N), one pass | **Space:** O(1) auxiliary
- **Explanation:**
1. Create `dummy` pointing to `head`, and start both `fast` and `slow` at `dummy`.
2. Move `fast` forward `n + 1` times. Now exactly `n` nodes sit strictly between `slow` and `fast`.
3. Move both one step at a time until `fast` becomes null. Because the gap never changes, `slow` now stands just **before** the `n`th node from the end.
4. Unlink it: `slow->next = slow->next->next`.
5. Return `dummy.next` (not `head`, which may have been the deleted node).

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode *fast = &dummy, *slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        ListNode* del = slow->next;
        slow->next = del->next;
        delete del;
        return dummy.next;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Removing the head** (`n == sz`, Example 2) is why the dummy exists. Without it you need a special case, and returning `head` would return the deleted node.
- **Why `n + 1` steps and not `n`:** you need to stop *before* the target to unlink it. Moving `n` steps would leave `slow` on the target itself.
- **Return `dummy.next`,** never `head`.
- **`delete del`** is optional on LeetCode, but mentioning memory cleanup shows good C++ habits.

---

### 70. 🟠 P1 [Q] LC 160: Intersection of Two Linked Lists [EASY]
- **LeetCode Link:** [LC 160: Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)
- **Category / Sub-Pattern:** Sub-Pattern 11.3 (Two-Pointer Gap & Intersection)

**📜 Problem Statement & Explanation**
Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`. The lists intersect **by reference** (the same node object), not by value. There are no cycles anywhere in the linked structure, and the lists must retain their original structure after the function returns.

**Example 1:**
- **Input:** `listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]`, intersecting at the node with value `8`
- **Output:** `Intersected at '8'`
- **Explanation:** The node with value `1` appears in both lists, but they are two different nodes. The shared tail starts at the node with value `8`.

**Example 2:**
- **Input:** `listA = [2,6,4], listB = [1,5]`, no shared nodes
- **Output:** `No intersection` (return `null`)

**Constraints:**
- The number of nodes of `listA` is `m` and of `listB` is `n`.
- `1 <= m, n <= 3 * 10^4`
- `1 <= Node.val <= 10^5`
- **Follow-up:** Could you write a solution that runs in O(m + n) time and uses only O(1) memory?

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.3 (Two-Pointer Gap & Intersection)
- **Memory Mnemonic:** *"Walk A then B, and B then A: both walk the same total distance, so they line up."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(M + N) | **Space:** O(M)
- **Explanation:** Store every node **address** of list A in an `unordered_set<ListNode*>`. Then walk list B; the first node whose address is in the set is the intersection. Fast, but breaks the O(1) memory follow-up.

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        unordered_set<ListNode*> seen;
        for (ListNode* p = headA; p; p = p->next) seen.insert(p);
        for (ListNode* p = headB; p; p = p->next)
            if (seen.count(p)) return p;
        return nullptr;
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(M + N) | **Space:** O(1) auxiliary
- **Explanation:** Say list A has `x` unique nodes before the shared tail, list B has `y`, and the shared tail has `z` nodes.
1. Pointer `a` walks A and, when it falls off the end, jumps to `headB`. Pointer `b` walks B and then jumps to `headA`.
2. When `a` reaches the start of the shared tail on its second lap it has walked `x + z + y` steps; `b` has walked `y + z + x`. Same distance, so they are on the same node.
3. If there is no intersection (`z = 0`), both reach `null` together after `x + y` steps, so the loop `while (a != b)` ends with `null`.

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *a = headA, *b = headB;
        while (a != b) {
            a = a ? a->next : headB;
            b = b ? b->next : headA;
        }
        return a;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **Compare node pointers, not values.** In Example 1, both lists contain a node with value `1`, but they are different nodes.
- **Switch on `a` being null, not `a->next`.** Writing `a->next ? a->next : headB` skips the null state, so with no intersection the pointers never become equal and the loop runs forever.
- **Alternative O(1) approach:** compute both lengths, advance the longer list's pointer by the difference, then move both together. Same complexity, a bit more code; good to mention if the switching trick doesn't come to mind.

---

### 71. 🔴 P0 [Q] LC 146: LRU Cache [MEDIUM]
- **LeetCode Link:** [LC 146: LRU Cache](https://leetcode.com/problems/lru-cache/)
- **Category / Sub-Pattern:** Sub-Pattern 11.4 (Linked List Design (Hash Map + DLL))

**📜 Problem Statement & Explanation**
Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**. Implement the `LRUCache` class:
- `LRUCache(int capacity)` initializes the LRU cache with **positive** size `capacity`.
- `int get(int key)` returns the value of the `key` if it exists, otherwise returns `-1`.
- `void put(int key, int value)` updates the value of the `key` if it exists. Otherwise, adds the key-value pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.

The functions `get` and `put` must each run in O(1) average time complexity.

**Example 1:**
- **Input:** `["LRUCache","put","put","get","put","get","put","get","get","get"]`, `[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`
- **Output:** `[null,null,null,1,null,-1,null,-1,3,4]`
- **Explanation:** Capacity is 2. After `put(1,1)` and `put(2,2)`, `get(1)` returns `1` and makes key 1 the most recent. `put(3,3)` evicts key 2 (least recent), so `get(2)` returns `-1`. `put(4,4)` evicts key 1, so `get(1)` returns `-1`, while `get(3)` returns `3` and `get(4)` returns `4`.

**Constraints:**
- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- At most `2 * 10^5` calls will be made to `get` and `put`.

---
**🧠 Short Solution Summary & Revision Notes**
- **Main Pattern:** Sub-Pattern 11.4 (Linked List Design (Hash Map + DLL))
- **Memory Mnemonic:** *"The map finds it in O(1), the list reorders it in O(1); you need both."*

---
**🐢 Brute Force Approach**
- **Complexity:** **Time:** O(capacity) per operation | **Space:** O(capacity)
- **Explanation:** Keep a `vector` of `(key, value)` pairs ordered from least to most recently used. `get` scans for the key and moves the pair to the back. `put` removes any old copy of the key, appends the new pair at the back, and erases the front pair if the size exceeds capacity. Correct, but every operation is a linear scan, which fails the O(1) requirement.

```cpp
class LRUCache {
    int cap;
    vector<pair<int, int>> items;   // front = least recent, back = most recent
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        for (int i = 0; i < items.size(); i++) {
            if (items[i].first == key) {
                auto item = items[i];
                items.erase(items.begin() + i);
                items.push_back(item);
                return item.second;
            }
        }
        return -1;
    }

    void put(int key, int value) {
        for (int i = 0; i < items.size(); i++) {
            if (items[i].first == key) {
                items.erase(items.begin() + i);
                break;
            }
        }
        items.push_back({key, value});
        if (items.size() > cap) items.erase(items.begin());
    }
};
```

---
**🚀 Optimal Approach**
- **Complexity:** **Time:** O(1) average per operation | **Space:** O(capacity)
- **Explanation:** Two structures that cover each other's weaknesses:
1. `list<pair<int,int>> items` stores `(key, value)` in recency order, most recent at the front. Moving a node or removing the back node is O(1).
2. `unordered_map<int, list<...>::iterator> pos` maps each key to its node in the list, so we never have to search the list.
- **get(key):** if the key is missing, return `-1`. Otherwise `splice` its node to the front (O(1), and the iterator stays valid) and return the value.
- **put(key, value):** if the key exists, update the value and splice it to the front. Otherwise, if the cache is full, evict the back node and erase its key from the map; then insert the new pair at the front and record its iterator.

```cpp
class LRUCache {
    int cap;
    list<pair<int, int>> items;   // front = most recent
    unordered_map<int, list<pair<int, int>>::iterator> pos;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        auto it = pos.find(key);
        if (it == pos.end()) return -1;
        items.splice(items.begin(), items, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = pos.find(key);
        if (it != pos.end()) {
            it->second->second = value;
            items.splice(items.begin(), items, it->second);
            return;
        }
        if (items.size() == cap) {
            pos.erase(items.back().first);
            items.pop_back();
        }
        items.emplace_front(key, value);
        pos[key] = items.begin();
    }
};
```

**🔁 Variant: Hand-Built Doubly Linked List (common follow-up: "implement it without std::list")**
- **Complexity:** **Time:** O(1) average per operation | **Space:** O(capacity)
- **Explanation:** Same design, but you write the list yourself. Two dummy sentinels, `head` and `tail`, mean you never have to check for null neighbors.
1. `head->next` is the most recently used node; `tail->prev` is the least recently used.
2. `remove(node)` links the node's two neighbors to each other.
3. `insertFront(node)` places the node right after `head`.
4. **get:** look up the node in the map, `remove` it, `insertFront` it, return its value.
5. **put:** if the key exists, update the value and move the node to the front. Otherwise, if full, remove `tail->prev`, erase **its key** from the map and free it; then create the new node, `insertFront` it and store it in the map.
Each node stores its own `key` so that eviction knows which map entry to erase.

```cpp
class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    int cap;
    unordered_map<int, Node*> mp;
    Node *head, *tail;   // dummy sentinels

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void insertFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        auto it = mp.find(key);
        if (it == mp.end()) return -1;
        Node* node = it->second;
        remove(node);
        insertFront(node);
        return node->val;
    }

    void put(int key, int value) {
        auto it = mp.find(key);
        if (it != mp.end()) {
            Node* node = it->second;
            node->val = value;
            remove(node);
            insertFront(node);
            return;
        }
        if (mp.size() == cap) {
            Node* lru = tail->prev;
            remove(lru);
            mp.erase(lru->key);
            delete lru;
        }
        Node* node = new Node(key, value);
        insertFront(node);
        mp[key] = node;
    }
};
```

---
**⚠️ Edge Cases & Interview Gotchas**
- **`put` on an existing key** must update the value **and** mark it most recent. Forgetting the move is a common bug that only shows up in longer test cases.
- **`get` counts as a use,** so it also moves the key to the front.
- **Store the key inside the list node.** On eviction you only have the node, and you need its key to erase the map entry.
- **Evict only for new keys.** Updating an existing key never changes the size, so check "is the key already present?" before the capacity check. Evicting first can throw out a key that was about to be updated.
- **Why a doubly linked list:** removing a node from the middle in O(1) needs its `prev` pointer. A singly linked list cannot do that.
- **Follow-up: LFU Cache (LC 460)** evicts the least *frequently* used key; it is hard and rarely asked at mid-level.

---

---

[⬅️ Previous: 10 · Overlapping Intervals](10-overlapping-intervals.md) &nbsp;|&nbsp; [📋 Index](../dsa-interview-answers.md) &nbsp;|&nbsp; [Next: 12 · Fast & Slow Pointers (Linked List) ➡️](12-fast-and-slow-pointers-linked-list.md)
