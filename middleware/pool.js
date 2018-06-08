import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'test') {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_TEST_URL,
  });
} else {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
export default pool;

