const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db"); // Replace with your Sequelize instance
const Reaction = require("./Reaction");

const ReactionType = sequelize.define(
  "ReactionType",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "reactiontypes", // Define table name explicitly
    timestamps: false, // Set to true if you want timestamps
  }
);

ReactionType.hasMany(Reaction, { foreignKey: "type", onDelete: "CASCADE" });
Reaction.belongsTo(ReactionType, { foreignKey: "type", onDelete: "CASCADE" });

module.exports = ReactionType;
