-- Insert departments
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing'),
('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Software Engineer', 90000, 2),
('Marketing Specialist', 60000, 3),
('HR Coordinator', 55000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Maria', 'Silva', 1, NULL),
('Carlos', 'Santos', 2, 1),
('Rosana', 'Costa', 3, NULL),
('Pedro', 'Pereira', 4, NULL);
