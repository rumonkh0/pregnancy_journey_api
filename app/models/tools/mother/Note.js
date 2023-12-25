const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const Note = sequelize.define('note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'notes',
  timestamps: true,
});

// Define associations or additional configurations here if needed

module.exports = Note;
