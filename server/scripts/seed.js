const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pos-system');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@pos.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create sample products
    const products = [
      { name: 'Laptop', sku: 'LAP001', category: 'Electronics', price: 999.99, costPrice: 750, stockQty: 15, minStockLevel: 5 },
      { name: 'Mouse', sku: 'MOU001', category: 'Electronics', price: 29.99, costPrice: 15, stockQty: 50, minStockLevel: 10 },
      { name: 'Keyboard', sku: 'KEY001', category: 'Electronics', price: 79.99, costPrice: 45, stockQty: 30, minStockLevel: 10 },
      { name: 'Monitor', sku: 'MON001', category: 'Electronics', price: 299.99, costPrice: 200, stockQty: 8, minStockLevel: 5 },
      { name: 'USB Cable', sku: 'USB001', category: 'Accessories', price: 9.99, costPrice: 3, stockQty: 100, minStockLevel: 20 }
    ];
    await Product.insertMany(products);

    // Create sample customers
    const customers = [
      { name: 'John Doe', email: 'john@example.com', phone: '555-0101', address: '123 Main St' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', address: '456 Oak Ave' },
      { name: 'Bob Johnson', phone: '555-0103', address: '789 Pine Rd' }
    ];
    await Customer.insertMany(customers);

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@pos.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
