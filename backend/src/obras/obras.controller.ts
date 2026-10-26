import { Request, Response, NextFunction } from "express";
import * as obrasService from "./obras.service";
import { Obra, ObraProps } from "./obras.entity";
import { AppError } from "../errors/AppError";

/**
 * @swagger
 * components:
 *   schemas:
 *     Obra:
 *       type: object
 *       required:
 *         - titulo
 *         - sinopse
 *         - tipo
 *       properties:
 *         id_obra:
 *           type: integer
 *           description: ID gerado automaticamente no banco de dados
 *         titulo:
 *           type: string
 *           description: Título da obra
 *         sinopse:
 *           type: string
 *           description: Sinopse descritiva
 *         tipo:
 *           type: string
 *           enum: [Filme, Série]
 *           description: Define se a obra é um filme ou série
 *         poster:
 *           type: string
 *           description: URL da imagem hospedada no Supabase
 *         num_episodios:
 *           type: integer
 *           description: Quantidade de episódios (Obrigatório para Séries)
 *         num_temporada:
 *           type: integer
 *           description: Número da temporada (Obrigatório para Séries)
 *         ano_lancamento:
 *           type: integer
 *           description: Ano de lançamento da obra
 *       example:
 *         titulo: "Lanterna Verde: A Série Animada"
 *         sinopse: "As aventuras de Hal Jordan e seu parceiro Kilowog na fronteira do espaço."
 *         tipo: "Série"
 *         poster: "https://hnyjdcgfalqqmucukrtw.supabase.co/storage/v1/object/public/posters/lanterna_verde_img.jpg"
 *         num_episodios: 26
 *         num_temporada: 1
 *         ano_lancamento: 2011
 * 
 *     ErroPadrao:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *             message:
 *               type: string
 *       example:
 *         error:
 *           code: "BAD_REQUEST"
 *           message: "Campos obrigatórios ausentes. É necessário enviar 'titulo', 'sinopse' e 'tipo'."
 */

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
      next(new AppError("ID da obra inválido. Deve ser um número.", 400, "BAD_REQUEST"));
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
      next(new AppError("Campos obrigatórios ausentes. É necessário enviar 'titulo', 'sinopse' e 'tipo'.", 400, "BAD_REQUEST"));
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
      next(new AppError("ID da obra inválido. Deve ser um número.", 400, "BAD_REQUEST"));
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
      next(new AppError("Campos obrigatórios ausentes. Envie 'titulo', 'sinopse' e 'tipo'.", 400, "BAD_REQUEST"));
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
      next(new AppError("ID da obra inválido. Deve ser um número.", 400, "BAD_REQUEST"));
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