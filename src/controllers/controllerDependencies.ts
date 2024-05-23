import { RoutingControllersOptions } from "routing-controllers";
import { UserController } from "./user/userController";
import { SessionController } from "./session/sessionController";
import { ErrorHandlerMiddleware } from "../utils/middleware/errorHandler";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [UserController, SessionController],
  middlewares: [ErrorHandlerMiddleware],
};
