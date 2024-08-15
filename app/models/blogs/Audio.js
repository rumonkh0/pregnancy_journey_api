const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const Media = require("../Media");

const Audio = sequelize.define(
  "audio",
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
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
  },
  {
    tableName: "audio", 
    timestamps: true,
  }
);

Audio.belongsTo(Media, { as: "media", foreignKey: "image" });

module.exports = Audio;
