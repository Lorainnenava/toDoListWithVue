import { SessionRepository } from "./session/sessionRepository";
import { UserRepository } from "./user/userRepository";

export const RepositoryDependencies = {
  userRepository: new UserRepository(),
  sessionRepository: new SessionRepository(),
};
