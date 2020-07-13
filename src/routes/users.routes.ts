import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import ChangeUserPasswordService from '../services/ChangeUserPasswordService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DeleteUserService from '../services/DeleteUserService';
import isAdmin from '../middlewares/isAdmin';
import BlockUserService from '../services/BlockUserService';

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

userRoutes.delete('', ensureAuthenticated, async (req, res) => {
  const { password } = req.body;
  const { id: userId, role } = req.user;

  const deleteUserService = new DeleteUserService();

  await deleteUserService.exec({ userId, role, password });

  res.status(204).json();
});

userRoutes.delete('/:id', ensureAuthenticated, isAdmin, async (req, res) => {
  const { id: userId } = req.params;
  const { role } = req.user;

  const deleteUserService = new DeleteUserService();

  await deleteUserService.exec({ userId, role });

  res.status(204).json();
});

userRoutes.patch(
  '/block/:id',
  ensureAuthenticated,
  isAdmin,
  async (req, res) => {
    const { id: userId } = req.params;
    const { block } = req.body;

    const blockUserService = new BlockUserService();

    const user = await blockUserService.exec({ userId, blocked: block });

    res.json({ user });
  },
);

export default userRoutes;
