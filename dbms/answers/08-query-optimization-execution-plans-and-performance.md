[⬅️ Previous: 07 · Subqueries & Window Functions](07-subqueries-window-functions-views-and-procedures.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Storage Engines & Scaling ➡️](09-relational-architecture-storage-engines-and-scaling.md)

---

## 8. Query Optimization, Execution Plans & Performance

### 54. 🔴 P0 [P] What is a Query Execution Plan? How do you use `EXPLAIN` / `EXPLAIN ANALYZE` to debug a slow SQL query?

> **TL;DR:** An Execution Plan shows the exact steps chosen by the SQL Query Optimizer. `EXPLAIN` shows estimated costs; `EXPLAIN ANALYZE` executes the query and reports actual runtime execution metrics.

#### 💡 Core Concept & Explanation
Key metrics to inspect in `EXPLAIN ANALYZE`:
1. **Node Type:** `Seq Scan` (Full Table Scan) vs `Index Scan` vs `Index Only Scan`.
2. **Actual Time:** Time taken in milliseconds for stage.
3. **Rows:** Estimated vs Actual rows returned.

---

### 55. 🔴 P0 [P] What is a Full Table Scan (`Seq Scan`), and how do you rewrite a query to enforce an Index Scan?

> **TL;DR:** A Full Table Scan reads every page on disk. Fix by creating an index on `WHERE`/`JOIN` columns, or rewriting non-SARGable query expressions.

---

### 56. 🔴 P0 [P] Why does wrapping an indexed column in a function (Non-SARGable query) disable index usage?

> **TL;DR:** Wrapping an indexed column in a function (e.g. `WHERE YEAR(created_at) = 2026`) prevents the B-Tree optimizer from using range evaluation because function outputs are un-indexed.

#### 💡 Core Concept & Explanation
Rewrite Non-SARGable queries into SARGable (Search Argument Able) range queries:

```sql
-- NON-SARGABLE (Disables Index Scan -> Causes Full Table Scan!):
SELECT * FROM orders WHERE YEAR(created_at) = 2026;

-- REWRITTEN SARGABLE (Enforces Fast B-Tree Index Scan!):
SELECT * FROM orders 
WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';
```

---

### 57. 🔴 P0 [P] What is Connection Pooling in backend development, and why is opening a new SQL connection per request dangerous?

> **TL;DR:** Connection pooling maintains a reusable warm pool of TCP database connections (e.g. HikariCP, PgBouncer). Opening connections per request adds 50ms+ latency overhead and quickly exhausts database connection limits (`max_connections`).

---

### 58. 🟠 P1 [P] Why is `SELECT *` considered a bad practice in production APIs?

> **TL;DR:** `SELECT *` wastes network bandwidth, increases RAM usage, prevents **Covering Index (`Index Only Scan`)** optimizations, and risks breaking client code when new table columns are added.

---

### 59. 🟠 P1 [P] How do you handle N+1 query problems when fetching relational data in backend ORMs?

> **TL;DR:** The N+1 problem occurs when an ORM executes 1 query for parent records + N separate queries for child records. Fix by using **Eager Loading** (`JOIN FETCH` / `include` / `select_related`).

---

[⬅️ Previous: 07 · Subqueries & Window Functions](07-subqueries-window-functions-views-and-procedures.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Storage Engines & Scaling ➡️](09-relational-architecture-storage-engines-and-scaling.md)
