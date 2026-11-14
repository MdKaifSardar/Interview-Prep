# SQL Drill 02: Recursive CTE Org-Tree Traversal (Q20)

## Problem Description
You are given a self-referencing table `employees` containing employee IDs, names, and their manager IDs. The top-level executive (CEO) has a `manager_id` of `NULL`.

Write a recursive SQL query (`WITH RECURSIVE`) to traverse the entire management hierarchy starting from the CEO downwards.

### Requirements:
For every employee, compute:
1. `id`: Employee ID
2. `name`: Employee Name
3. `manager_id`: Direct manager's ID
4. `org_level`: Integer depth starting at `1` for the CEO, `2` for direct reports of the CEO, `3` for reports of those reports, etc.

Order results by `org_level ASC`, then by `id ASC`.

---

## Schema Setup

### `employees`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Employee ID |
| `name` | TEXT | Employee Name |
| `manager_id` | INTEGER | Direct manager's ID (`NULL` for CEO) |

---

## Expected Output
```
┌─────────┬────┬───────────┬────────────┬───────────┐
│ (index) │ id │ name      │ manager_id │ org_level │
├─────────┼────┼───────────┼────────────┼───────────┤
│ 0       │ 1  │ 'Alice'   │ null       │ 1         │
│ 1       │ 2  │ 'Bob'     │ 1          │ 2         │
│ 2       │ 3  │ 'Charlie' │ 1          │ 2         │
│ 3       │ 4  │ 'David'   │ 2          │ 3         │
│ 4       │ 5  │ 'Eve'     │ 2          │ 3         │
│ 5       │ 6  │ 'Frank'   │ 4          │ 4         │
└─────────┴────┴───────────┴────────────┴───────────┘
```

---

## How to Test
1. Open `starter.sql` and write your recursive CTE.
2. Inspect output visually:
   ```bash
   node runner.js 2 --run
   ```
3. Run automated tests:
   ```bash
   node runner.js 2
   ```
