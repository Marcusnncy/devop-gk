// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: "iPhone 16 Pro Max 256GB", price: 34990000, image: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-16-pro-max-den-1.jpg", description: "Siêu phẩm 2025, camera 48MP" },
  { name: "iPhone 16 Pro 128GB", price: 28990000, image: "https://cdn.tgdd.vn/Products/Images/42/305657/iphone-16-pro-natural-titanium-1.jpg", description: "Titan siêu nhẹ, màn hình 120Hz" },
  { name: "iPhone 16 128GB", price: 22990000, image: "https://cdn.tgdd.vn/Products/Images/42/326954/iphone-16-plus-den-1.jpg", description: "Màu mới, camera 48MP" },
  { name: "Samsung Galaxy S24 Ultra", price: 33990000, image: "https://cdn.tgdd.vn/Products/Images/42/309722/samsung-galaxy-s24-ultra-1-600x600.jpg", description: "Camera 200MP, bút S-Pen" },
  { name: "Samsung Galaxy Z Fold 6", price: 44990000, image: "https://cdn.tgdd.vn/Products/Images/42/312131/samsung-galaxy-z-fold6-xanhla-1.jpg", description: "Màn hình gập 7.6 inch" },
  { name: "Samsung Galaxy Z Flip 6", price: 28990000, image: "https://cdn.tgdd.vn/Products/Images/42/312132/samsung-galaxy-z-flip6-tim-1.jpg", description: "Thiết kế gập nhỏ gọn" },
  { name: "MacBook Air M3 13 inch", price: 28990000, image: "https://cdn.tgdd.vn/Products/Images/44/302534/apple-macbook-air-m3-2024-1.jpg", description: "Pin 18 tiếng, siêu mỏng nhẹ" },
  { name: "MacBook Pro M3 Pro 14 inch", price: 48990000, image: "https://cdn.tgdd.vn/Products/Images/44/302535/macbook-pro-14-m3-pro-2023-1.jpg", description: "Màn hình mini-LED" },
  { name: "MacBook Pro M3 Max 16 inch", price: 78990000, image: "https://cdn.tgdd.vn/Products/Images/44/302536/macbook-pro-16-m3-max-2023-1.jpg", description: "Hiệu năng khủng cho dân pro" },
  { name: "AirPods Pro 2 USB-C", price: 6490000, image: "https://cdn.tgdd.vn/Products/Images/54/309612/apple-airpods-pro-2-usb-c-1.jpg", description: "Chống ồn x2, sạc USB-C" },
  { name: "AirPods Max", price: 12990000, image: "https://cdn.tgdd.vn/Products/Images/54/236016/airpods-max-xanh-la-1.jpg", description: "Tai nghe over-ear cao cấp" },
  { name: "Sony WH-1000XM5", price: 8490000, image: "https://cdn.tgdd.vn/Products/Images/54/250629/tai-nghe-chup-tai-sony-wh1000xm5-1-600x600.jpg", description: "Vua chống ồn 2025" },
  { name: "Apple Watch Ultra 2", price: 21990000, image: "https://cdn.tgdd.vn/Products/Images/7077/309810/apple-watch-ultra-2-49mm-vien-titanium-day-cao-su-xanh-1.jpg", description: "Lặn 40m, pin 36 tiếng" },
  { name: "Apple Watch Series 10", price: 11990000, image: "https://cdn.tgdd.vn/Products/Images/7077/326993/apple-watch-series-10-46mm-vien-nhom-day-cao-su-hong-1.jpg", description: "Mỏng nhất từ trước đến nay" },
  { name: "iPad Pro M4 11 inch", price: 28990000, image: "https://cdn.tgdd.vn/Products/Images/522/314757/ipad-pro-m4-11-inch-2024-wifi-1.jpg", description: "Chip M4, màn hình OLED" }
];

mongoose.connect('mongodb+srv://ky:Qo01Ow7hH2yv2n64@cluster0.axf0f.mongodb.net/')
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("ĐÃ THÊM THÀNH CÔNG 15 SẢN PHẨM MẪU VÀO MONGODB ATLAS CỦA BẠN!");
    console.log("Vào http://localhost:3000 để xem ngay – đẹp lung linh luôn!");
    process.exit();
  })
  .catch(err => {
    console.log("LỖI KẾT NỐI DB:", err.message);
    process.exit();
  });