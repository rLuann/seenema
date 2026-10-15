import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig { 
  port: number; 
  databaseUrl: string; 
} 

export function loadConfig(): AppConfig { 
  const databaseUrl = process.env.DATABASE_URL; 

  if (!databaseUrl) { 
    console.error("Erro: DATABASE_URL não está definida no .env."); 
    process.exit(1); 
  } 

  return { 
    port: parseInt(process.env.PORT ?? "3000", 10), 
    databaseUrl, 
  }; 
}