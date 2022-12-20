import BaseRepository from "./baseRepository.js";

export class ProductosRepository extends BaseRepository {
  constructor() {
    /** 🗨 Ésta clase hereda de ContenedorBase por lo que puede acceder
     * a todos sus métodos y propiedades.
     */
    super("productos");
  }

  /**sobreescribe el update de BaseRepository */
  async update(id, body) {
    try {
      const { nombre, descripcion, codigo, foto, precio, stock } = body;
      const timestamp = new Date();
      await db(this.table).where("id", id).update({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        timestamp,
      });
      const updated_product = this.getOne(id);
      return updated_product;
    } catch (error) {
      return error.message;
    }
  }
}


