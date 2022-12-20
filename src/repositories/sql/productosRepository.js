import BaseRepository from "./baseRepository.js";

export class ProductosRepository extends BaseRepository {
  constructor() {
    /** 🗨 Ésta clase hereda de ContenedorBase por lo que puede acceder
     * a todos sus métodos y propiedades.
     */
    super("productos");
  }
}


