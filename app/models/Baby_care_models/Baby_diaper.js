const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const BabyList = require("../Baby");

const BabyDiaper = sequelize.define(
  "baby_diaper",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    baby_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("clean", "poo", "pee", "mixed"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "baby_diaper",
    timestamps: true,
  }
);

// BabyDiaper.belongsTo(BabyList, {
//   foreignKey: "baby_id",
//   onDelete: "CASCADE",
// });

module.exports = BabyDiaper;
