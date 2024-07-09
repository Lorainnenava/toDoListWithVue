import { RoutingControllersOptions } from "routing-controllers";
import { SessionController } from "./session/sessionController";
import { StateController } from "./state/stateController";
import { TagController } from "./tag/tagController";
import { TaskController } from "./task/taskController";
import { UserController } from "./user/userController";

export const ControllerDependencies: RoutingControllersOptions = {
  controllers: [
    UserController,
    SessionController,
    TagController,
    StateController,
    TaskController,
  ],
};
