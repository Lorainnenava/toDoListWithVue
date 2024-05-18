import { UserCreateServiceInterface } from "../../models/interface/services/user/userCreate";
import { UserRequestDto } from "../../models/user/dto/request/user.request.dto";
import { UserResponseDto } from "../../models/user/dto/response/user.response.dto";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";

/**
 * Class UserCreate
 * @implements {UserCreateServiceInterface}
 */
export class UserCreateService implements UserCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  async handle(request: UserRequestDto): Promise<UserResponseDto> {
    const createUser = await this._repository.userRepository.create(request);

    return createUser;
  }
}
