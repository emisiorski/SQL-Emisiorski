const cTable = require('console.table');
var inquirer = require('inquirer');
const mysql2 = require('mysql2');
const connection = require('./db/connection');
const app = require('express');

const PORT = process.env.PORT || 3001;

connection.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  promptUser();
  });


const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'activityChoice',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Departments', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    }
  ]).then((answers) => {
    var activityChoice = answers.activityChoice;
    if (activityChoice === 'View All Departments') {
      viewDepartments();
    }
    if (activityChoice === 'View All Roles') {
      viewRoles();
    }
    if (activityChoice === 'View All Employees') {
      viewEmployees();
    }
    if (activityChoice === 'Add Departments') {
      addDepartments();
    }
    if (activityChoice === 'Add a Role') {
      addRole();
    }
    if (activityChoice === 'Add an Employee') {
      addEmployee();
    }
    if (activityChoice === 'Update an Employee Role') {
      updateEmployeeRole();
    }
    if (activityChoice === 'Exit') {
      exitApp();
    };
  });
};

viewDepartments = () => {
  console.log('viewing departments');
  const sql2 = 'SELECT departments.id, departments.name';
  connection.query(sql2, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

viewRoles = () => {
  console.log('viewing roles');
  const sql2 = `SELECT roles.id, roles.name, departments.name AS departments 
              FROM role INNER JOIN departments 
              ON role.departments_id = departments.id`;
  connection.query(sql2, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

viewEmployees = () => {
  const sql2 = `SELECT employee.id, 
               employees.first_name, 
               employees.last_name, 
               roles.title, 
               departments.name AS departments 
               roles.salary AS departments.salary
               FROM employees
               LEFT JOIN role ON employees.role_id = roles.id
               LEFT JOIN departments ON roles.departments_id = departments.id
               LEFT JOIN employees manager ON employees.manager_id = manager.id`;
  connection.query(sql2, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

addDepartments = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentsName',
      message: 'What departments do you want to add?',
    }
  ]).then((answer) => {
    const sql2 = `INSERT INTO departments (name)
                VALUES (?)`;
    connection.query(sql2, answer.addDepartments, (err, res) => {
      if (err) throw err;
      console.log('Added to departments!');
      viewDepartments();
    });
  });
};

addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is your first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is your last name?'
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: 'What is your role?'
    },
    {
      type: 'input',
      name: 'employeeManager',
      message: 'What is your managers name?'
    }
  ]).then(answers => {
    console.log(departmentAnswers);
  })
}

addRole = () => {

}

updateEmployeeRole = () => {

}

exitApp = () => {
  connection.end();
}