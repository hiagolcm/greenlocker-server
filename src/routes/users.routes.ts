import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import ChangeUserPasswordService from '../services/ChangeUserPasswordService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

userRoutes.get('/', async (_, res) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  res.json({ users });
});

userRoutes.post('/', async (req, res) => {
  const { nickname, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.exec({
    nickname,
    email,
    password,
  });

  res.json({ user });
});

userRoutes.patch('/password', ensureAuthenticated, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const userId = req.user.id;

  const changeUserPasswordService = new ChangeUserPasswordService();

  const user = await changeUserPasswordService.exec({
    userId,
    currentPassword,
    newPassword,
  });

  res.json({ user });
});

export default userRoutes;
