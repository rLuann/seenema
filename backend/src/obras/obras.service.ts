import * as obrasRepository from "./obras.repository";
import { Obra, ObraProps} from "./obras.entity";
import { AppError } from "../errors/AppError";

export async function listAll() {
  return obrasRepository.findAll();
}

export async function getById(id: number) {
  const obra = await obrasRepository.findById(id);
  
  if (!obra) {
    throw new AppError("Obra não encontrada no catálogo.", 404, "NOT_FOUND");
  }

  return obra;
}

export async function create(props: ObraProps): Promise<Obra> {
  const novaObra = new Obra(props);

  return await obrasRepository.save(novaObra);
}

export async function update(id: number, props: ObraProps): Promise<Obra> {
  const obraExistente = await obrasRepository.findById(id);
  
  if (!obraExistente) {
    throw new AppError("Obra não encontrada para atualização.", 404, "NOT_FOUND");
  }

  const obraAtualizada = new Obra(props, id);

  return await obrasRepository.update(obraAtualizada);
}

export async function remove(id: number): Promise<void> {
  const obraExistente = await obrasRepository.findById(id);
  
  if (!obraExistente) {
    throw new AppError("Obra não encontrada para exclusão.", 404, "NOT_FOUND");
  }

  await obrasRepository.remove(id);
}