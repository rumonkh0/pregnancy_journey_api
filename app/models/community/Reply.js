const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance

const Reply = sequelize.define(
  "Reply",
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
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "createdAt", // Optional: Specify the field name in the database
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updatedAt", // Optional: Specify the field name in the database
    },
  },
  {
    tableName: "Replies", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
  }
);

module.exports = Reply;
