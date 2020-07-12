import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';

import 'reflect-metadata';
import 'express-async-errors';

import routes from './routes';
import AppError from './models/AppError';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
  }
});

app.listen('3333', () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Running on port 3333');
});
