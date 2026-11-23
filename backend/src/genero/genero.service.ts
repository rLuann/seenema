import { AppError } from "../errors/AppError";
import { generoRepository } from "./genero.repository";

export const generoService = {
  async listarTodos() {
    return generoRepository.findAll();
  },

  async buscarPorId(id: number) {
    const genero = await generoRepository.findById(id);
    if (!genero) {
      throw new AppError("Gênero não encontrado.", 404, "GENRE_NOT_FOUND");
    }
    return genero;
  },

  async criar(nome: string) {
    if (!nome || !nome.trim()) {
      throw new AppError("O nome do gênero é obrigatório.", 400, "VALIDATION_ERROR");
    }

    const nomeLimpo = nome.trim();
    const existente = await generoRepository.findByNome(nomeLimpo);
    if (existente) {
      throw new AppError("Este gênero já está cadastrado.", 409, "GENRE_ALREADY_EXISTS");
    }

    return generoRepository.create(nomeLimpo);
  },

  async atualizar(id: number, nome?: string) {
    const generoAtual = await this.buscarPorId(id);

    if (nome !== undefined) {
      const nomeLimpo = nome.trim();
      if (!nomeLimpo) {
        throw new AppError("O nome do gênero não pode ser vazio.", 400, "VALIDATION_ERROR");
      }

      if (nomeLimpo.toLowerCase() !== generoAtual.nome.toLowerCase()) {
        const emUso = await generoRepository.findByNome(nomeLimpo);
        if (emUso) {
          throw new AppError("Este gênero já está cadastrado.", 409, "GENRE_ALREADY_EXISTS");
        }
      }

      return generoRepository.update(id, nomeLimpo);
    }

    return generoAtual;
  },

  async deletar(id: number) {
    const deletado = await generoRepository.delete(id);
    if (!deletado) {
      throw new AppError("Gênero não encontrado.", 404, "GENRE_NOT_FOUND");
    }
  },
};