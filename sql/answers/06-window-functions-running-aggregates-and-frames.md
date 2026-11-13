[⬅️ Previous: 05 · Window Ranking & Offsets](05-window-functions-ranking-and-offsets.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Conditional Logic & Pivoting ➡️](07-conditional-logic-pivoting-and-transforms.md)

---

## 6. Window Functions — Running Aggregates & Sequential Patterns

### 26. 🔴 P0 [Q] How do you compute a running cumulative total (Running Sum) partitioned by category and ordered by transaction date?

> **TL;DR:** Use `SUM(amount) OVER (PARTITION BY category_id ORDER BY transaction_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.

#### 💡 Core Concept & Explanation
Partitioning divides the ledger into isolated categories (e.g. Electronics, Books). The running sum starts at $0 for the first record of each category and accumulates until the end of that category's partition.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    category_id,
    order_date,
    amount,
    SUM(amount) OVER(
        PARTITION BY category_id 
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS category_cumulative_sales
FROM sales
ORDER BY category_id, order_date;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Adding a secondary tie-breaker column to `ORDER BY` (e.g. `ORDER BY order_date, id`) ensures deterministic running total sequences when transactions occur at the exact same timestamp.

---

---

### 27. 🔴 P0 [Q] How do you compute a 7-day or 30-day moving average using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`?

> **TL;DR:** Use `AVG(metric) OVER (ORDER BY date_col ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. A 7-day rolling window consists of the current day plus the preceding 6 rows.

#### 💡 Core Concept & Explanation
Moving averages smooth out short-term fluctuations and weekday/weekend seasonality in user activity, website traffic, and financial stock prices.
Note: For `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` to represent exactly 7 calendar days, the underlying table must have an entry for **every single calendar day** without gaps. If dates are missing, use a generated calendar grid or date-based `RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW` (in PostgreSQL).

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    event_date,
    active_users,
    ROUND(
        AVG(active_users) OVER(
            ORDER BY event_date 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 
        1
    ) AS moving_avg_7_day
FROM daily_app_usage
ORDER BY event_date;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Be aware that the first 6 rows of the dataset will calculate an average over fewer than 7 rows because there are fewer than 6 preceding rows. If an interviewer requires only returning days with a full 7-day history, wrap in a CTE and check `COUNT(*) OVER (ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) = 7`.

---

---

### 28. 🟠 P1 [Q] How do you compute the percentage contribution of each row to the total partition sum using window aggregation?

> **TL;DR:** Divide the row's metric by the total partition sum: `ROUND(100.0 * amount / SUM(amount) OVER (PARTITION BY department_id), 2)`.

#### 💡 Core Concept & Explanation
Omitting the `ORDER BY` clause inside the `OVER()` function makes the window evaluate the entire partition uniformly. Thus, `SUM(amount) OVER (PARTITION BY dept_id)` returns the exact same grand total across all rows in that department, allowing direct arithmetic comparison without a subquery.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    department_id,
    employee_name,
    salary,
    SUM(salary) OVER(PARTITION BY department_id) AS total_dept_payroll,
    ROUND(
        100.0 * salary / SUM(salary) OVER(PARTITION BY department_id), 
        2
    ) AS payroll_percentage
FROM employees
ORDER BY department_id, salary DESC;

-- Output:
-- | department_id | employee_name | salary  | total_dept_payroll | payroll_percentage |
-- |---------------|---------------|---------|--------------------|--------------------|
-- | 10            | Alice         | $60,000 | $100,000           | 60.00%             |
-- | 10            | Bob           | $40,000 | $100,000           | 40.00%             |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Remember that when `ORDER BY` is **absent**, the default frame is the **entire partition** (`BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`). As soon as you add `ORDER BY`, the frame collapses to `BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. This is a classic interview question!

---

---

### 29. 🔴 P0 [Q] Write a query to calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`.

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

---

### 30. 🔴 P0 [Q] Write a query to solve the classic Gaps and Islands problem: Identify consecutive active login streaks for each user.

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

[⬅️ Previous: 05 · Window Ranking & Offsets](05-window-functions-ranking-and-offsets.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Conditional Logic & Pivoting ➡️](07-conditional-logic-pivoting-and-transforms.md)
