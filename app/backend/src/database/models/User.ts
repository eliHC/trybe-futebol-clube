import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  username: string;
}

User.init({
  username: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

// blabla.hasMany() lemrar associations <<<
