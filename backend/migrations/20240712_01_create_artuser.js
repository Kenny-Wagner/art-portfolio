const {DataTypes} = require('sequelize')
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('UserArtPieces', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      artpiece_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'artpieces',
          key: 'id',
        },
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('UserArtPieces');
  },
};
