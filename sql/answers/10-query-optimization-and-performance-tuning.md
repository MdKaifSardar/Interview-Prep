[⬅️ Previous: 09 · Business Metrics & Analytics](09-business-metrics-and-product-analytics.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

---

## 10. Query Optimization, Indexing Interactions & Execution Plan Tuning

### 73. 🔴 P0 [P] What is SARGability (Search Argument Able), and why does wrapping an indexed column in a function (`WHERE DATE(created_at) = '2026-01-01'`) destroy index seeks?

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

### 74. 🔴 P0 [P] How do multi-column Composite Indexes work, and what is the Leftmost Prefix Rule for query filters and range scans?

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

### 75. 🔴 P0 [P] What is a Covering Index (`INCLUDE` clause), and why does it enable Index-Only Scans by eliminating table heap lookups?

> **TL;DR:** A Covering Index contains all columns requested by a query. When a query is covered, the database satisfies the request directly from the B-Tree index pages without touching the primary table heap (an **Index-Only Scan**), eliminating 90%+ of physical disk I/O.

#### 💡 Core Concept & Explanation
In a standard secondary index scan:
1. Engine traverses the secondary B-Tree to find matching leaf nodes ($O(\log N)$).
2. Leaf nodes contain table pointers (Row IDs / Tuples).
3. Engine must make random I/O trips to the physical table heap to fetch unindexed columns (Double lookups).
With the `INCLUDE` clause (PostgreSQL / MSSQL), non-key columns are stored in the leaf pages without being part of the B-Tree sort key.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Standard Index: Requires reading table heap to retrieve total_amount & created_at
CREATE INDEX idx_orders_cust_id ON orders (customer_id);

-- Covering Index using INCLUDE:
CREATE INDEX idx_orders_cust_covering ON orders (customer_id) 
INCLUDE (total_amount, created_at);

-- Query: Satisfied completely within the index leaf pages!
SELECT customer_id, total_amount, created_at
FROM orders
WHERE customer_id = 101;

-- Execution Plan Output:
-- -> Index Only Scan using idx_orders_cust_covering on orders  (cost=0.42..8.44 rows=1 width=24)
--    Heap Fetches: 0   <-- Zero random reads from physical disk table!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Why not just add the extra columns to the composite index key `(customer_id, total_amount, created_at)`?
  Because every column in the index key increases B-Tree node sorting overhead, index depth, and splits. The `INCLUDE` clause stores columns payload-only at the leaf level, keeping the B-Tree branch nodes slim and fast.

---

### 76. 🔴 P0 [P] Why is Keyset Pagination (Seek method: `WHERE id > last_seen_id LIMIT 20`) exponentially faster than Offset Pagination (`OFFSET 500000 LIMIT 20`) on large tables?

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

### 77. 🔴 P0 [P] How do you interpret `EXPLAIN ANALYZE` output (Seq Scan vs Index Scan vs Index Only Scan vs Bitmap Scan, Hash Join vs Nested Loop, actual time vs cost)?

> **TL;DR:** `EXPLAIN` shows the query planner's estimated cost; `EXPLAIN ANALYZE` actually executes the query and shows real runtime, memory buffers, and loop counts. Look for: (1) **Seq Scan** on large tables, (2) discrepancies between **estimated vs actual rows** (indicating stale table statistics), and (3) disk spills in sorts/joins.

#### 💡 Core Concept & Explanation
Key Node Types in Execution Plans:
- **Seq Scan (Full Table Scan):** Reads every page of the table from disk. Acceptable only on tiny tables (<1,000 rows).
- **Index Scan:** Traverses B-Tree to find row IDs, then fetches rows from the table heap.
- **Index Only Scan:** Satisfies query entirely from index leaf pages (zero heap lookups).
- **Bitmap Index Scan:** Scans index, builds an in-memory bitmap of matching pages, and reads physical heap pages in sequential disk order (reduces random I/O).
- **Nested Loop Join:** Optimal for small driving sets ($M$) with an index on the inner table ($O(M \log N)$).
- **Hash Join:** Builds an in-memory hash table of the smaller relation, then streams the larger table against it ($O(M + N)$).

#### 🛠️ Code / Visual Diagram / Table

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.email = 'alice@example.com';
```

```
Sample Execution Plan:
Nested Loop  (cost=0.57..16.64 rows=5 width=44) (actual time=0.045..0.052 rows=3 loops=1)
  Buffers: shared hit=8
  ->  Index Scan using idx_users_email on users u  (cost=0.29..8.30 rows=1 width=36) (actual time=0.021..0.022 rows=1 loops=1)
        Index Cond: (email = 'alice@example.com'::text)
        Buffers: shared hit=4
  ->  Index Scan using idx_orders_user_id on orders o  (cost=0.29..8.31 rows=5 width=12) (actual time=0.018..0.023 rows=3 loops=1)
        Index Cond: (user_id = u.id)
        Buffers: shared hit=4
Planning Time: 0.182 ms
Execution Time: 0.081 ms
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Notice `Buffers: shared hit=8`. `shared hit` means data pages were served directly from memory (RAM buffer pool). `shared read` means physical disk reads were required. Zero disk reads means optimal cache utilization.

---

### 78. 🟠 P1 [P] What causes a database join or sort operation to spill to disk (TempDB / disk work files), and how do you resolve it?

> **TL;DR:** When the memory required for an in-memory sort or hash join exceeds the session memory limit (`work_mem` in PostgreSQL, `sort_buffer_size` in MySQL), the engine spills the intermediate dataset to temporary disk files. Disk I/O is 1,000x slower than RAM, causing query latency to spike.

#### 💡 Core Concept & Explanation
In execution plans, look for:
`Sort Method: external merge  Disk: 42560kB`
This tells you the database ran out of RAM and wrote 42MB of temporary data to disk!
Resolutions:
1. **Index Optimization:** Add a B-Tree index matching the `ORDER BY` columns. A B-Tree index is already physically sorted; the database can read keys in order without performing any in-memory or on-disk sort!
2. **Tune Session Memory:** Increase `work_mem` for the specific complex report transaction: `SET work_mem = '64MB';`.
3. **Column Projection Pruning:** Remove unnecessary columns from `SELECT *` to reduce row width in memory.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Fix 1: Eliminating Sort via B-Tree Index:
CREATE INDEX idx_orders_sorted ON orders (created_at DESC);

-- Query: Planner performs backwards index scan with ZERO sort overhead!
SELECT id, customer_id, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 50;

-- Fix 2: Setting temporary memory for a massive batch aggregation:
SET work_mem = '128MB';
SELECT department_id, COUNT(DISTINCT employee_id), SUM(salary)
FROM massive_payroll
GROUP BY department_id;
RESET work_mem;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Never set `work_mem` globally to an absurdly high number (e.g. 1GB) in server config! `work_mem` is allocated **per sort/hash operation per query per connection**. If 100 concurrent queries each execute 4 sort operations, the server will quickly suffer an Out-Of-Memory (OOM) crash.

---

### 79. 🔴 P0 [P] Rewrite a non-SARGable query (`WHERE YEAR(order_date) = 2026 AND UPPER(status) = 'PAID'`) to make it fully SARGable for B-Tree index seeks.

> **TL;DR:** Transform the date function into an explicit half-open interval range: `order_date >= '2026-01-01' AND order_date < '2027-01-01'`. If `status` contains mixed case in the database, either normalize inputs at write-time, or create an expression index on `UPPER(status)`.

#### 💡 Core Concept & Explanation
Non-SARGable functions on column names blind the B-Tree optimizer. Rewriting expressions to isolate the indexed column preserves index seek capability.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Index on table:
CREATE INDEX idx_orders_date_status ON orders (order_date, status);

-- SLOW (Non-SARGable): Full table scan on 10 million rows
SELECT id, customer_id, total_amount
FROM orders
WHERE YEAR(order_date) = 2026 
  AND UPPER(status) = 'PAID';

-- FAST (Fully SARGable Rewrite): Index Range Seek!
SELECT id, customer_id, total_amount
FROM orders
WHERE order_date >= '2026-01-01 00:00:00' 
  AND order_date <  '2027-01-01 00:00:00'
  AND status = 'PAID'; -- Assumes normalized uppercase storage
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Why use half-open range `< '2027-01-01'` instead of `BETWEEN '2026-01-01' AND '2026-12-31'`?
  Because timestamp values include fractional seconds (`2026-12-31 23:59:59.999`). A query with `BETWEEN '2026-01-01' AND '2026-12-31'` accidentally excludes orders placed in the afternoon of December 31st! Half-open intervals (`>= '2026-01-01' AND < '2027-01-01'`) capture every microsecond flawlessly.

---

### 80. 🔴 P0 [P] Rewrite a slow deep-offset pagination query on a 10-million row table into an ultra-fast Keyset Pagination query.

> **TL;DR:** Replace `LIMIT 20 OFFSET 500000` with Keyset Seek: `WHERE (created_at, id) < (:last_seen_created_at, :last_seen_id) ORDER BY created_at DESC, id DESC LIMIT 20`. Supported by a composite index on `(created_at DESC, id DESC)`, this executes in under 1ms regardless of table size.

#### 💡 Core Concept & Explanation
Keyset Pagination (also known as the Cursor or Seek Method) leverages the composite index ordering to binary search directly to the boundary position of the last seen record.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Step 1: Create Composite Index supporting the cursor:
CREATE INDEX idx_articles_cursor ON articles (created_at DESC, id DESC);

-- Step 2: Page 1 (Initial API Request):
SELECT id, title, created_at
FROM articles
ORDER BY created_at DESC, id DESC
LIMIT 20;
-- (Application saves cursor: last_created_at = '2026-03-01 10:15:00', last_id = 98124)

-- Step 3: Page 25,000 (Deep Pagination Request via Cursor):
SELECT id, title, created_at
FROM articles
WHERE (created_at, id) < ('2026-03-01 10:15:00'::timestamp, 98124)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- Execution Plan:
-- -> Index Only Scan using idx_articles_cursor on articles (cost=0.43..2.85 rows=20 width=36)
--    Execution Time: 0.042 ms!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Why is `id` included in the index and cursor condition alongside `created_at`?
  Because timestamps are not unique! Multiple articles or events can share the exact same millisecond timestamp. The unique primary key `id` acts as a deterministic tie-breaker, guaranteeing that no items are skipped or duplicated at pagination boundaries.

---

[⬅️ Previous: 09 · Business Metrics & Analytics](09-business-metrics-and-product-analytics.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)
