[⬅️ Previous: 02 · Aggregation & Grouping](02-aggregations-grouping-and-filtering.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Subqueries & CTEs ➡️](04-subqueries-and-common-table-expressions.md)

---

## 3. Comprehensive JOIN Mechanics & Complex Multi-Table Queries

### 11. 🔴 P0 [C] Explain the visual mechanics and return sets of all SQL JOIN types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`.

> **TL;DR:** `INNER JOIN` returns only matching rows from both tables. `LEFT JOIN` returns all rows from the left table plus matching rows from the right (or `NULL` if unmatched). `RIGHT JOIN` is the mirror. `FULL OUTER JOIN` returns all rows from both tables, filling unmatched sides with `NULL`. `CROSS JOIN` produces the Cartesian product of all rows ($M \times N$).

#### 💡 Core Concept & Explanation
JOIN operations form the bedrock of relational algebra. They combine attributes across distinct entity relations based on predicate matching:
- **`INNER JOIN`:** Set intersection ($A \cap B$). Discards orphan records on either side.
- **`LEFT (OUTER) JOIN`:** All of $A$, plus $(A \cap B)$. Preserves base entities even if related items don't exist.
- **`RIGHT (OUTER) JOIN`:** All of $B$, plus $(A \cap B)$. Rarely used in practice; developers conventionally invert table order to write `LEFT JOIN` for cognitive readability.
- **`FULL (OUTER) JOIN`:** Set union ($A \cup B$). Identifies unmatched records on either side.
- **`CROSS JOIN`:** Cartesian Product ($A \times B$). Every row in table $A$ is paired with every row in table $B$.

#### 🛠️ Code / Visual Diagram / Table

```
Table A: [1, 2]     Table B: [2, 3]

INNER JOIN:        [2]
LEFT JOIN:         [1 (NULL), 2 (2)]
RIGHT JOIN:        [2 (2), 3 (NULL)]
FULL OUTER JOIN:   [1 (NULL), 2 (2), 3 (NULL)]
CROSS JOIN:        [(1, 2), (1, 3), (2, 2), (2, 3)]
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In MySQL, `FULL OUTER JOIN` is not natively supported as a single keyword! To simulate a `FULL OUTER JOIN` in MySQL, you must perform a `LEFT JOIN` and a `RIGHT JOIN` combined with `UNION`:
  `SELECT * FROM a LEFT JOIN b ON a.id = b.id UNION SELECT * FROM a RIGHT JOIN b ON a.id = b.id;`

---

---

### 12. 🔴 P0 [Q] What is the critical difference between placing a filter condition in the `ON` clause versus the `WHERE` clause during a `LEFT JOIN` (The Outer Join Nullification Trap)?

> **TL;DR:** In a `LEFT JOIN`, conditions in the `ON` clause determine which right-table rows to match while preserving all left-table rows. Conditions in the `WHERE` clause filter rows **after** the join has been completed; if a `WHERE` condition checks a right-table column without `OR col IS NULL`, it discards unmatched rows and silently converts the `LEFT JOIN` into an `INNER JOIN`!

#### 💡 Core Concept & Explanation
This is one of the most common production bugs in backend reporting queries.
When you write `LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'active'`, users with no active orders are still returned with `NULL` order columns.
However, if you write `LEFT JOIN orders o ON u.id = o.user_id WHERE o.status = 'active'`, users without orders have `o.status = NULL`. The `WHERE` clause evaluates `NULL = 'active'`, which returns `UNKNOWN` and discards the user entirely!

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, user_id INT, status VARCHAR(20));

INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO orders VALUES (101, 1, 'cancelled');

-- Scenario A: Filtering in ON clause (Preserves all users)
SELECT u.name, o.id AS order_id, o.status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed';

-- Output A:
-- | name  | order_id | status |
-- |-------|----------|--------|
-- | Alice | NULL     | NULL   |
-- | Bob   | NULL     | NULL   |

-- Scenario B: Filtering in WHERE clause (Converts to INNER JOIN!)
SELECT u.name, o.id AS order_id, o.status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';

-- Output B: 0 rows returned!
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Rule of thumb: If you want to filter attributes of the **secondary (right)** table in a `LEFT JOIN`, place the predicate in the `ON` clause. If you want to filter attributes of the **driving (left)** table, place the predicate in the `WHERE` clause.

---

---

### 13. 🔴 P0 [Q] What is a `SELF JOIN`, and how is it used to model hierarchical and sequential relationships within a single table?

> **TL;DR:** A `SELF JOIN` is a join of a table to itself by assigning two distinct aliases (e.g. `employees e JOIN employees m`). It is commonly used to query adjacency list hierarchies (Employee $\rightarrow$ Manager) or compare adjacent chronological events.

#### 💡 Core Concept & Explanation
Because a database stores relational data in normalized forms, a table can contain foreign keys pointing back to its own primary key (such as `manager_id REFERENCES employees(id)`). By aliasing the table twice as `e` (subordinate) and `m` (manager), SQL treats them as two independent virtual tables.

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT,
    salary NUMERIC(10, 2)
);

INSERT INTO employees VALUES
(1, 'Ken (CEO)', NULL, 250000),
(2, 'Sarah (VP)', 1, 160000),
(3, 'Alex (Dev)', 2, 110000),
(4, 'Brian (Dev)', 2, 120000);

-- Query: Retrieve employee name along with their direct manager's name:
SELECT 
    e.name AS employee_name,
    COALESCE(m.name, 'TOP-LEVEL EXECUTIVE') AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Output:
-- | employee_name | manager_name         |
-- |---------------|----------------------|
-- | Ken (CEO)     | TOP-LEVEL EXECUTIVE  |
-- | Sarah (VP)    | Ken (CEO)            |
-- | Alex (Dev)    | Sarah (VP)           |
-- | Brian (Dev)   | Sarah (VP)           |
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Always use `LEFT JOIN` for self-joins on organizational charts! If you use `INNER JOIN`, the CEO (whose `manager_id IS NULL`) will be silently excluded from the result set.

---

---

### 14. 🔴 P0 [Q] What is an Anti-Join, and how do `LEFT JOIN ... WHERE right.id IS NULL`, `NOT EXISTS`, and `NOT IN` compare in performance and NULL handling?

> **TL;DR:** An Anti-Join returns rows from table A that have no matching records in table B. `NOT EXISTS` is generally the safest and fastest because it short-circuits on the first match and handles `NULL` values cleanly. `NOT IN` fails and returns 0 rows if table B contains even one `NULL`. `LEFT JOIN ... IS NULL` is an alternative that modern query optimizers often convert into an anti-semi-join plan.

#### 💡 Core Concept & Explanation
1. **`NOT EXISTS`**: Correlated subquery that halts scanning table B as soon as a single match is encountered. If table B contains `NULL`, `NOT EXISTS` continues operating correctly.
2. **`NOT IN` (The Danger Trap)**: `WHERE id NOT IN (SELECT user_id FROM orders)`. If any row in orders has `user_id = NULL`, the entire subquery evaluates to `UNKNOWN` for every candidate row, returning 0 rows!
3. **`LEFT JOIN ... WHERE right.id IS NULL`**: Performs the join, buffers unmatched rows with `NULL`, and filters for null primary keys.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Pattern 1: NOT EXISTS (Recommended standard)
SELECT u.id, u.name
FROM users u
WHERE NOT EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.user_id = u.id
);

-- Pattern 2: LEFT JOIN ... IS NULL
SELECT u.id, u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- Pattern 3: NOT IN (Safe ONLY with explicit NOT NULL filter)
SELECT u.id, u.name
FROM users u
WHERE u.id NOT IN (
    SELECT user_id 
    FROM orders 
    WHERE user_id IS NOT NULL
);
```

#### ⚠️ Interview Pitfall / Pro-Tip
- In technical interviews, if asked to find records without relations, write `NOT EXISTS` first and explicitly mention: *"I am using NOT EXISTS instead of NOT IN to prevent the query from returning an empty set if the foreign key column contains NULLs."* Interviewers love this answer.

---

---

### 15. 🔴 P0 [Q] Write a query to find all employees who earn a higher salary than their direct manager using a `SELF JOIN`.

> **TL;DR:** Join `employees e` (subordinates) with `employees m` (managers) on `e.manager_id = m.id`, and filter where `e.salary > m.salary`.

#### 💡 Core Concept & Explanation
This is LeetCode #181 ("Employees Earning More Than Their Managers").
By treating the employee table as two instances, we compare the employee's salary against their supervisor's salary directly.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Schema
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT,
    manager_id INT
);

INSERT INTO employees VALUES
(1, 'Joe', 70000, 3),
(2, 'Henry', 80000, 4),
(3, 'Sam', 60000, NULL),
(4, 'Max', 90000, NULL);

-- Solution Query:
SELECT e.name AS Employee
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- Output:
-- | Employee |
-- |----------|
-- | Joe      |  (Joe earns 70,000; his manager Sam earns 60,000)
```

#### ⚠️ Interview Pitfall / Pro-Tip
- Ensure you join on `e.manager_id = m.id` and NOT `e.id = m.manager_id`. Inverting this join condition checks managers earning more than their subordinates instead!

---

---

[⬅️ Previous: 02 · Aggregation & Grouping](02-aggregations-grouping-and-filtering.md) &nbsp;|&nbsp; [📋 Index](../sql-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Subqueries & CTEs ➡️](04-subqueries-and-common-table-expressions.md)
