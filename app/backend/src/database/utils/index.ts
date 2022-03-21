import IResMaker from '../interfaces/IResMaker';

const responseMaker = (
  success = true,
  status = 200,
  message = 'OK',
  data = {},
):IResMaker => ({ success, status, message, data });

export default responseMaker;
