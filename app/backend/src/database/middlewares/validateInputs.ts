import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import responseMaker from '../utils';

const schemaUsers = Joi.object({
  username: Joi.string().required().min(3).messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().required().min(3).messages({
    'any.required': 'Classe is required',
    'string.base': 'Classe must be a string',
    'string.min': 'Classe must be longer than 2 characters',
  }),
  level: Joi.number().required().greater(0).messages({
    'any.required': 'Level is required',
    'number.base': 'Level must be a number',
    'number.greater': 'Level must be greater than 0',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 7 characters',
  }),
}).strict();

const schemaLogin = Joi.object({
  username: Joi.string().required().min(3).messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 7 characters',
  }),
});

const schemaProducts = Joi.object({
  name: Joi.string().required().min(2).messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().required().min(3).messages({
    'any.required': 'Amount is required',
    'string.base': 'Amount must be a string',
    'string.min': 'Amount must be longer than 2 characters',
  }),
});

const schemaByPath = (path: string) => {
  switch (path) {
    case '/users':
      return schemaUsers;
    case '/login':
      return schemaLogin;
    case '/products':
      return schemaProducts;
    default:
      return Joi.object({});
  }
};

export const validateInputs = (req: Request, res: Response, next: NextFunction) => {
  const { path } = req;
  const payload = req.body;

  if (req.method === 'GET') {
    return next();
  }

  const schema: Joi.ObjectSchema = schemaByPath(path);
  const { error } = schema.validate(payload);

  if (error) {
    const response = responseMaker(false, 422, error.message);

    return res.status(response.status).json({ error: response.message });
  }

  next();
};

// ---------------------------<<
export const shutUpLint = '!';
