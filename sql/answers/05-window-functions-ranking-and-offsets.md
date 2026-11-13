[⬅️ Previous: 04 · Subqueries & CTEs](04-subqueries-and-common-table-expressions.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Running Frames & Gaps/Islands ➡️](06-window-functions-running-aggregates-and-frames.md)

---

## 5. Window Functions — Ranking, Offsets & Partitions

### 21. 🔴 P0 [C] What are Window Functions in SQL, how does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`, and why don't window functions collapse rows?

> **TL;DR:** Window Functions perform calculations across a set of table rows related to the current row, but unlike `GROUP BY`, they **do not collapse** rows into a single summary tuple. Each input row retains its distinct individual identity while gaining access to partition-level aggregates and rankings.

#### 💡 Core Concept & Explanation
- **`GROUP BY`:** Collapses 100 rows from Department A into 1 summary row. You lose row-level access to individual employee names and IDs.
- **Window Function (`OVER` clause):** Retains all 100 individual employee rows, appending a new calculated column alongside each row (e.g. `salary - AVG(salary) OVER (PARTITION BY department_id)`).
- **Structure of the `OVER` clause:**
  - `PARTITION BY`: Divides rows into logical subsets (like groups).
  - `ORDER BY`: Defines the logical sequence of rows within each partition.
  - `ROWS/RANGE`: Defines the frame of visible rows relative to the current row.

#### 🛠️ Code / Visual Diagram / Table

```
GROUP BY (Collapses):
Input:  [Emp1: $5k, Dept 1], [Emp2: $7k, Dept 1]
Output: [Dept 1, Avg: $6k] (Individual employee rows are destroyed)

WINDOW FUNCTION (Preserves):
Input:  [Emp1: $5k, Dept 1], [Emp2: $7k, Dept 1]
Output: [Emp1, $5k, Dept Avg: $6k], [Emp2, $7k, Dept Avg: $6k] (Rows preserved!)
```

```sql
SELECT 
    id, 
    name, 
    department_id, 
    salary,
    AVG(salary) OVER(PARTITION BY department_id) AS dept_avg,
    salary - AVG(salary) OVER(PARTITION BY department_id) AS diff_from_avg
FROM employees;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Window functions are evaluated in **Phase 6 (`SELECT`)** of logical query execution. Therefore, window functions cannot be used directly in the `WHERE` or `HAVING` clause! To filter based on a window function result (e.g. `WHERE rank <= 3`), you must wrap the query in a CTE or subquery.

---

---

### 22. 🔴 P0 [Q] Explain the exact differences between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when duplicate values/ties occur.

> **LeetCode Reference:** [LC 178: Rank Scores](https://leetcode.com/problems/rank-scores/) [MEDIUM]  
> **TL;DR:**
> - `ROW_NUMBER()` assigns sequential, unique integers ($1, 2, 3, 4$), breaking ties arbitrarily.
> - `RANK()` assigns identical numbers to ties and **skips** subsequent ranks ($1, 2, 2, 4$).
> - `DENSE_RANK()` assigns identical numbers to ties and **never skips** ranks ($1, 2, 2, 3$).

#### 💡 Core Concept & Explanation
When ranking scores `[100, 90, 90, 80]`:
- `ROW_NUMBER()`: Always produces strict increments: $1, 2, 3, 4$.
- `RANK()`: Since two people tied for 2nd place, 3rd place is burned. The next score is 4th.
- `DENSE_RANK()`: Consecutive values are preserved without gaps. The score 80 is strictly 3rd place.

#### 🛠️ Code / Visual Diagram / Table

| Score | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` |
|---|---|---|---|
| **100** | 1 | 1 | 1 |
| **90** | 2 | 2 | 2 |
| **90** | 3 | 2 | 2 |
| **80** | 4 | 4 (Skips 3) | 3 (No gap!) |
| **70** | 5 | 5 | 4 |

```sql
SELECT 
    name, 
    score,
    ROW_NUMBER() OVER(ORDER BY score DESC) AS row_num,
    RANK()       OVER(ORDER BY score DESC) AS rnk,
    DENSE_RANK() OVER(ORDER BY score DESC) AS dense_rnk
FROM exam_results;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- When an interviewer asks: *"Find the 3rd highest salary"*, you **must use `DENSE_RANK()`**, NOT `RANK()` or `ROW_NUMBER()`. If there are ties for 1st or 2nd place, `LIMIT 1 OFFSET 2` or `ROW_NUMBER()` returns the wrong duplicate row, and `RANK()` might skip rank 3 completely!

---

---

### 23. 🔴 P0 [Q] How do offset window functions `LAG()` and `LEAD()` work, and how do you supply custom default fallback values for boundary rows?

> **LeetCode Reference:** [LC 180: Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/) [MEDIUM]  
> **TL;DR:** `LAG(col, offset, default)` fetches a column value from $offset$ rows **before** the current row. `LEAD(col, offset, default)` fetches from $offset$ rows **after**. Both accept an optional 3rd argument to replace the default `NULL` on boundary rows.

#### 💡 Core Concept & Explanation
Syntax: `LAG(expression [, offset [, default_value]]) OVER (...)`
- `offset`: Number of rows to look back (default is 1).
- `default_value`: Value returned if the offset falls outside the partition boundary (default is `NULL`).
This enables comparing consecutive data points (e.g. Day-over-Day, Year-over-Year, or previous user session) without writing costly self-joins.

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE daily_metrics (
    metric_date DATE PRIMARY KEY,
    signups INT
);

INSERT INTO daily_metrics VALUES
('2026-03-01', 100),
('2026-03-02', 120),
('2026-03-03', 115),
('2026-03-04', 150);

SELECT 
    metric_date,
    signups,
    LAG(signups, 1, 0) OVER(ORDER BY metric_date) AS prev_day_signups,
    signups - LAG(signups, 1, signups) OVER(ORDER BY metric_date) AS net_growth,
    LEAD(signups, 1) OVER(ORDER BY metric_date) AS next_day_signups
FROM daily_metrics;

-- Output:
-- | metric_date | signups | prev_day_signups | net_growth | next_day_signups |
-- |-------------|---------|------------------|------------|------------------|
-- | 2026-03-01  | 100     | 0                | 0          | 120              |
-- | 2026-03-02  | 120     | 100              | +20        | 115              |
-- | 2026-03-03  | 115     | 120              | -5         | 150              |
-- | 2026-03-04  | 150     | 115              | +35        | NULL             |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- The data type of the `default_value` must match the data type of the target column expression. Passing a string default `'0'` to an integer column will trigger a type conversion error in PostgreSQL.

---

---

### 24. 🔴 P0 [Q] Write a query to find the top 2 highest-paid employees in each department, properly handling ties.

> **LeetCode Reference:** [LC 185: Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/) [HARD]  
> **TL;DR:** Partition by `department_id`, order by `salary DESC` inside `DENSE_RANK()`, wrap in a CTE, and filter `WHERE rnk <= 2`.

#### 💡 Core Concept & Explanation
This is LeetCode #185 ("Department Top Three Salaries").
Using `DENSE_RANK()` ensures that if two employees tie for 1st place, they are both included, and the next employee is ranked 2nd.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE department (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE employee (id INT PRIMARY KEY, name VARCHAR(50), salary INT, departmentId INT);

-- Solution:
WITH RankedSalaries AS (
    SELECT 
        d.name AS Department,
        e.name AS Employee,
        e.salary AS Salary,
        DENSE_RANK() OVER(
            PARTITION BY e.departmentId 
            ORDER BY e.salary DESC
        ) AS rnk
    FROM employee e
    JOIN department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 2
ORDER BY Department, Salary DESC, Employee;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Explain why `ROW_NUMBER()` is dangerous here: if Alice and Bob both make $100k (highest), `ROW_NUMBER()` will arbitrarily drop whoever was assigned row 3 if Charlie also makes $95k! `DENSE_RANK()` is the mathematically correct choice for Top-N leaderboards.

---

---

### 25. 🔴 P0 [Q] Write a query to find the N-th highest salary in a company across all departments without using `LIMIT` or `OFFSET`.

> **LeetCode Reference:** [LC 176: Second Highest Salary](https://leetcode.com/problems/second-highest-salary/) & [LC 177: Nth Highest Salary](https://leetcode.com/problems/nth-highest-salary/) [MEDIUM]  
> **TL;DR:** Compute `DENSE_RANK() OVER (ORDER BY salary DESC)` across the distinct set of salaries, wrap in a subquery or CTE, and filter where `rnk = N`.

#### 💡 Core Concept & Explanation
This is LeetCode #177 ("Nth Highest Salary").
Using `LIMIT 1 OFFSET (N-1)` fails if salaries contain duplicate entries. Ranking distinct salaries guarantees finding the true $N$-th distinct level.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Example for N = 2 (Second Highest Salary)
WITH RankedSalaries AS (
    SELECT 
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employee
)
SELECT 
    COALESCE(
        (SELECT DISTINCT salary FROM RankedSalaries WHERE rnk = 2), 
        NULL
    ) AS SecondHighestSalary;

-- Output:
-- | SecondHighestSalary |
-- |---------------------|
-- | 80000               |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Ensure the query returns `NULL` (single row with NULL) if there are fewer than $N$ distinct salaries in the table. Wrapping the query in an outer `(SELECT ...)` scalar expression guarantees that an empty result set converts cleanly to a single `NULL` value.

---

---

[⬅️ Previous: 04 · Subqueries & CTEs](04-subqueries-and-common-table-expressions.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Running Frames & Gaps/Islands ➡️](06-window-functions-running-aggregates-and-frames.md)
