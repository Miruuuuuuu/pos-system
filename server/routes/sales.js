const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

// Generate invoice number
const generateInvoiceNumber = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const count = await Sale.countDocuments() + 1;
  return `INV-${year}${month}-${String(count).padStart(5, '0')}`;
};

// Get all sales
router.get('/', protect, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (status) query.status = status;

    const sales = await Sale.find(query)
      .populate('customer', 'name phone')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single sale
router.get('/:id', protect, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('customer')
      .populate('createdBy', 'name');
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create sale
router.post('/', protect, async (req, res) => {
  try {
    const { customer, items, subtotal, tax, discount, totalAmount, paymentMethod } = req.body;

    // Validate stock availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productName} not found` });
      }
      if (product.stockQty < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    const invoiceNumber = await generateInvoiceNumber();
    const sale = await Sale.create({
      invoiceNumber,
      customer,
      items,
      subtotal,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      createdBy: req.user._id
    });

    // Update stock and customer
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockQty: -item.quantity }
      });
    }

    if (customer) {
      await Customer.findByIdAndUpdate(customer, {
        $inc: { totalPurchases: totalAmount, loyaltyPoints: Math.floor(totalAmount / 100) }
      });
    }

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
