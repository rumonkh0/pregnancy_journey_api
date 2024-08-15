const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Media = require("../Media");
const PostMedia = require("./PostMedia");
const Comment = require("./Comment");
const Reaction = require("./Reaction");
const User = require("../User");
const PostTopic = require("./Post_topic");

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
    topic: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [10, 100],
          msg: "The TItle length should be 10-100 characters.",
        },
      },
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [70],
          msg: "The description length should be at least 70 characters.",
        },
      },
      allowNull: true,
    },
    published: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "0",
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_reaction: {
      type: DataTypes.INTEGER,
    },
    total_comment: {
      type: DataTypes.INTEGER,
    },
    total_views: {
      type: DataTypes.INTEGER,
    },
    total_report: {
      type: DataTypes.INTEGER,
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
Post.belongsTo(PostTopic, { foreignKey: "topic" });
PostTopic.hasMany(Post, { foreignKey: "topic" });
// Post.belongsTo(User, { foreignKey: "user_id" });
// User.hasMany(Post, { foreignKey: "user_id" });

module.exports = Post;
