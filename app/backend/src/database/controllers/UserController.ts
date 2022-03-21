import { Request, Response } from 'express';

import LoginService from '../services/LoginService';
import ILoginOut from '../interfaces/ILoginOut';

export default class UserController {
  static async login(req: Request, res: Response): Promise<ILoginOut> {
    const { email, password } = req.body;
    const { success, status, message, data } = await LoginService.login({ email, password });

    if(!success) {
      return res.status(status).json({message: message}) as unknown as ILoginOut;
    }

    return res.status(status).json(data) as unknown as ILoginOut;
  }
}
