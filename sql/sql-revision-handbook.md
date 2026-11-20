# SQL Fundamentals & Core Query Syntax — Pre-Interview Revision Handbook

> A pure SQL fundamentals cheat sheet and reference manual. Designed for rapid pre-interview review of query execution order, join mechanics, three-valued NULL logic, window functions, aggregations, and edge-case pitfalls. Zero academic jargon — pure practical basics.

---

## Quick Navigation Index

1. [The True SQL Execution Order](#1-the-true-sql-execution-order)
2. [Three-Valued Logic, NULLs & Safe Coalescing](#2-three-valued-logic-nulls--safe-coalescing)
3. [Filtering, Pattern Matching & Sorting](#3-filtering-pattern-matching--sorting)
4. [Aggregation & The Golden Rule of `GROUP BY`](#4-aggregation--the-golden-rule-of-group-by)
5. [Complete JOIN Mechanics & Mental Models](#5-complete-join-mechanics--mental-models)
6. [Subqueries vs Common Table Expressions (CTEs)](#6-subqueries-vs-common-table-expressions-ctes)
7. [Window Functions — Ranking, Offsets & Running Totals](#7-window-functions--ranking-offsets--running-totals)
8. [Conditional Logic, Pivoting & Data Cleaning](#8-conditional-logic-pivoting--data-cleaning)
9. [Set Operations (`UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`)](#9-set-operations-union-union-all-intersect-except)
10. [DDL, DML & Schema Integrity Quick Reference](#10-ddl-dml--schema-integrity-quick-reference)

---

## 1. The True SQL Execution Order

SQL is a **declarative** language: you write what you want, but the database engine evaluates clauses in a strict physical sequence that differs drastically from the written syntax.

### Written Order vs Actual Execution Order

| Written (Lexical) Order | Actual Physical Execution Order | What Happens at This Step |
| :--- | :--- | :--- |
| `1. SELECT` | **`1. FROM`** | Identify source tables and establish base row-set |
| `2. FROM` | **`2. ON / JOIN`** | Evaluate join conditions and bind connected tables |
| `3. WHERE` | **`3. WHERE`** | Filter individual rows *before* any grouping occurs |
| `4. GROUP BY` | **`4. GROUP BY`** | Collapse matching rows into aggregate buckets |
| `5. HAVING` | **`5. HAVING`** | Filter aggregated buckets (cannot filter individual rows) |
| `6. WINDOW` | **`6. WINDOW`** | Compute window functions across partitions / frames |
| `7. ORDER BY` | **`7. SELECT`** | Evaluate expressions, pick output columns, assign aliases |
| `8. LIMIT / OFFSET` | **`8. DISTINCT`** | Deduplicate remaining result rows |
| | **`9. ORDER BY`** | Sort final output records |
| | **`10. LIMIT / OFFSET`** | Discard rows outside requested pagination range |

### The Two Most Common Interview Trap Questions

#### Trap A: Using a `SELECT` alias in a `WHERE` clause
```sql
-- ❌ ERROR: Column 'annual_comp' does not exist in WHERE
SELECT employee_id, salary * 12 AS annual_comp
FROM employees
WHERE annual_comp > 100000;

-- ✅ CORRECT: Must repeat expression or wrap in a subquery/CTE
SELECT employee_id, salary * 12 AS annual_comp
FROM employees
WHERE (salary * 12) > 100000;
```
*Why?* `WHERE` (Step 3) executes **before** `SELECT` (Step 7). The engine has not yet created the alias `annual_comp` when filtering rows.

#### Trap B: Using a `SELECT` alias in an `ORDER BY` clause
```sql
-- ✅ VALID: Works flawlessly in all SQL engines
SELECT employee_id, salary * 12 AS annual_comp
FROM employees
ORDER BY annual_comp DESC;
```
*Why?* `ORDER BY` (Step 9) executes **after** `SELECT` (Step 7). The alias is fully defined and available for sorting.

> ⚠️ **Don't Forget:** `WHERE` discards rows before grouping (fast, reduces memory); `HAVING` discards groups after aggregating (slower, requires full grouping pass). Never put a non-aggregate filter in `HAVING`.

---

## 2. Three-Valued Logic, NULLs & Safe Coalescing

In SQL, `NULL` does **not** equal `0`, empty string `""`, or false. `NULL` represents an **unknown, missing, or inapplicable value**.

### Three-Valued Logic Truth Table

SQL boolean operations evaluate to one of three states: `TRUE`, `FALSE`, or `UNKNOWN`.

| Expression | Evaluates To | Explanation |
| :--- | :--- | :--- |
| `5 = 5` | `TRUE` | Known values match |
| `5 = NULL` | **`UNKNOWN`** | You cannot verify equality with an unknown value |
| `NULL = NULL` | **`UNKNOWN`** | Two unknowns are never assumed equal |
| `NULL != NULL` | **`UNKNOWN`** | Cannot verify inequality either |
| `col IS NULL` | `TRUE` / `FALSE` | Explicit check for the presence of NULL |
| `col IS NOT NULL` | `TRUE` / `FALSE` | Explicit check for non-NULL values |

```sql
-- ❌ WRONG: Returns 0 rows (always evaluates to UNKNOWN)
SELECT * FROM users WHERE phone_number = NULL;

-- ✅ CORRECT:
SELECT * FROM users WHERE phone_number IS NULL;
SELECT * FROM users WHERE phone_number IS NOT NULL;
```

---

### The Fatal `NOT IN` with NULL Trap

This is one of the most frequent SQL trick questions in technical interviews:

```sql
-- Imagine Table B contains IDs: (1, 2, NULL)
SELECT * 
FROM table_a 
WHERE id NOT IN (SELECT id FROM table_b);
```
**Result**: Returns **0 rows**, even if `table_a` contains valid IDs like `3, 4, 5`!

**Why?**
The expression expands under the hood to:
`id != 1 AND id != 2 AND id != NULL`
Since `id != NULL` evaluates to `UNKNOWN`, the entire `AND` chain evaluates to `UNKNOWN`. SQL `WHERE` clauses **only keep rows where the condition evaluates to `TRUE`** (not `FALSE`, and not `UNKNOWN`).

#### The Fix: Use `NOT EXISTS` or filter NULLs
```sql
-- ✅ Fix Option 1: Safe NOT EXISTS (Recommended)
SELECT a.*
FROM table_a a
WHERE NOT EXISTS (
    SELECT 1 FROM table_b b WHERE b.id = a.id
);

-- ✅ Fix Option 2: Exclude NULL from subquery
SELECT *
FROM table_a
WHERE id NOT IN (
    SELECT id FROM table_b WHERE id IS NOT NULL
);
```

---

### Handling Missing Data: `COALESCE` vs `NULLIF`

```sql
-- 1. COALESCE: Returns the FIRST non-NULL argument from left to right
SELECT COALESCE(preferred_name, first_name, 'Guest') AS display_name
FROM users;

-- 2. NULLIF(a, b): Returns NULL if a == b; otherwise returns a
-- Essential for preventing "Division by Zero" crashes!
SELECT 
    total_sales,
    total_orders,
    total_sales / NULLIF(total_orders, 0) AS avg_order_value
FROM store_stats;
-- If total_orders is 0, NULLIF returns NULL. 
-- Any number / NULL safely evaluates to NULL instead of throwing a fatal runtime error!
```

> ⚠️ **Don't Forget:** `COUNT(*)` counts rows including NULLs. `COUNT(column_name)` counts non-NULL values only. `AVG(column_name)` completely ignores NULL rows (it does not treat them as 0).

---

## 3. Filtering, Pattern Matching & Sorting

### Comparison & Range Predicates

```sql
-- Inclusive range: [50, 100]
SELECT * FROM products WHERE price BETWEEN 50 AND 100;

-- Equivalent to:
SELECT * FROM products WHERE price >= 50 AND price <= 100;

-- Multiple exact matches:
SELECT * FROM orders WHERE status IN ('Shipped', 'Delivered', 'Processing');
```

### Pattern Matching (`LIKE` & `ILIKE`)

| Wildcard | Meaning | Example Pattern | Matches | Does NOT Match |
| :--- | :--- | :--- | :--- | :--- |
| `%` | **Zero or more** characters | `'J%n'` | `'Jan'`, `'John'`, `'Jn'` | `'Jack'` |
| `_` | **Exactly one** character | `'J_n'` | `'Jan'`, `'Jon'`, `'J1n'` | `'John'`, `'Jn'` |

```sql
-- Standard case-sensitive pattern matching:
SELECT * FROM customers WHERE email LIKE '%@gmail.com';

-- Starts with 'A' and at least 3 characters long:
SELECT * FROM customers WHERE name LIKE 'A__%';

-- Case-insensitive pattern matching (PostgreSQL / SQLite):
SELECT * FROM customers WHERE name ILIKE 'alice%';
-- (In MySQL, LIKE is case-insensitive by default depending on collation)
```

### Sorting & Custom NULL Placement

By default:
- `ASC`: Smallest to largest (A &rarr; Z, 0 &rarr; 9).
- `DESC`: Largest to smallest (Z &rarr; A, 9 &rarr; 0).

```sql
-- Sort by department ascending, then salary descending
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- Controlling where NULL values appear:
SELECT name, bonus
FROM employees
ORDER BY bonus DESC NULLS LAST; -- Pushes NULL bonuses to the very bottom

SELECT name, bonus
FROM employees
ORDER BY bonus ASC NULLS FIRST;  -- Places NULL bonuses at the very top
```

### Pagination (`LIMIT` & `OFFSET`)

```sql
-- Page formula: LIMIT = page_size, OFFSET = (page_number - 1) * page_size
-- Fetch Page 3 (Rows 21 to 30, assuming 10 per page):
SELECT id, title
FROM articles
ORDER BY published_at DESC
LIMIT 10 OFFSET 20;
```

---

## 4. Aggregation & The Golden Rule of `GROUP BY`

Aggregate functions summarize multiple rows into a single scalar result.

### Aggregate Functions Summary

| Function | What It Calculates | NULL Handling |
| :--- | :--- | :--- |
| `COUNT(*)` | Total number of rows returned | Counts rows **including** all NULLs |
| `COUNT(col)` | Number of values in `col` | **Ignores** NULLs |
| `COUNT(DISTINCT col)` | Number of unique non-NULL values | **Ignores** NULLs |
| `SUM(col)` | Arithmetic total of values | **Ignores** NULLs (returns `NULL` if all are NULL) |
| `AVG(col)` | Arithmetic mean (`SUM / COUNT`) | **Ignores** NULLs (divides by count of non-NULLs!) |
| `MIN(col)` / `MAX(col)` | Minimum / Maximum value | **Ignores** NULLs |

```sql
-- Example table: Salaries (100, 200, NULL)
SELECT 
    COUNT(*) AS cnt_all,             -- Result: 3
    COUNT(salary) AS cnt_salary,     -- Result: 2
    COUNT(DISTINCT salary) AS cnt_u, -- Result: 2
    SUM(salary) AS sum_sal,          -- Result: 300
    AVG(salary) AS avg_sal           -- Result: 150 (300 / 2, NOT 300 / 3!)
FROM test_table;
```

---

### The Golden Rule of `GROUP BY`

> 🔑 **THE CARDINAL RULE:**
> Every single column present in your `SELECT` clause that is **not enclosed inside an aggregate function** MUST be explicitly listed in your `GROUP BY` clause.

```sql
-- ❌ SYNTAX ERROR in standard SQL: 'department' is not aggregated and missing from GROUP BY
SELECT department, job_title, AVG(salary)
FROM employees
GROUP BY department; 

-- ✅ CORRECT:
SELECT department, job_title, AVG(salary) AS avg_salary
FROM employees
GROUP BY department, job_title;
```

---

### `WHERE` vs `HAVING`

| Feature | `WHERE` | `HAVING` |
| :--- | :--- | :--- |
| **Operates On** | Individual rows | Grouped / aggregated buckets |
| **Timing** | *Before* grouping & aggregating | *After* grouping & aggregating |
| **Can use aggregates?** | ❌ Never (`WHERE AVG(sal) > 50` is illegal) | ✅ Yes (`HAVING AVG(sal) > 50`) |
| **Can use non-aggregates?** | ✅ Yes | ⚠️ Legal if grouped, but poor practice (use `WHERE`) |

```sql
-- Find departments with > 5 senior engineers having average salary > $120,000:
SELECT department, AVG(salary) AS avg_salary, COUNT(*) AS head_count
FROM employees
WHERE title = 'Senior Engineer'   -- 1. Row filter BEFORE grouping
GROUP BY department
HAVING COUNT(*) > 5              -- 2. Aggregate filter AFTER grouping
   AND AVG(salary) > 120000;
```

---

## 5. Complete JOIN Mechanics & Mental Models

Joins combine columns from two or more tables based on a related column.

```
Table A (Users)          Table B (Orders)
+----+-------+          +----+---------+--------+
| id | name  |          | id | user_id | amount |
+----+-------+          +----+---------+--------+
| 1  | Alice |          | 10 | 1       | 50     |
| 2  | Bob   |          | 20 | 1       | 150    |
| 3  | Carol |          | 30 | 4       | 300    |
+----+-------+          +----+---------+--------+
```

### The 6 Core Join Types

#### 1. `INNER JOIN` (Intersection Only)
Returns rows that have matching values in **both** tables.
```sql
SELECT u.name, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Output:
-- Alice | 50
-- Alice | 150
-- (Bob has no orders -> omitted. Order #30 has user_id 4 -> omitted.)
```

#### 2. `LEFT JOIN` / `LEFT OUTER JOIN` (All Left + Matched Right)
Returns **all** rows from the left table, plus matched columns from the right table. If no match exists, right columns are populated with `NULL`.
```sql
SELECT u.name, o.id AS order_id, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Output:
-- Alice | 10   | 50
-- Alice | 20   | 150
-- Bob   | NULL | NULL   <-- Preserved with NULLs
-- Carol | NULL | NULL   <-- Preserved with NULLs
```

#### 3. `RIGHT JOIN` / `RIGHT OUTER JOIN` (All Right + Matched Left)
Returns **all** rows from the right table, plus matched columns from the left table.
```sql
SELECT u.name, o.id AS order_id, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Output:
-- Alice | 10 | 50
-- Alice | 20 | 150
-- NULL  | 30 | 300   <-- Order #30 preserved with NULL user name
```

#### 4. `FULL OUTER JOIN` (Complete Union)
Returns all rows when there is a match in *either* left or right table.
```sql
SELECT u.name, o.amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- Output: All users and all orders, matching where possible, filling NULLs elsewhere.
```

#### 5. `CROSS JOIN` (Cartesian Product)
Pairs every row of Table A with every row of Table B ($M \times N$ total rows). No `ON` condition.
```sql
SELECT s.size, c.color
FROM sizes s
CROSS JOIN colors c;
-- 3 sizes * 4 colors = 12 total variations
```

#### 6. `SELF JOIN` (Joining Table to Itself)
Used to model hierarchical or sequential relationships within a single table.
```sql
-- Finding employee name and their direct manager's name:
SELECT 
    e.name AS employee_name,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
-- Top boss has manager_id NULL -> LEFT JOIN keeps them with NULL manager_name
```

---

### Critical Trap: Filtering in `ON` vs `WHERE` in Outer Joins

```sql
-- Query 1: Filter in the ON clause
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o 
    ON u.id = o.user_id 
   AND o.amount > 100;
-- Result: Keeps ALL users! Bob and Carol stay with NULL. 
-- Alice only joins orders > 100.

-- Query 2: Filter in the WHERE clause
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.amount > 100;
-- ⚠️ DANGER: Kills Bob and Carol! 
-- For Bob, o.amount is NULL. The WHERE check (NULL > 100) evaluates to UNKNOWN,
-- effectively turning this LEFT JOIN into an INNER JOIN!
```

### Classic Interview Pattern: Finding Unmatched / Orphan Records
```sql
-- Find all users who have NEVER placed an order:
SELECT u.id, u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL; -- Look for failed match on the right-hand primary key
```

---

## 6. Subqueries vs Common Table Expressions (CTEs)

### Subquery Types

1. **Scalar Subquery**: Returns exactly **1 row and 1 column**. Can be used wherever a literal value is expected (in `SELECT`, `WHERE`, `HAVING`).
   ```sql
   -- Find employees earning more than the company average:
   SELECT name, salary
   FROM employees
   WHERE salary > (SELECT AVG(salary) FROM employees);
   ```

2. **Multi-Row Subquery**: Returns 1 column with multiple rows. Evaluated using `IN`, `ANY`, `ALL`.
   ```sql
   SELECT name 
   FROM employees
   WHERE department_id IN (
       SELECT id FROM departments WHERE location = 'London'
   );
   ```

3. **Correlated Subquery**: References a column from the **outer query**. Evaluated once for *each candidate row* processed by the outer query.
   ```sql
   -- Find employees earning more than their own department's average:
   SELECT e.name, e.department_id, e.salary
   FROM employees e
   WHERE e.salary > (
       SELECT AVG(d.salary)
       FROM employees d
       WHERE d.department_id = e.department_id -- Outer reference
   );
   ```

---

### `EXISTS` vs `IN`

| Feature | `EXISTS` | `IN` |
| :--- | :--- | :--- |
| **Return Value** | Boolean (`TRUE` / `FALSE`) | Matches against a list of values |
| **Short-Circuit** | **Yes** (stops searching upon finding 1st match) | Scans all matching values in memory |
| **NULL Safety** | **100% Safe** with NULLs | Dangerous with `NOT IN` if subquery has NULLs |
| **Best Used When** | Subquery is correlated or right table is huge | Subquery returns a small, static literal set |

```sql
-- Efficient and NULL-safe:
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.id
);
```

---

### Common Table Expressions (CTEs)

A CTE (`WITH` clause) defines a temporary, named result set that lives only for the execution scope of that single query.

**Why use CTEs over nested subqueries?**
1. Readability: Linear, top-to-bottom reading order (no deep nesting).
2. Reusability: You can reference the same CTE multiple times in the main query.

```sql
WITH dept_averages AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
),
top_departments AS (
    SELECT department_id
    FROM dept_averages
    WHERE avg_sal > 80000
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
INNER JOIN dept_averages d ON e.department_id = d.department_id
WHERE e.department_id IN (SELECT department_id FROM top_departments);
```

---

## 7. Window Functions — Ranking, Offsets & Running Totals

> 🧠 **Mental Model:**
> - `GROUP BY` collapses $N$ rows into $1$ row per group.
> - **Window functions** compute values across a partition of rows, but **preserve every single row** in the final output.

### Syntax Anatomy
```sql
FUNCTION() OVER (
    PARTITION BY partition_col   -- Optional: Resets calculation per group
    ORDER BY sort_col [ASC|DESC] -- Determines sequence within partition
    [ROWS BETWEEN ...]           -- Optional: Sliding window frame specification
)
```

---

### The Big Three Ranking Functions

| Function | Ties Behavior | Gaps in Sequence? | Example on Scores: [100, 100, 90, 80] |
| :--- | :--- | :--- | :--- |
| **`ROW_NUMBER()`** | Sequential unique integers (arbitrary tie-break) | **No** gaps | `1, 2, 3, 4` |
| **`RANK()`** | Ties get same rank; skips subsequent ranks | **Yes** gaps | `1, 1, 3, 4` *(rank 2 skipped!)* |
| **`DENSE_RANK()`** | Ties get same rank; does NOT skip ranks | **No** gaps | `1, 1, 2, 3` |

```sql
SELECT 
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rnk
FROM employees;
```

#### The Ultimate Interview Pattern: Nth Highest Salary
```sql
-- Find the 2nd highest salary in each department:
WITH ranked_salaries AS (
    SELECT 
        name, department, salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
    FROM employees
)
SELECT name, department, salary
FROM ranked_salaries
WHERE rnk = 2;
-- Using DENSE_RANK guarantees that if two employees tie for #1, 
-- the next highest salary is properly ranked #2 (not skipped to #3)!
```

---

### Offset Functions: `LAG` & `LEAD`

Used to compare a current row against its predecessor or successor without performing self-joins.

- `LAG(col, offset, default_val)`: Look **backwards** by `offset` rows (default offset = 1).
- `LEAD(col, offset, default_val)`: Look **forwards** by `offset` rows.

```sql
-- Calculate month-over-month revenue growth:
SELECT 
    month,
    revenue,
    LAG(revenue, 1, 0) OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue, 1, revenue) OVER (ORDER BY month) AS mom_diff
FROM monthly_sales;
```

---

### Running Totals & Window Frame Specifications

```sql
-- Running total of deposits per account:
SELECT 
    account_id,
    txn_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY account_id 
        ORDER BY txn_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_balance
FROM transactions;
```

#### Common Frame Specifications Cheat Sheet:
- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`: From partition start up to current row (default running total).
- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`: 3-row moving average/total (current + 2 before).
- `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`: Centered 3-row window.
- `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`: Entire partition sum on every row.

---

## 8. Conditional Logic, Pivoting & Data Cleaning

### The `CASE WHEN` Expression

```sql
SELECT 
    id,
    name,
    score,
    CASE 
        WHEN score >= 90 THEN 'Tier 1 - Excellent'
        WHEN score >= 75 THEN 'Tier 2 - Good'
        WHEN score >= 50 THEN 'Tier 3 - Pass'
        ELSE 'Tier 4 - Fail'
    END AS performance_bracket
FROM students;
```

### Conditional Aggregation (Pivoting Rows into Columns)

A premier interview skill: turning categorical row values into distinct report columns without vendor-specific pivot plugins.

```sql
-- Convert transaction status rows into distinct summary columns per user:
SELECT 
    user_id,
    COUNT(*) AS total_transactions,
    SUM(CASE WHEN status = 'COMPLETED' THEN amount ELSE 0 END) AS completed_volume,
    SUM(CASE WHEN status = 'REFUNDED'  THEN amount ELSE 0 END) AS refunded_volume,
    SUM(CASE WHEN status = 'FAILED'    THEN 1      ELSE 0 END) AS failed_count
FROM payments
GROUP BY user_id;
```

---

### String Cleaning Primitives

| Operation | Syntax (Standard SQL / Dialects) | Example Input $\rightarrow$ Output |
| :--- | :--- | :--- |
| **Concatenation** | `CONCAT(a, ' ', b)` or `a \|\| ' ' \|\| b` | `'John'`, `'Doe'` $\rightarrow$ `'John Doe'` |
| **Substring** | `SUBSTRING(str FROM pos FOR len)` or `SUBSTR(str, pos, len)` | `SUBSTRING('Hello', 1, 4)` $\rightarrow$ `'Hell'` *(1-indexed!)* |
| **Length** | `LENGTH(str)` or `LEN(str)` | `LENGTH('SQL')` $\rightarrow$ `3` |
| **Trim Whitespace** | `TRIM(str)`, `LTRIM(str)`, `RTRIM(str)` | `TRIM('  hi  ')` $\rightarrow$ `'hi'` |
| **Case Conversion** | `LOWER(str)`, `UPPER(str)` | `LOWER('Apple')` $\rightarrow$ `'apple'` |
| **Replace** | `REPLACE(str, search, replace_with)` | `REPLACE('A-B-C', '-', ':')` $\rightarrow$ `'A:B:C'` |

> ⚠️ **Don't Forget:** SQL strings are **1-indexed**, not 0-indexed! `SUBSTRING('Data', 1, 2)` returns `'Da'`.

---

### Date & Time Arithmetic

```sql
-- Current timestamp / date:
CURRENT_DATE;        -- e.g., '2026-10-30'
CURRENT_TIMESTAMP;   -- e.g., '2026-10-30 14:20:00'

-- Extracting sub-components:
EXTRACT(YEAR FROM order_date);
EXTRACT(MONTH FROM order_date);

-- Adding intervals (PostgreSQL / MySQL):
order_date + INTERVAL '7 DAY';               -- PostgreSQL
DATE_ADD(order_date, INTERVAL 7 DAY);        -- MySQL

-- Day difference between two dates:
DATEDIFF(end_date, start_date);              -- MySQL
end_date - start_date;                       -- PostgreSQL / Oracle
```

---

## 9. Set Operations (`UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`)

Set operations combine the results of **two or more independent `SELECT` queries** into a single result set vertically.

```
Set A: {1, 2, 3}       Set B: {2, 3, 4}

UNION:       {1, 2, 3, 4}      (Deduped)
UNION ALL:   {1, 2, 3, 2, 3, 4} (Duplicates preserved)
INTERSECT:   {2, 3}            (Common to both)
EXCEPT:      {1}               (In A, but NOT in B)
```

### The Cardinal Rules of Set Operations
1. Each query must have the **exact same number of columns**.
2. Corresponding columns must have **compatible data types** in order.
3. The column names of the final result are determined by the **first query**.

```sql
-- UNION vs UNION ALL:
SELECT customer_id FROM web_orders
UNION ALL -- Fast! Appends rows without sorting or deduplicating
SELECT customer_id FROM store_orders;

SELECT customer_id FROM web_orders
UNION     -- Slower! Forces distinct sort to discard duplicate customer_ids
SELECT customer_id FROM store_orders;
```

> ⚠️ **Performance Rule:** Always prefer `UNION ALL` over `UNION` unless business logic strictly requires deduplicating rows. `UNION` performs an expensive in-memory/disk sort to remove duplicates.

---

## 10. DDL, DML & Schema Integrity Quick Reference

### DDL: Definition Primitives

```sql
-- Create table with constraints:
CREATE TABLE employees (
    id            INT PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    salary        DECIMAL(10, 2) CHECK (salary >= 0),
    department_id INT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dept FOREIGN KEY (department_id) 
        REFERENCES departments(id) 
        ON DELETE CASCADE -- If department deleted, automatically delete its employees
);
```

### Foreign Key Cascade Actions:
- `ON DELETE CASCADE`: Deleting parent row deletes all connected child rows.
- `ON DELETE SET NULL`: Deleting parent row sets child foreign keys to `NULL`.
- `ON DELETE RESTRICT` / `NO ACTION`: Prevents deleting parent row if any child rows reference it.

---

### `TRUNCATE` vs `DELETE` vs `DROP` (Classic Interview Question)

| Operation | Command Type | Can have `WHERE`? | Speed | Rollback Support | Auto-Increment Reset? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`DELETE`** | DML | **Yes** (`DELETE FROM t WHERE ...`) | Slow (logs row-by-row deletions) | ✅ Supported in transactions | ❌ Does not reset counter |
| **`TRUNCATE`** | DDL | **No** (wipes whole table) | Ultra-fast (deallocates data pages) | ⚠️ Engine dependent (not in MySQL) | ✅ Resets counter to 1 |
| **`DROP`** | DDL | **No** | Instantaneous | Completely destroys table & schema | Completely removed |

---

### DML: Manipulation Primitives

```sql
-- 1. INSERT:
INSERT INTO employees (id, email, salary, department_id)
VALUES (1, 'alice@work.com', 95000.00, 10);

-- Bulk insert from query:
INSERT INTO archived_orders
SELECT * FROM orders WHERE order_date < '2024-01-01';

-- 2. UPDATE (Always double-check your WHERE clause!):
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 10;

-- 3. DELETE (Always double-check your WHERE clause!):
DELETE FROM employees
WHERE id = 1;
```

---

## Pre-Interview Checklist: Top 5 Traps to Mentally Rehearse

1. **`WHERE` vs `HAVING`**: Did you filter non-aggregates in `WHERE` and grouped aggregates in `HAVING`?
2. **`NOT IN` with `NULL`**: Did you protect subqueries with `IS NOT NULL` or use `NOT EXISTS`?
3. **Division by Zero**: Did you wrap denominators in `NULLIF(col, 0)`?
4. **`GROUP BY` Missing Columns**: Are all non-aggregated `SELECT` columns included in `GROUP BY`?
5. **Outer Join Filtering**: Did you filter the optional table inside `ON` rather than `WHERE` to prevent accidentally turning your `LEFT JOIN` into an `INNER JOIN`?
