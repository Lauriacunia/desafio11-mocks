import { carritosDao as repo } from "../daos/index.js";

const getAllCarritos = async (req, res) => {
  try {
    const carritos = await repo.getAll();
    carritos
      ? res.status(200).json(carritos)
      : res.status(404).json({ message: "No hay carritos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCarritoById = async (req, res) => {
  try {
    const carrito = await repo.getOne(req.params.id);
    carrito
      ? res.status(200).json(carrito)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCarrito = async (req, res) => {
  try {
    const nuevoCarrito = await repo.create(req.body);
    res.status(201).json({
      message: "Carrito creado con éxito",
      carrito: nuevoCarrito,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCarritoById = async (req, res) => {
  try {
    const carrito = await repo.getOne(req.params.id);
    if (carrito) {
      const carritoDeleted = await repo.deleteById(req.params.id);
      res.status(200).json({
        message: "Carrito eliminado con éxito",
        carrito: carritoDeleted,
      });
    } else {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const agregarProductoACarrito = async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await repo.getOne(idCarrito);
    const producto = await repo.getOne(idProducto);
    if (idCarrito && idProducto) {
      await repo.agregarProducto(idCarrito, idProducto);

      res.status(201).json({
        message: "Producto agregados con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
};

const borrarProductoDeCarrito = async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await repo.getOne(idCarrito);
    const producto = await repo.getOne(idProducto);
    if (idCarrito && idProducto) {
      await repo.borrarProducto(idCarrito, idProducto);

      res.status(200).json({
        message: "Producto eliminado con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
};

const listarProductosDeCarrito = async (req, res) => {
  try {
    const carrito = await repo.getOne(req.params.id);
    if (carrito) {
      const productos = await repo.listarProductosDelCarrito(req.params.id);
      res.status(200).json(productos);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllCarritos,
  getCarritoById,
  createCarrito,
  deleteCarritoById,
  agregarProductoACarrito,
  borrarProductoDeCarrito,
  listarProductosDeCarrito,
};
