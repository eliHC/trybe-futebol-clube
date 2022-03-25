import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { success, status, message, data } = await MatchService.getAll();

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }

  // static async getMatchById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { success, status, message, data } = await MatchService.getById(id);

  //   if (!success) {
  //     return res.status(status).json({ message });
  //   }

  //   return res.status(status).json(data);
  // }
}
