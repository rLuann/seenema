import { pool } from "../db";
import { Obra } from "./obras.entity";

export async function findAll(): Promise<Obra[]> {
  const result = await pool.query(`
    SELECT *
    FROM obra
    ORDER BY id_obra ASC
  `);
  
  const obras = result.rows.map((row) => {
    return new Obra(
      {
        titulo: row.titulo,
        sinopse: row.sinopse,
        tipo: row.tipo, 
        poster: row.poster,
        num_episodios: row.num_episodios,
        num_temporada: row.num_temporada,
        ano_lancamento: row.ano_lancamento
      },
      row.id_obra
    );
  });

  return obras;
}

export async function findById(id_obra: number): Promise<Obra | null> {
  const result = await pool.query(`
    SELECT * 
    FROM obra 
    WHERE id_obra = $1
  `, [id_obra]);

  const row = result.rows[0];

  // Se não encontrar nenhuma obra com esse ID, retorna null para o Service tratar
  if (!row) return null;

  // Se encontrar, mapeia os dados do banco para a nossa classe
  return new Obra(
    {
      titulo: row.titulo,
      sinopse: row.sinopse,
      tipo: row.tipo,
      poster: row.poster,
      num_episodios: row.num_episodios,
      num_temporada: row.num_temporada,
      ano_lancamento: row.ano_lancamento
    },
    row.id_obra
  );
}