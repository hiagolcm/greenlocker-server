import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User, { Role } from '../models/User';
import AppError from '../models/AppError';

interface Request {
  role: Role;
  userId: string;
  password?: string;
}

class DeleteUserService {
  public async exec({ role, userId, password }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id: userId });

    if (!user) {
      throw new AppError(400, 'User not found');
    }

    if (role === Role.COMMON) {
      if (!compare(password, user.password)) {
        throw new AppError(401, 'Wrong user/password combination');
      }
    }

    await usersRepository.delete({ id: user.id });
  }
}

export default DeleteUserService;
