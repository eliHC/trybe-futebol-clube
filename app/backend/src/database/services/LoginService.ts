import * as bcryptJS from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import UserRepository from '../repositories/UserRepository';

import ILogin from '../interfaces/ILogin';
import ILoginOut from '../interfaces/ILoginOut';
import IResMaker from '../interfaces/IResMaker';
import IUser from '../interfaces/IUser';
import IUserWithoutPass from '../interfaces/IUserWithoutPass';

import responseMaker from '../utils/index';

export default class LoginService {
  static async login({ email, password }: ILogin): Promise<IResMaker> {
    const user = await UserRepository.getByEmail(email) as IUser;
    const isValidPassword = bcryptJS.compareSync(password, user.password);

    if (!user || !isValidPassword) {
      return responseMaker(false, 401, 'Incorrect email or password');
    }

    const SECRET = fs.readFileSync('jwt.evaluation.key');
    const token = jwt.sign({ user }, SECRET);

    const obj = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      } as IUserWithoutPass,
      token,
    } as ILoginOut;

    const response = responseMaker(true, 200, 'OK', obj);

    return response as IResMaker;
  }
}
