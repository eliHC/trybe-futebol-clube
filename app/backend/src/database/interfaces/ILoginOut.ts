import IUserWithoutPass from './IUserWithoutPass';

export default interface ILoginOut {
  user: IUserWithoutPass;
  token: string;
}
