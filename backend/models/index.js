const Sequelize = require('sequelize');
const {sequelize} = require('../util/db');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const ArtPiece = require('./ArtPiece')(sequelize, Sequelize.DataTypes);
const UserArtPiece = require ('./UserArtPiece')(sequelize, Sequelize.DataTypes)

User.belongsToMany(ArtPiece, {through: UserArtPiece })
ArtPiece.belongsToMany(User, {through: UserArtPiece })

module.exports = {
  User,
  ArtPiece,
  UserArtPiece
};
