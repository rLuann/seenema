import { Request, Response, NextFunction } from "express";
import { generoService } from "./genero.service";
import { AppError } from "../errors/AppError";

function parseId(param: unknown): number {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID de gênero inválido.", 400, "INVALID_ID");
  }
  return id;
}

export const generoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const generos = await generoService.listarTodos();
      res.status(200).json(generos);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const genero = await generoService.buscarPorId(id);
      res.status(200).json(genero);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome } = req.body || {};
      const novoGenero = await generoService.criar(nome);
      res.status(201).json(novoGenero);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const { nome } = req.body || {};
      const atualizado = await generoService.atualizar(id, nome);
      res.status(200).json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      await generoService.deletar(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};