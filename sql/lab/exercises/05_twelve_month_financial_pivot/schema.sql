CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL,
    order_date TEXT NOT NULL,
    amount INTEGER NOT NULL
);

INSERT INTO orders (id, category, order_date, amount) VALUES
(1, 'Electronic', '2026-01-15', 500),
(2, 'Electronic', '2026-02-10', 300),
(3, 'Books', '2026-01-20', 50),
(4, 'Books', '2026-03-05', 100),
(5, 'Electronic', '2026-04-12', 400),
(6, 'Books', '2026-12-25', 200);
