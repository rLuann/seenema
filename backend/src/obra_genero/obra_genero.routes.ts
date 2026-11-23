import { Router } from "express";
import { obraGeneroController } from "./obra_genero.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Obras e Gêneros
 *   description: Endpoints para associação (N:N) entre obras cinematográficas e gêneros
 *
 * components:
 *   schemas:
 *     ObraGenero:
 *       type: object
 *       properties:
 *         id_obra:
 *           type: integer
 *           example: 1
 *         id_genero:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /api/obra_genero:
 *   post:
 *     summary: Vincula um gênero a uma obra
 *     tags: [Obras e Gêneros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_obra
 *               - id_genero
 *             properties:
 *               id_obra:
 *                 type: integer
 *                 example: 1
 *               id_genero:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Vínculo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObraGenero'
 *       400:
 *         description: IDs inválidos ou ausentes
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Obra ou gênero informados não existem
 *       409:
 *         description: Este gênero já está vinculado a esta obra
 */
router.post("/api/obra_genero", requireAuth, obraGeneroController.create);

/**
 * @swagger
 * /api/obra_genero:
 *   get:
 *     summary: Lista todos os vínculos entre obras e gêneros
 *     tags: [Obras e Gêneros]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ObraGenero'
 */
router.get("/api/obra_genero", obraGeneroController.getAll);

/**
 * @swagger
 * /api/obra_genero/obra/{id_obra}:
 *   get:
 *     summary: Lista todos os gêneros vinculados a uma obra específica
 *     tags: [Obras e Gêneros]
 *     parameters:
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *     responses:
 *       200:
 *         description: Lista de vínculos da obra retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ObraGenero'
 *       400:
 *         description: ID de obra inválido
 */
router.get("/api/obra_genero/obra/:id_obra", obraGeneroController.getByObra);

/**
 * @swagger
 * /api/obra_genero/genero/{id_genero}:
 *   get:
 *     summary: Lista todas as obras vinculadas a um gênero específico
 *     tags: [Obras e Gêneros]
 *     parameters:
 *       - in: path
 *         name: id_genero
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Lista de vínculos do gênero retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ObraGenero'
 *       400:
 *         description: ID de gênero inválido
 */
router.get("/api/obra_genero/genero/:id_genero", obraGeneroController.getByGenero);

/**
 * @swagger
 * /api/obra_genero/{id_obra}/{id_genero}:
 *   get:
 *     summary: Verifica e retorna um vínculo específico entre obra e gênero
 *     tags: [Obras e Gêneros]
 *     parameters:
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *       - in: path
 *         name: id_genero
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Vínculo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ObraGenero'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Vínculo não encontrado
 */
router.get("/api/obra_genero/:id_obra/:id_genero", obraGeneroController.getByIds);

/**
 * @swagger
 * /api/obra_genero/{id_obra}/{id_genero}:
 *   delete:
 *     summary: Remove o vínculo entre uma obra e um gênero
 *     tags: [Obras e Gêneros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da obra
 *       - in: path
 *         name: id_genero
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero
 *     responses:
 *       204:
 *         description: Vínculo removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Vínculo não encontrado
 */
router.delete("/api/obra_genero/:id_obra/:id_genero", requireAuth, obraGeneroController.remove);

export default router;