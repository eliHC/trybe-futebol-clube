import { Request, Response } from 'express';

import MatchRepository from '../repositories/MatchRepository';

import LeaderboardService from '../services/LeaderboardService';
// import IResMaker from '../interfaces/IResMaker';

export default class LeaderboardController {
  static async getFullLeaderboard(req: Request, res: Response) {
    const matches = await MatchRepository.getByProgress(false);
    const leagueLeaderboard = new LeaderboardService(matches);

    const { success, status, message, data } = leagueLeaderboard.calculateStandings();

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }
}
