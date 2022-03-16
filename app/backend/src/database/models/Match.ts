import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Match extends Model {
  homeTeam: number;
}

Match.init({
  home_team: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});
