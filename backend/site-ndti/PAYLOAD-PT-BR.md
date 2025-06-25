# Payload CMS - Configuração em Português Brasileiro

## 📋 Resumo

O Payload CMS foi configurado para funcionar completamente em português brasileiro, incluindo:

- ✅ Interface do painel administrativo traduzida
- ✅ Labels de collections em português
- ✅ Labels de campos traduzidos
- ✅ Mensagens de erro e validação em português
- ✅ Formatação de datas em português brasileiro

## 🚀 Como Acessar

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   cd backend/site-ndti
   npm run dev
   ```

2. **Acesse o painel administrativo:**
   - URL: http://localhost:3000/admin
   - Crie sua conta de administrador no primeiro acesso

## 📊 Collections Disponíveis

### 1. **Usuários** (`users`)
- Gerenciamento de usuários do sistema
- Autenticação e autorização
- Campo principal: Email

### 2. **Mídias** (`media`)
- Upload e gerenciamento de arquivos
- Tipos suportados: Imagens
- Redimensionamento automático:
  - Thumbnail: 400x300px
  - Card: 768x1024px
  - Tablet: 1024px (largura)

### 3. **Notícias** (`news`)
- **Campos disponíveis:**
  - Título
  - Descrição
  - Conteúdo (array de parágrafos)
  - Imagem
  - Tipo (Edital, Evento, Projeto)
  - Data

### 4. **Projetos** (`projects`)
- **Campos disponíveis:**
  - Título
  - Categoria (Desenvolvimento Web, App Móvel, Plataforma Web, IoT & Software)
  - Imagem
  - Descrição
  - Tecnologias (array)
  - Descrição Longa (array de parágrafos)
  - Características (array)
  - Data de Início
  - Status
  - Equipe (array de membros)
  - Repositório

### 5. **Membros da Equipe** (`team`)
- **Campos disponíveis:**
  - Nome
  - Cargo/Função
  - Descrição
  - Foto
  - Email
  - LinkedIn URL
  - GitHub URL
  - Currículo Lattes URL
  - Habilidades (array)
  - Ativo (checkbox)
  - Ordem de Exibição

## 🛠️ Configurações Técnicas

### Tradução
- **Pacote utilizado:** `@payloadcms/translations`
- **Idioma configurado:** Português (pt)
- **Arquivo de configuração:** `src/payload.config.ts`

### Banco de Dados
- **Tipo:** SQLite
- **Arquivo:** `site-ndti.db`
- **Localização:** Raiz do projeto backend

### Upload de Arquivos
- **Diretório:** `backend/site-ndti/media/`
- **Tipos aceitos:** Imagens (image/*)
- **Processamento:** Sharp para redimensionamento

## 🔧 Personalização

### Adicionando Novos Campos

Para adicionar novos campos nas collections existentes, edite os arquivos em `src/collections/`:

```typescript
// Exemplo: Adicionando campo "telefone" na collection Team
{
  name: 'telefone',
  type: 'text',
  label: 'Telefone',
}
```

### Criando Novas Collections

1. Crie um novo arquivo em `src/collections/`
2. Importe e adicione no `payload.config.ts`
3. Use labels em português:

```typescript
export const MinhaCollection: CollectionConfig = {
  slug: 'minha-collection',
  labels: {
    singular: 'Meu Item',
    plural: 'Meus Itens',
  },
  fields: [
    // seus campos aqui
  ]
}
```

## 📖 API REST

O Payload CMS gera automaticamente endpoints REST para todas as collections:

- **GET** `/api/news` - Listar notícias
- **POST** `/api/news` - Criar notícia
- **GET** `/api/news/:id` - Obter notícia específica
- **PUT** `/api/news/:id` - Atualizar notícia
- **DELETE** `/api/news/:id` - Deletar notícia

(O mesmo padrão se aplica para `projects`, `team`, `media`, etc.)

## 🎯 Próximos Passos

1. **Configurar email:** Configure um adapter de email para envio de notificações
2. **Backup:** Configure backup automático do banco de dados
3. **Deploy:** Configure para produção (recomendado: Docker)
4. **Segurança:** Configure autenticação e autorização avançada

## 🆘 Suporte

Em caso de dúvidas ou problemas:

1. Verifique os logs no terminal
2. Consulte a documentação oficial: https://payloadcms.com/docs
3. Verifique se todas as dependências estão instaladas: `npm install`

---

**Payload CMS configurado com sucesso em Português Brasileiro! 🇧🇷**
