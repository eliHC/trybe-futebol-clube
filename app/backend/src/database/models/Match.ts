import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Matchs extends Model {
  homeTeam: number;
}

Matchs.init({
  homeTeam: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});
