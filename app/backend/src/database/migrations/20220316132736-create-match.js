'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      home_team: DataTypes.STRING,
      home_team_goals: DataTypes.STRING,
      away_team: DataTypes.STRING,
      away_team_goals: DataTypes.STRING,
      in_progress: DataTypes.STRING,
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
