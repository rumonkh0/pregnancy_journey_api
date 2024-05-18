const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const BabyBlogCategories = require("./Baby_Blog_category");
const { Media } = require("../Association");

const BabyBlog = sequelize.define(
  "baby_blogs",
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
    tableName: "baby_blogs",
    timestamps: true,
  }
);

BabyBlogCategories.hasMany(BabyBlog, { foreignKey: "category" });
BabyBlog.belongsTo(BabyBlogCategories, { foreignKey: "category" });
BabyBlog.belongsTo(Media, { foreignKey: "image", as: "media" });

module.exports = BabyBlog;
