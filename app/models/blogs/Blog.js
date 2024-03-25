const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const BlogCategories = require("./Blog_category");
const { Media } = require("../Association");

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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.INTEGER,
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

BlogCategories.hasMany(Blog, { foreignKey: "category" });
Blog.belongsTo(BlogCategories, { foreignKey: "category" });
Blog.belongsTo(Media, { foreignKey: "image", as: "media" });

module.exports = Blog;
