import { Request, Response } from 'express';

import LoginService from '../services/LoginService';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { success, status, message, data } = await LoginService.login({ email, password });

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }

  static getRole(req: Request, res: Response) {
    const { user } = res.locals.user;

    return res.status(200).json(user.role);
  }
}
