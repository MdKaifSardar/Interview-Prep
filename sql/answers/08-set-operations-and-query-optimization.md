[⬅️ Previous: 07 · Conditional Logic & Pivoting](07-conditional-logic-pivoting-and-transforms.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

---

## 8. Set Operations, DML & Query Performance Optimization

### 36. 🔴 P0 [C] What is the difference between `UNION` and `UNION ALL`, why is `UNION ALL` significantly faster, and what are the schema union compatibility requirements?

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

---

### 37. 🟠 P1 [C] What is the difference between `TRUNCATE`, `DELETE`, and `DROP` in terms of rollback capability, transaction log overhead, and triggers?

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

---

### 38. 🔴 P0 [P] What is SARGability (Search Argument Able), and why does wrapping an indexed column in a function (`WHERE DATE(created_at) = '2026-01-01'`) destroy index seeks?

> **TL;DR:** A query predicate is SARGable if the database query engine can use a B-Tree index seek to locate matching rows in $O(\log N)$ time. Wrapping an indexed column inside a function or mathematical operation (e.g. `DATE(col)`, `col + 1`, `LOWER(col)`) prevents the engine from calculating index bounds, destroying the index seek and forcing a full table scan ($O(N)$).

#### 💡 Core Concept & Explanation
A B-Tree index stores keys in sorted order based on the column's raw, unmutated binary values.
When you write: `WHERE created_at >= '2026-01-01 00:00:00' AND created_at < '2026-01-02 00:00:00'`, the engine performs an instant $O(\log N)$ B-Tree binary search to the exact leaf page and scans forward.
When you write: `WHERE DATE(created_at) = '2026-01-01'`, the engine cannot know what `DATE(x)` will evaluate to without applying the function to every single row in the table! It must execute the `DATE()` function across 10,000,000 rows.

#### 🛠️ Code / Visual Diagram / Table

| Non-SARGable Query (Destroys Index) | SARGable Equivalent (Fast Index Seek) |
|---|---|
| `WHERE DATE(created_at) = '2026-01-01'` | `WHERE created_at >= '2026-01-01' AND created_at < '2026-01-02'` |
| `WHERE price * 1.10 > 100` | `WHERE price > 100 / 1.10` |
| `WHERE SUBSTRING(phone, 1, 3) = '555'` | `WHERE phone LIKE '555%'` |
| `WHERE LOWER(email) = 'test@example.com'` | Expression Index: `CREATE INDEX ON users(LOWER(email))` |
| `WHERE status != 'DELETED'` | Negation scans everything (Rephrase to positive equality) |

#### ⚠️ Interview Pitfall / Pro-Tip
- If you must query on an expression frequently, explain that you can create an **Expression / Functional Index**: `CREATE INDEX idx_users_lower_email ON users(LOWER(email));`. Once created, `WHERE LOWER(email) = ...` becomes SARGable.

---

---

### 39. 🔴 P0 [P] How do multi-column Composite Indexes work, and what is the Leftmost Prefix Rule for query filters and range scans?

> **TL;DR:** A composite index `(A, B, C)` sorts data first by `A`, then by `B` within identical `A`s, and then by `C` within identical `B`s. The **Leftmost Prefix Rule** states that an index can only be used if the query filters by leading columns (`A`, or `A AND B`, or `A AND B AND C`). Searching on `B` alone or `C` alone cannot use the index.

#### 💡 Core Concept & Explanation
Think of a composite index like an old-fashioned physical telephone phonebook sorted by `(LastName, FirstName)`:
- Looking up `LastName = 'Smith'` is instant (Leftmost prefix).
- Looking up `LastName = 'Smith' AND FirstName = 'John'` is instant.
- Looking up `FirstName = 'John'` alone is completely useless—you must read the entire phonebook from cover to cover!
Furthermore, **Range Conditions Stop Index Prefix Matching**:
If a query uses a range filter on `B` (`WHERE A = 1 AND B > 10 AND C = 'active'`), the index seek is used for `A` and `B`, but `C` **cannot be used for an index seek** because the sorted sequence of `C` is broken once multiple `B` values are matched.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Composite Index Definition:
CREATE INDEX idx_orders_cust_status_date ON orders (customer_id, status, order_date);

-- Queries that use the index:
SELECT * FROM orders WHERE customer_id = 42;                             -- Uses index (A)
SELECT * FROM orders WHERE customer_id = 42 AND status = 'shipped';       -- Uses index (A, B)
SELECT * FROM orders WHERE customer_id = 42 AND status = 'shipped' AND order_date >= '2026-01-01'; -- Uses index (A, B, C)

-- Queries that CANNOT use index seeks:
SELECT * FROM orders WHERE status = 'shipped';                           -- Full Table Scan! (Skips A)
SELECT * FROM orders WHERE status = 'shipped' AND order_date >= '2026-01-01'; -- Full Table Scan! (Skips A)
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Golden Rule for Composite Index Column Ordering:
  1. Equality columns first (columns filtered with `=`).
  2. Range columns second (columns filtered with `<`, `>`, `BETWEEN`, `LIKE 'prefix%'`).
  3. Sort / Projection columns last (columns in `ORDER BY` or `SELECT`).

---

---

### 40. 🔴 P0 [P] Why is Keyset Pagination (Seek method: `WHERE id > last_seen_id LIMIT 20`) exponentially faster than Offset Pagination (`OFFSET 500000 LIMIT 20`) on large tables?

> **TL;DR:** `OFFSET 500000` forces the database engine to fetch, sort, and discard 500,000 rows before returning 20. Keyset Pagination uses a direct B-Tree index seek on the last-seen identifier (`WHERE id > 500000 LIMIT 20`), jumping directly to the target record in $O(\log N)$ time and scanning only 20 rows.

#### 💡 Core Concept & Explanation
Latency comparison across 10 million rows:
- `OFFSET 0 LIMIT 20`: ~1ms
- `OFFSET 50,000 LIMIT 20`: ~45ms
- `OFFSET 500,000 LIMIT 20`: ~850ms
- `OFFSET 5,000,000 LIMIT 20`: ~9,200ms (Database timeout)
- Keyset Pagination at any page depth: **~1ms constant time ($O(\log N)$)**.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Catastrophic Offset Pagination:
SELECT id, title, created_at 
FROM articles 
ORDER BY id ASC 
LIMIT 20 OFFSET 500000; -- Reads 500,020 rows!

-- Scalable Keyset Pagination:
SELECT id, title, created_at 
FROM articles 
WHERE id > 500000 
ORDER BY id ASC 
LIMIT 20; -- Reads exactly 20 rows via index seek!

-- Multi-column Keyset (Sorting by created_at DESC with id tie-breaker):
SELECT id, title, created_at
FROM articles
WHERE (created_at, id) < (:last_created_at, :last_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- What is the trade-off of Keyset pagination?
  Keyset pagination does not allow jumping directly to arbitrary pages (e.g. "Jump to Page 47"). It only supports Next / Previous cursor navigation (standard for infinite scroll and modern API endpoints like Stripe, Twitter, GitHub).

---

---

[⬅️ Previous: 07 · Conditional Logic & Pivoting](07-conditional-logic-pivoting-and-transforms.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)
