const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const ChecklistItem = sequelize.define(
  "ChecklistItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(10),
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
    tableName: "checklist_item", //
    timestamps: true,
  }
);

module.exports = ChecklistItem;
