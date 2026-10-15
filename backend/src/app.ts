import "dotenv/config";
import express from "express";
import obrasRoutes from "./obras/obras.routes";
//import { errorHandler } from "./errors/errorHandler";
import { loadConfig } from "./config";

const config = loadConfig();
const app = express();

app.use(express.json()); 

app.use(obrasRoutes);

app.listen(config.port, () => {
  console.log(`🎬 Servidor do SEEnema rodando em http://localhost:${config.port}`);
});