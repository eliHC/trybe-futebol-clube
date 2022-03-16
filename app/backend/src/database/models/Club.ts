import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';
// import OtherModel from './OtherModel'; // p/ Associations<<

export default class Club extends Model {
  // public <campo>!: <tipo>;
  club_name: string;
}

Club.init({
  // ... Campos
  club_name: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

/**
* `Workaround` para aplicar as associations em TS:
* Associations 1:N devem ficar em uma das instâncias de modelo
**/

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'home_club' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'away_club' });

Club.hasMany(Match, { foreignKey: 'id', as: 'home_match' });
Club.hasMany(Match, { foreignKey: 'id', as: 'away_match' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
