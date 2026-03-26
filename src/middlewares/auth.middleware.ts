import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { HttpError } from './error.middleware';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpError(401, 'No token provided');
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    throw new HttpError(401, 'Token error');
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new HttpError(401, 'Token malformatted');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    (req as any).user = decoded;
    return next();
  } catch (err) {
    throw new HttpError(401, 'Token invalid');
  }
}
