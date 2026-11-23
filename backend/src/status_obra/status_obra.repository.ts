import { pool } from "../db";

export interface StatusObraDTO {
  id_usuario: number;
  id_obra: number;
  nota: number | null;
  status: string;
}

export interface CreateStatusObraInput {
  id_usuario: number;
  id_obra: number;
  nota?: number | null;
  status: string;
}

export interface UpdateStatusObraInput {
  nota?: number | null;
  status?: string;
}

export const statusObraRepository = {
  async findAll(): Promise<StatusObraDTO[]> {
    const result = await pool.query(
      `SELECT id_usuario, id_obra, nota, status
       FROM seenema.status_obra
       ORDER BY id_usuario ASC, id_obra ASC`
    );
    return result.rows;
  },

  async findByUsuario(id_usuario: number): Promise<StatusObraDTO[]> {
    const result = await pool.query(
      `SELECT id_usuario, id_obra, nota, status
       FROM seenema.status_obra
       WHERE id_usuario = $1
       ORDER BY id_obra ASC`,
      [id_usuario]
    );
    return result.rows;
  },

  async findByObra(id_obra: number): Promise<StatusObraDTO[]> {
    const result = await pool.query(
      `SELECT id_usuario, id_obra, nota, status
       FROM seenema.status_obra
       WHERE id_obra = $1
       ORDER BY id_usuario ASC`,
      [id_obra]
    );
    return result.rows;
  },

  async findByIds(id_usuario: number, id_obra: number): Promise<StatusObraDTO | null> {
    const result = await pool.query(
      `SELECT id_usuario, id_obra, nota, status
       FROM seenema.status_obra
       WHERE id_usuario = $1 AND id_obra = $2`,
      [id_usuario, id_obra]
    );
    return result.rows[0] || null;
  },

  async create(data: CreateStatusObraInput): Promise<StatusObraDTO> {
    const result = await pool.query(
      `INSERT INTO seenema.status_obra (id_usuario, id_obra, nota, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id_usuario, id_obra, nota, status`,
      [data.id_usuario, data.id_obra, data.nota ?? null, data.status]
    );
    return result.rows[0];
  },

  async update(
    id_usuario: number,
    id_obra: number,
    data: UpdateStatusObraInput
  ): Promise<StatusObraDTO | null> {
    const result = await pool.query(
      `UPDATE seenema.status_obra
       SET nota = COALESCE($1, nota),
           status = COALESCE($2, status)
       WHERE id_usuario = $3 AND id_obra = $4
       RETURNING id_usuario, id_obra, nota, status`,
      [data.nota ?? null, data.status ?? null, id_usuario, id_obra]
    );
    return result.rows[0] || null;
  },

  async delete(id_usuario: number, id_obra: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM seenema.status_obra
       WHERE id_usuario = $1 AND id_obra = $2`,
      [id_usuario, id_obra]
    );
    return (result.rowCount ?? 0) > 0;
  },
};