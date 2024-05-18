const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const Checklist = sequelize.define(
  "Checklist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subitem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "The title length should be at least 3 characters.",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "checklist", //
    timestamps: true,
  }
);

module.exports = Checklist;
