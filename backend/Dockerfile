# DOCKERFILE HOÀN HẢO CHO DỰ ÁN CỦA BẠN
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package trước để tận dụng cache
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Cài dependencies
RUN npm ci --only=production
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci --only=production

# Copy toàn bộ code
COPY . .

# Tạo thư mục uploads (nếu bạn có upload ảnh sau này)
RUN mkdir -p frontend/public/uploads

# Mở port
EXPOSE 3000

# Chạy server
CMD ["node", "backend/server.js"]