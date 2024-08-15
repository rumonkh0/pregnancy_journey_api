const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const SizeCpmpareWord = sequelize.define(
  "SizeCpmpareWord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "size_compare_words",
    timestamps: false,
  }
);

module.exports = SizeCpmpareWord;
