const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance
const Post = require("./Post");
const Reaction = require("./Reaction");
const Reply = require("./Reply");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "createdAt", // Optional: Specify the field name in the database
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updatedAt", // Optional: Specify the field name in the database
    },
  },
  {
    tableName: "Comments", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
  }
);

Comment.hasMany(Reaction, { foreignKey: "comment_id", onDelete: "CASCADE" });
Comment.hasMany(Reply, { foreignKey: "comment_id", onDelete: "CASCADE" });
module.exports = Comment;
