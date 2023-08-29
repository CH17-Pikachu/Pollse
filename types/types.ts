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

export default {};
