import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { loadConfig } from "../config";

const config = loadConfig();

export interface TokenPayload {
  id_usuario: number;
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    usuario?: TokenPayload;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token de autenticação não fornecido.", 401, "UNAUTHORIZED"));
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Formato do token inválido. Use: Bearer <token>.", 401, "UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as TokenPayload;
    req.usuario = decoded;

    return next();
  } catch (error) {
    return next(new AppError("Token inválido ou expirado.", 401, "UNAUTHORIZED"));
  }
}