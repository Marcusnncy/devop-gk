const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('home', { 
      products,
      user: req.session.user,
      success: req.flash('success')[0],
      error: req.flash('error')[0],
      showAddForm: false,
      editProduct: null
    });
  } catch (err) {
    req.flash('error', 'Lỗi tải sản phẩm');
    res.redirect('/');
  }
};

// THÊM MỚI – HIỆN FORM
exports.addProductPage = (req, res) => {
  res.render('home', { 
    products: [], 
    user: req.session.user,
    showAddForm: true,     // ← BẬT FORM THÊM
    editProduct: null
  });
};

// SỬA – HIỆN FORM + ĐỔ DỮ LIỆU CŨ
exports.editProductPage = async (req, res) => {
  try {
    const editProduct = await Product.findById(req.params.id).lean();
    if (!editProduct) {
      req.flash('error', 'Không tìm thấy sản phẩm!');
      return res.redirect('/admin/products');
    }
    const products = await Product.find().lean();
    res.render('home', { 
      products, 
      user: req.session.user,
      showAddForm: false,
      editProduct                 // ← ĐỔ DỮ LIỆU CŨ VÀO FORM
    });
  } catch (err) {
    req.flash('error', 'Lỗi!');
    res.redirect('/admin/products');
  }
};

// LƯU (CẢ THÊM VÀ SỬA)
exports.addEditProduct = async (req, res) => {
  const { id, name, price, image, description } = req.body;
  try {
    if (id) {
      await Product.findByIdAndUpdate(id, { name, price: Number(price), image, description });
      req.flash('success', 'Cập nhật thành công!');
    } else {
      await Product.create({ name, price: Number(price), image, description });
      req.flash('success', 'Thêm sản phẩm thành công!');
    }
  } catch (err) {
    req.flash('error', 'Lỗi lưu: ' + err.message);
  }
  res.redirect('/admin/products');
};

// XÓA (đã chạy được rồi, giữ nguyên)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success', 'Xóa thành công!');
  } catch (err) {
    req.flash('error', 'Lỗi xóa!');
  }
  res.redirect('/admin/products');
};

// Thêm vào adminController.js
exports.dashboard = (req, res) => {
  res.render('home', {
    products: [],
    user: req.session.user,
    success: req.flash('success')[0],
    error: req.flash('error')[0],
    showAddForm: false,
    editProduct: null,
    pageTitle: "ADMIN PANEL - LADY MODE"
  });
};