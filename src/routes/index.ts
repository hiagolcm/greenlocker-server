import { Router } from 'express';
import userRouters from './users.routes';

const routes = Router();

routes.use('/users', userRouters);

export default routes;
