//This variable block is for the required packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//This block is for the connection to the database and automatically uses login credentials to make the connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PASSWORD_HERE',
  database: 'employees_db'
});

//This block throws an error if the connection is not successful and logs a message if the connection is successful
db.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
  start();
});

//This block is for the inquirer prompt that will be used to select the action to be taken
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
      //pageSize prevents the list from being cut off
      pageSize:8
    }
    //This block is for the switch statement that will be used to determine the action to be taken based on the user's selection
  ]).then((answer) => {
    switch (answer.action) {
      case 'View all employees':
        viewEmployees();
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
        //db.end() ends the connection to the database
      case 'Exit':
        db.end();
        break;
        default:        
    }
  });
};
//the viewEmployees function is used to display the employee table in the console
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

//the viewRoles function is used to display the roles table in the console
const viewRoles = () => {
  db.query('SELECT * FROM roles', function(err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    
    start();
  });
  
};
//the viewDepartments function is used to display the department table in the console
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
//the addEmployee function is used to add an employee to the employee table
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
      
    });
    start();
  });
  
};
//the addRole function is used to add a role to the roles table
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
    db.query('INSERT INTO roles SET ?', answer, function(err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Role added');
      
    });
    start();
  });
  
};
//the addDepartment function is used to add a department to the department table
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
      
    });
    start();
  });
  
};
//the updateEmployeeRole function is used to update an employee's role in the employee table
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
      
    });
    start();
  });
 
};

