import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Run only once — creates table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS main_table (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    roll TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).then(() => {
  console.log("✅ main_table ensured");
}).catch((err) => {
  console.error("❌ Error creating table:", err);
});

export default pool;
