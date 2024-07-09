import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskChangeStateServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {idState}
   */
  handle(id: number, idState: number): Promise<TaskResponseDto>;
}
