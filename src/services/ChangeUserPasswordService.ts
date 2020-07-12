import { getRepository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import User from '../models/User';
import AppError from '../models/AppError';

interface Request {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

class ChangeUserPasswordService {
  public async exec({
    userId,
    currentPassword,
    newPassword,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id: userId });

    if (!user || !(await compare(currentPassword, user.password))) {
      throw new AppError(400, 'Wrong user/password combination');
    }

    user.password = await hash(newPassword, 8);

    await usersRepository.save(user);

    return user;
  }
}

export default ChangeUserPasswordService;
