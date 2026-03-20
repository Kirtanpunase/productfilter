const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "productdb",
  password: "kirtan727",
  port: 5432,
});

module.exports = pool;