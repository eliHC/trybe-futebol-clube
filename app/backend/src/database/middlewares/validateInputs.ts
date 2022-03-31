import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import responseMaker from '../utils';

const schemaMatchs = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().disallow(Joi.ref('homeTeam')).required().messages({
    'any.invalid': 'It is not possible to create a match with two equal teams',
  }),
  homeTeamGoals: Joi.optional(),
  awayTeamGoals: Joi.optional(),
  inProgress: Joi.optional(),
  homeGoals: Joi.optional(),
  awayGoals: Joi.optional(),
});

const message = 'All fields must be filled';

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': message,
    'string.email': 'Incorrect email or password',
    'string.base': 'Incorrect email or password',
    'string.empty': message,
  }),
  password: Joi.string().required().min(7).messages({
    'any.required': message,
    'string.min': 'Password must be longer than 6 characters',
    'string.empty': message,
  }),
});

const schemaByPath = (path: string) => {
  switch (path) {
    case '/matchs':
      return schemaMatchs;
    case '/login':
      return schemaLogin;
    default:
      return Joi.object().empty();
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET') {
    return next();
  }

  const { path } = req;
  const payload = req.body;

  const schema = schemaByPath(path);
  const { error } = schema.validate(payload);

  if (error) {
    const response = responseMaker(false, 401, error.message);

    return res.status(response.status).json({ message: response.message });
  }

  next();
};
