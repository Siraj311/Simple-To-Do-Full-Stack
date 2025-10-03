const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to test the connection
async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Error connecting to PostgreSQL:", err.message);
  }
}

// Run the check on startup
checkConnection();

module.exports = pool;