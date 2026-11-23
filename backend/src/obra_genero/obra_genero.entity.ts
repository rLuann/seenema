export interface ObraGeneroProps {
  id_obra: number;
  id_genero: number;
}

export interface ObraGeneroDTO {
  id_obra: number;
  id_genero: number;
}

export interface CreateObraGeneroInput {
  id_obra: number;
  id_genero: number;
}

export class ObraGenero {
  private _id_obra: number;
  private _id_genero: number;

  constructor(props: ObraGeneroProps) {
    this._id_obra = props.id_obra;
    this._id_genero = props.id_genero;
  }

  public get id_obra(): number {
    return this._id_obra;
  }

  public get id_genero(): number {
    return this._id_genero;
  }

  public toJSON(): ObraGeneroDTO {
    return {
      id_obra: this._id_obra,
      id_genero: this._id_genero,
    };
  }
}