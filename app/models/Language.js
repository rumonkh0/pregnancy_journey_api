const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");
const Media = require("./Media");

const Language = sequelize.define(
  "language",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lang_code: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    lang_country: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    flag: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "languages",
    timestamps: true,
  }
);

Language.belongsTo(Media, { as: "media", foreignKey: "flag" });

module.exports = Language;
