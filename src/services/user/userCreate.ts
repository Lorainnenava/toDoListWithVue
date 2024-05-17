import { UserCreateServiceInterface } from "../../models/interface/services/user/userCreate";
import { UserRequestDto } from "../../models/user/dto/request/user.request.dto";
import { UserResponseDto } from "../../models/user/dto/response/user.response.dto";
import { UserRepository } from "../../repositories/user/user.repository";

/**
 * Class UserCreate
 * @implements {UserCreateServiceInterface}
 */
export class UserCreate implements UserCreateServiceInterface {
  /**
   * Constructor
   * @param _userRepository - Instancia de UserRepository
   */
  constructor(public _userRepository: UserRepository) {}

  async handle(request: UserRequestDto): Promise<UserResponseDto> {
    const createUser = await this._userRepository.create(request);

    return createUser;
  }
}
