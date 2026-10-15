import { pool } from "../db";

export async function findAll() {
  const result = await pool.query(`
    SELECT *
    FROM obra
    ORDER BY id_obra ASC
  `);
  
  return result.rows;
}