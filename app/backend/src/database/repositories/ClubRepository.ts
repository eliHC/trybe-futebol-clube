import Club from '../models/Club';

export default class ClubRepository {
  // static async save(loginData: ILogin): Promise<IUser> {
  //   const newUser = await User.create({ ...loginData });

  //   return newUser as IUser;
  // }

  static async getAll() {
    const clubs = await Club.findAll();

    return clubs;
  }

  // static async getById(id: IUser['id']): Promise<IUser> {
  //   const result = await User.findByPk(id);

  //   return result as IUser;
  // }

  // static async getByEmail(email: IUser['email']) {
  //   const result = await User.findOne({ where: { email } });

  //   return result;
  // }

  // static async remove(id: IUser['id']): Promise<void> {
  //   await User.destroy({ where: { id } });
  // }
}
