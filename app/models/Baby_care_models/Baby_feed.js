const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");
const BabyList = require("../Baby");

const BabyFeed = sequelize.define(
  "baby_feed",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    baby_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    feed_type: {
      type: DataTypes.ENUM("breast", "bottle", "solid"),
      allowNull: false,
    },
    let_duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    right_duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    total_duration: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bottle_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    solid_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    solid_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "gram",
    },
    feed_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "baby_feed",
    timestamps: true,
    comment: "ml",
  }
);

// BabyFeed.belongsTo(BabyList, {
//   foreignKey: "baby_id",
//   onDelete: "CASCADE",
// });

module.exports = BabyFeed;
