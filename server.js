const cTable = require('console.table');
var inquirer = require('inquirer');
const sql = require('mysql2');
const db = require('./db/connection');
const app = require('express');

const PORT = process.env.PORT || 3001;


db.connect(err => {
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
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Departments', 'Add a Role', 'Add an Employee', 'Exit']
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
  const sql = 'SELECT * FROM departments';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

viewRoles = () => {
  console.log('viewing roles');
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

addDepartments = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departments_name',
      message: 'What department do you want to add?',
    }
  ]).then((answer) => {
    db.query(`INSERT INTO departments SET ?`, 
    {name: answer.name});
    db.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      console.table(res);
      console.log('New Department Added');
      promptUser();
    })
    });
  }


addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is your first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is your last name?'
    },
    {
      type: 'input',
      name: 'roles_id',
      message: 'What is your role id?'
    },
  ]). then((answer) => {
    db.query(`INSERT INTO employees SET ?`, 
    {first_name: answer.first_name, last_name: answer.last_name, roles_id: answer.roles_id});
    db.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      console.log('New Employee Added');
      promptUser();
    })
    });
  }


addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your job title?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is your salary?'
    },
    {
      type: 'input',
      name: 'departments_id',
      message: 'What is your department id?'
    }
  ]). then((answer) => {
  db.query(`INSERT INTO roles SET ?`, 
  {title: answer.title, salary: answer.salary, departments_id: answer.departments_id});
  db.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log('New Role Added');
    promptUser();
  })
  });
}

exitApp = () => {
  db.end();
}