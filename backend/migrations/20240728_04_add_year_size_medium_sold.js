const { DataTypes } = require('sequelize')

module.exports = {
  up: 
    async ({ context: queryInterface }) => {
    await queryInterface.addColumn('artpieces', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.addColumn('artpieces', 'size', {
        type: DataTypes.STRING,
        allowNull: true
      })
      await queryInterface.addColumn('artpieces', 'medium', {
        type: DataTypes.STRING,
        allowNull: true
      })
      await queryInterface.addColumn('artpieces', 'sold', {
        type: DataTypes.BOOLEAN,
        allowNull: true
      })
    
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('artpieces', 'year')
    await queryInterface.removeColumn('artpieces', 'size')
    await queryInterface.removeColumn('artpieces', 'medium')
    await queryInterface.removeColumn('artpieces', 'sold')
  },
}