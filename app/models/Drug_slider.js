const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Media = require("./Media");

const DrugSlider = sequelize.define('drug_slider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  media: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING(255),
    defaultValue: null,
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
  tableName: 'drug_slider',
  timestamps: true,
});

// Define associations
DrugSlider.belongsTo(Media, { foreignKey: 'media' }); // Assuming you have a 'Media' model

module.exports = DrugSlider;
