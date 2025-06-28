import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // load environment config

// create connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;