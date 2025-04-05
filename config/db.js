import pkg from "pg"
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pkg;


// const  pool = new Pool(
//     {
     
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASS,
//         port: process.env.DB_PORT,
      
      
//     }
// )


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
  });
  
  pool.query(` id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  roll TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL`);



export default pool;

