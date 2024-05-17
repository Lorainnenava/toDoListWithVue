import { ModelCtor } from "sequelize-typescript";
import { User } from "../models/user/user.model";

export abstract class Context {
  // Model User
  abstract user: ModelCtor<User>;
}
