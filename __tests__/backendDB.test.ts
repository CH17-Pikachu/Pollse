// import * as dotenv from 'dotenv';
// import { Pool, QueryResult } from 'pg';

// dotenv.config();

// const DB_PORT = parseInt(process.env.SUPABASE_PORT, 10)

// const poolConfig = {
//   connectionString: process.env.SUPABASE_CONNECTION_STRING,
//   user: process.env.SUPABASE_USER,
//   database: process.env.SUPABASE_DB_NAME,
//   password: process.env.SUPABASE_PASSWORD,
//   port: DB_PORT,
//   host: process.env.SUPABASE_HOST
// }

// // console.log(poolConfig);

// const pool = new Pool(poolConfig);

// describe('Database Connection Test', () => {
//   it('should connect to the database', async () => {
//     // Get the current time from the database, connection test
//     const query = 'SELECT NOW()';
//     let result: QueryResult;

//     try {
//       result = await pool.query(query);
//     } catch (error) {
//       // Handle connection errors
//       throw new Error(`Error connecting to the database: ${error}`);
//     }

//     expect(result.rows.length).toBeGreaterThan(0);
//   });
// });