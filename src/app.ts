import "reflect-metadata";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import {
  createExpressServer,
  getMetadataArgsStorage,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import authenticateDB from "./config/configDb";
import { ControllerDependencies } from "./controllers/controllerDependencies";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

// configures dotenv to work in your application
const app: Express = createExpressServer(ControllerDependencies);
const port = 5000;
dotenv.config();

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Genera los esquemas JSON a partir de las clases TypeScript
const xd = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
});

const storage = getMetadataArgsStorage();

// Configuración de Swagger
const options = routingControllersToSpec(storage, ControllerDependencies, {
  components: {
    schemas: {
      UserRequestDto: {
        type: "object",
        properties: {
          id: { type: "number" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["id", "email", "password"],
      },
    },
  },
  info: {
    title: "LogRocket Express API with Swagger",
    version: "0.1.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger",
  },
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(options));

app.use(express.json());

// Autenticar la base de datos antes de iniciar el servidor
authenticateDB().then(() => {
  app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
    console.log(`Open API swagger on http://localhost:${port}/docs`);
  });
});

app.get("/", function (req: Request, res: Response) {
  res.send("Hola mundo");
});
