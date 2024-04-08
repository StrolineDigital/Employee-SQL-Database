const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PASSWORD_HERE',
  database: 'employees_db'
});

db.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
  start();
});

const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all roles',
        'View all departments',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        'Exit',
      ],
      pageSize:8
    }
  ]).then((answer) => {
    switch (answer.action) {
      case 'View all employees':
        viewEmployees();
        break;
      case 'View employees by department':
        viewEmployeesByDepartment();
        break;
      case 'View employees by manager':
        viewEmployeesByManager();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all departments':
        viewDepartments();
        break;
      case 'Add employee':
        addEmployee();
        break;
      case 'Add role':
        addRole();
        break;
      case 'Add department':
        addDepartment();
        break;
      case 'Update employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end();
        break;
    }
  });
};

const viewEmployees = () => {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, roles.salary AS salary, 
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, department.name AS department 
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
  function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    start();
  });
};

const viewEmployeesByDepartment = () => {
  db.query('SELECT * FROM department', function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    start();
  });
};

const viewEmployeesByManager = () => {
  db.query('SELECT * FROM manager', function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    start();
  });
};

const viewRoles = () => {
  db.query('SELECT * FROM role', function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    start();
  });
};

const viewDepartments = () => {
  db.query('SELECT * FROM department', function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    start();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter employee role id'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter employee manager id'
    }
  ]).then((answer) => {
    db.query('INSERT INTO employee SET ?', answer, function(err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Employee added');
      start();
    });
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department id'
    }
  ]).then((answer) => {
    db.query('INSERT INTO role SET ?', answer, function(err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Role added');
      start();
    });
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name'
    }
  ]).then((answer) => {
    db.query('INSERT INTO department SET ?', answer, function(err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Department added');
      start();
    });
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter employee id'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter role id'
    }
  ]).then((answer) => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.employee_id], function(err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Employee role updated');
      start();
    });
  });
};

start();