# SQL Technical Interview Lab & Local Practice Engine

An ultra-fast, local in-memory SQL coding practice lab built on Node.js v22's native `node:sqlite` engine. Designed specifically to practice the critical SQL interview patterns that **either have no direct LeetCode problem or are paywalled behind LeetCode Premium ($35/mo)**.

---

## ⚡ Key Highlights
- **Zero Configuration:** No PostgreSQL server, no MySQL daemon, no Docker, and no `npm install` needed.
- **In-Memory Speed:** Spins up a fresh, isolated database in RAM and runs your query in under **5 milliseconds**.
- **Instant Visual Feedback:** Inspect ASCII tables of your query output or run automated tests with edge-case assertion grading.

---

## 📋 The 5 Essential Drills

| Drill # | Question | Pattern | Why It's in the Local Lab |
| :---: | :---: | :--- | :--- |
| **01** | **Q10** | **Department Summary Multi-Aggregates** | **Missing on LeetCode:** Tests multi-metric aggregation (`AVG`, `MIN`, `MAX`, `COUNT(*)`) with rounding and empty group retention. |
| **02** | **Q20** | **Recursive CTE Org-Tree Traversal** | **Paywalled:** [LC 1270](https://leetcode.com/problems/all-people-report-to-the-given-manager/) requires LeetCode Premium. |
| **03** | **Q26** | **Partitioned Running Cumulative Sum** | **Paywalled:** [LC 534](https://leetcode.com/problems/game-play-analysis-iii/) requires LeetCode Premium. |
| **04** | **Q30** | **Gaps and Islands (Login Streaks)** | **Paywalled:** [LC 1285](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges/) & [LC 1454](https://leetcode.com/problems/active-users/) require LeetCode Premium. |
| **05** | **Q35** | **12-Month Financial Pivot** | **Real-World Drill:** Full annual calendar pivot using conditional aggregation. |

---

## 🚀 How to Practice

### 1. List All Available Drills
```bash
cd "sql/lab"
node runner.js list
```

### 2. View Problem Requirements
Each drill has its own dedicated folder under `exercises/` with a `README.md` explaining the problem statement, table schemas, and expected output.

### 3. Write Your Query
Open `exercises/<drill_name>/starter.sql` in VS Code and write your `SELECT` query.

### 4. Execute & Inspect Visual Output (`--run`)
Run your query against the test database and print a formatted ASCII table:
```bash
node runner.js 1 --run
# or by name:
node runner.js dept --run
```

### 5. Run Automated Tests
Grade your query against test assertions (handling edge cases like NULLs, empty departments, and streak gaps):
```bash
node runner.js 1
```

### 6. Run All Tests
```bash
node runner.js all
```
*(Tip: Run `node runner.js test-solutions` to verify all reference solutions)*
