// needed QueryConfig type to satisfy TypeScript
// https://node-postgres.com/apis/client#queryconfig
import { Pool, QueryConfig, PoolConfig } from 'pg';
import logger from '../logger';

// PoolConfig calls for a number 'port', SUPABASE_PORT is a string env
const DB_PORT = parseInt(process.env.SUPABASE_PORT, 10);

const poolObject: PoolConfig = {
  user: process.env.SUPABASE_USER,
  database: process.env.SUPABASE_DB_NAME,
  password: process.env.SUPABASE_PASSWORD,
  port: DB_PORT,
  host: process.env.SUPABASE_HOST,
};

const pool = new Pool(poolObject);

export default {
  query: <K, T = never>(queryConfig: string | QueryConfig, values?: T[]) => {
    logger(
      `Executed query: ${
        typeof queryConfig === 'string' ? queryConfig : queryConfig.text
      }`,
    );
    return pool.query<K>(queryConfig, values);
  },
};
