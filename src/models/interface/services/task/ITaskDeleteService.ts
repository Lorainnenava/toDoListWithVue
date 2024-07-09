import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskDeleteServiceInterface {
  /**
   * Maneja la eliminación de un elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TaskResponseDto>;
}
