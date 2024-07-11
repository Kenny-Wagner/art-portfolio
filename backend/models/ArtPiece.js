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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        underscored: true,
        timestamps: false,
      },
    )
    return ArtPiece;
  }
  