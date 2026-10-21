import { Request, Response, NextFunction } from "express";
import * as obrasService from "./obras.service";
import { Obra, ObraProps} from "./obras.entity"


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

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { 
      titulo, 
      sinopse, 
      tipo, 
      poster, 
      num_episodios, 
      num_temporada, 
      ano_lancamento 
    } = req.body;

  
    if (!titulo || !sinopse || !tipo) {
      const error = new Error("Campos obrigatórios ausentes. É necessário enviar 'titulo', 'sinopse' e 'tipo'.");
      (error as any).statusCode = 400;      
      next(error);
      return;
    }
   
    const obraData: ObraProps = {
      titulo,
      sinopse,
      tipo,
      poster,
      num_episodios: num_episodios ? Number(num_episodios) : undefined,
      num_temporada: num_temporada ? Number(num_temporada) : undefined,
      ano_lancamento: ano_lancamento ? Number(ano_lancamento) : undefined
    };

    const createdObra = await obrasService.create(obraData);

    res.status(201).json({
      message: "Obra criada com sucesso!",
      obra: {
        id_obra: createdObra.id_obra,
        titulo: createdObra.titulo,
        sinopse: createdObra.sinopse,
        tipo: createdObra.tipo,
        poster: createdObra.poster,
        num_episodios: createdObra.num_episodios,
        num_temporada: createdObra.num_temporada,
        ano_lancamento: createdObra.ano_lancamento
      }
    });
  } catch (error: any) {
    next(error); 
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const obraId = Number(req.params.id);

    if (isNaN(obraId)) {
      const error = new Error("ID da obra inválido. Deve ser um número.");
      (error as any).statusCode = 400;
      next(error);
      return;
    }

    const { 
      titulo, 
      sinopse, 
      tipo, 
      poster, 
      num_episodios, 
      num_temporada, 
      ano_lancamento 
    } = req.body;

    if (!titulo || !sinopse || !tipo) {
      const error = new Error("Campos obrigatórios ausentes. Envie 'titulo', 'sinopse' e 'tipo'.");
      (error as any).statusCode = 400;      
      next(error);
      return;
    }

    const novosDados: ObraProps = {
      titulo,
      sinopse,
      tipo,
      poster,
      num_episodios: num_episodios ? Number(num_episodios) : undefined,
      num_temporada: num_temporada ? Number(num_temporada) : undefined,
      ano_lancamento: ano_lancamento ? Number(ano_lancamento) : undefined
    };

    const updatedObra = await obrasService.update(obraId, novosDados);

    res.status(200).json({
      message: "Obra atualizada com sucesso!",
      obra: {
        id_obra: updatedObra.id_obra,
        titulo: updatedObra.titulo,
        sinopse: updatedObra.sinopse,
        tipo: updatedObra.tipo,
        poster: updatedObra.poster,
        num_episodios: updatedObra.num_episodios,
        num_temporada: updatedObra.num_temporada,
        ano_lancamento: updatedObra.ano_lancamento
      }
    });
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const obraId = Number(req.params.id);

    if (isNaN(obraId)) {
      const error = new Error("ID da obra inválido. Deve ser um número.");
      (error as any).statusCode = 400;
      next(error);
      return;
    }

    await obrasService.remove(obraId);

    res.status(200).json({
      message: "Obra excluída com sucesso!"
    });
  } catch (error: any) {
    next(error);
  }
}