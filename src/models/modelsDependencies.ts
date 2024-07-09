import { Session } from "./session/model/sessionModel";
import { State } from "./state/model/stateModel";
import { Tag } from "./tag/model/tagModel";
import { Task } from "./task/model/taskModel";
import { TaskTag } from "./taskTag/model/taskTagModel";
import { User } from "./user/model/userModel";

// Inyectar todos los modelos.
export const ModelsDependencies = [User, Session, Tag, State, Task, TaskTag];
