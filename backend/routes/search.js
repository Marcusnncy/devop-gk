// backend/routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Trang kết quả tìm kiếm
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q?.trim();
    
    let products = [];
    let searchMessage = "";

    if (query && query.length > 0) {
      // Tìm kiếm không phân biệt hoa thường, tìm trong tên và mô tả
      const regex = new RegExp(query, 'i');
      products = await Product.find({
        $or: [
          { name: regex },
          { description: regex }
        ]
      }).lean();

      searchMessage = products.length > 0 
        ? `Tìm thấy <strong>${products.length}</strong> sản phẩm cho "<strong>${query}</strong>"`
        : `Không tìm thấy sản phẩm nào cho "<strong>${query}</strong>"`;
    } else {
      searchMessage = "Vui lòng nhập từ khóa để tìm kiếm";
    }

    res.render('search', {
      products,
      query: query || "",
      searchMessage,
      cartCount: req.session.cart ? req.session.cart.length : 0
    });

  } catch (err) {
    console.error("Lỗi tìm kiếm:", err);
    res.render('search', {
      products: [],
      query: "",
      searchMessage: "Đã có lỗi xảy ra khi tìm kiếm",
      cartCount: 0
    });
  }
});

module.exports = router;