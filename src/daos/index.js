import dotenv from "dotenv";
dotenv.config();
let productosDao;
let carritosDao;

/** 🗨  Según la variable de entorno
 * setea el repositorio a utilizar
 */

switch (process.env.DB_CONNECTION) {
  case "mysql":
    import("../repositories/sql/productosRepository.js").then(({ ProductosRepository }) => {
       /** retorna una instacia del repositorio correspondiente */
        productosDao = new ProductosRepository();             
    });
    import("../repositories/sql/carritosRepository.js").then(({ CarritosRepository }) => {
        carritosDao = new CarritosRepository();
    });
  case "mongoDB":
    import("../repositories/mongoDb/mongoProductosRepository.js").then(
      ({ MongoProductosRepository }) => {
        productosDao = new MongoProductosRepository();
      }
    );
    import("../repositories/mongoDb/mongoCarritosRepository.js").then(
      ({ MongoCarritosRepository }) => {
        carritosDao = new MongoCarritosRepository();
      }
    );
    break;

  default:
    throw new Error("No se ha definido una conexión a la base de datos");
    break;
}

export { productosDao, carritosDao};
