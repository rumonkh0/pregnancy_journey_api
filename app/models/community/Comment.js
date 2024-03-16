const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance
const Post = require("./Post");
const Reaction = require("./Reaction");
const Reply = require("./Reply");
const User = require("../User");

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
    total_reaction: {
      type: DataTypes.INTEGER,
    },
    total_comment: {
      type: DataTypes.INTEGER,
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
    tableName: "comments", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
    hooks: {
      afterDestroy: async (comment) => {
        console.log("comment");
        post_id = comment.post_id;
        await getTotalComment(post_id);
      },
      afterSave: async (comment) => {
        post_id = comment.post_id;
        await getTotalComment(post_id);
      },
    },
  }
);

// Method to get average tuition cost for a bootcamp and update the Bootcamp model
const getTotalComment = async (post_id) => {
  try {
    // Calculate average cost using Sequelize's aggregation functions
    const result = await Comment.findOne({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total_comment"],
      ],
      where: { post_id },
      raw: true,
    });

    // Update averageCost field in Bootcamp model
    await sequelize.models.Post.update(
      { total_comment: result.total_comment },
      { where: { id: post_id } }
    );

    console.log("Total comment updated successfully");
  } catch (err) {
    console.error("Error updating comment:", err);
  }
};

Comment.hasMany(Reaction, { foreignKey: "comment_id", onDelete: "CASCADE" });
Comment.hasMany(Reply, { foreignKey: "comment_id", onDelete: "CASCADE" });
module.exports = Comment;
