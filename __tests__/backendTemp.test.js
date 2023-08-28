import request from 'supertest';

// Make sure you are running the server
const server = 'http://localhost:3000'

describe('Check test route', () => {
  it('Responds with "World changed"', () => {
    return request(server)
      .get('/test')
      .expect('Content-Type', /application\/json/)
      .expect(200);
  });
});