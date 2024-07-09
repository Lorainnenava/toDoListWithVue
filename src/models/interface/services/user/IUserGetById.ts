import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export interface UserGetByIdServiceInterface {
  /**
   * Maneja la validación de un usuario.
   * @param request {id}
   */
  handle(id: number): Promise<UserResponseDto>;
}
