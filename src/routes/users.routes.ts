import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const userRouters = Router();

userRouters.get('/', async (_, res) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  res.json({ users });
});

userRouters.post('/', async (req, res) => {
  const createUserService = new CreateUserService();

  const { nickname, email, password } = req.body;

  const user = await createUserService.exec({
    nickname,
    email,
    password,
  });

  res.json({ user });
});

export default userRouters;
