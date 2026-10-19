import { Request, Response, NextFunction } from "express";
import * as obrasService from "./obras.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const obras = await obrasService.listAll();
    
    const obrasFormatadas = obras.map(obra => ({
      id_obra: obra.id_obra,
      titulo: obra.titulo,
      sinopse: obra.sinopse,
      tipo: obra.tipo, 
      poster: obra.poster,
      num_episodios: obra.num_episodios,
      num_temporada: obra.num_temporada,
      ano_lancamento: obra.ano_lancamento
    }));
    
    res.status(200).json(obrasFormatadas);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    
    const obraId = Number(req.params.id);

    
    if (isNaN(obraId)) {
      const error = new Error("ID da obra inválido. Deve ser um número.");
      (error as any).statusCode = 400; 
      next(error);
      return;
    }

    
    const obra = await obrasService.getById(obraId);

    
    res.status(200).json({
      id_obra: obra.id_obra,
      titulo: obra.titulo,
      sinopse: obra.sinopse,
      tipo: obra.tipo,
      poster: obra.poster,
      num_episodios: obra.num_episodios,
      num_temporada: obra.num_temporada,
      ano_lancamento: obra.ano_lancamento
    });

  } catch (error: any) {
    next(error); 
  }
}