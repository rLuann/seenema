import { Request, Response, NextFunction } from "express";
import { usuarioService } from "./usuario.service";
import { AppError } from "../errors/AppError";

function parseId(param: unknown): number {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID de usuário inválido.", 400, "INVALID_ID");
  }
  return id;
}

export const usuarioController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.status(200).json(usuarios);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const usuario = await usuarioService.buscarPorId(id);
      res.status(200).json(usuario);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, email, senha } = req.body;
      const novoUsuario = await usuarioService.criar(nome, email, senha);
      res.status(201).json(novoUsuario);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const { nome, email, senha } = req.body;
      const atualizado = await usuarioService.atualizar(id, { nome, email, senha });
      res.status(200).json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      await usuarioService.deletar(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  async uploadFoto(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const resultado = await usuarioService.salvarFotoPerfil(id, req.file);
      res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  },

  async getFoto(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const foto = await usuarioService.obterFotoPerfil(id);
      res.setHeader("Content-Type", foto.foto_mimetype);
      res.status(200).send(foto.foto_perfil);
    } catch (err) {
      next(err);
    }
  },
};