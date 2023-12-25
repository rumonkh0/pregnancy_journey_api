const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");
const User = require("../../User");

const MotherActivity = sequelize.define(
  "mother_activity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    activity: {
      type: DataTypes.STRING(255),
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
    tableName: "mother_activity",
    timestamps: true,
  }
);

MotherActivity.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = MotherActivity;
