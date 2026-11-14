CREATE TABLE user_logins (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    login_date TEXT NOT NULL
);

INSERT INTO user_logins (id, user_id, login_date) VALUES
-- User 1: Streak 1 (3 days: Mar 01 - Mar 03), Streak 2 (2 days: Mar 05 - Mar 06)
(1, 1, '2026-03-01'),
(2, 1, '2026-03-01'), -- duplicate same-day login
(3, 1, '2026-03-02'),
(4, 1, '2026-03-03'),
(5, 1, '2026-03-05'),
(6, 1, '2026-03-06'),

-- User 2: Streak 1 (1 day: Mar 01), Streak 2 (4 days: Mar 04 - Mar 07)
(7, 2, '2026-03-01'),
(8, 2, '2026-03-04'),
(9, 2, '2026-03-05'),
(10, 2, '2026-03-06'),
(11, 2, '2026-03-07');
