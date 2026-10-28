export interface UsuarioProps {
  nome: string;
  email: string;
  senha?: string; 
}

export class Usuario {
  private _id_usuario: number;
  private _nome: string;
  private _email: string;
  private _senha?: string;

  constructor(props: UsuarioProps, id_usuario?: number) {
    this._id_usuario = id_usuario ?? 0;
    this._nome = props.nome;
    this._email = props.email;
    this._senha = props.senha;
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
}