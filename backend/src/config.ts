import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig { 
  port: number; 
  databaseUrl: string; 
  jwtSecret: string;
} 

export function loadConfig(): AppConfig { 
  const databaseUrl = process.env.DATABASE_URL; 
  const jwtSecret = process.env.JWT_SECRET;

  if (!databaseUrl) { 
    console.error("Erro: DATABASE_URL não está definida no .env."); 
    process.exit(1); 
  } 

 if (!jwtSecret) {
   throw new Error("Falha na inicialização: JWT_SECRET não está definida.");
  }
   return { 
    port: parseInt(process.env.PORT ?? "3000", 10), 
    databaseUrl, 
    jwtSecret,
  }; 
}