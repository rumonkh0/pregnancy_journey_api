const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance

const Reaction = sequelize.define(
  "Reaction",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    comment_id: {
      type: DataTypes.INTEGER,
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
    tableName: "Reactions", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
  }
);

module.exports = Reaction;
