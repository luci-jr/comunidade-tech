# 🗄️ Comunidade Tech — Banco de Dados (PostgreSQL 16)

Estrutura de dados relacional e scripts de inicialização do PostgreSQL para o ecossistema **Comunidade Tech**.

---

## 📋 Tabelas do Sistema

### 1. `mural_mensagens`
Mensagens postadas pela comunidade no Mural dos Devs com categorização e sistema de curtidas.
- `id` (BIGSERIAL, PK)
- `mensagem` (VARCHAR(400))
- `categoria` (VARCHAR(50))
- `autor_nome` (VARCHAR(100))
- `autor_foto` (VARCHAR(500))
- `autor_uid` (VARCHAR(128))
- `curtidas` (INTEGER, default 0)
- `data_criacao` (TIMESTAMP)

### 2. `plataforma_sugestoes`
Plataformas de estudo sugeridas pelos usuários e moderadas para exibição no diretório.
- `id` (BIGSERIAL, PK)
- `nome` (VARCHAR(100))
- `url` (VARCHAR(350))
- `aprovada` (BOOLEAN, default TRUE)
- `data_sugerida` (TIMESTAMP)

### 3. `trilha_progresso`
Registro gamificado de tópicos concluídos pelos desenvolvedores por trilha de conhecimento.
- `id` (BIGSERIAL, PK)
- `usuario_uid` (VARCHAR(128))
- `trilha_slug` (VARCHAR(50))
- `topico_nome` (VARCHAR(100))
- `concluido` (BOOLEAN)
- `data_conclusao` (TIMESTAMP)
- **Constraint Única:** `uk_usuario_trilha_topico (usuario_uid, trilha_slug, topico_nome)`

---

## 🚀 Como Inicializar via Docker

Na raiz do projeto:
```bash
docker compose up -d db adminer
```

- **Host:** `localhost`
- **Porta PostgreSQL:** `5433`
- **Banco:** `comunidade_tech`
- **Usuário:** `comunidade`
- **Senha:** `comunidade_secret`
- **Adminer (Interface Web):** `http://localhost:8085`
