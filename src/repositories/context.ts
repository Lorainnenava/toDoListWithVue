import { ModelCtor } from "sequelize-typescript";
import { connection } from "../config/configDb";
import { Session } from "../models/session/model/sessionModel";
import { State } from "../models/state/model/stateModel";
import { Tag } from "../models/tag/model/tagModel";
import { Task } from "../models/task/model/taskModel";
import { TaskTag } from "../models/taskTag/model/taskTagModel";
import { User } from "../models/user/model/userModel";

export class Context {
  // Repositorio User
  public user: ModelCtor<User>;
  // Repositorio Session
  public session: ModelCtor<Session>;
  // Repositorio Task
  public task: ModelCtor<Task>;
  // Repositorio Tag
  public tag: ModelCtor<Tag>;
  // Repositorio State
  public state: ModelCtor<State>;
  // Repositorio TaskTag
  public taskTag: ModelCtor<TaskTag>;

  constructor() {
    // Obtener los repositorios de la conexión a la base de datos
    this.user = connection.getRepository(User);
    this.session = connection.getRepository(Session);
    this.task = connection.getRepository(Task);
    this.tag = connection.getRepository(Tag);
    this.state = connection.getRepository(State);
    this.taskTag = connection.getRepository(TaskTag);
  }
}

export const context = new Context();
