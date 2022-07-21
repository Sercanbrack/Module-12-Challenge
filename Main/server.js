const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')
const questions = require('./logic/inquirer.js')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({extended: false }))
app.use(express.json())

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connection to employee database successful!')
);

//GET route to view all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.salary AS employees FROM role INNER JOIN employee ON role.role_id = employee.role_id ORDER BY employee_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        }
        res.json({
            message: 'Success! Showing all current employees.',
            data: rows
        })
    })
})
//POST route to add a new employee
app.post('/api/add-employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id]

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: 'Success! Employee added to database.',
            data: body
        })
    })
    
})
//PUT route to update an employee role
app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [req.params.id, req.body.role_id]

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message})
        } else if (!result.affectedRows) {
            res.json({
                message: "ERROR: Employee not found, double check employee ID."
            })
        } else {
            res.json({
                message: 'Success! Employee role updated.', 
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})
//GET route to view all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT id, title, department_id, salary AS roles FROM role`

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        }
        res.json({
            message: "Success! Showing all current roles.",
            data: rows
        })
    })
})
//POST route to add a new role
app.post('/api/add-role', ({ body }, res) => {
    const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id]

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: 'Success! Role added to database.',
            data: body
        })
    })
})
//GET route to view all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, name AS departments FROM department`

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        }
        res.json({
            message: "Success! Showing all current departments.",
            data: rows
        })
    })
})
//POST route to add a new department
app.post('/api/add-department', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
        VALUES (?)`
    const params = [body.name]

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: 'Success! Department added to database.',
            data: body
        })
    })
})

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

questions.homePage()