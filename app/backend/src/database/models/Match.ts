import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Match extends Model {
  home_team: string;
}

Match.init({
  home_team: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

// blabla.hasMany() lemrar associations <<<
