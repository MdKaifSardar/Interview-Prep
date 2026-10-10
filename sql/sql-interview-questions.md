# SQL Technical Interview Master List (80 Questions)

**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Data Engineer / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup & tech interview ROI) · 🟠 P1 Important · 🟡 P2 Advanced / Deep Systems

**Type** — [Q] Practical Query Writing / Problem-Solving · [C] Conceptual & Engine Internals · [D] Schema & Architecture Design · [P] Performance, Indexing & Tuning

---

## 1. SQL Foundations, Execution Order & Basic Querying

1. 🔴 P0 [C] What is the exact logical execution order of a SQL query, and why can't you reference a column alias defined in `SELECT` within the `WHERE` clause?
2. 🔴 P0 [Q] What is Three-Valued Logic in SQL (`TRUE`, `FALSE`, `UNKNOWN`), and why does `col = NULL` evaluate to `UNKNOWN` instead of `TRUE`?
3. 🔴 P0 [Q] What is `DISTINCT`, how does the database engine eliminate duplicate rows internally, and what is its performance penalty?
4. 🔴 P0 [Q] How does `ORDER BY` handle `NULL` values by default, and how do you explicitly enforce `NULLS FIRST` vs `NULLS LAST`?
5. 🔴 P0 [Q] How does pagination work using `LIMIT` and `OFFSET`, and why does deep offset pagination (`OFFSET 100000`) degrade database performance?
6. 🟠 P1 [Q] How do pattern matching operators (`LIKE`, `ILIKE`, `SIMILAR TO`, Regex) work, and how do wildcard positions affect index utilization?
7. 🔴 P0 [Q] Write a query to find all duplicate records based on email address and return their occurrence counts.
8. 🟠 P1 [Q] Write a query to filter rows matching multiple boolean conditions where some column values are nullable, avoiding common three-valued logic bugs.

## 2. Aggregations, Grouping & Multi-Condition Filtering

9. 🔴 P0 [C] What is the difference between the `WHERE` clause and the `HAVING` clause, and when must filtering happen before vs after grouping?
10. 🔴 P0 [C] What is the difference between `COUNT(*)`, `COUNT(column)`, `COUNT(1)`, and `COUNT(DISTINCT column)` in execution and NULL handling?
11. 🔴 P0 [Q] How does multi-column `GROUP BY` work, and why must every column in the `SELECT` list either appear in `GROUP BY` or inside an aggregate function?
12. 🔴 P0 [Q] What is Conditional Aggregation, and how do you use `CASE WHEN` inside `SUM()` or `COUNT()` to compute pivot metrics in a single table scan?
13. 🟠 P1 [Q] What are grouping extensions (`ROLLUP`, `CUBE`, `GROUPING SETS`), and how do they generate subtotal and grand total summary rows?
14. 🔴 P0 [Q] Write a query to calculate the average, minimum, maximum salary, and employee headcount for each department.
15. 🔴 P0 [Q] Write a query to find all customers who have placed orders across at least 3 distinct product categories.
16. 🟠 P1 [Q] Write a query using conditional aggregation to calculate the total transaction volume and the percentage of successful payments per merchant.

## 3. Comprehensive JOIN Mechanics & Complex Multi-Table Queries

17. 🔴 P0 [C] Explain the visual mechanics and return sets of all SQL JOIN types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`.
18. 🔴 P0 [Q] What is the critical difference between placing a filter condition in the `ON` clause versus the `WHERE` clause during a `LEFT JOIN` (The Outer Join Nullification Trap)?
19. 🔴 P0 [Q] What is a `SELF JOIN`, and how is it used to model hierarchical and sequential relationships within a single table?
20. 🔴 P0 [Q] What is an Anti-Join, and how do `LEFT JOIN ... WHERE right.id IS NULL`, `NOT EXISTS`, and `NOT IN` compare in performance and NULL handling?
21. 🟠 P1 [Q] What is a `CROSS JOIN` (Cartesian Product), and what are its practical use cases (e.g. generating calendar date grids)?
22. 🔴 P0 [Q] Write a query to find all employees who earn a higher salary than their direct manager using a `SELF JOIN`.
23. 🔴 P0 [Q] Write a query to find all customers who have never placed an order using both `LEFT JOIN ... IS NULL` and `NOT EXISTS`.
24. 🟠 P1 [Q] Write a query to find asymmetric pairs (e.g., users who follow someone who does not follow them back).

## 4. Subqueries & Common Table Expressions (CTEs)

25. 🔴 P0 [C] What is the difference between a Non-Correlated Subquery and a Correlated Subquery, and how does the engine execute them?
26. 🔴 P0 [Q] What is the difference between `EXISTS` and `IN` operators, and why does `NOT IN` fail completely if the subquery returns even a single `NULL` value?
27. 🟠 P1 [C] Distinguish Scalar Subqueries, Row Subqueries, and Table-Derived Subqueries, and where each can be placed in a SQL statement.
28. 🔴 P0 [Q] What is a Common Table Expression (CTE, `WITH` clause), and what advantages does it provide over nested subqueries?
29. 🟡 P2 [C] What is a CTE Optimization Fence, and how do database query planners handle inlining vs materializing CTEs (Postgres 12+ behavior)?
30. 🔴 P0 [Q] What is a Recursive CTE, what are its 4 mandatory components (Anchor, UNION ALL, Recursive Member, Termination), and how does it execute?
31. 🔴 P0 [Q] Write a query to find all employees whose salary is above the average salary of their respective department using a correlated subquery and a CTE.
32. 🔴 P0 [Q] Write a recursive CTE to traverse an employee organizational chart and compute the management depth/level for every employee from the CEO downwards.

## 5. Window Functions — Ranking, Offsets & Partitions

33. 🔴 P0 [C] What are Window Functions in SQL, how does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`, and why don't window functions collapse rows?
34. 🔴 P0 [Q] Explain the exact differences between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when duplicate values/ties occur.
35. 🟠 P1 [Q] What does `NTILE(n)` do, and how do you use it to divide data into quartiles (top 25%) or deciles (top 10%)?
36. 🔴 P0 [Q] How do offset window functions `LAG()` and `LEAD()` work, and how do you supply custom default fallback values for boundary rows?
37. 🟠 P1 [Q] What are `FIRST_VALUE()`, `LAST_VALUE()`, and `NTH_VALUE()`, and why does `LAST_VALUE()` return the current row instead of the partition's last row without an explicit frame clause?
38. 🔴 P0 [Q] Write a query to find the top 2 highest-paid employees in each department, properly handling ties.
39. 🔴 P0 [Q] Write a query to find the N-th highest salary in a company across all departments without using `LIMIT` or `OFFSET`.
40. 🔴 P0 [Q] Write a query to calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`.
41. 🔴 P0 [Q] Write a query to solve the classic Gaps and Islands problem: Identify consecutive active login streaks for each user.

## 6. Window Functions — Running Aggregates & Frame Specifications

42. 🔴 P0 [C] What is a Window Frame specification in SQL (`ROWS` vs `RANGE` vs `GROUPS`), and what are frame boundaries (`UNBOUNDED PRECEDING`, `CURRENT ROW`, `n PRECEDING`)?
43. 🔴 P0 [Q] What is the dangerous default window frame when `ORDER BY` is specified without an explicit frame clause, and how does `RANGE` cause unexpected duplicate grouping?
44. 🔴 P0 [Q] How do you compute a running cumulative total (Running Sum) partitioned by category and ordered by transaction date?
45. 🔴 P0 [Q] How do you compute a 7-day or 30-day moving average using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`?
46. 🟠 P1 [Q] How do you compute the percentage contribution of each row to the total partition sum using window aggregation?
47. 🔴 P0 [Q] Write a query to compute the cumulative daily revenue per store location throughout the current fiscal year.
48. 🔴 P0 [Q] Write a query to calculate a 7-day rolling average of daily active users (DAU) for an application.
49. 🟠 P1 [Q] Write a query to detect anomaly transactions where a user's transaction amount is greater than 3x their rolling 5-transaction average.

## 7. Conditional Logic, Pivoting & Data Transformation

50. 🔴 P0 [Q] What is the difference between a Simple `CASE` expression and a Searched `CASE WHEN` expression, and what is their short-circuit evaluation order?
51. 🔴 P0 [Q] How do you pivot rows into columns in standard SQL without vendor-specific keywords using conditional aggregation?
52. 🟠 P1 [Q] How do you unpivot columns into rows using `UNION ALL` or `CROSS JOIN LATERAL` in relational SQL?
53. 🟠 P1 [Q] What are the most common string manipulation functions in SQL (`CONCAT`, `CONCAT_WS`, `SUBSTRING`, `SPLIT_PART`, `TRIM`, `REPLACE`)?
54. 🔴 P0 [Q] What is the difference between `COALESCE` and `NULLIF`, and how do you use them to prevent division-by-zero errors (`1 / NULLIF(x, 0)`)?
55. 🔴 P0 [Q] How do date-time manipulation functions work (`DATE_TRUNC`, `EXTRACT`, `DATEDIFF`, interval math), and how do you calculate user age from birthdate?
56. 🔴 P0 [Q] Write a query to pivot monthly sales totals into 12 distinct month columns (`Jan`, `Feb`, ..., `Dec`) for each product category.
57. 🟠 P1 [Q] Write a query to classify users into loyalty tiers (`Bronze`, `Silver`, `Gold`, `Platinum`) based on purchase frequency and total lifetime spend.

## 8. Set Operations, Upserts & DML Mechanics

58. 🔴 P0 [C] What is the difference between `UNION` and `UNION ALL`, why is `UNION ALL` significantly faster, and what are the schema union compatibility requirements?
59. 🔴 P0 [Q] What do `INTERSECT` and `EXCEPT` (or `MINUS`) do, and how do they handle duplicate rows and `NULL` values?
60. 🔴 P0 [Q] What is an `UPSERT` operation, and how do PostgreSQL (`ON CONFLICT (col) DO UPDATE`) and MySQL (`ON DUPLICATE KEY UPDATE`) implement it?
61. 🟠 P1 [Q] How do you perform writable Common Table Expressions with `RETURNING` clauses in PostgreSQL to atomically move or archive data between tables?
62. 🟠 P1 [C] What is the difference between `TRUNCATE`, `DELETE`, and `DROP` in terms of rollback capability, transaction log overhead, and triggers?
63. 🔴 P0 [Q] Write an idempotent `UPSERT` query that inserts a new user session or increments their login count and updates `last_login_at` on primary key conflict.
64. 🔴 P0 [Q] Write a query to deduplicate a table in-place, deleting all duplicate records while keeping the row with the latest `created_at` timestamp.

## 9. Business Metrics & Real-World Product Analytics Queries

65. 🔴 P0 [Q] How do you calculate Day 1, Day 7, and Day 30 User Retention Rates using cohort analysis in SQL?
66. 🔴 P0 [Q] How do you calculate Monthly Churn Rate for a SaaS subscription product?
67. 🔴 P0 [Q] How do you compute Daily Active Users (DAU), Monthly Active Users (MAU), and the DAU/MAU Stickiness Ratio in SQL?
68. 🔴 P0 [Q] How do you analyze an E-commerce conversion funnel (Visitor → View Item → Add to Cart → Purchase) to calculate step-by-step drop-off rates?
69. 🟠 P1 [Q] How do you calculate Customer Lifetime Value (LTV) and Average Order Value (AOV) grouped by customer acquisition month?
70. 🟠 P1 [Q] Write a query to detect rapid financial transaction fraud: Flag any user who makes 2 or more transactions within 60 seconds from different IP addresses.
71. 🔴 P0 [Q] Write a query to generate a complete monthly cohort retention matrix showing the percentage of users retained in month 1, 2, 3, etc. after registration.
72. 🟠 P1 [Q] Write a query to find "Reactivated Users": Users who were active this month, inactive last month, but active at least once in prior history.

## 10. Query Optimization, Indexing Interactions & Execution Plan Tuning

73. 🔴 P0 [P] What is SARGability (Search Argument Able), and why does wrapping an indexed column in a function (`WHERE DATE(created_at) = '2026-01-01'`) destroy index seeks?
74. 🔴 P0 [P] How do multi-column Composite Indexes work, and what is the Leftmost Prefix Rule for query filters and range scans?
75. 🔴 P0 [P] What is a Covering Index (`INCLUDE` clause), and why does it enable Index-Only Scans by eliminating table heap lookups?
76. 🔴 P0 [P] Why is Keyset Pagination (Seek method: `WHERE id > last_seen_id LIMIT 20`) exponentially faster than Offset Pagination (`OFFSET 500000 LIMIT 20`) on large tables?
77. 🔴 P0 [P] How do you interpret `EXPLAIN ANALYZE` output (Seq Scan vs Index Scan vs Index Only Scan vs Bitmap Scan, Hash Join vs Nested Loop, actual time vs cost)?
78. 🟠 P1 [P] What causes a database join or sort operation to spill to disk (TempDB / disk work files), and how do you resolve it?
79. 🔴 P0 [P] Rewrite a non-SARGable query (`WHERE YEAR(order_date) = 2026 AND UPPER(status) = 'PAID'`) to make it fully SARGable for B-Tree index seeks.
80. 🔴 P0 [P] Rewrite a slow deep-offset pagination query on a 10-million row table into an ultra-fast Keyset Pagination query.

---

## Revision Modes

- **Core Fast-Sweep (P0 Only):** All 🔴 P0 questions (Execution Order, NULL Logic, Aggregation, All JOINs, Anti-Joins, CTEs, Window Ranking & Offsets, Upserts, Retention, SARGability, Keyset Pagination).
- **SQL Problem Solving Round:** Focus on [Section 2 · Aggregation](answers/02-aggregations-grouping-and-filtering.md), [Section 3 · JOINs](answers/03-joins-and-multi-table-queries.md), [Section 4 · CTEs](answers/04-subqueries-and-common-table-expressions.md), and [Section 5 · Window Functions](answers/05-window-functions-ranking-and-offsets.md).
- **Product & Analytics Engineering Round:** Focus on [Section 6 · Running Frames](answers/06-window-functions-running-aggregates-and-frames.md), [Section 7 · Pivoting](answers/07-conditional-logic-pivoting-and-transforms.md), and [Section 9 · Business Metrics](answers/09-business-metrics-and-product-analytics.md).
- **Performance & DBA Optimization Round:** Focus on [Section 8 · Set Operations & Upserts](answers/08-set-operations-upserts-and-dml-mechanics.md) and [Section 10 · Query Optimization & Execution Plans](answers/10-query-optimization-and-performance-tuning.md).
