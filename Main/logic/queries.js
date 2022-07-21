let port = 3001;
const questions = require('./logic/inquirer.js')

async function viewEmployees(url=`localhost:${port}/api/employees`) {
    const response = await fetch(url, {
        method: 'GET',
    })
    
}
async function addEmployee(url) {

}
async function updateEmployee(url) {

}
async function viewRoles(url) {

}
async function addRole(url) {

}
async function viewDepartments(url) {

}
async function addDepartment(url) {

}

module.exports.viewEmployees = viewEmployees
module.exports.addEmployee = addEmployee
module.exports.updateEmployee = updateEmployee
module.exports.viewRoles = viewRoles
module.exports.addRole = addRole
module.exports.viewDepartments = viewDepartments
module.exports.addDepartment = addDepartment