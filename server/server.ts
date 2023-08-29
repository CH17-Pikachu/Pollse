import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
// import routes
import pollRoute from './Routes/pollRoute';
import testRoute from './Routes/testRoute';
import logger from './logger';
import { LogType } from '../types/types';

const app = express();
const PORT = 3000;

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
app.get('/', (_req: Request, res: Response) => {
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
    logger(LogType.ERROR, errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  },
);

// Begins listening to port 3000
app.listen(PORT, () => {
  logger(LogType.SUCCESS, `Server listening on port: ${PORT}...`);
});

export default app;
