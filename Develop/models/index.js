const { Sequelize, DataTypes } = require('sequelize');
console.log(process.env.DB_PASSWORD);  // Check if the password is logged correctly
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'postgres'
  }
);

// Import model files
const Category = require('./Category');
const Product = require('./product');
const Tag = require('./tag');
const ProductTag = require('./ProductTag');

// Initialize models
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
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'category'
});

Product.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { isDecimal: true }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: { isNumeric: true }
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: { model: 'category', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'product',
  freezeTableName: true,
  underscored: true
});

Tag.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'tag',
  freezeTableName: true,
  underscored: true
});

ProductTag.init({
  product_id: {
    type: DataTypes.INTEGER,
    references: { model: 'product', key: 'id' }
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: { model: 'tag', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'productTag',
  freezeTableName: true,
  underscored: true
});

// Define associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });

// Export all models and Sequelize instance
module.exports = {
  sequelize,
  Category,
  Product,
  Tag,
  ProductTag
};
