/**
 * Contains types used frequently across codebase
 */

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
export interface StartPollRequestBody {
  question: string;
  timer: number;
  answers: string[];
}

export interface CreatePollId {
  pollId: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE,
  SHORT_RESPONSE,
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  answers?: [Answer];
}

type Answer = string;

export default {};

// create poll page
// Presenter has options to add a question, or add an answer to question
// Each question has a dropdown for selecting the answser type for it
// Presenter hits start poll, it patches these question details to the backend

// 'submit response' page : pollse.com/sdkldfgpofbonsejn
// Ask backend for list of questions (and any multiple choices that come with them)
// Display those questions, with inputs for the user (radio button for mc, input box for sr, etc)
// After user fills that out, post those response details to the backend
