-- Drill 03: Partitioned Running Cumulative Sum (Q26)
-- Table available: transactions (id, category, txn_date, amount)
-- Write your query below:

SELECT 
    category,
    txn_date,
    amount
    -- Add your window function SUM() OVER(...) here
FROM transactions
ORDER BY category ASC, txn_date ASC, id ASC;
