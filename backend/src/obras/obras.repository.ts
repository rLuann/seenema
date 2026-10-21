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

  
  if (!row) return null;

  
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

export async function save(obra: Obra): Promise<Obra> {
  const query = `
    INSERT INTO obra (
      titulo, 
      sinopse, 
      tipo, 
      poster, 
      num_episodios, 
      num_temporada, 
      ano_lancamento
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING id_obra;
  `;

  const values = [
    obra.titulo,
    obra.sinopse,
    obra.tipo,
    obra.poster,
    obra.num_episodios,
    obra.num_temporada,
    obra.ano_lancamento
  ];

  const result = await pool.query(query, values);
  const insertedId = result.rows[0].id_obra;

  return new Obra(
    {
      titulo: obra.titulo,
      sinopse: obra.sinopse,
      tipo: obra.tipo,
      poster: obra.poster,
      num_episodios: obra.num_episodios,
      num_temporada: obra.num_temporada,
      ano_lancamento: obra.ano_lancamento
    },
    insertedId
  );
}

export async function update(obra: Obra): Promise<Obra> {
  const query = `
    UPDATE obra
    SET 
      titulo = $1, 
      sinopse = $2, 
      tipo = $3, 
      poster = $4, 
      num_episodios = $5, 
      num_temporada = $6, 
      ano_lancamento = $7
    WHERE id_obra = $8
    RETURNING id_obra;
  `;

  const values = [
    obra.titulo,
    obra.sinopse,
    obra.tipo,
    obra.poster,
    obra.num_episodios,
    obra.num_temporada,
    obra.ano_lancamento,
    obra.id_obra 
  ];

  const result = await pool.query(query, values);

  return new Obra(
    {
      titulo: obra.titulo,
      sinopse: obra.sinopse,
      tipo: obra.tipo,
      poster: obra.poster ?? undefined,
      num_episodios: obra.num_episodios ?? undefined,
      num_temporada: obra.num_temporada ?? undefined,
      ano_lancamento: obra.ano_lancamento ?? undefined
    },
    result.rows[0].id_obra
  );
}

export async function remove(id_obra: number): Promise<void> {
  const query = `
    DELETE FROM obra 
    WHERE id_obra = $1;
  `;

  await pool.query(query, [id_obra]);
}