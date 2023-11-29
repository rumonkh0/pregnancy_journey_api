const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const BabyProgressTimeline = sequelize.define(
  "baby_progress_timeline",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "mother_vaccine_reminders",
    timestamps: true,
  }
);

module.exports = BabyProgressTimeline;
