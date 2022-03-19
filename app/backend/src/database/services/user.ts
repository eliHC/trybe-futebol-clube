import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';

export default class UserService {
  static async save(body: any): Promise<IUser> { //  tirar os anys<<
    const response = await UserRepository.save(body);

    return response as IUser;
  }
}
