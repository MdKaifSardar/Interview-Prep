WITH RECURSIVE OrgHierarchy AS (
    SELECT 
        id, 
        name, 
        manager_id, 
        1 AS org_level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT 
        e.id, 
        e.name, 
        e.manager_id, 
        oh.org_level + 1 AS org_level
    FROM employees e
    JOIN OrgHierarchy oh ON e.manager_id = oh.id
)
SELECT id, name, manager_id, org_level
FROM OrgHierarchy
ORDER BY org_level ASC, id ASC;
