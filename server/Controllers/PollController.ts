/**
 * Handles interactions with poll data
 */
import { createError } from '../utils';
import { PollController, Question, QuestionType } from '../../types/types';
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
      INSERT INTO "Polls" (presenter_id)
      VALUES (${presenter_id})
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
    const { roomCode: roomString } = req.params;
    const roomCode = parseInt(roomString, 10);
    if (!roomCode)
      return next(
        pollError(
          'populateQuestions',
          'invalid room code',
          'couldnt parse room code to integer',
        ),
      );
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
    const questionQueryText = `
      INSERT INTO "Questions" (poll_id, question_text, question_type)
      VALUES ($1, $2, $3)
      RETURNING question_id;`;
    const questionVals = [roomCode, question.text, question.type];
    pool
      .query<{ question_id: number }, string | QuestionType>(
        questionQueryText,
        questionVals,
      )
      .then(result => {
        const qIds = result.rows;
        if (qIds.length === 0) throw Error('couldnt insert question');
        // TODO support for multiple questions
        // assume only one question; populate its question_id
        question.id = qIds[0].question_id;
        // we have our question in the db, and we have its id, so lets do answers
        if (question.responseOptions) {
          // build query
          let responseOptionsQueryText = ``;
          const vars: string[] = [];
          // iterate through each responseOption
          // i is 1-indexed bc sql is dumb
          for (let i = 1; i <= question.responseOptions.length; i += 1) {
            const response = question.responseOptions[i - 1];
            responseOptionsQueryText += `
              INSERT INTO "Responses" (question_id, response_text)
              VALUES (${question.id}, $${i});`;
            vars.push(typeof response === 'string' ? response : response.text);
          }
          pool
            .query(responseOptionsQueryText, vars)
            .then(() => next())
            .catch(err =>
              next(
                pollError(
                  'populateQuestions',
                  'db communication adding response',
                  err,
                ),
              ),
            );
        } else return next();
      })
      .catch(err =>
        next(
          pollError(
            'populateQuestions',
            'db communication adding question',
            err,
          ),
        ),
      );

    return next();
  },

  // Stretch
  setLifetime: (req, res, next) => next(),

  startPoll: (req, res, next) => {
    // flip the boolean in the poll at the roomcode
    const { roomCode: roomString } = req.params;
    const roomCode = parseInt(roomString, 10);
    if (!roomCode)
      return next(
        pollError(
          'startPoll',
          'invalid room code',
          'couldnt parse room code to integer',
        ),
      );
    // query db to flip poll isOpen boolean
    const queryText = `
    `;
  },

  stopPoll: (req, res, next) => next(),

  getQuestionsInPoll: (req, res, next) => next(),

  // stretch
  checkOpen: (req, res, next) => next(),

  recordResponses: (req, res, next) => {
    const { roomCode } = req.params;
    const { response } = req.body as { response: Response };
    // write response to db

    // emit response on websocket room with roomId in route params
    // io.to(roomCode).emit(responseDetails);

    return next();
  },
};

export default pollController;
