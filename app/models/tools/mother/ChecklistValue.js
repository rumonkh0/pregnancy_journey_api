const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const ChecklistValue = sequelize.define(
  "ChecklistValue",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    check_values: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "check_value", //
    timestamps: false,
  }
);

module.exports = ChecklistValue;
