import MongoBaseRepository from "./mongoBaseRepository.js";
import { carritosSchema } from "../../models/carritosSchema.js";;

export class MongoCarritosRepository extends MongoBaseRepository {
  constructor() {
    super("carritos", carritosSchema);
  }
}
