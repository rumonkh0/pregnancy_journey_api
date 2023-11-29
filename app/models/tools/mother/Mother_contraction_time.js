const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const MotherContractionTimers = sequelize.define(
  "tool_mother_contraction_timers",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    frequency: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    intensity: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tool_mother_contraction_timers",
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = MotherContractionTimers;
