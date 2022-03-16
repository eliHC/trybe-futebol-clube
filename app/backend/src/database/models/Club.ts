import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Club extends Model {
  clubName: string;
}

Club.init({
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'id', as: 'home_team' });
Club.hasMany(Match, { foreignKey: 'id', as: 'away_team' });

Match.belongsTo(Club, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'away_team' });
