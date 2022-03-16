import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  username: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

// blabla.hasMany() lemrar associations <<<
