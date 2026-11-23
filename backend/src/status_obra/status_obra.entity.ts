export interface StatusObraProps {
  id_usuario: number;
  id_obra: number;
  nota?: number | null;
  status: string;
}

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

export class StatusObra {
  private _id_usuario: number;
  private _id_obra: number;
  private _nota: number | null;
  private _status: string;

  constructor(props: StatusObraProps) {
    this._id_usuario = props.id_usuario;
    this._id_obra = props.id_obra;
    this._nota = props.nota ?? null;
    this._status = props.status;
  }

  public get id_usuario(): number {
    return this._id_usuario;
  }

  public get id_obra(): number {
    return this._id_obra;
  }

  public get nota(): number | null {
    return this._nota;
  }

  public get status(): string {
    return this._status;
  }

  public toJSON(): StatusObraDTO {
    return {
      id_usuario: this._id_usuario,
      id_obra: this._id_obra,
      nota: this._nota,
      status: this._status,
    };
  }
}