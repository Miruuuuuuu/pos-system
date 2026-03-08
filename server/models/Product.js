const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  costPrice: { type: Number, default: 0 },
  stockQty: { type: Number, default: 0 },
  minStockLevel: { type: Number, default: 10 },
  imageUrl: { type: String },
  barcode: { type: String },
  supplier: { type: String },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
