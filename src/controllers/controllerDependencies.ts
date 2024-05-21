import { RoutingControllersOptions } from "routing-controllers";
import { UserController } from "./user/userController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [UserController],
  routePrefix: "/api",
};
