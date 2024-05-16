import express from "express";
import dotenv from "dotenv";
import { connection } from "./app/config/config.db";
import cors from "cors";

// configures dotenv to work in your application
const app = express();
const port = 5000;
dotenv.config();

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Crear y conectar a la base de datos
connection
  .authenticate()
  .then(() => {
    console.log("La conexión ha sido establecida exitosamente. 🐵");
    app.listen(port, () => {
      console.log(`Escuchando en el puerto http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });

app.get("/", function (req, res) {
  res.send("Hola mundo");
});

module.exports = app;
