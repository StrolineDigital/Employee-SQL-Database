const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
        user: 'root',
    password: 'PASSWORD_HERE',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );
  db.connect(function(err) {
    if (err) throw err;
  });

