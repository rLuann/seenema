import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API do SEEnema",
      version: "1.0.0", 
      description: "Documentação da API de gerenciamento do catálogo de filmes e séries do SEEnema.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT aqui (apenas o token, sem a palavra Bearer)",
        },
      },
    },
  },

  apis: [
    "./src/**/*.routes.ts",
    "./src/**/*.controller.ts"
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);