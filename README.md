 # 🚧 *Em construção / Work in Progress* 🚧
## Objetivo:

![Exemplo app front](./front-example.png)

Um site informativo sobre partidas e classificações de futebol! ⚽️

Desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize e que deve ser capaz de ser consumido por um FRONT END JÁ PROVIDO nesse projeto**.

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;
---


## Desenvolvimento:
### Respostas respeitam os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega:

  - Requisições que precisam de token mas não o receberam retornam um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor retornar um código de `status 400`;

  - Um problema inesperado no servidor retorna um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou partida, retorna um código de `status 201`.


### Chave JWT e criptografia de senhas:
 - Biblioteca utilizada para criptografar a senha no banco de dados: [bcryptjs npm](https://www.npmjs.com/package/bcryptjs).

### Testes de cobertura:

 - Construção de testes de cobertura no backend feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`.

---
### Scripts:

- Para rodar testes de cobertura no seu back-end, utilize o comando: `npm run test:coverage`
- Você pode **instalar suas aplicações (front e back)** rodando o comando `npm run install:apps`;
- Você pode rodar os testes E2E utilizando o comando `npm run test:browser`;
- Você pode **debugar alguns erros do avaliador** (como por exemplo a validação do banco de dados, ou da compilação do TS), onde são *printados* na tela algumas infos adicionais, utilizando o comando `npm run test:debug`;
- Você pode **subir ou descer uma aplicação do compose**, utilizando os scripts `compose:up`, `compose:down`
---
##### *Project developed during the Full Stack Web Development Course at [Trybe](https://www.betrybe.com/)*
