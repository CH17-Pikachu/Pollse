/**
 * For test endpoints
 */
import express from 'express';
import { createError } from '../utils';

const testError = (method: string, type: string, err: unknown) =>
  createError('TestRoute', method, type, err);

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json('World changed');
});

/**
 * Test route for getting poll answer data before websockets implemented
 */
router.get('/pollAnswerData', (req, res) => {
  res.send(200);
});

export default router;
