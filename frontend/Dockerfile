FROM node:20-alpine

WORKDIR /app

# Copy và cài backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy toàn bộ code
COPY . .

# Tạo thư mục uploads
RUN mkdir -p frontend/public/uploads

EXPOSE 3000

WORKDIR /app/backend
CMD ["node", "server.js"]