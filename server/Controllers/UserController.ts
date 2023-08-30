import { RequestHandler } from 'express';
import { createError } from '../utils';
import pool from '../Models/queryModel';

const userError = (method: string, type: string, err: unknown) =>
  createError('UserController', method, type, err);

interface UserController {
  createPresenter: RequestHandler;
}

const userController: UserController = {
  createPresenter: (req, res, next) => {
    // query db to add new presenter
    const presenterQuery = {
      text: `
      INSERT INTO "Presenters" DEFAULT VALUES
      RETURNING presenter_id;`,
    };
    // pass presenter_id into res.locals
    pool
      .query<{ presenter_id: number }>(presenterQuery)
      .then(queryResponse => {
        if (queryResponse.rows.length === 0)
          throw Error('did not receive id back from create presenter');
        res.locals.presenter_id = queryResponse.rows[0].presenter_id;
        return next();
      })
      .catch(err =>
        next(userError('createPresenter', 'db communication', err)),
      );
  },
};

export default userController;
