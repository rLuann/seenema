import { Request, Response, NextFunction } from "express";
import { statusObraService } from "./status_obra.service";
import { AppError } from "../errors/AppError";

function parseId(param: unknown, campo: string): number {
  const id = Number(param);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`ID de ${campo} inválido.`, 400, "INVALID_ID");
  }
  return id;
}

export const statusObraController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const registros = await statusObraService.listarTodos();
      res.status(200).json(registros);
    } catch (err) {
      next(err);
    }
  },

  async getByUsuario(req: Request, res: Response, next: NextFunction) {
    try {
      const id_usuario = parseId(req.params.id_usuario, "usuário");
      const registros = await statusObraService.listarPorUsuario(id_usuario);
      res.status(200).json(registros);
    } catch (err) {
      next(err);
    }
  },

  async getByObra(req: Request, res: Response, next: NextFunction) {
    try {
      const id_obra = parseId(req.params.id_obra, "obra");
      const registros = await statusObraService.listarPorObra(id_obra);
      res.status(200).json(registros);
    } catch (err) {
      next(err);
    }
  },

  async getByIds(req: Request, res: Response, next: NextFunction) {
    try {
      const id_usuario = parseId(req.params.id_usuario, "usuário");
      const id_obra = parseId(req.params.id_obra, "obra");
      const registro = await statusObraService.buscarPorIds(id_usuario, id_obra);
      res.status(200).json(registro);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_usuario, id_obra, status, nota } = req.body || {};
      const novoRegistro = await statusObraService.criar({
        id_usuario,
        id_obra,
        status,
        nota,
      });
      res.status(201).json(novoRegistro);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id_usuario = parseId(req.params.id_usuario, "usuário");
      const id_obra = parseId(req.params.id_obra, "obra");
      const { status, nota } = req.body || {};
      const atualizado = await statusObraService.atualizar(id_usuario, id_obra, {
        status,
        nota,
      });
      res.status(200).json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id_usuario = parseId(req.params.id_usuario, "usuário");
      const id_obra = parseId(req.params.id_obra, "obra");
      await statusObraService.deletar(id_usuario, id_obra);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};