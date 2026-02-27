# Estrutura do Projeto (Comunidade Tech)

Este guia organiza o projeto por responsabilidade, para facilitar apresentacao e manutencao.

## 1) Layout global da aplicacao

- Arquivo principal: `src/app/app.ts`
- Template principal: `src/app/app.html`
- Rotas: `src/app/app.routes.ts`

### Como funciona

- `app.html` monta a pagina com:
  - `app-loading`
  - `app-cabecalho` (somente nas rotas principais definidas em `app.ts`)
  - `router-outlet` (conteudo de cada rota)
  - `app-rodape` (somente nas rotas principais)
- Rotas principais de layout com cabecalho/rodape:
  - `/inicio`
  - `/galeria`
  - `/mural-dos-devs`
  - `/como-comecamos`

## 2) Cabecalho + barra de menu

- Componente: `src/app/componentes/cabecalho/cabecalho.ts`
- Template: `src/app/componentes/cabecalho/cabecalho.html`
- Estilos: `src/app/componentes/cabecalho/cabecalho.css`

### Responsabilidade

- Exibir banner (somente em `/inicio`).
- Exibir menu superior com abas:
  - Galeria
  - Mural dos Devs
  - Como comecamos
  - Inicio (aparece fora da pagina inicial para retorno rapido)
- Destacar aba ativa.

## 3) Rodape

- Componente: `src/app/componentes/rodape/rodape.ts`
- Template: `src/app/componentes/rodape/rodape.html`
- Estilos: `src/app/componentes/rodape/rodape.css`

### Responsabilidade

- Exibir copyright.
- Exibir logo central (clicavel para `/inicio`).
- Exibir redes sociais:
  - LinkedIn
  - GitHub
  - WhatsApp
- Estilo neon/pixel e responsividade com ordem mobile:
  - logo
  - redes sociais
  - copyright

## 4) Paginas institucionais (menu superior)

- Inicio: `src/app/componentes/canais/*`
- Galeria: `src/app/componentes/paginas/galeria/*`
- Mural dos Devs: `src/app/componentes/paginas/mural-dos-devs/*`
- Como comecamos: `src/app/componentes/paginas/como-comecamos/*`

## 5) Modulos de conteudo (cards)

Cada modulo concentra o conteudo em arrays/listas no arquivo `.ts` do componente.

- Sistemas Operacionais:
  - Container/menu lateral: `src/app/componentes/sistemas-operacionais/sistemas-operacionais.ts`
  - Trilhas:
    - Linux: `src/app/componentes/sistemas-operacionais-linux/sistemas-operacionais-linux.ts`
    - MacOS: `src/app/componentes/sistemas-operacionais-macos/sistemas-operacionais-macos.ts`
    - Windows: `src/app/componentes/sistemas-operacionais-windows/sistemas-operacionais-windows.ts`
    - FreeBSD: `src/app/componentes/sistemas-operacionais-freebsd/sistemas-operacionais-freebsd.ts`
    - Raspberry Pi: `src/app/componentes/sistemas-operacionais-raspberry/sistemas-operacionais-raspberry.ts`
  - Componente compartilhado de trilha (layout unificado):
    - `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.ts`
    - `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.html`
    - `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.css`

- Canais de tecnologia:
  - `src/app/componentes/canais-tecnologia/canais-tecnologia.ts`

- Ensino gamificado:
  - `src/app/componentes/plataformas-ensino-jogo/plataformas-ensino-jogo.ts`

- Plataformas de ensino:
  - `src/app/componentes/sites-aprendizado/sites-aprendizado.ts`

- Podcasts:
  - `src/app/componentes/podcasts/podcasts.ts`

- Repositorios:
  - `src/app/componentes/repositorios/repositorios.ts`

## 6) Modelos (tipagem dos cards e dados)

- `src/app/models/categoria.model.ts`
- `src/app/models/sistema-operacional.model.ts`
- `src/app/models/canal-yt.model.ts`
- `src/app/models/plataforma-ensino.model.ts`
- `src/app/models/podcast.model.ts`
- `src/app/models/repositorio-git.model.ts`

## 7) Servicos

- Firestore: `src/app/servicos/firestore.service.ts`
  - uso atual focado em sugestoes.
- Loading: `src/app/servicos/loading.service.ts`
  - controla tela de carregamento/transicoes.

## 8) Assets visuais

- Banner: `public/assets/banner.png`
- Logo rodape: `public/assets/Comunidade Tech.png`
- Background global: `public/assets/background_01.jpg`

## 9) Regra pratica para explicar o projeto

Quando apresentar:

1. Comece pelo fluxo global: `app.ts`, `app.html`, `app.routes.ts`.
2. Explique layout fixo: cabecalho + conteudo + rodape.
3. Mostre paginas institucionais do menu superior.
4. Mostre modulos de cards e onde o conteudo de cada trilha vive (arquivos `.ts`).
5. Finalize com modelos, servicos e assets.
