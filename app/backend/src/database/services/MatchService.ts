import MatchRepository from '../repositories/MatchRepository';

import IResMaker from '../interfaces/IResMaker';
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

  static async getById(id: string): Promise<IResMaker> {
    const match = await MatchRepository.getById(id);

    if (!match) {
      return responseMaker(false, 401, 'no match, dude!');
    }

    const response = responseMaker(true, 200, 'OK', match);

    return response as IResMaker;
  }
}
