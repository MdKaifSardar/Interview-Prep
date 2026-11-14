# SQL Drill 04: Gaps and Islands — Consecutive Login Streaks (Q30)

## Problem Description
You are given a table `user_logins` containing records of daily user logins. A user may log in multiple times on the same day.

Write a SQL query to solve the classic **Gaps and Islands** problem: identify every continuous uninterrupted streak of consecutive daily logins for each user.

### Requirements:
For every consecutive streak, return:
1. `user_id`: The ID of the user
2. `streak_start_date`: The first date of the continuous streak
3. `streak_end_date`: The last date of the continuous streak
4. `consecutive_days`: Total number of continuous days in that streak

Order results by `user_id ASC`, then `streak_start_date ASC`.

### The Core Math Trick (Row Number Delta):
1. First, deduplicate logins per user per day (`SELECT DISTINCT user_id, login_date`).
2. Compute `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date)`.
3. Subtract the row number offset from the date. Because consecutive dates and consecutive integers advance at the exact same rate (+1 day / +1 integer), their difference remains **constant** throughout any unbroken streak (an "Island")!
4. Group by `user_id` and this constant island group to aggregate `MIN(login_date)`, `MAX(login_date)`, and `COUNT(*)`.

---

## Schema Setup

### `user_logins`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY | Log ID |
| `user_id` | INTEGER | User ID |
| `login_date` | TEXT | Login Date (`YYYY-MM-DD`) |

---

## Expected Output
```
┌─────────┬─────────┬───────────────────┬─────────────────┬──────────────────┐
│ (index) │ user_id │ streak_start_date │ streak_end_date │ consecutive_days │
├─────────┼─────────┼───────────────────┼─────────────────┼──────────────────┤
│ 0       │ 1       │ '2026-03-01'      │ '2026-03-03'    │ 3                │
│ 1       │ 1       │ '2026-03-05'      │ '2026-03-06'    │ 2                │
│ 2       │ 2       │ '2026-03-01'      │ '2026-03-01'    │ 1                │
│ 3       │ 2       │ '2026-03-04'      │ '2026-03-07'    │ 4                │
└─────────┴─────────┴───────────────────┴─────────────────┴──────────────────┘
```

---

## How to Test
1. Open `starter.sql` and write your SQL query.
2. Inspect output visually:
   ```bash
   node runner.js 4 --run
   ```
3. Run automated tests:
   ```bash
   node runner.js 4
   ```
