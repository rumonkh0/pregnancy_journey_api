const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabySleep = sequelize.define(
  "baby_sleep",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    baby_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, // Nullable as per your table definition
    },
    start_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    end_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    total_duration: {
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
    tableName: "baby_feed",
    timestamps: true,
  }
);

BabySleep.belongsTo(Baby, {
  foreignKey: "baby_id",
  onDelete: "CASCADE",
});

module.exports = BabySleep;
