import { productosDao as repo } from "../daos/index.js";

/** Los controllers procesan la request que llega y 
 *  formulan la response del endpoint.
 *  Pueden contener lógica de negocio, validaciones, etc.
 *  O pueden delegar esa responsabilidad a los services.
 */
const getAllProductos = async (req, res) => {
  try {
    const productos = await repo.getAll();
    productos
      ? res.status(200).json(productos)
      : res.status(404).json({ message: "No hay productos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOneProducto = async (req, res) => {
  try {
    const producto = await repo.getOne(req.params.id);
    if(producto.length > 0) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProducto =  async (req, res) => {
  try {
    const nuevoProducto = await repo.create(req.body);
    res.status(201).json({
      message: "Producto creado con éxito",
      producto: nuevoProducto,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const productoActualizado = await repo.update(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Producto actualizado con éxito",
      producto: productoActualizado,
    });
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const fueBorrado = await repo.deleteById(req.params.id);
    fueBorrado
      ? res.status(200).json({ message: "Producto borrado con éxito", id: req.params.id })
      : res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
    
  } catch (err) {
    return err.message;
  }
};

export { getAllProductos, getOneProducto, createProducto, updateProducto, deleteProducto };

