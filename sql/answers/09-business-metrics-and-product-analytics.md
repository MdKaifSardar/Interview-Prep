[⬅️ Previous: 08 · Set Operations & Upserts](08-set-operations-upserts-and-dml-mechanics.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Query Optimization & Tuning ➡️](10-query-optimization-and-performance-tuning.md)

---

## 9. Business Metrics & Real-World Product Analytics Queries

### 65. 🔴 P0 [Q] How do you calculate Day 1, Day 7, and Day 30 User Retention Rates using cohort analysis in SQL?

> **TL;DR:** Cohort analysis groups users by their registration date (`cohort_date`), joins their subsequent activity dates, computes the elapsed day difference (`activity_date - cohort_date`), and calculates the percentage of the original cohort active on Day 1, Day 7, and Day 30.

#### 💡 Core Concept & Explanation
User retention answers the fundamental product question: *"Do users come back after signing up?"*
- Day 0: 100% (The signup baseline cohort size).
- Day $N$ Retention:
  $$\text{Retention Rate} = \frac{\text{Count of unique cohort users active on Day } N}{\text{Total unique users in cohort}} \times 100$$

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema: users (id, created_at), user_activity (user_id, activity_date)

WITH UserCohorts AS (
    SELECT 
        id AS user_id,
        created_at::DATE AS cohort_date
    FROM users
    WHERE created_at >= '2026-01-01'
),
CohortSizes AS (
    SELECT cohort_date, COUNT(*) AS cohort_size
    FROM UserCohorts
    GROUP BY cohort_date
),
UserActivityDayDiff AS (
    SELECT 
        c.cohort_date,
        a.user_id,
        (a.activity_date::DATE - c.cohort_date) AS days_since_signup
    FROM UserCohorts c
    JOIN user_activity a ON c.user_id = a.user_id
)
SELECT 
    cs.cohort_date,
    cs.cohort_size,
    -- Day 1 Retention:
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN u.days_since_signup = 1 THEN u.user_id END) / cs.cohort_size, 1) AS day_1_retention_pct,
    -- Day 7 Retention:
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN u.days_since_signup = 7 THEN u.user_id END) / cs.cohort_size, 1) AS day_7_retention_pct,
    -- Day 30 Retention:
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN u.days_since_signup = 30 THEN u.user_id END) / cs.cohort_size, 1) AS day_30_retention_pct
FROM CohortSizes cs
LEFT JOIN UserActivityDayDiff u ON cs.cohort_date = u.cohort_date
GROUP BY cs.cohort_date, cs.cohort_size
ORDER BY cs.cohort_date;

-- Output:
-- | cohort_date | cohort_size | day_1_retention_pct | day_7_retention_pct | day_30_retention_pct |
-- |-------------|-------------|---------------------|---------------------|----------------------|
-- | 2026-01-01  | 1000        | 45.2%               | 22.4%               | 14.1%                |
-- | 2026-01-02  | 850         | 48.0%               | 24.1%               | 15.0%                |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always use `COUNT(DISTINCT user_id)` inside the conditional aggregate! If a user performs 50 actions on Day 7, counting raw rows will report a retention rate of >1000%.

---

### 66. 🔴 P0 [Q] How do you calculate Monthly Churn Rate for a SaaS subscription product?

> **TL;DR:** Monthly Churn Rate is the percentage of active subscribers at the start of the month who cancel during that month: $\frac{\text{Cancelled Users in Month}}{\text{Active Users at Start of Month}} \times 100$.

#### 💡 Core Concept & Explanation
A business cannot calculate churn simply by looking at cancellations alone; cancellations must be evaluated against the beginning subscriber base.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH MonthlySubscribers AS (
    SELECT 
        DATE_TRUNC('month', calendar_date)::DATE AS sub_month,
        -- Active at start of month:
        COUNT(DISTINCT CASE 
            WHEN s.start_date < DATE_TRUNC('month', calendar_date) 
             AND (s.end_date IS NULL OR s.end_date >= DATE_TRUNC('month', calendar_date))
            THEN s.user_id 
        END) AS active_at_start,
        -- Churned during month:
        COUNT(DISTINCT CASE 
            WHEN s.end_date >= DATE_TRUNC('month', calendar_date) 
             AND s.end_date < DATE_TRUNC('month', calendar_date) + INTERVAL '1 month'
            THEN s.user_id 
        END) AS churned_during_month
    FROM generate_series('2026-01-01'::DATE, '2026-06-01'::DATE, '1 month'::INTERVAL) calendar_date
    CROSS JOIN subscriptions s
    GROUP BY DATE_TRUNC('month', calendar_date)::DATE
)
SELECT 
    sub_month,
    active_at_start,
    churned_during_month,
    ROUND(
        100.0 * churned_during_month / NULLIF(active_at_start, 0), 
        2
    ) AS monthly_churn_rate_pct
FROM MonthlySubscribers
ORDER BY sub_month;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Distinguish between **Customer Churn** (lost logos/accounts) and **Revenue Churn** (lost MRR/ARR dollars). Interviewers often ask for Revenue Churn, which requires replacing `COUNT(user_id)` with `SUM(plan_monthly_price)`.

---

### 67. 🔴 P0 [Q] How do you compute Daily Active Users (DAU), Monthly Active Users (MAU), and the DAU/MAU Stickiness Ratio in SQL?

> **TL;DR:** DAU is distinct users active on a given day. MAU is distinct users active over the 30-day window ending on that day. The Stickiness Ratio is `(DAU / MAU) * 100` (measuring how frequently monthly users return daily).

#### 💡 Core Concept & Explanation
- **DAU:** `COUNT(DISTINCT user_id)` for that date.
- **MAU:** Count of distinct users who logged in at least once between `date - 29 days` and `date`.
- **Stickiness:** A product with DAU = 20k and MAU = 100k has 20% stickiness (the average monthly user uses the app 6 out of 30 days). Top apps like WhatsApp have stickiness > 50%.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH DailyUsers AS (
    SELECT 
        activity_date::DATE AS log_date,
        COUNT(DISTINCT user_id) AS dau
    FROM user_activity
    GROUP BY activity_date::DATE
),
Rolling30Days AS (
    SELECT 
        d1.log_date,
        d1.dau,
        (
            SELECT COUNT(DISTINCT user_id)
            FROM user_activity a
            WHERE a.activity_date::DATE BETWEEN d1.log_date - INTERVAL '29 days' AND d1.log_date
        ) AS mau
    FROM DailyUsers d1
)
SELECT 
    log_date,
    dau,
    mau,
    ROUND(100.0 * dau / NULLIF(mau, 0), 2) AS stickiness_ratio_pct
FROM Rolling30Days
ORDER BY log_date DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- You cannot compute rolling 30-day distinct users using a simple `SUM(dau) OVER (ROWS 29 PRECEDING)` because users active on multiple days will be counted multiple times! You must calculate true distinct users over the 30-day window.

---

### 68. 🔴 P0 [Q] How do you analyze an E-commerce conversion funnel (Visitor → View Item → Add to Cart → Purchase) to calculate step-by-step drop-off rates?

> **TL;DR:** Group events by session, use conditional aggregation flags (`MAX(CASE WHEN step THEN 1 ELSE 0 END)`) to identify the farthest funnel stage achieved, and calculate the transition percentage between consecutive stages.

#### 💡 Core Concept & Explanation
A Conversion Funnel traces user progression through linear checkout stages to isolate conversion bottlenecks.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH SessionFunnel AS (
    SELECT 
        session_id,
        MAX(CASE WHEN event_name = 'page_visit'     THEN 1 ELSE 0 END) AS step_1_visit,
        MAX(CASE WHEN event_name = 'view_product'   THEN 1 ELSE 0 END) AS step_2_view,
        MAX(CASE WHEN event_name = 'add_to_cart'    THEN 1 ELSE 0 END) AS step_3_cart,
        MAX(CASE WHEN event_name = 'purchase_order' THEN 1 ELSE 0 END) AS step_4_purchase
    FROM analytics_events
    WHERE event_timestamp >= '2026-03-01'
    GROUP BY session_id
)
SELECT 
    COUNT(*) AS total_visitors,
    SUM(step_2_view) AS viewed_product,
    SUM(step_3_cart) AS added_to_cart,
    SUM(step_4_purchase) AS purchased,
    -- Step-by-step conversion:
    ROUND(100.0 * SUM(step_2_view) / COUNT(*), 1) AS visit_to_view_pct,
    ROUND(100.0 * SUM(step_3_cart) / NULLIF(SUM(step_2_view), 0), 1) AS view_to_cart_pct,
    ROUND(100.0 * SUM(step_4_purchase) / NULLIF(SUM(step_3_cart), 0), 1) AS cart_to_purchase_pct,
    -- Overall end-to-end conversion:
    ROUND(100.0 * SUM(step_4_purchase) / COUNT(*), 2) AS overall_conversion_rate_pct
FROM SessionFunnel;

-- Output:
-- | total_visitors | viewed_product | added_to_cart | purchased | overall_conversion_rate_pct |
-- |----------------|----------------|---------------|-----------|------------------------------|
-- | 100,000        | 62,000         | 18,600        | 3,120     | 3.12%                        |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Ensure stages are evaluated at the **session level** rather than the user level if analyzing website traffic, or at the **user level** if analyzing long-term lifecycle conversion.

---

### 69. 🟠 P1 [Q] How do you calculate Customer Lifetime Value (LTV) and Average Order Value (AOV) grouped by customer acquisition month?

> **TL;DR:** Identify the first order date for each customer (acquisition month), join all subsequent orders placed by those customers, and calculate total revenue divided by unique customers (LTV) and total revenue divided by total orders (AOV).

#### 💡 Core Concept & Explanation
$$\text{LTV} = \frac{\text{Total Cumulative Revenue of Cohort}}{\text{Total Unique Customers in Cohort}}$$
$$\text{AOV} = \frac{\text{Total Revenue}}{\text{Total Orders Placed}}$$

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH CustomerAcquisition AS (
    SELECT 
        customer_id,
        DATE_TRUNC('month', MIN(order_date))::DATE AS acquisition_cohort
    FROM orders
    GROUP BY customer_id
)
SELECT 
    ca.acquisition_cohort,
    COUNT(DISTINCT ca.customer_id) AS acquired_customers,
    COUNT(o.id) AS total_lifetime_orders,
    ROUND(SUM(o.amount), 2) AS total_cohort_revenue,
    ROUND(SUM(o.amount) / COUNT(o.id), 2) AS aov,
    ROUND(SUM(o.amount) / COUNT(DISTINCT ca.customer_id), 2) AS customer_ltv
FROM CustomerAcquisition ca
JOIN orders o ON ca.customer_id = o.customer_id
GROUP BY ca.acquisition_cohort
ORDER BY ca.acquisition_cohort;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Point out that older cohorts naturally have higher cumulative LTV simply because they have had more months to transact. To normalize comparisons across cohorts, senior analysts measure bounded LTV (e.g. 90-day LTV or 365-day LTV).

---

### 70. 🟠 P1 [Q] Write a query to detect rapid financial transaction fraud: Flag any user who makes 2 or more transactions within 60 seconds from different IP addresses.

> **TL;DR:** Use a `SELF JOIN` or `LEAD()` window function partitioned by `user_id` and ordered by `created_at` where `next_created_at - created_at <= INTERVAL '60 seconds'` and `ip_address != next_ip_address`.

#### 💡 Core Concept & Explanation
This is a standard fraud engineering query testing window offsets, timestamps, and inequality conditions.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH ConsecutiveTransactions AS (
    SELECT 
        id AS tx_id,
        user_id,
        amount,
        ip_address,
        created_at,
        LEAD(created_at) OVER(PARTITION BY user_id ORDER BY created_at) AS next_tx_at,
        LEAD(ip_address) OVER(PARTITION BY user_id ORDER BY created_at) AS next_ip,
        LEAD(id) OVER(PARTITION BY user_id ORDER BY created_at) AS next_tx_id
    FROM transactions
)
SELECT 
    user_id,
    tx_id AS first_tx_id,
    next_tx_id AS suspicious_tx_id,
    created_at AS first_tx_time,
    next_tx_at AS second_tx_time,
    ip_address AS original_ip,
    next_ip AS fraudulent_ip,
    ROUND(EXTRACT(EPOCH FROM (next_tx_at - created_at))::NUMERIC, 1) AS seconds_difference
FROM ConsecutiveTransactions
WHERE next_tx_at IS NOT NULL
  AND next_tx_at - created_at <= INTERVAL '60 seconds'
  AND ip_address != next_ip
ORDER BY user_id, created_at;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Notice `EXTRACT(EPOCH FROM (next_tx_at - created_at))` converts the interval difference directly into total seconds, making threshold filtering simple and resilient across date boundaries.

---

### 71. 🔴 P0 [Q] Write a query to generate a complete monthly cohort retention matrix showing the percentage of users retained in month 1, 2, 3, etc. after registration.

> **TL;DR:** Group users by registration month, join activity aggregated by calendar month, compute month index `(activity_year * 12 + activity_month) - (signup_year * 12 + signup_month)`, and pivot using conditional aggregation.

#### 💡 Core Concept & Explanation
The Cohort Retention Matrix is the holy grail of product retention analysis. Rows represent signup cohorts, and columns represent Months Elapsed ($M_0, M_1, M_2, M_3$).

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH UserCohorts AS (
    SELECT 
        id AS user_id,
        DATE_TRUNC('month', created_at)::DATE AS signup_month
    FROM users
),
MonthlyActivity AS (
    SELECT 
        user_id,
        DATE_TRUNC('month', activity_date)::DATE AS active_month
    FROM user_activity
    GROUP BY user_id, DATE_TRUNC('month', activity_date)::DATE
),
CohortActivity AS (
    SELECT 
        c.signup_month,
        c.user_id,
        -- Month index calculation:
        (EXTRACT(YEAR FROM a.active_month) - EXTRACT(YEAR FROM c.signup_month)) * 12 + 
        (EXTRACT(MONTH FROM a.active_month) - EXTRACT(MONTH FROM c.signup_month)) AS month_number
    FROM UserCohorts c
    JOIN MonthlyActivity a ON c.user_id = a.user_id
)
SELECT 
    signup_month,
    COUNT(DISTINCT user_id) AS total_users,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN month_number = 0 THEN user_id END) / COUNT(DISTINCT user_id), 1) AS m0_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN month_number = 1 THEN user_id END) / COUNT(DISTINCT user_id), 1) AS m1_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN month_number = 2 THEN user_id END) / COUNT(DISTINCT user_id), 1) AS m2_pct,
    ROUND(100.0 * COUNT(DISTINCT CASE WHEN month_number = 3 THEN user_id END) / COUNT(DISTINCT user_id), 1) AS m3_pct
FROM CohortActivity
GROUP BY signup_month
ORDER BY signup_month;

-- Output Matrix:
-- | signup_month | total_users | m0_pct | m1_pct | m2_pct | m3_pct |
-- |--------------|-------------|--------|--------|--------|--------|
-- | 2026-01-01   | 10,000      | 100%   | 42.1%  | 28.5%  | 21.0%  |
-- | 2026-02-01   | 12,500      | 100%   | 45.0%  | 30.2%  | NULL   |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Explain why Month 0 is always 100%: every user who signed up in January was by definition active in January. Future months that haven't occurred yet naturally render as `NULL` or 0%.

---

### 72. 🟠 P1 [Q] Write a query to find "Reactivated Users": Users who were active this month, inactive last month, but active at least once in prior history.

> **TL;DR:** A user active in month $M$ is **Reactivated** if they had 0 activity in month $M-1$ and $\ge 1$ activity in month $\le M-2$.

#### 💡 Core Concept & Explanation
In user lifecycle accounting:
$$\text{Current Active} = \text{New Users} + \text{Retained Users} + \text{Reactivated Users}$$
Identifying reactivated users allows growth marketing teams to measure the effectiveness of win-back email campaigns.

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH MonthlyUserActivity AS (
    SELECT DISTINCT 
        user_id,
        DATE_TRUNC('month', activity_date)::DATE AS active_month
    FROM user_activity
),
ActivityWithHistory AS (
    SELECT 
        user_id,
        active_month,
        LAG(active_month) OVER(PARTITION BY user_id ORDER BY active_month) AS prev_active_month
    FROM MonthlyUserActivity
)
SELECT 
    user_id,
    active_month AS reactivation_month,
    prev_active_month AS last_seen_month,
    -- Elapsed months between active periods:
    (EXTRACT(YEAR FROM active_month) - EXTRACT(YEAR FROM prev_active_month)) * 12 + 
    (EXTRACT(MONTH FROM active_month) - EXTRACT(MONTH FROM prev_active_month)) AS months_dormant
FROM ActivityWithHistory
WHERE prev_active_month IS NOT NULL
  -- Gap must be greater than 1 month (i.e. skipped at least 1 month):
  AND active_month > prev_active_month + INTERVAL '1 month'
ORDER BY active_month DESC, user_id;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- If `prev_active_month IS NULL`, the user is a brand new user, not a reactivated user! The condition `WHERE prev_active_month IS NOT NULL` properly eliminates new signups.

---

[⬅️ Previous: 08 · Set Operations & Upserts](08-set-operations-upserts-and-dml-mechanics.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Query Optimization & Tuning ➡️](10-query-optimization-and-performance-tuning.md)
