import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Club extends Model {
  clubName: string;
}

Club.init({
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayClub' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });
