import { SessionRequestDto } from "../../../session/dto/request/sessionRequestDto";
import { SessionResponseDto } from "../../../session/dto/response/sessionResponseDto";

export interface SessionCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {SessionRequestDto}
   */
  handle(request: SessionRequestDto): Promise<SessionResponseDto>;
}
