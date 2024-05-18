import { UserRepository } from "./user/user.repository";

export const RepositoryDependencies = {
  userRepository: new UserRepository(),
};
