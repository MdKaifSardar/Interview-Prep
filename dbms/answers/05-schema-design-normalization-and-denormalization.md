[⬅️ Previous: 04 · Indexing & B-Trees](04-database-indexing-and-b-tree-internals.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Execution Order & JOINs ➡️](06-sql-execution-order-and-join-fundamentals.md)

---

## 5. Schema Design, Normalization & Denormalization

### 31. 🔴 P0 [C] What is Normalization, and why do we normalize relational databases?

> **TL;DR:** Normalization is the systematic process of organizing database schemas to eliminate **data redundancy** and prevent **modification anomalies** (Insert, Update, Delete anomalies) by dividing large tables into smaller related tables.

#### 💡 Core Concept & Explanation
Un-normalized schemas duplicate data across thousands of rows. Normalization uses mathematical rules (Normal Forms 1NF $\rightarrow$ 3NF/BCNF) based on **Functional Dependencies** to ensure every non-key attribute depends *only* on the candidate key.

#### 🛠️ Code / Visual Diagram / Table

```
Un-normalized (Redundant):
[Student_ID | Student_Name | Course_ID | Course_Name | Instructor_Name]

Normalized 3NF (Clean):
Students: [Student_ID | Student_Name]
Courses:  [Course_ID  | Course_Name  | Instructor_ID]
Enrollment: [Student_ID | Course_ID]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Normalization optimizes for **write integrity and consistency**. Over-normalizing can slow down **read performance** due to complex multi-table `JOIN`s!

---

### 32. 🔴 P0 [C] What are Database Anomalies? Explain Insertion, Deletion, and Update Anomalies with examples.

> **TL;DR:** Anomalies are data inconsistencies occurring in poorly designed schemas: **Insertion Anomaly** (Can't add data without dummy values), **Deletion Anomaly** (Deleting a row accidentally destroys secondary data), **Update Anomaly** (Updating data in 1 row leaves stale copies elsewhere).

#### 💡 Core Concept & Explanation
Demonstrating schema flaws:

#### 🛠️ Code / Visual Diagram / Table

Un-normalized Table: `Emp_Dept (emp_id, emp_name, dept_id, dept_name, dept_location)`

1. **Insertion Anomaly:** Cannot create a new Department (`dept_id=5, dept_name='AI'`) until an employee is assigned to it, because `emp_id` is Primary Key and cannot be `NULL`.
2. **Deletion Anomaly:** If employee `emp_id=101` (the only employee in HR) is deleted, the entire record of the HR department's existence is accidentally wiped from the database!
3. **Update Anomaly:** If department 'Sales' changes location from 'Mumbai' to 'Pune', you must update 10,000 employee rows. Missing 1 row leaves inconsistent location data.

#### ⚠️ Interview Pitfall / Pro-Tip
Always use clear 3-column real-world examples (like Employee-Department) to demonstrate all 3 anomalies during interviews.

---

### 33. 🔴 P0 [C] What is Functional Dependency ($X \rightarrow Y$)? Explain Full vs Partial vs Transitive Dependency.

> **TL;DR:** Functional Dependency ($X \rightarrow Y$) means column $X$ uniquely determines column $Y$. **Partial Dependency** = dependent on part of a composite key. **Transitive Dependency** = dependent on a non-key attribute ($A \rightarrow B \rightarrow C$).

#### 💡 Core Concept & Explanation
- **Full Functional Dependency:** Attribute $Y$ depends on the entire composite candidate key $X$, not a subset of it.
- **Partial Dependency:** Attribute $Y$ depends on only a *portion* of a composite candidate key $X$. (Violates 2NF!).
- **Transitive Dependency:** Attribute $C$ depends on non-key attribute $B$, which in turn depends on candidate key $A$ ($A \rightarrow B$ and $B \rightarrow C$). (Violates 3NF!).

#### 🛠️ Code / Visual Diagram / Table

```
Composite Key: {Student_ID, Course_ID}

Partial Dependency (Violates 2NF):
{Student_ID, Course_ID} -> Student_Name  (Student_Name depends ONLY on Student_ID!)

Transitive Dependency (Violates 3NF):
Student_ID -> ZipCode -> City            (City depends on ZipCode, which is non-key!)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Functional Dependencies are domain rules defined by business logic, not inferred from current sample data rows!

---

### 34. 🔴 P0 [C] Explain 1NF (First Normal Form): Atomic values and unique column names.

> **TL;DR:** 1NF requires that all column values are **atomic** (indivisible single values) and that there are no repeating groups or comma-separated lists stored in a single column.

#### 💡 Core Concept & Explanation
Disallows multi-valued attributes (arrays/comma-separated strings inside a cell).

#### 🛠️ Code / Visual Diagram / Table

```
NON-1NF (Violates 1NF - Comma-Separated List):
┌────────────┬────────────────────────┐
│ Student_ID │ Courses                │
├────────────┼────────────────────────┤
│     1      │ "Java, Python, C++"    │ ❌ Not Atomic!
└────────────┴────────────────────────┘

1NF CONVERTED (Atomic Values):
┌────────────┬──────────┐
│ Student_ID │ Course   │
├────────────┼──────────┤
│     1      │ Java     │
│     1      │ Python   │
│     1      │ C++      │
└────────────┴──────────┘
```

#### ⚠️ Interview Pitfall / Pro-Tip
Storing JSON strings or comma-separated values in SQL violates 1NF and prevents the database engine from indexing or validating individual items.

---

### 35. 🔴 P0 [C] Explain 2NF (Second Normal Form): Elimination of Partial Dependencies.

> **TL;DR:** A table is in 2NF if it is in **1NF** AND has **zero Partial Dependencies** (every non-prime attribute must depend on the *entire* candidate key, not a part of a composite key).

#### 💡 Core Concept & Explanation
2NF applies specifically to tables with **composite primary keys**. If a table has a single-column primary key, it is automatically in 2NF!

#### 🛠️ Code / Visual Diagram / Table

```
NON-2NF Table (Key: {student_id, course_id}):
[student_id | course_id | grade | student_name]
  └─────────────┬───────────┘          │
                └──────────────────────┘ (student_name depends ONLY on student_id - Partial Dependency!)

2NF CONVERTED (Split into 2 Tables):
Table 1 (Students): [student_id | student_name]
Table 2 (Grades):   [student_id | course_id | grade]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Remember: If a table has no composite candidate key (only single-column primary keys), it is **guaranteed to be in 2NF**.

---

### 36. 🔴 P0 [C] Explain 3NF (Third Normal Form): Elimination of Transitive Dependencies.

> **TL;DR:** A table is in 3NF if it is in **2NF** AND has **zero Transitive Dependencies** ($X \rightarrow Y$, where $X$ is a non-super key). Non-key attributes must depend *only* on the Primary Key.

#### 💡 Core Concept & Explanation
Summarized by the famous adage: *"Every non-key attribute must depend on the key, the whole key, and nothing but the key, so help me Codd."*

#### 🛠️ Code / Visual Diagram / Table

```
NON-3NF Table (Key: emp_id):
[emp_id | emp_name | zip_code | city]
   │                   │        │
   └───────────────────┴────────┘ (emp_id -> zip_code -> city: Transitive Dependency!)

3NF CONVERTED (Split into 2 Tables):
Table 1 (Employees): [emp_id | emp_name | zip_code]
Table 2 (Locations): [zip_code | city]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Converting to 3NF eliminates Update Anomalies (e.g. changing city for a zip code is done in 1 place in Table 2).

---

### 37. 🟠 P1 [C] What is BCNF (Boyce-Codd Normal Form)? How is BCNF stricter than 3NF?

> **TL;DR:** BCNF is a stricter version of 3NF. For every functional dependency $X \rightarrow Y$, **$X$ MUST be a Super Key**. BCNF eliminates anomalies caused by multiple overlapping candidate keys.

#### 💡 Core Concept & Explanation
In 3NF, a dependency $X \rightarrow Y$ is allowed if $Y$ is a prime attribute (part of a candidate key), even if $X$ is not a super key. BCNF removes this exception: $X$ must *always* be a super key.

#### 🛠️ Code / Visual Diagram / Table

```
3NF Rule:     X -> Y is valid if X is Super Key OR Y is Prime Attribute.
BCNF Rule:    X -> Y is valid ONLY if X is Super Key (No exceptions!).
```

#### ⚠️ Interview Pitfall / Pro-Tip
Every BCNF schema is in 3NF, but not every 3NF schema is in BCNF!

---

### 38. 🟠 P1 [D] What is Denormalization? When and why would a backend developer intentionally denormalize?

> **TL;DR:** Denormalization is intentionally introducing controlled redundancy into a normalized schema to **reduce expensive `JOIN` operations and boost read performance** on heavy read workloads.

#### 💡 Core Concept & Explanation
In high-scale web apps (e.g. e-commerce product catalogs), joining 6 normalized tables on every page load causes high latency. Developers duplicate data (e.g. storing `author_name` inside `posts` table) to serve read queries instantly from 1 table.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Denormalized Table: Stores total_comments directly to avoid COUNT(*) JOINs
CREATE TABLE posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    comment_count INT DEFAULT 0 -- Denormalized counter! Updated via Trigger / Worker
);
```

#### ⚠️ Interview Pitfall / Pro-Tip
Denormalization increases read performance at the cost of **slower writes** and the burden of **maintaining application-level data sync**.

---

[⬅️ Previous: 04 · Indexing & B-Trees](04-database-indexing-and-b-tree-internals.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · Execution Order & JOINs ➡️](06-sql-execution-order-and-join-fundamentals.md)
