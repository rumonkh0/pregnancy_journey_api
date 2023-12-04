const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const ChildVaccineReminder = sequelize.define(
  "child_vaccine_remiinders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    baby_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "baby_list",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vaccine_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "pending",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "child_vaccine_remiinders",
    timestamps: true,
  }
);
module.exports = ChildVaccineReminder;
