import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { loadConfig } from "../config"; 

const config = loadConfig();


declare module "express-serve-static-core" {
  interface Request {
    usuario?: any;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token de autenticação não fornecido.", 401, "UNAUTHORIZED"));
  }


  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.usuario = decoded;

  
    return next();
  } catch (error) {
    return next(new AppError("Token inválido ou expirado.", 401, "UNAUTHORIZED"));
  }
}