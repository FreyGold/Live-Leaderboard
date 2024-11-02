import pg from 'pg';

const { Pool } = pg;

const poolConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'Instagram', // Replace with your actual database name
  password: '123',
  port: 5432,
};

const pool = new Pool(poolConfig);

export { pool };
