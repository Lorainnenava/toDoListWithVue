import { TaskTagResponseDto } from "../../../taskTag/dto/response/taskTagResponseDto";

export interface TaskTagGetAllByIdTagServiceInterface {
  /**
   * Maneja la obtención de todos los elemento.
   * @param request {id}
   */
  handle(id: number): Promise<TaskTagResponseDto>;
}
