import { User } from "../models/user/userModel";
import { Session } from "../models/session/sessionModel";
import { connection } from "../config/configDb";
import { ModelCtor } from "sequelize-typescript";

export class Context {
  // Repositorio User
  public user: ModelCtor<User>;
  // Repositorio Session
  public session: ModelCtor<Session>;

  constructor() {
    // Obtener los repositorios de la conexión a la base de datos
    this.user = connection.getRepository(User);
    this.session = connection.getRepository(Session);
  }
}

export const context = new Context();
