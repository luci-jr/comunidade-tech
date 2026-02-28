# 🚀 Comunidade Tech

Portal de referência para quem quer iniciar na carreira de tecnologia, mas ainda tem dificuldade de encontrar orientação, trilhas e materiais confiáveis em um só lugar.

## 🎯 Intuito do projeto

O **Comunidade Tech** foi criado para **auxiliar iniciantes** com uma jornada mais clara de estudo.

Em vez de buscar conteúdo solto em vários lugares, a plataforma reúne:
- 🧭 trilhas de aprendizado
- 📚 materiais recomendados
- 🧰 ferramentas e tecnologias
- 💻 repositórios para prática
- 🎙️ conteúdo em áudio e vídeo

## 🖼️ Print da página completa

![Print da página completa](./public/assets/screenshots/dashboard.png)

## 🧱 Stack

- 🅰️ Angular 21 (standalone components)
- 📘 TypeScript
- 🔥 Firebase (Firestore + Hosting)
- 🎨 CSS3 (Grid/Flex + tema customizado)

## ✨ Funcionalidades

- 🏠 Página inicial com cards principais:
  - Sistemas Operacionais
  - Plataformas de Ensino
  - Frameworks
  - Repositórios para estudo
  - Canais de Tecnologia
  - Podcasts
- 🖥️ Trilhas de Sistemas Operacionais:
  - Linux, MacOS, Windows, FreeBSD e Raspberry Pi
- 📚 Seção de Frameworks e Tecnologias:
  - Backend, Frontend, Mobile e DevOps
- 🎓 Plataformas de Ensino com filtros, incluindo Ensino Gamificado
- 🐙 Repositórios com filtros por categoria
- 🎙️ Podcasts com filtros por tema
- 📱 Layout responsivo com menu superior e rodapé customizado

## 🗺️ Rotas principais

- `/inicio`
- `/galeria`
- `/mural-dos-devs`
- `/como-comecamos`
- `/sistemas-operacionais/*`
- `/sites-aprendizado`
- `/referencias-tecnologia`
- `/canais-tecnologia`
- `/repositorios`
- `/podcasts`

## ⚙️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Loljr1987/comunidade-tech.git
cd comunidade-tech
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Acesse no navegador:

`http://localhost:4200`

## 🧪 Scripts úteis

- `npm start` -> servidor local (`ng serve`)
- `npm run build` -> build de produção (`ng build`)
- `npm run watch` -> build em watch mode
- `npm run test` -> testes
- `npm run deploy` -> build + deploy de hosting

## 🚢 Deploy

Deploy de hosting:

```bash
npm run deploy
```

Se houver alteração de regras do Firestore:

```bash
firebase deploy --only firestore:rules
```

## 🧩 Estrutura detalhada

Veja a documentação técnica completa:

- [ESTRUTURA_PROJETO.md](./ESTRUTURA_PROJETO.md)

## 👨‍💻 Autor

- LinkedIn: https://www.linkedin.com/in/lucivaldojr/
- GitHub: https://github.com/Loljr1987
- WhatsApp: https://wa.me/5591982687350
