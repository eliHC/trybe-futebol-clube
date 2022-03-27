import Match from '../models/Match';
import Club from '../models/Club';

export default class MatchRepository {
  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  static async getOne(id: number) {
    const match = await Club.findOne({ where: { id } });

    return match;
  }

  static async getByProgress(inProgress: boolean) {
    const matchesByProgress = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesByProgress;
  }

  static async create(matchToBeSaved: object) {
    const match = await Match.create(matchToBeSaved);

    return match;
  }
}
