const { DataTypes } = require("sequelize");
const BabyList = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabySleep = sequelize.define(
  "baby_sleep",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
    tableName: "baby_sleep",
    timestamps: true,
  }
);

// BabySleep.belongsTo(BabyList, {
//   foreignKey: "baby_id",
//   onDelete: "CASCADE",
// });

module.exports = BabySleep;
