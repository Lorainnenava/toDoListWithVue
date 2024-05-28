import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskUpdateStateServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {idState}
   */
  handle(idState: number): Promise<TaskResponseDto>;
}
