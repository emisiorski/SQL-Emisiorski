DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departments_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  departments_id INTEGER,
  CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INTEGER
);

