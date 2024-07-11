module.exports = (sequelize, DataTypes) => {
  const UserArtPiece = sequelize.define(
    'UserArtPiece', 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
            },
            artpieceId: {
                type: DataTypes.INTEGER,
                references: {model: 'artpieces', key: 'id' },
            } 
        },
        { 
            underscored: true,
            timestamps: false,
        },
    );

  return UserArtPiece;
};
