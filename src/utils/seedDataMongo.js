import { faker } from "@faker-js/faker/locale/es";
import { MongoProductosRepository } from "../repositories/mongoDb/mongoProductosRepository.js";
const repoProductos = new MongoProductosRepository();
import { connectMongoDB } from "../config/configMongoDb.js"
import { MongoCarritosRepository } from "../repositories/mongoDb/mongoCarritosRepository.js";
const repoCarritos = new MongoCarritosRepository();
import { MongoMensajesRepository } from "../repositories/mongoDb/mongoMensajesRepository.js";
const repoMensajes = new MongoMensajesRepository();

function createRandomProducts (n) {
    const productos = [];
    for (let i = 0; i < n; i++) {
        productos.push({
          nombre: faker.commerce.productName(),
          descripcion: faker.commerce.productDescription(),
          codigo: faker.random.alphaNumeric(5),
          foto: faker.image.imageUrl(),
          precio: faker.commerce.price(),
          stock: faker.random.numeric(5),
        });
    }
    return productos;
}

function createCarrito() {
    const carrito = {
        timestamp: faker.date.past(),
        productos: [],
    };
    return carrito;
}

function createMensajes(n){
  const mensajes = [];
  /**{ 
    author: {
        id: 'mail del usuario', 
        nombre: 'nombre del usuario', 
        apellido: 'apellido del usuario', 
        edad: 'edad del usuario', 
        alias: 'alias del usuario',
        avatar: 'url avatar (foto, logo) del usuario'
    },
    text: 'mensaje del usuario'
}
 */
  for (let i = 0; i < n; i++) {
    mensajes.push({
      author: {
        id: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.random.numeric(2),
        alias: faker.internet.userName(),
        avatar: faker.internet.avatar(),
      },
      text: faker.lorem.sentences(2),
      timestamp: faker.date.past(),
    });
  }
  return mensajes;
}

const productos = createRandomProducts(10);
const carrito = createCarrito();
const mensajes = createMensajes(2);

//console.log(productos);
//console.log(carrito);
console.log(mensajes);
//guardar todo en mongoDB

connectMongoDB();
await repoProductos.saveMany(productos);
await repoCarritos.create(carrito);
await repoMensajes.saveMany(mensajes);