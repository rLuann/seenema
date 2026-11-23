import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import obrasRoutes from "./obras/obras.routes";
import usuariosRoutes from "./usuario/usuario.routes";
import generoRoutes from "./genero/genero.routes";
import statusObraRoutes from "./status_obra/status_obra.routes";
import obraGeneroRoutes from "./obra_genero/obra_genero.routes";

import { errorHandler } from "./errors/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { loadConfig } from "./config";
import { AppError } from "./errors/AppError";
import { authRoutes } from "./auth/auth.routes";
const config = loadConfig();
const app = express();

app.use(express.json()); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use(obrasRoutes);
app.use(usuariosRoutes);
app.use(generoRoutes);
app.use(statusObraRoutes);
app.use(obraGeneroRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: AppError = new AppError("A rota solicitada não existe.", 404, "ROUTE_NOT_FOUND");
  next(err);
});
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🎬 Servidor do SEEnema rodando em http://localhost:${config.port}`);
});