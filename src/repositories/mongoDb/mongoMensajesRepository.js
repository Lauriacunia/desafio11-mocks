import MongoBaseRepository from "./mongoBaseRepository.js";
import { mensajesSchema } from "../../models/mensajesSchema.js";

export class MongoMensajesRepository extends MongoBaseRepository {
  constructor() {
    super("mensajes", mensajesSchema);
  }
}
