SELECT 
    category,
    SUM(CASE WHEN strftime('%m', order_date) = '01' THEN amount ELSE 0 END) AS Jan,
    SUM(CASE WHEN strftime('%m', order_date) = '02' THEN amount ELSE 0 END) AS Feb,
    SUM(CASE WHEN strftime('%m', order_date) = '03' THEN amount ELSE 0 END) AS Mar,
    SUM(CASE WHEN strftime('%m', order_date) = '04' THEN amount ELSE 0 END) AS Apr,
    SUM(CASE WHEN strftime('%m', order_date) = '05' THEN amount ELSE 0 END) AS May,
    SUM(CASE WHEN strftime('%m', order_date) = '06' THEN amount ELSE 0 END) AS Jun,
    SUM(CASE WHEN strftime('%m', order_date) = '07' THEN amount ELSE 0 END) AS Jul,
    SUM(CASE WHEN strftime('%m', order_date) = '08' THEN amount ELSE 0 END) AS Aug,
    SUM(CASE WHEN strftime('%m', order_date) = '09' THEN amount ELSE 0 END) AS Sep,
    SUM(CASE WHEN strftime('%m', order_date) = '10' THEN amount ELSE 0 END) AS Oct,
    SUM(CASE WHEN strftime('%m', order_date) = '11' THEN amount ELSE 0 END) AS Nov,
    SUM(CASE WHEN strftime('%m', order_date) = '12' THEN amount ELSE 0 END) AS Dec,
    SUM(amount) AS Total_Sales
FROM orders
GROUP BY category
ORDER BY category ASC;
