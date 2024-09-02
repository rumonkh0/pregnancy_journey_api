const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const StrikeReward = sequelize.define(
  "StrikeReward",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    strike_count: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "strike_rewards",
    timestamps: false,
  }
);

module.exports = StrikeReward;
