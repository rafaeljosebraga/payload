# 📋 **Guia de Instalação e Execução - Aplicação Docker**

Este documento contém instruções completas para executar a aplicação usando Docker em Windows, macOS e Linux.

## 🏗️ **Arquitetura da Aplicação**

A aplicação é composta por dois serviços:

- **Frontend**: React + Vite servido via Nginx (porta 8080)
- **Backend**: Next.js + Payload CMS (porta 3000)

## 🔧 **Pré-requisitos**

### **Windows**

```bash
# Opção 1: Docker Desktop (Recomendado)
# 1. Baixar Docker Desktop: https://www.docker.com/products/docker-desktop
# 2. Instalar e reiniciar o sistema
# 3. Abrir Docker Desktop e aguardar inicialização

# Opção 2: Via Chocolatey
choco install docker-desktop

# Verificar instalação
docker --version
docker-compose --version
```

### **macOS**

```bash
# Opção 1: Docker Desktop (Recomendado)
# 1. Baixar Docker Desktop: https://www.docker.com/products/docker-desktop
# 2. Arrastar para pasta Applications
# 3. Abrir Docker Desktop

# Opção 2: Via Homebrew
brew install --cask docker

# Verificar instalação
docker --version
docker-compose --version
```

### **Linux (Ubuntu/Debian)**

```bash
# Atualizar repositórios
sudo apt update

# Instalar dependências
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Adicionar chave GPG do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Adicionar usuário ao grupo docker (opcional)
sudo usermod -aG docker $USER

# Verificar instalação
docker --version
docker compose version
```

### **Linux (CentOS/RHEL/Fedora)**

```bash
# CentOS/RHEL
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Fedora
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Iniciar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verificar instalação
docker --version
docker compose version
```

---

## 🚀 **Executando a Aplicação**

### **1. Clonando o Projeto**

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>

# Navegar para a pasta do Docker
cd payload
```

### **2. Configuração (Primeira Execução)**

```bash
# Verificar se o Docker está rodando
docker info

# Se não estiver rodando:
# Windows/Mac: Abrir Docker Desktop
# Linux: sudo systemctl start docker
```

### **3. Executando a Aplicação**

**🎯 Comando Recomendado (Build + Run + Background):**

```bash
docker-compose up --build -d (macOS)
docker compose up --build -d (linux)
```

**🔄 Primeira Execução ou com Mudanças no Código:**

```bash
docker-compose up --build
```

**⚡ Execução Rápida (sem rebuild):**

```bash
docker-compose up
```

**🔧 Execução em Background (Detached):**

```bash
docker-compose up -d
```

**💡 Observação Importante:**

- Use `docker-compose up --build -d` quando quiser reconstruir e executar em background
- Se os containers já estiverem rodando, o comando `docker-compose up` apenas se anexará aos logs existentes
- Isso pode parecer "lento" mas na verdade está apenas mostrando os logs em tempo real
- Para verificar se está funcionando, acesse <http://localhost:8080> e <http://localhost:3000>
- O `-d` (detached) executa em background, liberando o terminal para outros comandos

### **4. Verificando se está Funcionando**

**✅ Verificar Status dos Containers:**

```bash
docker-compose ps
```

**📋 Ver Logs dos Serviços:**

```bash
# Todos os logs
docker-compose logs

# Logs do frontend apenas
docker-compose logs frontend

# Logs do backend apenas
docker-compose logs backend

# Logs em tempo real
docker-compose logs -f
```

**🌐 Acessar a Aplicação:**

- **Frontend (React):** <http://localhost:8080>
- **Backend/Admin (Payload CMS):** <http://localhost:3000>

### **5. Parando a Aplicação**

**🛑 Parar Containers (mantém dados):**

```bash
docker-compose stop
```

**🗑️ Parar e Remover Containers:**

```bash
docker-compose down
```

**🧹 Limpeza Completa (remove volumes/dados):**

```bash
docker-compose down -v
```

---

## 🔧 **Comandos Úteis para Desenvolvimento**

### **Rebuild Forçado:**

```bash
# Rebuild sem cache
docker-compose build --no-cache

# Up com rebuild forçado em background (recomendado)
docker-compose up --build --force-recreate -d

# Up com rebuild forçado (com logs visíveis)
docker-compose up --build --force-recreate
```

### **Executar Comandos nos Containers:**

```bash
# Entrar no container do backend
docker-compose exec backend sh

# Entrar no container do frontend
docker-compose exec frontend sh

# Executar comando específico
docker-compose exec backend npm install nova-dependencia
```

### **Logs Específicos:**

```bash
# Logs com timestamp
docker-compose logs -t

# Últimas 50 linhas
docker-compose logs --tail=50

# Logs de um serviço específico
docker-compose logs frontend
```

### **Gerenciamento de Volumes:**

```bash
# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect payload_db_data
```

---

## 🐛 **Resolução de Problemas Comuns**

### **Problema: "Cannot connect to Docker daemon"**

```bash
# Windows/Mac: Verificar se Docker Desktop está rodando
# Linux: Iniciar serviço Docker
sudo systemctl start docker
```

### **Problema: "Port already in use"**

```bash
# Verificar o que está usando a porta
# Windows:
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :8080
lsof -i :3000

# Matar processo usando a porta
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### **Problema: "No space left on device"**

```bash
# Limpar containers e imagens não utilizadas
docker system prune -a

# Limpar volumes não utilizados
docker volume prune
```

### **Problema: Build muito lento**

```bash
# Usar cache do Docker
docker-compose build

# Verificar se o .dockerignore está configurado corretamente
```

---

## 📝 **Estrutura do Projeto**

```
payload/
├── Dockerfile                 # Frontend (React + Vite)
├── docker-compose.yml         # Orquestração dos serviços
├── backend/
│   └── site-ndti/
│       ├── Dockerfile          # Backend (Next.js + Payload)
│       ├── package.json
│       └── .env
└── src/                       # Código fonte do frontend
```

---

## 🎯 **Resumo dos Comandos Essenciais**

```bash
# 1. COMANDO RECOMENDADO (Build + Background)
docker-compose up --build -d

# 2. PRIMEIRA EXECUÇÃO OU MUDANÇAS (com logs visíveis)
docker-compose up --build

# 3. EXECUÇÕES SUBSEQUENTES  
docker-compose up

# 4. PARAR APLICAÇÃO
docker-compose down

# 5. VER STATUS
docker-compose ps

# 5. VER LOGS
docker-compose logs

# 6. LIMPEZA COMPLETA
docker-compose down -v && docker system prune -a

# 7. SEMEAR BANCO DE DADOS
docker-compose exec -T postgres psql -U payload payload < seed.sql
```

---

## 📊 **Logs de Sucesso Esperados**

Quando a aplicação estiver funcionando corretamente, você verá:

### Frontend

```
⚡ Frontend (Vite + React)
- Local:        http://localhost:8080
- Network:      http://0.0.0.0:80

✓ Frontend ready and serving on port 80
```

### Backend

```
▲ Next.js 15.3.0
- Local:        http://localhost:3000
- Network:      http://172.18.0.3:3000

✓ Ready in 680ms
```

---

## 🤝 **Contribuindo**

Para contribuir com o projeto:

1. Faça as alterações necessárias
2. Teste localmente com `docker-compose up --build -d`
3. Verifique se ambos os serviços estão funcionando (`docker-compose ps`)
4. Verifique os logs se necessário (`docker-compose logs`)
5. Faça commit das alterações

---

## 📞 **Suporte**

Se encontrar problemas:

1. Verifique se o Docker está instalado e rodando
2. Confirme que as portas 3000 e 8080 estão livres
3. Execute `docker-compose logs` para ver os erros
4. Tente a limpeza completa: `docker-compose down -v && docker system prune -a`

---










# Criar uma nova migration
docker compose exec payload npm run payload migrate:create

# Aplicar migrations pendentes
docker compose exec payload npm run payload migrate

# Ver status das migrations
docker compose exec payload npm run payload migrate:status

# Gerar schema do banco
docker compose exec payload npm run payload generate:db-schema

# Gerar tipos TypeScript
docker compose exec payload npm run generate:types

# Conectar ao PostgreSQL
docker compose exec postgres psql -U payload -d payload

# Ver tabelas
\dt

*Última atualização: 8 de julho de 2025*
