// backend/controllers/productController.js
const Product = require('../models/Product');

exports.homepage = async (req, res) => {
  const products = await Product.find().lean();
  res.render('index', { products });
};

exports.productDetail = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    req.flash('error', 'Sản phẩm không tồn tại');
    return res.redirect('/');
  }
  res.render('product-detail', { product });
};