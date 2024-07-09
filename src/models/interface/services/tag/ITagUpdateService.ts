import { TagRequestDto } from "../../../tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";

export interface TagUpdateServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {TagRequestDto}
   */
  handle(id: number, request: TagRequestDto): Promise<TagResponseDto>;
}
