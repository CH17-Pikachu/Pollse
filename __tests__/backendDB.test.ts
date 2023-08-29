import * as dotenv from 'dotenv';
import pool from '../server/Models/queryModel';

dotenv.config();

describe('Database Connection Test', () => {
  it('should connect to the database', async () => {
    // Get the current time from the database, connection test
    try {
      const result = await pool.query('SELECT NOW()');
      expect(result.rows).toBeTruthy();
    } catch (error) {
      // Handle connection errors
      throw new Error(`Error connecting to the database: ${error}`);
    }
  });
});