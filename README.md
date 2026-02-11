# Sistema de Gerenciamento - Full Stack

Sistema completo de gerenciamento com CRUD de Pessoas e Produtos, desenvolvido com React, TypeScript, Node.js e MySQL.

## 🚀 Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **MySQL** - Banco de dados
- **mysql2** - Driver MySQL com suporte a Promises
- **CORS** - Habilitação de requisições cross-origin

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **CSS3** - Estilização customizada
- **React Portal** - Renderização de modals

## 📋 Pré-requisitos

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **XAMPP** (ou MySQL standalone)
- **Git**

## 📁 Estrutura do Projeto

```
Teste-Full-Stack/
├── backend/
│   ├── controller/          # Controladores das rotas
│   ├── models/              # Modelos de dados
│   ├── routes/              # Definição de rotas
│   ├── BancoDeDados.ts      # Configuração do banco
│   └── server.ts            # Servidor Express
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── App.tsx          # Componente principal
│   │   └── main.tsx         # Entry point
│   └── public/
├── MySQL/
│   └── banco.sql            # Script de criação do banco
├── package.json
└── README.md
```

## 🗄️ Configuração do Banco de Dados

### 1. Inicie o XAMPP
- Abra o **XAMPP Control Panel**
- Inicie os serviços **Apache** e **MySQL**

### 2. Crie o Banco de Dados
Acesse o phpMyAdmin (`http://localhost/phpmyadmin`) ou execute via terminal MySQL:

```sql
CREATE DATABASE banco;
USE banco;
```

### 3. Execute o Script SQL
Importe o arquivo `MySQL/banco.sql` ou execute os comandos:

```sql
-- Tabela de Usuários
CREATE TABLE usuario (
  email VARCHAR(255) PRIMARY KEY,
  senha VARCHAR(100) NOT NULL
);

-- Tabela de Pessoas
CREATE TABLE pessoas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  cargo VARCHAR(50) NOT NULL
);

-- Tabela de Produtos
CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  sku INT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  quantidade INT NOT NULL,
  categoria VARCHAR(50) NOT NULL
);
```

### 4. Crie um Usuário de Teste (Opcional)
```sql
INSERT INTO usuario (email, senha) VALUES ('admin@example.com', 'senha123');
```

## ⚙️ Instalação e Execução

### Backend

1. **Navegue até a pasta backend**
```bash
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados** (se necessário)
Edite `backend/BancoDeDados.ts`:
```typescript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',  // Sua senha do MySQL
    database: 'banco'
};
```

4. **Execute o servidor**
```bash
npm start
```

O backend estará rodando em `http://localhost:3000`

### Frontend

1. **Navegue até a pasta frontend**
```bash
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 🎯 Funcionalidades

### 🔐 Autenticação
- Login com email e senha
- Validação de credenciais no banco de dados
- Persistência de sessão

### 👥 Gerenciamento de Pessoas
- ✅ Listar pessoas cadastradas
- ➕ Adicionar nova pessoa (nome, email, telefone, cargo)
- ✏️ Editar informações
- 🗑️ Deletar com confirmação via modal
- 📱 Interface responsiva (desktop e mobile)
- 📋 Layout de cards no mobile

### 📦 Gerenciamento de Produtos
- ✅ Listar produtos cadastrados
- ➕ Adicionar novo produto (nome, SKU, preço, quantidade, categoria)
- ✏️ Editar informações
- 🗑️ Deletar com confirmação via modal
- 📱 Interface responsiva (desktop e mobile)
- 📋 Layout de cards no mobile
- 💰 Formatação de preço em Reais (R$)

### 🎨 Interface
- 🌈 Design moderno com gradientes roxos
- 📱 Totalmente responsivo (400x800, tablets, desktop)
- 🍔 Menu hamburger no mobile
- 🎭 Sidebar retrátil
- ✨ Animações suaves
- 🔔 Modais de confirmação
- ⚡ Feedback visual (hover, loading states)

## 🔌 API Endpoints

### Autenticação
```
POST /api/auth/login
Body: { email: string, senha: string }
```

### Pessoas
```
GET    /api/pessoas          # Listar todas
POST   /api/pessoas          # Criar nova
PUT    /api/pessoas/:id      # Atualizar
DELETE /api/pessoas/:id      # Deletar
```

### Produtos
```
GET    /api/produtos         # Listar todos
POST   /api/produtos         # Criar novo
PUT    /api/produtos/:id     # Atualizar
DELETE /api/produtos/:id     # Deletar
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints em:
- **Desktop**: > 768px - Tabela completa com sidebar fixa
- **Tablet/Mobile**: ≤ 768px - Layout de cards, sidebar retrátil
- **Mobile pequeno**: ≤ 480px - Ajustes de espaçamento e fontes
- **Landscape mobile**: altura ≤ 500px - Layout otimizado

## 🎨 Paleta de Cores

- **Primary**: Linear gradient (#667eea → #764ba2)
- **Sidebar Background**: #F8F7FC
- **Purple**: #7C3AED
- **Blue (Edit)**: #2196F3
- **Red (Delete)**: #f44336
- **Success Green**: #4caf50

## 🛠️ Scripts Disponíveis

### Backend
```bash
npm start          # Inicia o servidor
npm run build      # Compila TypeScript
npm run dev        # Modo desenvolvimento com watch
```

### Frontend
```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Lint do código
```

## 📝 Validações

### Pessoas
- ✅ Nome obrigatório
- ✅ Email válido e único
- ✅ Telefone com limite de 15 caracteres
- ✅ Cargo obrigatório

### Produtos
- ✅ Nome obrigatório
- ✅ SKU numérico obrigatório
- ✅ Preço decimal (mín: 0)
- ✅ Quantidade numérica obrigatória
- ✅ Categoria obrigatória

## 🚨 Solução de Problemas

### Backend não conecta ao banco
- Verifique se o MySQL está rodando
- Confirme as credenciais em `BancoDeDados.ts`
- Verifique se o banco `banco` foi criado

### Erro "Email já cadastrado"
- O sistema valida emails únicos na tabela `pessoas`
- Use outro email ou delete o registro existente

### Porta 3000 ou 5173 em uso
```bash
# Windows - Encontrar processo
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Tela preta ao acessar Produtos
- Limpe os dados antigos do banco (produtos sem campo `preco`)
- O sistema agora valida e formata preços corretamente

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Autor

Gustavo Henrique Bispo Costa

Desenvolvido como projeto Full Stack com TypeScript

---

**MgnMgt** - Sistema de Gerenciamento v1.0.0
