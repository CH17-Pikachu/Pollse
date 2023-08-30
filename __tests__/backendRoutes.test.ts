import supertest, { SuperTest, Test } from 'supertest';
import { Server } from 'http';

import app from '../server/server';
import { PollController } from '../server/Controllers/PollController';

jest.mock('../server/Controllers/PollController.ts', () => ({
  createPoll: jest.fn((req, res, next) => next()),
  populateQuestions: jest.fn((req, res, next) => next()),
  setLifetime: jest.fn((req, res, next) => next()),
  startPoll: jest.fn((req, res, next) => next()),
  stopPoll: jest.fn((req, res, next) => next()),
  checkOpen: jest.fn((req, res, next) => next()),
  recordResponses: jest.fn((req, res, next) => next()),
  getQuestionsInPoll: jest.fn((req, res, next) => next()),
}));
const PostController: PollController =
  require('../server/Controllers/PollController.ts') as PollController;

/**
 * Tests
 */

describe('Check poll routes', () => {
  describe('createPoll endpoint', () => {
    it('should execute createPoll middleware', async () => {});
  });
});
