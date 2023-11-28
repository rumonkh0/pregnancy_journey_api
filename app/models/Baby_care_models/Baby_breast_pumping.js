const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabyBreastPumping = sequelize.define(
  "baby_breast_pumping",
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
    right_milk_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    left_milk_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_milk: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    left_duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    right_duration: {
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
      allowNull: false,
    },
  },
  {
    tableName: "baby_breast_pumping",
    timestamps: true,
  }
);

BabyBreastPumping.belongsTo(Baby, {
  foreignKey: "baby_id",
  onDelete: "CASCADE",
});

module.exports = BabyBreastPumping;
