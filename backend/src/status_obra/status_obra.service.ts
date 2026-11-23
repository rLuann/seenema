import { AppError } from "../errors/AppError";
import {
  statusObraRepository,
  CreateStatusObraInput,
  UpdateStatusObraInput,
} from "./status_obra.repository";

function validarNota(nota: unknown): number | null | undefined {
  if (nota === undefined || nota === null) {
    return nota;
  }

  if (typeof nota !== "number" || !Number.isInteger(nota) || nota < 0 || nota > 5) {
    throw new AppError("A nota deve ser um número inteiro entre 0 e 5.", 400, "VALIDATION_ERROR");
  }

  return nota;
}

export const statusObraService = {
  async listarTodos() {
    return statusObraRepository.findAll();
  },

  async listarPorUsuario(id_usuario: number) {
    return statusObraRepository.findByUsuario(id_usuario);
  },

  async listarPorObra(id_obra: number) {
    return statusObraRepository.findByObra(id_obra);
  },

  async buscarPorIds(id_usuario: number, id_obra: number) {
    const registro = await statusObraRepository.findByIds(id_usuario, id_obra);
    if (!registro) {
      throw new AppError("Registro de status da obra não encontrado.", 404, "STATUS_OBRA_NOT_FOUND");
    }
    return registro;
  },

  async criar(data: CreateStatusObraInput) {
    const { id_usuario, id_obra, status, nota } = data;

    if (!Number.isInteger(id_usuario) || id_usuario <= 0) {
      throw new AppError("ID do usuário inválido ou ausente.", 400, "VALIDATION_ERROR");
    }

    if (!Number.isInteger(id_obra) || id_obra <= 0) {
      throw new AppError("ID da obra inválido ou ausente.", 400, "VALIDATION_ERROR");
    }

    if (!status || !status.trim()) {
      throw new AppError("O status da obra é obrigatório.", 400, "VALIDATION_ERROR");
    }

    const notaValidada = validarNota(nota);

    const existente = await statusObraRepository.findByIds(id_usuario, id_obra);
    if (existente) {
      throw new AppError(
        "Este usuário já possui um status cadastrado para esta obra.",
        409,
        "STATUS_OBRA_ALREADY_EXISTS"
      );
    }

    try {
      return await statusObraRepository.create({
        id_usuario,
        id_obra,
        status: status.trim(),
        nota: notaValidada ?? null,
      });
    } catch (error: any) {
      if (error?.code === "23503") {
        throw new AppError("Usuário ou obra informados não existem.", 404, "FOREIGN_KEY_VIOLATION");
      }
      throw error;
    }
  },

  async atualizar(id_usuario: number, id_obra: number, data: UpdateStatusObraInput) {
    const atual = await this.buscarPorIds(id_usuario, id_obra);

    let statusLimpo: string | undefined;
    if (data.status !== undefined) {
      statusLimpo = data.status.trim();
      if (!statusLimpo) {
        throw new AppError("O status da obra não pode ser vazio.", 400, "VALIDATION_ERROR");
      }
    }

    const notaValidada = validarNota(data.nota);

    if (statusLimpo === undefined && notaValidada === undefined) {
      return atual;
    }

    return statusObraRepository.update(id_usuario, id_obra, {
      status: statusLimpo,
      nota: notaValidada,
    });
  },

  async deletar(id_usuario: number, id_obra: number) {
    const deletado = await statusObraRepository.delete(id_usuario, id_obra);
    if (!deletado) {
      throw new AppError("Registro de status da obra não encontrado.", 404, "STATUS_OBRA_NOT_FOUND");
    }
  },
};