import { Request, Response, NextFunction } from "express";
import { obraGeneroService } from "./obra_genero.service";
import { AppError } from "../errors/AppError";

function parseId(param: unknown, campo: string): number {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`ID de ${campo} inválido.`, 400, "INVALID_ID");
  }
  return id;
}

export const obraGeneroController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vinculos = await obraGeneroService.listarTodos();
      res.status(200).json(vinculos);
    } catch (err) {
      next(err);
    }
  },

  async getByObra(req: Request, res: Response, next: NextFunction) {
    try {
      const id_obra = parseId(req.params.id_obra, "obra");
      const vinculos = await obraGeneroService.listarPorObra(id_obra);
      res.status(200).json(vinculos);
    } catch (err) {
      next(err);
    }
  },

  async getByGenero(req: Request, res: Response, next: NextFunction) {
    try {
      const id_genero = parseId(req.params.id_genero, "gênero");
      const vinculos = await obraGeneroService.listarPorGenero(id_genero);
      res.status(200).json(vinculos);
    } catch (err) {
      next(err);
    }
  },

  async getByIds(req: Request, res: Response, next: NextFunction) {
    try {
      const id_obra = parseId(req.params.id_obra, "obra");
      const id_genero = parseId(req.params.id_genero, "gênero");
      const vinculo = await obraGeneroService.buscarPorIds(id_obra, id_genero);
      res.status(200).json(vinculo);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_obra, id_genero } = req.body || {};
      const novoVinculo = await obraGeneroService.criar({
        id_obra,
        id_genero,
      });
      res.status(201).json(novoVinculo);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id_obra = parseId(req.params.id_obra, "obra");
      const id_genero = parseId(req.params.id_genero, "gênero");
      await obraGeneroService.deletar(id_obra, id_genero);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};