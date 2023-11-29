const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const MotherSymptoms = sequelize.define(
  "toolMotherSymptoms",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    symptom: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    intensity: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING(255),
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
    tableName: "tool_mother_symptoms", // Set the table name if different
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = MotherSymptoms;
