import { Service } from "typedi";
import { UserValidateServiceInterface } from "../../models/interface/services/user/userValidate";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { UserMapper } from "../mapper/user/userMapper";

@Service()
export class UserValidateService implements UserValidateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  constructor() {
    UserMapper.defineMapper();
  }

  async handle(code: string): Promise<boolean> {
    try {
      const searchCode = await this._repository.userRepository.getOne({
        where: { code },
      });

      if (searchCode?.id) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}
