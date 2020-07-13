import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import AppError from '../models/AppError';
import authConfig from '../configs/authConfig';
import User, { Role } from '../models/User';

interface JWTPayload {
  iat: string;
  exp: string;
  sub: string;
  role: Role;
}

const ensureAuthenticated = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, 'Missing authorization header');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.secret) as JWTPayload;

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ id: decoded.sub });

    if (!user) {
      throw new AppError(400, 'User not found');
    }

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };
  } catch {
    throw new AppError(401, 'Invalid token');
  }

  next();
};

export default ensureAuthenticated;
