import { Request, Response } from 'express';

import UserService from '../services/user';
import IUser from '../interfaces/IUser';

import responseMaker from '../utils/index';

export default class UserController {
  static async login(req: Request, res: Response): Promise<IUser> {
    const { email, password } = req.body;
    const newUser = await UserService.save({ email, password });

    const response = responseMaker();
    response.data = newUser;

    return res.status(response.status).json(response.data) as unknown as IUser;
  }
}
