const express = require('express')
const mysql = require('mysql2')

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
app.get()
//POST route to add a new employee
app.post()
//PUT route to update an employee role
app.put()
//GET route to view all roles
app.get()
//POST route to add a new role
app.post()
//GET route to view all departments
app.get()
//POST route to add a new department
app.post()