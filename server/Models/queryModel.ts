// needed QueryConfig type to satisfy TypeScript
// https://node-postgres.com/apis/client#queryconfig
import dotenv from 'dotenv'
import { Pool, QueryConfig, PoolConfig } from 'pg';
import logger from '../logger';

dotenv.config();

// PoolConfig calls for a number 'port', SUPABASE_PORT is a string env 
const DB_PORT = parseInt(process.env.SUPABASE_PORT, 10);

// console.log(process.env)
const poolObject: PoolConfig = {
  user: process.env.SUPABASE_USER,
  database: process.env.SUPABASE_DB_NAME,
  password: process.env.SUPABASE_PASSWORD,
  port: DB_PORT,
  host: process.env.SUPABASE_HOST
}

const pool = new Pool(poolObject);

export default {
  query: <T>(queryConfig: string | QueryConfig, values?: T[]) => {
    logger(`Executed query: ${typeof queryConfig === 'string' ? queryConfig : queryConfig.text}`);
    return pool.query(queryConfig, values);
  },
}

