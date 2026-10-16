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