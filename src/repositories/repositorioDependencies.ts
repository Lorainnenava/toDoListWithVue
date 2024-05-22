import { UserRepository } from "./user/userRepository";

export const RepositoryDependencies = {
  userRepository: new UserRepository(),
};
