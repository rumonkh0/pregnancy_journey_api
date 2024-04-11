const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const BabyGrowthDev = sequelize.define(
  "BabyGrowthDev",
  {
    week: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "baby_growth_dev",
    timestamps: false
  }
);

module.exports = BabyGrowthDev;
