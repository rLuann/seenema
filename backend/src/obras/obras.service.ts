import * as obrasRepository from "./obras.repository";
import { Obra, ObraProps} from "./obras.entity"

export async function listAll() {
  return obrasRepository.findAll();
}

export async function getById(id: number) {
  
  const obra = await obrasRepository.findById(id);
  
  if (!obra) {
    const error = new Error("Obra não encontrada no catálogo.");
    (error as any).statusCode = 404; 
    throw error; 
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
    const error = new Error("Obra não encontrada para atualização.");
    (error as any).statusCode = 404;
    throw error;
  }

  const obraAtualizada = new Obra(props, id);

  return await obrasRepository.update(obraAtualizada);
}

export async function remove(id: number): Promise<void> {
  const obraExistente = await obrasRepository.findById(id);
  
  if (!obraExistente) {
    const error = new Error("Obra não encontrada para exclusão.");
    (error as any).statusCode = 404;
    throw error;
  }

  await obrasRepository.remove(id);
}