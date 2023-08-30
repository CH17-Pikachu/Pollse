/**
 * File handles responding to requests levied at the /poll/* endpoints
 */
import express from 'express';
import PollController from '../Controllers/PollController';
import UserController from '../Controllers/UserController';

const router = express.Router();

/**
 * Endpoint for creating empty poll; expect another request from frontend
 * with questions and other details before starting poll
 * Responds with new room code
 */
router.get(
  '/createPoll',
  UserController.createPresenter,
  PollController.createPoll,
  (req, res) => {
    const { poll_id } = res.locals as { poll_id: number };
    res.status(200).json({ roomCode: poll_id });
  },
);

/**
 * Endpoint for populating poll with questions and starting lifetime countdown
 * on poll
 * Request body must contain information about questions and may contain a duration
 *
 * May also need to start websocket connection here?
 */
router.patch(
  '/startPoll/:roomCode',
  PollController.populateQuestions,
  PollController.setLifetime,
  PollController.startPoll,
  (req, res) => {
    res.sendStatus(200);
  },
);

/**
 * Endpoint for stopping poll
 * This will be where we add functionality to save poll results to a presenter
 */
router.patch('/endPoll/:roomCode', PollController.stopPoll, (req, res) => {
  res.sendStatus(200);
});

/**
 * Audience member pulling questions for them to answer after reaching endpoint at
 * a particular roomcode
 */
router.get(
  '/questionsInPoll/:roomCode',
  PollController.getQuestionsInPoll,
  (req, res) => {
    res.sendStatus(200);
  },
);

/**
 * Audience member submitting all responses to poll questions
 * Request body needs to contain question:answer pairs
 */
router.post(
  '/newAnswers/:roomCode',
  PollController.checkOpen,
  PollController.recordResponses,
  (req, res) => {
    res.sendStatus(200);
  },
);

// See /test routes for placeholder getPollAnswerData before websocket implementation

export default router;
