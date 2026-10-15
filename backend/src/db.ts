import { Pool } from "pg";
import { loadConfig } from "./config";

const config = loadConfig();

export const pool = new Pool({ 
  connectionString: config.databaseUrl,
  ssl: { rejectUnauthorized: false } 
});


pool.on('connect', client => {
  client.query('SET search_path TO seenema, public');
});