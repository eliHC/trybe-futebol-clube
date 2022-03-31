import Match from '../models/Match';
import Club from '../models/Club';

import IConcludedMatch from '../interfaces/IConcludedMatch';

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

  static async getByProgress(inProgress: boolean) {
    const matchesByProgress = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesByProgress as unknown as IConcludedMatch[];
  }

  static async create(matchToBeSaved: object) {
    const match = await Match.create(matchToBeSaved);

    return match;
  }

  static async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return match;
  }

  static async endmatch(id: number) {
    const match = await Match.update({ inProgress: false }, { where: { id } });

    return match;
  }
}
