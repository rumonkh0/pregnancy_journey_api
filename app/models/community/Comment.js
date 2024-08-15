const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance
const Reaction = require("./Reaction");
const Reply = require("./Reply");
const User = require("../User");
const Media = require("../Media");

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
      allowNull: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_reaction: {
      type: DataTypes.INTEGER,
    },
    total_comment: {
      type: DataTypes.INTEGER,
    },
    total_report: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.INTEGER,
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
        post_id = comment.post_id;
        comment_id = comment.comment_id;
        comment.post_id
          ? await getTotalComment(post_id, "post")
          : await getTotalComment(comment_id, "comment");
      },
      afterSave: async (comment) => {
        // console.log(comment);
        post_id = comment.post_id;
        comment_id = comment.comment_id;
        comment.post_id
          ? await getTotalComment(post_id, "post")
          : await getTotalComment(comment_id, "comment");
      },
    },
  }
);

// Method to get average tuition cost for a bootcamp and update the Bootcamp model
const getTotalComment = async (post_id, type) => {
  try {
    // Calculate average cost using Sequelize's aggregation functions

    const query = {
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total_comment"],
      ],
      raw: true,
    };
    type == "post"
      ? (query["where"] = { post_id: post_id })
      : (query["where"] = { comment_id: post_id });

    const result = await Comment.findOne(query);

    // Update averageCost field in Bootcamp model
    // console.log(type);
    type == "post"
      ? await sequelize.models.Post.update(
          { total_comment: result.total_comment },
          { where: { id: post_id } }
        )
      : await sequelize.models.Comment.update(
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
Comment.belongsTo(Media, { foreignKey: "image", as: "media" });
module.exports = Comment;
