FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY backend/package.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-builder /app/frontend/build ./public
EXPOSE 8080
CMD ["node", "server.js"]