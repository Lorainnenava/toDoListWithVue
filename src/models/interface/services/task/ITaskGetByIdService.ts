import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskGetByIdServiceInterface {
  /**
   * Maneja la obtención de un elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TaskResponseDto>;
}
