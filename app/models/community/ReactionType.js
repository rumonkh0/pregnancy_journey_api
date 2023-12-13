const { DataTypes } = require('sequelize');
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance

const ReactionType = sequelize.define('ReactionType', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = ReactionType;
