import { Router } from "express";
import { statusObraController } from "./status_obra.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Status de Obras
 *   description: Endpoints para gestão do status de visualização e avaliações das obras pelos usuários
 *
 * components:
 *   schemas:
 *     StatusObra:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_obra:
 *           type: integer
 *           example: 1
 *         nota:
 *           type: integer
 *           nullable: true
 *           minimum: 0
 *           maximum: 5
 *           example: 5
 *         status:
 *           type: string
 *           example: "Assistido"
 */

/**
 * @swagger
 * /api/status_obra:
 *   post:
 *     summary: Registra o status e a nota de um usuário para uma obra
 *     tags: [Status de Obras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_obra
 *               - status
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_obra:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "Assistido"
 *               nota:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusObra'
 *       400:
 *         description: Dados inválidos ou obrigatórios ausentes
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Usuário ou obra informados não existem
 *       409:
 *         description: Este usuário já possui um status cadastrado para esta obra
 */
router.post("/api/status_obra", requireAuth, statusObraController.create);

/**
 * @swagger
 * /api/status_obra:
 *   get:
 *     summary: Lista todos os registros de status e avaliações
 *     tags: [Status de Obras]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatusObra'
 */
router.get("/api/status_obra", statusObraController.getAll);

/**
 * @swagger
 * /api/status_obra/usuario/{id_usuario}:
 *   get:
 *     summary: Lista todas as obras avaliadas ou marcadas por um usuário
 *     tags: [Status de Obras]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de status do usuário retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatusObra'
 *       400:
 *         description: ID de usuário inválido
 */
router.get("/api/status_obra/usuario/:id_usuario", statusObraController.getByUsuario);

/**
 * @swagger
 * /api/status_obra/obra/{id_obra}:
 *   get:
 *     summary: Lista todos os status e avaliações de uma obra específica
 *     tags: [Status de Obras]
 *     parameters:
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Lista de status da obra retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatusObra'
 *       400:
 *         description: ID de obra inválido
 */
router.get("/api/status_obra/obra/:id_obra", statusObraController.getByObra);

/**
 * @swagger
 * /api/status_obra/{id_usuario}/{id_obra}:
 *   get:
 *     summary: Busca o status e a nota de um usuário específico para uma obra específica
 *     tags: [Status de Obras]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusObra'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro não encontrado
 */
router.get("/api/status_obra/:id_usuario/:id_obra", statusObraController.getByIds);

/**
 * @swagger
 * /api/status_obra/{id_usuario}/{id_obra}:
 *   put:
 *     summary: Atualiza o status e/ou a nota de um usuário para uma obra
 *     tags: [Status de Obras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Reassistindo"
 *               nota:
 *                 type: integer
 *                 nullable: true
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusObra'
 *       400:
 *         description: ID, status ou nota inválidos
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Registro não encontrado
 */
router.put("/api/status_obra/:id_usuario/:id_obra", requireAuth, statusObraController.update);

/**
 * @swagger
 * /api/status_obra/{id_usuario}/{id_obra}:
 *   delete:
 *     summary: Remove o registro de status e nota de um usuário para uma obra
 *     tags: [Status de Obras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       204:
 *         description: Registro removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Registro não encontrado
 */
router.delete("/api/status_obra/:id_usuario/:id_obra", requireAuth, statusObraController.remove);

export default router;