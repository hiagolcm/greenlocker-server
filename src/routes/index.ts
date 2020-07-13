import { Router } from 'express';
import userRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';
import secretsRouter from './secrets.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/secrets', secretsRouter);

export default routes;
