//Variables
const inquirer = require('inquirer');
const mysql = require('mysql2')
const {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee} = require('./utility/mysql-functions');


//Functions
const newDepartment = () => {
    inquirer
        .prompt([
            {
                type:'input',
                message:'What would you like the Department name to be?',
                name: 'newDepartmentName'
            }
        ])

        .then((data) =>{
            addDepartment(data.newDepartmentName);
        });
};

const newRole = () => {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
    )

    db.query('SELECT * FROM departments', function (err, result) {
        const choicesArray = [];
        for (const department of result){
          choicesArray.push(department.name);  
        };
        inquirer
        .prompt([
            {
                type:'input',
                message:'What should the name for this new Role be?',
                name:'newRoleName'
            },
            {
                type:'input',
                message:'What is the salary for this role?',
                name:'newRoleSalary'
            },
            {
                type:'list',
                message:'What department should this Role fall under?',
                choices:choicesArray,
                name: 'newRoleDepartment'
            }
        ])
        .then((data) =>{
            let departmentId = undefined;

            for (const department of result){
                if (data.newRoleDepartment === department.name){
                    departmentId = department.id
                }
            }
            addRole(data.newRoleName, data.newRoleSalary, departmentId);
        });
    })
    
};


const newEmployee = () =>{
    const rolesChoicesArray = [];
    const rolesIdArray = [];

    const employeesChoicesArray = [];
    const employeesIdArray = [];

    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
    )
    db.query('SELECT * FROM roles', function (err, result) {
        for (const role of result){
          rolesChoicesArray.push(role.title);  
          rolesIdArray.push(role.id);
        };
    });
    db.query('SELECT * FROM employees', function (err, result) {
        for (const employee of result){
            let currentEmployeeRole = undefined;
            for (i = 0; i < rolesChoicesArray.length; i++){
                if(employee.role_id === rolesIdArray[i]){
                    currentEmployeeRole = rolesChoicesArray[i];
                };
            };

            let currentEmployeeName = `${employee.first_name} ${employee.last_name}, ${currentEmployeeRole}`
            employeesChoicesArray.push(currentEmployeeName);  
            employeesIdArray.push(employee.id);
        };
    });
    console.log(rolesChoicesArray)
    inquirer
        .prompt([
            {
                type:'input',
                message:'What is the new Employees first name?',
                name:'newEmployeeFN'
            },
            {
                type:'input',
                message:'What is the new Employees last name?',
                name:'newEmployeeLN'
            },
            {
                type:'list',
                message:'What is the new Employees Role?',
                choices:rolesChoicesArray,
                name:'newEmployeeRole'
            },
            {
                type:'list',
                message:'Who is this Employees manager?',
                choices: employeesChoicesArray,
                name:'newEmployeeManager'
            }
        ])
        .then((data) =>{
            let currentRoleId = undefined;
            let currentManagerId = undefined;
            
            for(i = 0; i < rolesChoicesArray.length; i++){
                if(data.newEmployeeRole === rolesChoicesArray[i]){
                    currentRoleId = rolesIdArray[i];
                };
            };
            for(i = 0; i < employeesChoicesArray.length; i++){
                if(data.newEmployeeManager === employeesChoicesArray[i]){
                    currentManagerId = employeesIdArray[i];
                };
            };
            console.log([data.newEmployeeFN, data.newEmployeeLN, currentRoleId, currentManagerId])
            addEmployee(data.newEmployeeFN, data.newEmployeeLN, currentRoleId, currentManagerId);
        });
};

const updateRole = () =>{
    const rolesChoicesArray2 = [];
const rolesIdArray2 = [];

const employeesChoicesArray2 = [];
const employeesIdArray2 = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySqlPass777',
        database: 'company_db'
    },
);

// Define a function to fetch roles and employees data.
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // Fetch roles data.
        db.query('SELECT * FROM roles', function (err, result) {
            if (err) {
                reject(err);
            } else {
                for (const role of result) {
                    rolesChoicesArray2.push(role.title);
                    rolesIdArray2.push(role.id);
                }
                // Fetch employees data.
                db.query('SELECT * FROM employees', function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        for (const employee of result) {
                            let currentEmployeeRole = undefined;
                            for (let i = 0; i < rolesChoicesArray2.length; i++) {
                                if (employee.role_id === rolesIdArray2[i]) {
                                    currentEmployeeRole = rolesChoicesArray2[i];
                                }
                            }
                            let currentEmployeeName = `${employee.first_name} ${employee.last_name}, ${currentEmployeeRole}`;
                            employeesChoicesArray2.push(currentEmployeeName);
                            employeesIdArray2.push(employee.id);
                        }
                        resolve();
                    }
                });
            }
        });
    });
};

// Call the fetchData function to populate choices arrays, then start inquirer prompt.
fetchData()
    .then(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Which employee do you want to update?',
                    choices: employeesChoicesArray2,
                    name: 'employee'
                },
                {
                    type: 'list',
                    message: 'What should their new role be?',
                    choices: rolesChoicesArray2,
                    name: 'role'
                }
            ])
            .then((data) => {
                let currentRoleId = undefined;
                let currentEmployeeId = undefined;

                for (let i = 0; i < rolesChoicesArray2.length; i++) {
                    if (data.role === rolesChoicesArray2[i]) {
                        currentRoleId = rolesIdArray2[i];
                    }
                }
                for (let i = 0; i < employeesChoicesArray2.length; i++) {
                    if (data.employee === employeesChoicesArray2[i]) {
                        currentEmployeeId = employeesIdArray2[i];
                    }
                }
                console.log(currentRoleId)
                updateEmployee(currentRoleId, currentEmployeeId);
            });
    })
    .catch((err) => {
        console.error('Error fetching data:', err);
    });

};

// Main
inquirer
    .prompt([
        {
            type : 'list',
            message: 'How can I help you today?',
            choices:['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role' ],
            name: 'initialChoice'
        }
    ])
    .then((input) => {
        const initialChoice = input.initialChoice
        if(initialChoice === 'View all Departments'){
            viewDepartments();
        }
        else if (initialChoice === 'View all Roles'){
            viewRoles();
        }
        else if (initialChoice === 'View all Employees'){
            viewEmployees();   
        }
        else if (initialChoice === 'Add a Department'){
            newDepartment();
        }
        else if (initialChoice === 'Add a Role'){
            newRole();
        }
        else if (initialChoice === 'Add an Employee'){
            newEmployee();
        }
        else if (initialChoice === 'Update an Employee Role'){
            updateRole();
        };
    })