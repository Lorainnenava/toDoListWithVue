import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";

export interface TagDeleteServiceInterface {
  /**
   * Maneja la eliminación de un elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TagResponseDto>;
}
