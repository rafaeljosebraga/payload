#!/bin/sh

# Script de inicialização para PostgreSQL
echo "Verificando conexão com PostgreSQL..."

# Aguardar PostgreSQL estar disponível
echo "Aguardando PostgreSQL estar disponível..."
until nc -z postgres 5432; do
  echo "PostgreSQL não está pronto - aguardando..."
  sleep 2
done

echo "PostgreSQL está disponível!"

# Executar migrações
echo "Executando migrações do Payload..."
npx payload migrate

# Gerar tipos
echo "Gerando tipos do Payload..."
npm run generate:types

# Iniciar aplicação
echo "Iniciando aplicação..."
npm start