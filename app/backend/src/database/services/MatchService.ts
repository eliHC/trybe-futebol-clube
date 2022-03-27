import MatchRepository from '../repositories/MatchRepository';
import ClubRepository from '../repositories/ClubRepository';

import IResMaker from '../interfaces/IResMaker';
import IMatchToBeSaved from '../interfaces/IMatchToBeSaved';
import IMatchToBeUpdated from '../interfaces/IMatchToBeUpdated';

import responseMaker from '../utils/index';

export default class MatchService {
  static async getAll(): Promise<IResMaker> {
    const matches = await MatchRepository.getAll();

    if (!matches) {
      return responseMaker(false, 401, 'no matches, dude!');
    }

    const response = responseMaker(true, 200, 'OK', matches);

    return response as IResMaker;
  }

  static async getByInProgress(inProgress: boolean): Promise<IResMaker> {
    const matchByProgress = await MatchRepository.getByProgress(inProgress);

    if (!matchByProgress) {
      return responseMaker(false, 401, 'no match, dude!');
    }

    const response = responseMaker(true, 200, 'OK', matchByProgress);

    return response as IResMaker;
  }

  static async create(matchToBeSaved: IMatchToBeSaved): Promise<IResMaker> {
    try {
      const { homeTeam, awayTeam } = matchToBeSaved;

      const homeClub = await ClubRepository.getById(homeTeam);
      const awayClub = await ClubRepository.getById(awayTeam);

      if (!homeClub || !awayClub) {
        return responseMaker(false, 401, 'There is no team with such id!');
      }
      const match = await MatchRepository.create(matchToBeSaved);

      if (!match) {
        return responseMaker(false, 401, 'nope');
      }
      const response = responseMaker(true, 201, 'OK', match);

      return response as IResMaker;
    } catch (error) {
      return responseMaker(false, 500, 'Internal server error ');
    }
  }

  static async update({ id, matchToBeUpdated }: IMatchToBeUpdated): Promise<IResMaker> { // TODO: remove any <<
    try {
      const { homeTeamGoals, awayTeamGoals } = matchToBeUpdated;

      const updatedMatch = await MatchRepository.update(id, homeTeamGoals, awayTeamGoals);
      if (!updatedMatch) {
        return responseMaker(false, 401, 'nope');
      }

      const response = responseMaker(true, 200, 'Finalizado', updatedMatch);

      return response as IResMaker;
    } catch (error) {
      return responseMaker(false, 500, 'Internal server error');
    }
  }

  static async endMatch(id: number): Promise<IResMaker> {
    try {
      const match = await MatchRepository.endmatch(id);
      if (!match) {
        return responseMaker(false, 401, 'nope');
      }

      const response = responseMaker(true, 200, 'Finalizado', match);

      return response as IResMaker;
    } catch (error) {
      return responseMaker(false, 500, '');
    }
  }
}
