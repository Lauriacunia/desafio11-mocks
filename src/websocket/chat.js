import { MongoMensajesRepository } from "../repositories/mongoDb/mongoMensajesRepository.js";
const repoMensajes = new MongoMensajesRepository();

/**🗨 Recibe una instancia del servidor websocket 'io'*/

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New user connected. Soquet ID : ", socket.id);
    /** Cargo los mensajes persistidos hasta el momento */
    repoMensajes.getAll().then((messages) => {
      console.log("allMessages", messages);
      socket.emit("all-messages", messages);
      socket.broadcast.emit("all-messages", messages);
    });
    /** on para escuchar
     *  emit para enviar
     */
    socket.on("set-user", (user) => {
      console.log("Current User Data", user);
      // socket.emit('user-connected', user);
      // socket.broadcast.emit('user-connected', user);
    });

    /** El servidor recibe los nuevos mensajes y los re-envia los */
    socket.on("new-message", (message) => {
      console.log("New Message", message);
      repoMensajes.create(message);
     // getAll retorna una promesa. Cuando se resuelva, se ejecuta el then
      repoMensajes.getAll().then((messages) => {
        console.log("allMessages", messages);
        socket.emit("all-messages", messages);
        socket.broadcast.emit("all-messages", messages);
      });
    });

    // socket.emit('messages', messages);
    socket.on("disconnect", (user) => {
      console.log("User disconnected:", user);
    });
  });
};
