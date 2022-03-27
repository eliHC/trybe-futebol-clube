import ClubRepository from '../repositories/ClubRepository';

import IResMaker from '../interfaces/IResMaker';
import responseMaker from '../utils/index';

export default class LoginService {
  static async getAll(): Promise<IResMaker> {
    const clubs = await ClubRepository.getAll();

    if (!clubs) {
      return responseMaker(false, 401, 'no clubs, dude!');
    }

    const response = responseMaker(true, 200, 'OK', clubs);

    return response as IResMaker;
  }

  static async getById(id: number): Promise<IResMaker> {
    const club = await ClubRepository.getById(id);

    if (!club) {
      return responseMaker(false, 401, 'no club, dude!');
    }

    const response = responseMaker(true, 200, 'OK', club);

    return response as IResMaker;
  }
}
