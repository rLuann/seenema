import { Request, Response, NextFunction } from "express";
import * as obrasService from "./obras.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const obras = await obrasService.listAll();
    
    res.status(200).json(obras);
  } catch (err) {
    next(err);
  }
}