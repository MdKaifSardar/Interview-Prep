[⬅️ Previous: 06 · Execution Order & JOINs](06-sql-execution-order-and-join-fundamentals.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Query Optimization & Performance ➡️](08-query-optimization-execution-plans-and-performance.md)

---

## 7. Subqueries, Window Functions, Views & Procedures

### 47. 🔴 P0 [Q] What is a Subquery? Distinguish Correlated vs Non-Correlated Subquery.

> **TL;DR:** A **Non-Correlated Subquery** runs independently once for the entire query. A **Correlated Subquery** depends on outer query columns and re-executes **once for every row** processed by the outer query ($O(N)$ execution cost).

#### 💡 Core Concept & Explanation
Performance impact of subquery types.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Non-Correlated (Runs ONCE, fast):
SELECT * FROM employees 
WHERE dept_id IN (SELECT id FROM departments WHERE location = 'Pune');

-- Correlated (Runs ONCE PER ROW, slow if unindexed!):
SELECT e.name, e.salary 
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id); -- Uses e.dept_id from outer row!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Rewrite slow correlated subqueries into `JOIN`s or Window Functions for orders-of-magnitude faster execution.

---

### 48. 🔴 P0 [Q] What is the difference between `IN` vs `EXISTS` operators in SQL?

> **TL;DR:** **`IN`** evaluates subquery results into a list first. **`EXISTS`** returns boolean `TRUE` as soon as it finds the first matching row (short-circuit evaluation). Use `EXISTS` for subqueries filtering on large secondary tables.

#### 💡 Core Concept & Explanation
Query operator mechanics:

#### 🛠️ Code / Visual Diagram / Table

```sql
-- EXISTS (Short-circuits on 1st match!):
SELECT * FROM users u 
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

#### ⚠️ Interview Pitfall / Pro-Tip
`NOT IN` returns **zero rows** if the subquery result contains a single `NULL` value! Always prefer `NOT EXISTS` over `NOT IN` to prevent null-comparison bugs.

---

### 49. 🔴 P0 [Q] What are Window Functions in SQL? How does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`?

> **TL;DR:** Window Functions perform calculations across a set of related rows **without collapsing the rows**. Unlike `GROUP BY` (which reduces N rows to 1 group row), Window Functions retain original individual row identities.

#### 💡 Core Concept & Explanation
Analytical query processing.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- GROUP BY (Collapses 100 rows into 1 average row):
SELECT dept_id, AVG(salary) FROM emp GROUP BY dept_id;

-- WINDOW FUNCTION (Keeps all 100 individual rows AND appends department average column!):
SELECT name, dept_id, salary,
       AVG(salary) OVER(PARTITION BY dept_id) AS dept_avg_salary
FROM emp;
```

---

### 50. 🔴 P0 [Q] What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?

> **TL;DR:** When handling tied values: **`ROW_NUMBER()`** gives unique sequential numbers (no ties). **`RANK()`** leaves gaps after ties (1, 2, 2, 4). **`DENSE_RANK()`** does not leave gaps after ties (1, 2, 2, 3).

#### 💡 Core Concept & Explanation
Ranking functions compared for tied scores `[100, 90, 90, 80]`:

#### 🛠️ Code / Visual Diagram / Table

| Score | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` |
| :---: | :---: | :---: | :---: |
| **100** | 1 | 1 | 1 |
| **90** | 2 | 2 | 2 |
| **90** | 3 | 2 | 2 |
| **80** | 4 | **4** (Gap!) | **3** (No Gap!) |

---

### 51. 🟠 P1 [C] What is a Database View? How does a standard View differ from a Materialized View?

> **TL;DR:** A **Standard View** is a saved SQL query (virtual table) executed dynamically on every read. A **Materialized View** pre-computes and physically stores query results on disk, requiring periodic refresh.

#### 💡 Core Concept & Explanation
- **Standard View:** Zero extra disk space used, always reflects 100% live real-time data, but executes underlying complex joins every read.
- **Materialized View:** Uses disk space, fast instant reads for heavy analytical dashboards, but data can be stale until `REFRESH MATERIALIZED VIEW` runs.

---

### 52. 🟠 P1 [C] What is a Stored Procedure? What are the pros and cons of placing business logic in Stored Procedures vs Backend Application code?

> **TL;DR:** A Stored Procedure is compiled SQL code stored and executed directly inside the DB engine.

#### 💡 Core Concept & Explanation
- **Pros:** Reduced network round-trips for multi-step SQL, compiled query performance.
- **Cons:** Hard to version-control in Git, hard to unit-test, degrades DB CPU scaling (easier to scale app servers than DB instances).

---

### 53. 🟠 P1 [C] What are Database Triggers?

> **TL;DR:** A Trigger is a procedural block executed automatically by the database engine in response to specific DML events (`BEFORE`/`AFTER` `INSERT`, `UPDATE`, `DELETE`) on a table.

#### 💡 Core Concept & Explanation
Useful for audit logging or automatic timestamp updates, but hidden triggers create hard-to-debug side-effects in production backends.

---

[⬅️ Previous: 06 · Execution Order & JOINs](06-sql-execution-order-and-join-fundamentals.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Query Optimization & Performance ➡️](08-query-optimization-execution-plans-and-performance.md)
