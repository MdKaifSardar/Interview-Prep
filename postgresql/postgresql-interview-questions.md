# PostgreSQL Technical Interview Master List (18 Questions)

**Track:** Backend Engineering · Distributed Systems · Production Database Optimization

## Legend

**Priority** — 🔴 P0 Essential (Highest interview ROI / must-know) · 🟠 P1 Important (Senior / production-deep)

**Type** — [C] Conceptual · [Q] Query/Mechanism · [D] Architecture/Design · [P] Performance/Optimization

---

## 1. Architecture, Process Model & Memory

1. 🔴 P0 [C] What is the PostgreSQL process-per-connection architecture, why do connections consume substantial memory, and how does PgBouncer solve connection scaling bottlenecks?
2. 🟠 P1 [C] What is the PostgreSQL memory hierarchy (`shared_buffers` vs `work_mem`), and why can misconfiguring `work_mem` cause instantaneous Out-Of-Memory (OOM) crashes?
3. 🟠 P1 [C] What are the core architectural differences between PostgreSQL and MySQL (InnoDB) regarding process models, MVCC storage, and table clustering?

## 2. MVCC, Tuple Storage & VACUUM Mechanics

4. 🔴 P0 [Q] How does PostgreSQL implement MVCC without Undo Logs, what do `xmin` and `xmax` hidden headers do, and why do readers never block writers?
5. 🔴 P0 [Q] What causes dead tuple bloat in tables and indexes, how does standard `VACUUM` reclaim dead space, and why does `VACUUM FULL` acquire an exclusive table lock?
6. 🟠 P1 [P] What is the Heap-Only Tuple (HOT) optimization, how does it eliminate index update amplification, and how does adjusting table `fillfactor` boost write throughput?
7. 🟠 P1 [C] What is the 32-bit Transaction ID (XID) wraparound problem, what happens if autovacuum fails to freeze old tuples, and how do frozen tuples prevent database shutdown?

## 3. Specialized Indexing Strategies

8. 🔴 P0 [Q] What is the PostgreSQL indexing ecosystem (B-Tree vs GIN vs GiST vs BRIN), and when should you choose each index type?
9. 🔴 P0 [Q] How do Partial Indexes and Expression (Functional) Indexes work, and how do they reduce index footprint and accelerate targeted queries?
10. 🟠 P1 [P] How do Covering Indexes (`INCLUDE` clause) enable Index-Only Scans without reading the heap table, and what role does the Visibility Map play?
11. 🟠 P1 [Q] Why does standard `CREATE INDEX` lock production tables, how does `CREATE INDEX CONCURRENTLY` work safely, and how do you recover from an `INVALID` index?

## 4. JSONB & Postgres SQL Superpowers

12. 🔴 P0 [Q] What is the difference between `JSON` and `JSONB` data types, how do you query nested documents with operators (`->`, `->>`, `@>`), and how do you index JSONB with GIN?
13. 🔴 P0 [Q] How does atomic UPSERT work using `ON CONFLICT DO UPDATE / DO NOTHING`, and how does the `RETURNING` clause eliminate redundant `SELECT` roundtrips?
14. 🟠 P1 [Q] What are PostgreSQL Application Advisory Locks (`pg_advisory_lock`), and how can backend services use them for distributed mutexes without Redis?

## 5. WAL, Replication, Partitioning & Performance

15. 🔴 P0 [C] What is the role of Write-Ahead Logging (WAL) in ACID durability and crash recovery, and how do Checkpoints balance disk I/O spikes against recovery time?
16. 🟠 P1 [D] What is the difference between Physical Streaming Replication (WAL-based) and Logical Replication (pub/sub), and when would you use each?
17. 🟠 P1 [D] How does Declarative Table Partitioning (Range, List, Hash) work, and how does Partition Pruning accelerate queries over 100M+ row tables?
18. 🔴 P0 [P] How do you analyze an `EXPLAIN (ANALYZE, BUFFERS)` execution plan (Seq Scan vs Index Scan vs Bitmap Heap Scan, and shared buffer hits)?

---

## Revision Modes

- **Core Fast-Sweep (P0 Only):** Questions 1, 4, 5, 8, 9, 12, 13, 15, 18 (Process Model, MVCC, VACUUM, Index Types, JSONB, UPSERT, WAL, EXPLAIN ANALYZE)
- **High Concurrency & Tuning:** Questions 1, 2, 4, 5, 6, 14, 18
- **Scale & Architecture:** Questions 3, 7, 10, 11, 15, 16, 17
