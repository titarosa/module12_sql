const inquirer = require('inquirer');
const {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./db/queryFunction');

const mainMenu = async () => {
    try {
        const answers = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        });

        switch (answers.action) {
            case 'View All Departments':
                const departments = await getDepartments();
                console.table(departments);
                break;

            case 'View All Roles':
                const roles = await getRoles();
                console.table(roles);
                break;

            case 'View All Employees':
                const employees = await getEmployees();
                console.table(employees);
                break;

            case 'Add Department':
                const { departmentName } = await inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department:'
                });
                await addDepartment(departmentName);
                break;

            case 'Add Role':
                const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: 'Enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'Enter the salary for the role:'
                    },
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the department ID:'
                    }
                ]);
                await addRole(roleTitle, roleSalary, departmentId);
                break;

            case 'Add Employee':
                const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the first name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the last name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: 'Enter the role ID:'
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the manager ID (or leave blank if none):',
                        default: null
                    }
                ]);
                await addEmployee(firstName, lastName, roleId, managerId);
                break;

            case 'Update Employee Role':
                const employeesForUpdate = await getEmployees();
                const { employeeId } = await inquirer.prompt({
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select an employee to update their role:',
                    choices: employeesForUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
                });

                const rolesForUpdate = await getRoles();
                const { newRoleId } = await inquirer.prompt({
                    type: 'list',
                    name: 'newRoleId',
                    message: 'Select the new role for the employee:',
                    choices: rolesForUpdate.map(role => ({ name: role.title, value: role.id }))
                });

                await updateEmployeeRole(employeeId, newRoleId);
                break;

            case 'Exit':
                console.log('Goodbye!');
                process.exit();

            default:
                console.log('Invalid option');
        }

        // Call the mainMenu function again to display the menu
        mainMenu();
    } catch (err) {
        console.error('Error:', err);
    }
};

// Start the menu
mainMenu();

