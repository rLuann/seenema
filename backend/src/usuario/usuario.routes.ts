import { Router } from "express";
import multer from "multer";
import { usuarioController } from "./usuario.controller";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gestão de usuários e upload de foto de perfil
 *
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Ana Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "ana@email.com"
 *         foto_mimetype:
 *           type: string
 *           nullable: true
 *           example: "image/png"
 */

/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ana Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ana@email.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "ana123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados obrigatórios ausentes
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/api/usuario", usuarioController.create);

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 */
router.get("/api/usuario", requireAuth, usuarioController.getAll);

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/api/usuario/:id", requireAuth, usuarioController.getById);

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ana Clara Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "anaclara@email.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: E-mail já está em uso por outro usuário
 */
router.put("/api/usuario/:id", requireAuth, usuarioController.update);

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/api/usuario/:id", requireAuth, usuarioController.remove);

/**
 * @swagger
 * /api/usuario/{id}/foto:
 *   patch:
 *     summary: Faz upload da foto de perfil do usuário (dado não estruturado)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - foto
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (PNG, JPG, WEBP - máx. 5MB)
 *     responses:
 *       200:
 *         description: Foto de perfil armazenada com sucesso no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Foto de perfil armazenada com sucesso."
 *                 mimetype:
 *                   type: string
 *                   example: "image/png"
 *                 tamanhoBytes:
 *                   type: integer
 *                   example: 102400
 *       400:
 *         description: ID inválido, arquivo ausente ou formato não suportado
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       404:
 *         description: Usuário não encontrado
 */
router.patch("/api/usuario/:id/foto", requireAuth, upload.single("foto"), usuarioController.uploadFoto);

/**
 * @swagger
 * /api/usuario/{id}/foto:
 *   get:
 *     summary: Retorna a foto de perfil binária do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Imagem de perfil do usuário
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Foto de perfil não encontrada para este usuário
 */
router.get("/api/usuario/:id/foto", usuarioController.getFoto);

export default router;