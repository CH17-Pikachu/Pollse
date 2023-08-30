/**
 * Contains types used frequently across codebase
 */

import { RequestHandler } from 'express';

/**
 * Logger types (success is green, error is red, warning is yellow)
 */
export enum LogType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  NORMAL = 'NORMAL',
}

/**
 * Presenter types
 */

export enum QuestionType {
  MULTIPLE_CHOICE,
  SHORT_RESPONSE,
}
/**
 * This question interface describes front-end and backend communication
 * Frontend sends Questions when starting poll (presenter view)
 * - Text and type are necessary, responseOptions are necessary if mult. choice
 * - ResponseOptions can be an array of strings from the front-end (that's fine)
 *
 * Backend sends Question objects back from the GET questionsInPoll/roomCode endpoint
 * (This is the audience response submit page)
 * - In this case, the id field will be populated, and the responseOptions will
 *   be an array of Response objects, with the qIds and counts
 */
export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  responseOptions?: Response[] | string[];
}

export interface Response {
  questionId: number;
  text: string;
  count: number;
}

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

export default {};

// create poll page
// Presenter has options to add a question, or add an answer to question
// Each question has a dropdown for selecting the answser type for it
// Presenter hits start poll, it patches these question details to the backend

// 'submit response' page : pollse.com/sdkldfgpofbonsejn
// Ask backend for list of questions (and any multiple choices that come with them)
// Display those questions, with inputs for the user (radio button for mc, input box for sr, etc)
// After user fills that out, post those response details to the backend
