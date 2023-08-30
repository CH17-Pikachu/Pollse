/**
 * Handles interactions with poll data
 */
import { RequestHandler } from 'express';
import { createError } from '../utils';
import { Question } from '../../types/types';

const pollError = (method: string, type: string, err: unknown) =>
  createError('PollController', method, type, err);

export interface PollController {
  /**
   * Creates an empty poll with no questions and default lifetime
   * Adds new room code to res.locals
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  createPoll: RequestHandler;

  /**
   * Adds questions to questions table with given pollId provided in route params
   * If question is multiple choice, also initializes answers in answers table
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  populateQuestions: RequestHandler;

  /**
   * Edits poll duration if data provided in req body
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  setLifetime: RequestHandler;

  /**
   * Sets poll to open, starts timer from lifetime
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  startPoll: RequestHandler;

  /**
   * Sets poll to closed
   * Ends websocket room?
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  stopPoll: RequestHandler;

  /**
   * Poll ID in route params
   * Populate questions (and relevant choices if MC) into res.locals
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  getQuestionsInPoll: RequestHandler;

  /**
   * Sets res.locals.open to true or false depending on state of poll with ID in route params
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  checkOpen: RequestHandler;

  /**
   * req.body must have question:answer pairs
   * Create answers in answer table (or update count if mc answers already exist)
   *
   * @param req express request object
   * @param res express response object
   * @param next express next function
   * @returns invocation of next
   */
  recordResponses: RequestHandler;
}

const pollController: PollController = {
  createPoll: (req, res, next) => {
    // query database to create new Poll
    // add Poll ID (room code) to res.locals
    res.locals.pollId = null;
    return next();
  },

  populateQuestions: (req, res, next) => {
    const { roomCode } = req.params;
    const { question }: { question: Question } = req.body;
    // query database to create new questions tied to room
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
    // write response to db
    // emit response on websocket room with roomId in route params
    // io.to(roomCode).emit(responseDetails);
    // client side: io.on('connection', (socket)=> {socket.join(roomCode)})
  },
};

export default pollController;
