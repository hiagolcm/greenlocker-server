import { Router } from 'express';
import userRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
