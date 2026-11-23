import { pool } from "../db";

export interface ObraGeneroDTO {
  id_obra: number;
  id_genero: number;
}

export interface CreateObraGeneroInput {
  id_obra: number;
  id_genero: number;
}

export const obraGeneroRepository = {
  async findAll(): Promise<ObraGeneroDTO[]> {
    const result = await pool.query(
      `SELECT id_obra, id_genero
       FROM seenema.obra_genero
       ORDER BY id_obra ASC, id_genero ASC`
    );
    return result.rows;
  },

  async findByObra(id_obra: number): Promise<ObraGeneroDTO[]> {
    const result = await pool.query(
      `SELECT id_obra, id_genero
       FROM seenema.obra_genero
       WHERE id_obra = $1
       ORDER BY id_genero ASC`,
      [id_obra]
    );
    return result.rows;
  },

  async findByGenero(id_genero: number): Promise<ObraGeneroDTO[]> {
    const result = await pool.query(
      `SELECT id_obra, id_genero
       FROM seenema.obra_genero
       WHERE id_genero = $1
       ORDER BY id_obra ASC`,
      [id_genero]
    );
    return result.rows;
  },

  async findByIds(id_obra: number, id_genero: number): Promise<ObraGeneroDTO | null> {
    const result = await pool.query(
      `SELECT id_obra, id_genero
       FROM seenema.obra_genero
       WHERE id_obra = $1 AND id_genero = $2`,
      [id_obra, id_genero]
    );
    return result.rows[0] || null;
  },

  async create(data: CreateObraGeneroInput): Promise<ObraGeneroDTO> {
    const result = await pool.query(
      `INSERT INTO seenema.obra_genero (id_obra, id_genero)
       VALUES ($1, $2)
       RETURNING id_obra, id_genero`,
      [data.id_obra, data.id_genero]
    );
    return result.rows[0];
  },

  async delete(id_obra: number, id_genero: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM seenema.obra_genero
       WHERE id_obra = $1 AND id_genero = $2`,
      [id_obra, id_genero]
    );
    return (result.rowCount ?? 0) > 0;
  },
};