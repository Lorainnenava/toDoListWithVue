import { SessionRepository } from "./session/sessionRepository";
import { StateRepository } from "./state/stateRepository";
import { TagRepository } from "./tag/tagRepository";
import { TaskRepository } from "./task/taskRepository";
import { TaskTagRepository } from "./taskTag/taskTagRepository";
import { UserRepository } from "./user/userRepository";

export const RepositoryDependencies = {
  userRepository: new UserRepository(),
  sessionRepository: new SessionRepository(),
  taskRepository: new TaskRepository(),
  tagRepository: new TagRepository(),
  stateRepository: new StateRepository(),
  taskTagRepository: new TaskTagRepository(),
};
