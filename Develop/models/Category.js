const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); // Adjust the path as necessary.

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'category',
  timestamps: false,
    freezeTableName: true,
    underscored: true,
});

module.exports = Category;
