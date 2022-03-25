import Club from '../models/Club';

export default class ClubRepository {
  static async getAll() {
    const clubs = await Club.findAll();

    return clubs;
  }

  static async getById(id: string) {
    const result = await Club.findByPk(id);

    return result;
  }
}
