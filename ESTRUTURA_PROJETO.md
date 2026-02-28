# Estrutura detalhada do projeto

Este documento descreve a organização do código por responsabilidade para facilitar manutenção, onboarding e apresentação técnica.

## 1. Arquitetura geral

- Aplicação SPA em Angular com componentes standalone.
- Composição principal:
  - `app-loading`
  - `app-cabecalho` (rotas principais)
  - `router-outlet`
  - `app-rodape` (rotas principais)

Arquivos centrais:

- `src/app/app.ts`
- `src/app/app.html`
- `src/app/app.css`
- `src/app/app.routes.ts`

## 2. Rotas e navegação

### Rotas institucionais (com cabeçalho/rodapé)

- `/inicio`
- `/galeria`
- `/mural-dos-devs`
- `/como-comecamos`

### Rotas de conteúdo

- `/sistemas-operacionais`
  - `/linux`
  - `/macos`
  - `/windows`
  - `/freebsd`
  - `/raspberry`
- `/sites-aprendizado`
- `/referencias-tecnologia`
- `/canais-tecnologia`
- `/repositorios`
- `/podcasts`

### Compatibilidade

- `/` redireciona para `/inicio`
- `/comunidade` redireciona para `/inicio`
- `/plataformas-ensino-jogo` redireciona para `/sites-aprendizado`
- fallback `**` redireciona para `/inicio`

## 3. Layout e componentes de base

## 3.1 Cabeçalho

Arquivos:

- `src/app/componentes/cabecalho/cabecalho.ts`
- `src/app/componentes/cabecalho/cabecalho.html`
- `src/app/componentes/cabecalho/cabecalho.css`

Responsabilidades:

- Exibir banner apenas em `/inicio`
- Barra superior com abas institucionais
- Destaque de aba ativa via rota atual

## 3.2 Rodapé

Arquivos:

- `src/app/componentes/rodape/rodape.ts`
- `src/app/componentes/rodape/rodape.html`
- `src/app/componentes/rodape/rodape.css`

Responsabilidades:

- Copyright
- Logo com link para `/inicio`
- Links sociais (LinkedIn, GitHub, WhatsApp)
- Comportamento responsivo com ordem específica no mobile

## 3.3 Loading

Arquivo:

- `src/app/componentes/loading/loading.component.ts`

## 4. Página inicial (cards principais)

Arquivos:

- `src/app/componentes/canais/canais.ts`
- `src/app/componentes/canais/canais.html`
- `src/app/componentes/canais/canais.css`

Responsabilidade:

- Renderizar cards de entrada da plataforma
- Navegar para módulos temáticos

## 5. Módulos de conteúdo

## 5.1 Sistemas Operacionais

Container e menu lateral:

- `src/app/componentes/sistemas-operacionais/sistemas-operacionais.ts`

Trilhas:

- `src/app/componentes/sistemas-operacionais-linux/sistemas-operacionais-linux.ts`
- `src/app/componentes/sistemas-operacionais-macos/sistemas-operacionais-macos.ts`
- `src/app/componentes/sistemas-operacionais-windows/sistemas-operacionais-windows.ts`
- `src/app/componentes/sistemas-operacionais-freebsd/sistemas-operacionais-freebsd.ts`
- `src/app/componentes/sistemas-operacionais-raspberry/sistemas-operacionais-raspberry.ts`

Componente compartilhado de trilha (layout único):

- `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.ts`
- `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.html`
- `src/app/componentes/sistemas-operacionais-trilha/sistemas-operacionais-trilha.css`

## 5.2 Plataformas de Ensino

Arquivos:

- `src/app/componentes/sites-aprendizado/sites-aprendizado.ts`
- `src/app/componentes/sites-aprendizado/sites-aprendizado.html`
- `src/app/componentes/sites-aprendizado/sites-aprendizado.css`

Responsabilidades:

- Curadoria de plataformas de aprendizado
- Filtros:
  - Fundamentos
  - Full Stack
  - Cloud e DevOps
  - Ensino Gamificado
  - Todos
- Formulário de sugestão integrado ao Firestore

## 5.3 Frameworks e Tecnologias

Arquivos:

- `src/app/componentes/referencias/referencias-tecnologia.ts`
- `src/app/componentes/referencias/referencias-tecnologia.html`
- `src/app/componentes/referencias/referencias-tecnologia.css`

Responsabilidades:

- Curadoria de ferramentas/tecnologias por trilha:
  - Backend
  - Frontend
  - Mobile
  - DevOps
  - Todos

## 5.4 Canais de Tecnologia

Arquivos:

- `src/app/componentes/canais-tecnologia/canais-tecnologia.ts`
- `src/app/componentes/canais-tecnologia/canais-tecnologia.html`
- `src/app/componentes/canais-tecnologia/canais-tecnologia.css`

## 5.5 Repositórios

Arquivo:

- `src/app/componentes/repositorios/repositorios.ts`

## 5.6 Podcasts

Arquivo:

- `src/app/componentes/podcasts/podcasts.ts`

## 6. Páginas institucionais

- `src/app/componentes/paginas/galeria/*`
- `src/app/componentes/paginas/mural-dos-devs/*`
- `src/app/componentes/paginas/como-comecamos/*`

## 7. Models

- `src/app/models/categoria.model.ts`
- `src/app/models/canal.model.ts`
- `src/app/models/canal-yt.model.ts`
- `src/app/models/plataforma-ensino.model.ts`
- `src/app/models/podcast.model.ts`
- `src/app/models/repositorio-git.model.ts`
- `src/app/models/sistema-operacional.model.ts`

## 8. Serviços

- `src/app/servicos/loading.service.ts`
  - Controle de estados/fluxo visual de loading
- `src/app/servicos/firestore.service.ts`
  - Operações no Firestore para sugestões de plataformas

## 9. Assets e estilos globais

Assets:

- `public/assets/banner.png`
- `public/assets/Comunidade Tech.png`
- `public/assets/background_01.jpg`
- `public/assets/screenshots/dashboard.png`

Estilos globais:

- `src/styles.css`

## 10. Como explicar o projeto em apresentação

Ordem recomendada:

1. Contexto e objetivo da plataforma
2. Stack e arquitetura Angular standalone
3. Fluxo de rotas e layout base (`app.ts`, `app.html`, `app.routes.ts`)
4. Página inicial e cards de entrada
5. Módulos de conteúdo (SO, plataformas, frameworks, canais, repositórios, podcasts)
6. Serviços (loading + Firestore)
7. Responsividade, identidade visual e deploy
