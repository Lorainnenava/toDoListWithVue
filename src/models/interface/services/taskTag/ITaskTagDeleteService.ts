import { TaskTagResponseDto } from "../../../taskTag/dto/response/taskTagResponseDto";

export interface TaskTagDeleteServiceInterface {
  /**
   * Maneja la eliminación de un elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TaskTagResponseDto>;
}
