const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('artpieces', 'type', {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NULL
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('artpieces', 'type')
  },
}