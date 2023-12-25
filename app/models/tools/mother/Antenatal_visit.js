const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../../config/db");


const AntenatalVisit = sequelize.define('antenatal_visit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  tableName: 'antenatal_visit',
  timestamps: true,
});

// Define associations or additional configurations here if needed

module.exports = AntenatalVisit;
