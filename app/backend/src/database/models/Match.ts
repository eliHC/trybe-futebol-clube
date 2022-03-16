import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Match extends Model {
  home_team: number;
}

Match.init({
  home_team: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

// Match.belongsTo(Club, { foreignKey: 'id', as: 'home_team' });
// Match.belongsTo(Club, { foreignKey: 'id', as: 'away_team' });

// blabla.hasMany() lemrar associations <<<
