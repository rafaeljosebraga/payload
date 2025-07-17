# Dockerfile para desenvolvimento com hot reload
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte
COPY . .

# Expor a porta
EXPOSE 8080

# Comando para desenvolvimento com hot reload
CMD ["npm", "run", "dev"]