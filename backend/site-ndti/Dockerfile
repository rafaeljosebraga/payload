# Backend Dockerfile for Next.js + Payload
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy built application
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/src ./src

# Copy database and env files
COPY Payload.db* ./
COPY .env* ./
COPY init.sh ./

# Tornar o script executável
RUN chmod +x init.sh

EXPOSE 3000
CMD ["./init.sh"]
