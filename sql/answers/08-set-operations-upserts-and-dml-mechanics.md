[⬅️ Previous: 07 · Conditional Logic & Pivoting](07-conditional-logic-pivoting-and-transforms.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Business Metrics & Analytics ➡️](09-business-metrics-and-product-analytics.md)

---

## 8. Set Operations, Upserts & DML Mechanics

### 58. 🔴 P0 [C] What is the difference between `UNION` and `UNION ALL`, why is `UNION ALL` significantly faster, and what are the schema union compatibility requirements?

> **TL;DR:** `UNION` merges the results of two queries and removes duplicate rows by performing an in-memory or on-disk sort/hash deduplication pass. `UNION ALL` simply concatenates the two streams without deduplicating, making it exponentially faster. Both require matching column counts and compatible data types.

#### 💡 Core Concept & Explanation
- **`UNION`:** Performs an implicit `DISTINCT`. If query A returns 1,000,000 rows and query B returns 1,000,000 rows, the engine must sort or hash 2,000,000 rows ($O(N \log N)$), consuming high CPU and memory buffers.
- **`UNION ALL`:** Appends the row streams as they arrive ($O(1)$ overhead).
- **Compatibility Rules:**
  1. Both queries must project the **exact same number of columns**.
  2. Corresponding columns must share **compatible data types** (or explicit casting must be used).
  3. Column names of the final result set are determined exclusively by the **first query**.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Fast concatenation of historical archives and live transactions:
SELECT id, user_id, amount, 'ARCHIVE' AS source FROM historical_orders
UNION ALL
SELECT id, user_id, amount, 'LIVE' AS source FROM live_orders;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Default to `UNION ALL` unless business logic strictly requires deduplication. Using `UNION` where datasets are already mutually exclusive (such as active vs archived tables) is a major red flag in performance interviews.

---

### 59. 🔴 P0 [Q] What do `INTERSECT` and `EXCEPT` (or `MINUS`) do, and how do they handle duplicate rows and `NULL` values?

> **TL;DR:** `INTERSECT` returns rows that appear in **both** queries ($A \cap B$). `EXCEPT` (called `MINUS` in Oracle) returns rows from the first query that do **not** appear in the second ($A - B$). Both perform implicit deduplication (like `UNION`) and treat identical `NULL` values as matching.

#### 💡 Core Concept & Explanation
In standard set theory, set operations treat rows as distinct mathematical tuples.
Unlike the `=` operator (which returns `UNKNOWN` when comparing `NULL = NULL`), set operations like `INTERSECT` and `EXCEPT` treat two `NULL`s as identical (`NULL IS NOT DISTINCT FROM NULL`).

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Finding users who purchased an iPhone AND purchased AirPods:
SELECT user_id FROM purchases WHERE product_name = 'iPhone'
INTERSECT
SELECT user_id FROM purchases WHERE product_name = 'AirPods';

-- Finding users who visited the checkout page but NEVER completed an order:
SELECT user_id FROM web_events WHERE event_type = 'checkout_view'
EXCEPT
SELECT user_id FROM orders;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In MySQL (prior to MySQL 8.0.31), `INTERSECT` and `EXCEPT` were not supported. In MySQL, you rewrite `INTERSECT` as an `INNER JOIN` or `IN` subquery, and rewrite `EXCEPT` as a `LEFT JOIN ... WHERE NULL` or `NOT EXISTS`.

---

### 60. 🔴 P0 [Q] What is an `UPSERT` operation, and how do PostgreSQL (`ON CONFLICT (col) DO UPDATE`) and MySQL (`ON DUPLICATE KEY UPDATE`) implement it?

> **TL;DR:** An `UPSERT` (Update + Insert) atomically inserts a new row or, if a unique constraint / primary key violation occurs, updates the existing record instead. PostgreSQL uses `ON CONFLICT (col) DO UPDATE SET ...`, while MySQL uses `INSERT INTO ... ON DUPLICATE KEY UPDATE ...`.

#### 💡 Core Concept & Explanation
Without native `UPSERT`, applications must execute a `SELECT` first and then conditionally `INSERT` or `UPDATE`. This introduces a dangerous **Race Condition (Time-of-Check to Time-of-Use)** where two concurrent API requests can attempt to insert simultaneously, causing duplicate key violations.
Native `UPSERT` locks the index leaf page, guaranteeing concurrency-safe atomic execution.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- PostgreSQL Syntax:
INSERT INTO user_login_stats (user_id, login_count, last_login_at)
VALUES (101, 1, NOW())
ON CONFLICT (user_id) 
DO UPDATE SET 
    login_count = user_login_stats.login_count + 1,
    last_login_at = EXCLUDED.last_login_at;

-- MySQL Syntax:
INSERT INTO user_login_stats (user_id, login_count, last_login_at)
VALUES (101, 1, NOW())
ON DUPLICATE KEY UPDATE 
    login_count = login_count + 1,
    last_login_at = VALUES(last_login_at);
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL, notice the special pseudo-table `EXCLUDED`. It represents the values that were submitted in the `INSERT` clause. This allows you to reference both the old existing values (`user_login_stats.col`) and the proposed new values (`EXCLUDED.col`).

---

### 61. 🟠 P1 [Q] How do you perform writable Common Table Expressions with `RETURNING` clauses in PostgreSQL to atomically move or archive data between tables?

> **TL;DR:** PostgreSQL allows `DELETE` or `UPDATE` statements inside a CTE using the `RETURNING *` clause, feeding the modified rows directly into an outer `INSERT` statement in a single atomic transaction.

#### 💡 Core Concept & Explanation
Moving expired sessions or old orders to an archive table usually requires two statements: `INSERT INTO archive SELECT ...` followed by `DELETE FROM live WHERE ...`. If the application server crashes between the two statements, duplicate data or lost records occur.
A writable CTE performs both in a single atomic database operation.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Atomically moving expired sessions from live to archive:
WITH moved_sessions AS (
    DELETE FROM active_sessions
    WHERE expires_at < NOW()
    RETURNING session_id, user_id, ip_address, created_at, NOW() AS archived_at
)
INSERT INTO archived_sessions (session_id, user_id, ip_address, created_at, archived_at)
SELECT session_id, user_id, ip_address, created_at, archived_at
FROM moved_sessions;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- This is one of PostgreSQL's most admired features. Highlighting writable CTEs with `RETURNING` in full-stack/backend interviews demonstrates senior architectural knowledge.

---

### 62. 🟠 P1 [C] What is the difference between `TRUNCATE`, `DELETE`, and `DROP` in terms of rollback capability, transaction log overhead, and triggers?

> **TL;DR:** `DELETE` is a DML row-by-row operation that fires triggers, logs every deleted row in the transaction log (WAL), and is fully rollback-capable. `TRUNCATE` is a DDL operation that deallocates storage data pages instantly with minimal logging, does not fire `FOR EACH ROW` triggers, but is still rollback-capable in PostgreSQL. `DROP` destroys the entire table structure and schema.

#### 💡 Core Concept & Explanation

| Attribute | `DELETE` | `TRUNCATE` | `DROP` |
|---|---|---|---|
| **SQL Category** | DML (Data Manipulation) | DDL (Data Definition) | DDL (Data Definition) |
| **Speed** | Slow ($O(N)$ row scan) | Instant ($O(1)$ page deallocation) | Instant |
| **Filtering (`WHERE`)** | ✅ Supported (`WHERE id = 1`) | ❌ No (Empties entire table) | ❌ No |
| **Triggers** | Fires row-level triggers | Only fires table-level truncate triggers | Fires drop triggers |
| **Auto-Increment Reset** | ❌ No (Leaves identity counter) | ✅ Yes (Resets identity / sequence) | N/A (Table deleted) |
| **Rollback in Transaction** | ✅ Fully rollback-capable | ✅ Rollback-capable in Postgres / MSSQL (❌ No in MySQL) | ✅ In Postgres (❌ No in MySQL) |

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Proving TRUNCATE rolls back in PostgreSQL:
BEGIN;
TRUNCATE TABLE audit_logs;
SELECT COUNT(*) FROM audit_logs; -- 0 rows
ROLLBACK;
SELECT COUNT(*) FROM audit_logs; -- All rows restored!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Never state that "TRUNCATE cannot be rolled back" without caveat! In MySQL, DDL statements cause an implicit commit. However, in PostgreSQL and SQL Server, `TRUNCATE` is fully transactional and can be rolled back safely inside an active `BEGIN ... ROLLBACK` block.

---

### 63. 🔴 P0 [Q] Write an idempotent `UPSERT` query that inserts a new user session or increments their login count and updates `last_login_at` on primary key conflict.

> **TL;DR:** Define a table with a primary key or unique constraint on `user_id`, and write an atomic `INSERT ... ON CONFLICT DO UPDATE` query.

#### 💡 Core Concept & Explanation
Idempotent design is critical in distributed systems where network retries and webhook deliveries can fire duplicate requests.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE user_login_counter (
    user_id INT PRIMARY KEY,
    login_count INT NOT NULL DEFAULT 1,
    last_ip VARCHAR(45),
    last_login_at TIMESTAMP NOT NULL
);

-- Idempotent Upsert (PostgreSQL):
INSERT INTO user_login_counter (user_id, login_count, last_ip, last_login_at)
VALUES (42, 1, '192.168.1.1', NOW())
ON CONFLICT (user_id) DO UPDATE SET
    login_count = user_login_counter.login_count + 1,
    last_ip = EXCLUDED.last_ip,
    last_login_at = EXCLUDED.last_login_at
RETURNING user_id, login_count, last_login_at;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Make sure the target conflict column (`user_id`) has an explicit `PRIMARY KEY` or `UNIQUE` constraint. `ON CONFLICT` requires a unique index inference target to function.

---

### 64. 🔴 P0 [Q] Write a query to deduplicate a table in-place, deleting all duplicate records while keeping the row with the latest `created_at` timestamp.

> **TL;DR:** Use a CTE with `ROW_NUMBER() OVER (PARTITION BY duplicate_columns ORDER BY created_at DESC)` to rank records, and delete rows where `rnk > 1`.

#### 💡 Core Concept & Explanation
When deduplicating a table in-place, we partition by the duplicate key (e.g. `email` or `user_id`), sort newest-first (`created_at DESC`), and assign row numbers. The latest row receives `rnk = 1`. Any duplicate rows receive `rnk >= 2` and are deleted.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE contacts (
    id INT PRIMARY KEY,
    email VARCHAR(100),
    name VARCHAR(50),
    created_at TIMESTAMP
);

-- In-place Deduplication Query (PostgreSQL / SQL Server):
WITH RankedContacts AS (
    SELECT 
        id,
        ROW_NUMBER() OVER(
            PARTITION BY email 
            ORDER BY created_at DESC, id DESC
        ) AS rnk
    FROM contacts
)
DELETE FROM contacts
WHERE id IN (
    SELECT id 
    FROM RankedContacts 
    WHERE rnk > 1
);

-- Verification:
SELECT email, COUNT(*) FROM contacts GROUP BY email HAVING COUNT(*) > 1; -- 0 rows!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In MySQL, you cannot modify the target table and select from the same table in a subquery directly. In MySQL, you execute this via a self-join delete:
  `DELETE c1 FROM contacts c1 JOIN contacts c2 ON c1.email = c2.email AND c1.created_at < c2.created_at;`

---

[⬅️ Previous: 07 · Conditional Logic & Pivoting](07-conditional-logic-pivoting-and-transforms.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Business Metrics & Analytics ➡️](09-business-metrics-and-product-analytics.md)
