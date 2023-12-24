const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const DrugReminder = sequelize.define(
  "drug_reminder",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dose: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    reminder_info: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    medication_time: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "drug_reminder",
    timestamps: false, // Adjust if needed
  }
);

module.exports = DrugReminder;
