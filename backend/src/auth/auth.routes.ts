import { Router } from "express";
import { login } from "./auth.controller";

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para login e gestão de acessos
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do utilizador
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do utilizador
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Senha em texto limpo
 *             example:
 *               email: "ana@email.com"
 *               senha: "ana123"
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Falta e-mail ou senha no corpo da requisição
 *       401:
 *         description: Credenciais incorretas (Não autorizado)
 */
authRoutes.post("/api/login", login);

export { authRoutes };