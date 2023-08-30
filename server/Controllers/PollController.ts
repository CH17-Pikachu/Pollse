/**
 * Handles interactions with poll data
 */
import { createError } from '../utils';
import { PollController, Question } from '../../types/types';
import pool from '../Models/queryModel';

const pollError = (method: string, type: string, err: unknown) =>
  createError('PollController', method, type, err);

const pollController: PollController = {
  createPoll: (req, res, next) => {
    const { presenter_id } = res.locals as { presenter_id: number };
    if (!presenter_id)
      return next(
        pollError(
          'createPoll',
          'missing data',
          'No presenter id in res.locals',
        ),
      );
    // query database to create new Poll
    // pass in the presenter's id, obtained from userController
    const pollQuery = {
      text: `
      INSERT INTO Polls (presenter_id)
      RETURNING poll_id;
      `,
    };

    pool
      .query<{ poll_id: number }>(pollQuery)
      .then(queryResponse => {
        if (queryResponse.rows.length === 0)
          throw Error('did not receive id back from createPoll');
        // add Poll ID (room code) to res.locals
        res.locals.poll_id = queryResponse.rows[0].poll_id;
        return next();
      })
      .catch(err => next(pollError('createPoll', 'db communication', err)));
  },

  populateQuestions: (req, res, next) => {
    const { roomCode } = req.params;
    const { question } = req.body as { question: Question };
    if (!question)
      return next(
        pollError(
          'populateQuestions',
          'bad req body',
          'question property empty',
        ),
      );
    // query database to create new questions tied to room
    // TODO start here
    // const questionQueryText = `INSERT INTO Questions `;
    // if (question.responseOptions) {
    //   let responseOptionsQueryText = ``;
    //   for (let i = 1; i <= question.responseOptions.length; i++) {
    //     responseOptionsQueryText+=`INSERT INTO Answers `
    //   }
    // }
    // pool.query(queryText);
    // if a question has an answers array, query to create answers
    return next();
  },

  // Stretch
  setLifetime: (req, res, next) => next(),

  startPoll: (req, res, next) => next(),

  stopPoll: (req, res, next) => next(),

  getQuestionsInPoll: (req, res, next) => next(),

  // stretch
  checkOpen: (req, res, next) => next(),

  recordResponses: (req, res, next) => {
    const { roomCode } = req.params;
    const { response }: { response: Response } = req.body;
    // write response to db

    // emit response on websocket room with roomId in route params
    // io.to(roomCode).emit(responseDetails);

    return next();
  },
};

export default pollController;
