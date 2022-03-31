import IConcludedMatch from '../interfaces/IConcludedMatch';
import IResult from '../interfaces/IResult';

import responseMaker from '../utils/index';

export default class LeaderboardService {
  result: { [key: string]: IResult } = {};

  matches: IConcludedMatch[];

  constructor(matches: IConcludedMatch[]) {
    this.matches = matches;
    this.result = {};
  }

  addTeam = (clubName: string) => {
    this.result[clubName] = {
      name: clubName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  };

  increaseTotalGames = (clubs: string[]) => {
    clubs.forEach((club) => { this.result[club].totalGames += 1; });
  };

  setMatchResult = ({ homeTeamGoals, awayTeamGoals, homeClub, awayClub }: IConcludedMatch) => {
    if (homeTeamGoals === awayTeamGoals) {
      this.result[homeClub.clubName].totalPoints += 1;
      this.result[homeClub.clubName].totalDraws += 1;
      //
      this.result[awayClub.clubName].totalPoints += 1;
      this.result[awayClub.clubName].totalDraws += 1;
    }

    if (homeTeamGoals > awayTeamGoals) {
      this.result[homeClub.clubName].totalPoints += 3;
      this.result[homeClub.clubName].totalVictories += 1;
      //
      this.result[awayClub.clubName].totalLosses += 1;
    } else {
      this.result[awayClub.clubName].totalPoints += 3;
      this.result[awayClub.clubName].totalVictories += 1;
      //
      this.result[homeClub.clubName].totalLosses += 1;
    }
  };

  calculateGoalsBalance = (club: string, goalsFavor: number, goalsOwn: number) => {
    this.result[club].goalsFavor += goalsFavor;
    this.result[club].goalsOwn += goalsOwn;
    this.result[club].goalsBalance += goalsFavor - goalsOwn;
  };

  calculateEfficiency = () => {
    Object.keys(this.result).forEach((club) => {
      this.result[club].efficiency = Number((
        (this.result[club].totalPoints / (this.result[club].totalGames * 3)) * 100
      ).toFixed(2));
    });
  };

  applyOrder = () => {
    const league = Object.values(this.result);

    league.sort((a, b) => (
      a.totalVictories + b.totalVictories
      || a.goalsBalance + b.goalsBalance
      || a.goalsFavor + b.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));

    return league;
  };

  calculateStandings = () => {
    this.matches.forEach((match) => {
      const {
        homeTeamGoals, awayTeamGoals,
        homeClub: { clubName: homeClub },
        awayClub: { clubName: awayClub },
      } = match;

      //
      if (!this.result[homeClub]) this.addTeam(homeClub);
      if (!this.result[awayClub]) this.addTeam(awayClub);
      //
      this.increaseTotalGames([homeClub, awayClub]);
      //
      this.setMatchResult(match);
      //
      this.calculateGoalsBalance(homeClub, homeTeamGoals, awayTeamGoals);
      //
      this.calculateEfficiency();
      //
    });

    // this.result = this.applyOrder();

    return responseMaker(true, 200, 'OK', Object.values(this.result));
  };
}
