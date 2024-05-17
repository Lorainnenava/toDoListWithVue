import { UserRequestDto } from "../../../user/dto/request/user.request.dto";
import { UserResponseDto } from "../../../user/dto/response/user.response.dto";

export interface UserCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {UserRequestDto}
   */
  handle(request: UserRequestDto): Promise<UserResponseDto>;
}
