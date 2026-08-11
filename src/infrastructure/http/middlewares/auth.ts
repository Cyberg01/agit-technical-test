import config from '@/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const [type, token] = (req.header('Authorization') || '').split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, config.app.jwtSecret) as Express.Request['user'];
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
