export interface ObraProps {
  titulo: string;
  sinopse: string;
  tipo: 'Filme' | 'Série'; 
  poster?: string;
  num_episodios?: number;
  num_temporada?: number;
  ano_lancamento?: number;
}

export class Obra {
  private _id_obra: number;
  private _titulo: string;
  private _sinopse: string;
  private _tipo: 'Filme' | 'Série'; 
  private _poster: string | null;
  private _num_episodios: number | null;
  private _num_temporada: number | null;
  private _ano_lancamento: number | null;

  constructor(props: ObraProps, id_obra?: number) {
    this._id_obra = id_obra ?? 0;
    
    this._titulo = props.titulo;
    this._sinopse = props.sinopse;
    this._tipo = props.tipo; // Inicializando o tipo
    this._poster = props.poster ?? null;
    this._num_episodios = props.num_episodios ?? null;
    this._num_temporada = props.num_temporada ?? null;
    this._ano_lancamento = props.ano_lancamento ?? null;
  }

  // --- GETTERS ---
  public get id_obra(): number {
    return this._id_obra;
  }
  public get titulo(): string {
    return this._titulo;
  }
  public get sinopse(): string {
    return this._sinopse;
  }
  public get tipo(): 'Filme' | 'Série' { // Getter para o novo campo
    return this._tipo;
  }
  public get poster(): string | null {
    return this._poster;
  }
  public get num_episodios(): number | null {
    return this._num_episodios;
  }
  public get num_temporada(): number | null {
    return this._num_temporada;
  }
  public get ano_lancamento(): number | null {
    return this._ano_lancamento;
  }

  // --- SETTERS ---
  public set titulo(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("O título da obra é obrigatório.");
    }
    if (value.length > 100) {
      throw new Error("O título não pode ultrapassar 100 caracteres.");
    }
    this._titulo = value;
  }

  public set sinopse(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("A sinopse da obra é obrigatória.");
    }
    this._sinopse = value;
  }

  public set tipo(value: 'Filme' | 'Série') {
    // Garantindo que a classe aceite apenas os valores exatos do seu ENUM do banco
    if (value !== 'Filme' && value !== 'Série') {
      throw new Error("O tipo da obra deve ser 'Filme' ou 'Série'.");
    }
    this._tipo = value;
  }

  public set poster(value: string | null) {
    if (value && value.length > 100) {
      throw new Error("O link do poster não pode ultrapassar 100 caracteres.");
    }
    this._poster = value;
  }

  public set num_episodios(value: number | null) {
    if (value !== null && value <= 0) {
      throw new Error("O número de episódios não pode ser negativo ou zero.");
    }
    this._num_episodios = value;
  }

  public set num_temporada(value: number | null) {
    if (value !== null && value <= 0) {
      throw new Error("O número da temporada não pode ser negativo ou zero.");
    }
    this._num_temporada = value;
  }

  public set ano_lancamento(value: number | null) {
    if (value !== null && value < 1888) {
      throw new Error("Ano de lançamento inválido. O cinema foi inventado em 1888.");
    }
    this._ano_lancamento = value;
  }

}