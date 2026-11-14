# SQL Drill 03: Partitioned Running Cumulative Sum (Q26)

## Problem Description
You are given a table `transactions` tracking customer purchases across different categories.

Write a SQL query using window functions to calculate the running cumulative total of transaction amounts, partitioned by category and ordered chronologically by transaction date.

### Requirements:
For every transaction, return:
1. `category`: Product category
2. `txn_date`: Transaction date (`YYYY-MM-DD`)
3. `amount`: Individual transaction amount
4. `cumulative_amount`: The running cumulative sum of amounts within that category up to and including the current row.

Deterministic Ordering: Order partitions by `category ASC`, `txn_date ASC`, and `id ASC`.

---

## Schema Setup

### `transactions`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Transaction ID |
| `category` | TEXT | Category name |
| `txn_date` | TEXT | Date string |
| `amount` | INTEGER | Transaction amount |

---

## Expected Output
```
┌─────────┬──────────────┬──────────────┬────────┬───────────────────┐
│ (index) │ category     │ txn_date     │ amount │ cumulative_amount │
├─────────┼──────────────┼──────────────┼────────┼───────────────────┤
│ 0       │ 'Books'      │ '2026-01-02' │ 30     │ 30                │
│ 1       │ 'Books'      │ '2026-01-05' │ 45     │ 75                │
│ 2       │ 'Books'      │ '2026-01-10' │ 25     │ 100               │
│ 3       │ 'Electronic' │ '2026-01-01' │ 500    │ 500               │
│ 4       │ 'Electronic' │ '2026-01-03' │ 200    │ 700               │
│ 5       │ 'Electronic' │ '2026-01-07' │ 300    │ 1000              │
└─────────┴──────────────┴──────────────┴────────┴───────────────────┘
```

---

## How to Test
1. Open `starter.sql` and write your SQL query.
2. Inspect output visually:
   ```bash
   node runner.js 3 --run
   ```
3. Run automated tests:
   ```bash
   node runner.js 3
   ```
