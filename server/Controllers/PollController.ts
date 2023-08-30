/**
 * Handles interactions with poll data
 */
import { createError } from '../utils';
import {
  PollController,
  Question,
  QuestionType,
  Response,
} from '../../types/types';
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
      VALUES ($1)
      RETURNING poll_id;
      `,
    };

    const pollVal = [presenter_id];

    pool
      .query<{ poll_id: number }, string | QuestionType>(pollQuery, pollVal)
      .then(queryResponse => {
        if (queryResponse.rows.length === 0)
          throw Error('did not receive id back from createPoll');
        // add Poll ID (room code) to res.locals
        res.locals.poll_id = queryResponse.rows[0].poll_id;
        return next();
      })
      .catch(err => next(pollError('createPoll', 'db communication', err)));
  },

  verifyRoomCode: (req, res, next) => {
    const { roomCode: roomString } = req.params;
    const roomCode = parseInt(roomString, 10);
    if (!roomCode) {
      return next(
        pollError(
          'verifyRoomCode',
          'invalid room code',
          'couldnt parse room code to integer',
        ),
      );
    }
    res.locals.roomCode = roomCode;
    return next();
  },

  populateQuestions: (req, res, next) => {
    const { roomCode } = res.locals as { roomCode: number };
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
          let responseOptionsQueryText = `INSERT INTO "Responses" (question_id, response_text)
          VALUES`;
          const vars: string[] = [];
          // iterate through each responseOption
          // i is 1-indexed bc sql is dumb
          for (let i = 1; i <= question.responseOptions.length; i += 1) {
            const response = question.responseOptions[i - 1];
            responseOptionsQueryText += `
               (${question.id}, $${i}),`;
            vars.push(typeof response === 'string' ? response : response.text);
          }
          responseOptionsQueryText = responseOptionsQueryText.slice(0, -1);
          responseOptionsQueryText += ';';
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
  },

  // Stretch
  setLifetime: (req, res, next) => next(),

  startPoll: (req, res, next) => {
    // flip the boolean in the poll at the roomcode
    const { roomCode } = res.locals;
    // query db to flip poll isOpen boolean
    const queryText = `
    UPDATE "Polls" SET is_open = true WHERE poll_id = $1;`;
    const vals = [roomCode];
    pool
      .query(queryText, vals)
      .then(() => next())
      .catch(err =>
        next(pollError('startPoll', 'db comm error when starting poll', err)),
      );
  },

  stopPoll: (req, res, next) => {
    // flip the boolean in the poll at the roomcode
    const { roomCode } = res.locals;
    // query db to flip poll isOpen boolean
    const queryText = `
        UPDATE "Polls" SET is_open = false WHERE poll_id = $1;`;
    const vals = [roomCode];
    pool
      .query(queryText, vals)
      .then(() => next())
      .catch(err =>
        next(pollError('stopPoll', 'db comm error when stopping poll', err)),
      );
  },

  getQuestionsInPoll: (req, res, next) => {
    const { roomCode } = res.locals;
    const queryText = `
      SELECT q.question_id, q.question_text, q.question_type, 
        JSON_AGG (ROW_TO_JSON( (r.response_text, r.count, r.response_id))) responses
      FROM "Questions" AS "q" 
        INNER JOIN "Responses" as "r" USING (question_id)
      WHERE q.poll_id = ${roomCode}
      GROUP BY q.question_id;`;

    pool
      .query<{
        question_id: number;
        question_text: string;
        question_type: QuestionType;
        responses: { f1: string; f2: number; f3: number }[];
      }>(queryText)
      .then(result => {
        const questions = result.rows;
        if (questions.length === 0) throw Error('couldnt find any questions');
        // TODO support multiple questions in poll
        const question = questions[0];
        const responses: Response[] = [];
        for (let i = 0; i < question.responses.length; i += 1) {
          responses.push({
            responseId: question.responses[i].f3,
            count: question.responses[i].f2,
            text: question.responses[i].f1,
          });
        }
        const resQuestions: Question[] = [
          {
            id: question.question_id,
            text: question.question_text,
            type: question.question_type,
            responseOptions: responses,
          },
        ];
        res.locals.questions = resQuestions;
        return next();
      })
      .catch(err =>
        next(
          pollError(
            'getQuestionsInPoll',
            'db comm getting qs and rs from roomcode',
            err,
          ),
        ),
      );
  },

  // stretch
  checkOpen: (req, res, next) => next(),

  recordResponses: (req, res, next) => {
    const { roomCode } = res.locals;
    const { response } = req.body as { response: Response };
    if (!response.questionId)
      return next(
        pollError(
          'recordResponses',
          'user input error',
          'response missing qid',
        ),
      );
    // write response to db
    if (response.responseId) {
      // if frontend knows about the id, then this is a mc response. increment count
      const mcResponseQuery = `
        UPDATE "Responses"
        SET count = count + 1
        WHERE response_id = $1;
      `;
      const queryResId = [response.responseId];
      pool
        .query(mcResponseQuery, queryResId)
        .then(() => next()) // this is where we put our websocket event
        .catch(err =>
          next(pollError('recordResponse', 'couldnt update mcresponse', err)),
        );
    } else {
      // frontend doesn't know about the id, this is a sr, insert new record
      // TODO short response path is not mvp
      // const srResponseQuery = ``;
      return next(
        pollError(
          'recordResponses',
          'unsupported feature',
          'please include responseId',
        ),
      );
    }

    // emit response on websocket room with roomId in route params
    // io.to(roomCode).emit(responseDetails);
  },
};

export default pollController;
