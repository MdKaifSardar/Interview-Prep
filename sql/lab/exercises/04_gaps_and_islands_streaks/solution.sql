WITH DistinctLogins AS (
    SELECT DISTINCT user_id, login_date 
    FROM user_logins
),
IslandGroups AS (
    SELECT 
        user_id,
        login_date,
        CAST(julianday(login_date) - ROW_NUMBER() OVER (
            PARTITION BY user_id 
            ORDER BY login_date ASC
        ) AS INTEGER) AS grp
    FROM DistinctLogins
)
SELECT 
    user_id,
    MIN(login_date) AS streak_start_date,
    MAX(login_date) AS streak_end_date,
    COUNT(*) AS consecutive_days
FROM IslandGroups
GROUP BY user_id, grp
ORDER BY user_id ASC, streak_start_date ASC;
