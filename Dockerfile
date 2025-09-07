# Dockerfile para desenvolvimento com hot reload
FROM node:22-alpine

# Instalar dependências do sistema
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package.json ./

# Instalar dependências com npm (vai gerar package-lock.json)
RUN npm install

# Copiar o código fonte
COPY . .

# Expor a porta
EXPOSE 8080

# Comando para desenvolvimento com hot reload
CMD ["npm", "run", "dev"]