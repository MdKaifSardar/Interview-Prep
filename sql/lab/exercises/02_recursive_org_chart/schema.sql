CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO employees (id, name, manager_id) VALUES
(1, 'Alice', NULL),    -- Level 1: CEO
(2, 'Bob', 1),          -- Level 2: VP Engineering
(3, 'Charlie', 1),      -- Level 2: VP Product
(4, 'David', 2),        -- Level 3: Engineering Manager
(5, 'Eve', 2),          -- Level 3: Tech Lead
(6, 'Frank', 4);        -- Level 4: Senior Engineer
