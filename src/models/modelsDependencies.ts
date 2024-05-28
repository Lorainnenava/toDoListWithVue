import { Session } from "./session/sessionModel";
import { State } from "./state/stateModel";
import { Tag } from "./tag/tagModel";
import { Task } from "./task/taskModel";
import { TaskTag } from "./taskTag/taskTagModel";
import { User } from "./user/userModel";

// Inyectar todos los modelos.
export const ModelsDependencies = [User, Session, Tag, State, Task, TaskTag];
