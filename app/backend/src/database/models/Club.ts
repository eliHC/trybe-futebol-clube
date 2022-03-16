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

Club.hasMany(Match, { foreignKey: 'id', as: 'home_team' });
Club.hasMany(Match, { foreignKey: 'id', as: 'away_team' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
