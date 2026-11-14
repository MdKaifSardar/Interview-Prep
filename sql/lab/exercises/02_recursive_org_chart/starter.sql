-- Drill 02: Recursive CTE Org-Tree Traversal (Q20)
-- Table available: employees (id, name, manager_id)
-- Write your query below:

WITH RECURSIVE OrgHierarchy AS (
    -- 1. Anchor Member: Find the CEO (manager_id IS NULL) with org_level = 1
    
    UNION ALL
    
    -- 2. Recursive Member: Join employees to OrgHierarchy and increment org_level + 1
    
)
SELECT id, name, manager_id, org_level
FROM OrgHierarchy
ORDER BY org_level ASC, id ASC;
