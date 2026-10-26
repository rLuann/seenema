import { Router } from "express";
import * as obrasController from "./obras.controller";

const router = Router();

/**
 * @swagger
 * /obras:
 *   get:
 *     summary: Lista todas as obras do catálogo
 *     tags: [Obras]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de obras.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Obra'
 */
router.get("/api/obras", obrasController.getAll);

/**
 * @swagger
 * /obras/{id}:
 *   get:
 *     summary: Busca uma obra específica pelo ID
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     responses:
 *       200:
 *         description: Obra encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Obra'
 *       400:
 *         description: ID inválido fornecido na URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Obra não encontrada no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.get("/api/obras/:id", obrasController.getById);

/**
 * @swagger
 * /obras:
 *   post:
 *     summary: Adiciona uma nova obra ao catálogo
 *     tags: [Obras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Obra'
 *     responses:
 *       201:
 *         description: Obra criada com sucesso
 *       400:
 *         description: Falha na validação dos dados obrigatórios (título, sinopse, tipo)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.post("/api/obras", obrasController.create);

/**
 * @swagger
 * /obras/{id}:
 *   put:
 *     summary: Atualiza os dados de uma obra existente
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Obra'
 *     responses:
 *       200:
 *         description: Obra atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou ID incorreto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Obra não encontrada para atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.put("/api/obras/:id", obrasController.update);

/**
 * @swagger
 * /obras/{id}:
 *   delete:
 *     summary: Remove uma obra do catálogo
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra a ser excluída
 *     responses:
 *       200:
 *         description: Obra excluída com sucesso
 *       400:
 *         description: ID inválido fornecido na URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 *       404:
 *         description: Obra não encontrada para exclusão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroPadrao'
 */
router.delete("/api/obras/:id", obrasController.remove);

export default router;