import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import { usuarioRepository } from "./usuario.repository";

export const usuarioService = {
  async listarTodos() {
    return usuarioRepository.findAll();
  },

  async buscarPorId(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404, "USER_NOT_FOUND");
    }
    return usuario;
  },

  async criar(nome: string, email: string, senha: string) {
    if (!nome || !email || !senha) {
      throw new AppError("Nome, e-mail e senha são obrigatórios.", 400, "VALIDATION_ERROR");
    }

    const existente = await usuarioRepository.findByEmail(email);
    if (existente) {
      throw new AppError("Este e-mail já está cadastrado.", 409, "EMAIL_ALREADY_EXISTS");
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    return usuarioRepository.create(nome, email, senhaHash);
  },

  async atualizar(id: number, dados: { nome?: string; email?: string; senha?: string }) {
    const usuarioAtual = await this.buscarPorId(id);

    if (dados.email && dados.email !== usuarioAtual.email) {
      const emailEmUso = await usuarioRepository.findByEmail(dados.email);
      if (emailEmUso) {
        throw new AppError("Este e-mail já está cadastrado.", 409, "EMAIL_ALREADY_EXISTS");
      }
    }

    let senhaHash: string | undefined;
    if (dados.senha) {
      senhaHash = await bcrypt.hash(dados.senha, 10);
    }

    return usuarioRepository.update(id, {
      nome: dados.nome,
      email: dados.email,
      senhaHash,
    });
  },

  async deletar(id: number) {
    const deletado = await usuarioRepository.delete(id);
    if (!deletado) {
      throw new AppError("Usuário não encontrado.", 404, "USER_NOT_FOUND");
    }
  },

  async salvarFotoPerfil(id: number, file?: Express.Multer.File) {
    await this.buscarPorId(id);

    if (!file) {
      throw new AppError("Nenhum arquivo de imagem foi enviado.", 400, "FILE_REQUIRED");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw new AppError("O arquivo enviado deve ser uma imagem válida.", 400, "INVALID_FILE_TYPE");
    }

    await usuarioRepository.updateFoto(id, file.buffer, file.mimetype);
    return {
      mensagem: "Foto de perfil armazenada com sucesso.",
      mimetype: file.mimetype,
      tamanhoBytes: file.size,
    };
  },

  async obterFotoPerfil(id: number) {
    const foto = await usuarioRepository.findFotoById(id);
    if (!foto) {
      throw new AppError("Foto de perfil não encontrada para este usuário.", 404, "PHOTO_NOT_FOUND");
    }
    return foto;
  },
};