# SQL Drill 01: Department Summary Multi-Aggregates (Q10)

## Problem Description
You are given two tables: `departments` and `employees`.

Write a SQL query to compute departmental salary statistics across all departments:
1. Department Name (`department_name`)
2. Total Employee Headcount (`employee_count`)
3. Average Salary rounded to 2 decimal places (`avg_salary`)
4. Minimum Salary (`min_salary`)
5. Maximum Salary (`max_salary`)

### Requirements & Edge Cases
- Departments with **zero employees** must still be included in the output! For such departments:
  - `employee_count` must be `0`.
  - `avg_salary`, `min_salary`, and `max_salary` must be `0` (use `COALESCE`).
- Results must be ordered by `department_id ASC`.

---

## Schema Setup

### `departments`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Unique department ID |
| `name` | TEXT | Department name |

### `employees`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Unique employee ID |
| `name` | TEXT | Employee name |
| `salary` | INTEGER | Annual salary |
| `department_id` | INTEGER | Foreign key referencing `departments.id` |

---

## Expected Output
```
┌─────────────────┬────────────────┬────────────┬────────────┬────────────┐
│ department_name │ employee_count │ avg_salary │ min_salary │ max_salary │
├─────────────────┼────────────────┼────────────┼────────────┼────────────┤
│ Engineering     │ 3              │ 85000.00   │ 70000      │ 100000     │
│ Marketing       │ 2              │ 57500.00   │ 55000      │ 60000      │
│ Sales           │ 1              │ 90000.00   │ 90000      │ 90000      │
│ Human Resources │ 0              │ 0          │ 0          │ 0          │
└─────────────────┴────────────────┴────────────┴────────────┴────────────┘
```

---

## How to Test
1. Open `starter.sql` and write your SQL query.
2. Inspect output visually:
   ```bash
   node runner.js 1 --run
   ```
3. Run automated tests:
   ```bash
   node runner.js 1
   ```
