const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to DB');
      connected = true;
    } catch (err) {
      console.error(err);
      console.log('DB not ready yet, retrying in 2s...');
      await new Promise(res => setTimeout(res, 2000));
    }
  }
};

connectWithRetry();

module.exports = pool;