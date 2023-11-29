const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");

const BabyGallery = sequelize.define(
  "BabyGallery",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    baby_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "baby_gallery", // Make sure the table name matches your actual table name
    timestamps: true, // Assuming you don't want Sequelize to manage timestamps
  }
);

module.exports = BabyGallery;
