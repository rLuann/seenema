import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { AppError } from "../errors/AppError";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
   
    const { email, senha } = req.body;

    if (!email || !senha) {
 
      next(new AppError("E-mail e senha são obrigatórios.", 400, "BAD_REQUEST"));
      return; 
    }

    const result = await authService.login(email, senha);

    res.status(200).json(result);

  } catch (error: any) {
    next(error);
  }
}