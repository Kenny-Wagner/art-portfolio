const {DataTypes} = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface}) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false,
              },
        })
        await queryInterface.createTable('artpieces', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              title: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              description: {
                type: DataTypes.TEXT,
                allowNull: false,
              },
              price: {
                type: DataTypes.FLOAT,
                allowNull: true,
              },
              image_url: {
                type: DataTypes.STRING,
                allowNull: false,
              },
        })

    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('artpieces')
      },
}