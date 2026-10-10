⏮️ (start) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Transactions & ACID ➡️](02-transactions-and-acid-properties.md)

---

## 1. Fundamentals, DBMS Architecture & Relational Model

### 1. 🔴 P0 [C] What is a DBMS, and how is a database system superior to a traditional File Processing System?

> **TL;DR:** A DBMS (Database Management System) is software that manages data storage, retrieval, and security. It overcomes file systems by eliminating data redundancy, enforcing data integrity, supporting ACID transactions, and enabling concurrent multi-user access.

#### 💡 Core Concept & Explanation
In traditional file processing (like storing CSVs or custom files), every application maintains its own files. This causes **Data Redundancy** (duplicate data across files), **Data Inconsistency** (updating a user's address in file A leaves old address in file B), **Lack of Concurrency Control** (two processes overwriting the same file), and **No Crash Recovery**. A DBMS centralizes data, abstracts disk access, enforces integrity rules, and provides structured query languages (SQL).

#### 🛠️ Code / Visual Diagram / Table

| Feature | Traditional File System | DBMS (Database Management System) |
| :--- | :--- | :--- |
| **Data Redundancy** | High (Duplicated across application files) | Minimal (Normalized central storage) |
| **Data Consistency** | Poor (Risk of mismatch across files) | High (Enforced via constraints & transactions) |
| **Concurrent Access** | File locking (blocks multi-user writes) | Multi-version concurrency & fine-grained locks |
| **Crash Recovery** | Manual / High risk of corrupt files | Automatic via Redo/Undo Logs (WAL) |
| **Data Access** | Custom file reading scripts in app code | Standardized Declarative Language (SQL) |

#### ⚠️ Interview Pitfall / Pro-Tip
Don't say "File systems don't have security." File systems have OS permissions. The key advantage of a DBMS is **fine-grained security** (e.g., granting user A read access to a specific table column while hiding salary columns).

---

### 2. 🔴 P0 [C] What is the RDBMS model, and what defines the relational concept (Tables, Tuples, Attributes, Schemas)?

> **TL;DR:** RDBMS (Relational DBMS) stores data in 2D tables (Relations) based on relational algebra. A **Table** is a Relation, a **Row** is a Tuple, a **Column** is an Attribute, and the table design is the **Schema**.

#### 💡 Core Concept & Explanation
Introduced by E.F. Codd (12 Rules), the relational model represents data as mathematical relations. Data is structured into rows and columns with strict data types. Relationships between tables are established using shared key values (Primary Key $\rightarrow$ Foreign Key).

#### 🛠️ Code / Visual Diagram / Table

```
Schema: Employees (id INT, name VARCHAR, dept_id INT)

Table (Relation): "Employees"
┌──────┬─────────┬─────────┐  <-- Attribute Names (Columns)
│  id  │  name   │ dept_id │
├──────┼─────────┼─────────┤
│  101 │  Asha   │    1    │  <-- Tuple (Row 1)
│  102 │  Ravi   │    2    │  <-- Tuple (Row 2)
└──────┴─────────┴─────────┘
```

#### ⚠️ Interview Pitfall / Pro-Tip
In formal relational theory:
- Table = **Relation**
- Row = **Tuple**
- Column = **Attribute**
- Data Type = **Domain**

---

### 3. 🔴 P0 [C] Explain the 3-Schema Architecture (ANSI-SPARC) — Internal, Conceptual, and External levels.

> **TL;DR:** The 3-Schema Architecture separates the physical database storage from user applications across 3 abstraction layers: Internal (Physical storage), Conceptual (Logical tables & relationships), and External (User views).

#### 💡 Core Concept & Explanation
The goal of ANSI-SPARC architecture is **Data Abstraction**—hiding physical disk storage details from application developers and end users.

#### 🛠️ Code / Visual Diagram / Table

```
External Level (Views) ──> [ View 1 (Admin) ]   [ View 2 (Customer) ]
                                   │                   │
Conceptual Level       ──> └─────────► [ Logical Tables & Schema ] ◄────────┘
                                               │
Internal Level         ──>         [ Physical Disk Storage / B-Tree Index / Files ]
```

- **External Level (View Schema):** Customized views for specific users (e.g. masking password fields).
- **Conceptual Level (Logical Schema):** Defines all tables, columns, relationships, constraints, and business logic.
- **Internal Level (Physical Schema):** Defines how data is stored on disk (B-Tree indexes, file allocations, block sizes).

#### ⚠️ Interview Pitfall / Pro-Tip
Interviewers love asking which layer a DBA works on vs an App Developer. DBAs work on Internal and Conceptual schemas; Application Developers work on Conceptual and External schemas.

---

### 4. 🔴 P0 [C] What is Data Independence? Distinguish Logical Data Independence from Physical Data Independence.

> **TL;DR:** Data Independence is the ability to modify a schema at one level without forcing changes at the level above it. Physical independence means changing disk storage without breaking application code; Logical independence means adding/modifying tables without breaking existing user views.

#### 💡 Core Concept & Explanation
Achieved directly through the 3-Schema Architecture:
- **Physical Data Independence:** You can change index structures (B-Tree $\rightarrow$ Hash), switch storage engines, or move data to a new disk array at the Internal level **without changing logical table schemas** or application SQL queries.
- **Logical Data Independence:** You can alter logical table structures (add a new column or split a table) at the Conceptual level **without breaking existing external user views** or client applications that don't use those modified columns.

#### 🛠️ Code / Visual Diagram / Table

```
External Schemas (Apps / Views)
      ▲
      │  <--- LOGICAL DATA INDEPENDENCE (Altering tables doesn't break views)
      ▼
Conceptual Schema (Tables / Relations)
      ▲
      │  <--- PHYSICAL DATA INDEPENDENCE (Adding indexes/changing disk hardware doesn't break queries)
      ▼
Internal Schema (Disk Files / Indexes)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Physical Data Independence is much easier to achieve than Logical Data Independence. Changing physical indexes requires zero code changes, whereas adding/deleting logical columns often requires view/query adjustments.

---

### 5. 🔴 P0 [C] What are Keys in DBMS? Explain Super Key, Candidate Key, Primary Key, Foreign Key, and Composite Key.

> **TL;DR:** Keys uniquely identify rows in a relation and establish relationships. A **Super Key** identifies a row; a **Candidate Key** is a minimal Super Key; the **Primary Key** is the chosen Candidate Key; a **Foreign Key** links to another table's Primary Key.

#### 💡 Core Concept & Explanation
- **Super Key:** Any combination of columns that uniquely identifies a row in a table.
- **Candidate Key:** A minimal Super Key (no redundant attributes). A table can have multiple Candidate Keys.
- **Primary Key:** The single Candidate Key selected by the DBA to uniquely identify rows. Cannot be `NULL`.
- **Alternate Key:** Candidate Keys that were *not* chosen as the Primary Key.
- **Foreign Key:** A column in a child table that references the Primary Key of a parent table, enforcing referential integrity.
- **Composite Key:** A key composed of two or more attributes combined.

#### 🛠️ Code / Visual Diagram / Table

```
Super Keys: {id}, {email}, {id, name}, {email, name}
Candidate Keys: {id}, {email} (Minimal unique sets)
Primary Key: {id} (Chosen by DBA)
Alternate Key: {email}
```

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Foreign Key Constraint
);
```

#### ⚠️ Interview Pitfall / Pro-Tip
Every Primary Key is a Candidate Key, and every Candidate Key is a Super Key, but the reverse is **not** true!

---

### 6. 🔴 P0 [C] What is Referential Integrity? What happens on `ON DELETE CASCADE`, `ON DELETE SET NULL`, and `ON DELETE RESTRICT`?

> **TL;DR:** Referential Integrity guarantees that a Foreign Key value must always point to a valid existing Primary Key in the parent table (or be `NULL`). `ON DELETE` rules define what happens to child rows when a parent row is deleted.

#### 💡 Core Concept & Explanation
Prevents "orphan records" (e.g. an order referencing a `user_id` that no longer exists).

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

| Action Rule | Behavior when Parent Row is Deleted |
| :--- | :--- |
| **`ON DELETE RESTRICT` / `NO ACTION`** | **Blocks deletion** of parent row if child rows exist (Default behavior). |
| **`ON DELETE CASCADE`** | **Automatically deletes** all matching child rows in the child table. |
| **`ON DELETE SET NULL`** | Sets foreign key column to `NULL` in child rows (Requires column to allow `NULL`). |
| **`ON DELETE SET DEFAULT`** | Sets foreign key column to its default value in child rows. |

#### ⚠️ Interview Pitfall / Pro-Tip
Be careful with `ON DELETE CASCADE` on critical business tables (e.g. Deleting a `User` automatically deleting all their historic `Orders` and `Payments`). In financial systems, use `ON DELETE RESTRICT` or soft deletes (`is_deleted = true`).

---

### 7. 🟠 P1 [C] What is the difference between Schema and Instance in DBMS?

> **TL;DR:** Schema is the static logical blueprint/structure of the database (rarely changes). Instance is the actual dynamic data content present in the database at a specific moment in time (changes continuously with queries).

#### 💡 Core Concept & Explanation
Analogous to a **Class vs Object** in OOP:
- **Schema:** Defined during database design (`CREATE TABLE`). Specifies column names, data types, constraints.
- **Instance:** The state of the database at time $T$. Each `INSERT`, `UPDATE`, or `DELETE` changes the instance while keeping the schema identical.

#### 🛠️ Code / Visual Diagram / Table

```
Database Schema (Static Code):
Table "Users" -> [id: INT, email: VARCHAR, created_at: DATETIME]

Database Instance at 10:00 AM (Dynamic Data State):
Row 1: (1, "a@test.com", "2026-01-01")
Row 2: (2, "b@test.com", "2026-01-02")
```

#### ⚠️ Interview Pitfall / Pro-Tip
Modifying a schema (`ALTER TABLE`) is an expensive DDL lock operation; modifying an instance (`INSERT`/`UPDATE`) is a routine DML transaction.

---

### 8. 🟠 P1 [C] What are Data Constraints (`NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`) and where are they enforced?

> **TL;DR:** Data constraints are rules declared on columns during table creation to enforce data validity and integrity at the database engine level.

#### 💡 Core Concept & Explanation
Database constraints safeguard against corrupt data being inserted via buggy application code, background scripts, or manual database shell queries.

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,       -- Cannot be NULL & must be Unique
    age INT CHECK (age >= 18 AND age <= 65),  -- Custom condition check
    status VARCHAR(50) DEFAULT 'active'       -- Default fallback value
);
```

#### ⚠️ Interview Pitfall / Pro-Tip
Unlike `PRIMARY KEY`, a `UNIQUE` constraint column **allows NULL values** by default in standard SQL (in fact, multiple `NULL`s are allowed in most SQL databases because `NULL != NULL` in SQL standard logic!).

---

⏮️ (start) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Transactions & ACID ➡️](02-transactions-and-acid-properties.md)
