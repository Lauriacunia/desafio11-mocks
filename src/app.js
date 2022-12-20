import express from "express";
import http from "http";
import morgan from "morgan";
import apiRoutes from "./routes/indexRoutes.js";
import { connectMongoDB } from "./config/configMongoDb.js"
import cors from "cors";
import { Server as ioServer} from "socket.io";
import chat from "./websocket/chat.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;

/**1- HTTP Server */
const httpServer = http.createServer(app);

/** 2- Servidor websocket */
const io = new ioServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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

/** Run Server */
const server = app.listen(PORT, () =>
   console.log(
     `🚀 Server started on port ${PORT} at ${new Date().toLocaleString()}`
   )
);
server.on("error", (err) => console.log(err));

function onInit() {
  console.log("🔥 CURSO BACKEND NodeJs - by Laurita Acuña 🔥");
}

onInit();
