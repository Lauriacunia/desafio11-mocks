import express from "express";
import http from "http";
import morgan from "morgan";
import apiRoutes from "./routes/indexRoutes.js";
import { connectMongoDB } from "./config/configMongoDb.js"
import cors from "cors";
import { Server } from "socket.io";
import  chat  from "./websocket/chat.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8081 || process.env.PORT;
const PORT2 = 8082 || process.env.PORT2;

/**1- HTTP Server */
const httpServer = http.createServer(app);

/** 2- Servidor websocket */
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
  },
});
chat(io);



//** Middlewares globales de la app */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);


/** Routes */
app.use("/api", apiRoutes);

/** Connection mongoDB */
connectMongoDB();

/** Run Server App*/
const server = app.listen(PORT, () =>
   console.log(
     `🚀 Server started on port ${PORT} at ${new Date().toLocaleString()}`
   )
);
server.on("error", (err) => console.log(err));

function onInit() {
  console.log("🔥 CURSO BACKEND NodeJs - by Laurita Acuña 🔥");
}

/** Run server http */
try {
  httpServer.listen(PORT2, () => {
    console.log(
      `🚀 Server Http started on PORT ${PORT2} at ${new Date().toLocaleString()}`
    );
  });
} catch (error) {
  console.log("Error de conexión con el servidor...", error);
}

onInit();
