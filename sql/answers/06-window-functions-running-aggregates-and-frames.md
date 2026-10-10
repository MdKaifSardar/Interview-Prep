[⬅️ Previous: 05 · Window Ranking & Offsets](05-window-functions-ranking-and-offsets.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Conditional Logic & Pivoting ➡️](07-conditional-logic-pivoting-and-transforms.md)

---

## 6. Window Functions — Running Aggregates & Frame Specifications

### 42. 🔴 P0 [C] What is a Window Frame specification in SQL (`ROWS` vs `RANGE` vs `GROUPS`), and what are frame boundaries (`UNBOUNDED PRECEDING`, `CURRENT ROW`, `n PRECEDING`)?

> **TL;DR:** A Window Frame defines the subset of rows within a partition that the window function evaluates for the current row. `ROWS` treats rows as physical individual lines. `RANGE` treats rows by value equality (ties are lumped together). `GROUPS` treats distinct peer groups. Frame boundaries set the physical start and end relative to the current position.

#### 💡 Core Concept & Explanation
Syntax:
`{ ROWS | RANGE | GROUPS } BETWEEN frame_start AND frame_end`
Valid boundary keywords:
- `UNBOUNDED PRECEDING`: Partition's first row.
- `n PRECEDING`: $n$ rows (or value units) before the current row.
- `CURRENT ROW`: The row being processed.
- `n FOLLOWING`: $n$ rows (or value units) after the current row.
- `UNBOUNDED FOLLOWING`: Partition's final row.

#### 🛠️ Code / Visual Diagram / Table

```
Partition Rows:
[Row 1]
[Row 2] ─── 1 PRECEDING
[Row 3] ─── CURRENT ROW  ───> Active Frame: ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
[Row 4] ─── 1 FOLLOWING
[Row 5]
```

#### ⚠️ Interview Pitfall / Pro-Tip
- `ROWS` evaluates in memory fast because it works with physical row index pointers. `RANGE` must compare column values, creating additional overhead. If you don't need value-based peer ranges, always specify `ROWS`.

---

### 43. 🔴 P0 [Q] What is the dangerous default window frame when `ORDER BY` is specified without an explicit frame clause, and how does `RANGE` cause unexpected duplicate grouping?

> **TL;DR:** When `ORDER BY` is present without an explicit frame clause, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Because it uses `RANGE` (value-based), if multiple rows have identical `ORDER BY` values, the aggregate sums all duplicate peers together immediately rather than incrementing row-by-row!

#### 💡 Core Concept & Explanation
If two transactions on the same date both have amount `$50`:
- With `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`:
  - Row 1: `$50`
  - Row 2: `$100` (Cumulative)
- With default `RANGE`:
  - Both rows share the same date value, so the frame expands to the end of the peer group:
  - Row 1: `$100`
  - Row 2: `$100`
This unexpected sudden jump breaks sequential running balances!

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE ledger (
    tx_id INT,
    tx_date DATE,
    amount INT
);

INSERT INTO ledger VALUES
(1, '2026-03-01', 50),
(2, '2026-03-01', 50), -- Duplicate date!
(3, '2026-03-02', 30);

SELECT 
    tx_id, tx_date, amount,
    -- DANGEROUS DEFAULT (RANGE):
    SUM(amount) OVER(ORDER BY tx_date) AS default_range_sum,
    -- EXPLICIT ROW SPECIFICATION (CORRECT):
    SUM(amount) OVER(ORDER BY tx_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS correct_row_sum
FROM ledger;

-- Output:
-- | tx_id | tx_date    | amount | default_range_sum | correct_row_sum |
-- |-------|------------|--------|-------------------|-----------------|
-- | 1     | 2026-03-01 | 50     | 100               | 50              |
-- | 2     | 2026-03-01 | 50     | 100               | 100             |
-- | 3     | 2026-03-02 | 30     | 130               | 130             |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always write out `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` when calculating cumulative totals to ensure sequential row-level increments.

---

### 44. 🔴 P0 [Q] How do you compute a running cumulative total (Running Sum) partitioned by category and ordered by transaction date?

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

### 45. 🔴 P0 [Q] How do you compute a 7-day or 30-day moving average using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`?

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

### 46. 🟠 P1 [Q] How do you compute the percentage contribution of each row to the total partition sum using window aggregation?

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

### 47. 🔴 P0 [Q] Write a query to compute the cumulative daily revenue per store location throughout the current fiscal year.

> **TL;DR:** Filter orders for the year, partition by `store_id`, order by `order_date`, and compute running sum with `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.

#### 💡 Core Concept & Explanation
This is the standard financial year-to-date (YTD) cumulative calculation executed across retail, SaaS, and banking ledgers.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    store_id,
    order_date,
    daily_revenue,
    SUM(daily_revenue) OVER(
        PARTITION BY store_id 
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS ytd_cumulative_revenue
FROM (
    SELECT 
        store_id, 
        order_date::DATE, 
        SUM(amount) AS daily_revenue
    FROM store_orders
    WHERE EXTRACT(YEAR FROM order_date) = 2026
    GROUP BY store_id, order_date::DATE
) daily_summary
ORDER BY store_id, order_date;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Aggregate at the daily level inside the subquery first before running the window function. If multiple sales occur on the same day, you want one cumulative value per day, not per transaction.

---

### 48. 🔴 P0 [Q] Write a query to calculate a 7-day rolling average of daily active users (DAU) for an application.

> **TL;DR:** Aggregate distinct daily active users by date, then apply `AVG(dau) OVER (ORDER BY active_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.

#### 💡 Core Concept & Explanation
Daily Active Users (DAU) is erratic due to weekend usage drops. A 7-day rolling average smooths out seasonality for KPI reporting.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH DailyActiveUsers AS (
    SELECT 
        activity_timestamp::DATE AS active_date,
        COUNT(DISTINCT user_id) AS dau
    FROM user_activity_logs
    GROUP BY activity_timestamp::DATE
)
SELECT 
    active_date,
    dau,
    ROUND(
        AVG(dau) OVER(
            ORDER BY active_date 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ),
        0
    ) AS rolling_7day_dau
FROM DailyActiveUsers
ORDER BY active_date;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Mention that this query assumes unbroken consecutive dates. If the app had a server outage where zero logs were recorded on Tuesday, Tuesday is absent from `DailyActiveUsers`, so `6 PRECEDING` would look back 8 calendar days. In production, join to a calendar dimension table to ensure every date exists.

---

### 49. 🟠 P1 [Q] Write a query to detect anomaly transactions where a user's transaction amount is greater than 3x their rolling 5-transaction average.

> **TL;DR:** Calculate the rolling average of the 5 preceding transactions using `AVG(amount) OVER (PARTITION BY user_id ORDER BY created_at ROWS BETWEEN 5 PRECEDING AND 1 PRECEDING)`, and flag rows where `current_amount > 3.0 * rolling_avg`.

#### 💡 Core Concept & Explanation
In FinTech and fraud systems, anomalies are evaluated against baseline user history. Notice the frame specification: `ROWS BETWEEN 5 PRECEDING AND 1 PRECEDING`. We **exclude** the current transaction from the baseline average so that the suspicious transaction amount doesn't inflate its own comparison benchmark!

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH TransactionBaselines AS (
    SELECT 
        id AS transaction_id,
        user_id,
        created_at,
        amount,
        COUNT(*) OVER(
            PARTITION BY user_id 
            ORDER BY created_at 
            ROWS BETWEEN 5 PRECEDING AND 1 PRECEDING
        ) AS prior_tx_count,
        AVG(amount) OVER(
            PARTITION BY user_id 
            ORDER BY created_at 
            ROWS BETWEEN 5 PRECEDING AND 1 PRECEDING
        ) AS prior_5_avg_amount
    FROM transactions
)
SELECT 
    transaction_id,
    user_id,
    created_at,
    amount,
    ROUND(prior_5_avg_amount, 2) AS baseline_avg,
    ROUND(amount / prior_5_avg_amount, 1) AS spike_multiplier
FROM TransactionBaselines
WHERE prior_tx_count >= 3 -- Require at least 3 historical transactions to establish baseline
  AND amount > (3.0 * prior_5_avg_amount)
ORDER BY created_at DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Highlight `ROWS BETWEEN 5 PRECEDING AND 1 PRECEDING` to the interviewer! Most candidates write `CURRENT ROW`, which inadvertently pollutes the historical average with the fraud spike.

---

[⬅️ Previous: 05 · Window Ranking & Offsets](05-window-functions-ranking-and-offsets.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Conditional Logic & Pivoting ➡️](07-conditional-logic-pivoting-and-transforms.md)
