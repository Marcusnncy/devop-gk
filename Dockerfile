# DOCKERFILE HOÀN HẢO NHẤT 2025 – CHẠY 100% DÙ CÓ/KHÔNG CÓ frontend/package.json
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Tạo thư mục cần thiết trước
RUN mkdir -p backend frontend/public/uploads

# Copy package.json backend (bắt buộc)
COPY backend/package*.json ./backend/

# Cài dependencies backend
WORKDIR /app/backend
RUN npm install --production

# Copy toàn bộ source code (bao gồm cả frontend dù có package.json hay không)
WORKDIR /app
COPY . .

# Nếu frontend có package.json → tự động cài, không có thì bỏ qua (không lỗi!)
WORKDIR /app/frontend
RUN if [ -f "package.json" ] || [ -f "package-lock.json" ]; then \
      echo "Tìm thấy frontend/package.json → đang cài dependencies..." && \
      npm install --production; \
    else \
      echo "Không có frontend/package.json → bỏ qua (dự án EJS thuần, không cần cài)"; \
    fi

# Quay lại backend để chạy server
WORKDIR /app/backend

# Mở port
EXPOSE 3000

# Chạy server
CMD ["node", "server.js"]