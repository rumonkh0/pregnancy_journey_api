const { sequelize } = require("../../../../config/db");
const { DataTypes } = require("sequelize");

const WeightLog = sequelize.define(
  "weight_logs",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DOUBLE,
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
    tableName: "weight_logs",
    timestamps: true,
  }
);

WeightLogs.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = WeightLog;
