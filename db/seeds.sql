USE company_db;

INSERT INTO departments (name)
VALUES  ("Marketing"),
        ("Human Recources"),
        ("Cleaning"),
        ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Marketing floor Manager", 90000.00, 1),
        ("Digital Designer", 80000.00, 1),
        ("Script writer", 70000.00, 1),
        ("Human Recources floor Manager", 80000.00, 2),
        ("Hiring", 60000.00, 2),
        ("Background check specialist", 80000.00, 2),
        ("Cleaning department manager", 80000.00, 3),
        ("Janitor", 60000.00, 3),
        ("Inspector", 70000.00, 3),
        ("Engineering floor Manager", 90000.00, 4),
        ("Structural designer", 80000.00, 4),
        ("Structural engineer", 80000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("May", "Dwill", 1, 1),
        ("Harry", "Ackerman", 2, 1),
        ("David", "Redsborough", 3, 1),
        ("Jacob", "Randsay", 4, 4),
        ("Allie", "Donsor", 5, 4),
        ("Bill", "Folsay", 6, 4),
        ("Jane", "Devins", 7, 7),
        ("CeCe", "Torek", 8, 7),
        ("Malvin", "Lars", 9, 7),
        ("Ryan", "Falls", 10, 10),
        ("Lorie", "Jakoven", 11, 10),
        ("Drake", "Maksley", 12, 10);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;