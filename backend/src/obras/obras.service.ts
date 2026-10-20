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