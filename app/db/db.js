const dbConfig = require("../config/db.config.js");

//client connection
const { Client } = require("pg");

const client = new Client({
  connectionString: dbConfig.url,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = client;
