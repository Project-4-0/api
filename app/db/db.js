const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: "postgresDemo",
    database: "VitoAPIDB",
    host: "localhost",
    port: 5432
}
)
module.exports = pool;