INSERT INTO departments (name)
VALUES
('sales');

INSERT INTO roles (title, salary, departments_id)
VALUES
  ('sales', 10,000, 1);



INSERT INTO employees
(first_name, last_name, roles_id, manager_id)

VALUES
  ('bob', 'bobert', 1, 2);