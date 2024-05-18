import { Router } from "express";
import { UserCreateService } from "../../services/user/userCreate";

export const userRoute = Router();

// Define el controlador
const controller = {
  userCreateService: new UserCreateService(),
};

// Crear usuario
userRoute.post("/create", async (req) => {
  const body = req?.body;
  await controller.userCreateService.handle(body);
});
