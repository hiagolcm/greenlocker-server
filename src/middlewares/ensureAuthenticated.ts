import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../models/AppError';
import authConfig from '../configs/authConfig';

interface JWTPayload {
  iat: string;
  exp: string;
  sub: string;
  role: 'ADMIN' | 'COMMON';
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
