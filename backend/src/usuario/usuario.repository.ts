import { pool } from "../db";

export interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha?: string;
  foto_mimetype?: string | null;
}

export const usuarioRepository = {
  async findAll(): Promise<Usuario[]> {
    const result = await pool.query(
      "SELECT id_usuario, nome, email, foto_mimetype FROM seenema.usuario ORDER BY id_usuario ASC"
    );
    return result.rows;
  },

  async findById(id: number): Promise<Usuario | null> {
    const result = await pool.query(
      "SELECT id_usuario, nome, email, foto_mimetype FROM seenema.usuario WHERE id_usuario = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async findByEmail(email: string): Promise<Usuario | null> {
    const result = await pool.query(
      "SELECT id_usuario, nome, email, senha FROM seenema.usuario WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  },

  async create(nome: string, email: string, senhaHash: string): Promise<Usuario> {
    const result = await pool.query(
      `INSERT INTO seenema.usuario (nome, email, senha)
       VALUES ($1, $2, $3)
       RETURNING id_usuario, nome, email`,
      [nome, email, senhaHash]
    );
    return result.rows[0];
  },

  async update(
    id: number,
    dados: { nome?: string; email?: string; senhaHash?: string }
  ): Promise<Usuario | null> {
    const result = await pool.query(
      `UPDATE seenema.usuario
       SET nome = COALESCE($1, nome),
           email = COALESCE($2, email),
           senha = COALESCE($3, senha)
       WHERE id_usuario = $4
       RETURNING id_usuario, nome, email`,
      [dados.nome ?? null, dados.email ?? null, dados.senhaHash ?? null, id]
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM seenema.usuario WHERE id_usuario = $1",
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },

  async updateFoto(id: number, buffer: Buffer, mimetype: string): Promise<boolean> {
    const result = await pool.query(
      `UPDATE seenema.usuario
       SET foto_perfil = $1, foto_mimetype = $2
       WHERE id_usuario = $3`,
      [buffer, mimetype, id]
    );
    return (result.rowCount ?? 0) > 0;
  },

  async findFotoById(id: number): Promise<{ foto_perfil: Buffer; foto_mimetype: string } | null> {
    const result = await pool.query(
      `SELECT foto_perfil, foto_mimetype
       FROM seenema.usuario
       WHERE id_usuario = $1 AND foto_perfil IS NOT NULL`,
      [id]
    );
    return result.rows[0] || null;
  },
};