import pg from 'pg';

const { Pool } = pg;

const poolConfig = {
  user: process.env.dbuser,
  host: process.env.dbhost,
  database: process.env.dbname,
  password: process.env.dbpassword,
  port: parseInt(process.env.dbport),
};

const pool = new Pool(poolConfig);

export { pool };
