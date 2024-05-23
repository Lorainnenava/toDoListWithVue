import { validate } from "class-validator";
import { Service } from "typedi";
import { mapper } from "../../config/mapper";
import { UserCreateServiceInterface } from "../../models/interface/services/user/userCreateService";
import { UserRequestDto } from "../../models/user/dto/request/userRequestDto";
import { UserResponseDto } from "../../models/user/dto/response/userResponseDto";
import { User } from "../../models/user/userModel";
import { RepositoryDependencies } from "../../repositories/repositorioDependencies";
import { UserMapper } from "../mapper/user/userMapper";

/**
 * Class UserCreate
 * @implements {UserCreateServiceInterface}
 */
@Service()
export class UserCreateService implements UserCreateServiceInterface {
  /**
   * Instancia del repositorio
   */
  private _repository = RepositoryDependencies;

  constructor() {
    UserMapper.defineMapper();
  }

  async handle(request: UserRequestDto): Promise<UserResponseDto> {
    const requestMapper = mapper.map(request, UserRequestDto, User);

    // Validar que todos los datos requeridos están presentes
    const errors = await validate(request);

    if (errors?.length > 0) {
      throw new Error("Enviar todos los datos.");
    }

    const createUser = await this._repository.userRepository.create(
      requestMapper
    );

    const response = mapper.map(createUser, User, UserResponseDto);

    return response;
  }
}
