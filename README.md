# Employee SQL Database
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]
  ## Description
  This project is to allow the user to view and update employee data in an SQL database using a CLI
  ## Link To The Demo Video
  
  https://drive.google.com/file/d/16F2kBtmUV8MZqfA9EIpdDfepF-pFkG2Z/view

  ## Installation
  To install this command line application the user must start by having node.js and mysql installed in their local machine and  downloading the Employee-SQL-Database file from the Github repository(Instructions for installing node.js can be found here https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)(instructions for installing mysql can be found here https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/). The user must be in the main directory and use the "npm i" or "npm install" command in their bash terminal (whichever is preferred) to install the package.json. Once the package.json is installed  the user will use bash to CD into the "db" folder where they can then run "mysql -u root -p" to enter into their mysql account. The user then must start with the command "source schema.sql;" which will install the schema file locally. The user then must enter the command "source seeds.sql" which will seed the database with the starting information for the database. Once the sql files have been initiallized the user must type "quit" in the command line to return to the main bash terminal. Once the user is in the bash terminal again, they must use "cd .." to back out of the db folder and then simply type node index.js to begin the CLI application!

  ## User Story
  AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

  ## Acceptance Criteria
  GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

  ## Usage
 Once the installation instructions have been followed, the user must open the bash terminal and type "node index.js" every time they'd like to use this application. The application will prompt the user for selections and inputs. Overall the user interface is pretty self explanatory due to the prompts. For those inexperienced with using a CLI program, the arrow keys are used to move up and down between selections, the "ENTER" button on the keyboard is used for selecting, and there are some inputs that the user will be asked to type a response. 

  ## Contributing
  This project was created by Luke Stroehlein from scratch with help from the BCS tutor Collin Porter for initial set up. Much help was found on the internet including resources such as w3schools and stack overflow.
  ## License
  This project is licensed under the MIT license.
  ## Tests
  The best way to test this project is to run the application in the command line and follow the prompts in the CLI. Data entry can be verified by going to the menu and checking to see if the user's entry is present in the updated version of the database.


  ## Questions
  If you have any questions, please feel free to reach out to me at strolinedigital@gmail.com. 
  You can also view my GitHub profile at https://github.com/StrolineDigital



