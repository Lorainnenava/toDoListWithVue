import { RoutingControllersOptions } from "routing-controllers";
import { UserController } from "./user/user.controller";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [UserController],
  routePrefix: "/api",
  cors: true,
};
