const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const ChecklistSubItem = sequelize.define(
  "ChecklistSubItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
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
    tableName: "checklist_subitem", //
    timestamps: true,
  }
);

module.exports = ChecklistSubItem;
