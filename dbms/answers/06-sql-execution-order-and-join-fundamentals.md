[⬅️ Previous: 05 · Normalization & Schema Design](05-schema-design-normalization-and-denormalization.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Subqueries & Window Functions ➡️](07-subqueries-window-functions-views-and-procedures.md)

---

## 6. SQL Execution Order & JOIN Fundamentals

### 39. 🔴 P0 [Q] What is the exact Logical Execution Order of a SQL Query?

> **TL;DR:** SQL is declarative. The database engine executes query clauses in this exact logical sequence: **`FROM` $\rightarrow$ `JOIN` $\rightarrow$ `WHERE` $\rightarrow$ `GROUP BY` $\rightarrow$ `HAVING` $\rightarrow$ `SELECT` $\rightarrow$ `DISTINCT` $\rightarrow$ `ORDER BY` $\rightarrow$ `LIMIT`**.

#### 💡 Core Concept & Explanation
Understanding execution order explains why you **cannot use a column alias** defined in `SELECT` inside a `WHERE` clause!

#### 🛠️ Code / Visual Diagram / Table

```
1. FROM & JOINs   ──> Determines initial dataset
2. WHERE          ──> Filters raw rows
3. GROUP BY       ──> Groups rows into buckets
4. HAVING         ──> Filters aggregated groups
5. SELECT         ──> Projects columns & computes aliases
6. DISTINCT       ──> Removes duplicate rows
7. ORDER BY       ──> Sorts final rows
8. LIMIT / OFFSET ──> Caps result set output
```

```sql
-- Why this FAILS:
SELECT salary * 12 AS annual_salary FROM emp WHERE annual_salary > 50000;
-- Error! WHERE executes BEFORE SELECT, so 'annual_salary' alias does not exist yet!
```

#### ⚠️ Interview Pitfall / Pro-Tip
You *can* use `SELECT` aliases inside `ORDER BY` because `ORDER BY` executes **after** `SELECT`.

---

### 40. 🔴 P0 [Q] What is the difference between `WHERE` clause and `HAVING` clause?

> **TL;DR:** `WHERE` filters individual rows **before** aggregation (`GROUP BY`). `HAVING` filters aggregated group records **after** `GROUP BY`.

#### 💡 Core Concept & Explanation
- **`WHERE`:** Evaluated row by row. Cannot contain aggregate functions like `SUM()`, `AVG()`, `COUNT()`.
- **`HAVING`:** Evaluated per aggregated group. Used specifically with aggregate functions.

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT dept_id, AVG(salary) 
FROM employees
WHERE status = 'active'         -- 1. Filters raw active rows FIRST
GROUP BY dept_id
HAVING AVG(salary) > 60000;     -- 2. Filters aggregated departments SECOND
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always apply non-aggregate filters in `WHERE` rather than `HAVING`! Filtering rows in `WHERE` reduces the data volume *before* `GROUP BY` runs, dramatically improving query speed.

---

### 41. 🔴 P0 [Q] Explain all Types of SQL JOINs.

> **TL;DR:** **`INNER JOIN`** (matching rows in both tables), **`LEFT JOIN`** (all left + matching right), **`RIGHT JOIN`** (all right + matching left), **`FULL JOIN`** (all rows from both), **`CROSS JOIN`** (Cartesian product), **`SELF JOIN`** (table joined with itself).

#### 💡 Core Concept & Explanation
Combining records from two or more tables based on a related column.

#### 🛠️ Code / Visual Diagram / Table

```
Table A: [1, 2, 3]    Table B: [2, 3, 4]

INNER JOIN:  [2, 3]        (Intersection)
LEFT JOIN:   [1, 2, 3]     (All A + matching B)
RIGHT JOIN:  [2, 3, 4]     (All B + matching A)
FULL JOIN:   [1, 2, 3, 4]  (Union of all)
CROSS JOIN:  3 x 3 = 9 rows (Cartesian Product)
```

```sql
-- Self Join Example (Finding Employee & Manager names in same table):
SELECT e.name AS Employee, m.name AS Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

#### ⚠️ Interview Pitfall / Pro-Tip
Missing a join condition in a multi-table query creates an unintended `CROSS JOIN` (Cartesian product), returning millions of redundant rows and crashing DB memory.

---

### 42. 🔴 P0 [Q] What is the difference between filtering in the `ON` clause vs `WHERE` clause during a `LEFT JOIN`?

> **TL;DR:** Filtering in the **`ON` clause** filters the right table *before* joining (retaining all left table rows with `NULL`s). Filtering in the **`WHERE` clause** filters *after* joining, effectively converting the `LEFT JOIN` into an `INNER JOIN`!

#### 💡 Core Concept & Explanation
Crucial SQL behavior distinction.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Query 1 (Filter in ON clause): Returns ALL users, showing orders if amount > 100
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.amount > 100;

-- Query 2 (Filter in WHERE clause): Discards users without orders > 100 (Acts like INNER JOIN!)
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.amount > 100;
```

#### ⚠️ Interview Pitfall / Pro-Tip
To keep `LEFT JOIN` behavior while filtering the right table in `WHERE`, add `OR o.amount IS NULL` to the `WHERE` condition.

---

### 43. 🔴 P0 [Q] What is the difference between `UNION` and `UNION ALL`?

> **TL;DR:** Both combine results of two SELECT queries. **`UNION` deduplicates** results (requires an expensive sort step). **`UNION ALL` preserves duplicates** and is much faster.

#### 💡 Core Concept & Explanation
Query set operations:

#### 🛠️ Code / Visual Diagram / Table

```sql
SELECT name FROM customers_us -- Returns ["Asha", "Ravi"]
UNION ALL
SELECT name FROM customers_uk -- Returns ["Ravi", "John"]
-- Result: ["Asha", "Ravi", "Ravi", "John"] (4 rows, Fast!)

SELECT name FROM customers_us
UNION
SELECT name FROM customers_uk
-- Result: ["Asha", "Ravi", "John"] (3 rows, Deduplicated via Sort step)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always default to `UNION ALL` in performance-sensitive backend queries unless you explicitly require deduplication!

---

### 44. 🟠 P1 [Q] What is the difference between `DELETE`, `TRUNCATE`, and `DROP` commands?

> **TL;DR:** **`DELETE`** (DML, row-by-row, rollable, supports `WHERE`), **`TRUNCATE`** (DDL, fast table deallocation, resets IDs), **`DROP`** (DDL, deletes entire table structure & data).

#### 💡 Core Concept & Explanation
Comparing table clearing methods:

#### 🛠️ Code / Visual Diagram / Table

| Property | `DELETE` | `TRUNCATE` | `DROP` |
| :--- | :--- | :--- | :--- |
| **Command Type** | DML | DDL | DDL |
| **Speed** | Slow (Logs row-by-row) | Fast (Deallocates data pages) | Instant |
| **`WHERE` Clause** | ✅ Supported | ❌ Not Supported | ❌ Not Supported |
| **Rollback (TCL)** | ✅ Can be rolled back | ❌ Cannot rollback (in most DBs) | ❌ Cannot rollback |
| **Resets Identity** | ❌ No | ✅ Yes (Resets Auto-Increment) | ❌ N/A (Table deleted) |
| **Table Structure** | Preserved | Preserved | **Deleted** |

#### ⚠️ Interview Pitfall / Pro-Tip
`TRUNCATE` requires DDL schema permissions on the table, whereas `DELETE` requires DML update permissions.

---

### 45. 🟠 P1 [C] Distinguish SQL Commands: DDL, DML, DCL, TCL.

> **TL;DR:** **DDL** (Schema structural commands), **DML** (Data manipulation), **DCL** (Permissions & security), **TCL** (Transaction control).

#### 💡 Core Concept & Explanation
SQL Command Classifications:

#### 🛠️ Code / Visual Diagram / Table

- **DDL (Data Definition Language):** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.
- **DML (Data Manipulation Language):** `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **DCL (Data Control Language):** `GRANT`, `REVOKE`.
- **TCL (Transaction Control Language):** `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

---

### 46. 🟠 P1 [P] Explain physical Join Algorithms: Nested Loop Join vs Hash Join vs Merge Join.

> **TL;DR:** **Nested Loop Join** (Iterates outer loop over inner loop; good for small tables/indexes), **Hash Join** (Builds hash table of smaller table in RAM; best for large unindexed equality joins), **Sort-Merge Join** (Sorts both tables and merges; best for large pre-sorted data).

#### 💡 Core Concept & Explanation
Physical execution algorithms selected by SQL Query Optimizer:

#### 🛠️ Code / Visual Diagram / Table

```
1. Nested Loop Join (O(N x M) or O(N log M) with index):
For each row in Table A:
   For each row in Table B: check join condition

2. Hash Join (O(N + M)):
Build Hash Table for Table A in RAM ──> Probe Hash Table for each row in Table B

3. Sort-Merge Join (O(N log N + M log M)):
Sort Table A by Key ──> Sort Table B by Key ──> Merge sorted streams
```

---

[⬅️ Previous: 05 · Normalization & Schema Design](05-schema-design-normalization-and-denormalization.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Subqueries & Window Functions ➡️](07-subqueries-window-functions-views-and-procedures.md)
