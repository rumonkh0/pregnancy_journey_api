const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabyMedication = sequelize.define(
  "baby_medication",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dose: {
      type: DataTypes.STRING(25),
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
    baby_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "baby_medications",
    timestamps: true,
  }
);

BabyMedication.belongsTo(Baby, {
  foreignKey: "baby_id",
  onDelete: "CASCADE",
});

module.exports = BabyMedication;
