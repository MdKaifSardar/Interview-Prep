[⬅️ Previous: 02 · Transactions & ACID](02-transactions-and-acid-properties.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Indexing & B-Trees ➡️](04-database-indexing-and-b-tree-internals.md)

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

[⬅️ Previous: 02 · Transactions & ACID](02-transactions-and-acid-properties.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Indexing & B-Trees ➡️](04-database-indexing-and-b-tree-internals.md)
