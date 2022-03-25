import Match from '../models/Match';
import Club from '../models/Club';

export default class MatchRepository {
  static async getAll() {
    const matchs = await Match.findAll({
      include: [
        {model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
        {model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
      ]
    });

    return matchs;
  }

  static async getById(id: string) {
    const result = await Match.findByPk(id);

    return result;
  }
}
