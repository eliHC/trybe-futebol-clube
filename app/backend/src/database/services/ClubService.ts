import ClubRepository from '../repositories/ClubRepository';

// import ILogin from '../interfaces/ILogin';
// import ILoginOut from '../interfaces/ILoginOut';
import IResMaker from '../interfaces/IResMaker';
// import IUser from '../interfaces/IUser';
// import IUserWithoutPass from '../interfaces/IUserWithoutPass';

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
}
