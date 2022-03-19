import IResMaker from '../interfaces/IResMaker';

const responseMaker = (
  success = true,
  status = 201,
  message = 'OK',
  data = {},
):IResMaker => ({ success, status, message, data });

export default responseMaker;
