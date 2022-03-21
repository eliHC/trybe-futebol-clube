import UserRepository from '../repositories/UserRepository';
import * as bcryptJS from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import ILogin from '../interfaces/ILogin';
import ILoginOut from '../interfaces/ILoginOut';
import IResMaker from '../interfaces/IResMaker';

import responseMaker from '../utils/index';

export default class LoginService {
  static async login({ email, password }: ILogin): Promise<IResMaker> {
    const user = await UserRepository.getByEmail(email);
    if (!user) {
      const response = responseMaker(false, 401, 'Incorrect email or password');
      return response as IResMaker;
    }
    
    const isValidPassword = bcryptJS.compareSync(password, user.password);
    if (!isValidPassword) {
      const response = responseMaker(false, 401, 'Incorrect email or password');
      return response as IResMaker;
    }

    const SECRET = fs.readFileSync('/backend/jwt.evaluation.key').toString();
    const token = jwt.sign(user.id.toString(), SECRET);

    const obj = { 
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    } as ILoginOut;

    const response = responseMaker(true, 200, 'OK', obj);

    return response as IResMaker;
  }
}
