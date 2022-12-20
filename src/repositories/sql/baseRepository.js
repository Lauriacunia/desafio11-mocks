import knex from "knex";
import { options } from "../../config/configDB.js";
const db = knex(options.mysql);

/**🗨 Éstas líneas realizan un CRUD para cualquier entidad
 *   reciben el nombre de la tabla a utilizar en su constructor.
 */
class BaseRepository {
  constructor(table) {
    this.table = table;
  }
  async getAll() {
    try {
      const items = await db(this.table).select("*");
      return items;
    } catch (error) {
      return error.message;
    }
  }
  async getOne(id) {
    try {
      const item = await db(this.table).select("*").where("id", id);
      return item;
    } catch (error) {
      return error.message;
    }
  }
  async create(body) {
    try {
      const newItemId = await db(this.table).insert(body);
      const newItem = await db(this.table).select("*").where("id", newItemId);
      return newItem;
    } catch (error) {
      return error.message;
    }
  }

  async update(id, body) {
    try {
      await db(this.table).where("id", id).update(body);
      const updatedItem = this.getOne(id);
      return updatedItem;
    } catch (error) {
      return error.message;
    }
  }
  async deleteById(id) {
    try {
      /**🗨 Revisar en la documentación que retorna cada query
       * Aqui retorna '0' si no se borra nada y '1' si se borra algo
       */
      const deletedItem = await db(this.table).where("id", id).del();
      if (deletedItem > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default BaseRepository;
