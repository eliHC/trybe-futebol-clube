import { Request, Response, NextFunction } from 'express';

import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { success, status, message, data } = await MatchService.getAll();

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }

  static async getMatchesByProgress(req: Request, res: Response, next: NextFunction) {
    if (req.query.inProgress) {
      const response = await MatchService.getByInProgress(req.query.inProgress === 'true');
      const { success, status, message, data } = response;

      if (!success) {
        return res.status(status).json({ message });
      }

      return res.status(status).json(data);
    }
    next();
  }

  static async createMatch(req: Request, res: Response) {
    const matchToBeSaved = req.body;

    const { success, status, message, data } = await MatchService.create(matchToBeSaved);

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }
}
