const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

// Dashboard stats
router.get('/dashboard', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = await Sale.aggregate([
      { $match: { createdAt: { $gte: today }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);

    const lowStockProducts = await Product.countDocuments({
      $expr: { $lte: ['$stockQty', '$minStockLevel'] }
    });

    const topProducts = await Sale.aggregate([
      { $match: { status: 'completed' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.productName', totalQty: { $sum: '$items.quantity' }, totalRevenue: { $sum: '$items.total' } } },
      { $sort: { totalQty: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      todaySales: todaySales[0] || { total: 0, count: 0 },
      lowStockProducts,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sales report
router.get('/sales', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    
    let matchStage = { status: 'completed' };
    if (startDate && endDate) {
      matchStage.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sales = await Sale.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $dateToString: { format: groupBy === 'month' ? '%Y-%m' : '%Y-%m-%d', date: '$createdAt' }
          },
          totalSales: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Product performance
router.get('/products', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const products = await Sale.aggregate([
      { $match: { status: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          productName: { $first: '$items.productName' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' },
          avgPrice: { $avg: '$items.price' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
