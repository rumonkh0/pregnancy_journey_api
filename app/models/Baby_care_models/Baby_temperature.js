const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabyTemperature = sequelize.define(
  "baby_temperature",
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
    temp_celsius: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    temp_fahrenheit: {
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
    tableName: "baby_temperature",
    comment: "ml",
    timestamps: true,
  }
);

BabyTemperature.belongsTo(Baby, {
  foreignKey: "baby_id",
  onDelete: "CASCADE",
});

module.exports = BabyTemperature;
