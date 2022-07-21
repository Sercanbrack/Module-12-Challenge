const inquirer = require('inquirer')
const inquirer = require('inquirer')
const queries = require('./queries.js')

async function homePage() {
    const inquirer = await inquirer.prompt([
        {
            name: 'home',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add a new employee',
                'Update employee role',
                'View all roles',
                'Add a new role',
                'View all departments',
                'Add a new department',
            ],
        },
    ])
    .then((answer) => {
        let firstChoice = JSON.stringify(answer, null, '')
        switch(firstChoice) {
            case 'View all employees':
                queries.viewEmployees(url);
                break;
            case 'Add a new employee':
                queries.addEmployee(url);
                break;
            case 'Update employee role':
                queries.updateEmployee(url);
                break;
            case 'View all roles':
                queries.viewRoles(url);
                break;
            case 'Add a new role':
                queries.addRole(url);
                break;
            case 'View all departments':
                queries.viewDepartments(url);
                break;
            case 'Add a new department':
                queries.addDepartment(url);
                break;
            default: console.error('Error getting next question');
        }
    })
}


module.exports.homePage = homePage