import { TaskRequestDto } from "../../../task/dto/request/taskRequestDto";
import { TaskResponseDto } from "../../../task/dto/response/taskResponseDto";

export interface TaskCreateServiceInterface {
  /**
   * Maneja la creación de un elemento.
   * @param request {TaskRequestDto}
   */
  handle(request: TaskRequestDto): Promise<TaskResponseDto>;
}
