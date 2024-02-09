const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Admin = require("./Admin");

const HelpDesk = sequelize.define(
  "help_desk",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming a help desk message can be from a user or admin
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming a help desk message can be from a user or admin
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "help_desk",
    timestamps: true,
  }
);

HelpDesk.belongsTo(User, { foreignKey: "user_id" });
HelpDesk.belongsTo(Admin, { foreignKey: "admin_id" });

module.exports = HelpDesk;
