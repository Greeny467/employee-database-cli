const mysql = require('mysql2');


const viewDepartments = () =>{
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });
};

const viewRoles = () => {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
    });
};


const viewEmployees = () => {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
    });
};

const addDepartment = (name) => {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    db.query('SELECT * FROM departments;', function (err, results) {
        console.log(results);
    });

};


const addRole = (name, salary, department) => {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [name, salary, department]);
    db.query('SELECT * FROM roles;', function (err, results) {
        console.log(results);
    });
}

const addEmployee = (fn, ln, role, manager) =>{
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [fn,ln, role, manager]);
    db.query('SELECT * FROM employees;', function (err, results) {
        console.log(results);
    });
}

const updateEmployee = (newRoleId, id) =>{
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'MySqlPass777',
            database: 'company_db'
        },
        console.log('Connection created to database')
    )

    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, id]);
    db.query('SELECT * FROM employees;', function (err, results) {
        console.log(results);
    });
}

module.exports ={viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee};