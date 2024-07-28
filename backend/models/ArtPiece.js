module.exports = (sequelize, DataTypes) => {
    const ArtPiece = sequelize.define(
      'artpiece', 
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        size: {
          type: DataTypes.STRING,
          allowNull: true
        },
        medium: {
          type: DataTypes.STRING,
          allowNull: true
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        sold : {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        underscored: true,
        timestamps: false,
      },
    )
    return ArtPiece;
  }
  