const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const BpTracker = sequelize.define(
  "BpTracker",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    arm: {
      type: DataTypes.ENUM("right", "left"),
      allowNull: true, // Assuming arm can be NULL
    },
    systolic: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming systolic can be NULL
    },
    diastolic: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming diastolic can be NULL
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true, // Assuming createdAt can be NULL
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Assuming updatedAt can be NULL
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    // Other options for the model
    tableName: "bp_trackers", //
    timestamps: true,
  }
);

module.exports = BpTracker;
