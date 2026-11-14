# SQL Drill 05: 12-Month Financial Pivot (Q35)

## Problem Description
You are given an `orders` table tracking product sales across multiple dates.

Write a standard SQL query using **conditional aggregation** (`CASE WHEN` inside `SUM()`) to pivot monthly sales totals into 12 distinct month columns (`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`) plus a grand `Total_Sales` column for each product category.

### Requirements:
For every product category, return:
1. `category`: Product category name
2. `Jan` through `Dec`: Total sum of order amounts in each calendar month (use `0` if no sales occurred in that month)
3. `Total_Sales`: Total sum of all order amounts across the entire year for that category

Order results by `category ASC`.

### Syntax Note:
In standard ANSI SQL and SQLite, extract month via `strftime('%m', order_date)` (which yields `'01'`, `'02'`, ..., `'12'`).

---

## Schema Setup

### `orders`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Order ID |
| `category` | TEXT | Product category |
| `order_date` | TEXT | Order date (`YYYY-MM-DD`) |
| `amount` | INTEGER | Order revenue amount |

---

## Expected Output
```
┌─────────┬──────────────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────────────┐
│ (index) │ category     │ Jan │ Feb │ Mar │ Apr │ May │ Jun │ Jul │ Aug │ Sep │ Oct │ Nov │ Dec │ Total_Sales │
├─────────┼──────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────────────┤
│ 0       │ 'Books'      │ 50  │ 0   │ 100 │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 200 │ 350         │
│ 1       │ 'Electronic' │ 500 │ 300 │ 0   │ 400 │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 0   │ 1200        │
└─────────┴──────────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────────────┘
```

---

## How to Test
1. Open `starter.sql` and write your SQL query.
2. Inspect output visually:
   ```bash
   node runner.js 5 --run
   ```
3. Run automated tests:
   ```bash
   node runner.js 5
   ```
