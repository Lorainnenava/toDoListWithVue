import { TagResponseDto } from "../../../tag/dto/response/tagResponseDto";

export interface TagGetAllByUserServiceInterface {
  /**
   * Maneja la obtención de todos los elemento.
   * @param request {idUser}
   */
  handle(idUser: number): Promise<TagResponseDto[]>;
}
