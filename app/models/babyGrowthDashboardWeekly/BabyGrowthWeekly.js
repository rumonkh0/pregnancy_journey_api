const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const BabyGrowthWeekly = sequelize.define(
  "BabyGrowthWeekly",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    baby_size_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    size: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body_change_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    body_change: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    baby_development_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    baby_development: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    organ_development: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    behaviour_development: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    to_dos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dont_dos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "baby_growth_weekly",
    timestamps: false,
  }
);

// BabyGrowthWeekly.belongsTo(Media, { foreignKey: "image", as: "media" });

module.exports = BabyGrowthWeekly;
