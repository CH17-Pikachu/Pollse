// import request from 'supertest';

// // Make sure you are running the server
// const server = 'http://localhost:3000'

// describe('Check test route', () => {
//   it('Responds with "World changed"', async () => {
//     // Send the request and store the response
//     const response = await request(server)
//       .get('/test');

//     // Make sure headers match the response's. They are case sensitive
//     expect(response.headers['content-type']).toMatch(/application\/json/);
//     expect(response.body).toEqual('World changed');
//     expect(response.status).toEqual(200);
//   });
// });