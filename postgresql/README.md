# PostgreSQL Technical Interview Preparation

A curated, production-tested syllabus covering the internal mechanics, MVCC storage engine, specialized indexing types, and query optimization patterns of PostgreSQL.

## 📚 Documents in this Module

1. **[postgresql-interview-questions.md](postgresql-interview-questions.md):** Master list of 18 questions across 5 core modules.
2. **[postgresql-interview-handbook.md](postgresql-interview-handbook.md):** Complete answers with architecture diagrams, SQL snippets, EXPLAIN analyses, and interview pitfalls.

---

## 🗺️ Module Breakdown

| Module | Topic | Questions | Key Concepts |
| :---: | :--- | :---: | :--- |
| **1** | Architecture, Process Model & Memory | #1 – #3 | Process-per-connection, PgBouncer pooling, `shared_buffers` vs `work_mem` |
| **2** | MVCC, Tuple Storage & VACUUM | #4 – #7 | Heap storage, `xmin`/`xmax`, bloat, standard `VACUUM` vs `VACUUM FULL`, HOT, XID wraparound |
| **3** | Specialized Indexing Strategies | #8 – #11 | B-Tree vs GIN vs GiST vs BRIN, Partial Indexes, Covering Indexes (`INCLUDE`), `CONCURRENTLY` |
| **4** | JSONB & SQL Superpowers | #12 – #14 | `JSON` vs `JSONB`, GIN indexing, `ON CONFLICT` UPSERT, `RETURNING`, Advisory Locks |
| **5** | WAL, Replication & Performance | #15 – #18 | WAL, Checkpoints, Physical vs Logical Replication, Table Partitioning, `EXPLAIN (ANALYZE, BUFFERS)` |

**Total: 18 Questions**
