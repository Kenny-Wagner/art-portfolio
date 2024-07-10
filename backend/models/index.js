const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const ArtPiece = require('./ArtPiece')(sequelize, Sequelize.DataTypes);

User.hasMany(ArtPiece);
ArtPiece.belongsTo(User);

module.exports = {
  User,
  ArtPiece,
  sequelize,
};
