import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { OpenAPIObject } from "openapi3-ts/dist/oas30";
import {
  RoutingControllersOptions,
  getMetadataArgsStorage,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

export const ConfigSwagger = (
  routes: RoutingControllersOptions
): OpenAPIObject => {
  // Genera los esquemas JSON a partir de las clases TypeScript
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
  });

  const storage = getMetadataArgsStorage();

  // Configuración de Swagger
  const options = routingControllersToSpec(storage, routes, {
    components: {
      schemas: schemas as any,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer Token",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
    info: {
      title: "API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
  });

  // Marca las rutas que requieren autenticación en Swagger
  options.paths["/state/protected-route"].get.security = [
    {
      bearerAuth: [],
    },
  ];

  return options;
};
