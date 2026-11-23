import { AppError } from "../errors/AppError";
import {
  obraGeneroRepository,
  CreateObraGeneroInput,
} from "./obra_genero.repository";

export const obraGeneroService = {
  async listarTodos() {
    return obraGeneroRepository.findAll();
  },

  async listarPorObra(id_obra: number) {
    return obraGeneroRepository.findByObra(id_obra);
  },

  async listarPorGenero(id_genero: number) {
    return obraGeneroRepository.findByGenero(id_genero);
  },

  async buscarPorIds(id_obra: number, id_genero: number) {
    const vinculo = await obraGeneroRepository.findByIds(id_obra, id_genero);
    if (!vinculo) {
      throw new AppError(
        "Vínculo entre obra e gênero não encontrado.",
        404,
        "OBRA_GENERO_NOT_FOUND"
      );
    }
    return vinculo;
  },

  async criar(data: CreateObraGeneroInput) {
    const { id_obra, id_genero } = data;

    if (!Number.isInteger(id_obra) || id_obra <= 0) {
      throw new AppError("ID da obra inválido ou ausente.", 400, "VALIDATION_ERROR");
    }

    if (!Number.isInteger(id_genero) || id_genero <= 0) {
      throw new AppError("ID do gênero inválido ou ausente.", 400, "VALIDATION_ERROR");
    }

    const existente = await obraGeneroRepository.findByIds(id_obra, id_genero);
    if (existente) {
      throw new AppError(
        "Este gênero já está vinculado a esta obra.",
        409,
        "OBRA_GENERO_ALREADY_EXISTS"
      );
    }

    try {
      return await obraGeneroRepository.create({ id_obra, id_genero });
    } catch (error: any) {
      if (error?.code === "23503") {
        throw new AppError(
          "Obra ou gênero informados não existem.",
          404,
          "FOREIGN_KEY_VIOLATION"
        );
      }
      throw error;
    }
  },

  async deletar(id_obra: number, id_genero: number) {
    const deletado = await obraGeneroRepository.delete(id_obra, id_genero);
    if (!deletado) {
      throw new AppError(
        "Vínculo entre obra e gênero não encontrado.",
        404,
        "OBRA_GENERO_NOT_FOUND"
      );
    }
  },
};