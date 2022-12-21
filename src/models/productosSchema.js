import mongoose from "mongoose";

export const productosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  codigo: {
    type: String
  },
  foto: {
    type: String
  },
  precio: {
    type: Number,
    default: 0,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});
