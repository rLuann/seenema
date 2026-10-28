import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuarioRepository from "../usuario/usuario.repository"; 
import { AppError } from "../errors/AppError";
import { loadConfig } from "../config"; 

const config = loadConfig();

export async function login(email: string, senha_digitada: string) {
  const usuario = await usuarioRepository.findByEmail(email);
  
  if (!usuario || !usuario.senha) {
    throw new AppError("E-mail ou senha incorretos.", 401, "UNAUTHORIZED");
  }

  const senhaValida = await bcrypt.compare(senha_digitada, usuario.senha);
  
  if (!senhaValida) {
    throw new AppError("E-mail ou senha incorretos.", 401, "UNAUTHORIZED");
  }

  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, email: usuario.email }, 
    config.jwtSecret, 
    { expiresIn: "2h" }
  );

  return {
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email
    }
  };
}