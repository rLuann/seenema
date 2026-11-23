export interface GeneroProps {
  nome: string;
}

export interface GeneroDTO {
  id_genero: number;
  nome: string;
}

export class Genero {
  private _id_genero: number;
  private _nome: string;

  constructor(props: GeneroProps, id_genero?: number) {
    this._id_genero = id_genero ?? 0;
    this._nome = props.nome;
  }

  public get id_genero(): number {
    return this._id_genero;
  }

  public get nome(): string {
    return this._nome;
  }

  public toJSON(): GeneroDTO {
    return {
      id_genero: this._id_genero,
      nome: this._nome,
    };
  }
}