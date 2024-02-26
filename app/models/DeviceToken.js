const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const deviceToken = sequelize.define(
  "deviceToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "User", // Replace 'User' with the name of the referenced model
        key: "id",
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
    tableName: "device_token", // Replace 'your_table_name' with the actual name of your table
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt fields
  }
);

module.exports = deviceToken;
