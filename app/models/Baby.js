const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const BabyBreastPumping = require("./Baby_care_models/Baby_breast_pumping");
const BabyDiaper = require("./Baby_care_models/Baby_diaper");
const BabyFeed = require("./Baby_care_models/Baby_feed");
const BabyMedication = require("./Baby_care_models/Baby_medication");
const BabyNote = require("./Baby_care_models/Baby_note");
const BabySleep = require("./Baby_care_models/Baby_sleep");
const BabySymptom = require("./Baby_care_models/Baby_symptom");
const BabyTemperature = require("./Baby_care_models/Baby_temperature");
const User = require("./User");
const Media = require("./Media");

const BabyList = sequelize.define(
  "BabyList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    mother_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    baby_serial: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "male=1 female=2",
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_move: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_heartbeat: {
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
    tableName: "baby_list", // Set the table name if different
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

// Define associations
BabyList.hasMany(BabySleep, { foreignKey: "baby_id" });
BabyList.hasMany(BabyDiaper, { foreignKey: "baby_id" });
BabyList.hasMany(BabyNote, { foreignKey: "baby_id" });
BabyList.hasMany(BabyFeed, { foreignKey: "baby_id" });
BabyList.hasMany(BabyMedication, { foreignKey: "baby_id" });
BabyList.hasMany(BabySymptom, { foreignKey: "baby_id" });
BabyList.hasMany(BabyTemperature, { foreignKey: "baby_id" });
BabyList.hasMany(BabyBreastPumping, { foreignKey: "baby_id" });
BabyList.belongsTo(Media, { as: "media", foreignKey: "photo" });

module.exports = BabyList;
