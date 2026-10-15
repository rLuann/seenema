import * as obrasRepository from "./obras.repository";

export async function listAll() {
  return obrasRepository.findAll();
}
