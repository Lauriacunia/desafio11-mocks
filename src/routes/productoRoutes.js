import { Router } from "express";
const router = Router();
import {
  getAllProductos,
  getOneProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productosController.js";

/** Aquí se definen las rutas 
 * y cuales son los controllers de cada endpoint. 
 * También pueden implementarse middlewares específicos
 * para cada ruta. 
 * */

router.get("/", getAllProductos);
router.get("/:id", getOneProducto);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;
