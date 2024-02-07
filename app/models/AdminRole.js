const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const AdminRole = sequelize.define(
  "AdminRole",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "admin_role", // Specify the table name explicitly
    timestamps: false, // Disable timestamps for this table
  }
);

module.exports = AdminRole;
