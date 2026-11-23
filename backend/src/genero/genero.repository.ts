import { pool } from "../db";
import { GeneroDTO } from "./genero.entity";

export const generoRepository = {
  async findAll(): Promise<GeneroDTO[]> {
    const result = await pool.query(
      "SELECT id_genero, nome_genero AS nome FROM seenema.genero ORDER BY id_genero ASC"
    );
    return result.rows;
  },

  async findById(id: number): Promise<GeneroDTO | null> {
    const result = await pool.query(
      "SELECT id_genero, nome_genero AS nome FROM seenema.genero WHERE id_genero = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async findByNome(nome: string): Promise<GeneroDTO | null> {
    const result = await pool.query(
      "SELECT id_genero, nome_genero AS nome FROM seenema.genero WHERE LOWER(nome_genero) = LOWER($1)",
      [nome]
    );
    return result.rows[0] || null;
  },

  async create(nome: string): Promise<GeneroDTO> {
    const result = await pool.query(
      `INSERT INTO seenema.genero (nome_genero)
       VALUES ($1)
       RETURNING id_genero, nome_genero AS nome`,
      [nome]
    );
    return result.rows[0];
  },

  async update(id: number, nome?: string): Promise<GeneroDTO | null> {
    const result = await pool.query(
      `UPDATE seenema.genero
       SET nome_genero = COALESCE($1, nome_genero)
       WHERE id_genero = $2
       RETURNING id_genero, nome_genero AS nome`,
      [nome ?? null, id]
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM seenema.genero WHERE id_genero = $1",
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },
};