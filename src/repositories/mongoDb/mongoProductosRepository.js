import MongoBaseRepository from "./mongoBaseRepository.js";
import { productosSchema } from "../../models/productosSchema.js";

export class MongoProductosRepository extends MongoBaseRepository {
  constructor() {
    super("productos", productosSchema);
  }
}
