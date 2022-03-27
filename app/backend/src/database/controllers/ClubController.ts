import { Request, Response } from 'express';

import ClubService from '../services/ClubService';

export default class ClubController {
  static async getAllClubs(req: Request, res: Response) {
    const { success, status, message, data } = await ClubService.getAll();

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }

  static async getClubById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { success, status, message, data } = await ClubService.getById(id);

    if (!success) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(data);
  }
}
