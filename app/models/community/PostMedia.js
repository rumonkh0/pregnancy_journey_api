const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Media = require("../Media");
const Post = require("./Post");

const PostMedia = sequelize.define(
  "PostMedia",
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "postmedia", // Define table name explicitly
    timestamps: false, // Set to true if you want timestamps
  }
);

// Define foreign key associations
// PostMedia.belongsTo(Post, { foreignKey: "post_id", onDelete: "CASCADE" });
// PostMedia.belongsTo(Media, { foreignKey: "media_id", onDelete: "CASCADE" });

module.exports = PostMedia;
