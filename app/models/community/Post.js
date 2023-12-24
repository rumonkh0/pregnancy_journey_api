const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Media = require("../Media");
const PostMedia = require("./PostMedia");
const Comment = require("./Comment");
const Reaction = require("./Reaction");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
    tableName: "posts", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
  }
);

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Post.hasMany(Reaction, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = Post;
