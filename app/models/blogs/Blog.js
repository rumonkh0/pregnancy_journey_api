const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const BlogCategories = require("./Blog_category");

const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlogCategories,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
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
    tableName: "blogs",
    timestamps: true,
  }
);

module.exports = Blog;
