const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const MotherVaccineReminder = sequelize.define(
  "mother_vaccine_reminders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vaccine_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "mother_vaccine_reminders",
    timestamps: true,
  }
);

module.exports = MotherVaccineReminder;
