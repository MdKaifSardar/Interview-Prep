CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL,
    txn_date TEXT NOT NULL,
    amount INTEGER NOT NULL
);

INSERT INTO transactions (id, category, txn_date, amount) VALUES
(1, 'Electronic', '2026-01-01', 500),
(2, 'Books', '2026-01-02', 30),
(3, 'Electronic', '2026-01-03', 200),
(4, 'Books', '2026-01-05', 45),
(5, 'Electronic', '2026-01-07', 300),
(6, 'Books', '2026-01-10', 25);
