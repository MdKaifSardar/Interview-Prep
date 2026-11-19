# SQL Technical Interview Master List (70 Questions)

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
10. 🔴 P0 [Q] Write a query to calculate the average, minimum, maximum salary, and employee headcount for each department. — [LC 1075: Project Employees I](https://leetcode.com/problems/project-employees-i/) / [Local Lab 01](lab/exercises/01_department_salary_stats/README.md)
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
20. 🔴 P0 [Q] Write a recursive CTE to traverse an employee organizational chart and compute the management depth/level for every employee from the CEO downwards. — [LC 1270 (Premium)](https://leetcode.com/problems/all-people-report-to-the-given-manager/) / [Local Lab 02](lab/exercises/02_recursive_org_chart/README.md)
## Window Functions — Ranking, Offsets & Partitions

21. 🔴 P0 [C] What are Window Functions in SQL, how does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`, and why don't window functions collapse rows?
22. 🔴 P0 [Q] Explain the exact differences between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when duplicate values/ties occur. — [LC 178: Rank Scores](https://leetcode.com/problems/rank-scores/)
23. 🔴 P0 [Q] How do offset window functions `LAG()` and `LEAD()` work, and how do you supply custom default fallback values for boundary rows? — [LC 180: Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/)
24. 🔴 P0 [Q] Write a query to find the top 2 highest-paid employees in each department, properly handling ties. — [LC 185: Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/)
25. 🔴 P0 [Q] Write a query to find the N-th highest salary in a company across all departments without using `LIMIT` or `OFFSET`. — [LC 176: Second Highest Salary](https://leetcode.com/problems/second-highest-salary/) & [LC 177: Nth Highest Salary](https://leetcode.com/problems/nth-highest-salary/)
## Window Functions — Running Aggregates & Sequential Patterns

26. 🔴 P0 [Q] How do you compute a running cumulative total (Running Sum) partitioned by category and ordered by transaction date? — [LC 534 (Premium)](https://leetcode.com/problems/game-play-analysis-iii/) / [Local Lab 03](lab/exercises/03_running_cumulative_sum/README.md)
27. 🔴 P0 [Q] How do you compute a 7-day or 30-day moving average using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`? — [LC 1321: Restaurant Growth](https://leetcode.com/problems/restaurant-growth/)
28. 🟠 P1 [Q] How do you compute the percentage contribution of each row to the total partition sum using window aggregation?
29. 🔴 P0 [Q] Write a query to calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`. — [LC 1193: Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/)
30. 🔴 P0 [Q] Write a query to solve the classic Gaps and Islands problem: Identify consecutive active login streaks for each user. — [LC 1285 / 1454 (Premium)](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/) / [Local Lab 04](lab/exercises/04_gaps_and_islands_streaks/README.md)
## Conditional Logic, Pivoting & Data Transformation

31. 🔴 P0 [Q] What is the difference between a Simple `CASE` expression and a Searched `CASE WHEN` expression, and what is their short-circuit evaluation order?
32. 🔴 P0 [Q] How do you pivot rows into columns in standard SQL without vendor-specific keywords using conditional aggregation? — [LC 1179: Reformat Department Table](https://leetcode.com/problems/reformat-department-table/)
33. 🔴 P0 [Q] What is the difference between `COALESCE` and `NULLIF`, and how do you use them to prevent division-by-zero errors (`1 / NULLIF(x, 0)`)?
34. 🔴 P0 [Q] How do date-time manipulation functions work (`DATE_TRUNC`, `EXTRACT`, `DATEDIFF`, interval math), and how do you calculate user age from birthdate?
35. 🔴 P0 [Q] Write a query to pivot monthly sales totals into 12 distinct month columns (`Jan`, `Feb`, ..., `Dec`) for each product category. — [LC 1179: Reformat Department Table](https://leetcode.com/problems/reformat-department-table/) / [Local Lab 05](lab/exercises/05_twelve_month_financial_pivot/README.md)
## Set Operations, DML & Query Performance Optimization

36. 🔴 P0 [C] What is the difference between `UNION` and `UNION ALL`, why is `UNION ALL` significantly faster, and what are the schema union compatibility requirements?
37. 🟠 P1 [C] What is the difference between `TRUNCATE`, `DELETE`, and `DROP` in terms of rollback capability, transaction log overhead, and triggers?
38. 🔴 P0 [P] What is SARGability (Search Argument Able), and why does wrapping an indexed column in a function (`WHERE DATE(created_at) = '2026-01-01'`) destroy index seeks?
39. 🔴 P0 [P] How do multi-column Composite Indexes work, and what is the Leftmost Prefix Rule for query filters and range scans?
40. 🔴 P0 [P] Why is Keyset Pagination (Seek method: `WHERE id > last_seen_id LIMIT 20`) exponentially faster than Offset Pagination (`OFFSET 500000 LIMIT 20`) on large tables?

## Fundamental Screening & Warm-Up Blueprints

41. 🔴 P0 [Q] [LC 175: Combine Two Tables](https://leetcode.com/problems/combine-two-tables/) — Report first name, last name, city, and state for each person, preserving individuals without an address using a `LEFT JOIN`.
42. 🔴 P0 [Q] [LC 584: Find Customer Referee](https://leetcode.com/problems/find-customer-referee/) — Find names of customers not referred by a specific ID, properly handling Three-Valued Logic (3VL) with `IS NULL` or `COALESCE`.
43. 🔴 P0 [Q] [LC 197: Rising Temperature](https://leetcode.com/problems/rising-temperature/) — Identify all dates with higher temperatures compared to their previous calendar day using date arithmetic (`DATEDIFF` / interval math).
44. 🔴 P0 [Q] [LC 570: Managers with at Least 5 Direct Reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/) — Find managers with at least 5 direct reports using `GROUP BY` and `HAVING` or an inner join with aggregate filtering.
45. 🔴 P0 [Q] [LC 1280: Students and Examinations](https://leetcode.com/problems/students-and-examinations/) — Find the number of times each student attended each exam using a `CROSS JOIN` matrix combined with a `LEFT JOIN`.
46. 🔴 P0 [Q] [LC 577: Employee Bonus](https://leetcode.com/problems/employee-bonus/) — Report employees with bonuses less than 1000, ensuring rows with missing/NULL bonus records are explicitly retained.
47. 🔴 P0 [Q] [LC 1045: Customers Who Bought All Products](https://leetcode.com/problems/customers-who-bought-all-products/) — Identify customers who purchased every single available product using Relational Division (`COUNT(DISTINCT product_key)`).
48. 🟠 P1 [Q] [LC 1141: User Activity for the Past 30 Days I](https://leetcode.com/problems/user-activity-for-the-past-30-days-i/) — Calculate daily active users (DAU) over a rolling 30-day window using date filtering and `COUNT(DISTINCT user_id)`.
49. 🟠 P1 [Q] [LC 1211: Queries Quality and Percentage](https://leetcode.com/problems/queries-quality-and-percentage/) — Calculate query quality and poor query percentage using conditional aggregation (`AVG(rating < 3)` / `ROUND`).
50. 🟠 P1 [Q] [LC 1484: Group Sold Products By The Date](https://leetcode.com/problems/group-sold-products-by-the-date/) — Group distinct sold product names into a comma-separated list per date using string aggregation (`STRING_AGG` / `GROUP_CONCAT`).
51. 🟠 P1 [Q] [LC 1731: The Number of Employees Which Report to Each Employee](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/) — Report manager stats (headcount and rounded average age of direct reports) using a self-join.
52. 🟠 P1 [Q] [LC 1789: Primary Department for Each Employee](https://leetcode.com/problems/primary-department-for-each-employee/) — Retrieve an employee's primary department using flag filtering combined with single-department fallback logic (`UNION` or `COUNT() OVER`).
53. 🟠 P1 [Q] [LC 619: Biggest Single Number](https://leetcode.com/problems/biggest-single-number/) — Find the largest number that appears exactly once in a table, returning `NULL` if no single number exists.
54. 🟠 P1 [Q] [LC 196: Delete Duplicate Emails](https://leetcode.com/problems/delete-duplicate-emails/) — Write a DML statement to delete all duplicate email records while keeping only the unique entry with the smallest ID.
55. 🟠 P1 [Q] [LC 1661: Average Time of Process per Machine](https://leetcode.com/problems/average-time-of-process-per-machine/) — Compute the average processing time per machine by pivoting or joining start and end activity timestamps.

## Advanced High-ROI LeetCode Blueprints

56. 🔴 P0 [Q] [LC 550: Game Play Analysis IV](https://leetcode.com/problems/game-play-analysis-iv/) — Calculate Day-1 user retention fraction: players who logged in again on the exact day after their very first login date.
57. 🔴 P0 [Q] [LC 1204: Last Person to Fit in the Bus](https://leetcode.com/problems/last-person-to-fit-in-the-bus/) — Find the last person who can board a weight-constrained bus using a cumulative running sum with a threshold cutoff.
58. 🔴 P0 [Q] [LC 1907: Count Salary Categories](https://leetcode.com/problems/count-salary-categories/) — Categorize bank accounts into salary tiers, preserving zero-count categories without dropping rows using `UNION ALL`.
59. 🔴 P0 [Q] [LC 1164: Product Price at a Given Date](https://leetcode.com/problems/product-price-at-a-given-date/) — Retrieve product prices as of a specific historical date, falling back to initial default prices for products without prior updates.
60. 🔴 P0 [Q] [LC 626: Exchange Seats](https://leetcode.com/problems/exchange-seats/) — Swap consecutive seat IDs for students, leaving the last student in place if the total count is odd.
61. 🔴 P0 [Q] [LC 1934: Confirmation Rate](https://leetcode.com/problems/confirmation-rate/) — Calculate user signup confirmation rates using a `LEFT JOIN` and conditional average (`AVG(CASE WHEN action = 'confirmed' THEN 1 ELSE 0 END)`).
62. 🟠 P1 [Q] [LC 1174: Immediate Food Delivery II](https://leetcode.com/problems/immediate-food-delivery-ii/) — Calculate the percentage of immediate orders among first-time customer orders.
63. 🟠 P1 [Q] [LC 602: Friend Requests II: Who Has the Most Friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/) — Find the person with the most friends and their friend count by aggregating bidirectional friendship pairs with `UNION ALL`.
64. 🟠 P1 [Q] [LC 1341: Movie Rating](https://leetcode.com/problems/movie-rating/) — Combine results for the most active reviewer and highest-rated movie in a specific month using `UNION ALL` across independent queries.
65. 🔴 P0 [Q] [LC 1795: Rearrange Products Table](https://leetcode.com/problems/rearrange-products-table/) — Unpivot columns into rows without vendor-specific unpivot operators using `UNION ALL` while filtering out `NULL` store prices.
66. 🔴 P0 [Q] [LC 1251: Average Selling Price](https://leetcode.com/problems/average-selling-price/) — Compute the weighted average selling price per product across dynamic date-range pricing intervals.
67. 🟠 P1 [Q] [LC 1633: Percentage of Users Attended a Contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest/) — Calculate contest attendance percentage rounded to two decimal places, ordered by percentage descending.
68. 🟠 P1 [Q] [LC 610: Triangle Judgement](https://leetcode.com/problems/triangle-judgement/) — Validate whether three line segments can form a valid triangle using the Triangle Inequality Theorem (`x + y > z AND ...`).
69. 🟠 P1 [Q] [LC 1667: Fix Names in a Table](https://leetcode.com/problems/fix-names-in-a-table/) — Fix string capitalization so only the first character is uppercase and the rest lowercase using `UPPER()`, `LOWER()`, and `SUBSTRING()`.
70. 🟠 P1 [Q] [LC 1527: Patients With a Condition](https://leetcode.com/problems/patients-with-a-condition/) — Filter text fields for a specific medical prefix code using pattern matching (`LIKE 'DIAB1%' OR LIKE '% DIAB1%'`).

---

## Revision Modes

- **Core Fast-Sweep (P0 Only):** All 🔴 P0 questions (Execution Order, NULL Logic, Aggregation, All JOINs, Anti-Joins, CTEs, Window Ranking & Offsets, Upserts, SARGability, Keyset Pagination).
- **Fundamental Warm-Up Round:** Practice Section 9 (#41–#55) for rapid screening, outer joins, string formatting, and date diffs.
- **Advanced LeetCode Round:** Practice Section 10 (#56–#70) for retention rates, cumulative threshold sums, and unpivoting.
- **SQL Problem Solving Round:** Focus on Sections 2, 3, 4, and 5 (Aggregation, JOINs, CTEs, and Window Functions).
- **Sequential Analytics & Running Calculations:** Focus on Section 6 (Running frames, moving averages, MoM growth, and Gaps/Islands).
- **Performance & Optimization Round:** Focus on Section 8 (Set Operations, SARGability, Composite Indexes, and Keyset Pagination).
