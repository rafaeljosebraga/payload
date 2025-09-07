# Dockerfile para Payload com hot reload
FROM node:22-slim

# Instalar dependências do sistema necessárias para compilar módulos nativos
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package.json ./

# Instalar dependências com npm (vai gerar package-lock.json)
RUN npm install

# Copiar o código fonte
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para desenvolvimento com hot reload
CMD ["npm", "run", "dev"]