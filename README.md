# Site NDTI - Sistema de Gestão de Conteúdo

Este repositório contém o site institucional do NDTI (Núcleo de Desenvolvimento de Tecnologia da Informação), desenvolvido com uma arquitetura moderna de frontend/backend usando React, Vite, PayloadCMS e Next.js.

## 🏗️ Arquitetura do Projeto

O projeto é estruturado em duas aplicações principais:

### Frontend (React + Vite + TypeScript)
- **Localização**: Pasta raiz (`/`)
- **Framework**: React 18 com Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **Roteamento**: React Router DOM
- **Estado**: TanStack Query para gerenciamento de dados
- **Porta**: 8080 (desenvolvimento)

### Backend (PayloadCMS + Next.js)
- **Localização**: `/backend/site-ndti/`
- **CMS**: PayloadCMS 3.x
- **Framework**: Next.js 15
- **Banco de Dados**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **Porta**: 3000

## 🚀 Funcionalidades

### Frontend
- ✅ **Página Inicial**: Hero section, carousel de notícias, sobre, projetos, equipe e contato
- ✅ **Novidades**: Listagem e detalhes de notícias
- ✅ **Projetos**: Showcase de projetos com detalhes
- ✅ **Equipamentos**: Catálogo de equipamentos
- ✅ **Equipe**: Apresentação da equipe
- ✅ **Sobre NDTI**: Informações institucionais
- ✅ **Design Responsivo**: Interface adaptável para todos os dispositivos
- ✅ **Tema Escuro/Claro**: Toggle de tema
- ✅ **Animações**: Intersection Observer para scroll animations

### Backend (CMS)
- ✅ **Gestão de Usuários**: Sistema de autenticação e autorização
- ✅ **Gestão de Mídia**: Upload e organização de imagens/arquivos
- ✅ **Gestão de Notícias**: CRUD completo de notícias
- ✅ **Gestão de Projetos**: Administração de projetos
- ✅ **Gestão de Equipe**: Cadastro de membros da equipe
- ✅ **API REST/GraphQL**: Endpoints automáticos gerados pelo Payload
- ✅ **Interface em Português**: Localização PT-BR

## 🛠️ Stack Tecnológica

### Frontend
```json
{
  "framework": "React 18 + Vite",
  "linguagem": "TypeScript",
  "ui": "Tailwind CSS + shadcn/ui",
  "icons": "Lucide React",
  "forms": "React Hook Form + Zod",
  "routing": "React Router DOM",
  "data-fetching": "TanStack Query",
  "animations": "Tailwind CSS + CSS Animations"
}
```

### Backend
```json
{
  "cms": "PayloadCMS 3.40.0",
  "framework": "Next.js 15",
  "linguagem": "TypeScript",
  "database": "SQLite (dev) / PostgreSQL (prod)",
  "editor": "Lexical Editor",
  "auth": "Payload Auth",
  "api": "REST + GraphQL"
}
```

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js >= 18.20.2 ou >= 20.9.0
- Bun ou npm/yarn/pnpm
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd payload
```

### 2. Configuração do Frontend

```bash
# Instalar dependências
bun install

# Iniciar servidor de desenvolvimento
bun run dev
```

O frontend estará disponível em: `http://localhost:8080`

### 3. Configuração do Backend

```bash
# Navegar para o diretório do backend
cd backend/site-ndti

# Instalar dependências
npm install
# ou
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` no diretório `backend/site-ndti/`:

```env
# Payload
PAYLOAD_SECRET=sua-chave-secreta-aqui
DATABASE_URL=file:./site-ndti.db

# Para produção com PostgreSQL
# DATABASE_URI=postgresql://usuario:senha@localhost:5432/ndti

# Next.js
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### 5. Iniciar o Backend

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

O backend estará disponível em: `http://localhost:3000`
Admin Panel: `http://localhost:3000/admin`

## 🗄️ Estrutura do Banco de Dados

### Collections (PayloadCMS)

#### Users
- Usuários administrativos do sistema
- Campos: email, senha, roles

#### Media
- Gerenciamento de arquivos e imagens
- Campos: filename, alt, sizes, url

#### News
- Sistema de notícias/blog
- Campos: título, conteúdo, imagem, data, autor, status

#### Projects
- Portfolio de projetos
- Campos: nome, descrição, tecnologias, imagens, status

#### Team
- Membros da equipe
- Campos: nome, cargo, bio, foto, redes sociais

## 🔧 Scripts Disponíveis

### Frontend
```bash
bun run dev          # Servidor de desenvolvimento (porta 8080)
bun run build        # Build para produção
bun run build:dev    # Build modo desenvolvimento
bun run preview      # Preview do build
bun run lint         # Verificar código
```

### Backend
```bash
npm run dev          # Servidor de desenvolvimento (porta 3000)
npm run build        # Build para produção
npm run start        # Iniciar produção
npm run generate:types  # Gerar tipos TypeScript
npm run payload      # CLI do Payload
```

## 🚀 Deploy

### Frontend (Vercel/Netlify)
1. Build: `bun run build`
2. Pasta de saída: `dist/`
3. Configurar variável de ambiente: `VITE_API_URL=https://seu-backend.com`

### Backend (Railway/Heroku/VPS)
1. Configurar PostgreSQL
2. Definir variáveis de ambiente
3. Build: `npm run build`
4. Start: `npm start`

### Docker (Backend)
```bash
cd backend/site-ndti
docker-compose up -d
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Convenções de Código

- **Frontend**: ESLint + Prettier
- **Backend**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Branches**: GitFlow

## 🔒 Segurança

- Autenticação via PayloadCMS
- CORS configurado para desenvolvimento
- Sanitização de dados de entrada
- Validação com Zod (frontend)

## 📞 Suporte

Para dúvidas e suporte:
- **Email**: contato@ndti.com
- **Issues**: Use o sistema de issues do GitHub

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎯 Roadmap

- [ ] Sistema de autenticação no frontend
- [ ] Dashboard administrativo personalizado
- [ ] Sistema de comentários nas notícias
- [ ] Newsletter/mailing list
- [ ] Busca avançada
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados
- [ ] CI/CD com GitHub Actions

---

**Desenvolvido com ❤️ pela equipe NDTI**
