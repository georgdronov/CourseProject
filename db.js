import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const query = (text, params) => {
  return pool.query(text, params);
};

export default {
  query,
  pool,
};
