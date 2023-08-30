import * as dotenv from 'dotenv';
import pool from '../server/Models/queryModel';

dotenv.config();

// console.log('supabase db name hopefully: ', process.env.SUPABASE_DB_NAME)

describe('Database Connection Test', () => {
  it('should connect to the database', async () => {
    // Get the current time from the database, connection test
    // console.log(process.env)
    try {
      const result = await pool.query('SELECT NOW()');
      // console.log(result);
      expect(result.rows).toBeTruthy();
    } catch (error) {
      // Handle connection errors
      throw new Error(`Error connecting to the database: ${error}`);
    }
  });
});