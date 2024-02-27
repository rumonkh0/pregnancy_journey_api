const { DataTypes, Sequelize } = require("sequelize");
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
        post_id = reaction.post_id;
        await getTotalReaction(post_id);
      },
      afterSave: async (reaction) => {
        post_id = reaction.post_id;
        await getTotalReaction(post_id);
      },
    },
  }
);

// Method to get average tuition cost for a bootcamp and update the Bootcamp model
const getTotalReaction = async (post_id) => {
  try {
    // Calculate average cost using Sequelize's aggregation functions
    const result = await Reaction.findOne({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("type")), "total_reaction"],
      ],
      where: { post_id },
      raw: true,
    });

    console.log(result);

    // Update averageCost field in Bootcamp model
    await sequelize.models.Post.update(
      { total_reaction: result.total_reaction },
      { where: { id: post_id } }
    );

    console.log("Total reaction updated successfully");
  } catch (err) {
    console.error("Error updating reaction:", err);
  }
};

module.exports = Reaction;
