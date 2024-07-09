import { SessionMapper } from "./session/sessionMapper";
import { StateMapper } from "./state/stateMapper";
import { TagMapper } from "./tag/tagMapper";
import { TaskMapper } from "./task/taskMapper";
import { UserMapper } from "./user/userMapper";

export function initializeMappers(): void {
  UserMapper.defineMapper();
  SessionMapper.defineMapper();
  TaskMapper.defineMapper();
  TagMapper.defineMapper();
  StateMapper.defineMapper();
}
