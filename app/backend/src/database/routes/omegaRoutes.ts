import { Router } from 'express';

import UserController from '../controllers/UserController';
import ClubController from '../controllers/ClubController';
import MatchController from '../controllers/MatchController';
import LeaderboardController from '../controllers/LeaderboardController';

import authenticate from '../middlewares/auth';

const router = Router();

//
router.post('/login', UserController.login);
router.get('/login/validate', authenticate, UserController.getRole);
//
router.get('/clubs', ClubController.getAllClubs);
router.get('/clubs/:id', ClubController.getClubById);
//
router.get('/matchs', MatchController.getMatchesByProgress, MatchController.getAllMatches);
router.post('/matchs', authenticate, MatchController.createMatch);
//
router.patch('/matchs/:id', authenticate, MatchController.updateMatch);
router.patch('/matchs/:id/finish', authenticate, MatchController.endMatch);
//
router.get('/leaderboard', LeaderboardController.getFullLeaderboard);
//

export default router;
