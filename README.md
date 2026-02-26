# Comunidade Tech

Aplicação Angular em formato SPA criada para ser uma porta de entrada para pessoas iniciantes em tecnologia.

## Objetivo

O projeto funciona como um **mural de evolução** para estudantes, permitindo:

- compartilhar projetos de quem está começando;
- divulgar recursos de estudo (sites, canais e documentação);
- inspirar outras pessoas com exemplos reais de progresso.

## Estrutura atual

- `src/app/componentes/cabecalho`: banner principal;
- `src/app/componentes/rodape`: rodapé institucional.

## Scripts

```bash
npm start      # sobe servidor local
npm run build  # gera build de produção
npm test       # roda testes unitários
```

## Próximo passo: integração com Firebase

Para evoluir do mock para dados reais:

1. Criar coleção `projetos` e `recursos` no Firestore.
2. Adicionar variáveis de ambiente com as chaves do Firebase.
3. Criar serviços Angular para leitura/escrita dos dados.
4. Habilitar regras de segurança e autenticação (quando necessário).

## Desenvolvimento

```bash
npm install
npm start
```

Abra `http://localhost:4200/` no navegador.
