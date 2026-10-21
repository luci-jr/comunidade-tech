# 🅰️ Comunidade Tech — Frontend (Angular 21)

> **Módulo Frontend:** Interface Web Interativa & Gamificada  
> **Arquitetura:** Standalone Components | Angular Signals | RxJS | Retro Pixel Art Theme  
> **Deploy de Produção:** [comunidade.tech.lucivaldo.cloud](https://comunidade.tech.lucivaldo.cloud/inicio)

---

## 🧭 Sumário
1. [Visão Geral](#-visão-geral)
2. [Estrutura de Pastas](#-estrutura-de-pastas)
3. [Pré-requisitos](#-pré-requisitos)
4. [Instalação e Execução](#-instalação-e-execução)
5. [Scripts Disponíveis](#-scripts-disponíveis)
6. [Deploy no Firebase Hosting](#-deploy-no-firebase-hosting)

---

## 🌟 Visão Geral

O frontend da **Comunidade Tech** é uma Single Page Application (SPA) reativa e imersiva construída com Angular 21, sem uso de `NgModule`s obsoletos. Toda a aplicação foi desenhada em torno de:
- **Standalone Components:** Código limpo, modular e carregamento sob demanda (*lazy-loading* por rotas).
- **Angular Signals:** Gerenciamento reativo de estado de ponta sem overhead.
- **Firebase Auth & Firestore:** Login social com Google, feed ao vivo do Mural dos Devs e persistência ágil.
- **Estética Retrô Neon & Pixel Art:** Custom design system em CSS puro (Flexbox/Grid, fontes *Press Start 2P* e *Montserrat*).
- **Trilha Gamificada:** Checklist de estudos com pontuação de XP e salvamento em `localStorage`.

---

## 📁 Estrutura de Pastas

```text
frontend/
├── public/                 # Assets estáticos, ícones e imagens
├── src/
│   ├── app/
│   │   ├── componentes/    # Header (cabecalho), footer (rodape), loading
│   │   ├── models/         # Interfaces TypeScript (Mural, Plataformas, etc.)
│   │   ├── paginas/        # Telas da aplicação (Mural, Trilhas OS, Plataformas, etc.)
│   │   ├── servicos/       # Integrações (AuthService, FirestoreService)
│   │   ├── app.routes.ts   # Configuração de rotas Standalone
│   │   └── app.config.ts   # Provedores da aplicação e inicialização do Firebase
│   ├── environments/       # Variáveis de ambiente (dev e prod)
│   ├── index.html          # HTML raiz
│   ├── main.ts             # Bootstrap da aplicação
│   └── styles.css          # Design system e tema retrô
├── angular.json            # Configuração do Angular CLI
├── package.json            # Dependências e scripts npm
└── tsconfig.json           # Configuração estrita do TypeScript
```

---

## ⚙️ Pré-requisitos
- **Node.js:** v20+ ou v22+
- **npm:** v10+ ou v11+
- **Angular CLI:** `npm install -g @angular/cli` (opcional, `npx ng` funciona diretamente)

---

## 🚀 Instalação e Execução

Entre na pasta do frontend:
```bash
cd frontend
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm start
```

Acesse no navegador: **`http://localhost:4200`**

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o servidor local de desenvolvimento na porta 4200 |
| `npm run build` | Compila o bundle otimizado de produção em `dist/comunidade-tech/browser` |
| `npm run watch` | Compilação contínua em modo de desenvolvimento |
| `npm test` | Executa os testes unitários da aplicação |

---

## 🌐 Deploy no Firebase Hosting

O deploy é automatizado diretamente da raiz do repositório ou de dentro de `frontend`:

```bash
# 1. Gerar o build de produção
npm run build

# 2. Na raiz do repositório, subir para o Firebase Hosting
cd ..
firebase deploy --only hosting
```
