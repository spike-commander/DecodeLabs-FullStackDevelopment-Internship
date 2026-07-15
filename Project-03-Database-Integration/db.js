const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT, 10) || 5432,
});

async function query(text, params) {
  try {
    console.log('Executing query:', text);
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Query error:', err.message);
    throw err;
  }
}

module.exports = { query, pool };
