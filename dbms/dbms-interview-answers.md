# DBMS Interview Questions — Master Answer Key (Comprehensive Edition)

Companion answer key to `dbms-interview-questions.md`. Every answer follows a standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive explanation of *why* and *how* the mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working SQL query, ASCII flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Critical edge cases, performance traps, and common interviewer follow-ups.

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

## 2. Transactions & ACID Properties

### 9. 🔴 P0 [C] What is a Transaction in DBMS? What is the Transaction Lifecycle?

> **TL;DR:** A Transaction is a single logical unit of database work executing one or more SQL operations. A transaction moves through states: Active $\rightarrow$ Partially Committed $\rightarrow$ Committed (or Aborted $\rightarrow$ Failed).

#### 💡 Core Concept & Explanation
A transaction guarantees that multiple SQL operations (e.g. Deduct money from account A + Add money to account B) either **all succeed together** or **all roll back** completely.

#### 🛠️ Code / Visual Diagram / Table

```
               ┌──────────┐
               │  Active  │  (Executing SQL operations)
               └────┬─────┘
                    │ (Last operation executed)
                    ▼
       ┌────────────────────────┐
       │  Partially Committed   │
       └────────────┬───────────┘
                    │ (Flush logs to disk - Commit)
                    ▼
             ┌─────────────┐
             │  Committed  │  (Permanent on disk)
             └─────────────┘

If Failure occurs during Active or Partially Committed:
Active / Partially Committed ──> [ Aborted ] ──> [ Rollback / Undo ] ──> [ Failed ]
```

#### ⚠️ Interview Pitfall / Pro-Tip
A transaction is NOT committed when the last SQL line runs; it is only committed when the DB writes the `COMMIT` record to the Write-Ahead Log (WAL) on disk!

---

### 10. 🔴 P0 [C] Explain the ACID Properties in detail (Atomicity, Consistency, Isolation, Durability).

> **TL;DR:** ACID guarantees reliable transaction processing. **Atomicity** (All or Nothing), **Consistency** (Valid state transitions), **Isolation** (Concurrent transactions don't interfere), **Durability** (Committed data survives crashes).

#### 💡 Core Concept & Explanation
The golden standard of relational databases:
- **Atomicity:** Entire transaction executes or zero changes persist. Guaranteed by **Undo Log**.
- **Consistency:** Database satisfies all schema constraints (keys, checks) before and after transaction.
- **Isolation:** Execution of concurrent transactions yields results identical to running them serially. Guaranteed by **Locks & MVCC**.
- **Durability:** Once committed, changes are permanent even if power cuts immediately after. Guaranteed by **Redo Log / WAL**.

#### 🛠️ Code / Visual Diagram / Table

| Property | Meaning | Enabling Mechanism |
| :--- | :--- | :--- |
| **Atomicity** | All operations complete, or all are rolled back. | Undo Log |
| **Consistency** | Data transitions from valid state to valid state. | Schema Constraints + Foreign Keys |
| **Isolation** | Transactions execute concurrently without mutual interference. | Locks (2PL) + MVCC |
| **Durability** | Committed data is permanently stored on disk. | Redo Log / Write-Ahead Logging (WAL) |

#### ⚠️ Interview Pitfall / Pro-Tip
"Consistency" in ACID is different from "Consistency" in CAP Theorem! ACID Consistency refers to schema rules and invariants; CAP Consistency refers to replica nodes returning identical data.

---

### 11. 🔴 P0 [C] How does a database guarantee Atomicity during a mid-transaction crash (Undo Log / Rollback)?

> **TL;DR:** Databases use an **Undo Log**. Before modifying any data page in memory, the engine writes the original "before-image" of the data to the Undo Log. On crash or abort, the engine reads the Undo Log to reverse incomplete changes.

#### 💡 Core Concept & Explanation
When a transaction updates a row from `balance = 100` to `balance = 50`, the database engine records `balance = 100` in the Undo Log on disk *first*. If a crash or error occurs before `COMMIT`, the crash recovery process reads the Undo Log and executes an automatic **Rollback**, restoring `balance = 100`.

#### 🛠️ Code / Visual Diagram / Table

```
1. Client issues: UPDATE account SET balance = 50 WHERE id = 1 (original was 100)
2. Database writes to Undo Log: { account_id: 1, old_val: 100 }
3. Database modifies buffer pool memory: balance = 50
4. CRASH OCCURS! 💥
5. On Restart: Crash recovery reads Undo Log -> Reverts balance back to 100! (Atomicity Maintained)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Undo logs are also used by engines like InnoDB to support MVCC for non-blocking consistent reads!

---

### 12. 🔴 P0 [C] How does a database guarantee Durability after a hardware crash (Redo Log / Write-Ahead Logging - WAL)?

> **TL;DR:** Databases use **Write-Ahead Logging (WAL)** / **Redo Log**. Changes are sequentially written to the append-only Redo Log on disk *before* modified dirty data pages are flushed to actual table data files.

#### 💡 Core Concept & Explanation
Writing modified 8KB/16KB data pages randomly across disk tables is slow. Instead, when a `COMMIT` happens, the engine writes a small, sequential `COMMIT` entry to the **Redo Log** file on disk. If the server loses power 1 millisecond later, the unwritten memory changes are lost, but on reboot, the engine reads the Redo Log and **replays (redoes)** the committed operations.

#### 🛠️ Code / Visual Diagram / Table

```
Write-Ahead Logging (WAL) Sequence:
1. Transaction modifies Data Page in RAM (Dirty Page).
2. Write sequential change record to REDO LOG on disk.
3. Transaction receives COMMIT acknowledgment to client! ✅
   ... (Later, asynchronously in background) ...
4. Checkpointer flushes Dirty Data Page from RAM to Table File on disk.
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always emphasize **Sequential I/O vs Random I/O**! Redo logging is fast because it is sequential disk appending, whereas updating table files requires random disk I/O.

---

### 13. 🔴 P0 [C] What is the difference between `COMMIT`, `ROLLBACK`, and `SAVEPOINT`?

> **TL;DR:** `COMMIT` permanently saves transaction changes; `ROLLBACK` cancels all changes back to the start; `SAVEPOINT` creates a checkpoint allowing partial rollbacks within a transaction.

#### 💡 Core Concept & Explanation
TCL (Transaction Control Language) commands.

#### 🛠️ Code / Visual Diagram / Table

```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  SAVEPOINT step1; -- Checkpoint created!
  
  UPDATE accounts SET balance = balance + 100 WHERE id = 999; -- Wrong account!
  ROLLBACK TO step1; -- Reverts ONLY the second update, keeping step 1 intact!
  
  UPDATE accounts SET balance = balance + 100 WHERE id = 2; -- Correct account
COMMIT; -- Permanently saves changes!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Rolling back to a `SAVEPOINT` does **not** release locks acquired after that savepoint in most SQL engines until the entire transaction ends (`COMMIT` or full `ROLLBACK`).

---

### 14. 🟠 P1 [C] What is a Schedule in DBMS? Distinguish Serial Schedule vs Concurrent Schedule.

> **TL;DR:** A Schedule is the chronological sequence of execution operations across multiple concurrent transactions. A **Serial Schedule** runs transactions one after another (no interleaving); a **Concurrent Schedule** interleaves operations.

#### 💡 Core Concept & Explanation
- **Serial Schedule:** $T_1$ completes 100%, then $T_2$ starts. 100% safe, no concurrency bugs, but terrible CPU utilization and performance.
- **Concurrent Schedule:** $T_1$ and $T_2$ operations interleave. High performance, but requires concurrency control algorithms to prevent anomalies.

#### 🛠️ Code / Visual Diagram / Table

```
Serial Schedule (Safe, Slow):
T1: R(A) -> W(A) -> Commit
T2:                       -> R(A) -> W(A) -> Commit

Concurrent Interleaved Schedule (Fast, Needs Control):
T1: R(A) -> W(A)
T2:               -> R(A) -> W(A) -> Commit
T1:                                         -> Commit
```

#### ⚠️ Interview Pitfall / Pro-Tip
A concurrent schedule is considered valid if it is **Conflict Serializable** (equivalent in result to some serial schedule).

---

### 15. 🟠 P1 [C] What is Conflict Serializability, and how do you test if a schedule is conflict serializable (Precedence Graph)?

> **TL;DR:** A schedule is Conflict Serializable if it can be transformed into a Serial Schedule by swapping non-conflicting operations. Test using a **Precedence Graph (Serialization Graph)**: if the graph has **no cycles**, the schedule is serializable.

#### 💡 Core Concept & Explanation
Two operations conflict if they belong to **different transactions**, access the **same data item**, and **at least one is a Write (`W`)**.
- Conflicting pairs: `R(X)-W(X)`, `W(X)-R(X)`, `W(X)-W(X)`.

#### 🛠️ Code / Visual Diagram / Table

**Precedence Graph Algorithm:**
1. Create a node for each Transaction ($T_1, T_2$).
2. Draw a directed edge $T_i \rightarrow T_j$ if an operation in $T_i$ conflicts with and executes *before* an operation in $T_j$.
3. Check for cycles using Topological Sort / DFS.
   - **No Cycle** $\rightarrow$ Conflict Serializable! ✅
   - **Cycle Exists** $\rightarrow$ NOT Conflict Serializable! ❌

#### ⚠️ Interview Pitfall / Pro-Tip
If a Precedence Graph has no cycles, the topological sort order of the nodes gives the exact equivalent **Serial Execution Order** of the transactions.

---

## 3. Concurrency Control & Isolation Levels

### 16. 🔴 P0 [C] What concurrency anomalies occur when transactions run simultaneously without isolation?

> **TL;DR:** Uncontrolled concurrent transactions lead to **Dirty Reads**, **Non-Repeatable Reads**, **Phantom Reads**, and **Lost Updates**.

#### 💡 Core Concept & Explanation
When isolation mechanisms are disabled or set too low, interleaving reads and writes across transactions corrupts computational logic.

#### 🛠️ Code / Visual Diagram / Table

| Anomaly | Description | Example |
| :--- | :--- | :--- |
| **Dirty Read** | Reading data written by another transaction that hasn't committed yet. | $T_1$ updates balance to 500. $T_2$ reads 500. $T_1$ rolls back. $T_2$ has dirty data! |
| **Non-Repeatable Read** | Re-reading the same row within a transaction returns **different field values**. | $T_1$ reads age=20. $T_2$ updates age=25 & commits. $T_1$ reads age again $\rightarrow$ gets 25! |
| **Phantom Read** | Re-running a range query within a transaction returns **new "phantom" rows**. | $T_1$ counts 10 users. $T_2$ inserts 1 new user & commits. $T_1$ counts again $\rightarrow$ gets 11! |
| **Lost Update** | Two transactions overwrite each other's updates without checking intermediate state. | $T_1$ & $T_2$ read balance=100. $T_1$ adds 50 & commits (150). $T_2$ adds 20 & commits (120) $\rightarrow$ $T_1$'s 50 is lost! |

#### ⚠️ Interview Pitfall / Pro-Tip
Distinguish Non-Repeatable Read from Phantom Read! Non-Repeatable Read modifies **existing rows**; Phantom Read inserts **new rows** that match the range query.

---

### 17. 🔴 P0 [C] Explain the 3 Read Anomalies: Dirty Read, Non-Repeatable Read, and Phantom Read.

> **TL;DR:** Dirty Read = Uncommitted data read. Non-Repeatable Read = Modified existing row value read. Phantom Read = New matching row inserted during range scan.

#### 💡 Core Concept & Explanation
Detailed breakdown of ANSI SQL read phenomena.

#### 🛠️ Code / Visual Diagram / Table

```
1. Dirty Read Scenario:
T1: UPDATE user SET age = 30; -- (Uncommitted)
T2: SELECT age FROM user;    -- Reads 30! (DIRTY READ)
T1: ROLLBACK;                -- Reverts age back to 20!

2. Non-Repeatable Read Scenario:
T1: SELECT salary FROM emp WHERE id=1; -- Returns 5000
T2: UPDATE emp SET salary = 7000 WHERE id=1; COMMIT;
T1: SELECT salary FROM emp WHERE id=1; -- Returns 7000! (NON-REPEATABLE READ)

3. Phantom Read Scenario:
T1: SELECT COUNT(*) FROM emp WHERE dept='IT'; -- Returns 5
T2: INSERT INTO emp (name, dept) VALUES ('Ravi', 'IT'); COMMIT;
T1: SELECT COUNT(*) FROM emp WHERE dept='IT'; -- Returns 6! (PHANTOM READ)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Dirty Reads are unacceptable in 99.9% of application systems because they expose uncommitted state that might be rolled back.

---

### 18. 🔴 P0 [C] Explain the 4 ANSI SQL Isolation Levels and which anomalies each prevents.

> **TL;DR:** Isolation levels control concurrency vs strictness: `READ UNCOMMITTED` (Lowest) $\rightarrow$ `READ COMMITTED` $\rightarrow$ `REPEATABLE READ` $\rightarrow$ `SERIALIZABLE` (Highest).

#### 💡 Core Concept & Explanation
Database engines let developers trade isolation strictness for throughput performance.

#### 🛠️ Code / Visual Diagram / Table

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **`READ UNCOMMITTED`** | ❌ Allowed | ❌ Allowed | ❌ Allowed |
| **`READ COMMITTED`** | ✅ **Prevented** | ❌ Allowed | ❌ Allowed |
| **`REPEATABLE READ`** | ✅ **Prevented** | ✅ **Prevented** | ❌ Allowed |
| **`SERIALIZABLE`** | ✅ **Prevented** | ✅ **Prevented** | ✅ **Prevented** |

#### ⚠️ Interview Pitfall / Pro-Tip
Know defaults for popular databases! **PostgreSQL** defaults to `READ COMMITTED`. **MySQL (InnoDB)** defaults to `REPEATABLE READ` (and InnoDB's Next-Key Locking actually prevents Phantom Reads even in `REPEATABLE READ` mode!).

---

### 19. 🔴 P0 [C] What are Database Locks? Explain Shared Lock (S-Lock) vs Exclusive Lock (X-Lock).

> **TL;DR:** Locks prevent conflicting concurrent updates. A **Shared Lock (S)** allows multiple transactions to read a resource simultaneously. An **Exclusive Lock (X)** reserves a resource for writing, blocking all other reads and writes.

#### 💡 Core Concept & Explanation
Lock Compatibility Rules:

#### 🛠️ Code / Visual Diagram / Table

| Lock Requested | Existing Lock: Shared (S) | Existing Lock: Exclusive (X) |
| :--- | :---: | :---: |
| **Shared (S)** | ✅ **Granted** (Multiple readers allowed) | ❌ **Blocked** (Must wait for write to end) |
| **Exclusive (X)** | ❌ **Blocked** (Must wait for readers to end) | ❌ **Blocked** (Must wait for write to end) |

```sql
-- Explicitly acquire Shared Lock in SQL:
SELECT * FROM products WHERE id = 1 FOR SHARE;

-- Explicitly acquire Exclusive Lock in SQL:
SELECT * FROM products WHERE id = 1 FOR UPDATE;
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `SELECT ... FOR UPDATE` acquires an Exclusive Lock on matching rows, preventing race conditions during read-modify-write patterns (e.g. inventory reservation).

---

### 20. 🟠 P1 [C] What is Two-Phase Locking (2PL)? Distinguish Strict 2PL vs Rigorous 2PL.

> **TL;DR:** 2PL guarantees serializability by dividing lock usage into two distinct phases: **Growing Phase** (acquiring locks, no releasing) and **Shrinking Phase** (releasing locks, no acquiring).

#### 💡 Core Concept & Explanation
- **Growing Phase:** Transaction acquires all required locks one by one. Cannot release any lock.
- **Shrinking Phase:** Transaction releases locks one by one. Cannot acquire any new locks.

#### 🛠️ Code / Visual Diagram / Table

```
2PL Lock Lifecycle:
Number of Locks
  ▲         / \
  │        /   \
  │       /     \
  │  Growing   Shrinking
  │   Phase      Phase
  └────────────────────────► Time
```

- **Strict 2PL:** Holds all **Exclusive (X) locks** until transaction `COMMIT`/`ROLLBACK`. Prevents cascading rollbacks!
- **Rigorous 2PL:** Holds **ALL locks (both S and X)** until transaction `COMMIT`/`ROLLBACK`.

#### ⚠️ Interview Pitfall / Pro-Tip
Standard 2PL guarantees serializability, but it does **NOT** prevent deadlocks!

---

### 21. 🟠 P1 [C] What is a Deadlock in DBMS? How do databases Detect, Prevent, and Resolve deadlocks?

> **TL;DR:** A Deadlock occurs when two or more transactions are stuck waiting for locks held by each other in a circular chain ($T_1$ holds Lock A, waits for B; $T_2$ holds Lock B, waits for A).

#### 💡 Core Concept & Explanation
Deadlock handling strategies:

#### 🛠️ Code / Visual Diagram / Table

```
Deadlock Circular Wait:
[ Transaction 1 ] ──(Holds Lock A)──> [ Resource A ]
       │                                   ▲
  (Waits for B)                       (Holds Lock A)
       ▼                                   │
  [ Resource B ] <──(Holds Lock B)── [ Transaction 2 ]
```

1. **Deadlock Detection:** Maintain a **Wait-For Graph**. Periodically run cycle detection algorithms. If a cycle exists, select a "victim" transaction and abort/roll it back.
2. **Deadlock Prevention (Timestamps):**
   - **Wait-Die Scheme (Non-preemptive):** If older transaction requests lock held by younger, older waits. If younger requests lock held by older, younger dies (aborts).
   - **Wound-Wait Scheme (Preemptive):** If older requests lock held by younger, older "wounds" (aborts) younger. If younger requests lock held by older, younger waits.

#### ⚠️ Interview Pitfall / Pro-Tip
Deadlocks are normal in high-concurrency SQL applications. Backend code should catch deadlock error codes (e.g. MySQL Error `1213`) and **retry the transaction** automatically.

---

### 22. 🟡 P2 [C] What is MVCC (Multi-Version Concurrency Control)?

> **TL;DR:** MVCC creates immutable snapshots of row versions so that **readers never block writers, and writers never block readers**. Readers inspect consistent historical snapshots matching their transaction start time.

#### 💡 Core Concept & Explanation
Instead of acquiring Shared locks for `SELECT` queries (which would block writers), engines like PostgreSQL and InnoDB write hidden transaction IDs (`xmin`/`xmax` or roll pointers) into every row header. When a row is updated, the engine appends a new version of the row instead of overwriting the old one. Readers filter for the row version matching their snapshot timestamp.

#### 🛠️ Code / Visual Diagram / Table

```
Row Version Chain (MVCC):
[ Row ID: 1 | balance: 100 | xmin: 101 | xmax: 105 ] <── Old version seen by T102
[ Row ID: 1 | balance: 200 | xmin: 105 | xmax: inf ] <── New version seen by T106
```

#### ⚠️ Interview Pitfall / Pro-Tip
MVCC causes table bloat over time because old row versions ("dead tuples") accumulate. PostgreSQL uses the **VACUUM** process to clean up obsolete tuple versions.

---

## 4. Database Indexing & B-Tree Internals

### 23. 🔴 P0 [C] What is a Database Index, and why does an index dramatically speed up SELECT queries?

> **TL;DR:** A database index is a auxiliary sorted data structure (B+ Tree) that maps column values to physical row locations (Pointers/TIDs), reducing query search complexity from $O(N)$ full table scans to $O(\log N)$.

#### 💡 Core Concept & Explanation
Without an index, finding a row matching `WHERE age = 25` requires reading every data page on disk from start to finish (`Seq Scan`). An index maintains keys in sorted order inside a tree. The database traverses the tree nodes to locate matching pointers in milliseconds.

#### 🛠️ Code / Visual Diagram / Table

```
Without Index:  [Page 1] -> [Page 2] -> [Page 3] -> ... -> [Page N] (Check every row - O(N))
With B+ Tree:   Root Node -> Internal Node -> Leaf Node (Direct Pointer to Page 4 - O(log N))
```

#### ⚠️ Interview Pitfall / Pro-Tip
Indexes speed up `SELECT` reads, but slow down `INSERT`, `UPDATE`, and `DELETE` operations because every write must update the table AND all associated index trees.

---

### 24. 🔴 P0 [C] Explain Clustered Index vs Non-Clustered Index (Secondary Index).

> **TL;DR:** A **Clustered Index** defines the physical storage order of actual table rows on disk (Leaf nodes = actual row data). A **Non-Clustered Index** is a separate structure storing indexed keys + pointers back to clustered index keys (Leaf nodes = pointers).

#### 💡 Core Concept & Explanation
A table can have **only ONE Clustered Index** because physical table rows can only be sorted in one order on disk (usually the Primary Key).

#### 🛠️ Code / Visual Diagram / Table

```
Clustered Index (Primary Key):
Root Node ──> Internal Nodes ──> Leaf Nodes [ ACTUAL ROW DATA: (1, "Asha", 50000) ]

Non-Clustered Index (Secondary Key on Email):
Root Node ──> Internal Nodes ──> Leaf Nodes [ "asha@test.com" | Pointer: Primary Key ID=1 ]
                                                                       │
                                              Requires Secondary Lookup ┘
```

| Property | Clustered Index | Non-Clustered (Secondary) Index |
| :--- | :--- | :--- |
| **Quantity per Table** | Exactly **1** per table | **Multiple** (up to ~64 per table) |
| **Leaf Node Content** | Actual complete BSON/SQL row data | Indexed key + Pointer to Clustered Key |
| **Lookup Speed** | Faster (Direct data access) | Slightly slower (Requires key lookup step) |

#### ⚠️ Interview Pitfall / Pro-Tip
In InnoDB (MySQL), if you don't explicitly define a Primary Key, MySQL creates a hidden 6-byte auto-incrementing `ROW_ID` as the clustered index automatically!

---

### 25. 🔴 P0 [C] Why do databases use B-Trees and B+ Trees for indexes instead of Hash Tables or Binary Search Trees?

> **TL;DR:** B+ Trees keep data balanced with high fan-out (reducing disk I/O depth to 3-4 levels) and store all actual data pointers in linked leaf nodes, making **range queries (`BETWEEN`, `>`, `<`) and sorting (`ORDER BY`)** extremely fast.

#### 💡 Core Concept & Explanation
- **Why not Hash Tables?** Hash tables are $O(1)$ for exact equality (`WHERE id = 5`), but **cannot support range queries (`WHERE age > 20`) or sorting**, because hashes scatter key order randomly!
- **Why not Binary Trees?** BSTs have a low fan-out (2 children per node), resulting in deep trees requiring 20–30 disk reads. B+ Trees have hundreds of keys per node, keeping tree depth to 3–4 even for billions of rows.
- **Why B+ Tree over standard B-Tree?** In a B+ Tree, non-leaf nodes store *only* routing keys (higher fan-out), and all leaf nodes are connected via a **doubly linked list**, allowing sequential range scans by walking leaf pointers.

#### 🛠️ Code / Visual Diagram / Table

```
B+ Tree Architecture:
                [  50  |  100  ]              <- Internal Routing Nodes (High Fan-Out)
               /       |        \
    [10|20|30] ──> [55|70|90] ──> [105|120]   <- Linked Leaf Nodes (Contains Data Pointers)
     (Leaf 1)  ===>  (Leaf 2)  ===>  (Leaf 3) <- Doubly Linked List for Fast Range Scans!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always mention the **Doubly Linked List at the leaf layer**! That is the single feature of B+ Trees that enables super-fast range queries (`WHERE age BETWEEN 20 AND 30`).

---

### 26. 🔴 P0 [C] What is a Composite (Multi-Column) Index? Explain the Leftmost Prefix Rule.

> **TL;DR:** A Composite Index is built on multiple columns in a specified sequence (`INDEX(A, B, C)`). It can only be used by queries filtering on a **left-hand prefix** of those columns (`A`, `A,B`, or `A,B,C`).

#### 💡 Core Concept & Explanation
Data is sorted primarily by column `A`. For identical values of `A`, data is sorted by `B`. For identical values of `B`, data is sorted by `C`. If a query filters on `B` alone, the index tree cannot be traversed.

#### 🛠️ Code / Visual Diagram / Table

```sql
CREATE INDEX idx_user_search ON users (country, state, city);
```

| Query Filter Condition | Uses Composite Index? | Explanation |
| :--- | :---: | :--- |
| `WHERE country = 'India'` | ✅ **YES** | Matches left prefix `(country)` |
| `WHERE country = 'India' AND state = 'MH'` | ✅ **YES** | Matches left prefix `(country, state)` |
| `WHERE country = 'India' AND state = 'MH' AND city = 'Pune'` | ✅ **YES** | Matches full prefix `(country, state, city)` |
| `WHERE state = 'MH'` | ❌ **NO** | Not a left prefix! (Missing `country`) |
| `WHERE city = 'Pune'` | ❌ **NO** | Not a left prefix! (Missing `country`) |

#### ⚠️ Interview Pitfall / Pro-Tip
An index on `(A, B)` eliminates the need for a separate index on `(A)`. Delete single-column index `(A)` to prevent index redundancy!

---

### 27. 🔴 P0 [C] What is a Covering Index, and why does it eliminate table lookup overhead (`Index Only Scan`)?

> **TL;DR:** A Covering Index is an index that contains **all the columns requested by a query** (in `SELECT`, `WHERE`, `GROUP BY`). The DB answers the query strictly from the index tree without fetching rows from disk tables (`Index Only Scan`).

#### 💡 Core Concept & Explanation
Normally, a secondary index lookup finds matching IDs, requiring a second step (`Bitmap Heap Scan` / `FETCH`) to pull remaining columns from the table on disk. If the index itself stores all requested columns, the second fetch step is skipped.

#### 🛠️ Code / Visual Diagram / Table

```sql
-- Index:
CREATE INDEX idx_user_covering ON users (email, status, name);

-- Covered Query (All SELECT and WHERE fields exist inside index!):
SELECT name, status FROM users WHERE email = 'asha@test.com';

-- Execution Plan Output:
-- -> Index Only Scan using idx_user_covering (Cost=0.00..8.02)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Including extra columns in an index using `INCLUDE (column_name)` (in PostgreSQL/SQL Server) allows creating covering indexes without increasing the sorted key comparison overhead!

---

### 28. 🟠 P1 [C] What is the difference between a Dense Index and a Sparse Index?

> **TL;DR:** In a **Dense Index**, an index entry exists for *every single search key value* in the table. In a **Sparse Index**, index entries exist for *only a subset of data pages*.

#### 💡 Core Concept & Explanation
- **Dense Index:** Faster lookups, but larger index file size.
- **Sparse Index:** Smaller index file size (fits in RAM), requires stepping to data block and scanning locally.

#### 🛠️ Code / Visual Diagram / Table

```
Dense Index (Index entry for EVERY row):
[Key 1 -> Row 1], [Key 2 -> Row 2], [Key 3 -> Row 3], [Key 4 -> Row 4]

Sparse Index (Index entry per DATA PAGE):
[Key 1 -> Page 1 (Rows 1-100)], [Key 101 -> Page 2 (Rows 101-200)]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Sparse indexing requires the underlying data file to be **physically sorted** on the search key (like a Clustered Index)!

---

### 29. 🟠 P1 [P] What are the performance costs and trade-offs of adding too many indexes on a table?

> **TL;DR:** Adding too many indexes degrades write throughput (`INSERT`/`UPDATE`/`DELETE`), consumes excessive RAM/disk storage, and can confuse the query optimizer into choosing non-optimal execution plans.

#### 💡 Core Concept & Explanation
- **Write Penalty:** Inserting 1 row into a table with 10 secondary indexes forces 11 physical write operations across disk trees.
- **RAM Eviction:** Storage engines attempt to cache hot index pages in memory (Buffer Pool). If indexes exceed RAM size, constant disk swapping occurs.

#### 🛠️ Code / Visual Diagram / Table

```
Write Impact Example:
INSERT INTO users (...) ──> Updates Table
                        ├──> Updates idx_email
                        ├──> Updates idx_status
                        ├──> Updates idx_created_at
                        └──> Updates idx_city
(5 writes for 1 Insert!)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Regularly audit unused indexes using system views (e.g. `pg_stat_user_indexes` in Postgres or `sys.schema_unused_indexes` in MySQL) and drop them.

---

### 30. 🟠 P1 [C] What is a Unique Index, and how does it differ from a standard Primary Key?

> **TL;DR:** A Unique Index enforces that no two rows share the same indexed value. A Primary Key is a Unique Index that also automatically enforces `NOT NULL` and serves as the default clustered key.

#### 💡 Core Concept & Explanation
- **Primary Key:** 1 per table, implicitly `NOT NULL`, defines primary row identity.
- **Unique Index:** Multiple per table allowed, permits `NULL` values (standard SQL engines allow multiple `NULL` entries in unique indexes because `NULL != NULL`).

#### 🛠️ Code / Visual Diagram / Table

```sql
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
```

#### ⚠️ Interview Pitfall / Pro-Tip
Creating a `UNIQUE` constraint in SQL automatically creates a underlying Unique Secondary B-Tree Index behind the scenes.

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

## 9. Relational Architecture, Storage Engines & Scaling

### 60. 🔴 P0 [C] What is the difference between MySQL's InnoDB and MyISAM storage engines?

> **TL;DR:** **InnoDB** supports ACID transactions, row-level locking, and foreign keys (Default). **MyISAM** does not support transactions or foreign keys and uses table-level locking.

---

### 61. 🔴 P0 [C] What is Database Replication? Explain Primary-Replica (Master-Slave) replication.

> **TL;DR:** Replication copies data across servers. The **Primary (Master)** node processes all writes and syncs WAL logs to **Replica (Slave)** nodes, which handle read traffic.

---

### 62. 🔴 P0 [C] What is Synchronous vs Asynchronous Replication?

> **TL;DR:** **Synchronous:** Primary waits for replica write acknowledgment before committing (Zero data loss, higher write latency). **Asynchronous:** Primary commits immediately and syncs replicas in background (Faster writes, potential data loss on crash).

---

### 63. 🔴 P0 [D] What is Database Partitioning? Distinguish Range, Hash, and List Partitioning.

> **TL;DR:** Partitioning divides 1 large physical table into smaller table pieces on the **same server** based on a key (Range by date, Hash by ID, List by region).

---

### 64. 🔴 P0 [D] What is Database Sharding (Horizontal Scaling)? How does Sharding differ from Partitioning?

> **TL;DR:** Sharding distributes table rows **across multiple independent database servers (nodes)**. Partitioning splits tables across 1 server's disk.

---

### 65. 🟠 P1 [D] What is a Shard Key? What is a Hotspot Shard?

> **TL;DR:** A Shard Key determines which server node receives a row. Poor shard keys (like monotonically increasing timestamps) direct all writes to a single node, creating a **Hotspot Shard**.

---

## 10. System Design & SQL vs NoSQL Choice

### 66. 🔴 P0 [D] SQL vs NoSQL: Under what exact system requirements would you choose PostgreSQL over MongoDB, and vice versa?

> **TL;DR:** Choose **PostgreSQL** for complex relational data, strict multi-table ACID transactions, and structured schemas (Financial apps, E-commerce orders). Choose **MongoDB** for unstructured/hierarchical data, evolving schemas, and high-scale document writes.

---

### 67. 🔴 P0 [C] What is the CAP Theorem? Where do traditional RDBMS databases fit?

> **TL;DR:** CAP states a distributed system can guarantee at most 2 of 3: **Consistency**, **Availability**, **Partition Tolerance**. Traditional RDBMS databases prioritize **Consistency and Partition Tolerance (CP)**.

---

### 68. 🔴 P0 [C] What are BASE Properties vs ACID Properties?

> **TL;DR:** **ACID** (RDBMS): Strict consistency, immediate atomicity. **BASE** (NoSQL): Basically Available, Soft State, Eventual Consistency (Prioritizes availability over immediate consistency).

---

### 69. 🟠 P1 [D] What is Polyglot Persistence?

> **TL;DR:** Using different specialized database engines for different microservice components within the same system architecture (e.g. Postgres for Payments, Redis for Sessions, Elasticsearch for Search).

---

### 70. 🟠 P1 [C] What is a Connection Timeout vs Query Timeout vs Lock Timeout?

> **TL;DR:** **Connection Timeout:** Max wait time to establish TCP socket. **Query Timeout:** Max execution time before aborting slow SQL. **Lock Timeout:** Max wait time to acquire a table/row lock before failing.

---

_End of Master Answer Key — Synchronized with `dbms-interview-questions.md`._
