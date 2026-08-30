# DBMS Interview Master List (70 Questions)
**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Startup

## Legend

**Priority** — 🔴 P0 Essential (don't skip) · 🟠 P1 Important · 🟡 P2 Depth (stronger/deeper interviews)

**Type** — [C] Conceptual · [Q] SQL Concept/Query Mechanic · [D] Design/Architecture · [P] Performance/Optimization

---

## 1. Fundamentals, DBMS Architecture & Relational Model

1. 🔴 P0 [C] What is a DBMS, and how is a database system superior to a traditional File Processing System?
2. 🔴 P0 [C] What is the RDBMS model, and what defines the relational concept (Tables, Tuples, Attributes, Schemas)?
3. 🔴 P0 [C] Explain the 3-Schema Architecture (ANSI-SPARC) — Internal, Conceptual, and External levels.
4. 🔴 P0 [C] What is Data Independence? Distinguish Logical Data Independence from Physical Data Independence.
5. 🔴 P0 [C] What are Keys in DBMS? Explain Super Key, Candidate Key, Primary Key, Foreign Key, and Composite Key.
6. 🔴 P0 [C] What is Referential Integrity? What happens on `ON DELETE CASCADE`, `ON DELETE SET NULL`, and `ON DELETE RESTRICT`?
7. 🟠 P1 [C] What is the difference between Schema and Instance in DBMS?
8. 🟠 P1 [C] What are Data Constraints (`NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`) and where are they enforced?

## 2. Transactions & ACID Properties

9. 🔴 P0 [C] What is a Transaction in DBMS? What is the Transaction Lifecycle (Active, Partially Committed, Committed, Failed, Aborted)?
10. 🔴 P0 [C] Explain the **ACID Properties** in detail (Atomicity, Consistency, Isolation, Durability).
11. 🔴 P0 [C] How does a database guarantee **Atomicity** during a mid-transaction crash (Undo Log / Rollback)?
12. 🔴 P0 [C] How does a database guarantee **Durability** after a hardware crash (Redo Log / Write-Ahead Logging - WAL)?
13. 🔴 P0 [C] What is the difference between `COMMIT`, `ROLLBACK`, and `SAVEPOINT`?
14. 🟠 P1 [C] What is a Schedule in DBMS? Distinguish Serial Schedule vs Concurrent Schedule.
15. 🟠 P1 [C] What is Conflict Serializability, and how do you test if a schedule is conflict serializable (Precedence Graph)?

## 3. Concurrency Control & Isolation Levels

16. 🔴 P0 [C] What concurrency anomalies occur when transactions run simultaneously without isolation?
17. 🔴 P0 [C] Explain the **3 Read Anomalies**: Dirty Read, Non-Repeatable Read, and Phantom Read.
18. 🔴 P0 [C] Explain the **4 ANSI SQL Isolation Levels** (`READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`) and which anomalies each prevents.
19. 🔴 P0 [C] What are Database Locks? Explain Shared Lock (S-Lock) vs Exclusive Lock (X-Lock).
20. 🟠 P1 [C] What is Two-Phase Locking (2PL)? Distinguish Strict 2PL vs Rigorous 2PL.
21. 🟠 P1 [C] What is a Deadlock in DBMS? How do databases Detect, Prevent, and Resolve deadlocks?
22. 🟡 P2 [C] What is MVCC (Multi-Version Concurrency Control), and how does PostgreSQL/InnoDB achieve lock-free reads?

## 4. Database Indexing & B-Tree Internals

23. 🔴 P0 [C] What is a Database Index, and why does an index dramatically speed up SELECT queries?
24. 🔴 P0 [C] Explain **Clustered Index** vs **Non-Clustered Index (Secondary Index)**. Why can a table have only ONE Clustered Index?
25. 🔴 P0 [C] Why do databases use **B-Trees and B+ Trees** for indexes instead of Hash Tables or Binary Search Trees?
26. 🔴 P0 [C] What is a Composite (Multi-Column) Index? Explain the **Leftmost Prefix Rule** in SQL indexing.
27. 🔴 P0 [C] What is a **Covering Index**, and why does it eliminate table lookup overhead (`Index Only Scan`)?
28. 🟠 P1 [C] What is the difference between a Dense Index and a Sparse Index?
29. 🟠 P1 [P] What are the performance costs and trade-offs of adding too many indexes on a table?
30. 🟠 P1 [C] What is a Unique Index, and how does it differ from a standard Primary Key?

## 5. Schema Design, Normalization & Denormalization

31. 🔴 P0 [C] What is Normalization, and why do we normalize relational databases?
32. 🔴 P0 [C] What are Database Anomalies? Explain **Insertion Anomaly**, **Deletion Anomaly**, and **Update Anomaly** with examples.
33. 🔴 P0 [C] What is Functional Dependency ($X \rightarrow Y$)? Explain Full vs Partial vs Transitive Dependency.
34. 🔴 P0 [C] Explain **1NF (First Normal Form)**: Atomic values and unique column names.
35. 🔴 P0 [C] Explain **2NF (Second Normal Form)**: Elimination of Partial Dependencies.
36. 🔴 P0 [C] Explain **3NF (Third Normal Form)**: Elimination of Transitive Dependencies.
37. 🟠 P1 [C] What is **BCNF (Boyce-Codd Normal Form)**? How is BCNF stricter than 3NF?
38. 🟠 P1 [D] What is **Denormalization**? When and why would a backend developer intentionally denormalize a database schema?

## 6. SQL Execution Order & JOIN Fundamentals

39. 🔴 P0 [Q] What is the exact **Logical Execution Order of a SQL Query**?
40. 🔴 P0 [Q] What is the difference between `WHERE` clause and `HAVING` clause?
41. 🔴 P0 [Q] Explain all Types of SQL JOINs: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN`, and `SELF JOIN`.
42. 🔴 P0 [Q] What is the difference between filtering in the `ON` clause vs `WHERE` clause during a `LEFT JOIN`?
43. 🔴 P0 [Q] What is the difference between `UNION` and `UNION ALL`?
44. 🟠 P1 [Q] What is the difference between `DELETE`, `TRUNCATE`, and `DROP` commands?
45. 🟠 P1 [C] Distinguish SQL Commands: DDL (`CREATE`, `ALTER`), DML (`INSERT`, `UPDATE`), DCL (`GRANT`, `REVOKE`), TCL (`COMMIT`, `ROLLBACK`).
46. 🟠 P1 [P] Explain physical Join Algorithms executed by DB engines: Nested Loop Join vs Hash Join vs Merge Join.

## 7. Subqueries, Window Functions, Views & Procedures

47. 🔴 P0 [Q] What is a Subquery? Distinguish Correlated Subquery vs Non-Correlated Subquery.
48. 🔴 P0 [Q] What is the difference between `IN` vs `EXISTS` operators in SQL? Which performs better?
49. 🔴 P0 [Q] What are **Window Functions** in SQL? How does `OVER (PARTITION BY ... ORDER BY ...)` differ from `GROUP BY`?
50. 🔴 P0 [Q] What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?
51. 🟠 P1 [C] What is a Database **View**? How does a standard View differ from a **Materialized View**?
52. 🟠 P1 [C] What is a **Stored Procedure**? What are the pros and cons of placing business logic in Stored Procedures vs Backend Application code?
53. 🟠 P1 [C] What are Database **Triggers**? When should you use them, and what maintenance risks do they pose?

## 8. Query Optimization, Execution Plans & Performance

54. 🔴 P0 [P] What is a Query Execution Plan? How do you use `EXPLAIN` / `EXPLAIN ANALYZE` to debug a slow SQL query?
55. 🔴 P0 [P] What is a Full Table Scan (`Seq Scan`), and how do you rewrite a query to enforce an Index Scan?
56. 🔴 P0 [P] Why does wrapping an indexed column in a function (e.g. `WHERE YEAR(created_at) = 2026`) disable index usage (Non-SARGable query)?
57. 🔴 P0 [P] What is **Connection Pooling** in backend development, and why is opening a new SQL connection per request dangerous?
58. 🟠 P1 [P] Why is `SELECT *` considered a bad practice in production APIs?
59. 🟠 P1 [P] How do you handle N+1 query problems when fetching relational data in backend ORMs?

## 9. Relational Architecture, Storage Engines & Scaling

60. 🔴 P0 [C] What is the difference between MySQL's **InnoDB** and **MyISAM** storage engines?
61. 🔴 P0 [C] What is **Database Replication**? Explain Primary-Replica (Master-Slave) replication for read scaling.
62. 🔴 P0 [C] What is the difference between Synchronous Replication and Asynchronous Replication?
63. 🔴 P0 [D] What is **Database Partitioning**? Distinguish Range, Hash, and List Partitioning.
64. 🔴 P0 [D] What is **Database Sharding** (Horizontal Scaling)? How does Sharding differ from Partitioning?
65. 🟠 P1 [D] What is a Shard Key? What problems occur if a shard key causes a "Hotspot Shard"?

## 10. System Design & SQL vs NoSQL Choice

66. 🔴 P0 [D] **SQL vs NoSQL:** Under what exact system requirements would you choose PostgreSQL over MongoDB, and vice versa?
67. 🔴 P0 [C] What is the CAP Theorem? Where do traditional RDBMS databases (CP) fit?
68. 🔴 P0 [C] What is **BASE Properties** (Basically Available, Soft State, Eventual Consistency) vs ACID Properties?
69. 🟠 P1 [D] What is **Polyglot Persistence** in modern backend microservice architecture?
70. 🟠 P1 [C] What is a Connection Timeout vs Query Timeout vs Lock Timeout in production database configurations?

---

## Revision Modes

- **Easy / basic fresher interview:** all 🔴 P0 questions
- **Normal backend interview:** 🔴 P0 + 🟠 P1
- **Strong startup / deep technical round:** 🔴 P0 + 🟠 P1 + 🟡 P2
- **Fundamental revision:** for every [C] question, explain the concept in your own words
- **SQL concept revision:** understand logical flow for every [Q] question
- **Performance revision:** for [P] questions, trace query -> index -> execution plan -> bottleneck -> fix
