[⬅️ Previous: 08 · Query Optimization & Performance](08-query-optimization-execution-plans-and-performance.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · System Design & SQL vs NoSQL ➡️](10-system-design-and-sql-vs-nosql-choice.md)

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

[⬅️ Previous: 08 · Query Optimization & Performance](08-query-optimization-execution-plans-and-performance.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · System Design & SQL vs NoSQL ➡️](10-system-design-and-sql-vs-nosql-choice.md)
