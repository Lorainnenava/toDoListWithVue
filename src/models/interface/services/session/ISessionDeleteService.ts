import { SessionResponseDto } from "../../../session/dto/response/sessionResponseDto";

export interface SessionDeleteServiceInterface {
  /**
   * Maneja la eliminación de un elemento.
   * @param request {id_user}
   */
  handle(id_user: number): Promise<SessionResponseDto>;
}
