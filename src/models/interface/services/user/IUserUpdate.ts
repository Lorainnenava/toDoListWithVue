import { UserRequestDto } from "../../../user/dto/request/userRequestDto";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export interface UserUpdateServiceInterface {
  /**
   * Maneja la actualización de un usuario.
   * @param request {id}
   */
  handle(id: number, request: UserRequestDto): Promise<UserResponseDto>;
}
