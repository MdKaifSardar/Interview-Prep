SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    COALESCE(ROUND(AVG(e.salary), 2), 0) AS avg_salary,
    COALESCE(MIN(e.salary), 0) AS min_salary,
    COALESCE(MAX(e.salary), 0) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY d.id ASC;
