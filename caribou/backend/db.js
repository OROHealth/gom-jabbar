const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "db",
    port: 5432,
    databse: "caribDB"
});

module.exports = pool;
