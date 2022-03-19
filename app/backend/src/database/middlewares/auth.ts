import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const SECRET = fs.readFileSync('../../../jwt.evaluation.key', 'utf-8');

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const user = jwt.verify(authorization, SECRET);
    
    if (user) {
      next();
    }
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// --------------------------<<
export const shutUpLint = '!';
