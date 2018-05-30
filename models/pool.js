import pg from 'pg';

const pool = new pg.Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 5432,
});
export default pool;
