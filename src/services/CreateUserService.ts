import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User, { Role } from '../models/User';
import AppError from '../models/AppError';

interface Request {
  nickname: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async exec({ nickname, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const similarUser = await usersRepository.findOne({
      where: [
        {
          email,
        },
        {
          nickname,
        },
      ],
    });

    if (similarUser) {
      if (similarUser.email === email) {
        throw new AppError(400, 'Email already in use');
      }

      if (similarUser.nickname === nickname) {
        throw new AppError(400, 'nickname already in use');
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const user = usersRepository.create({
      nickname,
      email,
      password: encryptedPassword,
      role: Role.COMMON,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
