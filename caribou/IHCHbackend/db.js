const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "example",
    host: "localhost",
    port: 5432,
    databse: "caribou"
});

module.exports = pool;
