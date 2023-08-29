/**
 * For test endpoints
 */
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json('World changed');
});

export default router;
