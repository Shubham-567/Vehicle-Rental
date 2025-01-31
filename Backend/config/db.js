import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Allow up to 10 simultaneous connections
  queueLimit: 0, // No limit on request queue
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Failed:", err.message, err.stack);
  } else {
    console.log("Connected to MySQL Database");
    connection.release(); // Release the test connection
  }
});

export default db.promise(); // Export promise-based queries
