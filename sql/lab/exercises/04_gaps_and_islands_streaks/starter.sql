-- Drill 04: Gaps and Islands — Consecutive Login Streaks (Q30)
-- Table available: user_logins (id, user_id, login_date)
-- Write your query below:

WITH DistinctLogins AS (
    -- Step 1: Deduplicate user_id and login_date
    SELECT DISTINCT user_id, login_date 
    FROM user_logins
),
IslandGroups AS (
    -- Step 2: Assign row_number and compute invariant island group key
    -- In SQLite / standard SQL: julianday(login_date) - ROW_NUMBER() OVER (...)
    SELECT 
        user_id,
        login_date
    FROM DistinctLogins
)
-- Step 3: Aggregate min date, max date, and count(*) per user and island group
SELECT 
    user_id
FROM IslandGroups
ORDER BY user_id ASC;
