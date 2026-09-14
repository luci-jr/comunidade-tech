# 📚 Documentação Técnica — Comunidade Tech

Este documento é o guia oficial de engenharia, arquitetura e manutenção da aplicação **Comunidade Tech**. Destina-se a desenvolvedores que precisam compreender a estrutura, executar o projeto localmente, estender funcionalidades e realizar deploys.

Para a visão institucional voltada a usuários e visitantes, consulte o [README.md](./README.md).

---

## 📑 Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Estrutura de Pastas e Responsabilidades](#2-estrutura-de-pastas-e-responsabilidades)
3. [Pré-Requisitos de Ambiente](#3-pré-requisitos-de-ambiente)
4. [Como Subir o Projeto Localmente](#4-como-subir-o-projeto-localmente)
5. [Scripts Disponíveis (npm scripts)](#5-scripts-disponíveis-npm-scripts)
6. [Fluxo de Deploy & Firebase](#6-fluxo-de-deploy--firebase)
7. [Guia de Manutenção & Extensão de Conteúdo](#7-guia-de-manutenção--extensão-de-conteúdo)
8. [Diretrizes de Estilo, Design System & CSS](#8-diretrizes-de-estilo-design-system--css)
9. [Segurança e Regras do Firestore](#9-segurança-e-regras-do-firestore)

---

## 1. Visão Geral da Arquitetura

- **Framework:** [Angular 21](https://angular.dev/) utilizando 100% **Standalone Components** (sem uso de `NgModule`).
- **Estado e Reatividade:** Angular **Signals** para gerenciamento de estado local reativo, combinado com **RxJS** para fluxos assíncronos e observáveis de autenticação.
- **Linguagem:** **TypeScript 5.9** com modo estrito ativado.
- **Backend-as-a-Service (BaaS):** [Firebase](https://firebase.google.com/):
  - **Firebase Hosting:** Distribuição estática global via CDN com suporte a SPA rewrites.
  - **Cloud Firestore:** Banco de dados NoSQL orientado a documentos para persistência de dados dinâmicos (sugestões da comunidade).
  - **Firebase Authentication:** Fluxo de login e identificação de usuários via Google Provider.
- **Estilização:** **Vanilla CSS3** modular com Design Tokens globais, estética retrô/pixel art e suporte a telas mobile, desktop e ultrawide.

---

## 2. Estrutura de Pastas e Responsabilidades

```text
comunidade-tech/
├── .firebase/                    # Cache e metadados internos de deploy do Firebase
├── public/                       # Arquivos estáticos servidos diretamente na raiz
│   └── assets/                   # Imagens, wallpapers e ícones da aplicação
│       ├── background_01.jpg     # Wallpaper de textura espacial do corpo da página
│       ├── banner.png            # Arte dos devs no coworking (1920x900)
│       ├── Comunidade Tech.png   # Logo institucional
│       ├── favicon.ico           # Favicon do navegador
│       ├── rodape.png            # Imagens auxiliares do rodapé
│       └── screenshots/          # Capturas de tela para documentação
├── src/
│   ├── app/
│   │   ├── componentes/          # Componentes compartilhados e estruturais da casca
│   │   │   ├── cabecalho/        # Barra superior com abas (Galeria, Mural, Trajetória, Login)
│   │   │   ├── loading/          # Componente e animação retrô de transição/carregamento
│   │   │   └── rodape/           # Rodapé oficial com canais da comunidade (Discord e WhatsApp) e créditos
│   │   ├── models/               # Interfaces e tipagens TypeScript do domínio
│   │   │   ├── canal.model.ts
│   │   │   ├── canal-yt.model.ts
│   │   │   ├── categoria.model.ts
│   │   │   ├── plataforma-ensino.model.ts
│   │   │   ├── podcast.model.ts
│   │   │   ├── repositorio-git.model.ts
│   │   │   └── sistema-operacional.model.ts
│   │   ├── paginas/              # Telas e views roteáveis da aplicação
│   │   │   ├── canais-tecnologia/       # Módulo de canais do YouTube e criadores
│   │   │   ├── galeria/                 # Mural de fotos e memórias da turma
│   │   │   ├── inicio/                  # Dashboard principal com os 6 cards temáticos (canais.*)
│   │   │   ├── login/                   # Modal/view de autenticação Google via Firebase
│   │   │   ├── mural-dos-devs/          # Cards e apresentações dos desenvolvedores
│   │   │   ├── podcasts/                # Curadoria de podcasts de tecnologia e carreira
│   │   │   ├── referencias/             # Frameworks e ferramentas por stack (referencias-tecnologia.*)
│   │   │   ├── repositorios/            # Lista de repositórios do GitHub recomendados
│   │   │   ├── sistemas-operacionais/   # Trilhas guiadas de SOs (Linux, Windows, macOS, etc.)
│   │   │   │   ├── freebsd/
│   │   │   │   ├── linux/
│   │   │   │   ├── macos/
│   │   │   │   ├── raspberry/
│   │   │   │   ├── windows/
│   │   │   │   └── trilha/              # Componente reutilizável de layout de trilhas
│   │   │   ├── sites-aprendizado/       # Plataformas de ensino, gamificação e formulário de sugestões
│   │   │   └── trajetoria/              # História, marcos e como o projeto começou
│   │   ├── servicos/             # Serviços Angular injetáveis (Singletons)
│   │   │   ├── auth.service.ts          # Gerenciamento de login Google e sessão
│   │   │   ├── firestore.service.ts     # Gravação e leitura de dados no Cloud Firestore
│   │   │   ├── loading.service.ts       # Controle de transições visuais de tela
│   │   │   └── login-modal.service.ts   # Controle de abertura/fechamento do modal de login
│   │   ├── app.css               # Estilos da casca principal (:host, fundos sobrepostos)
│   │   ├── app.html              # Template raiz: cabeçalho + router-outlet + rodapé + modal
│   │   ├── app.routes.ts         # Tabela de roteamento principal com lazy-loading
│   │   └── app.ts                # Componente raiz da aplicação
│   ├── index.html                # Ponto de entrada HTML do browser com fontes do Google Fonts
│   ├── main.ts                   # Inicialização do Angular (bootstrapApplication)
│   └── styles.css                # Design System global, variáveis CSS, resets e tipografia
├── angular.json                  # Configurações de build, assets e otimizações do Angular CLI
├── firebase.json                 # Regras de roteamento (SPA rewrites) e hosting do Firebase
├── firestore.rules               # Regras de segurança e validação do Cloud Firestore
├── package.json                  # Dependências e scripts de automação
└── tsconfig.json                 # Configuração do compilador TypeScript
```

---

## 3. Pré-Requisitos de Ambiente

Para trabalhar no projeto, certifique-se de ter instalado em seu ambiente de desenvolvimento:

- **Node.js:** Versão 20.x ou 22.x LTS.
- **npm:** Versão 10.x ou 11.x.
- **Angular CLI:** Versão 21 (`npm install -g @angular/cli`).
- **Firebase CLI:** Versão 13+ (`npm install -g firebase-tools` ou via `npx firebase-tools`).

---

## 4. Como Subir o Projeto Localmente

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/luci-jr/comunidade-tech.git
cd comunidade-tech
```

### Passo 2: Instalar as Dependências
```bash
npm install
```

### Passo 3: Autenticação no Firebase (Necessário para emuladores e deploys)
```bash
npx firebase login --reauth
```

### Passo 4: Executar o Servidor de Desenvolvimento

#### Opção A — Somente Frontend (Conectado ao Firebase Cloud):
Ideal para manutenção rápida de layouts, textos e estilos:
```bash
npm start
```
Acesse no navegador: **`http://localhost:4200`** (possui hot-reload automático).

#### Opção B — Frontend + Emuladores Locais do Firebase (Ambiente Completo):
Inicia simultaneamente o frontend Angular e os emuladores locais do Firestore via `concurrently`:
```bash
npm run dev
```

#### Opção C — Apenas Emuladores do Firebase:
```bash
npm run backend
```
Os emuladores estarão disponíveis na porta configurada pelo Firebase CLI (geralmente `http://localhost:8080`).

---

## 5. Scripts Disponíveis (`npm scripts`)

| Comando | Descrição | Quando usar |
| :--- | :--- | :--- |
| `npm start` | Roda `ng serve` na porta 4200 | Desenvolvimento diário do frontend |
| `npm run build` | Compila o projeto em modo produção em `dist/` | Checar erros de tipagem e validar bundle |
| `npm run watch` | Compila em modo desenvolvimento com escuta de arquivos | Testar saídas de build continuamente |
| `npm run test` | Executa a suíte de testes com Vitest | Validação de testes unitários |
| `npm run backend` | Executa `firebase emulators:start` | Testar banco de dados localmente sem custos |
| `npm run dev` | Executa concorrentemente `npm start` e `npm run backend` | Ambiente de desenvolvimento fullstack integrado |
| `npm run deploy` | Executa `npm run build` e faz o deploy do Hosting no Firebase | Publicar alterações no ar |

---

## 6. Fluxo de Deploy & Firebase

### Deploy do Frontend (Hosting)
O deploy oficial compila os assets em modo produção (`dist/comunidade-tech/browser`) e os envia para a infraestrutura do Firebase Hosting:
```bash
npm run deploy
```

> **Domínio Oficial de Produção:** [https://comunidade.tech.lucivaldo.cloud/inicio](https://comunidade.tech.lucivaldo.cloud/inicio)  
> **URL Secundária do Firebase:** [https://comunidade-tech-6b4d3.web.app](https://comunidade-tech-6b4d3.web.app)

### Deploy de Regras de Segurança do Firestore
Quando houver alteração no arquivo [firestore.rules](./firestore.rules), faça o deploy específico das regras:
```bash
npx firebase deploy --only firestore:rules
```

---

## 7. Guia de Manutenção & Extensão de Conteúdo

### 7.1 Como Adicionar ou Modificar Cards no Dashboard Inicial
Os cards da tela inicial (`/inicio`) são gerenciados como um Signal dentro do componente [canais.ts](file:///home/lucivaldo-junior/Documentos/GitHub/projetos/comunidade-tech/src/app/paginas/inicio/canais.ts):
1. Abra `src/app/paginas/inicio/canais.ts`.
2. Localize o signal `listaCategorias = signal<Categoria[]>([...])`.
3. Adicione ou edite o item seguindo a interface:
   ```typescript
   {
     titulo: 'Novo Tema',
     descricao: 'Resumo conciso do conteúdo.',
     icone: '💻', // Emoji ou símbolo
     rota: '/sua-rota'
   }
   ```

### 7.2 Como Adicionar uma Nova Trilha de Sistema Operacional
1. Crie o novo componente da trilha em `src/app/paginas/sistemas-operacionais/<novo-so>/`.
2. Reutilize o componente unificado de trilha (`app-sistemas-operacionais-trilha`).
3. Registre a rota filha em `src/app/app.routes.ts` dentro dos `children` de `sistemas-operacionais`.
4. Adicione o botão correspondente no menu lateral em [sistemas-operacionais.ts](file:///home/lucivaldo-junior/Documentos/GitHub/projetos/comunidade-tech/src/app/paginas/sistemas-operacionais/sistemas-operacionais.ts).

### 7.3 Como Atualizar Plataformas, Podcasts, Frameworks ou Canais
O conteúdo de cada módulo vive em arrays tipados dentro do arquivo `.ts` da respectiva página:
- **Plataformas de Ensino:** `src/app/paginas/sites-aprendizado/sites-aprendizado.ts`
- **Frameworks por Stack:** `src/app/paginas/referencias/referencias-tecnologia.ts`
- **Canais do YouTube:** `src/app/paginas/canais-tecnologia/canais-tecnologia.ts`
- **Podcasts:** `src/app/paginas/podcasts/podcasts.ts`
- **Repositórios:** `src/app/paginas/repositorios/repositorios.ts`

Basta alterar os dados do array correspondente para que a tela renderize as mudanças automaticamente.

---

## 8. Diretrizes de Estilo, Design System & CSS

Ao criar novos componentes ou alterar o layout, obedeça às seguintes regras arquiteturais para evitar quebras visuais:

1. **Reset Universal de Box Model:**  
   O arquivo `src/styles.css` define obrigatoriamente:
   ```css
   *, *::before, *::after {
     box-sizing: border-box;
   }
   ```
   **Nunca remova** essa regra, pois qualquer elemento com `width: 100%` somado a `padding` transbordará a largura da tela se o box model voltar ao padrão `content-box`.

2. **Imagens de Fundo & Wallpapers:**  
   Backgrounds que devem cobrir o viewport precisam utilizar `cover` (ex.: `background-size: cover;` ou shorthand `/ cover no-repeat`). O uso de `contain` em telas widescreen gera faixas pretas laterais (*pillarboxing*).

3. **Flexbox e Prevenção de Compressão:**  
   Em barras de navegação horizontais e menus de abas, adicione `flex-shrink: 0;` nos botões para impedir que o texto encolha ou corte em resoluções intermediárias.

4. **Design Tokens Disponíveis em `:root`:**
   - `--font-montserrat`: Fonte de leitura padrão para textos longos e descrições.
   - `--font-pixel`: Fonte retrô *'Press Start 2P'* para títulos, botões e badges.
   - `--color-bg`: Fundo escuro principal (`#121212` / `#070a12`).
   - `--color-surface`: Cor de cards e superfícies (`#1E1E1E`).
   - `--color-primary`: Azul neon de destaque (`#4DA3FF`).
   - `--color-accent`: Tom sépia / barro retrô (`#A0522D`).
   - `--neon-sepia`: Sombra com brilho suave retrô para estados de hover.

---

## 9. Segurança e Regras do Firestore

O arquivo [firestore.rules](./firestore.rules) protege o banco de dados contra inserções indevidas ou ataques:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /sugestoes/{docId} {
      allow read: if true;

      // Validação estrita de schema para criação de sugestões
      allow create: if request.resource.data.nome is string
                    && request.resource.data.nome.size() > 0
                    && request.resource.data.nome.size() <= 100
                    && request.resource.data.url is string
                    && request.resource.data.url.size() > 0
                    && request.resource.data.url.size() <= 300;

      // Imutabilidade: bloqueio de update e delete público
      allow update, delete: if false;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Qualquer nova coleção adicionada ao Firestore deve ter suas regras devidamente declaradas e testadas neste arquivo antes de ir para produção.

---

<p align="center">
  <sub>Documentação Técnica mantida pelo Squad de Engenharia • Comunidade Tech 🚀</sub>
</p>
