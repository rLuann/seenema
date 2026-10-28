import { pool } from "../db";
import { Usuario, UsuarioProps } from "./usuario.entity";

export async function findByEmail(email: string): Promise<Usuario | null> {
  const result = await pool.query(
    "SELECT * FROM seenema.usuario WHERE email = $1",
    [email]
  );

  const row = result.rows[0];

  if (!row) return null;

  const props: UsuarioProps = {
    nome: row.nome,
    email: row.email,
    senha: row.senha
  };

  return new Usuario(props, row.id_usuario);
}