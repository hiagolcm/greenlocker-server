import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new CreateSessionService();

  const { user, token } = await authenticateUserService.exec({
    email,
    password,
  });

  res.json({ user, token });
});

export default sessionsRoutes;
