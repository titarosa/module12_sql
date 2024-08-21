const { Client } = require('pg');

const client = new Client({
    user: 'talitarosa',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'Clara02059.',
    port: 5432,
});

client.connect();

module.exports = client; 