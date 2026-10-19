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

// Adicione esta função no seu obras.controller.ts

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    // req.params.id vem como string da URL, precisamos converter para número
    const obraId = Number(req.params.id);

    // Validação básica do parâmetro
    if (isNaN(obraId)) {
      const error = new Error("ID da obra inválido. Deve ser um número.");
      (error as any).statusCode = 400; // Código 400 para Bad Request
      next(error);
      return;
    }

    // Chama a camada de serviço
    const obra = await obrasService.getById(obraId);

    // Formata a resposta devolvendo um JSON limpo baseado nos getters da classe Obra
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
    next(error); // Passa o erro (como o 404 do service) para o middleware de erro do Express
  }
}