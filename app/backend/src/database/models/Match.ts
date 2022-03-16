import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

export default class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'away_team' });

// blabla.hasMany() lemrar associations <<<
