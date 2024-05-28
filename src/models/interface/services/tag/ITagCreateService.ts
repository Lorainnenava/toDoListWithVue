import { TagRequestDto } from "../../../tag/dto/request/tagRequestDto";
import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";

export interface TagCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {TagRequestDto}
   */
  handle(request: TagRequestDto): Promise<TagResponseDto>;
}
