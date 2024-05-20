import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";
import {
  createExpressServer,
  getMetadataArgsStorage,
  useContainer,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import { Container } from "typedi";
import authenticateDB from "./config/config.db";
import { ControllerDependencies } from "./controllers/controllerDependencies";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

// configures dotenv to work in your application
const app = createExpressServer(ControllerDependencies);
const port = 5000;
dotenv.config();

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// Configura el contenedor de DI para routing-controllers
useContainer(Container);

const storage = getMetadataArgsStorage();

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: "#/components/schemas/",
});

// Configuración de Swagger
const options = routingControllersToSpec(storage, ControllerDependencies, {
  components: schemas,
  info: {
    title: "LogRocket Express API with Swagger",
    version: "0.1.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger",
  },
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(options));

app.use(express.json());

// Autenticar la base de datos antes de iniciar el servidor
authenticateDB().then(() => {
  app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
    console.log(`Open API swagger on http://localhost:${port}/api`);
  });
});

app.get("/", function (req: Request, res: Response) {
  res.send("Hola mundo");
});
