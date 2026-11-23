import { Router } from "express";
import { generoController } from "./genero.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gêneros
 *   description: Endpoints para gestão dos gêneros de obras cinematográficas
 *
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       properties:
 *         id_genero:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Ficção Científica"
 */

/**
 * @swagger
 * /api/genero:
 *   post:
 *     summary: Cadastra um novo gênero
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ficção Científica"
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Nome do gênero ausente ou inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       409:
 *         description: Gênero já cadastrado
 */
router.post("/api/genero", requireAuth, generoController.create);

/**
 * @swagger
 * /api/genero:
 *   get:
 *     summary: Lista todos os gêneros cadastrados
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 */
router.get("/api/genero", generoController.getAll);

/**
 * @swagger
 * /api/genero/{id}:
 *   get:
 *     summary: Busca um gênero pelo ID
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Dados do gênero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Gênero não encontrado
 */
router.get("/api/genero/:id", generoController.getById);

/**
 * @swagger
 * /api/genero/{id}:
 *   put:
 *     summary: Atualiza o nome de um gênero
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Suspense"
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: ID ou nome inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Gênero não encontrado
 *       409:
 *         description: Gênero já cadastrado
 */
router.put("/api/genero/:id", requireAuth, generoController.update);

/**
 * @swagger
 * /api/genero/{id}:
 *   delete:
 *     summary: Remove um gênero pelo ID
 *     tags: [Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     responses:
 *       204:
 *         description: Gênero removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Gênero não encontrado
 */
router.delete("/api/genero/:id", requireAuth, generoController.remove);

export default router;