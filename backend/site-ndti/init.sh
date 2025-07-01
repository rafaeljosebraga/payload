#!/bin/sh

# Script de inicialização para garantir que o banco esteja sincronizado
echo "Verificando banco de dados..."

# Se o banco não existir ou estiver vazio, executa as migrações
if [ ! -f "Payload.db" ] || [ ! -s "Payload.db" ]; then
    echo "Banco não encontrado ou vazio, executando migrações..."
    npx payload migrate
fi

# Gera os tipos sempre para garantir sincronia
echo "Gerando tipos do Payload..."
npm run generate:types

# Inicia a aplicação
echo "Iniciando aplicação..."
npm start
