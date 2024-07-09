import { SessionRequestDto } from "../../../session/dto/request/sessionRequestDto";
import { UserResponseDto } from "../../../user/dto/response/userResponseDto";

export interface ChangePasswordServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {UserResponseDto}
   */
  handle(request: SessionRequestDto): Promise<UserResponseDto>;
}
