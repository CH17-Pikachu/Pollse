// needed QueryConfig type to satisfy TypeScript
// https://node-postgres.com/apis/client#queryconfig
import { Pool, QueryConfig, PoolConfig } from 'pg';
import logger from '../logger';

// interface DatabasePoolObject {
//   connectionString: string;
//   headers: {
//     apiKey: string;
//   };
// }

// host: db.kuvvxtevksxaomqbwycd.supabase.co
// db name: postgres
// port: 5432
// user: postgres
// password: !Pikachu-ctri17

const poolObject: PoolConfig = {
  connectionString: 'postgresql://postgres:[!Pikachu-ctri17]@db.kuvvxtevksxaomqbwycd.supabase.co:5432/postgres',
  user: 'postgres',
  database: 'postgres',
  password: '!Pikachu-ctri17',
  port: 5432,
  host: 'db.kuvvxtevksxaomqbwycd.supabase.co'
}

const pool = new Pool(poolObject);

export default {
  query: <T>(queryConfig: string | QueryConfig, values?: T[]) => {
    logger(`Executed query: ${typeof queryConfig === 'string' ? queryConfig : queryConfig.text}`);
    return pool.query(queryConfig, values);
  },
}

