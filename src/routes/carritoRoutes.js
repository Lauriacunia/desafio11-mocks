import { Router } from "express";
const router = Router();
import {
  createCarrito,
  deleteCarritoById,
  getAllCarritos,
  getCarritoById,
  agregarProductoACarrito,
  borrarProductoDeCarrito,
  listarProductosDeCarrito,
} from "../controllers/carritosController.js";


router.get("/", getAllCarritos);
router.get("/:id", getCarritoById);
router.post("/", createCarrito);
router.delete("/:id", deleteCarritoById);
router.post("/:idCarrito/productos/:idProducto", agregarProductoACarrito);
router.delete("/:idCarrito/productos/:idProducto", borrarProductoDeCarrito);
router.get("/:id/productos", listarProductosDeCarrito);

export default router;
