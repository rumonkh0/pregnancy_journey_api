const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const BabyKickCounter = sequelize.define(
  "toolMotherBabyKickCounters",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    baby_serial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    kicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tool_mother_baby_kick_counters",
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = BabyKickCounter;
