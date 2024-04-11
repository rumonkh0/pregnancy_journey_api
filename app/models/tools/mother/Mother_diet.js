const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");
const Admin = require("../../Admin");
const User = require("../../User");

const MotherDiet = sequelize.define(
  "MotherDiet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Assuming there's a User model
        key: "id",
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Admin", // Assuming there's an Admin model
        key: "id",
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    edd_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    veg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BMI: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "diet",
    timestamps: true,
  }
);

MotherDiet.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(MotherDiet, { foreignKey: "user_id" });

module.exports = MotherDiet;
