⏮️ (start) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Aggregation & Grouping ➡️](02-aggregations-grouping-and-filtering.md)

---

## 1. SQL Foundations, Execution Order & Basic Querying

### 1. 🔴 P0 [C] What is the exact logical execution order of a SQL query, and why can't you reference a column alias defined in `SELECT` within the `WHERE` clause?

> **TL;DR:** SQL queries execute in 10 sequential logical phases: `FROM` → `ON` → `JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT`. Because `WHERE` executes before `SELECT`, aliases created in `SELECT` do not yet exist in memory during `WHERE` filtering.

#### 💡 Core Concept & Explanation
Unlike procedural programming languages that execute top-to-bottom, SQL is a declarative set-based language executed in logical steps by the query optimizer:
1. **`FROM` & `JOIN`**: Identifies source tables and creates working Cartesian sets.
2. **`ON`**: Filters rows based on join conditions.
3. **`WHERE`**: Filters individual rows before aggregation occurs.
4. **`GROUP BY`**: Collapses filtered rows into discrete grouping buckets.
5. **`HAVING`**: Filters aggregated group rows based on group condition predicates.
6. **`SELECT`**: Evaluates expressions, formats output columns, and assigns column aliases.
7. **`DISTINCT`**: Deduplicates identical tuples across returned projected columns.
8. **`ORDER BY`**: Sorts the final result rows (can reference aliases because it runs after `SELECT`).
9. **`LIMIT` / `OFFSET`**: Discards skipped rows and bounds the returned record slice.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Fails with error: column "total_revenue" does not exist
SELECT product_id, price * quantity AS total_revenue
FROM sales
WHERE total_revenue > 1000; -- ILLEGAL: WHERE evaluates before SELECT

-- Correct: Repeat calculation or use a Common Table Expression (CTE)
SELECT product_id, price * quantity AS total_revenue
FROM sales
WHERE (price * quantity) > 1000;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL and SQL Server, you cannot use `SELECT` aliases in `GROUP BY` or `HAVING` either. However, MySQL allows `SELECT` aliases in `GROUP BY` and `HAVING` as a non-standard vendor extension. In standard ANSI SQL, always repeat the expression or wrap it in a CTE/subquery.

---

### 2. 🔴 P0 [Q] What is Three-Valued Logic in SQL (`TRUE`, `FALSE`, `UNKNOWN`), and why does `col = NULL` evaluate to `UNKNOWN` instead of `TRUE`?

> **TL;DR:** SQL uses Three-Valued Logic (3VL) where boolean expressions evaluate to `TRUE`, `FALSE`, or `UNKNOWN`. `NULL` represents missing or indeterminate information, so comparing anything to `NULL` using `=` returns `UNKNOWN`. To test for NULL, you must use `IS NULL` or `IS NOT NULL`.

#### 💡 Core Concept & Explanation
In SQL philosophy, `NULL` is not a value—it is the absence of a value. Asking *"Does unknown value A equal unknown value B?"* cannot be answered with Yes or No; the answer is Unknown.
- `WHERE` clauses only accept rows where the predicate evaluates strictly to `TRUE`. Rows evaluating to `FALSE` or `UNKNOWN` are discarded.
- Boolean Truth Table in 3VL:
  - `UNKNOWN AND TRUE` $\rightarrow$ `UNKNOWN`
  - `UNKNOWN OR TRUE` $\rightarrow$ `TRUE`
  - `NOT UNKNOWN` $\rightarrow$ `UNKNOWN`

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema & Data Setup
CREATE TABLE candidates (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    referral_code VARCHAR(50)
);

INSERT INTO candidates (id, name, referral_code) VALUES
(1, 'Alice', 'REF100'),
(2, 'Bob', NULL),
(3, 'Charlie', 'REF200');

-- Pitfall Query: Does NOT return Bob!
SELECT * FROM candidates WHERE referral_code = NULL; -- Returns 0 rows!

-- Correct Query:
SELECT * FROM candidates WHERE referral_code IS NULL;
-- Output: [2, 'Bob', NULL]

-- Trap: Finding candidates whose referral code is NOT 'REF100'
SELECT * FROM candidates WHERE referral_code != 'REF100'; 
-- Returns only Charlie! Bob is excluded because (NULL != 'REF100') is UNKNOWN!

-- Correct handling with NULL fallback:
SELECT * FROM candidates WHERE referral_code != 'REF100' OR referral_code IS NULL;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Watch out for `NOT IN (subquery)`! If the subquery contains even a single `NULL` value, the entire `NOT IN` expression evaluates to `UNKNOWN` for all rows, resulting in an empty result set! Always prefer `NOT EXISTS`.

---

### 3. 🔴 P0 [Q] What is `DISTINCT`, how does the database engine eliminate duplicate rows internally, and what is its performance penalty?

> **TL;DR:** `DISTINCT` filters duplicate tuples across all projected columns. The database engine executes deduplication either via **Hash Aggregate** (building an in-memory hash table) or **Sort Unique** (sorting the dataset and scanning consecutive matches), both of which require substantial CPU and memory.

#### 💡 Core Concept & Explanation
`DISTINCT` applies to the entire row tuple of selected columns, never to a single column alone. When executing `DISTINCT`:
1. **Hash Deduplication:** The engine hashes each row tuple. If the hash bucket already contains the tuple, it is dropped. If the hash table exceeds `work_mem`, it spills to temporary disk files.
2. **Sort Deduplication:** The engine sorts all records by all select columns ($O(N \log N)$), then performs a single sequential scan skipping adjacent identical rows.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Evaluates distinct combinations of (country, city)
SELECT DISTINCT country, city 
FROM customers;

-- Query Execution Plan excerpt (PostgreSQL EXPLAIN):
-- -> Unique  (cost=120.50..135.00 rows=50 width=64)
--    -> Sort  (cost=120.50..125.00 rows=1000 width=64)
--          Sort Key: country, city
--          Sort Method: quicksort  Memory: 45kB
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Senior interviewers look for developers using `DISTINCT` as a band-aid to hide flawed `JOIN` logic (e.g. a 1-to-many join creating unwanted duplicate rows). If an API query returns duplicates, fix the join condition or use `EXISTS` rather than masking the bug with an expensive `DISTINCT`.

---

### 4. 🔴 P0 [Q] How does `ORDER BY` handle `NULL` values by default, and how do you explicitly enforce `NULLS FIRST` vs `NULLS LAST`?

> **TL;DR:** By default, PostgreSQL treats `NULL` as larger than any value (`ASC` puts `NULL` last, `DESC` puts `NULL` first). MySQL treats `NULL` as smaller than any value. Explicitly using `NULLS FIRST` or `NULLS LAST` guarantees consistent, deterministic behavior across all SQL engines.

#### 💡 Core Concept & Explanation
Because `NULL` is unknown, SQL engines must pick an arbitrary placement during index and sorting walks:
- **PostgreSQL / Oracle:** `NULL` = High value.
- **MySQL / SQLite:** `NULL` = Low value.
To maintain database-agnostic code, standard ANSI SQL supports the `NULLS FIRST` / `NULLS LAST` clause directly in the `ORDER BY` statement.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Explicitly enforcing null positions
SELECT id, name, score
FROM leaderboards
ORDER BY score DESC NULLS LAST;

-- Output:
-- | id | name    | score |
-- |----|---------|-------|
-- | 1  | Alice   | 98    |
-- | 3  | Charlie | 85    |
-- | 2  | Bob     | NULL  | (Placed last despite DESC order)

-- MySQL alternative (since MySQL lacks native NULLS LAST in older versions):
SELECT id, name, score
FROM leaderboards
ORDER BY (score IS NULL) ASC, score DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- When creating B-Tree indexes for queries sorted with `NULLS LAST`, you must define the index with the exact same null ordering: `CREATE INDEX idx_score ON leaderboards (score DESC NULLS LAST)`. Otherwise, the query optimizer cannot perform a backwards index scan and forces an in-memory sort.

---

### 5. 🔴 P0 [Q] How does pagination work using `LIMIT` and `OFFSET`, and why does deep offset pagination (`OFFSET 100000`) degrade database performance?

> **TL;DR:** `OFFSET N LIMIT M` forces the database engine to scan and evaluate $N + M$ rows from the disk or index, discarding the first $N$ rows and returning only $M$. At high offsets (e.g., page 5,000), disk I/O and CPU overhead become catastrophic ($O(N)$ latency).

#### 💡 Core Concept & Explanation
When a query requests `OFFSET 100000 LIMIT 20`, the database cannot magically jump to row 100,001 because rows vary in physical size, MVCC visibility, and deletion states. The engine must read, parse, sort, and discard all 100,000 preceding rows.
- **The Optimal Alternative — Keyset Pagination (Seek Method):** Instead of counting offsets, the client sends the cursor value of the last seen primary key or timestamp. The database executes an $O(\log N)$ B-Tree index seek directly: `WHERE id > :last_seen_id ORDER BY id ASC LIMIT 20`.

#### 🛠️ Code / Visual Diagram / Table

```
Offset Pagination (Catastrophic for deep pages):
[Scan 100,000 rows] ──> Discard ──> [Keep 20 rows] (Scanned: 100,020 rows)

Keyset Seek Pagination (Instant):
B-Tree Root ──> Binary Search Seek(id > 89412) ──> [Take next 20 rows] (Scanned: 20 rows)
```

```sql
-- Slow Offset Pagination (Scans 100,020 rows)
SELECT id, title, created_at
FROM posts
ORDER BY id ASC
LIMIT 20 OFFSET 100000;

-- Fast Keyset Pagination (Scans 20 rows via Index Seek)
SELECT id, title, created_at
FROM posts
WHERE id > 100000
ORDER BY id ASC
LIMIT 20;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Keyset pagination also eliminates **page drift** (records being skipped or duplicated when new rows are inserted or deleted while a user navigates from page 1 to page 2).

---

### 6. 🟠 P1 [Q] How do pattern matching operators (`LIKE`, `ILIKE`, `SIMILAR TO`, Regex) work, and how do wildcard positions affect index utilization?

> **TL;DR:** `LIKE` is case-sensitive; `ILIKE` is case-insensitive. A wildcard at the start (`%term`) or middle (`%term%`) invalidates standard B-Tree indexes and forces a Full Table Scan. A prefix search (`term%`) can leverage standard B-Tree index range scans.

#### 💡 Core Concept & Explanation
B-Trees sort characters lexicographically from left to right. When searching for `LIKE 'John%'`, the engine knows the exact lower bound (`John`) and upper bound (`Johp`), allowing an efficient $O(\log N)$ range scan. But when searching for `LIKE '%son'`, any character sequence could precede the suffix, rendering the B-Tree index ordering useless.

#### 🛠️ Code / Visual Diagram / Table

| Pattern | Index Seek Possible? | Execution Mechanism |
|---|---|---|
| `LIKE 'Alex%'` | ✅ Yes | B-Tree Range Scan |
| `LIKE '%Alex'` | ❌ No (Unless Reverse Index exists) | Full Table Scan |
| `LIKE '%Alex%'` | ❌ No (Requires Trigram GIN/GiST index) | Full Table Scan |
| `ILIKE 'alex%'` | ❌ No (Requires expression index on `LOWER(col)`) | Full Table Scan |

```sql
-- Prefix query leveraging standard B-Tree index:
SELECT id, email FROM users WHERE email LIKE 'admin%';

-- Accelerating substring search '%term%' in PostgreSQL with Trigram index:
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_users_email_trgm ON users USING GIN (email gin_trgm_ops);

SELECT id, email FROM users WHERE email ILIKE '%support%'; -- Index Scan via GIN!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Avoid writing `WHERE LOWER(email) = LOWER(:input)` without an expression index (`CREATE INDEX idx_lower_email ON users(LOWER(email))`). Applying a function to an indexed column destroys SARGability.

---

### 7. 🔴 P0 [Q] Write a query to find all duplicate records based on email address and return their occurrence counts.

> **TL;DR:** Group the table by the duplicate candidate column using `GROUP BY email`, then filter for groups with more than one record using `HAVING COUNT(*) > 1`.

#### 💡 Core Concept & Explanation
To identify duplicates, rows sharing identical email values must be grouped together. Because row-level filtering with `WHERE` happens before grouping, group-level filtering must be performed in the `HAVING` clause.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    created_at TIMESTAMP
);

INSERT INTO users VALUES
(1, 'John Doe', 'john@example.com', '2026-01-01 10:00:00'),
(2, 'Jane Smith', 'jane@example.com', '2026-01-02 11:00:00'),
(3, 'John D.', 'john@example.com', '2026-01-03 12:00:00'),
(4, 'Bob Vance', 'bob@example.com', '2026-01-04 14:00:00'),
(5, 'Johnny', 'john@example.com', '2026-01-05 16:00:00');

-- Query: Find duplicate emails and their frequency
SELECT email, COUNT(*) AS duplicate_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Output:
-- | email            | duplicate_count |
-- |------------------|-----------------|
-- | john@example.com | 3               |

-- Follow-up: Retrieve full row details for all duplicate records:
WITH DuplicateEmails AS (
    SELECT email
    FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
SELECT u.id, u.name, u.email, u.created_at
FROM users u
JOIN DuplicateEmails d ON u.email = d.email
ORDER BY u.email, u.created_at;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Remember that `COUNT(*)` counts rows containing `NULL`s, while `COUNT(email)` ignores `NULL`s. If a table contains multiple rows with `NULL` in the email column, `GROUP BY email HAVING COUNT(*) > 1` will include `NULL` as a duplicate group. If `NULL` is an allowed non-duplicate state, add `WHERE email IS NOT NULL` before grouping.

---

### 8. 🟠 P1 [Q] Write a query to filter rows matching multiple boolean conditions where some column values are nullable, avoiding common three-valued logic bugs.

> **TL;DR:** When filtering nullable flags or optional foreign keys, always protect boolean predicates using explicit `IS NULL` conditions or `COALESCE(column, default_value)` to prevent `UNKNOWN` evaluation from silently dropping desired rows.

#### 💡 Core Concept & Explanation
If an employee table has an `is_active` boolean flag where `NULL` means pending review, a naive query like `WHERE is_active != TRUE` will NOT return rows where `is_active IS NULL`, because `NULL != TRUE` evaluates to `UNKNOWN`.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE subscriptions (
    id INT PRIMARY KEY,
    user_id INT,
    is_auto_renew BOOLEAN, -- Can be TRUE, FALSE, or NULL
    discount_code VARCHAR(20) -- Can be string or NULL
);

INSERT INTO subscriptions VALUES
(1, 101, TRUE, 'SAVE20'),
(2, 102, FALSE, NULL),
(3, 103, NULL, 'WELCOME'),
(4, 104, FALSE, 'EXPIRED');

-- Problem: Select all subscriptions that do NOT have auto-renew enabled AND do not use code 'SAVE20'

-- BUGGY QUERY: Excludes id 3 because (is_auto_renew != TRUE) evaluates to UNKNOWN!
SELECT * FROM subscriptions 
WHERE is_auto_renew != TRUE AND discount_code != 'SAVE20';
-- Returned: id 2, 4 only (misses id 3!)

-- CORRECT ROBUST QUERY (Using COALESCE or IS NULL):
SELECT * FROM subscriptions
WHERE COALESCE(is_auto_renew, FALSE) = FALSE
  AND (discount_code != 'SAVE20' OR discount_code IS NULL);

-- Output:
-- | id | user_id | is_auto_renew | discount_code |
-- |----|---------|---------------|---------------|
-- | 2  | 102     | FALSE         | NULL          |
-- | 3  | 103     | NULL          | WELCOME       |
-- | 4  | 104     | FALSE         | EXPIRED       |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL, you can use `IS DISTINCT FROM`: `WHERE is_auto_renew IS DISTINCT FROM TRUE`. `IS DISTINCT FROM` treats `NULL` as a known distinct entity and safely returns `TRUE` when comparing `NULL` with `TRUE`.

---

⏮️ (start) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Aggregation & Grouping ➡️](02-aggregations-grouping-and-filtering.md)
