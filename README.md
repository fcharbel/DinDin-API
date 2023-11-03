# DinDin API

O projeto consiste em uma API REST para controle de gastos do usuário, permitindo a realização de múltiplas operações, sendo elas: cadastrar usuário, fazer login, cadastrar transação, detalhar transação, filtrar transações por categoria, obter extrato de transações, entre outras...

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Express](https://expressjs.com/pt-br/)**
- **[Git](https://git-scm.com/doc)**
-  **[Joi](https://joi.dev/)**
-  **[JWT](https://jwt.io/)**
- **[Node.js](https://nodejs.org/en)**
- **[Nodemon](https://nodemon.io/)**
-  **[Node-postgres](https://www.npmjs.com/package/pg)**
- **[Knex](https://knexjs.org/)**


## ⚠️ Dependências

Antes de começar, você deve ter as seguintes ferramentas instaladas na sua máquina: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/). Como complemento, é bom tem um editor de código como o [VSCode](https://code.visualstudio.com/)


## 📥 Instalação e utilização

```bash
# Clone este repositório

$  git  clone  https://github.com/fcharbel/DinDin-API.git


# Acesse a pasta do projeto pelo terminal

$  cd DinDin-API


# Instale as dependências

$  npm  install


# Rode a aplicação no modo de desenvolvimento

$  npm run dev

```

## 📖 Documentação da API

Para testar a API, você pode usar o [Insomnia](https://insomnia.rest/download), que é uma plataforma para testar e documentar APIs. 

![](https://insomnia.rest/images/run.svg)


### 🔗 Cadastro de usuário

Cria um novo usuário com base nos dados descritos abaixo recebidos no body da requisição e retorna as informações do usuário, acrescentando o `id` cadastrado e excluindo a `senha`.

    POST /usuario

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do usuario |
| `email` | `string`| Responsável por armazenar o e-mail do usuario |
| `senha` | `string`| Responsável por armazenar a senha do usuario |

##### Endpoint:

    http://localhost:3000/usuario

---

### 🔗 Login do usuário

    POST /login

Permite que o usuário cadastrado realize login no sistema e retorna as informações do usuário acrescentando o token de autenticação.

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
|  `email` | `string`| Responsável por armazenar o e-mail do usuario |
|  `senha` | `string`| Responsável por armazenar a senha do usuario |

##### Endpoint:

    http://localhost:3000/login
    
---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. 

---

### 🔗 Detalhamento do usuário

    GET /usuario

Retorna os dados do usuário logado de acordo com o `id` presente no token de autenticação.

##### Endpoint:

    http://localhost:3000/usuario

--- 

### 🔗 Alteração do usuário

    PUT /usuario

Altera os dados do usuário logado baseado nos dados recebidos no body da requisição.

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do usuario |
| `email` | `string`| Responsável por armazenar o e-mail do usuario |
| `senha` | `string`| Responsável por armazenar a senha do usuario |

##### Endpoint:

    http://localhost:3000/usuario

---

### 🔗 Listagem das categorias

    GET /categoria

Retorna a listagem de todas as categorias cadastradas.

##### Endpoint:

    http://localhost:3000/categoria

---

### 🔗 Listagem de transações do usuário logado

    GET /transacao

Retorna a listagem de todos as transações do usuário cadastradas, e caso receba um parâmetro do tipo query  `filtro`, realiza a filtragem por categoria(s).

| Parâmetro query | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `filtro`  | `string` | Responsável por armazenar o nome da categoria baseada na tabela `categorias`  |

##### Endpoint:

    http://localhost:3000/transacao?filtro[]=
---

### 🔗 Detalhamento de transação do usuário logado

    GET /transacao/:id

Retorna o produto com base no `id`  do produto recebido como parâmetro de requisição.

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação|


##### Endpoint:

    http://localhost:3000/transacao/:id

---

### 🔗 Cadastro de uma transação

    POST /transacao

Cadastra uma transação associada ao usuário logado, que é identificado através do id presente no token de validação.

##### Endpoint:

    http://localhost:3000/transacao
    

##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição da transação |
|  `valor` |  `number`|  Responsável por armazenar o valor da transação |
|  `categoria_id` |  `number`|  Responsável por armazenar o id da categoria da transação baseada na tabela `categorias`  |
| `tipo`  | `string` | Responsável por armazenar o tipo da transação, sendo `entrada` ou `saida`

---

### 🔗 Alteração da transação

    PUT /transacao/:id

Altera os dados da transação com base no `id`  da transação recebido como parâmetro de requisição e nos dados recebidos no body da requisição.


| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação|


##### Endpoint:

    http://localhost:3000/transacao/:id
    
##### Corpo da requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `descricao`  | `string` | Responsável por armazenar a descrição da transação |
|  `valor` |  `number`|  Responsável por armazenar o valor da transação |
|  `categoria_id` |  `string`|  Responsável por armazenar o id da categoria da transação baseada na tabela `categorias`  |
| `tipo`  | `string` | Responsável por armazenar o tipo da transação, sendo `entrada` ou `saida`



--- 

### 🔗 Deleção da transação

    DELETE /transacao/:id

Exclui a transação com base no `id`  da transação recebido como parâmetro de requisição.

*OBS: A transação é deletado somente se estiver vinculada ao usuário logado.*

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `id`  | `number` | Responsável por armazenar o id da transação |


##### Endpoint:

    http://localhost:3000/transacao/:id
  
  ---
  
### 🔗 Extrato de transações

    GET /transacao/extrato

Retorna a soma de todas transações de acordo com o tipo (entrada/saida) para o usuário logado de acordo com o `id` presente no token de autenticação.


##### Endpoint:

    http://localhost:3000/transacao/extrato

---

## 🤝 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`


---

Feito por [Fernanda Charbel](https://www.linkedin.com/in/fernanda-charbel) 🌺
