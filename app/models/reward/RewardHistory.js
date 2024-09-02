const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");

const UserReward = sequelize.define(
  "UserReward",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "users", // name of the referenced table
        key: "id",
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tasks", // name of the referenced table
        key: "id",
      },
    },
    earned_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    earned_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_rewards",
    timestamps: false,
  }
);

module.exports = UserReward;
