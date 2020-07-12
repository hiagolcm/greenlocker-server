import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../configs/authConfig';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async exec({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      throw new Error('Wrong email/password combination');
    }

    const { secret } = authConfig;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
