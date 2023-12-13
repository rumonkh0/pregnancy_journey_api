const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");
const Post = require("./community/Post");
const PostMedia = require("./community/PostMedia");

const Media = sequelize.define(
  "Media",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mime_type: {
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
    tableName: "media",
    timestamp: true,
  }
);

// Media.belongsToMany(Post, { through: PostMedia, foreignKey: 'id' });


module.exports = Media;
