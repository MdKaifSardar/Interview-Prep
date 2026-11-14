CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO departments (id, name) VALUES
(1, 'Engineering'),
(2, 'Marketing'),
(3, 'Sales'),
(4, 'Human Resources');

INSERT INTO employees (id, name, salary, department_id) VALUES
(101, 'Alice', 100000, 1),
(102, 'Bob', 85000, 1),
(103, 'Charlie', 70000, 1),
(104, 'David', 60000, 2),
(105, 'Eve', 55000, 2),
(106, 'Frank', 90000, 3);
