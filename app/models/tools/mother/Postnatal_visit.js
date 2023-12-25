const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");


const PostnatalVisit = sequelize.define('postnatal_visit', {
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
  visit_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  doctor_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  visit_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hospital_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  receptionist: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  mobile: {
    type: DataTypes.BIGINT, // Using BIGINT for a larger integer
    allowNull: false,
  },
  visit_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'postnatal_visit',
  timestamps: true,
});

// Define associations or additional configurations here if needed

module.exports = PostnatalVisit;
