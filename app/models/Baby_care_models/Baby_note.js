const { DataTypes } = require("sequelize");
const Baby = require("../Baby");
const { sequelize } = require("../../../config/db");

const BabyNote = sequelize.define(
  "baby_notes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    baby_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    note_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    note_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "baby_feed",
    timestamps: true,
  }
);

BabyNote.belongsTo(Baby, {
  foreignKey: "baby_id",
  onDelete: "CASCADE",
});

module.exports = BabyNote;
