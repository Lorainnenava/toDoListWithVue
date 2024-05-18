import { ModelCtor } from "sequelize-typescript";
import { User } from "../models/user/user.model";

export class Context {
  // Model User
  public user: ModelCtor<User> = User;
}

export const context = new Context();
