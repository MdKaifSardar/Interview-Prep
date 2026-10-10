[⬅️ Previous: 04 · Subqueries & CTEs](04-subqueries-and-common-table-expressions.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Window Running Aggregates ➡️](06-window-functions-running-aggregates-and-frames.md)

---

## 5. Window Functions — Ranking, Offsets & Partitions

### 33. 🔴 P0 [C] What are Window Functions in SQL, how does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`, and why don't window functions collapse rows?

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

### 34. 🔴 P0 [Q] Explain the exact differences between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when duplicate values/ties occur.

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

### 35. 🟠 P1 [Q] What does `NTILE(n)` do, and how do you use it to divide data into quartiles (top 25%) or deciles (top 10%)?

> **TL;DR:** `NTILE(n)` divides an ordered partition as equally as possible into $n$ numbered buckets (from $1$ to $n$). It is used to segment users into percentiles, quartiles (`NTILE(4)`), or deciles (`NTILE(10)`).

#### 💡 Core Concept & Explanation
If you have 10 rows and call `NTILE(4)`:
The first 2 buckets receive $\lceil 10 / 4 \rceil = 3$ rows, and the remaining 2 buckets receive $2$ rows:
- Bucket 1: 3 rows (Top quartile)
- Bucket 2: 3 rows
- Bucket 3: 2 rows
- Bucket 4: 2 rows

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Segment customers into spending quartiles:
WITH CustomerSpend AS (
    SELECT 
        customer_id, 
        SUM(order_amount) AS total_spend,
        NTILE(4) OVER(ORDER BY SUM(order_amount) DESC) AS spend_quartile
    FROM orders
    GROUP BY customer_id
)
SELECT 
    customer_id,
    total_spend,
    spend_quartile,
    CASE spend_quartile
        WHEN 1 THEN 'Tier 1: Top 25% (Whale)'
        WHEN 2 THEN 'Tier 2: High Value'
        WHEN 3 THEN 'Tier 3: Moderate'
        WHEN 4 THEN 'Tier 4: Low Value'
    END AS tier_label
FROM CustomerSpend;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Remember that `NTILE(n)` distributes leftover remainder rows to the lowest-numbered buckets first (bucket 1, then bucket 2, etc.).

---

### 36. 🔴 P0 [Q] How do offset window functions `LAG()` and `LEAD()` work, and how do you supply custom default fallback values for boundary rows?

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

### 37. 🟠 P1 [Q] What are `FIRST_VALUE()`, `LAST_VALUE()`, and `NTH_VALUE()`, and why does `LAST_VALUE()` return the current row instead of the partition's last row without an explicit frame clause?

> **TL;DR:** `FIRST_VALUE()` returns the first value in the window frame. `LAST_VALUE()` returns the last. Without an explicit frame clause, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, so `LAST_VALUE()` stops at the current row! To make it inspect the entire partition, you must add `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.

#### 💡 Core Concept & Explanation
This is one of the most notorious gotchas in SQL interviews.
When an `ORDER BY` is present inside an `OVER` clause, the default window frame is:
`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`
Therefore, as the engine steps through each row, the "last row of the frame" is simply the current row itself!

#### 🛠️ Code / Visual Diagram / Table

```sql
-- INCORRECT (Common Trap): LAST_VALUE just returns the current employee's salary!
SELECT 
    name, salary,
    LAST_VALUE(salary) OVER(ORDER BY salary) AS wrong_lowest
FROM employees;

-- CORRECT: Explicitly expand frame to UNBOUNDED FOLLOWING
SELECT 
    name, salary,
    FIRST_VALUE(salary) OVER(
        ORDER BY salary DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS highest_salary,
    LAST_VALUE(salary) OVER(
        ORDER BY salary DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_salary,
    NTH_VALUE(salary, 2) OVER(
        ORDER BY salary DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS second_highest_salary
FROM employees;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Whenever writing `LAST_VALUE()` or `NTH_VALUE()`, always append `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`. Highlighting this gotcha proves advanced SQL mastery to interviewers.

---

### 38. 🔴 P0 [Q] Write a query to find the top 2 highest-paid employees in each department, properly handling ties.

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

### 39. 🔴 P0 [Q] Write a query to find the N-th highest salary in a company across all departments without using `LIMIT` or `OFFSET`.

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

### 40. 🔴 P0 [Q] Write a query to calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`.

> **TL;DR:** Aggregate monthly revenue using `DATE_TRUNC('month', order_date)`, retrieve the prior month's revenue using `LAG()`, and calculate `((current - prior) / prior) * 100.0`.

#### 💡 Core Concept & Explanation
Month-over-month (MoM) growth is a core KPI in product and financial analytics:
$$\text{MoM Growth \%} = \frac{\text{Current Month} - \text{Prior Month}}{\text{Prior Month}} \times 100$$
Using `NULLIF(prior_month, 0)` protects against division by zero in inaugural or stagnant months.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH MonthlyRevenue AS (
    SELECT 
        DATE_TRUNC('month', order_date)::DATE AS sales_month,
        SUM(amount) AS monthly_revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)::DATE
),
RevenueWithPrior AS (
    SELECT 
        sales_month,
        monthly_revenue,
        LAG(monthly_revenue) OVER(ORDER BY sales_month) AS prior_month_revenue
    FROM MonthlyRevenue
)
SELECT 
    sales_month,
    monthly_revenue,
    prior_month_revenue,
    ROUND(
        100.0 * (monthly_revenue - prior_month_revenue) 
        / NULLIF(prior_month_revenue, 0),
        2
    ) AS mom_growth_pct
FROM RevenueWithPrior
ORDER BY sales_month;

-- Output:
-- | sales_month | monthly_revenue | prior_month_revenue | mom_growth_pct |
-- |-------------|-----------------|---------------------|----------------|
-- | 2026-01-01  | $100,000        | NULL                | NULL           |
-- | 2026-02-01  | $125,000        | $100,000            | +25.00%        |
-- | 2026-03-01  | $110,000        | $125,000            | -12.00%        |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always aggregate monthly sums in the first CTE before applying `LAG()`. Applying `LAG()` directly over unaggregated raw order rows will compare individual orders rather than monthly totals!

---

### 41. 🔴 P0 [Q] Write a query to solve the classic Gaps and Islands problem: Identify consecutive active login streaks for each user.

> **TL;DR:** Deduplicate active dates per user, compute a sequential `ROW_NUMBER()` ordered by date, subtract the row number (as an interval in days) from the login date to form an invariant group identifier (`date - row_num`), and group by that identifier to calculate streak lengths.

#### 💡 Core Concept & Explanation
Why does `login_date - ROW_NUMBER() * INTERVAL '1 day'` work?
If dates are strictly consecutive:
- March 10 - Day 1 = March 9
- March 11 - Day 2 = March 9
- March 12 - Day 3 = March 9
Notice that the resulting date difference remains constant (`March 9`) throughout any uninterrupted sequence (an "Island")! As soon as a day is skipped (a "Gap"), the subtraction jumps to a new constant baseline date.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE user_logins (
    user_id INT,
    login_date DATE
);

INSERT INTO user_logins VALUES
(1, '2026-03-01'),
(1, '2026-03-02'),
(1, '2026-03-03'), -- Streak 1: 3 days
(1, '2026-03-05'),
(1, '2026-03-06'); -- Streak 2: 2 days

-- Solution Query:
WITH DistinctLogins AS (
    SELECT DISTINCT user_id, login_date 
    FROM user_logins
),
GroupedStreaks AS (
    SELECT 
        user_id,
        login_date,
        login_date - (ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) * INTERVAL '1 day') AS streak_island_group
    FROM DistinctLogins
)
SELECT 
    user_id,
    MIN(login_date) AS streak_start_date,
    MAX(login_date) AS streak_end_date,
    COUNT(*) AS consecutive_days
FROM GroupedStreaks
GROUP BY user_id, streak_island_group
ORDER BY user_id, streak_start_date;

-- Output:
-- | user_id | streak_start_date | streak_end_date | consecutive_days |
-- |---------|-------------------|-----------------|------------------|
-- | 1       | 2026-03-01        | 2026-03-03      | 3                |
-- | 1       | 2026-03-05        | 2026-03-06      | 2                |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Deduplicate first using `SELECT DISTINCT user_id, login_date`! If a user logs in 3 times on the same calendar day, row numbers will increment while the date remains identical, breaking the consecutive mathematical alignment.

---

[⬅️ Previous: 04 · Subqueries & CTEs](04-subqueries-and-common-table-expressions.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Window Running Aggregates ➡️](06-window-functions-running-aggregates-and-frames.md)
