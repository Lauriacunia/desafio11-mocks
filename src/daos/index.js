import dotenv from "dotenv";
dotenv.config();
let productosDao;
let carritosDao;


switch (process.env.DB_CONNECTION) {
  case "mysql":
    import("../repositories/sql/productosRepository.js").then(({ ProductosRepository }) => {
       /** retorna una instacia del repositorio correspondiente */
        productosDao = new ProductosRepository();             
    });
    import("../repositories/sql/carritosRepository.js").then(({ CarritosRepository }) => {
        carritosDao = new CarritosRepository();
    });
//   case "mongoDB":
//     import("./productos/MongoDBProductos.js").then(({ MongoDBProductos }) => {
//       productosDao = new MongoDBProductos();
//     });
//     import("./carritos/MongoDBCarritos.js").then(({ MongoDBCarritos }) => {
//       carritosDao = new MongoDBCarritos();
//     });
    break;

  default:
    throw new Error("No se ha definido una conexión a la base de datos");
    break;
}

export { productosDao, carritosDao};
