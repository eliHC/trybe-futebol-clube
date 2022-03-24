import { Request, Response, NextFunction } from 'express';

import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

import IUser from '../interfaces/IUser';

const secretpath = '/home/eli/trybe/sd-014-b-trybe-futebol-clube/app/backend/jwt.evaluation.key';

// secretpath

const SECRET = fs.readFileSync(secretpath, 'utf-8');

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(authorization, SECRET) as IUser;

    if (user) {
      res.locals.user = user;
    }
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};
