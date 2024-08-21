const client = require('./connection');

// Function to get all departments
const getDepartments = async () => {
    try {
        const result = await client.query('SELECT * FROM department');
        return result.rows;
    } catch (err) {
        console.error('Error fetching departments:', err);
        throw err; // Rethrow error after logging
    }
};

// Function to get all roles
const getRoles = async () => {
    try {
        const result = await client.query('SELECT * FROM role');
        return result.rows;
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw err;
    }
};

// Function to get all employees
const getEmployees = async () => {
    try {
        const result = await client.query(`
            SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, m.first_name AS manager
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
        `);
        return result.rows;
    } catch (err) {
        console.error('Error fetching employees:', err);
        throw err;
    }
};

// Function to add a department
const addDepartment = async (name) => {
    try {
        await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log('Department added successfully!');
    } catch (err) {
        console.error('Error adding department:', err);
        throw err;
    }
};

// Function to add a role
const addRole = async (title, salary, departmentId) => {
    try {
        await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        console.log('Role added successfully!');
    } catch (err) {
        console.error('Error adding role:', err);
        throw err;
    }
};

// Function to add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
        console.log('Employee added successfully!');
    } catch (err) {
        console.error('Error adding employee:', err);
        throw err;
    }
};

// Function to update employee role
const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
        console.log('Employee role updated successfully!');
    } catch (err) {
        console.error('Error updating employee role:', err);
        throw err;
    }
};

module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };

