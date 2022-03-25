import User from '../models/User';

// import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

export default class UserRepository { //  refac <<<
  // static async save(loginData: ILogin): Promise<IUser> {
  //   const newUser = await User.create({ ...loginData });

  //   return newUser as IUser;
  // }

  // static async getAll(): Promise<IUser[]> {
  //   const items = await User.findAll();

  //   return items as IUser[];
  // }

  // static async getById(id: IUser['id']): Promise<IUser> {
  //   const result = await User.findByPk(id);

  //   return result as IUser;
  // }

  static async getByEmail(email: IUser['email']) {
    const result = await User.findOne({ where: { email } });

    return result;
  }

  // static async remove(id: IUser['id']): Promise<void> {
  //   await User.destroy({ where: { id } });
  // }
}
