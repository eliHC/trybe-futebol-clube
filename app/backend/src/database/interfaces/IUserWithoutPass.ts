import IUser from './IUser';

type IUserWithoutPass = Exclude<IUser, 'password'>;

export default IUserWithoutPass;
