export interface UsuarioProps {
  nome: string;
  email: string;
  senha?: string;
  foto_mimetype?: string | null;
  foto_perfil?: Buffer | null;
}

export interface UsuarioDTO {
  id_usuario: number;
  nome: string;
  email: string;
  senha?: string;
  foto_mimetype?: string | null;
}

export class Usuario {
  private _id_usuario: number;
  private _nome: string;
  private _email: string;
  private _senha?: string;
  private _foto_mimetype?: string | null;
  private _foto_perfil?: Buffer | null;

  constructor(props: UsuarioProps, id_usuario?: number) {
    this._id_usuario = id_usuario ?? 0;
    this._nome = props.nome;
    this._email = props.email;
    this._senha = props.senha;
    this._foto_mimetype = props.foto_mimetype ?? null;
    this._foto_perfil = props.foto_perfil ?? null;
  }

  public get id_usuario(): number {
    return this._id_usuario;
  }

  public get nome(): string {
    return this._nome;
  }

  public get email(): string {
    return this._email;
  }

  public get senha(): string | undefined {
    return this._senha;
  }

  public get foto_mimetype(): string | null | undefined {
    return this._foto_mimetype;
  }

  public get foto_perfil(): Buffer | null | undefined {
    return this._foto_perfil;
  }

  public toJSON(): Omit<UsuarioDTO, "senha"> {
    return {
      id_usuario: this._id_usuario,
      nome: this._nome,
      email: this._email,
      foto_mimetype: this._foto_mimetype ?? null,
    };
  }
}