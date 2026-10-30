# SEEnema - Backend 🎬

O backend do **SEEnema**, uma aplicação full-stack para catálogo de mídia e rastreamento de filmes. Esta API RESTful foi construída do zero utilizando Node.js e TypeScript, gerenciando a autenticação de usuários, comunicação com o banco de dados PostgreSQL (via Supabase) e documentação de rotas.

## 🚀 Tecnologias Utilizadas

* **Node.js** com **Express** (Roteamento e servidor)
* **TypeScript** (Tipagem estática)
* **PostgreSQL** / **Supabase** (Banco de dados relacional)
* **JWT & Bcrypt** (Autenticação e criptografia de senhas)
* **Swagger** (Documentação da API)

## ⚙️ Instalação e Configuração

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Clone o repositório e execute o bloco de comandos abaixo no seu terminal para inicializar o projeto e instalar todas as dependências (produção e desenvolvimento) de uma única vez:

```bash
npm init -y
npm install express pg dotenv swagger-ui-express swagger-jsdoc bcrypt jsonwebtoken
npm install -D typescript @types/express @types/pg @types/node tsx @types/swagger-ui-express @types/swagger-jsdoc @types/bcrypt @types/jsonwebtoken
