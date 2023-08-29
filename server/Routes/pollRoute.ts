/**
 * File handles responding to requests levied at the /poll/* endpoints
 */
import express from 'express';

const router = express.Router();

/**
 * Endpoint for creating empty poll; expect another request from frontend
 * with questions and other details before starting poll
 */
router.get('/createPoll', (req, res) => {
  res.send(200);
});

/**
 * Endpoint for populating poll with questions and starting lifetime countdown
 * on poll
 *
 * May also need to start websocket connection here?
 */
router.patch('/startPoll/:roomCode', (req, res) => {
  res.send(200);
});

/**
 * Endpoint for stopping poll
 */
router.get('/endPoll/:roomCode', (req, res) => {
  res.send(200);
});

export default router;
