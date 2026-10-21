# 📚 Documentação Técnica — Comunidade Tech

Este documento é o guia oficial de engenharia, arquitetura e manutenção da aplicação **Comunidade Tech**. Destina-se a desenvolvedores que precisam compreender a estrutura, executar o projeto localmente, estender funcionalidades e realizar deploys.

Para a visão institucional voltada a usuários e visitantes, consulte o [README.md](../README.md).

---

## 📑 Sumário

1. [Visão Geral da Arquitetura (Monorepo)](#1-visão-geral-da-arquitetura-monorepo)
2. [Estrutura de Pastas e Responsabilidades](#2-estrutura-de-pastas-e-responsabilidades)
3. [Pré-Requisitos de Ambiente](#3-pré-requisitos-de-ambiente)
4. [Como Subir o Projeto Localmente](#4-como-subir-o-projeto-localmente)
5. [Scripts e Comandos Disponíveis](#5-scripts-e-comandos-disponíveis)
6. [Fluxo de Deploy & Firebase Hosting](#6-fluxo-de-deploy--firebase-hosting)
7. [Guia de Manutenção & Extensão de Conteúdo](#7-guia-de-manutenção--extensão-de-conteúdo)
8. [Diretrizes de Estilo, Design System & CSS](#8-diretrizes-de-estilo-design-system--css)
9. [Segurança e Regras do Firestore](#9-segurança-e-regras-do-firestore)
10. [Arquitetura do Backend (Java 21 LTS & Spring Boot 3)](#10-arquitetura-do-backend-java-21-lts--spring-boot-3)

---

## 1. Visão Geral da Arquitetura (Monorepo)

O projeto é mantido em formato **Monorepo** com desacoplamento total entre as camadas:

- **🅰️ Frontend SPA:** [Angular 21](https://angular.dev/) utilizando 100% **Standalone Components**, gerenciamento de estado reativo com **Signals**, chamadas assíncronas com **RxJS** e estética retrô/pixel art.
- **☕ Backend REST API:** [Java 21 LTS](https://openjdk.org/) e [Spring Boot 3.3.4](https://spring.io/projects/spring-boot), habilitado com **Virtual Threads (Project Loom)**, Spring Data JPA, DTOs imutáveis (`record`), validações com Jakarta Validation e documentação OpenAPI/Swagger UI.
- **🗄️ Banco de Dados Relacional:** [PostgreSQL 16](https://www.postgresql.org/) em container Docker com inicialização via script `database/init.sql` e interface de gestão [Adminer](https://www.adminer.org/).
- **🔥 Backend-as-a-Service (BaaS Client):** [Firebase Suite](https://firebase.google.com/):
  - **Firebase Hosting:** Distribuição global de alta performance via CDN para a SPA Angular.
  - **Cloud Firestore:** Persistência em tempo real para o Mural dos Devs e sugestões.
  - **Firebase Authentication:** Login social Google com persistência segura de sessão.
- **🐳 Orquestração:** Docker & Docker Compose para subida unificada de contêineres locais.

---

## 2. Estrutura de Pastas e Responsabilidades

```text
comunidade-tech/
├── frontend/                     # 🅰️ Módulo Frontend SPA (Angular 21)
│   ├── public/                   # Assets estáticos servidos diretamente na raiz
│   │   └── assets/               # Imagens, wallpapers, screenshots e ícones
│   ├── src/
│   │   ├── app/
│   │   │   ├── componentes/      # Componentes compartilhados (cabecalho, loading, rodape)
│   │   │   ├── models/           # Interfaces TypeScript (Mural, Plataformas, Canais)
│   │   │   ├── paginas/          # Telas roteáveis (Mural, Trilhas SO, Plataformas, etc.)
│   │   │   ├── servicos/         # Singletons (AuthService, FirestoreService)
│   │   │   ├── app.routes.ts     # Rotas com lazy-loading
│   │   │   └── app.config.ts     # Provedores Angular e Firebase
│   │   ├── index.html            # Ponto de entrada HTML do browser
│   │   ├── main.ts               # bootstrapApplication
│   │   └── styles.css            # Design System global, variáveis e tipografia
│   ├── angular.json              # Configurações do Angular CLI
│   ├── package.json              # Dependências e scripts npm
│   ├── Dockerfile                # Build multi-stage Node 22 + Nginx Alpine
│   └── nginx.conf                # Configuração do Nginx local
├── backend/                      # ☕ Módulo Backend REST API (Java 21 + Spring Boot 3)
│   ├── src/main/java/            # Código-fonte da API
│   │   └── com/comunidadetech/api/
│   │       ├── config/           # OpenAPI, CORS e GlobalExceptionHandler
│   │       ├── controller/       # MuralController, SugestaoController, TrilhaController
│   │       ├── dto/              # Records imutáveis de entrada e saída
│   │       ├── entity/           # Entidades JPA (MensagemMural, Sugestao, Progresso)
│   │       ├── repository/       # Repositórios Spring Data JPA
│   │       └── service/          # Regras de negócio do domínio
│   ├── src/test/java/            # Testes unitários com JUnit 5 e Mockito
│   ├── pom.xml                   # Gerenciador de dependências Maven
│   ├── Dockerfile                # Build Eclipse Temurin 21 Alpine
│   └── mvnw / mvnw.cmd           # Maven Wrapper oficial
├── database/                     # 🗄️ Módulo de Banco de Dados Relacional
│   ├── init.sql                  # DDL de tabelas, índices e dados iniciais
│   └── README.md                 # Documentação de modelagem relacional
├── docs/                         # 📚 Documentações do Projeto
│   └── DOCUMENTACAO.md           # Este guia oficial de arquitetura
├── docker-compose.yml            # Orquestração local (Postgres, Adminer, API, Frontend)
├── start-dev.sh                  # Script de inicialização em modo desenvolvimento (Live Reload)
├── firebase.json                 # Configurações de deploy para Firebase Hosting e Firestore
└── firestore.rules               # Regras de segurança de acesso aos dados NoSQL
```

---

## 3. Pré-Requisitos de Ambiente

Para trabalhar com o ecossistema completo, recomenda-se:
- **Node.js:** Versão 20.x ou 22.x LTS.
- **npm:** Versão 10.x ou 11.x.
- **Java:** OpenJDK 21 LTS (para rodar a API localmente fora do Docker).
- **Docker & Docker Compose:** Versão 24+.
- **Firebase CLI:** `npm install -g firebase-tools` ou via `npx firebase-tools`.

---

## 4. Como Subir o Projeto Localmente

### Opção 1: Tudo de Uma Vez via Docker Compose (Comando Único)
Compila e sobe todo o ecossistema em contêineres:
```bash
docker compose up -d --build
```
- Frontend: `http://localhost:4200`
- API Backend: `http://localhost:8080` (Swagger UI: `/swagger-ui.html`)
- PostgreSQL: `localhost:5433`
- Adminer: `http://localhost:8085`

### Opção 2: Modo Desenvolvimento com Live Reload (Script Integrado)
```bash
./start-dev.sh
```
Inicia o Postgres e o Adminer em contêineres e dispara a API Java e o Frontend Angular com *hot-reload* ativado.

### Opção 3: Frontend Isolado (Conectado ao Firebase Cloud)
```bash
cd frontend
npm install
npm start
```
Acesse em: `http://localhost:4200` (ou `http://localhost:4201` caso a 4200 esteja ocupada).

### Opção 4: Backend Isolado (Java 21)
```bash
cd backend
./mvnw spring-boot:run
```

---

## 5. Scripts e Comandos Disponíveis

### Frontend (`frontend/package.json`)
| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor de desenvolvimento na porta 4200 |
| `npm run build` | Compila o bundle otimizado em `dist/comunidade-tech/browser` |
| `npm run watch` | Compilação em modo watch contínuo |
| `npm test` | Executa a suíte de testes unitários |

### Backend (`backend/`)
| Comando | Descrição |
| :--- | :--- |
| `./mvnw spring-boot:run` | Inicia a API REST localmente |
| `./mvnw test` | Executa os testes unitários com JUnit 5 |
| `./mvnw clean package` | Gera o executável JAR otimizado |

---

## 6. Fluxo de Deploy & Firebase Hosting

### Deploy do Frontend (Hosting)
O deploy oficial compila os assets em modo produção (`frontend/dist/comunidade-tech/browser`) e os publica na CDN global do Firebase Hosting:

```bash
# 1. Compilar o frontend
cd frontend
npm run build
cd ..

# 2. Publicar no Firebase Hosting e Firestore Rules
npx firebase deploy --only hosting,firestore:rules
```

> **Domínio Oficial de Produção:** [https://comunidade.tech.lucivaldo.cloud](https://comunidade.tech.lucivaldo.cloud)  
> **URL Secundária do Firebase:** [https://comunidade-tech-6b4d3.web.app](https://comunidade-tech-6b4d3.web.app)

---

## 7. Guia de Manutenção & Extensão de Conteúdo

### 7.1 Como Adicionar ou Modificar Cards no Dashboard Inicial
Os cards da tela inicial (`/inicio`) são gerenciados como um Signal dentro do componente [canais.ts](file:///home/lucivaldo-junior/Documentos/GitHub/projetos/comunidade-tech/frontend/src/app/paginas/inicio/canais.ts):
1. Abra `frontend/src/app/paginas/inicio/canais.ts`.
2. Localize o signal `listaCategorias = signal<Categoria[]>([...])`.
3. Adicione ou edite o item seguindo a interface `Categoria`.

### 7.2 Como Adicionar uma Nova Trilha de Sistema Operacional
1. Crie o novo componente da trilha em `frontend/src/app/paginas/sistemas-operacionais/<novo-so>/`.
2. Reutilize o componente unificado de trilha (`app-sistemas-operacionais-trilha`).
3. Registre a rota filha em `frontend/src/app/app.routes.ts`.
4. Adicione o botão correspondente no menu lateral em `sistemas-operacionais.ts`.

### 7.3 Como Atualizar Plataformas, Podcasts, Frameworks ou Canais
O conteúdo de cada módulo vive em arrays tipados dentro do arquivo `.ts` da respectiva página:
- **Plataformas de Ensino:** `frontend/src/app/paginas/sites-aprendizado/sites-aprendizado.ts`
- **Frameworks por Stack:** `frontend/src/app/paginas/referencias/referencias-tecnologia.ts`
- **Canais do YouTube:** `frontend/src/app/paginas/canais-tecnologia/canais-tecnologia.ts`
- **Podcasts:** `frontend/src/app/paginas/podcasts/podcasts.ts`
- **Repositórios:** `frontend/src/app/paginas/repositorios/repositorios.ts`

---

## 8. Diretrizes de Estilo, Design System & CSS

1. **Reset Universal de Box Model:**  
   O arquivo `frontend/src/styles.css` define obrigatoriamente `box-sizing: border-box;` para todos os seletores.
2. **Imagens de Fundo:**  
   Wallpapers e texturas devem usar `background-size: cover;` para evitar faixas pretas em monitores ultrawide.
3. **Flexbox e Prevenção de Compressão:**  
   Em botões de menus e abas horizontais, use `flex-shrink: 0;` para impedir que o texto encolha.
4. **Design Tokens em `:root`:**
   - `--font-montserrat`: Fonte de leitura padrão.
   - `--font-pixel`: Fonte retrô *'Press Start 2P'* para títulos, botões e badges.
   - `--color-bg`: Fundo escuro principal (`#121212` / `#070a12`).
   - `--color-surface`: Superfícies de cards (`#1E1E1E`).
   - `--color-primary`: Azul neon (`#4DA3FF`).
   - `--color-accent`: Tom sépia / terracota (`#A0522D`).

---

## 9. Segurança e Regras do Firestore

O arquivo [firestore.rules](../firestore.rules) protege o banco de dados contra inserções indevidas ou ataques:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Sugestões de plataformas de estudo
    match /sugestoes/{docId} {
      allow read: if true;
      allow create: if request.resource.data.nome is string
                    && request.resource.data.nome.size() > 0
                    && request.resource.data.nome.size() <= 100
                    && request.resource.data.url is string
                    && request.resource.data.url.size() > 0
                    && request.resource.data.url.size() <= 300;
      allow update, delete: if false;
    }

    // Mural dos Devs
    match /mural/{docId} {
      allow read: if true;
      
      // Permitir postagem apenas de usuários autenticados
      allow create: if request.auth != null
                    && request.resource.data.mensagem is string
                    && request.resource.data.mensagem.size() > 0
                    && request.resource.data.mensagem.size() <= 350
                    && request.resource.data.autorUid == request.auth.uid;

      // Incremento de curtidas liberado para a comunidade
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['curtidas']);

      // Apenas o próprio autor pode deletar seu recado
      allow delete: if request.auth != null && request.auth.uid == resource.data.autorUid;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 10. Arquitetura do Backend (Java 21 LTS & Spring Boot 3)

O backend foi construído seguindo boas práticas corporativas de engenharia:
- **Project Loom (Virtual Threads):** Habilitado via `spring.threads.virtual.enabled: true` para concorrência de alta vazão sem bloqueio de threads de sistema operacional.
- **DTOs Imutáveis com Records:** Records do Java 21 com Jakarta Validation (`@NotBlank`, `@Size`, `@Pattern`).
- **Respostas de Erro Padronizadas (RFC 7807):** `ProblemDetail` implementado no `GlobalExceptionHandler`.
- **Persistência Relacional:** Spring Data JPA sobre PostgreSQL com índices otimizados por categoria e data de criação.

---

<p align="center">
  <sub>Documentação Técnica mantida pelo Squad de Engenharia • Comunidade Tech 🚀</sub>
</p>
