import * as obrasRepository from "./obras.repository";

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