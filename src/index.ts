import express from 'express';
import { createConnection } from 'typeorm';

import 'reflect-metadata';
import 'express-async-errors';

import routes from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);

app.listen('3333', () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Running on port 3333');
});
