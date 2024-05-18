const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");
const Media = require("./Media");

const baby_videos = sequelize.define(
  "baby_videos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    youtube_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // You might want to add a reference to another table here, if 'media' refers to another table's primary key
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, // Assuming this can be NULL initially
    },
  },
  {
    // Other options for the model
    tableName: "baby_videos", // Specify your table name here
    timestamps: true,
  }
);

baby_videos.belongsTo(Media, { as: "media", foreignKey: "image" });

module.exports = baby_videos;
