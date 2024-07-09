import { TaskRequestDto } from "../../../task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskUpdateServiceInterface {
  /**
   * Maneja la actualización de un elemento.
   * @param request {TaskRequestDto}
   */
  handle(id: number, request: TaskRequestDto): Promise<TaskResponseDto>;
}
