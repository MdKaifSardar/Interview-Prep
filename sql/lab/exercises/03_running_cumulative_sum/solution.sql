SELECT 
    category,
    txn_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY category 
        ORDER BY txn_date ASC, id ASC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_amount
FROM transactions
ORDER BY category ASC, txn_date ASC, id ASC;
