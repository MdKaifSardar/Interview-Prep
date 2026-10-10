[⬅️ Previous: 03 · Concurrency & Isolation](03-concurrency-control-and-isolation-levels.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Normalization & Schema Design ➡️](05-schema-design-normalization-and-denormalization.md)

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

[⬅️ Previous: 03 · Concurrency & Isolation](03-concurrency-control-and-isolation-levels.md) &nbsp;|&nbsp; [📋 Index](../dbms-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Normalization & Schema Design ➡️](05-schema-design-normalization-and-denormalization.md)
