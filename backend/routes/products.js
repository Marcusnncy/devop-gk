// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Trang chủ - hiển thị tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('index', { products });
  } catch (err) {
    req.flash('error', 'Lỗi tải sản phẩm');
    res.render('index', { products: [] });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    
    if (!product) {
      req.flash('error', 'Sản phẩm không tồn tại hoặc đã bị xóa!');
      return res.redirect('/');
    }

    res.render('product-detail', { product });
  } catch (err) {
    console.error("Lỗi chi tiết sản phẩm:", err);
    req.flash('error', 'Không tìm thấy sản phẩm!');
    res.redirect('/');
  }
});


module.exports = router;