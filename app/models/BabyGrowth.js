const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const BabyGrowth = sequelize.define(
  "BabyGrowth",
  {
    baby_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "baby_growth",
    timestamps: true,
  }
);

module.exports = BabyGrowth;
