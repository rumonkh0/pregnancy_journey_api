const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db"); 
const User = require('./User')

const BabyList = sequelize.define(
  "BabyList",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    mother_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    baby_serial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "male=1 female=2",
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_move: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_heartbeat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "baby_list", // Set the table name if different
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = BabyList;
