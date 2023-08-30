import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
// import routes
import pollRouteFactory from './Routes/pollRoute';
import testRoute from './Routes/testRoute';
import logger from './logger';
import { LogType } from '../types/types';

// Initialize environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const PORT = 3000;

const io = new Server(server);
const pollRoute = pollRouteFactory(io);

io.on('connection', socket => {
  logger('someone is here...', LogType.WARNING);
});

app.use(express.json());
app.use(express.urlencoded());

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * Setting up routes
 */
app.use('/api/poll', pollRoute);
app.use('/api/test', testRoute);

// Serving the page
app.get('/*', (_req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve(__dirname, './client/index.html'));
});

// Route not handled
app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('Nothings exists here :O');
});

type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};
// Error handler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = { ...defaultErr, ...err };
    logger(errorObj.log, LogType.ERROR);
    return res.status(errorObj.status).json(errorObj.message);
  },
);

// Begins listening to port 3000
server.listen(PORT, () => {
  logger(`Server listening on port: ${PORT}...`, LogType.SUCCESS);
});

export default app;
