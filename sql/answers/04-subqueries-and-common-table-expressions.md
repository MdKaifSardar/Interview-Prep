[⬅️ Previous: 03 · JOIN Mechanics & Queries](03-joins-and-multi-table-queries.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Window Ranking & Offsets ➡️](05-window-functions-ranking-and-offsets.md)

---

## 4. Subqueries & Common Table Expressions (CTEs)

### 16. 🔴 P0 [C] What is the difference between a Non-Correlated Subquery and a Correlated Subquery, and how does the engine execute them?

> **TL;DR:** A Non-Correlated Subquery is completely independent of the outer query; it executes once, caches its result, and passes it to the outer query. A Correlated Subquery references columns from the outer query table; it conceptually executes once per row processed by the outer query ($O(N \times M)$ naive complexity).

#### 💡 Core Concept & Explanation
- **Non-Correlated Subquery:**
  `SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);`
  The inner query `(SELECT AVG(price) FROM products)` calculates the scalar average (e.g. `$45.00`) exactly once. The outer query then treats the result as a constant.
- **Correlated Subquery:**
  `SELECT * FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);`
  Notice `e.dept_id` inside the subquery. The inner query cannot run independently; it must receive each candidate row's `dept_id` from the outer loop.
  Modern query optimizers attempt to "decorrelate" such queries into an internal Hash Semi-Join or Window Function execution plan.

#### 🛠️ Code / Visual Diagram / Table

```
Non-Correlated Execution:
[Run Subquery Once] ──> Returns Constant ──> [Filter Outer Table via Index]

Correlated Execution (Nested Loop concept):
For each row in Outer Table:
    Pass outer_col into Subquery
    Compute Subquery Result
    Evaluate Predicate (Keep/Discard)
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In technical interviews, whenever you find yourself writing a correlated subquery, mention that modern SQL window functions (e.g. `AVG(salary) OVER (PARTITION BY dept_id)`) or CTE joins provide better readability and predictable linear performance compared to correlated nested loops.

---

---

### 17. 🔴 P0 [Q] What is the difference between `EXISTS` and `IN` operators, and why does `NOT IN` fail completely if the subquery returns even a single `NULL` value?

> **TL;DR:** `IN` compares values against a concrete list of literal values and evaluates every item. `EXISTS` tests boolean existence and short-circuits as soon as a single matching row is located. `NOT IN` evaluates to `UNKNOWN` (dropping all rows) if the candidate list contains any `NULL`, whereas `NOT EXISTS` handles `NULL`s gracefully.

#### 💡 Core Concept & Explanation
Consider `x NOT IN (1, 2, NULL)`.
SQL expands this into: `x != 1 AND x != 2 AND x != NULL`.
Because `x != NULL` evaluates to `UNKNOWN`, the entire boolean chain `TRUE AND TRUE AND UNKNOWN` collapses to `UNKNOWN`. As a result, no rows can satisfy the predicate!
In contrast, `NOT EXISTS (SELECT 1 FROM table WHERE table.id = outer.id)` only evaluates whether the subquery returns at least one tuple. A row of `(NULL)` is still a returned tuple, so existence is evaluated with binary precision (`TRUE`/`FALSE`).

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Table A: users (1, 2, 3)
-- Table B: blocked_users (2, NULL)

-- FAILS: Returns ZERO rows because blocked_users has a NULL!
SELECT * FROM users 
WHERE id NOT IN (SELECT id FROM blocked_users); 

-- SUCCEEDS: Correctly returns users 1 and 3!
SELECT * FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM blocked_users b WHERE b.id = u.id
);
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always recommend `NOT EXISTS` over `NOT IN` when checking against subquery tables. `NOT EXISTS` is impervious to null value poisoning.

---

---

### 18. 🔴 P0 [Q] What is a Common Table Expression (CTE, `WITH` clause), and what advantages does it provide over nested subqueries?

> **TL;DR:** A CTE is a temporary, named result set defined at the beginning of a SQL query using the `WITH` keyword. CTEs drastically improve readability by eliminating deep nesting, allowing self-referencing (Recursive CTEs), and enabling the same named dataset to be referenced multiple times within a single query.

#### 💡 Core Concept & Explanation
Deeply nested subqueries are difficult to read and maintain because they are evaluated from the inside out. A CTE organizes logic linearly from top to bottom, resembling procedural variable declarations.
Furthermore, in engines like PostgreSQL, CTEs can be referenced more than once in the same query without recalculating or repeating code blocks.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- High-readability linear structure using CTEs:
WITH HighSpendingCustomers AS (
    SELECT customer_id, SUM(amount) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 10000
),
CustomerLocations AS (
    SELECT id, name, country
    FROM customers
    WHERE is_active = TRUE
)
SELECT 
    cl.name,
    cl.country,
    hsc.total_spent
FROM HighSpendingCustomers hsc
JOIN CustomerLocations cl ON hsc.customer_id = cl.id
ORDER BY hsc.total_spent DESC;
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In PostgreSQL 11 and earlier, CTEs acted as rigid **optimization fences** (they were always materialized in memory/disk and could not push down `WHERE` clauses from the outer query into the CTE). In PostgreSQL 12+, CTEs are automatically inlined unless explicitly declared with `WITH cte AS MATERIALIZED (...)`.

---

---

### 19. 🔴 P0 [Q] What is a Recursive CTE, what are its 4 mandatory components (Anchor, UNION ALL, Recursive Member, Termination), and how does it execute?

> **TL;DR:** A Recursive CTE is a CTE that references its own name to iteratively process hierarchical, nested, or graph-like data. It consists of: (1) **Anchor Member** (base query), (2) **`UNION ALL`** separator, (3) **Recursive Member** (references CTE name), and (4) **Termination Condition** (produces empty set to stop loop).

#### 💡 Core Concept & Explanation
Execution Algorithm of a Recursive CTE:
1. Execute the **Anchor Query** $\rightarrow$ Creates Working Table $W_0$ and Result Table $R$.
2. While Working Table $W_i$ is not empty:
   - Run the **Recursive Query** substituting $W_i$ for the CTE name $\rightarrow$ Produces $W_{i+1}$.
   - Append $W_{i+1}$ to Result Table $R$.
   - Set $W_i = W_{i+1}$.
3. When $W_{i+1}$ is empty, return Result Table $R$.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Classic Example: Generating a sequence of numbers from 1 to 5
WITH RECURSIVE NumberSeries AS (
    -- 1. Anchor Member (Base case)
    SELECT 1 AS n
    
    UNION ALL
    
    -- 2. Recursive Member (Iterative step)
    SELECT n + 1 
    FROM NumberSeries 
    WHERE n < 5 -- 3. Termination Condition
)
SELECT n FROM NumberSeries;

-- Output:
-- | n |
-- |---|
-- | 1 |
-- | 2 |
-- | 3 |
-- | 4 |
-- | 5 |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always ensure the recursive member has a guaranteed termination condition (or cycle check)! Without one, a cycle in your data (e.g. Employee A reports to Employee B, and B reports to A) creates an infinite recursive loop, exhausting database memory or triggering statement timeout errors.

---

---

### 20. 🔴 P0 [Q] Write a recursive CTE to traverse an employee organizational chart and compute the management depth/level for every employee from the CEO downwards.

> **LeetCode Reference:** [LC 1270: All People Report to the Given Manager](https://leetcode.com/problems/all-people-report-to-the-given-manager/) [MEDIUM]  
> **TL;DR:** Start with the CEO (`manager_id IS NULL`) at `level = 1` as the Anchor Member. In the Recursive Member, join `employees` to the CTE on `e.manager_id = cte.id` and increment `level + 1`.

#### 💡 Core Concept & Explanation
This is the benchmark interview problem for hierarchical data processing in SQL (e.g. Org Charts, Folder/File structures, Category trees).

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT
);

INSERT INTO employees VALUES
(1, 'Satya (CEO)', NULL),
(2, 'Scott (VP Cloud)', 1),
(3, 'Rajesh (VP Office)', 1),
(4, 'Mark (Director Azure)', 2),
(5, 'Amanda (Senior Engineer)', 4);

-- Recursive Solution Query:
WITH RECURSIVE OrgHierarchy AS (
    -- Anchor: Find top-level CEO
    SELECT 
        id, 
        name, 
        manager_id, 
        1 AS org_level,
        CAST(name AS VARCHAR(255)) AS management_chain
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive Step: Find all direct reports of people already in hierarchy
    SELECT 
        e.id, 
        e.name, 
        e.manager_id, 
        oh.org_level + 1,
        CAST(oh.management_chain || ' -> ' || e.name AS VARCHAR(255))
    FROM employees e
    JOIN OrgHierarchy oh ON e.manager_id = oh.id
)
SELECT id, name, org_level, management_chain
FROM OrgHierarchy
ORDER BY org_level, id;

-- Output:
-- | id | name                     | org_level | management_chain                                    |
-- |----|--------------------------|-----------|-----------------------------------------------------|
-- | 1  | Satya (CEO)              | 1         | Satya (CEO)                                         |
-- | 2  | Scott (VP Cloud)         | 2         | Satya (CEO) -> Scott (VP Cloud)                     |
-- | 3  | Rajesh (VP Office)       | 2         | Satya (CEO) -> Rajesh (VP Office)                   |
-- | 4  | Mark (Director Azure)    | 3         | Satya (CEO) -> Scott (VP Cloud) -> Mark             |
-- | 5  | Amanda (Senior Engineer) | 4         | Satya (CEO) -> Scott -> Mark -> Amanda              |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Notice the explicit `CAST(name AS VARCHAR(255))` in the anchor member. In PostgreSQL and SQL Server, the data types of columns in the anchor and recursive members must match exactly. If string columns are not cast to a fixed or large length, appending strings in recursive steps throws type mismatch errors.

---

[⬅️ Previous: 03 · JOIN Mechanics & Queries](03-joins-and-multi-table-queries.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Window Ranking & Offsets ➡️](05-window-functions-ranking-and-offsets.md)
