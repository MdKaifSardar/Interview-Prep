-- Drill 05: 12-Month Financial Pivot (Q35)
-- Table available: orders (id, category, order_date, amount)
-- Write your query below:

SELECT 
    category,
    -- Add SUM(CASE WHEN strftime('%m', order_date) = '01' THEN amount ELSE 0 END) AS Jan ... Dec
    -- And grand Total_Sales
    SUM(amount) AS Total_Sales
FROM orders
GROUP BY category
ORDER BY category ASC;
