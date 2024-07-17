const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");
const PostTopic = require("./community/Post_topic");

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
    original_name: {
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
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
// Media.belongsToMany(Post, { through: 'PostMedia', foreignKey: 'mediaId' });
Media.hasMany(PostTopic, { as: "media", foreignKey: "image" });
PostTopic.belongsTo(Media, { as: "media", foreignKey: "image" });

module.exports = Media;
