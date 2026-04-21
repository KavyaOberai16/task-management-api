const { Pool } = require('pg');

//PostgreSQL connected
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskapp',
  password: '1234',
  port: 5432,
});

module.exports = pool;