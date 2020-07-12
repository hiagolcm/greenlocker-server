import User from '../models/User';
import { getRepository } from 'typeorm';
import AppError from '../models/AppError';

interface Request {
  userId: string;
  blocked: boolean;
}

class BlockUserService {
  public async exec({ userId, blocked }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id: userId });

    if (!user) {
      throw new AppError(400, 'User not found');
    }

    user.blocked = blocked;

    await usersRepository.save(user);

    return user;
  }
}

export default BlockUserService;
