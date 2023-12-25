const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");

const MotherMoodTracker = sequelize.define('mother_mood_tracker', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  mood_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  current_mood: {
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
}, {
  tableName: 'mother_mood_trackers',
  timestamps: true,
});

// Define associations or additional configurations here if needed

module.exports = MotherMoodTracker;
