# SQL Technical Interview Master List (40 Questions)

**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Data Engineer / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup & tech interview ROI) · 🟠 P1 Important · 🟡 P2 Advanced / Deep Systems

**Type** — [Q] Practical Query Writing / Problem-Solving · [C] Conceptual & Engine Internals · [D] Schema & Architecture Design · [P] Performance, Indexing & Tuning

---

## SQL Foundations, Execution Order & Basic Querying

1. 🔴 P0 [C] What is the exact logical execution order of a SQL query, and why can't you reference a column alias defined in `SELECT` within the `WHERE` clause?
2. 🔴 P0 [Q] What is Three-Valued Logic in SQL (`TRUE`, `FALSE`, `UNKNOWN`), and why does `col = NULL` evaluate to `UNKNOWN` instead of `TRUE`?
3. 🔴 P0 [Q] What is `DISTINCT`, how does the database engine eliminate duplicate rows internally, and what is its performance penalty?
4. 🔴 P0 [Q] How does `ORDER BY` handle `NULL` values by default, and how do you explicitly enforce `NULLS FIRST` vs `NULLS LAST`?
5. 🔴 P0 [Q] Write a query to find all duplicate records based on email address and return their occurrence counts. — [LC 182: Duplicate Emails](https://leetcode.com/problems/duplicate-emails/)
## Aggregations, Grouping & Multi-Condition Filtering

6. 🔴 P0 [C] What is the difference between the `WHERE` clause and the `HAVING` clause, and when must filtering happen before vs after grouping?
7. 🔴 P0 [C] What is the difference between `COUNT(*)`, `COUNT(column)`, `COUNT(1)`, and `COUNT(DISTINCT column)` in execution and NULL handling?
8. 🔴 P0 [Q] How does multi-column `GROUP BY` work, and why must every column in the `SELECT` list either appear in `GROUP BY` or inside an aggregate function?
9. 🔴 P0 [Q] What is Conditional Aggregation, and how do you use `CASE WHEN` inside `SUM()` or `COUNT()` to compute pivot metrics in a single table scan?
10. 🔴 P0 [Q] Write a query to calculate the average, minimum, maximum salary, and employee headcount for each department.
## Comprehensive JOIN Mechanics & Complex Multi-Table Queries

11. 🔴 P0 [C] Explain the visual mechanics and return sets of all SQL JOIN types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`.
12. 🔴 P0 [Q] What is the critical difference between placing a filter condition in the `ON` clause versus the `WHERE` clause during a `LEFT JOIN` (The Outer Join Nullification Trap)?
13. 🔴 P0 [Q] What is a `SELF JOIN`, and how is it used to model hierarchical and sequential relationships within a single table?
14. 🔴 P0 [Q] What is an Anti-Join, and how do `LEFT JOIN ... WHERE right.id IS NULL`, `NOT EXISTS`, and `NOT IN` compare in performance and NULL handling? — [LC 183: Customers Who Never Order](https://leetcode.com/problems/customers-who-never-order/)
15. 🔴 P0 [Q] Write a query to find all employees who earn a higher salary than their direct manager using a `SELF JOIN`. — [LC 181: Employees Earning More Than Their Managers](https://leetcode.com/problems/employees-earning-more-than-their-managers/)
## Subqueries & Common Table Expressions (CTEs)

16. 🔴 P0 [C] What is the difference between a Non-Correlated Subquery and a Correlated Subquery, and how does the engine execute them?
17. 🔴 P0 [Q] What is the difference between `EXISTS` and `IN` operators, and why does `NOT IN` fail completely if the subquery returns even a single `NULL` value?
18. 🔴 P0 [Q] What is a Common Table Expression (CTE, `WITH` clause), and what advantages does it provide over nested subqueries?
19. 🔴 P0 [Q] What is a Recursive CTE, what are its 4 mandatory components (Anchor, UNION ALL, Recursive Member, Termination), and how does it execute?
20. 🔴 P0 [Q] Write a recursive CTE to traverse an employee organizational chart and compute the management depth/level for every employee from the CEO downwards. — [LC 1270: All People Report to Given Manager](https://leetcode.com/problems/all-people-report-to-the-given-manager/)
## Window Functions — Ranking, Offsets & Partitions

21. 🔴 P0 [C] What are Window Functions in SQL, how does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`, and why don't window functions collapse rows?
22. 🔴 P0 [Q] Explain the exact differences between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when duplicate values/ties occur. — [LC 178: Rank Scores](https://leetcode.com/problems/rank-scores/)
23. 🔴 P0 [Q] How do offset window functions `LAG()` and `LEAD()` work, and how do you supply custom default fallback values for boundary rows? — [LC 180: Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/)
24. 🔴 P0 [Q] Write a query to find the top 2 highest-paid employees in each department, properly handling ties. — [LC 185: Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/)
25. 🔴 P0 [Q] Write a query to find the N-th highest salary in a company across all departments without using `LIMIT` or `OFFSET`. — [LC 176: Second Highest Salary](https://leetcode.com/problems/second-highest-salary/) & [LC 177: Nth Highest Salary](https://leetcode.com/problems/nth-highest-salary/)
## Window Functions — Running Aggregates & Sequential Patterns

26. 🔴 P0 [Q] How do you compute a running cumulative total (Running Sum) partitioned by category and ordered by transaction date? — [LC 534: Game Play Analysis III](https://leetcode.com/problems/game-play-analysis-iii/)
27. 🔴 P0 [Q] How do you compute a 7-day or 30-day moving average using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`? — [LC 1321: Restaurant Growth](https://leetcode.com/problems/restaurant-growth/)
28. 🟠 P1 [Q] How do you compute the percentage contribution of each row to the total partition sum using window aggregation?
29. 🔴 P0 [Q] Write a query to calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`. — [LC 1193: Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/)
30. 🔴 P0 [Q] Write a query to solve the classic Gaps and Islands problem: Identify consecutive active login streaks for each user. — [LC 1285: Continuous Ranges](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/) & [LC 1454: Active Users](https://leetcode.com/problems/active-users/)
## Conditional Logic, Pivoting & Data Transformation

31. 🔴 P0 [Q] What is the difference between a Simple `CASE` expression and a Searched `CASE WHEN` expression, and what is their short-circuit evaluation order?
32. 🔴 P0 [Q] How do you pivot rows into columns in standard SQL without vendor-specific keywords using conditional aggregation? — [LC 1179: Reformat Department Table](https://leetcode.com/problems/reformat-department-table/)
33. 🔴 P0 [Q] What is the difference between `COALESCE` and `NULLIF`, and how do you use them to prevent division-by-zero errors (`1 / NULLIF(x, 0)`)?
34. 🔴 P0 [Q] How do date-time manipulation functions work (`DATE_TRUNC`, `EXTRACT`, `DATEDIFF`, interval math), and how do you calculate user age from birthdate?
35. 🔴 P0 [Q] Write a query to pivot monthly sales totals into 12 distinct month columns (`Jan`, `Feb`, ..., `Dec`) for each product category. — [LC 1179: Reformat Department Table](https://leetcode.com/problems/reformat-department-table/)
## Set Operations, DML & Query Performance Optimization

36. 🔴 P0 [C] What is the difference between `UNION` and `UNION ALL`, why is `UNION ALL` significantly faster, and what are the schema union compatibility requirements?
37. 🟠 P1 [C] What is the difference between `TRUNCATE`, `DELETE`, and `DROP` in terms of rollback capability, transaction log overhead, and triggers?
38. 🔴 P0 [P] What is SARGability (Search Argument Able), and why does wrapping an indexed column in a function (`WHERE DATE(created_at) = '2026-01-01'`) destroy index seeks?
39. 🔴 P0 [P] How do multi-column Composite Indexes work, and what is the Leftmost Prefix Rule for query filters and range scans?
40. 🔴 P0 [P] Why is Keyset Pagination (Seek method: `WHERE id > last_seen_id LIMIT 20`) exponentially faster than Offset Pagination (`OFFSET 500000 LIMIT 20`) on large tables?

---

## Revision Modes

- **Core Fast-Sweep (P0 Only):** All 🔴 P0 questions (Execution Order, NULL Logic, Aggregation, All JOINs, Anti-Joins, CTEs, Window Ranking & Offsets, Upserts, SARGability, Keyset Pagination).
- **SQL Problem Solving Round:** Focus on Sections 2, 3, 4, and 5 (Aggregation, JOINs, CTEs, and Window Functions).
- **Sequential Analytics & Running Calculations:** Focus on Section 6 (Running frames, moving averages, MoM growth, and Gaps/Islands).
- **Performance & Optimization Round:** Focus on Section 8 (Set Operations, SARGability, Composite Indexes, and Keyset Pagination).
