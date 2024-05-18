import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authenticateDB from "./config/config.db";
import controllerDependencies from "./controllers/controllerDependencies";

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
// Monta todas las rutas definidas en controllers
app.use("/api", controllerDependencies);

// Autenticar la base de datos antes de iniciar el servidor
authenticateDB().then(() => {
  app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
  });
});

app.get("/", function (req, res) {
  res.send("Hola mundo");
});
