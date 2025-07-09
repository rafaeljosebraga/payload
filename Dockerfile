# Frontend Dockerfile for Vite + React project
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Serve built assets with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Create a startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "   ⚡ Frontend (Vite + React)"' >> /start.sh && \
    echo 'echo "   - Local:        http://localhost:8080"' >> /start.sh && \
    echo 'echo "   - Network:      http://0.0.0.0:80"' >> /start.sh && \
    echo 'echo ""' >> /start.sh && \
    echo 'echo " ✓ Frontend ready and serving on port 80"' >> /start.sh && \
    echo 'echo ""' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
