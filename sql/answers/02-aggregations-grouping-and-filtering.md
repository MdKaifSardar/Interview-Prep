[⬅️ Previous: 01 · Foundations & Execution Order](01-sql-foundations-and-execution-order.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · JOIN Mechanics & Queries ➡️](03-joins-and-multi-table-queries.md)

---

## 2. Aggregations, Grouping & Multi-Condition Filtering

### 6. 🔴 P0 [C] What is the difference between the `WHERE` clause and the `HAVING` clause, and when must filtering happen before vs after grouping?

> **TL;DR:** `WHERE` filters individual rows **before** aggregation and cannot reference aggregate functions. `HAVING` filters aggregated groups **after** `GROUP BY` has executed and can inspect aggregate expressions like `COUNT(*)` or `SUM(amount)`.

#### 💡 Core Concept & Explanation
Filter as early as possible. If a filter can be applied to individual rows (e.g. `status = 'shipped'` or `created_at >= '2026-01-01'`), always put it in the `WHERE` clause. This reduces the number of rows the engine must buffer, sort, and aggregate into hash tables. Reserve `HAVING` strictly for criteria that evaluate summary properties across multiple rows.

#### 🛠️ Code / Visual Diagram / Table

| Feature | `WHERE` Clause | `HAVING` Clause |
|---|---|---|
| **Execution Point** | Step 3 (Before `GROUP BY`) | Step 5 (After `GROUP BY`) |
| **Filters On** | Individual source rows | Summary group buckets |
| **Aggregates Allowed?** | ❌ No (`WHERE SUM(x) > 10` throws error) | ✅ Yes (`HAVING SUM(x) > 10`) |
| **Index Usage** | Can use B-Tree indexes for fast seeks | Cannot use indexes (evaluates computed summaries) |

```sql
-- Filter orders from 2026 (WHERE), group by customer, and keep customers with > 5 orders (HAVING):
SELECT customer_id, COUNT(*) AS total_orders, SUM(order_total) AS total_spend
FROM orders
WHERE order_date >= '2026-01-01'  -- Row-level filter (Fast index scan)
GROUP BY customer_id
HAVING COUNT(*) > 5               -- Group-level summary filter
ORDER BY total_spend DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Never write `HAVING order_date >= '2026-01-01'` if `order_date` is not aggregated! Even though some engines permit non-aggregate columns in `HAVING` if they are in `GROUP BY`, forcing the database to aggregate all historical orders before discarding them causes massive performance degradation.

---

---

### 7. 🔴 P0 [C] What is the difference between `COUNT(*)`, `COUNT(column)`, `COUNT(1)`, and `COUNT(DISTINCT column)` in execution and NULL handling?

> **TL;DR:** `COUNT(*)` and `COUNT(1)` count all rows in the partition regardless of column contents (including rows containing `NULL`s). `COUNT(column)` counts only rows where the specified column is `NOT NULL`. `COUNT(DISTINCT column)` counts only unique, non-null values.

#### 💡 Core Concept & Explanation
Modern database query optimizers (PostgreSQL, MySQL InnoDB, SQL Server) optimize `COUNT(*)` and `COUNT(1)` into the exact same internal execution plan. Neither evaluates column values; they count matching slot pointers in the index or table.
In contrast, `COUNT(column)` must inspect every single row to verify whether `column IS NOT NULL`.

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE scores (
    id INT,
    player VARCHAR(20),
    points INT
);

INSERT INTO scores VALUES
(1, 'Alice', 100),
(2, 'Bob', NULL),
(3, 'Charlie', 100),
(4, 'Diana', NULL);

SELECT 
    COUNT(*) AS count_star,          -- 4 (all rows)
    COUNT(1) AS count_one,           -- 4 (all rows, identical to COUNT(*))
    COUNT(points) AS count_col,      -- 2 (ignores Bob & Diana)
    COUNT(DISTINCT points) AS count_dist -- 1 (only the single distinct value: 100)
FROM scores;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Debunk the myth: `COUNT(1)` is **not faster** than `COUNT(*)`. In fact, in modern SQL standards, `COUNT(*)` is the canonical, optimized representation. Always write `COUNT(*)` for clarity.

---

---

### 8. 🔴 P0 [Q] How does multi-column `GROUP BY` work, and why must every column in the `SELECT` list either appear in `GROUP BY` or inside an aggregate function?

> **TL;DR:** Multi-column `GROUP BY A, B` collapses records into unique composite pairs `(A, B)`. In standard SQL, selecting an unaggregated column `C` outside the `GROUP BY` is illegal because a single group `(A, B)` could contain multiple conflicting values of `C`, creating non-deterministic results.

#### 💡 Core Concept & Explanation
When grouping rows, each resulting output row represents an entire bucket of records. If department 10 has 50 employees, selecting `department_id, employee_name, AVG(salary) GROUP BY department_id` forces the engine to pick one name out of 50. Relational mathematics disallows this ambiguity.
- **Functional Dependency Exception (ANSI SQL-99):** If you group by the table's Primary Key (e.g. `GROUP BY user.id`), modern PostgreSQL allows selecting `user.name` and `user.email` without explicit grouping because the primary key uniquely identifies all attributes of that entity.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Grouping by Year and Category:
SELECT 
    EXTRACT(YEAR FROM sale_date) AS sale_year,
    category_id,
    SUM(amount) AS total_revenue,
    COUNT(*) AS transactions_count
FROM sales
GROUP BY EXTRACT(YEAR FROM sale_date), category_id
ORDER BY sale_year DESC, total_revenue DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Older versions of MySQL allowed `ONLY_FULL_GROUP_BY` to be disabled, returning an arbitrary row value for non-grouped columns. Always emphasize in interviews that standard SQL requires strict grouping or functional dependency on the primary key to ensure deterministic queries.

---

---

### 9. 🔴 P0 [Q] What is Conditional Aggregation, and how do you use `CASE WHEN` inside `SUM()` or `COUNT()` to compute pivot metrics in a single table scan?

> **TL;DR:** Conditional Aggregation embeds boolean `CASE WHEN` statements inside aggregate functions (e.g. `SUM(CASE WHEN condition THEN 1 ELSE 0 END)`). This calculates multiple distinct metric subsets across a single table scan instead of executing multiple separate queries.

#### 💡 Core Concept & Explanation
Instead of running 3 separate queries with different `WHERE` clauses:
`SELECT COUNT(*) FROM orders WHERE status = 'delivered'`
`SELECT COUNT(*) FROM orders WHERE status = 'cancelled'`
`SELECT COUNT(*) FROM orders WHERE status = 'refunded'`
Conditional aggregation evaluates all 3 in a single pass over the table.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema & Query
SELECT 
    vendor_id,
    COUNT(*) AS total_orders,
    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) AS completed_volume,
    SUM(CASE WHEN status = 'refunded' THEN amount ELSE 0 END) AS refunded_volume,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_orders,
    ROUND(
        100.0 * COUNT(CASE WHEN status = 'completed' THEN 1 END) / COUNT(*), 
        2
    ) AS completion_rate_pct
FROM orders
GROUP BY vendor_id;
```

```
Output Table:
| vendor_id | total_orders | completed_volume | refunded_volume | completed_orders | completion_rate_pct |
|-----------|--------------|------------------|-----------------|------------------|---------------------|
| 10        | 500          | $45,200.00       | $1,800.00       | 460              | 92.00%              |
| 20        | 320          | $28,900.00       | $4,100.00       | 272              | 85.00%              |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL, you can use the cleaner ANSI SQL standard `FILTER` clause:
  `SUM(amount) FILTER (WHERE status = 'completed') AS completed_volume`.
  In MySQL and general SQL, use `CASE WHEN`. Notice that with `COUNT`, omitting `ELSE` defaults to `NULL`, and `COUNT` ignores `NULL`s: `COUNT(CASE WHEN is_vip THEN 1 END)`.

---

---

### 10. 🔴 P0 [Q] Write a query to calculate the average, minimum, maximum salary, and employee headcount for each department.

> **TL;DR:** Join `departments` to `employees` using a `LEFT JOIN` (to preserve departments with zero employees), then aggregate using `COUNT(e.id)`, `AVG(e.salary)`, `MIN(e.salary)`, and `MAX(e.salary)`.

#### 💡 Core Concept & Explanation
Using `INNER JOIN` will drop departments that currently have no hired staff. Using `LEFT JOIN` ensures every department appears in the report. When counting employees in a left join, use `COUNT(e.id)` rather than `COUNT(*)` so empty departments report 0 employees instead of 1.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT,
    salary NUMERIC(10, 2)
);

-- Query:
SELECT 
    d.id AS department_id,
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    COALESCE(ROUND(AVG(e.salary), 2), 0) AS avg_salary,
    COALESCE(MIN(e.salary), 0) AS min_salary,
    COALESCE(MAX(e.salary), 0) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY employee_count DESC, avg_salary DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always wrap `AVG(e.salary)` in `COALESCE(..., 0)` or `ROUND(..., 2)`. In financial reporting, raw floating-point averages with 14 decimal places create rendering issues and look unprofessional.

---

---

[⬅️ Previous: 01 · Foundations & Execution Order](01-sql-foundations-and-execution-order.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · JOIN Mechanics & Queries ➡️](03-joins-and-multi-table-queries.md)
