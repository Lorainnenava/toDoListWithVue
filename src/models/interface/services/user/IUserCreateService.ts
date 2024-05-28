import { UserRequestDto } from "../../../user/dto/request/userRequestDto";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export interface UserCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {UserRequestDto}
   */
  handle(request: UserRequestDto): Promise<UserResponseDto>;
}
