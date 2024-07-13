const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const A2zCategory = require("./A2zCategory");
const { Media } = require("../Association");

const A2z = sequelize.define(
  "a2z",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.INTEGER,
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
    tableName: "a2z",
    timestamps: true,
  }
);

A2zCategory.hasMany(A2z, { foreignKey: "category" });
A2z.belongsTo(A2zCategory, { foreignKey: "category" });
A2z.belongsTo(Media, { foreignKey: "image", as: "media" });

module.exports = A2z;
