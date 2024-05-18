import express from "express";
import { userRoute } from "./user/user.controller";

const controllerDependencies = express.Router();

// Configura las rutas para cada controlador
controllerDependencies.use("/users", userRoute);

export default controllerDependencies;
