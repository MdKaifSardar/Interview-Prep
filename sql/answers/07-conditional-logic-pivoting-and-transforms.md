[⬅️ Previous: 06 · Window Running Aggregates](06-window-functions-running-aggregates-and-frames.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Set Operations & Upserts ➡️](08-set-operations-upserts-and-dml-mechanics.md)

---

## 7. Conditional Logic, Pivoting & Data Transformation

### 50. 🔴 P0 [Q] What is the difference between a Simple `CASE` expression and a Searched `CASE WHEN` expression, and what is their short-circuit evaluation order?

> **TL;DR:** Simple `CASE` compares an expression against exact discrete values (`CASE status WHEN 1 THEN 'A' END`). Searched `CASE WHEN` evaluates full arbitrary boolean predicates (`CASE WHEN price > 100 AND in_stock = TRUE THEN 'A' END`). Both evaluate branches sequentially and short-circuit at the first matching `TRUE` condition.

#### 💡 Core Concept & Explanation
- **Simple CASE:** `CASE expression WHEN value1 THEN r1 WHEN value2 THEN r2 ELSE r3 END`. Limited to exact equality checks.
- **Searched CASE:** `CASE WHEN condition1 THEN r1 WHEN condition2 THEN r2 ELSE r3 END`. Supports inequalities, range comparisons, subqueries, and compound boolean logic.
- **Short-circuiting:** As soon as a `WHEN` condition evaluates to `TRUE`, the engine immediately returns the corresponding `THEN` result and skips all subsequent branches. If no branch matches and `ELSE` is omitted, `CASE` returns `NULL`.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Searched CASE Expression with short-circuit ordering:
SELECT 
    id, name, score,
    CASE 
        WHEN score >= 90 THEN 'Tier A'
        WHEN score >= 75 THEN 'Tier B'
        WHEN score >= 50 THEN 'Tier C'
        ELSE 'Fail'
    END AS performance_bracket
FROM students;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Because `CASE` short-circuits, branch order matters! If you place `WHEN score >= 50 THEN 'Tier C'` first, a student with a score of 95 will match that first condition and receive 'Tier C'. Always order range conditions from most restrictive to least restrictive.

---

### 51. 🔴 P0 [Q] How do you pivot rows into columns in standard SQL without vendor-specific keywords using conditional aggregation?

> **TL;DR:** Combine `GROUP BY` with conditional aggregation: for each desired column, apply `SUM(CASE WHEN category = 'X' THEN amount ELSE 0 END) AS x_amount`.

#### 💡 Core Concept & Explanation
Many databases lack vendor-specific `PIVOT` keywords (e.g. standard PostgreSQL and MySQL do not have native `PIVOT` like MS SQL Server). The ANSI-SQL standard method that works identically on every relational database in existence is **Conditional Aggregation**.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Source Table (Unpivoted Rows):
-- | year | quarter | revenue |
-- |------|---------|---------|
-- | 2025 | Q1      | 100     |
-- | 2025 | Q2      | 150     |
-- | 2026 | Q1      | 120     |
-- | 2026 | Q2      | 180     |

-- Pivoting Quarters into Columns:
SELECT 
    year,
    SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_revenue,
    SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_revenue,
    SUM(CASE WHEN quarter = 'Q3' THEN revenue ELSE 0 END) AS q3_revenue,
    SUM(CASE WHEN quarter = 'Q4' THEN revenue ELSE 0 END) AS q4_revenue,
    SUM(revenue) AS total_year_revenue
FROM company_quarterly_sales
GROUP BY year
ORDER BY year;

-- Output (Pivoted Columns):
-- | year | q1_revenue | q2_revenue | q3_revenue | q4_revenue | total_year_revenue |
-- |------|------------|------------|------------|------------|-------------------|
-- | 2025 | 100        | 150        | 0          | 0          | 250               |
-- | 2026 | 120        | 180        | 0          | 0          | 300               |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL, you can also use `FILTER`: `SUM(revenue) FILTER (WHERE quarter = 'Q1') AS q1_revenue`. However, during coding rounds, using `CASE WHEN` inside `SUM` is preferred because it demonstrates cross-database competency.

---

### 52. 🟠 P1 [Q] How do you unpivot columns into rows using `UNION ALL` or `CROSS JOIN LATERAL` in relational SQL?

> **TL;DR:** To unpivot columns (e.g. `phone1`, `phone2`) into separate rows, either use `UNION ALL` selecting each column subset, or use a `CROSS JOIN LATERAL (VALUES ...)` construct in modern PostgreSQL.

#### 💡 Core Concept & Explanation
Normalizing wide, flat tables into tall relational schemas often requires unpivoting.
`UNION ALL` is universal and compatible with all SQL engines.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Source table with flat columns:
-- | emp_id | mobile_phone | work_phone   |
-- |--------|--------------|--------------|
-- | 101    | 555-0100     | 555-0101     |

-- Approach 1: Universal ANSI SQL with UNION ALL
SELECT emp_id, 'mobile' AS phone_type, mobile_phone AS phone_number
FROM employees WHERE mobile_phone IS NOT NULL
UNION ALL
SELECT emp_id, 'work' AS phone_type, work_phone AS phone_number
FROM employees WHERE work_phone IS NOT NULL;

-- Approach 2: PostgreSQL CROSS JOIN LATERAL (Single table scan!)
SELECT e.emp_id, u.phone_type, u.phone_number
FROM employees e
CROSS JOIN LATERAL (
    VALUES 
        ('mobile', e.mobile_phone),
        ('work', e.work_phone)
) AS u(phone_type, phone_number)
WHERE u.phone_number IS NOT NULL;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Highlight that Approach 2 (`CROSS JOIN LATERAL VALUES`) scans the underlying table **once**, whereas Approach 1 (`UNION ALL`) scans the underlying table $K$ times (where $K$ is the number of unpivoted columns).

---

### 53. 🟠 P1 [Q] What are the most common string manipulation functions in SQL (`CONCAT`, `CONCAT_WS`, `SUBSTRING`, `SPLIT_PART`, `TRIM`, `REPLACE`)?

> **TL;DR:** `CONCAT_WS` joins strings with a delimiter, skipping `NULL`s. `SUBSTRING(str, start, length)` extracts slices. `SPLIT_PART(str, delim, n)` extracts the $n$-th token. `TRIM` removes whitespace. `REPLACE(str, from, to)` swaps substrings.

#### 💡 Core Concept & Explanation
String cleaning is essential when processing messy user inputs, URLs, and legacy text columns.
- `CONCAT('A', NULL, 'B')` in PostgreSQL returns `'AB'`; but `A || NULL` in standard SQL returns `NULL`!
- `CONCAT_WS(',', 'A', NULL, 'B')` stands for "Concatenate With Separator" and safely returns `'A,B'`.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    email,
    -- Extract domain from email (e.g. 'john@gmail.com' -> 'gmail.com'):
    SPLIT_PART(email, '@', 2) AS domain_name,
    -- Format full name:
    CONCAT_WS(' ', TRIM(first_name), TRIM(last_name)) AS full_name,
    -- Mask credit card:
    CONCAT('****-****-****-', RIGHT(card_number, 4)) AS masked_card
FROM customer_profiles;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Remember that in standard SQL, **1-based indexing** applies (`SUBSTRING(str, 1, 3)`), unlike JavaScript or Python which are 0-based.

---

### 54. 🔴 P0 [Q] What is the difference between `COALESCE` and `NULLIF`, and how do you use them to prevent division-by-zero errors (`1 / NULLIF(x, 0)`)?

> **TL;DR:** `COALESCE(val1, val2, ...)` returns the first non-null argument in the list. `NULLIF(val1, val2)` returns `NULL` if `val1 == val2`, otherwise returns `val1`. Combining them as `val / NULLIF(denom, 0)` converts zero divisors to `NULL`, preventing query crashes.

#### 💡 Core Concept & Explanation
In SQL, dividing any number by `0` throws a fatal `division by zero` execution error and aborts the transaction. But dividing a number by `NULL` safely returns `NULL`.
`NULLIF(x, 0)` returns `NULL` when $x = 0$, transforming a fatal crash into a graceful `NULL` result.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    campaign_name,
    impressions,
    clicks,
    -- Prevents division by zero when impressions = 0:
    COALESCE(
        ROUND(100.0 * clicks / NULLIF(impressions, 0), 2), 
        0.00
    ) AS click_through_rate_pct
FROM ad_campaigns;

-- If impressions = 0:
-- NULLIF(0, 0) -> NULL
-- 100.0 * clicks / NULL -> NULL
-- COALESCE(NULL, 0.00) -> 0.00 (Safe and clean!)
```

#### ⚠️ Interview Pitfall / Pro-Tip
- All arguments passed into `COALESCE` must share compatible data types. Passing `COALESCE(int_col, 'N/A')` in PostgreSQL throws a type mismatch error; you must cast the column: `COALESCE(CAST(int_col AS VARCHAR), 'N/A')`.

---

### 55. 🔴 P0 [Q] How do date-time manipulation functions work (`DATE_TRUNC`, `EXTRACT`, `DATEDIFF`, interval math), and how do you calculate user age from birthdate?

> **TL;DR:** `DATE_TRUNC('month', date)` rounds a timestamp down to the start of the specified interval. `EXTRACT(YEAR FROM date)` pulls out numerical calendar parts. User age is calculated using `AGE(current_date, birth_date)` in PostgreSQL or `TIMESTAMPDIFF(YEAR, birth_date, CURDATE())` in MySQL.

#### 💡 Core Concept & Explanation
- **Truncating timestamps:**
  `DATE_TRUNC('month', '2026-03-24 14:32:00'::timestamp)` $\rightarrow$ `'2026-03-01 00:00:00'`.
  Essential for grouping events by day, week, month, or quarter.
- **Interval Arithmetic:**
  `NOW() - INTERVAL '30 days'` $\rightarrow$ Instant dynamic filter for active users.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema & Query
SELECT 
    id,
    name,
    birth_date,
    -- PostgreSQL:
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date)) AS age_years,
    -- Universal ANSI method:
    EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM birth_date) - 
    CASE 
        WHEN (EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(DAY FROM CURRENT_DATE)) < 
             (EXTRACT(MONTH FROM birth_date), EXTRACT(DAY FROM birth_date)) 
        THEN 1 ELSE 0 
    END AS exact_age_years
FROM users;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Never calculate age by simply dividing day differences by 365 (`DATEDIFF(day, bday, now()) / 365`)! Leap years will cause boundary edge cases where users are assigned the wrong age on their birthday.

---

### 56. 🔴 P0 [Q] Write a query to pivot monthly sales totals into 12 distinct month columns (`Jan`, `Feb`, ..., `Dec`) for each product category.

> **TL;DR:** Group by `category_id`, and write 12 conditional `SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = X THEN amount ELSE 0 END)` expressions.

#### 💡 Core Concept & Explanation
This is the standard financial annual review pivot query.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT 
    p.category_name,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 1  THEN o.amount ELSE 0 END) AS Jan,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 2  THEN o.amount ELSE 0 END) AS Feb,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 3  THEN o.amount ELSE 0 END) AS Mar,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 4  THEN o.amount ELSE 0 END) AS Apr,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 5  THEN o.amount ELSE 0 END) AS May,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 6  THEN o.amount ELSE 0 END) AS Jun,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 7  THEN o.amount ELSE 0 END) AS Jul,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 8  THEN o.amount ELSE 0 END) AS Aug,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 9  THEN o.amount ELSE 0 END) AS Sep,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 10 THEN o.amount ELSE 0 END) AS Oct,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 11 THEN o.amount ELSE 0 END) AS Nov,
    SUM(CASE WHEN EXTRACT(MONTH FROM o.order_date) = 12 THEN o.amount ELSE 0 END) AS Dec,
    SUM(o.amount) AS Total_Annual_Sales
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE EXTRACT(YEAR FROM o.order_date) = 2026
GROUP BY p.category_name
ORDER BY Total_Annual_Sales DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Filter by year (`WHERE EXTRACT(YEAR FROM order_date) = 2026`) in the `WHERE` clause! If omitted, your query will combine January 2025 and January 2026 into the same bucket.

---

### 57. 🟠 P1 [Q] Write a query to classify users into loyalty tiers (`Bronze`, `Silver`, `Gold`, `Platinum`) based on purchase frequency and total lifetime spend.

> **TL;DR:** Aggregate order count and total spend per customer, then wrap in a searched `CASE WHEN` evaluating multi-dimensional tier criteria.

#### 💡 Core Concept & Explanation
Real-world customer relationship management (CRM) segments users by both monetary spend (M) and frequency of transactions (F).

#### 🛠️ Code / Visual Diagram / Table

```sql
WITH CustomerLifetimeMetrics AS (
    SELECT 
        c.id AS customer_id,
        c.name AS customer_name,
        COUNT(o.id) AS total_orders,
        COALESCE(SUM(o.amount), 0) AS lifetime_spend
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id, c.name
)
SELECT 
    customer_id,
    customer_name,
    total_orders,
    lifetime_spend,
    CASE 
        WHEN lifetime_spend >= 10000 AND total_orders >= 20 THEN 'Platinum'
        WHEN lifetime_spend >= 5000  OR  total_orders >= 10 THEN 'Gold'
        WHEN lifetime_spend >= 1000  OR  total_orders >= 3  THEN 'Silver'
        ELSE 'Bronze'
    END AS loyalty_tier
FROM CustomerLifetimeMetrics
ORDER BY lifetime_spend DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Notice how `LEFT JOIN` is essential here: customers who signed up but haven't made their first order yet are categorized as `'Bronze'`, rather than disappearing from the customer database!

---

[⬅️ Previous: 06 · Window Running Aggregates](06-window-functions-running-aggregates-and-frames.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Set Operations & Upserts ➡️](08-set-operations-upserts-and-dml-mechanics.md)
