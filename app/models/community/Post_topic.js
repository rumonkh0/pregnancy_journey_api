const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Media = require("../Media");

// Define your model
const PostTopic = sequelize.define(
  "PostTopic",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Assuming description can be null
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false, // Assuming image path is required
    },
  },
  {
    tableName: "post_topic", // Define table name explicitly
    timestamps: false, // Set to true if you want timestamps
  }
);

// PostTopic.belongsTo(Media, { as: "media", foreignKey: "image" });
// Media.hasMany(PostTopic, { as: "media", foreignKey: "image" });

module.exports = PostTopic;
