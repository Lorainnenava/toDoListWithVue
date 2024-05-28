import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";

export interface TagGetOneServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TagResponseDto>;
}
