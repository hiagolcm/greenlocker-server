import { Request, Response, NextFunction } from 'express';
import AppError from '../models/AppError';
import { Role } from '../models/User';

const isAdmin = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.user.role === Role.COMMON) {
    throw new AppError(401, 'You do not have permission');
  }

  next();
};

export default isAdmin;
