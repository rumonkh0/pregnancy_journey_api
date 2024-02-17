const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const DailyRead = sequelize.define(
  "daily_reads",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "daily_reads",
    timestamps: true,
  }
);

module.exports = DailyRead;
