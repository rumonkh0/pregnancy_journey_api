const { sequelize } = require("../../../config/db");
const { DataTypes } = require("sequelize");
const Media = require("../Media");

const SizeCpmpareImage = sequelize.define(
  "SizeCpmpareImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    compare_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "size_compare_images",
    timestamps: false,
  }
);

SizeCpmpareImage.belongsTo(Media, { foreignKey: "image", as: "media" });

module.exports = SizeCpmpareImage;
