[⬅️ Previous: 01 · Fundamentals & Relational Model](01-fundamentals-architecture-and-relational-model.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Concurrency & Isolation ➡️](03-concurrency-control-and-isolation-levels.md)

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

[⬅️ Previous: 01 · Fundamentals & Relational Model](01-fundamentals-architecture-and-relational-model.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Concurrency & Isolation ➡️](03-concurrency-control-and-isolation-levels.md)
