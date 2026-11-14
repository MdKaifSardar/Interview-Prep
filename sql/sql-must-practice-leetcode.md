# Must-Practice LeetCode SQL Coding Master Key (Highest ROI)

> **The Zero-Duplication LeetCode SQL Blueprint Bank:** Curated specifically for rapid technical interview preparation (Backend / Full Stack / 0–1 YOE / Data). Contains zero filler questions. Every problem maps to a distinct, high-frequency query architecture pattern tested in tech rounds.

---

## 🧭 Navigation & Strategy

This guide is organized into two complementary sections:
1. **[Part 1: In-Curriculum LeetCode 1:1 Index](#part-1-in-curriculum-leetcode-11-anchor-index)** — 13 problems already solved in detail inside our [40-Question Interview Curriculum](sql-interview-questions.md), with direct LeetCode submission links.
2. **[Part 2: 15 High-ROI Complementary LeetCode Problems](#part-2-15-high-roi-complementary-leetcode-blueprints)** — 15 non-repeated, battle-tested LeetCode problems covering the remaining query archetypes (retention, unpivoting, threshold cumulative sums, string manipulation, categorical unions).

---

## Part 1: In-Curriculum LeetCode 1:1 Anchor Index

The following 13 problems are already deeply analyzed with full schemas, performance traps, and edge-case gotchas in our main answer bank. Practice them on LeetCode using the direct links below:

| # | Topic / Concept | LeetCode Link | Difficulty | Answer Guide Reference |
| :---: | :--- | :--- | :---: | :--- |
| **Q5** | Find Duplicate Email Addresses | [LC 182: Duplicate Emails](https://leetcode.com/problems/duplicate-emails/) | **Easy** | [Section 1 · Q5](answers/01-sql-foundations-and-execution-order.md#5--p0-q-write-a-query-to-find-all-duplicate-records-based-on-email-address-and-return-their-occurrence-counts) |
| **Q14** | Anti-Join (Customers Who Never Order) | [LC 183: Customers Who Never Order](https://leetcode.com/problems/customers-who-never-order/) | **Easy** | [Section 3 · Q14](answers/03-joins-and-multi-table-queries.md#14--p0-q-what-is-an-anti-join-and-how-do-left-join--where-rightid-is-null-not-exists-and-not-in-compare-in-performance-and-null-handling) |
| **Q15** | Employees Earning More Than Their Manager | [LC 181: Employees Earning More Than Managers](https://leetcode.com/problems/employees-earning-more-than-their-managers/) | **Easy** | [Section 3 · Q15](answers/03-joins-and-multi-table-queries.md#15--p0-q-write-a-query-to-find-all-employees-who-earn-a-higher-salary-than-their-direct-manager-using-a-self-join) |
| **Q20** | Hierarchy & Org-Tree Recursive Traversal | [LC 1270: All People Report to Given Manager](https://leetcode.com/problems/all-people-report-to-the-given-manager/) | **Medium** | [Section 4 · Q20](answers/04-subqueries-and-common-table-expressions.md#20--p0-q-write-a-recursive-cte-to-traverse-an-employee-organizational-chart-and-compute-the-management-depthlevel-for-every-employee-from-the-ceo-downwards) |
| **Q22** | Score Ranking with Duplicate Ties | [LC 178: Rank Scores](https://leetcode.com/problems/rank-scores/) | **Medium** | [Section 5 · Q22](answers/05-window-functions-ranking-and-offsets.md#22--p0-q-explain-the-exact-differences-between-row_number-rank-and-dense_rank-when-duplicate-valuesties-occur) |
| **Q23** | 3+ Consecutive Number Appearances | [LC 180: Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/) | **Medium** | [Section 5 · Q23](answers/05-window-functions-ranking-and-offsets.md#23--p0-q-how-do-offset-window-functions-lag-and-lead-work-and-how-do-you-supply-custom-default-fallback-values-for-boundary-rows) |
| **Q24** | Department Top 3 Salaries (Ties Handled) | [LC 185: Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/) | **Hard** | [Section 5 · Q24](answers/05-window-functions-ranking-and-offsets.md#24--p0-q-write-a-query-to-find-the-top-2-highest-paid-employees-in-each-department-properly-handling-ties) |
| **Q25** | Nth Highest & Second Highest Salary | [LC 176](https://leetcode.com/problems/second-highest-salary/) / [LC 177: Nth Highest Salary](https://leetcode.com/problems/nth-highest-salary/) | **Medium** | [Section 5 · Q25](answers/05-window-functions-ranking-and-offsets.md#25--p0-q-write-a-query-to-find-the-n-th-highest-salary-in-a-company-across-all-departments-without-using-limit-or-offset) |
| **Q26** | Cumulative Running Total per Entity | [LC 534: Game Play Analysis III](https://leetcode.com/problems/game-play-analysis-iii/) | **Medium** | [Section 6 · Q26](answers/06-window-functions-running-aggregates-and-frames.md#26--p0-q-how-do-you-compute-a-running-cumulative-total-running-sum-partitioned-by-category-and-ordered-by-transaction-date) |
| **Q27** | 7-Day Rolling Moving Average | [LC 1321: Restaurant Growth](https://leetcode.com/problems/restaurant-growth/) | **Medium** | [Section 6 · Q27](answers/06-window-functions-running-aggregates-and-frames.md#27--p0-q-how-do-you-compute-a-7-day-or-30-day-moving-average-using-rows-between-6-preceding-and-current-row) |
| **Q29** | Month-over-Month (MoM) Growth Rate | [LC 1193: Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/) | **Medium** | [Section 6 · Q29](answers/06-window-functions-running-aggregates-and-frames.md#29--p0-q-write-a-query-to-calculate-month-over-month-mom-revenue-percentage-growth-using-lag) |
| **Q30** | Gaps & Islands (Continuous Active Streaks) | [LC 1285](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/) / [LC 1454: Active Users](https://leetcode.com/problems/active-users/) | **Medium** | [Section 6 · Q30](answers/06-window-functions-running-aggregates-and-frames.md#30--p0-q-write-a-query-to-solve-the-classic-gaps-and-islands-problem-identify-consecutive-active-login-streaks-for-each-user) |
| **Q32** | Reformat / Pivot Rows into Columns | [LC 1179: Reformat Department Table](https://leetcode.com/problems/reformat-department-table/) | **Easy** | [Section 7 · Q32](answers/07-conditional-logic-pivoting-and-transforms.md#32--p0-q-how-do-you-pivot-rows-into-columns-in-standard-sql-without-vendor-specific-keywords-using-conditional-aggregation) |

---

## Part 2: 15 High-ROI Complementary LeetCode Blueprints

These 15 problems cover the remaining essential interview patterns with **zero duplication** against Part 1.

---

### 1. 🔴 P0 [MED] [LC 550: Game Play Analysis IV](https://leetcode.com/problems/game-play-analysis-iv/)
* **Category / Pattern:** Cohort Day-1 Retention Rate (First Event Date + Date Arithmetic).
* **Problem Brief:** Calculate the fraction of players that logged in again on the exact day after their very first login date, rounded to 2 decimal places.

#### 🛠️ Production SQL Solution
```sql
WITH FirstLogins AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM Activity
    GROUP BY player_id
)
SELECT 
    ROUND(
        COUNT(a.player_id) * 1.0 / (SELECT COUNT(*) FROM FirstLogins), 
        2
    ) AS fraction
FROM FirstLogins f
JOIN Activity a 
  ON f.player_id = a.player_id 
 AND a.event_date = f.first_date + INTERVAL '1 day'; -- PostgreSQL (+ 1 for MySQL / DATE_ADD)
```
> ⚠️ **Interview Trap:** Avoid doing a direct self-join on all consecutive dates. The problem specifically asks for activity on the day after the **first login date only**.

---

### 2. 🔴 P0 [MED] [LC 1204: Last Person to Fit in the Bus](https://leetcode.com/problems/last-person-to-fit-in-the-bus/)
* **Category / Pattern:** Cumulative Window Sum with Threshold Cutoff.
* **Problem Brief:** A bus has a weight capacity of 1000 kg. Find the name of the last person who can board without exceeding 1000 kg.

#### 🛠️ Production SQL Solution
```sql
WITH BoardingQueue AS (
    SELECT 
        person_name,
        turn,
        SUM(weight) OVER (ORDER BY turn ASC) AS cumulative_weight
    FROM Queue
)
SELECT person_name
FROM BoardingQueue
WHERE cumulative_weight <= 1000
ORDER BY turn DESC
LIMIT 1;
```
> ⚠️ **Interview Trap:** Don't compute the running sum in a subquery inside `WHERE`. Window functions cannot be referenced directly in `WHERE`; use a CTE first, then filter.

---

### 3. 🔴 P0 [MED] [LC 1907: Count Salary Categories](https://leetcode.com/problems/count-salary-categories/)
* **Category / Pattern:** Preserving Zero-Count Categories using `UNION ALL`.
* **Problem Brief:** Categorize salaries into `'Low Salary'` (< 20,000), `'Average Salary'` (20,000–50,000), and `'High Salary'` (> 50,000). If no accounts fall into a category, return `0` (not missing rows).

#### 🛠️ Production SQL Solution
```sql
SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count 
FROM Accounts WHERE income < 20000
UNION ALL
SELECT 'Average Salary' AS category, COUNT(*) AS accounts_count 
FROM Accounts WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary' AS category, COUNT(*) AS accounts_count 
FROM Accounts WHERE income > 50000;
```
> ⚠️ **Interview Trap:** A standard `GROUP BY CASE WHEN` will **drop** categories that have 0 occurrences in the table. Using 3 independent queries unified with `UNION ALL` guarantees all three labels are returned.

---

### 4. 🔴 P0 [MED] [LC 1164: Product Price at a Given Date](https://leetcode.com/problems/product-price-at-a-given-date/)
* **Category / Pattern:** Point-in-Time State Reconstruction (Window Filter + `COALESCE` Default).
* **Problem Brief:** Find the price of all products on date `2019-08-16`. The default starting price of every product before any price change is `10`.

#### 🛠️ Production SQL Solution
```sql
WITH LatestPriceBeforeDate AS (
    SELECT 
        product_id,
        new_price,
        ROW_NUMBER() OVER (
            PARTITION BY product_id 
            ORDER BY change_date DESC
        ) AS rn
    FROM Products
    WHERE change_date <= '2019-08-16'
),
AllDistinctProducts AS (
    SELECT DISTINCT product_id FROM Products
)
SELECT 
    p.product_id,
    COALESCE(lp.new_price, 10) AS price
FROM AllDistinctProducts p
LEFT JOIN LatestPriceBeforeDate lp 
  ON p.product_id = lp.product_id AND lp.rn = 1;
```
> ⚠️ **Interview Trap:** Products whose first price change occurred *after* `2019-08-16` must still appear in the output with a price of `10`.

---

### 5. 🔴 P0 [MED] [LC 626: Exchange Seats](https://leetcode.com/problems/exchange-seats/)
* **Category / Pattern:** Parity-Based ID Swapping & Edge-Boundary Handling.
* **Problem Brief:** Swap the seat IDs of every two consecutive students. If the total number of students is odd, the last student's seat ID is not swapped.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    CASE 
        -- If odd and is the final row in the table, don't swap
        WHEN id % 2 != 0 AND id = (SELECT COUNT(*) FROM Seat) THEN id
        -- If odd, swap with the next id
        WHEN id % 2 != 0 THEN id + 1
        -- If even, swap with the previous id
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC;
```

---

### 6. 🔴 P0 [MED] [LC 1934: Confirmation Rate](https://leetcode.com/problems/confirmation-rate/)
* **Category / Pattern:** Outer Join with Conditional Rate Averaging.
* **Problem Brief:** Calculate the confirmation rate of each user (number of confirmed messages divided by total requested messages), rounded to 2 decimal places. Users with no requests have a rate of `0.00`.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    s.user_id,
    ROUND(
        COALESCE(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 0),
        2
    ) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c ON s.user_id = c.user_id
GROUP BY s.user_id;
```

---

### 7. 🟠 P1 [MED] [LC 1174: Immediate Food Delivery II](https://leetcode.com/problems/immediate-food-delivery-ii/)
* **Category / Pattern:** Multi-Column Subquery on First-Event Dates.
* **Problem Brief:** If an order's preferred delivery date is the same as the order date, it is called *immediate*; otherwise *scheduled*. Find the percentage of immediate orders among the **first orders of all customers**, rounded to 2 decimal places.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    ROUND(
        AVG(CASE WHEN order_date = customer_pref_delivery_date THEN 100.0 ELSE 0.0 END),
        2
    ) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);
```

---

### 8. 🟠 P1 [MED] [LC 602: Friend Requests II: Who Has the Most Friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/)
* **Category / Pattern:** Bidirectional Undirected Graph Degree via `UNION ALL`.
* **Problem Brief:** Find the person who has the most friends and their total friend count. Relationships are bidirectional (being requester or accepter counts equally).

#### 🛠️ Production SQL Solution
```sql
WITH AllFriendships AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT id, COUNT(*) AS num
FROM AllFriendships
GROUP BY id
ORDER BY num DESC
LIMIT 1;
```
> ⚠️ **Interview Trap:** Must use `UNION ALL`, not `UNION`. `UNION` dedupes rows and loses accurate counts.

---

### 9. 🟠 P1 [MED] [LC 1341: Movie Rating](https://leetcode.com/problems/movie-rating/)
* **Category / Pattern:** Dual Distinct Subqueries Unified with `UNION ALL` & Lexicographical Ordering.
* **Problem Brief:** 
  1. Find the user who has rated the greatest number of movies (tie-break by user name lexicographically).
  2. Find the movie with the highest average rating in February 2020 (tie-break by movie title lexicographically).

#### 🛠️ Production SQL Solution
```sql
(
    SELECT u.name AS results
    FROM MovieRating mr
    JOIN Users u ON mr.user_id = u.user_id
    GROUP BY mr.user_id, u.name
    ORDER BY COUNT(*) DESC, u.name ASC
    LIMIT 1
)
UNION ALL
(
    SELECT m.title AS results
    FROM MovieRating mr
    JOIN Movies m ON mr.movie_id = m.movie_id
    WHERE mr.created_at >= '2020-02-01' AND mr.created_at <= '2020-02-29'
    GROUP BY mr.movie_id, m.title
    ORDER BY AVG(mr.rating) DESC, m.title ASC
    LIMIT 1
);
```

---

### 10. 🔴 P0 [EASY] [LC 1795: Rearrange Products Table](https://leetcode.com/problems/rearrange-products-table/)
* **Category / Pattern:** Unpivoting Columns into Rows via `UNION ALL`.
* **Problem Brief:** Rearrange the table so each row has `(product_id, store, price)`. If a product is not available in a store, omit that row.

#### 🛠️ Production SQL Solution
```sql
SELECT product_id, 'store1' AS store, store1 AS price FROM Products WHERE store1 IS NOT NULL
UNION ALL
SELECT product_id, 'store2' AS store, store2 AS price FROM Products WHERE store2 IS NOT NULL
UNION ALL
SELECT product_id, 'store3' AS store, store3 AS price FROM Products WHERE store3 IS NOT NULL;
```

---

### 11. 🔴 P0 [EASY] [LC 1251: Average Selling Price](https://leetcode.com/problems/average-selling-price/)
* **Category / Pattern:** Non-Equi Date-Range Join with Zero Division Protection.
* **Problem Brief:** Find the average selling price for each product (`total_price / total_units`). Products with zero units sold must report `0`.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    p.product_id,
    COALESCE(
        ROUND(SUM(p.price * u.units) * 1.0 / NULLIF(SUM(u.units), 0), 2),
        0
    ) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u 
  ON p.product_id = u.product_id 
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;
```
> ⚠️ **Interview Trap:** Wrap division in `NULLIF(SUM(u.units), 0)` combined with `COALESCE(..., 0)` to prevent runtime division-by-zero crashes when no units were sold.

---

### 12. 🟠 P1 [EASY] [LC 1633: Percentage of Users Attended a Contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest/)
* **Category / Pattern:** Scalar Subquery Denominator inside Aggregation.
* **Problem Brief:** Find the percentage of users registered in each contest, rounded to 2 decimal places. Order by percentage DESC, contest_id ASC.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    contest_id,
    ROUND(
        COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users),
        2
    ) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC;
```

---

### 13. 🟠 P1 [EASY] [LC 610: Triangle Judgement](https://leetcode.com/problems/triangle-judgement/)
* **Category / Pattern:** Geometric Inequality Predicate.
* **Problem Brief:** Report for every three line segments whether they can form a valid triangle (`x + y > z AND x + z > y AND y + z > x`).

#### 🛠️ Production SQL Solution
```sql
SELECT 
    x, y, z,
    CASE 
        WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
        ELSE 'No'
    END AS triangle
FROM Triangle;
```

---

### 14. 🟠 P1 [EASY] [LC 1667: Fix Names in a Table](https://leetcode.com/problems/fix-names-in-a-table/)
* **Category / Pattern:** String Capitalization & Substring Slicing.
* **Problem Brief:** Fix names so that only the first character is uppercase and the rest are lowercase. Order by `user_id`.

#### 🛠️ Production SQL Solution
```sql
SELECT 
    user_id,
    CONCAT(
        UPPER(SUBSTRING(name, 1, 1)),
        LOWER(SUBSTRING(name, 2))
    ) AS name
FROM Users
ORDER BY user_id;
```

---

### 15. 🟠 P1 [EASY] [LC 1527: Patients With a Condition](https://leetcode.com/problems/patients-with-a-condition/)
* **Category / Pattern:** Pattern Matching with Prefix Word Boundaries.
* **Problem Brief:** Find patients who have Type I Diabetes (`DIAB1...`). Conditions is a space-separated string of condition codes.

#### 🛠️ Production SQL Solution
```sql
SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' 
   OR conditions LIKE '% DIAB1%';
```
> ⚠️ **Interview Trap:** Searching `LIKE '%DIAB1%'` will falsely match `SADIAB100`. Checking `LIKE 'DIAB1%'` OR `LIKE '% DIAB1%'` ensures `DIAB1` is matched only at the start of a word.

---

## 🎯 1-Page Summary Cheat Sheet for Tech Rounds

| Pattern Family | Primary Trigger Words in Problem | LeetCode Archetypes |
| :--- | :--- | :--- |
| **Top-N per Group** | *"Top 3 earners per dept"*, *"Nth highest"* | [LC 185](https://leetcode.com/problems/department-top-three-salaries/), [LC 177](https://leetcode.com/problems/nth-highest-salary/) |
| **Running Threshold** | *"Last person before capacity exceeds"*, *"Running total"* | [LC 1204](https://leetcode.com/problems/last-person-to-fit-in-the-bus/), [LC 534](https://leetcode.com/problems/game-play-analysis-iii/) |
| **Cohort Retention** | *"Active next day"*, *"Retention on day 1"* | [LC 550](https://leetcode.com/problems/game-play-analysis-iv/) |
| **Guaranteed Labels** | *"Return 0 if category has no accounts"* | [LC 1907](https://leetcode.com/problems/count-salary-categories/) |
| **Time-Slice Reconstruction** | *"Price on a specific past date"* | [LC 1164](https://leetcode.com/problems/product-price-at-a-given-date/) |
| **Unpivoting** | *"Convert 3 store columns into rows"* | [LC 1795](https://leetcode.com/problems/rearrange-products-table/) |
| **Bidirectional Network** | *"Who has most friends (either requester or accepter)"* | [LC 602](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/) |

