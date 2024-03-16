const { DataTypes, Sequelize, where } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance
const Post = require("./Post");

const Reaction = sequelize.define(
  "Reaction",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    comment_id: {
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
    tableName: "reactions", // Define table name explicitly
    timestamps: true, // Set to true if you want timestamps
    hooks: {
      afterDestroy: async (reaction) => {
        console.log(reaction);
        post_id = reaction.where.post_id;
        comment_id = reaction.comment_id;
        post_id
          ? await getTotalReaction(post_id, "post")
          : await getTotalReaction(comment_id, "comment");
      },
      afterSave: async (reaction) => {
        console.log(reaction);
        post_id = reaction.post_id;
        comment_id = reaction.comment_id;
        post_id
          ? await getTotalReaction(post_id, "post")
          : await getTotalReaction(comment_id, "comment");
      },
    },
  }
);

// Method to get average tuition cost for a bootcamp and update the Bootcamp model
const getTotalReaction = async (id, type) => {
  try {
    // Calculate average cost using Sequelize's aggregation functions
    const query = {
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("type")), "total_reaction"],
      ],
      raw: true,
    };
    type == "post"
      ? (query["where"] = { post_id: id })
      : (query["where"] = { comment_id: id });
    console.log(query);
    const result = await Reaction.findOne(query);

    // console.log(result);

    // Update averageCost field in Bootcamp model
    type == "post"
      ? await sequelize.models.Post.update(
          { total_reaction: result.total_reaction },
          { where: { id } }
        )
      : await sequelize.models.Comment.update(
          { total_reaction: result.total_reaction },
          { where: { id } }
        );

    // console.log("Total reaction updated successfully");
  } catch (err) {
    // console.error("Error updating reaction:", err);
  }
};

module.exports = Reaction;
