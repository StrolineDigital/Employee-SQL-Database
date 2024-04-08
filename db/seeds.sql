INSERT INTO department (name) VALUES ('Sales'), ('Warehouse'), ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 85000, 1),
       ('Salesperson', 60000, 1),
       ('Warehouse Specialist', 45000, 2),
       ('Social Media Strategist', 65000, 3),
       ('Marketing Temp', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, NULL),
       ('Kelly', 'Kapoor', 4, 1),     
       ('Pam', 'Beesly', 2, 1),      
       ('Jim', 'Halpert', 2, 1),        
       ('Ryan', 'Howard', 5, 1),      
       ('Meredith', 'Palmer', 2, 1),    
       ('Darryl', 'Philbin', 3, 1),       
       ('Dwight', 'Schrute', 2, NULL),   
       ('Roy', 'Anderson', 3, 1),       
       ('Andy', 'Bernard', 2, 1);      


INSERT INTO manager (first_name, last_name)
SELECT first_name, last_name
FROM employee
WHERE id IN (
    SELECT DISTINCT manager_id
    FROM employee 
    WHERE manager_id IS NOT NULL 
); 