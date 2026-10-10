[⬅️ Previous: 09 · Storage Engines & Scaling](09-relational-architecture-storage-engines-and-scaling.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

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

[⬅️ Previous: 09 · Storage Engines & Scaling](09-relational-architecture-storage-engines-and-scaling.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)
